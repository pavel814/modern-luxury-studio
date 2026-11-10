import { company } from "@/content/site";

import { LeadForm } from "./LeadForm";
import { Eyebrow } from "./primitives";

export function CtaSection({
  title = "Расскажите, что мешает вашему бизнесу работать эффективнее",
  text = "Опишите задачу своими словами. Мы изучим ситуацию и предложим возможные следующие шаги.",
  source,
}: {
  title?: string;
  text?: string;
  source?: string | undefined;
}) {
  return (
    <section id="lead" className="surface-ink relative overflow-hidden">
      <div className="grid-ink pointer-events-none absolute inset-0 opacity-40 [mask-image:radial-gradient(ellipse_at_top_left,black,transparent_70%)]" aria-hidden />
      <div className="container-site section-y relative grid gap-16 lg:grid-cols-12">
        <div className="lg:col-span-5">
          <Eyebrow className="text-ink-muted">Обсудить задачу</Eyebrow>
          <h2 className="display-lg mt-6">{title}</h2>
          <p className="lead mt-6 text-ink-muted">{text}</p>
          <dl className="mt-12 space-y-6 border-t border-ink-line pt-8 text-sm">
            <div className="flex justify-between gap-6">
              <dt className="text-ink-muted">Телефон</dt>
              <dd><a href={company.phoneHref} className="hover:text-signal">{company.phone}</a></dd>
            </div>
            <div className="flex justify-between gap-6">
              <dt className="text-ink-muted">Email</dt>
              <dd><a href={`mailto:${company.email}`} className="hover:text-signal">{company.email}</a></dd>
            </div>
            <div className="flex justify-between gap-6">
              <dt className="text-ink-muted">Ответим</dt>
              <dd>в течение рабочего дня</dd>
            </div>
          </dl>
        </div>
        <div className="lg:col-span-6 lg:col-start-7">
          <LeadForm invert source={source} />
        </div>
      </div>
    </section>
  );
}
