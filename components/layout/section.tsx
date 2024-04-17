"use client";

import { cn } from "@/lib/utils";

export default function Section({
  children,
  className = "",
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div className="flex items-center justify-center">
      <section className={cn("p-4 w-full max-w-7xl", className)}>
        {children}
      </section>
    </div>
  );
}
