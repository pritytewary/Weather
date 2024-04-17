"use client";

// this code is from next-nprogress-bar with some modifications

import React, { useEffect } from "react";
import NProgress from "nprogress";
import { isSameURL } from "./utils/sameURL";
import { usePathname } from "next/navigation";
import { useSearchParams } from "next/navigation";

type PushStateInput = [
  data: any,
  unused: string,
  url?: string | URL | null | undefined
];

interface NProgressOptions {
  minimum?: number;
  template?: string;
  easing?: string;
  speed?: number;
  trickle?: boolean;
  trickleSpeed?: number;
  showSpinner?: boolean;
  parent?: string;
  positionUsing?: string;
  barSelector?: string;
  spinnerSelector?: string;
}

export interface ProgressBarProps {
  color?: string;
  height?: string;
  options?: Partial<NProgressOptions>;
  shallowRouting?: boolean;
  delay?: number;
  style?: string;
}

export default function ProgressBar({
  color = "#0A2FFF",
  height = "2px",
  options,
  shallowRouting = false,
  delay = 0,
  style,
}: ProgressBarProps) {
  const styles = (
    <style>
      {style ||
        `
        #nprogress {
          pointer-events: none;
        }

        #nprogress .bar {
          background: ${color};

          position: fixed;
          z-index: 1031;
          top: 0;
          left: 0;
          display: none;

          width: 100%;
          height: ${height};
        }

        #nprogress .peg {
          display: block;
          position: absolute;
          right: 0px;
          width: 100px;
          height: 100%;
          box-shadow: 0 0 10px ${color}, 0 0 5px ${color};
          opacity: 1.0;

          -webkit-transform: rotate(3deg) translate(0px, -4px);
              -ms-transform: rotate(3deg) translate(0px, -4px);
                  transform: rotate(3deg) translate(0px, -4px);
        }

        #nprogress .spinner {
          display: block;
          position: fixed;
          z-index: 10;
          top: 0;
          right: 0;
          display: flex;
          justify-content: center;
          align-items: center;
          background: #fff;
          width: 100%;
          height: 100dvh;
        }

        @media (min-width: 768px) {
          #nprogress .spinner {
              display: none;
          }
          #nprogress .bar {
              display: block;
          }
         }

        #nprogress .spinner-icon {
          width: 40px;
          height: 40px;
          box-sizing: border-box;

          border: solid 3px transparent;
          border-top-color: ${color};
          border-left-color: ${color};
          border-radius: 50%;

          -webkit-animation: nprogress-spinner 400ms linear infinite;
                  animation: nprogress-spinner 400ms linear infinite;
        }

        .nprogress-custom-parent {
          overflow: hidden;
          position: relative;
        }

        .nprogress-custom-parent #nprogress .spinner,
        .nprogress-custom-parent #nprogress .bar {
          position: absolute;
        }

        @-webkit-keyframes nprogress-spinner {
          0%   { -webkit-transform: rotate(0deg); }
          100% { -webkit-transform: rotate(360deg); }
        }
        @keyframes nprogress-spinner {
          0%   { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }
      `}
    </style>
  );

  NProgress.configure(options || {});

  const pathname = usePathname();
  const searchParams = useSearchParams();

  useEffect(() => {
    NProgress.done();
  }, [pathname, searchParams]);

  useEffect(() => {
    let timer: NodeJS.Timeout;

    const startProgress = () => {
      timer = setTimeout(NProgress.start, delay);
    };

    const stopProgress = () => {
      clearTimeout(timer);
      NProgress.done();
    };

    const handleAnchorClick = (event: MouseEvent) => {
      const anchorElement = event.currentTarget as HTMLAnchorElement;

      // Skip anchors with target="_blank"
      if (anchorElement.target === "_blank") return;

      // Skip control/command+click
      if (event.metaKey || event.ctrlKey) return;

      const targetUrl = new URL(anchorElement.href);
      const currentUrl = new URL(location.href);

      if (shallowRouting && isSameURL(targetUrl, currentUrl)) return;
      if (targetUrl?.href === currentUrl?.href) return;

      startProgress();
    };

    const handleMutation: MutationCallback = () => {
      const anchorElements = document.querySelectorAll("a");
      // Skip anchors with target="_blank" and anchors without href
      const validAnchorELes = Array.from(anchorElements).filter(
        (anchor) => anchor.href && anchor.target !== "_blank"
      );
      validAnchorELes.forEach((anchor) =>
        anchor.addEventListener("click", handleAnchorClick)
      );
    };

    const mutationObserver = new MutationObserver(handleMutation);
    mutationObserver.observe(document, { childList: true, subtree: true });

    window.history.pushState = new Proxy(window.history.pushState, {
      apply: (target, thisArg, argArray: PushStateInput) => {
        stopProgress();
        return target.apply(thisArg, argArray);
      },
    });
  }, []);

  return styles;
}
