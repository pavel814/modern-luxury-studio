import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";

export function FaqList({ items }: { items: { q: string; a: string }[] }) {
  return (
    <Accordion type="single" collapsible className="border-t">
      {items.map((item, i) => (
        <AccordionItem key={item.q} value={`q-${i}`}>
          <AccordionTrigger className="gap-6 py-7 text-left font-display text-lg font-normal hover:no-underline md:text-xl [&>svg]:h-5 [&>svg]:w-5">
            <span className="flex gap-6">
              <span className="eyebrow mt-1.5 hidden w-8 text-muted-foreground sm:block">{String(i + 1).padStart(2, "0")}</span>
              {item.q}
            </span>
          </AccordionTrigger>
          <AccordionContent className="pb-8 text-base leading-relaxed text-muted-foreground sm:pl-14 md:max-w-3xl">
            {item.a}
          </AccordionContent>
        </AccordionItem>
      ))}
    </Accordion>
  );
}
