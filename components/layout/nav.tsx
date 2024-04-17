"use client";

import Link from "next/link";
import { Input } from "../ui/input";
import LottieIcon from "../lottie";
import { Button, buttonVariants } from "../ui/button";
import { MagnifyingGlassIcon } from "@radix-ui/react-icons";
import { useState } from "react";

export default function Nav() {
  const [search, setSearch] = useState("");

  return (
    <div className="flex items-center justify-center">
      <nav className="p-4 flex justify-between items-center w-full max-w-7xl">
        <Link href="/" className="text-2xl font-bold">
          <LottieIcon name="weather" className="w-10 h-10" />
          Weather
        </Link>

        <div className="sm:flex items-center gap-2 hidden">
          <Input
            placeholder="Search for a city"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
          <Link
            href={`/?city=${encodeURIComponent(search)}`}
            className={buttonVariants({ size: "icon" })}
          >
            <MagnifyingGlassIcon className="w-4 h-4" />
          </Link>
        </div>
      </nav>
    </div>
  );
}
