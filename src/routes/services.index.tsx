import { createFileRoute, Link } from "@tanstack/react-router";

import { CtaSection } from "@/components/site/CtaSection";
import { ArrowMark, DashList, PageHero } from "@/components/site/primitives";
import { services } from "@/content/services";
import { pageHead } from "@/lib/seo";

export const Route = createFileRoute("/services/")({
  head: () =>
    pageHead({
      title: "Услуги — аудит, автоматизация, интеграции, AI и BI | ProcessLab",
      description: "Шесть направлений технологического консалтинга: от аудита процессов до разработки корпоративных систем.",
    }),
  component: ServicesPage,
});

function ServicesPage() {
  return (
    <>
      <PageHero
        crumbs={[{ label: "Услуги" }]}
        eyebrow="Услуги"
        title="Технологические решения под задачи вашего бизнеса"
        lead="Полный цикл: от диагностики и архитектуры до внедрения и сопровождения."
      />
      <section className="section-y">
        <div className="container-site grid gap-px overflow-hidden rounded-lg border bg-border md:grid-cols-2">
          {services.map((s, i) => (
            <Link key={s.slug} to="/services/$slug" params={{ slug: s.slug }} className="group flex flex-col bg-background p-8 transition-colors hover:bg-card lg:p-12">
              <div className="flex justify-between">
                <span className="eyebrow text-muted-foreground">{String(i + 1).padStart(2, "0")}</span>
                <ArrowMark className="group-hover:text-signal" />
              </div>
              <h2 className="display-md mt-10">{s.title}</h2>
              <p className="mt-4 text-muted-foreground">{s.value}</p>
              <DashList items={s.tasks} className="mt-8 text-sm" />
            </Link>
          ))}
        </div>
      </section>
      <CtaSection source="services" />
    </>
  );
}
