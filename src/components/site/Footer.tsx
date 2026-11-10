import { Link } from "@tanstack/react-router";

import { articles } from "@/content/articles";
import { industries } from "@/content/industries";
import { services } from "@/content/services";
import { company } from "@/content/site";

import { Logo } from "./Logo";

export function Footer() {
  return (
    <footer className="surface-ink">
      <div className="container-site pt-20 pb-10">
        <div className="grid gap-12 lg:grid-cols-12">
          <div className="lg:col-span-4">
            <Logo className="text-ink-foreground" />
            <p className="mt-6 max-w-sm text-ink-muted">
              Анализируем процессы, проектируем и внедряем IT-решения, которые решают конкретные задачи бизнеса.
            </p>
            <div className="mt-8 space-y-1">
              <a href={company.phoneHref} className="block text-xl transition-colors hover:text-signal">
                {company.phone}
              </a>
              <a href={`mailto:${company.email}`} className="block text-ink-muted transition-colors hover:text-ink-foreground">
                {company.email}
              </a>
              <p className="pt-2 text-sm text-ink-muted">
                {company.address} · {company.hours}
              </p>
            </div>
          </div>

          <FooterCol title="Услуги">
            {services.map((s) => (
              <Link key={s.slug} to="/services/$slug" params={{ slug: s.slug }} className="footer-link">
                {s.title}
              </Link>
            ))}
          </FooterCol>
          <FooterCol title="Отрасли">
            {industries.map((i) => (
              <Link key={i.slug} to="/industries/$slug" params={{ slug: i.slug }} className="footer-link">
                {i.title}
              </Link>
            ))}
          </FooterCol>
          <FooterCol title="Компания">
            <Link to="/about" className="footer-link">О компании</Link>
            <Link to="/solutions" className="footer-link">Решения</Link>
            <Link to="/cases" className="footer-link">Кейсы</Link>
            <Link to="/blog" className="footer-link">Экспертиза</Link>
            <Link to="/contacts" className="footer-link">Контакты</Link>
          </FooterCol>
          <FooterCol title="Материалы">
            {articles.slice(0, 3).map((a) => (
              <Link key={a.slug} to="/blog/$slug" params={{ slug: a.slug }} className="footer-link">
                {a.title}
              </Link>
            ))}
          </FooterCol>
        </div>

        <div className="mt-20 flex flex-col gap-4 border-t border-ink-line pt-8 text-sm text-ink-muted md:flex-row md:items-center md:justify-between">
          <p>
            © {new Date().getFullYear()} {company.legalName}. {company.unp}
          </p>
          <Link to="/privacy" className="transition-colors hover:text-ink-foreground">
            Политика обработки персональных данных
          </Link>
        </div>
      </div>
    </footer>
  );
}

function FooterCol({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="lg:col-span-2">
      <p className="eyebrow mb-5 text-ink-muted">{title}</p>
      <div className="flex flex-col gap-3 text-[0.9rem] leading-snug">{children}</div>
    </div>
  );
}
