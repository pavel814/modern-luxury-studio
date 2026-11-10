import { createFileRoute } from "@tanstack/react-router";

import { PageHero } from "@/components/site/primitives";
import { company } from "@/content/site";
import { pageHead } from "@/lib/seo";

export const Route = createFileRoute("/privacy")({
  head: () =>
    pageHead({
      title: "Политика обработки персональных данных — ProcessLab",
      description: "Как ProcessLab обрабатывает и защищает персональные данные посетителей сайта.",
    }),
  component: () => (
    <>
      <PageHero crumbs={[{ label: "Политика конфиденциальности" }]} title="Политика обработки персональных данных" />
      <section className="section-y">
        <div className="container-site prose-article max-w-3xl">
          <p>Черновик документа. Окончательную редакцию необходимо согласовать с юристом.</p>
          <h2>Оператор</h2>
          <p>{company.legalName}, {company.unp}, {company.address}. Email: {company.email}.</p>
          <h2>Какие данные мы обрабатываем</h2>
          <ul>
            <li>Имя, название компании, телефон или email, указанные в форме заявки</li>
            <li>Текст обращения</li>
            <li>Технические данные: источник перехода и UTM-метки</li>
          </ul>
          <h2>Цели обработки</h2>
          <p>Обработка заявок, связь с вами и подготовка предложения.</p>
          <h2>Ваши права</h2>
          <p>Вы можете запросить сведения о своих данных, их изменение или удаление, написав на {company.email}.</p>
        </div>
      </section>
    </>
  ),
});
