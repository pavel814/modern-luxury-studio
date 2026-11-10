import { createFileRoute, Link } from "@tanstack/react-router";

import { CtaSection } from "@/components/site/CtaSection";
import { PageHero } from "@/components/site/primitives";
import { cases } from "@/content/cases";
import { pageHead } from "@/lib/seo";

export const Route = createFileRoute("/cases/")({
  head: () =>
    pageHead({
      title: "Кейсы и демонстрационные решения — ProcessLab",
      description: "Демонстрационные проекты с описанием задачи, архитектуры и технической реализации.",
    }),
  component: () => (
    <>
      <PageHero crumbs={[{ label: "Кейсы" }]} eyebrow="Кейсы" title="Как технологии помогают решать бизнес-задачи" lead="Публикуем только подтверждённые результаты. Пока здесь — демонстрационные решения." />
      <section className="section-y">
        <div className="container-site grid gap-6 lg:grid-cols-2">
          {cases.map((c) => (
            <Link key={c.slug} to="/cases/$slug" params={{ slug: c.slug }} className="group rounded-lg border bg-card p-10 transition-all hover:shadow-float">
              <span className="eyebrow rounded-sm bg-signal-soft px-2.5 py-1 text-signal">Демонстрационное решение</span>
              <h2 className="display-md mt-8">{c.title}</h2>
              <p className="mt-4 text-muted-foreground">{c.result}</p>
            </Link>
          ))}
        </div>
      </section>
      <CtaSection source="cases" />
    </>
  ),
});
