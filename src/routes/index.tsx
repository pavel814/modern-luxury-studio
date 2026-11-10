import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight } from "lucide-react";

import { CtaSection } from "@/components/site/CtaSection";
import { FaqList } from "@/components/site/FaqList";
import { ArrowMark, DashList, Eyebrow, SectionHeading } from "@/components/site/primitives";
import { SystemDiagram } from "@/components/site/SystemDiagram";
import { Button } from "@/components/ui/button";
import { articles, formatDate } from "@/content/articles";
import { cases } from "@/content/cases";
import { industries } from "@/content/industries";
import { services } from "@/content/services";
import { approach, company, homeFaq, problems, whyUs } from "@/content/site";
import { pageHead } from "@/lib/seo";

export const Route = createFileRoute("/")({
  head: () =>
    pageHead({
      title: "ProcessLab — находим проблемы в бизнес-процессах и решаем их с помощью технологий",
      description:
        "Технологический консалтинг для среднего бизнеса в Беларуси: аудит процессов, автоматизация, интеграция 1С и CRM, внедрение AI и BI-аналитики.",
      jsonLd: [
        {
          "@type": "Organization",
          name: company.name,
          legalName: company.legalName,
          email: company.email,
          telephone: company.phone,
          address: { "@type": "PostalAddress", addressLocality: "Минск", addressCountry: "BY" },
        },
        {
          "@type": "FAQPage",
          mainEntity: homeFaq.map((f) => ({
            "@type": "Question",
            name: f.q,
            acceptedAnswer: { "@type": "Answer", text: f.a },
          })),
        },
      ],
    }),
  component: Index,
});

function Index() {
  return (
    <>
      <Hero />
      <Problems />
      <Approach />
      <Services />
      <Industries />
      <Cases />
      <WhyUs />
      <Expertise />
      <section className="section-y">
        <div className="container-site grid gap-12 lg:grid-cols-12">
          <div className="lg:col-span-4">
            <Eyebrow>Вопросы и ответы</Eyebrow>
            <h2 className="display-lg mt-6">Частые вопросы</h2>
            <p className="mt-6 text-muted-foreground">
              Не нашли ответ? Задайте вопрос по телефону{" "}
              <a href={company.phoneHref} className="text-foreground underline underline-offset-4 hover:text-signal">
                {company.phone}
              </a>
              .
            </p>
          </div>
          <div className="lg:col-span-8">
            <FaqList items={homeFaq} />
          </div>
        </div>
      </section>
      <CtaSection source="home" />
    </>
  );
}

