import { useMemo, useState } from 'react';

type Category = 'simple' | 'lifestyle' | 'animation';

type CatalogItem = {
  id: string;
  title: string;
  price: number; // USD per unit
  days: number;  // Production days per unit
  img?: string;  // optional placeholder path
};

const catalog: Record<Category, CatalogItem[]> = {
  simple: [
    { id: 's-1', title: 'Single Angle Studio', price: 120, days: 1 },
    { id: 's-2', title: 'Two Angles Studio', price: 200, days: 2 },
    { id: 's-3', title: 'Three Angles Studio', price: 280, days: 3 },
    { id: 's-4', title: 'Material Variant', price: 60, days: 0.5 },
    { id: 's-5', title: 'Cut-out PNG', price: 40, days: 0.25 },
    { id: 's-6', title: 'Detail Macro', price: 90, days: 0.75 },
  ],
  lifestyle: [
    { id: 'l-1', title: 'Styled Interior Scene', price: 350, days: 2 },
    { id: 'l-2', title: 'Hero Shot (Art Directed)', price: 600, days: 4 },
    { id: 'l-3', title: 'Scene Variation', price: 220, days: 1.5 },
    { id: 'l-4', title: 'Roomset With People', price: 750, days: 5 },
    { id: 'l-5', title: 'Environment Swap', price: 180, days: 1 },
    { id: 'l-6', title: 'Colorway Collection', price: 260, days: 1.5 },
  ],
  animation: [
    { id: 'a-1', title: '360° Spin (short)', price: 400, days: 2 },
    { id: 'a-2', title: 'Feature Loop (5–8s)', price: 650, days: 3 },
    { id: 'a-3', title: 'Mechanism Explainer', price: 900, days: 4 },
    { id: 'a-4', title: 'Camera Fly-through', price: 800, days: 4 },
    { id: 'a-5', title: 'Social Cutdowns (x3)', price: 300, days: 1.5 },
    { id: 'a-6', title: 'Logo/Title Card', price: 140, days: 0.75 },
  ],
};

type QtyState = Record<string, number>;

