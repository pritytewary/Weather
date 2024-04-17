"use client";

import Section from "@/components/layout/section";
import { Input } from "@/components/ui/input";
import { useEffect, useState } from "react";
import Search from "./search";
import LottieIcon from "@/components/lottie";
import { useSearchParams } from "next/navigation";
import CurrentLocation from "./current-location";

export default function HomePage() {
  const searchParams = useSearchParams();
  const [input, setInput] = useState("");

  useEffect(() => {
    setInput((searchParams.get("city") || "") as string);
  }, [searchParams]);

  useEffect(() => {
    if (typeof window === "undefined") return;
    try {
      window.history.replaceState(
        null,
        "",
        input
          ? `${window.location.pathname}?city=${encodeURIComponent(input)}`
          : window.location.pathname
      );
    } catch (_) {}
  }, [input]);

  return (
    <>
      <Section className="pt-[5dvh] flex justify-center items-center flex-col lg:gap-8 gap-4 text-center">
        <LottieIcon name="weather" className="w-20 h-20 lg:w-40 lg:h-40" />

        <h1 className="text-4xl lg:text-6xl font-bold">
          Find the weather in your city
        </h1>

        <div className="max-w-2xl flex gap-4 w-full">
          <Input
            className="h-14 flex-1 border border-primary"
            placeholder="Type you city"
            value={input}
            onChange={(e) => setInput(e.target.value)}
          />
        </div>

        <CurrentLocation />
      </Section>

      <Section>
        <Search input={input} />
      </Section>
    </>
  );
}