function Hero() {
  return (
    <section className="relative overflow-hidden pt-32 lg:pt-40">
      <div className="grid-paper pointer-events-none absolute inset-0 opacity-60 [mask-image:linear-gradient(to_bottom,black_30%,transparent)]" aria-hidden />
      <div className="container-site relative grid items-center gap-14 pb-20 lg:grid-cols-12 lg:gap-10 lg:pb-28">
        <div className="lg:col-span-7">
          <Eyebrow className="animate-fade-up">Технологический консалтинг · Беларусь</Eyebrow>
          <h1 className="display-xl mt-8 animate-fade-up [animation-delay:80ms]">
            Находим проблемы в бизнес-процессах и решаем их <span className="text-signal">с помощью технологий</span>
          </h1>
          <p className="lead mt-8 max-w-2xl animate-fade-up text-muted-foreground [animation-delay:160ms]">
            Анализируем работу компании, выявляем точки потерь, проектируем и внедряем IT-решения. Автоматизируем
            процессы, объединяем системы и помогаем бизнесу работать эффективнее.
          </p>
          <div className="mt-10 flex animate-fade-up flex-wrap gap-3 [animation-delay:240ms]">
            <Button asChild size="lg">
              <Link to="/contacts">
                Обсудить задачу
                <ArrowRight className="transition-transform group-hover/btn:translate-x-1" />
              </Link>
            </Button>
            <Button asChild size="lg" variant="outline">
              <a href="#approach">Как мы работаем</a>
            </Button>
          </div>
        </div>
        <div className="animate-fade-up [animation-delay:200ms] lg:col-span-5">
          <SystemDiagram />
        </div>
      </div>
      <div className="relative border-y bg-background/70 backdrop-blur">
        <div className="container-site grid grid-cols-2 md:grid-cols-5">
          {["Анализ бизнеса", "Аудит процессов", "Проектирование", "Внедрение", "Сопровождение"].map((s, i) => (
            <div key={s} className="flex items-center gap-3 border-r py-5 pl-0 pr-4 last:border-r-0 md:px-6 md:first:pl-0">
              <span className="eyebrow text-signal">{String(i + 1).padStart(2, "0")}</span>
              <span className="text-sm font-medium">{s}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function Problems() {
  return (
    <section className="section-y">
      <div className="container-site">
        <SectionHeading
          eyebrow="Какие проблемы мы решаем"
          title="Когда бизнес становится сложнее, процессы не должны его тормозить"
          lead="Узнайте свою ситуацию. За каждым симптомом стоит причина, которую можно устранить."
        />
        <div className="mt-16 border-t">
          <div className="eyebrow hidden grid-cols-12 gap-8 border-b py-4 text-muted-foreground lg:grid">
            <span className="col-span-4">Симптом</span>
            <span className="col-span-4">Возможная причина</span>
            <span className="col-span-4">Как помогаем</span>
          </div>
          {problems.map((p, i) => (
            <article
              key={p.title}
              className="group grid gap-4 border-b py-8 transition-colors hover:bg-card lg:grid-cols-12 lg:gap-8 lg:px-4 lg:-mx-4"
            >
              <div className="lg:col-span-4">
                <div className="flex gap-4">
                  <span className="eyebrow mt-1.5 text-muted-foreground transition-colors group-hover:text-signal">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <div>
                    <h3 className="text-xl font-medium leading-snug">{p.title}</h3>
                    <p className="mt-2 text-muted-foreground">{p.symptom}</p>
                  </div>
                </div>
              </div>
              <p className="pl-10 text-muted-foreground lg:col-span-4 lg:pl-0">
                <span className="eyebrow mb-1 block lg:hidden">Причина</span>
                {p.cause}
              </p>
              <p className="pl-10 lg:col-span-4 lg:pl-0">
                <span className="eyebrow mb-1 block text-muted-foreground lg:hidden">Как помогаем</span>
                {p.help}
              </p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

function Approach() {
  return (
    <section id="approach" className="surface-ink relative scroll-mt-20 overflow-hidden">
      <div className="grid-ink pointer-events-none absolute inset-0 opacity-30 [mask-image:linear-gradient(to_bottom,transparent,black,transparent)]" aria-hidden />
      <div className="container-site section-y relative">
        <SectionHeading
          invert
          eyebrow="Наш подход"
          title="Сначала разбираемся в задаче. Затем предлагаем решение"
          lead="Каждый этап заканчивается понятным результатом. Вы принимаете решение о следующем шаге, видя бюджет и ожидаемый эффект."
        />
        <ol className="relative mt-20 grid gap-0 lg:grid-cols-5">
          <div className="absolute left-[7px] top-2 bottom-2 w-px bg-ink-line lg:left-0 lg:right-0 lg:top-[7px] lg:bottom-auto lg:h-px lg:w-auto" aria-hidden />
          {approach.map((step, i) => (
            <li key={step.n} className="relative pb-12 pl-10 lg:pb-0 lg:pl-0 lg:pr-8">
              <span
                className={
                  i === 0
                    ? "absolute left-0 top-0 h-[15px] w-[15px] rounded-full bg-signal ring-4 ring-ink"
                    : "absolute left-0 top-0 h-[15px] w-[15px] rounded-full border border-ink-muted bg-ink ring-4 ring-ink"
                }
                aria-hidden
              />
              <p className="eyebrow text-ink-muted lg:mt-10">Этап {step.n}</p>
              <h3 className="display-md mt-3">{step.title}</h3>
              <p className="mt-4 text-ink-muted">{step.text}</p>
              <p className="mt-6 inline-flex border-t border-ink-line pt-4 text-sm">
                <span className="mr-2 text-signal">→</span>
                {step.output}
              </p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}

function Services() {
  return (
    <section className="section-y">
      <div className="container-site">
        <SectionHeading
          eyebrow="Услуги"
          title="Технологические решения под задачи вашего бизнеса"
          lead="Сначала ценность для бизнеса, затем технология. Выбираем инструменты исходя из задачи, бюджета и инфраструктуры."
        />
        <div className="mt-16 grid gap-px overflow-hidden rounded-lg border bg-border md:grid-cols-2 lg:grid-cols-3">
          {services.map((s, i) => (
            <Link
              key={s.slug}
              to="/services/$slug"
              params={{ slug: s.slug }}
              className="group relative flex flex-col bg-background p-8 transition-colors duration-300 hover:bg-card lg:p-10"
            >
              <div className="flex items-start justify-between">
                <span className="eyebrow text-muted-foreground">{String(i + 1).padStart(2, "0")}</span>
                <ArrowMark className="text-muted-foreground group-hover:text-signal" />
              </div>
              <h3 className="mt-10 text-2xl font-normal leading-tight font-display">{s.title}</h3>
              <p className="mt-4 text-muted-foreground">{s.short}</p>
              <DashList items={s.tasks} className="mt-8 text-sm" />
              <span className="absolute inset-x-0 bottom-0 h-0.5 origin-left scale-x-0 bg-signal transition-transform duration-500 group-hover:scale-x-100" aria-hidden />
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}

function Industries() {
  return (
    <section className="section-y bg-paper-deep">
      <div className="container-site">
        <SectionHeading
          eyebrow="Отрасли"
          title="Понимаем задачи разных отраслей"
          lead="У каждой отрасли свои узкие места. Начинаем с них, а не с названия системы."
        />
        <div className="mt-16 border-t border-foreground/15">
          {industries.map((ind, i) => (
            <Link
              key={ind.slug}
              to="/industries/$slug"
              params={{ slug: ind.slug }}
              className="group grid items-center gap-4 border-b border-foreground/15 py-8 md:grid-cols-12 md:gap-8"
            >
              <span className="eyebrow text-muted-foreground md:col-span-1">{String(i + 1).padStart(2, "0")}</span>
              <h3 className="display-md transition-colors group-hover:text-signal md:col-span-4">{ind.title}</h3>
              <div className="flex flex-wrap gap-2 md:col-span-6">
                {ind.pains.map((p) => (
                  <span key={p} className="rounded-full border border-foreground/15 px-3 py-1 text-sm text-muted-foreground">
                    {p}
                  </span>
                ))}
              </div>
              <ArrowMark className="hidden justify-self-end md:col-span-1 md:block group-hover:text-signal" />
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}

function Cases() {
  return (
    <section className="section-y">
      <div className="container-site">
        <SectionHeading
          eyebrow="Кейсы и результаты"
          title="Как технологии помогают решать бизнес-задачи"
          lead="Мы публикуем только подтверждённые результаты. Пока здесь — демонстрационные решения с описанием технической реализации."
        />
        <div className="mt-16 grid gap-6 lg:grid-cols-2">
          {cases.map((c) => (
            <Link
              key={c.slug}
              to="/cases/$slug"
              params={{ slug: c.slug }}
              className="group flex flex-col rounded-lg border bg-card p-8 transition-all duration-500 hover:-translate-y-1 hover:shadow-float lg:p-10"
            >
              <div className="flex flex-wrap items-center justify-between gap-3">
                <span className="eyebrow rounded-sm bg-signal-soft px-2.5 py-1 text-signal">Демонстрационное решение</span>
                <span className="text-sm text-muted-foreground">{c.industry}</span>
              </div>
              <h3 className="display-md mt-10">{c.title}</h3>
              <dl className="mt-8 grid gap-6 border-t pt-8 text-sm sm:grid-cols-2">
                <div>
                  <dt className="eyebrow text-muted-foreground">Проблема</dt>
                  <dd className="mt-2">{c.problem}</dd>
                </div>
                <div>
                  <dt className="eyebrow text-muted-foreground">Что сделано</dt>
                  <dd className="mt-2">{c.done}</dd>
                </div>
              </dl>
              <div className="mt-8 flex flex-wrap gap-2">
                {c.systems.map((s) => (
                  <span key={s} className="rounded-sm border px-2.5 py-1 font-mono text-xs text-muted-foreground">
                    {s}
                  </span>
                ))}
              </div>
              <span className="mt-auto flex items-center gap-2 pt-10 text-sm font-medium">
                Подробнее о решении <ArrowMark className="h-4 w-4 group-hover:text-signal" />
              </span>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}

function WhyUs() {
  return (
    <section className="section-y border-t">
      <div className="container-site grid gap-16 lg:grid-cols-12">
        <div className="lg:col-span-5">
          <div className="lg:sticky lg:top-32">
            <Eyebrow>Почему мы</Eyebrow>
            <h2 className="display-lg mt-6">Не просто исполнители. Партнёры по развитию бизнеса</h2>
            <p className="lead mt-6 text-muted-foreground">
              Мы отвечаем за путь от анализа проблемы до работающего решения — и подтверждаем это методикой, а не
              обещаниями.
            </p>
            <Button asChild variant="outline" size="lg" className="mt-10">
              <Link to="/about">О компании</Link>
            </Button>
          </div>
        </div>
        <div className="lg:col-span-7">
          {whyUs.map((w, i) => (
            <div key={w.title} className="grid gap-4 border-t py-10 first:border-t-0 first:pt-0 sm:grid-cols-[4rem_1fr]">
              <span className="font-display text-3xl text-signal">{String(i + 1).padStart(2, "0")}</span>
              <div>
                <h3 className="text-2xl font-normal font-display">{w.title}</h3>
                <p className="mt-3 text-muted-foreground">{w.text}</p>
                <p className="mt-5 flex items-center gap-3 text-sm">
                  <span className="eyebrow text-muted-foreground">Как проверить</span>
                  <span>{w.proof}</span>
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function Expertise() {
  return (
    <section className="section-y bg-paper-deep">
      <div className="container-site">
        <div className="flex flex-wrap items-end justify-between gap-8">
          <div className="max-w-3xl">
            <Eyebrow>Экспертиза</Eyebrow>
            <h2 className="display-lg mt-6">Практика автоматизации и цифровой трансформации</h2>
          </div>
          <Button asChild variant="outline">
            <Link to="/blog">Все материалы</Link>
          </Button>
        </div>
        <div className="mt-16 grid gap-6 md:grid-cols-3">
          {articles.map((a) => (
            <Link
              key={a.slug}
              to="/blog/$slug"
              params={{ slug: a.slug }}
              className="group flex flex-col rounded-lg border border-foreground/10 bg-background p-8 transition-colors hover:border-foreground/30"
            >
              <div className="flex items-center justify-between text-sm text-muted-foreground">
                <span className="eyebrow text-signal">{a.category}</span>
                <span>{a.readTime}</span>
              </div>
              <h3 className="mt-8 text-xl font-medium leading-snug group-hover:text-signal transition-colors">{a.title}</h3>
              <p className="mt-4 text-sm text-muted-foreground">{a.excerpt}</p>
              <p className="mt-auto pt-8 text-xs text-muted-foreground">Обновлено {formatDate(a.updated)}</p>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
