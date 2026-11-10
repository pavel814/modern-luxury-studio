import { createFileRoute, notFound } from "@tanstack/react-router";

import { CtaSection } from "@/components/site/CtaSection";
import { DashList, Eyebrow, PageHero } from "@/components/site/primitives";
import { getCase } from "@/content/cases";
import { pageHead } from "@/lib/seo";

export const Route = createFileRoute("/cases/$slug")({
  loader: ({ params }) => {
    const item = getCase(params.slug);
    if (!item) throw notFound();
    return { item };
  },
  head: ({ loaderData }) =>
    loaderData
      ? pageHead({ title: `${loaderData.item.title} — демонстрационное решение ProcessLab`, description: loaderData.item.seoDescription })
      : pageHead({ title: "Кейс не найден — ProcessLab", description: "Страница недоступна.", noindex: true }),
  component: CasePage,
});

function CasePage() {
  const { item: c } = Route.useLoaderData();
  const rows: [string, React.ReactNode][] = [
    ["Контекст", <p key="c">{c.context}</p>],
    ["Исходная ситуация", <p key="s">{c.situation}</p>],
    ["Цели", <DashList key="g" items={c.goals} />],
    ["Анализ и подход", <p key="a">{c.analysis}</p>],
    [
      "Архитектура",
      <ol key="ar" className="space-y-5">
        {c.architecture.map((x, i) => (
          <li key={x.title} className="grid grid-cols-[3rem_1fr] gap-4">
            <span className="font-display text-signal">{String(i + 1).padStart(2, "0")}</span>
            <span><strong className="font-medium">{x.title}.</strong> <span className="text-muted-foreground">{x.text}</span></span>
          </li>
        ))}
      </ol>,
    ],
    ["Сложности", <DashList key="ch" items={c.challenges} />],
    ["Что показывает демонстрация", <DashList key="o" items={c.outcomes} />],
    ["Дальнейшее развитие", <DashList key="n" items={c.next} />],
  ];
  return (
    <>
      <PageHero crumbs={[{ label: "Кейсы", to: "/cases" }, { label: c.title }]} eyebrow="Демонстрационное решение" title={c.title} lead={`${c.industry}. ${c.companyType}.`}>
        <div className="flex flex-wrap gap-2">
          {c.systems.map((s) => <span key={s} className="rounded-sm border px-3 py-1.5 font-mono text-sm">{s}</span>)}
        </div>
      </PageHero>
      {rows.map(([title, body]) => (
        <section key={title} className="border-t py-14 lg:py-20">
          <div className="container-site grid gap-8 lg:grid-cols-12">
            <Eyebrow className="lg:col-span-4">{title}</Eyebrow>
            <div className="text-lg lg:col-span-8">{body}</div>
          </div>
        </section>
      ))}
      <CtaSection source={`case:${c.slug}`} />
    </>
  );
}
