import { createFileRoute, Link } from "@tanstack/react-router";

import { CtaSection } from "@/components/site/CtaSection";
import { ArrowMark, PageHero } from "@/components/site/primitives";
import { solutions } from "@/content/solutions";
import { pageHead } from "@/lib/seo";

export const Route = createFileRoute("/solutions/")({
  head: () =>
    pageHead({
      title: "Решения бизнес-задач — ProcessLab",
      description: "Готовые сценарии решения конкретных проблем: обработка счетов, интеграция 1С и CRM и другие.",
    }),
  component: () => (
    <>
      <PageHero crumbs={[{ label: "Решения" }]} eyebrow="Решения" title="Решения конкретных бизнес-задач" lead="Начинаем с проблемы, а не с названия технологии." />
      <section className="section-y">
        <div className="container-site grid gap-6 lg:grid-cols-2">
          {solutions.map((s) => (
            <Link key={s.slug} to="/solutions/$slug" params={{ slug: s.slug }} className="group rounded-lg border bg-card p-10 transition-all hover:shadow-float">
              <ArrowMark className="ml-auto group-hover:text-signal" />
              <h2 className="display-md mt-6">{s.title}</h2>
              <p className="mt-4 text-muted-foreground">{s.short}</p>
            </Link>
          ))}
        </div>
      </section>
      <CtaSection source="solutions" />
    </>
  ),
});
