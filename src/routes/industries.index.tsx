import { createFileRoute, Link } from "@tanstack/react-router";

import { CtaSection } from "@/components/site/CtaSection";
import { ArrowMark, PageHero } from "@/components/site/primitives";
import { industries } from "@/content/industries";
import { pageHead } from "@/lib/seo";

export const Route = createFileRoute("/industries/")({
  head: () =>
    pageHead({
      title: "Отраслевые IT-решения — ProcessLab",
      description: "Автоматизация и IT-решения для торговли, производства, логистики, строительства и B2B-услуг.",
    }),
  component: () => (
    <>
      <PageHero crumbs={[{ label: "Отрасли" }]} eyebrow="Отрасли" title="Понимаем задачи разных отраслей" lead="Характерные проблемы каждой отрасли и сценарии их решения." />
      <section className="section-y">
        <div className="container-site border-t">
          {industries.map((ind) => (
            <Link key={ind.slug} to="/industries/$slug" params={{ slug: ind.slug }} className="group grid gap-4 border-b py-10 md:grid-cols-12">
              <h2 className="display-md group-hover:text-signal md:col-span-5">{ind.title}</h2>
              <p className="text-muted-foreground md:col-span-6">{ind.context}</p>
              <ArrowMark className="hidden justify-self-end md:block" />
            </Link>
          ))}
        </div>
      </section>
      <CtaSection source="industries" />
    </>
  ),
});
