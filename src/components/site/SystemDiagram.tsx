import { useEffect, useRef, useState } from "react";

import { cn } from "@/lib/utils";

type Node = { id: string; x: number; y: number; label: string; sub: string };

const nodes: Node[] = [
  { id: "1c", x: 120, y: 84, label: "1С", sub: "Учёт и финансы" },
  { id: "crm", x: 480, y: 84, label: "CRM", sub: "Продажи" },
  { id: "wms", x: 92, y: 262, label: "Склад", sub: "Остатки" },
  { id: "web", x: 508, y: 262, label: "Сайт", sub: "Заказы" },
  { id: "xls", x: 120, y: 440, label: "Excel", sub: "Отчёты" },
  { id: "mail", x: 480, y: 440, label: "Почта", sub: "Документы" },
];

const hub = { x: 300, y: 262 };

const beforeLinks: [string, string, string?][] = [
  ["1c", "xls", "ручной перенос"],
  ["crm", "1c", "двойной ввод"],
  ["mail", "xls"],
  ["web", "crm", "выгрузка"],
  ["wms", "1c"],
  ["mail", "web"],
];

const W = 148;
const H = 56;

export function SystemDiagram({ className }: { className?: string }) {
  const [mode, setMode] = useState<"before" | "after">("before");
  const touched = useRef(false);

  useEffect(() => {
    const t = setTimeout(() => {
      if (!touched.current) setMode("after");
    }, 2200);
    return () => clearTimeout(t);
  }, []);

  const select = (m: "before" | "after") => {
    touched.current = true;
    setMode(m);
  };

  const after = mode === "after";
  const byId = Object.fromEntries(nodes.map((n) => [n.id, n]));

  return (
    <figure className={cn("relative rounded-xl border bg-card p-4 shadow-float sm:p-6", className)}>
      <div className="flex items-center justify-between gap-4">
        <p className="eyebrow text-muted-foreground">Схема данных компании</p>
        <div role="tablist" aria-label="Состояние" className="flex rounded-md border p-0.5 text-xs">
          {(["before", "after"] as const).map((m) => (
            <button
              key={m}
              role="tab"
              aria-selected={mode === m}
              onClick={() => select(m)}
              className={cn(
                "rounded-[3px] px-3 py-1.5 font-medium transition-colors",
                mode === m ? "bg-primary text-primary-foreground" : "text-muted-foreground hover:text-foreground",
              )}
            >
              {m === "before" ? "Сейчас" : "После внедрения"}
            </button>
          ))}
        </div>
      </div>

      <svg viewBox="0 0 600 524" className="mt-4 h-auto w-full" role="img" aria-label="Связи между системами до и после интеграции">
        <defs>
          <pattern id="dots" width="20" height="20" patternUnits="userSpaceOnUse">
            <circle cx="1" cy="1" r="1" className="fill-foreground/10" />
          </pattern>
        </defs>
        <rect width="600" height="524" fill="url(#dots)" />

        {/* BEFORE: chaotic point-to-point links */}
        <g className={cn("transition-opacity duration-700", after ? "opacity-0" : "opacity-100")}>
          {beforeLinks.map(([a, b, label]) => {
            const A = byId[a];
            const B = byId[b];
            if (!A || !B) return null;
            const mx = (A.x + B.x) / 2;
            const my = (A.y + B.y) / 2;
            return (
              <g key={a + b}>
                <line x1={A.x} y1={A.y} x2={B.x} y2={B.y} strokeDasharray="4 6" strokeWidth="1.25" className="stroke-foreground/35" />
                {label && (
                  <g transform={`translate(${mx}, ${my})`}>
                    <rect x={-52} y={-11} width={104} height={22} rx={11} className="fill-background stroke-signal" strokeWidth="1" />
                    <text textAnchor="middle" y={4} className="fill-signal font-mono" fontSize="10">
                      {label}
                    </text>
                  </g>
                )}
              </g>
            );
          })}
          <g transform={`translate(${hub.x}, ${hub.y})`}>
            <circle r="34" strokeDasharray="3 5" className="fill-none stroke-foreground/25" />
            <text textAnchor="middle" y={5} className="fill-muted-foreground font-display" fontSize="16">?</text>
          </g>
        </g>

        {/* AFTER: hub-and-spoke integration */}
        <g className={cn("transition-opacity duration-700", after ? "opacity-100" : "opacity-0")}>
          {nodes.map((n) => (
            <g key={n.id}>
              <line x1={n.x} y1={n.y} x2={hub.x} y2={hub.y} strokeWidth="1.25" className="stroke-foreground/25" />
              <line
                x1={n.x}
                y1={n.y}
                x2={hub.x}
                y2={hub.y}
                strokeWidth="1.75"
                strokeDasharray="6 14"
                className="animate-flow stroke-signal"
              />
            </g>
          ))}
          <g transform={`translate(${hub.x - 92}, ${hub.y - 40})`}>
            <rect width="184" height="80" rx="6" className="fill-primary" />
            <text x="92" y="34" textAnchor="middle" className="fill-primary-foreground font-display" fontSize="15">
              Единый слой данных
            </text>
            <text x="92" y="56" textAnchor="middle" className="fill-primary-foreground/60 font-mono" fontSize="10" letterSpacing="1">
              API · ОБМЕНЫ · КОНТРОЛЬ
            </text>
          </g>
        </g>

        {nodes.map((n) => (
          <g key={n.id} transform={`translate(${n.x - W / 2}, ${n.y - H / 2})`}>
            <rect width={W} height={H} rx="5" className="fill-card stroke-foreground/20" strokeWidth="1" />
            <text x="16" y="25" className="fill-foreground font-display" fontSize="15">
              {n.label}
            </text>
            <text x="16" y="42" className="fill-muted-foreground font-sans" fontSize="11">
              {n.sub}
            </text>
            <circle
              cx={W - 16}
              cy={18}
              r="4"
              className={cn("transition-colors duration-700", after ? "fill-foreground/70" : "animate-pulse-dot fill-signal")}
            />
          </g>
        ))}
      </svg>

      <figcaption className="mt-2 grid grid-cols-3 gap-px overflow-hidden rounded-md border bg-border text-xs">
        {[
          ["Ввод данных", after ? "один раз" : "многократно"],
          ["Отчётность", after ? "автоматически" : "вручную"],
          ["Ошибки обмена", after ? "видны сразу" : "незаметны"],
        ].map(([k, v]) => (
          <div key={k} className="bg-card px-3 py-3">
            <p className="text-muted-foreground">{k}</p>
            <p className={cn("mt-1 font-medium transition-colors", after ? "text-foreground" : "text-signal")}>{v}</p>
          </div>
        ))}
      </figcaption>
    </figure>
  );
}
