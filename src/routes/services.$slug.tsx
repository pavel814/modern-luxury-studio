import { createFileRoute, Link, notFound } from "@tanstack/react-router";

import { CtaSection } from "@/components/site/CtaSection";
import { FaqList } from "@/components/site/FaqList";
import { ArrowMark, DashList, Eyebrow, PageHero } from "@/components/site/primitives";
import { Button } from "@/components/ui/button";
import { getService, services } from "@/content/services";
import { pageHead } from "@/lib/seo";

export const Route = createFileRoute("/services/$slug")({
  loader: ({ params }) => {
    const service = getService(params.slug);
    if (!service) throw notFound();
    return { service };
  },
  head: ({ loaderData }) =>
    loaderData
      ? pageHead({
          title: loaderData.service.seoTitle,
          description: loaderData.service.seoDescription,
          jsonLd: {
            "@type": "Service",
            name: loaderData.service.title,
            description: loaderData.service.seoDescription,
            provider: { "@type": "Organization", name: "ProcessLab" },
            areaServed: "BY",
          },
        })
      : pageHead({ title: "Услуга не найдена — ProcessLab", description: "Страница недоступна.", noindex: true }),
  component: ServicePage,
});

function Block({ eyebrow, title, children }: { eyebrow: string; title: string; children: React.ReactNode }) {
  return (
    <section className="border-t py-16 lg:py-24">
      <div className="container-site grid gap-10 lg:grid-cols-12">
        <div className="lg:col-span-4">
          <Eyebrow>{eyebrow}</Eyebrow>
          <h2 className="display-md mt-5">{title}</h2>
        </div>
        <div className="lg:col-span-8">{children}</div>
      </div>
    </section>
  );
}

function ServicePage() {
  const { service: s } = Route.useLoaderData();
  const related = services.filter((x) => s.related.includes(x.slug));
  return (
    <>
      <PageHero crumbs={[{ label: "Услуги", to: "/services" }, { label: s.title }]} eyebrow="Услуга" title={s.title} lead={s.value}>
        <Button asChild size="lg">
          <a href="#lead">Обсудить задачу</a>
        </Button>
      </PageHero>
      <Block eyebrow="Проблемы" title="Какие проблемы решаем">
        <DashList items={s.problems} className="text-lg" />
      </Block>
      <Block eyebrow="Когда нужно" title="Когда эта услуга необходима">
        <DashList items={s.when} className="text-lg" />
      </Block>
      <Block eyebrow="Сценарии" title="Типовые задачи">
        <div className="grid gap-px overflow-hidden rounded-lg border bg-border sm:grid-cols-2">
          {s.scenarios.map((x) => (
            <div key={x.title} className="bg-card p-6">
              <h3 className="text-lg font-medium">{x.title}</h3>
              <p className="mt-2 text-muted-foreground">{x.text}</p>
            </div>
          ))}
        </div>
      </Block>
      <Block eyebrow="Подход" title="Как мы реализуем">
        <ol className="space-y-8">
          {s.approach.map((x, i) => (
            <li key={x.title} className="grid grid-cols-[3rem_1fr] gap-4">
              <span className="font-display text-2xl text-signal">{String(i + 1).padStart(2, "0")}</span>
              <div>
                <h3 className="text-xl font-medium">{x.title}</h3>
                <p className="mt-2 text-muted-foreground">{x.text}</p>
              </div>
            </li>
          ))}
        </ol>
      </Block>
      <Block eyebrow="Технологии" title="Технологии и интеграции">
        <div className="flex flex-wrap gap-2">
          {s.tech.map((t) => (
            <span key={t} className="rounded-sm border px-3 py-1.5 font-mono text-sm">{t}</span>
          ))}
        </div>
      </Block>
      <Block eyebrow="Примеры" title="Примеры решений">
        <DashList items={s.examples} className="text-lg" />
      </Block>
      <Block eyebrow="Стоимость" title="От чего зависят стоимость и сроки">
        <DashList items={s.pricing} className="text-lg" />
      </Block>
      <Block eyebrow="FAQ" title="Вопросы об услуге">
        <FaqList items={s.faq} />
      </Block>
      <Block eyebrow="Смежные услуги" title="Что ещё может помочь">
        <div className="grid gap-4 sm:grid-cols-2">
          {related.map((r) => (
            <Link key={r.slug} to="/services/$slug" params={{ slug: r.slug }} className="group flex justify-between gap-4 rounded-lg border p-6 hover:bg-card">
              <span className="text-lg">{r.title}</span>
              <ArrowMark className="group-hover:text-signal" />
            </Link>
          ))}
        </div>
      </Block>
      <CtaSection source={`service:${s.slug}`} />
    </>
  );
}
