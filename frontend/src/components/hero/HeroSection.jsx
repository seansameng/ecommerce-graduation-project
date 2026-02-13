import { Link } from "react-router-dom";

function Badge({ children }) {
  return (
    <span className="inline-flex items-center rounded-full bg-emerald-50 px-2.5 py-1 text-xs font-semibold text-emerald-700 ring-1 ring-emerald-100">
      {children}
    </span>
  );
}

export default function HeroSection({ featuredDeals = [] }) {
  const picks = featuredDeals.slice(0, 3);

  return (
    <section className="pt-8 md:pt-10">
      <div className="relative overflow-hidden rounded-[28px] border border-slate-200 bg-white">
        <div className="absolute -left-10 -top-12 h-44 w-44 rounded-full bg-emerald-200/40 blur-3xl" />
        <div className="absolute right-0 top-6 h-52 w-52 rounded-full bg-sky-100/60 blur-3xl" />

        <div className="grid gap-8 px-6 py-10 md:px-10 md:py-12 lg:grid-cols-[1.1fr_0.9fr] lg:items-center">
          <div>
            <div className="mb-4">
              <Badge>NEW ARRIVALS</Badge>
            </div>
            <h1 className="max-w-xl text-3xl font-semibold leading-tight text-slate-900 md:text-5xl">
              Premium tech that feels fast, clean, and effortless.
            </h1>
            <p className="mt-4 max-w-lg text-sm text-slate-600 md:text-base">
              ShopEase curates trusted devices with clear pricing, fast delivery, and dependable support.
            </p>

            <div className="mt-6 flex flex-wrap gap-3">
              <Link
                to="/products"
                className="inline-flex items-center justify-center rounded-xl bg-emerald-600 px-5 py-3 text-sm font-semibold text-white hover:bg-emerald-700 focus-visible:ring-2 focus-visible:ring-emerald-500"
              >
                Shop Now
              </Link>
              <Link
                to="/#categories"
                className="inline-flex items-center justify-center rounded-xl border border-slate-200 bg-white px-5 py-3 text-sm font-semibold text-slate-700 hover:bg-slate-50 focus-visible:ring-2 focus-visible:ring-emerald-500"
              >
                View Categories
              </Link>
            </div>

            <div className="mt-6 flex flex-wrap gap-3 text-xs text-slate-500">
              <span className="rounded-full border border-slate-200 px-3 py-1">Free shipping</span>
              <span className="rounded-full border border-slate-200 px-3 py-1">Easy returns</span>
              <span className="rounded-full border border-slate-200 px-3 py-1">Official warranty</span>
            </div>
          </div>

          <div className="relative">
            <div className="rounded-3xl border border-slate-200 bg-white p-4 shadow-sm">
              <div className="text-xs font-semibold uppercase tracking-[0.2em] text-slate-400">
                Editor’s Picks
              </div>
              <div className="mt-4 space-y-3">
                {picks.map((deal) => (
                  <div
                    key={deal.name}
                    className="flex items-center gap-3 rounded-2xl border border-slate-100 bg-slate-50/60 p-3"
                  >
                    <img
                      src={deal.img || deal.imageUrl}
                      alt={deal.name}
                      className="h-14 w-14 rounded-xl object-cover"
                      loading="lazy"
                    />
                    <div className="min-w-0 flex-1">
                      <div className="text-xs font-semibold text-slate-500">{deal.category}</div>
                      <div className="truncate text-sm font-semibold text-slate-900">{deal.name}</div>
                      <div className="mt-1 flex items-center gap-2 text-xs text-slate-500">
                        <span>⭐ {deal.rating ?? 4.6}</span>
                        <span>({deal.reviews ?? 120})</span>
                      </div>
                    </div>
                    <div className="text-sm font-semibold text-slate-900">
                      ${Number(deal.price || 0).toFixed(2)}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
