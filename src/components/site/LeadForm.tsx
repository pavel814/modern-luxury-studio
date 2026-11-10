import { Link, useRouterState } from "@tanstack/react-router";
import { ArrowRight, Check, Loader2 } from "lucide-react";
import { useState, type FormEvent } from "react";
import { z } from "zod";

import { cn } from "@/lib/utils";

const schema = z.object({
  name: z.string().trim().min(2, "Укажите имя").max(100),
  company: z.string().trim().min(2, "Укажите компанию").max(150),
  contact: z
    .string()
    .trim()
    .min(5, "Укажите телефон или email")
    .max(150)
    .refine(
      (v) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v) || /^[+\d][\d\s()-]{6,}$/.test(v),
      "Проверьте телефон или email",
    ),
  message: z.string().trim().max(2000).optional(),
  consent: z.literal(true, { errorMap: () => ({ message: "Нужно согласие на обработку данных" }) }),
});

type Errors = Partial<Record<keyof z.infer<typeof schema>, string>>;

export function LeadForm({ invert = false, source }: { invert?: boolean; source?: string | undefined }) {
  const pathname = useRouterState({ select: (s) => s.location.pathname });
  const [errors, setErrors] = useState<Errors>({});
  const [status, setStatus] = useState<"idle" | "sending" | "done">("idle");

  async function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const fd = new FormData(e.currentTarget);
    if (fd.get("website")) return; // honeypot
    const parsed = schema.safeParse({
      name: fd.get("name"),
      company: fd.get("company"),
      contact: fd.get("contact"),
      message: fd.get("message") || undefined,
      consent: fd.get("consent") === "on",
    });
    if (!parsed.success) {
      const next: Errors = {};
      for (const issue of parsed.error.issues) next[issue.path[0] as keyof Errors] ??= issue.message;
      setErrors(next);
      return;
    }
    setErrors({});
    setStatus("sending");
    const params = new URLSearchParams(window.location.search);
    const payload = {
      ...parsed.data,
      source: source ?? pathname,
      utm: Object.fromEntries([...params].filter(([k]) => k.startsWith("utm_"))),
    };
    // TODO: send payload to backend storage + manager notification once Cloud is connected.
    void payload;
    await new Promise((r) => setTimeout(r, 700));
    setStatus("done");
  }

  const field = cn(
    "w-full border-0 border-b bg-transparent px-0 py-4 text-base outline-none transition-colors placeholder:opacity-60 focus:border-signal",
    invert ? "border-ink-line text-ink-foreground placeholder:text-ink-muted" : "border-input placeholder:text-muted-foreground",
  );
  const errorCls = "mt-2 text-sm text-signal";

  if (status === "done") {
    return (
      <div role="status" className={cn("flex min-h-[360px] flex-col justify-center", invert ? "text-ink-foreground" : "")}>
        <span className="grid h-14 w-14 place-items-center rounded-full bg-signal text-signal-foreground">
          <Check className="h-6 w-6" />
        </span>
        <h3 className="display-md mt-8">Спасибо, заявка отправлена</h3>
        <p className={cn("mt-4 max-w-md", invert ? "text-ink-muted" : "text-muted-foreground")}>
          Мы изучим задачу и свяжемся с вами в течение рабочего дня, чтобы обсудить возможные следующие шаги.
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={onSubmit} noValidate className="space-y-2" aria-label="Форма заявки">
      <input type="text" name="website" tabIndex={-1} autoComplete="off" className="hidden" aria-hidden />
      <div className="grid gap-x-8 sm:grid-cols-2">
        <div>
          <label htmlFor="lead-name" className="sr-only">Имя</label>
          <input id="lead-name" name="name" placeholder="Имя" autoComplete="name" className={field} aria-invalid={!!errors.name} />
          {errors.name && <p className={errorCls}>{errors.name}</p>}
        </div>
        <div>
          <label htmlFor="lead-company" className="sr-only">Компания</label>
          <input id="lead-company" name="company" placeholder="Компания" autoComplete="organization" className={field} aria-invalid={!!errors.company} />
          {errors.company && <p className={errorCls}>{errors.company}</p>}
        </div>
      </div>
      <div>
        <label htmlFor="lead-contact" className="sr-only">Телефон или email</label>
        <input id="lead-contact" name="contact" placeholder="Телефон или email" className={field} aria-invalid={!!errors.contact} />
        {errors.contact && <p className={errorCls}>{errors.contact}</p>}
      </div>
      <div>
        <label htmlFor="lead-message" className="sr-only">Описание задачи</label>
        <textarea
          id="lead-message"
          name="message"
          rows={3}
          placeholder="Опишите задачу своими словами (необязательно)"
          className={cn(field, "resize-none")}
        />
      </div>
      <div className="pt-6">
        <label className={cn("flex cursor-pointer items-start gap-3 text-sm", invert ? "text-ink-muted" : "text-muted-foreground")}>
          <input type="checkbox" name="consent" className="mt-0.5 h-4 w-4 shrink-0 accent-signal" />
          <span>
            Согласен на обработку персональных данных в соответствии с{" "}
            <Link to="/privacy" className="underline underline-offset-4 hover:text-signal">
              политикой
            </Link>
          </span>
        </label>
        {errors.consent && <p className={errorCls}>{errors.consent}</p>}
      </div>
      <div className="pt-8">
        <button
          type="submit"
          disabled={status === "sending"}
          className={cn(
            "group inline-flex h-14 w-full items-center justify-between gap-4 rounded-md px-7 text-[0.95rem] font-medium transition-all duration-300 disabled:opacity-60 sm:w-auto sm:min-w-[280px]",
            invert
              ? "bg-signal text-signal-foreground hover:bg-ink-foreground hover:text-ink"
              : "bg-primary text-primary-foreground hover:bg-signal hover:text-signal-foreground",
          )}
        >
          {status === "sending" ? "Отправляем…" : "Отправить заявку"}
          {status === "sending" ? (
            <Loader2 className="h-4 w-4 animate-spin" />
          ) : (
            <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
          )}
        </button>
      </div>
    </form>
  );
}
