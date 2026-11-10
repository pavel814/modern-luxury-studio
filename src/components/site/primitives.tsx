import { Link } from "@tanstack/react-router";
import { ArrowUpRight, ChevronRight } from "lucide-react";
import type { ReactNode } from "react";

import { cn } from "@/lib/utils";

export function Eyebrow({ children, className }: { children: ReactNode; className?: string }) {
  return (
    <p className={cn("eyebrow flex items-center gap-3 text-muted-foreground", className)}>
      <span className="inline-block h-1.5 w-1.5 bg-signal" aria-hidden />
      {children}
    </p>
  );
}

export function SectionHeading({
  eyebrow,
  title,
  lead,
  className,
  invert,
}: {
  eyebrow?: string;
  title: ReactNode;
  lead?: ReactNode;
  className?: string;
  invert?: boolean;
}) {
  return (
    <div className={cn("grid gap-6 lg:grid-cols-12 lg:gap-10", className)}>
      <div className="lg:col-span-7">
        {eyebrow && <Eyebrow className={cn("mb-6", invert && "text-ink-muted")}>{eyebrow}</Eyebrow>}
        <h2 className="display-lg">{title}</h2>
      </div>
      {lead && (
        <p
          className={cn(
            "lead self-end lg:col-span-5",
            invert ? "text-ink-muted" : "text-muted-foreground",
          )}
        >
          {lead}
        </p>
      )}
    </div>
  );
}

export function Breadcrumbs({ items }: { items: { label: string; to?: string }[] }) {
  return (
    <nav aria-label="Хлебные крошки" className="eyebrow text-muted-foreground">
      <ol className="flex flex-wrap items-center gap-2">
        <li>
          <Link to="/" className="transition-colors hover:text-foreground">
            Главная
          </Link>
        </li>
        {items.map((item) => (
          <li key={item.label} className="flex items-center gap-2">
            <ChevronRight className="h-3 w-3" aria-hidden />
            {item.to ? (
              <a href={item.to} className="transition-colors hover:text-foreground">
                {item.label}
              </a>
            ) : (
              <span className="text-foreground" aria-current="page">
                {item.label}
              </span>
            )}
          </li>
        ))}
      </ol>
    </nav>
  );
}

export function PageHero({
  crumbs,
  eyebrow,
  title,
  lead,
  children,
}: {
  crumbs: { label: string; to?: string }[];
  eyebrow?: string;
  title: ReactNode;
  lead?: ReactNode;
  children?: ReactNode;
}) {
  return (
    <section className="relative overflow-hidden border-b pt-32 pb-16 lg:pt-44 lg:pb-24">
      <div className="grid-paper pointer-events-none absolute inset-0 opacity-50 [mask-image:linear-gradient(to_bottom,black,transparent_85%)]" aria-hidden />
      <div className="container-site relative">
        <Breadcrumbs items={crumbs} />
        <div className="mt-12 grid gap-10 lg:grid-cols-12">
          <div className="lg:col-span-8">
            {eyebrow && <Eyebrow className="mb-6">{eyebrow}</Eyebrow>}
            <h1 className="display-xl animate-fade-up">{title}</h1>
          </div>
          {lead && (
            <p className="lead self-end text-muted-foreground lg:col-span-4">{lead}</p>
          )}
        </div>
        {children && <div className="mt-12">{children}</div>}
      </div>
    </section>
  );
}

export function ArrowMark({ className }: { className?: string }) {
  return (
    <ArrowUpRight
      className={cn(
        "h-5 w-5 transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5",
        className,
      )}
      aria-hidden
    />
  );
}

export function DashList({ items, className }: { items: string[]; className?: string }) {
  return (
    <ul className={cn("space-y-3", className)}>
      {items.map((item) => (
        <li key={item} className="flex gap-4">
          <span className="mt-[0.7em] h-px w-4 shrink-0 bg-signal" aria-hidden />
          <span>{item}</span>
        </li>
      ))}
    </ul>
  );
}
