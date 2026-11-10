import { createFileRoute, Link, notFound } from "@tanstack/react-router";

import { CtaSection } from "@/components/site/CtaSection";
import { DashList, Eyebrow, PageHero } from "@/components/site/primitives";
import { services } from "@/content/services";
import { getSolution } from "@/content/solutions";
import { pageHead } from "@/lib/seo";

export const Route = createFileRoute("/solutions/$slug")({
  loader: ({ params }) => {
    const solution = getSolution(params.slug);
    if (!solution) throw notFound();
    return { solution };
  },
  head: ({ loaderData }) =>
    loaderData
      ? pageHead({ title: loaderData.solution.seoTitle, description: loaderData.solution.seoDescription })
      : pageHead({ title: "Решение не найдено — ProcessLab", description: "Страница недоступна.", noindex: true }),
  component: SolutionPage,
});

function Row({ eyebrow, title, children }: { eyebrow: string; title: string; children: React.ReactNode }) {
  return (
    <section className="border-t py-16 lg:py-24">
      <div className="container-site grid gap-10 lg:grid-cols-12">
        <div className="lg:col-span-4">
          <Eyebrow>{eyebrow}</Eyebrow>
          <h2 className="display-md mt-5">{title}</h2>
        </div>
        <div className="text-lg lg:col-span-8">{children}</div>
      </div>
    </section>
  );
}

function SolutionPage() {
  const { solution: s } = Route.useLoaderData();
  return (
    <>
      <PageHero crumbs={[{ label: "Решения", to: "/solutions" }, { label: s.title }]} eyebrow="Решение" title={s.title} lead={s.short} />
      <Row eyebrow="Проблема" title="Как устроена проблема">
        {s.problem.map((p) => <p key={p} className="mb-4 text-muted-foreground">{p}</p>)}
      </Row>
      <Row eyebrow="Издержки" title="Во что это обходится"><DashList items={s.costs} /></Row>
      <Row eyebrow="Решение" title="Технологическое решение"><p>{s.solution}</p></Row>
      <Row eyebrow="После внедрения" title="Как работает процесс">
        <ol className="space-y-5">
          {s.after.map((a, i) => (
            <li key={a} className="grid grid-cols-[3rem_1fr] gap-4">
              <span className="font-display text-signal">{String(i + 1).padStart(2, "0")}</span>
              <span>{a}</span>
            </li>
          ))}
        </ol>
      </Row>
      <Row eyebrow="Интеграции" title="С какими системами работает">
        <div className="flex flex-wrap gap-2">
          {s.integrations.map((t) => <span key={t} className="rounded-sm border px-3 py-1.5 font-mono text-sm">{t}</span>)}
        </div>
      </Row>
      <Row eyebrow="Ограничения" title="Ограничения и риски"><DashList items={s.risks} /></Row>
      <Row eyebrow="Этапы" title="Этапы внедрения">
        <div className="grid gap-px overflow-hidden rounded-lg border bg-border sm:grid-cols-2">
          {s.stages.map((x) => (
            <div key={x.title} className="bg-card p-6">
              <h3 className="font-medium">{x.title}</h3>
              <p className="mt-2 text-base text-muted-foreground">{x.text}</p>
            </div>
          ))}
        </div>
      </Row>
      <Row eyebrow="Стоимость" title="Как рассчитывается стоимость"><DashList items={s.pricing} /></Row>
      <Row eyebrow="Услуги" title="Связанные услуги">
        <div className="flex flex-col gap-3">
          {services.filter((x) => s.services.includes(x.slug)).map((x) => (
            <Link key={x.slug} to="/services/$slug" params={{ slug: x.slug }} className="underline underline-offset-4 hover:text-signal">{x.title}</Link>
          ))}
        </div>
      </Row>
      <CtaSection source={`solution:${s.slug}`} />
    </>
  );
}
