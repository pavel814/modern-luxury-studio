import { createFileRoute } from "@tanstack/react-router";

import { CtaSection } from "@/components/site/CtaSection";
import { PageHero } from "@/components/site/primitives";
import { approach, whyUs } from "@/content/site";
import { pageHead } from "@/lib/seo";

export const Route = createFileRoute("/about")({
  head: () =>
    pageHead({
      title: "О компании ProcessLab — технологический консалтинг",
      description: "Подход, принципы и методика работы ProcessLab: от анализа бизнес-процессов до работающего IT-решения.",
    }),
  component: () => (
    <>
      <PageHero
        crumbs={[{ label: "О компании" }]}
        eyebrow="О компании"
        title="Разбираемся в бизнесе, а потом выбираем технологии"
        lead="Мы не просто разрабатываем программное обеспечение. Мы находим неэффективность и внедряем технологии, которые решают конкретные задачи компании."
      />
      <section className="section-y">
        <div className="container-site grid gap-px overflow-hidden rounded-lg border bg-border md:grid-cols-2 lg:grid-cols-3">
          {whyUs.map((w, i) => (
            <div key={w.title} className="bg-background p-8">
              <span className="font-display text-2xl text-signal">{String(i + 1).padStart(2, "0")}</span>
              <h2 className="mt-6 text-xl font-medium">{w.title}</h2>
              <p className="mt-3 text-muted-foreground">{w.text}</p>
            </div>
          ))}
        </div>
      </section>
      <section className="surface-ink section-y">
        <div className="container-site">
          <h2 className="display-lg max-w-3xl">Методика работы</h2>
          <ol className="mt-12 grid gap-8 md:grid-cols-5">
            {approach.map((s) => (
              <li key={s.n} className="border-t border-ink-line pt-6">
                <p className="eyebrow text-signal">{s.n}</p>
                <h3 className="mt-3 text-xl">{s.title}</h3>
                <p className="mt-3 text-sm text-ink-muted">{s.text}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>
      <CtaSection source="about" />
    </>
  ),
});