export default function PricingPage() {
  const [category, setCategory] = useState<Category>('simple');
  const [qty, setQty] = useState<QtyState>({});

  const items = catalog[category];

  const { totalPrice, totalDays, totalUnits } = useMemo(() => {
    let price = 0;
    let days = 0;
    let units = 0;
    for (const it of items) {
      const q = qty[it.id] || 0;
      if (!q) continue;
      price += it.price * q;
      days += it.days * q;
      units += q;
    }
    return { totalPrice: price, totalDays: days, totalUnits: units };
  }, [items, qty]);

  const inc = (id: string) => setQty((s) => ({ ...s, [id]: (s[id] || 0) + 1 }));
  const dec = (id: string) => setQty((s) => ({ ...s, [id]: Math.max(0, (s[id] || 0) - 1) }));
  const reset = () => setQty({});

  return (
    <div className="min-h-screen bg-[#0f0f0f] text-[#e0e0e0]" style={{ fontFamily: 'Inter, ui-sans-serif, system-ui, -apple-system, Segoe UI, Roboto, Arial, sans-serif' }}>
      {/* Hero */}
      <section className="pt-16 md:pt-20">
        <div className="mx-auto max-w-7xl px-4 md:px-6">
          <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4">
            <div>
              <h1 className="text-3xl md:text-4xl font-light tracking-tight text-white">Estimate Your Project Cost</h1>
              <p className="mt-2 text-sm md:text-base text-[#a3a3a3]">Select a category, add quantities, and see your running total.</p>
            </div>
            <CategoryToggle value={category} onChange={setCategory} />
          </div>
        </div>
      </section>

      {/* Grid */}
      <section className="py-6 md:py-10">
        <div className="mx-auto max-w-7xl px-4 md:px-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 md:gap-5">
            {items.map((it) => (
              <PricingCard
                key={it.id}
                item={it}
                qty={qty[it.id] || 0}
                onInc={() => inc(it.id)}
                onDec={() => dec(it.id)}
              />
            ))}
          </div>

          {/* Summary */}
          <div className="mt-6 md:mt-8 flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
            <div className="flex items-center gap-4">
              <div className="rounded-xl border border-[#2a2a2a] bg-[#141414] shadow-[0_10px_30px_rgba(0,0,0,0.35)] px-4 py-3 text-sm md:text-base">
                <span className="uppercase tracking-wide text-xs md:text-sm text-[#9ca3af] mr-2">Total</span>
                <span className="font-medium text-emerald-400">${totalPrice.toFixed(2)}</span>
              </div>
              <div className="rounded-xl border border-[#2a2a2a] bg-[#141414] shadow-[0_10px_30px_rgba(0,0,0,0.35)] px-4 py-3 text-sm md:text-base">
                <span className="uppercase tracking-wide text-xs md:text-sm text-[#9ca3af] mr-2">Days</span>
                <span className="font-medium text-emerald-400">{Number.isFinite(totalDays) ? totalDays.toFixed(1) : '0'}</span>
              </div>
              <div className="hidden md:block rounded-xl border border-[#2a2a2a] bg-[#141414] shadow-[0_10px_30px_rgba(0,0,0,0.35)] px-4 py-3 text-sm md:text-base">
                <span className="uppercase tracking-wide text-xs md:text-sm text-[#9ca3af] mr-2">Items</span>
                <span className="font-medium text-emerald-400">{totalUnits}</span>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <button
                onClick={reset}
                className="inline-flex items-center justify-center rounded-full bg-emerald-500 hover:bg-emerald-600 active:bg-emerald-700 px-5 py-2 text-sm font-medium text-white transition-colors"
              >
                Reset
              </button>
            </div>
          </div>

          {/* Notes */}
          <div className="mt-4 text-xs md:text-sm text-[#9ca3af] space-y-1">
            <p className="flex items-start gap-2">
              <span className="mt-1 h-1.5 w-1.5 rounded-full bg-emerald-500 inline-block" />
              Prices are estimates. Final quotes vary based on model fidelity, materials, and scene complexity.
            </p>
            <p className="flex items-start gap-2">
              <span className="mt-1 h-1.5 w-1.5 rounded-full bg-emerald-500 inline-block" />
              Turnaround is an estimate and may adjust with scope and schedule. Rush options available.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}

function CategoryToggle({ value, onChange }: { value: Category; onChange: (c: Category) => void }) {
  const opts: { key: Category; label: string }[] = [
    { key: 'simple', label: 'Simple' },
    { key: 'lifestyle', label: 'Lifestyle' },
    { key: 'animation', label: 'Animation' },
  ];
  return (
    <div className="inline-flex rounded-full border border-[#2a2a2a] bg-[#141414] p-1 shadow-[0_10px_30px_rgba(0,0,0,0.35)]">
      {opts.map((o) => {
        const active = value === o.key;
        return (
          <button
            key={o.key}
            onClick={() => onChange(o.key)}
            className={
              `px-4 py-2 text-sm font-medium rounded-full transition-colors ` +
              (active
                ? 'bg-emerald-500 hover:bg-emerald-600 text-white'
                : 'text-[#a3a3a3] hover:bg-[#1c1c1c]')
            }
            aria-pressed={active}
          >
            {o.label}
          </button>
        );
      })}
    </div>
  );
}

function PricingCard({ item, qty, onInc, onDec }: { item: CatalogItem; qty: number; onInc: () => void; onDec: () => void }) {
  return (
    <div className="rounded-xl border border-[#2a2a2a] bg-[#1a1a1a] shadow-[0_10px_30px_rgba(0,0,0,0.35)] overflow-hidden">
      {/* Image placeholder */}
      <div className="relative aspect-[4/3] bg-[#141414]">
        {/* Subtle gradient hint */}
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_30%,rgba(16,185,129,0.08),transparent_40%),radial-gradient(circle_at_70%_60%,rgba(16,185,129,0.06),transparent_45%)]" />
        <div className="absolute inset-0 flex items-center justify-center text-xs text-[#9ca3af]">Image</div>
      </div>

      <div className="p-4">
        <div className="flex items-baseline justify-between gap-2">
          <h3 className="text-sm md:text-base font-medium truncate text-[#e5e5e5]" title={item.title}>{item.title}</h3>
          <div className="text-sm md:text-base font-medium text-emerald-400">${item.price.toFixed(0)}</div>
        </div>

        <div className="mt-4 flex items-center justify-between">
          <div className="text-xs text-[#9ca3af]">Days: {item.days}</div>
          <div className="inline-flex items-center rounded-full border border-[#2a2a2a] bg-[#141414]">
            <button
              onClick={onDec}
              className="px-3 py-2 text-sm font-medium bg-emerald-500 hover:bg-emerald-600 active:bg-emerald-700 text-white rounded-l-full"
              aria-label={`Decrease ${item.title}`}
            >
              –
            </button>
            <div className="w-10 text-center text-sm font-medium select-none text-white">{qty}</div>
            <button
              onClick={onInc}
              className="px-3 py-2 text-sm font-medium bg-emerald-500 hover:bg-emerald-600 active:bg-emerald-700 text-white rounded-r-full"
              aria-label={`Increase ${item.title}`}
            >
              +
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
