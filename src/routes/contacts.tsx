import { createFileRoute } from "@tanstack/react-router";

import { LeadForm } from "@/components/site/LeadForm";
import { PageHero } from "@/components/site/primitives";
import { company } from "@/content/site";
import { pageHead } from "@/lib/seo";

export const Route = createFileRoute("/contacts")({
  head: () =>
    pageHead({
      title: "Контакты — обсудить задачу с ProcessLab",
      description: "Опишите задачу своими словами — мы изучим ситуацию и предложим следующие шаги. Телефон, email и форма заявки.",
    }),
  component: () => (
    <>
      <PageHero crumbs={[{ label: "Контакты" }]} eyebrow="Контакты" title="Обсудим вашу задачу" lead="Опишите ситуацию своими словами. Ответим в течение рабочего дня." />
      <section className="section-y">
        <div className="container-site grid gap-16 lg:grid-cols-12">
          <dl className="space-y-8 lg:col-span-4">
            {[
              ["Телефон", <a key="p" href={company.phoneHref} className="hover:text-signal">{company.phone}</a>],
              ["Email", <a key="e" href={`mailto:${company.email}`} className="hover:text-signal">{company.email}</a>],
              ["Telegram", <a key="t" href={company.telegram} className="hover:text-signal">@processlab</a>],
              ["Адрес", company.address],
              ["Часы работы", company.hours],
            ].map(([k, v]) => (
              <div key={String(k)} className="border-t pt-4">
                <dt className="eyebrow text-muted-foreground">{k}</dt>
                <dd className="mt-2 text-xl">{v}</dd>
              </div>
            ))}
          </dl>
          <div className="lg:col-span-7 lg:col-start-6">
            <LeadForm source="contacts" />
          </div>
        </div>
      </section>
    </>
  ),
});
