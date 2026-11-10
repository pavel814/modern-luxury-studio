import { Link, useRouterState } from "@tanstack/react-router";
import { ChevronDown, Menu, Phone } from "lucide-react";
import { useEffect, useState } from "react";

import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import { company } from "@/content/site";
import { services } from "@/content/services";
import { cn } from "@/lib/utils";

import { Logo } from "./Logo";

const nav = [
  { to: "/solutions", label: "Решения" },
  { to: "/industries", label: "Отрасли" },
  { to: "/cases", label: "Кейсы" },
  { to: "/blog", label: "Экспертиза" },
  { to: "/about", label: "О компании" },
  { to: "/contacts", label: "Контакты" },
] as const;

export function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const pathname = useRouterState({ select: (s) => s.location.pathname });

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => setOpen(false), [pathname]);

  return (
    <header
      className={cn(
        "fixed inset-x-0 top-0 z-50 transition-all duration-500",
        scrolled ? "border-b bg-background/85 backdrop-blur-xl" : "border-b border-transparent",
      )}
    >
      <div className="container-site flex h-18 items-center justify-between gap-6 lg:h-20">
        <Logo />

        <nav className="hidden items-center gap-1 xl:flex" aria-label="Основная навигация">
          <div className="group relative">
            <Link
              to="/services"
              className="flex items-center gap-1 rounded-md px-3 py-2 text-[0.9rem] text-foreground/80 transition-colors hover:text-foreground"
              activeProps={{ className: "text-foreground" }}
            >
              Услуги
              <ChevronDown className="h-3.5 w-3.5 transition-transform duration-300 group-hover:rotate-180" />
            </Link>
            <div className="invisible absolute left-0 top-full pt-3 opacity-0 transition-all duration-300 group-focus-within:visible group-focus-within:opacity-100 group-hover:visible group-hover:opacity-100">
              <div className="shadow-float w-[640px] rounded-lg border bg-popover p-3">
                <div className="grid grid-cols-2 gap-1">
                  {services.map((s, i) => (
                    <Link
                      key={s.slug}
                      to="/services/$slug"
                      params={{ slug: s.slug }}
                      className="group/item rounded-md p-4 transition-colors hover:bg-secondary"
                    >
                      <span className="eyebrow text-muted-foreground">0{i + 1}</span>
                      <span className="mt-2 block text-[0.95rem] font-medium leading-snug group-hover/item:text-signal">
                        {s.title}
                      </span>
                      <span className="mt-1 block text-sm leading-snug text-muted-foreground">{s.short}</span>
                    </Link>
                  ))}
                </div>
              </div>
            </div>
          </div>
          {nav.map((item) => (
            <Link
              key={item.to}
              to={item.to}
              className="rounded-md px-3 py-2 text-[0.9rem] text-foreground/80 transition-colors hover:text-foreground"
              activeProps={{ className: "text-foreground" }}
            >
              {item.label}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-3">
          <a
            href={company.phoneHref}
            className="hidden items-center gap-2 text-sm text-foreground/80 transition-colors hover:text-foreground lg:flex"
          >
            <Phone className="h-3.5 w-3.5" />
            {company.phone}
          </a>
          <Button asChild size="sm" className="hidden sm:inline-flex">
            <Link to="/contacts">Обсудить задачу</Link>
          </Button>
          <Sheet open={open} onOpenChange={setOpen}>
            <SheetTrigger asChild>
              <Button variant="outline" size="icon" className="xl:hidden" aria-label="Открыть меню">
                <Menu />
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="w-full overflow-y-auto bg-background sm:max-w-md">
              <SheetTitle className="sr-only">Меню</SheetTitle>
              <div className="mt-10 flex flex-col">
                <p className="eyebrow mb-3 text-muted-foreground">Услуги</p>
                {services.map((s) => (
                  <Link
                    key={s.slug}
                    to="/services/$slug"
                    params={{ slug: s.slug }}
                    className="border-b py-3 text-[0.95rem]"
                  >
                    {s.title}
                  </Link>
                ))}
                <div className="mt-8 flex flex-col">
                  {nav.map((item) => (
                    <Link key={item.to} to={item.to} className="font-display border-b py-3 text-2xl">
                      {item.label}
                    </Link>
                  ))}
                </div>
                <a href={company.phoneHref} className="mt-8 text-lg">
                  {company.phone}
                </a>
                <a href={`mailto:${company.email}`} className="mt-1 text-muted-foreground">
                  {company.email}
                </a>
                <Button asChild size="lg" className="mt-8">
                  <Link to="/contacts">Обсудить задачу</Link>
                </Button>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
}
