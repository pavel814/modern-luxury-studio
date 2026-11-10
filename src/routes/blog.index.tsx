import { createFileRoute, Link } from "@tanstack/react-router";

import { PageHero } from "@/components/site/primitives";
import { articles, formatDate } from "@/content/articles";
import { pageHead } from "@/lib/seo";

export const Route = createFileRoute("/blog/")({
  head: () =>
    pageHead({
      title: "Экспертиза: статьи об автоматизации и интеграциях — ProcessLab",
      description: "Практические материалы об автоматизации бизнес-процессов, интеграции 1С и CRM, BI и окупаемости IT-проектов.",
    }),
  component: () => (
    <>
      <PageHero crumbs={[{ label: "Экспертиза" }]} eyebrow="Экспертиза" title="Практика автоматизации и цифровой трансформации" lead="Экспертные материалы с примерами, ограничениями и рекомендациями." />
      <section className="section-y">
        <div className="container-site border-t">
          {articles.map((a) => (
            <Link key={a.slug} to="/blog/$slug" params={{ slug: a.slug }} className="group grid gap-4 border-b py-10 md:grid-cols-12">
              <div className="text-sm text-muted-foreground md:col-span-3">
                <p className="eyebrow text-signal">{a.category}</p>
                <p className="mt-2">Обновлено {formatDate(a.updated)}</p>
              </div>
              <div className="md:col-span-9">
                <h2 className="display-md group-hover:text-signal">{a.title}</h2>
                <p className="mt-3 text-muted-foreground">{a.excerpt}</p>
              </div>
            </Link>
          ))}
        </div>
      </section>
    </>
  ),
});
