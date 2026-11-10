import { createFileRoute, Link, notFound } from "@tanstack/react-router";

import { CtaSection } from "@/components/site/CtaSection";
import { Breadcrumbs, Eyebrow } from "@/components/site/primitives";
import { articles, formatDate, getArticle } from "@/content/articles";
import { services } from "@/content/services";
import { pageHead } from "@/lib/seo";

export const Route = createFileRoute("/blog/$slug")({
  loader: ({ params }) => {
    const article = getArticle(params.slug);
    if (!article) throw notFound();
    return { article };
  },
  head: ({ loaderData }) =>
    loaderData
      ? pageHead({
          title: `${loaderData.article.title} — ProcessLab`,
          description: loaderData.article.excerpt,
          type: "article",
          jsonLd: {
            "@type": "Article",
            headline: loaderData.article.title,
            datePublished: loaderData.article.published,
            dateModified: loaderData.article.updated,
            author: { "@type": "Organization", name: "ProcessLab" },
          },
        })
      : pageHead({ title: "Статья не найдена — ProcessLab", description: "Страница недоступна.", noindex: true }),
  component: ArticlePage,
});

function ArticlePage() {
  const { article: a } = Route.useLoaderData();
  const related = articles.filter((x) => x.slug !== a.slug);
  return (
    <>
      <article className="pt-32 lg:pt-44">
        <div className="container-site">
          <Breadcrumbs items={[{ label: "Экспертиза", to: "/blog" }, { label: a.title }]} />
          <div className="mt-12 max-w-4xl">
            <Eyebrow>{a.category}</Eyebrow>
            <h1 className="display-lg mt-6">{a.title}</h1>
            <p className="mt-6 text-sm text-muted-foreground">
              {a.author} · Опубликовано {formatDate(a.published)} · Обновлено {formatDate(a.updated)} · {a.readTime}
            </p>
          </div>
          <div className="mt-16 grid gap-12 border-t pt-12 lg:grid-cols-12">
            <aside className="lg:col-span-3">
              <nav className="lg:sticky lg:top-32" aria-label="Оглавление">
                <p className="eyebrow text-muted-foreground">Содержание</p>
                <ol className="mt-4 space-y-3 text-sm">
                  {a.sections.map((s) => (
                    <li key={s.id}><a href={`#${s.id}`} className="hover:text-signal">{s.title}</a></li>
                  ))}
                </ol>
              </nav>
            </aside>
            <div className="prose-article lg:col-span-7">
              <p className="lead text-muted-foreground">{a.excerpt}</p>
              {a.sections.map((s) => (
                <section key={s.id}>
                  <h2 id={s.id}>{s.title}</h2>
                  {s.paragraphs.map((p) => <p key={p}>{p}</p>)}
                  {s.list && <ul>{s.list.map((l) => <li key={l}>{l}</li>)}</ul>}
                </section>
              ))}
              <div className="mt-12 rounded-lg border bg-card p-8">
                <p className="eyebrow text-muted-foreground">Связанные услуги</p>
                <div className="mt-4 flex flex-col gap-2">
                  {services.filter((x) => a.services.includes(x.slug)).map((x) => (
                    <Link key={x.slug} to="/services/$slug" params={{ slug: x.slug }} className="underline underline-offset-4 hover:text-signal">{x.title}</Link>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </article>
      <section className="section-y">
        <div className="container-site">
          <h2 className="display-md">Читайте также</h2>
          <div className="mt-8 grid gap-6 md:grid-cols-2">
            {related.map((r) => (
              <Link key={r.slug} to="/blog/$slug" params={{ slug: r.slug }} className="rounded-lg border p-8 hover:bg-card">
                <p className="eyebrow text-signal">{r.category}</p>
                <h3 className="mt-4 text-xl font-medium">{r.title}</h3>
              </Link>
            ))}
          </div>
        </div>
      </section>
      <CtaSection source={`article:${a.slug}`} />
    </>
  );
}
