import { createFileRoute, Link, notFound } from "@tanstack/react-router";

import { CtaSection } from "@/components/site/CtaSection";
import { FaqList } from "@/components/site/FaqList";
import { DashList, Eyebrow, PageHero } from "@/components/site/primitives";
import { getIndustry } from "@/content/industries";
import { services } from "@/content/services";
import { pageHead } from "@/lib/seo";

export const Route = createFileRoute("/industries/$slug")({
  loader: ({ params }) => {
    const industry = getIndustry(params.slug);
    if (!industry) throw notFound();
    return { industry };
  },
  head: ({ loaderData }) =>
    loaderData
      ? pageHead({ title: loaderData.industry.seoTitle, description: loaderData.industry.seoDescription })
      : pageHead({ title: "Отрасль не найдена — ProcessLab", description: "Страница недоступна.", noindex: true }),
  component: IndustryPage,
});

function IndustryPage() {
  const { industry: d } = Route.useLoaderData();
  return (
    <>
      <PageHero crumbs={[{ label: "Отрасли", to: "/industries" }, { label: d.title }]} eyebrow="Отрасль" title={d.title} lead={d.context} />
      <section className="section-y">
        <div className="container-site grid gap-16 lg:grid-cols-12">
          <div className="lg:col-span-4">
            <Eyebrow>Типовые проблемы</Eyebrow>
            <DashList items={d.pains} className="mt-6 text-lg" />
            <Eyebrow className="mt-12">Подходящие услуги</Eyebrow>
            <div className="mt-6 flex flex-col gap-3">
              {services.filter((s) => d.services.includes(s.slug)).map((s) => (
                <Link key={s.slug} to="/services/$slug" params={{ slug: s.slug }} className="underline underline-offset-4 hover:text-signal">{s.title}</Link>
              ))}
            </div>
          </div>
          <div className="lg:col-span-8">
            <h2 className="display-md">Сценарии автоматизации</h2>
            <div className="mt-8 grid gap-px overflow-hidden rounded-lg border bg-border sm:grid-cols-2">
              {d.scenarios.map((x) => (
                <div key={x.title} className="bg-card p-6">
                  <h3 className="text-lg font-medium">{x.title}</h3>
                  <p className="mt-2 text-muted-foreground">{x.text}</p>
                </div>
              ))}
            </div>
            <h2 className="display-md mt-16 mb-6">Вопросы</h2>
            <FaqList items={d.faq} />
          </div>
        </div>
      </section>
      <CtaSection source={`industry:${d.slug}`} />
    </>
  );
}
