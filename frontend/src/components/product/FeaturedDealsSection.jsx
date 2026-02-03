export default function FeaturedDealsSection({ featuredDeals = [] }) {
  return (
    <section className="mt-12">
      <h2 className="text-xl font-extrabold tracking-tight">Featured Deals</h2>

      <div className="mt-4 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {featuredDeals.map((p) => (
          <div key={p.name} className="overflow-hidden rounded-3xl bg-white shadow-sm ring-1 ring-slate-100">
            <div className="relative h-44 overflow-hidden">
              <img
                src={p.img}
                alt={p.name}
                className="h-full w-full object-cover transition duration-500 hover:scale-[1.03]"
                loading="lazy"
              />
              {p.tag ? (
                <span className="absolute left-3 top-3 rounded-xl bg-rose-500 px-2.5 py-1 text-xs font-extrabold text-white">
                  {p.tag}
                </span>
              ) : null}
            </div>

            <div className="p-4">
              <div className="text-[11px] font-bold tracking-wider text-slate-400">{p.category}</div>
              <div className="mt-1 font-extrabold">{p.name}</div>

              <div className="mt-2 flex items-center gap-2 text-xs text-slate-500">
                <span className="text-amber-500">*</span>
                <span className="font-semibold text-slate-700">{p.rating}</span>
                <span>({p.reviews})</span>
              </div>

              <div className="mt-3 flex items-baseline gap-2">
                {p.oldPrice ? (
                  <span className="text-sm text-slate-400 line-through">${Number(p.oldPrice).toFixed(2)}</span>
                ) : null}
                <span className="text-lg font-extrabold text-emerald-600">${Number(p.price || 0).toFixed(2)}</span>
              </div>

              <div className="mt-4 flex gap-2">
                <button className="flex-1 rounded-xl bg-slate-900 px-4 py-2 text-sm font-bold text-white hover:bg-slate-800">
                  Add to Cart
                </button>
                <button className="rounded-xl px-4 py-2 text-sm font-bold ring-1 ring-slate-200 hover:bg-slate-50">
                  View
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
