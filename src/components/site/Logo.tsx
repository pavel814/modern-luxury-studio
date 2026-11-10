import { Link } from "@tanstack/react-router";

import { cn } from "@/lib/utils";

export function Logo({ className }: { className?: string }) {
  return (
    <Link to="/" className={cn("group flex items-center gap-2.5", className)} aria-label="ProcessLab — на главную">
      <span className="relative grid h-7 w-7 grid-cols-2 grid-rows-2 gap-[3px]" aria-hidden>
        <span className="bg-current" />
        <span className="border border-current" />
        <span className="border border-current" />
        <span className="bg-signal transition-transform duration-500 group-hover:rotate-90" />
      </span>
      <span className="font-display text-[1.15rem] font-medium tracking-tight">
        Process<span className="text-signal">Lab</span>
      </span>
    </Link>
  );
}
