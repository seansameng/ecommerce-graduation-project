export default function RecentlyViewedSection({ recentlyViewed = [] }) {
  return (
    <section className="mt-10 pb-16">
      <div className="flex items-end justify-between">
        <h2 className="text-xl font-semibold tracking-tight">Recently Viewed</h2>
        <button
          type="button"
          className="text-sm font-semibold text-slate-500 hover:text-slate-700"
        >
          Clear
        </button>
      </div>

      <div className="mt-4 flex gap-4 overflow-x-auto pb-2">
        {recentlyViewed.map((p) => (
          <div
            key={p.id ?? p.name}
            className="min-w-[200px] overflow-hidden rounded-2xl bg-white p-3 shadow-sm ring-1 ring-slate-200"
          >
            <img
              src={p.img || p.imageUrl}
              alt={p.name}
              className="aspect-square w-full rounded-xl object-cover"
              loading="lazy"
            />
            <div className="mt-2 text-sm font-semibold line-clamp-2 min-h-[40px]">
              {p.name}
            </div>
            <div className="mt-1 text-sm font-semibold text-slate-900">
              ${Number(p.price || 0).toFixed(2)}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
