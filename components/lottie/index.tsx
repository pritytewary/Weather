"use client";

import { useEffect, useRef, useState } from "react";
import dynamic from "next/dynamic";

const Lottie = dynamic(() => import("lottie-react"), { ssr: false });

export default function LottieIcon({
  name,
  className = "w-10 h-10",
  loop = true,
}: {
  name: string;
  className?: string;
  loop?: boolean;
}) {
  const [isReady, setIsReady] = useState(false);

  const iconData = useRef<Object | null>(null);

  useEffect(() => {
    if (!iconData.current) {
      const importedIcon = import(`./icons/${name}.json`);
      importedIcon.then((icon) => {
        iconData.current = icon.default;
        setIsReady(true);
      });
    } else {
      setIsReady(true);
    }
  }, [name]);

  return (
    <div aria-hidden="true" className={className}>
      {isReady ? <Lottie animationData={iconData.current} loop={loop} /> : null}
    </div>
  );
}
