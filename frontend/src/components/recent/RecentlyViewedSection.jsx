function Card({ img, children }) {
  return (
    <div className="group overflow-hidden rounded-3xl bg-white shadow-sm ring-1 ring-slate-100">
      <div className="relative h-44 w-full overflow-hidden">
        <img
          src={img}
          alt=""
          className="h-full w-full object-cover transition duration-500 group-hover:scale-[1.03]"
          loading="lazy"
        />
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/40 via-black/10 to-transparent" />
      </div>
      <div className="p-4">{children}</div>
    </div>
  );
}

export default function RecentlyViewedSection({ recentlyViewed = [] }) {
  return (
    <section className="mt-10 pb-16">
      <div className="flex items-center gap-2">
        <div className="h-6 w-6 rounded-xl bg-emerald-50 ring-1 ring-emerald-100" />
        <h2 className="text-xl font-extrabold tracking-tight">Recently Viewed</h2>
      </div>

      <div className="mt-4 grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-5">
        {recentlyViewed.map((p) => (
          <Card key={p.id ?? p.name} img={p.img || p.imageUrl}>
            <div className="font-extrabold text-sm">{p.name}</div>
            <div className="mt-2 text-sm font-bold text-emerald-600">${Number(p.price || 0).toFixed(2)}</div>
          </Card>
        ))}
      </div>
    </section>
  );
}
