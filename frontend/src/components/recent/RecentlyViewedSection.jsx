import { useNavigate } from "react-router-dom";

export default function RecentlyViewedSection({ recentlyViewed = [] }) {
  const navigate = useNavigate();

  return (
    <section className="mt-10 pb-16">
      <div className="flex items-end justify-between">
        <h2 className="text-xl font-semibold tracking-tight">Recently Viewed</h2>
        <button
          type="button"
          onClick={() => navigate("/products")}
          className="text-sm font-semibold text-emerald-700 hover:text-emerald-800"
        >
          View all ->
        </button>
      </div>

      <div className="mt-4 flex gap-4 overflow-x-auto pb-2">
        {recentlyViewed.map((p) => (
          <div
            key={p.id ?? p.name}
            role="button"
            tabIndex={0}
            onClick={() => (p?.id ? navigate(`/products/${p.id}`) : navigate("/products"))}
            onKeyDown={(event) => {
              if (event.key === "Enter" || event.key === " ") {
                event.preventDefault();
                p?.id ? navigate(`/products/${p.id}`) : navigate("/products");
              }
            }}
            className="min-w-[220px] cursor-pointer overflow-hidden rounded-3xl bg-white p-4 shadow-sm ring-1 ring-slate-200 transition hover:-translate-y-0.5 hover:shadow-lg"
          >
            <div className="relative">
              <img
                src={p.img || p.imageUrl}
                alt={p.name}
                className="aspect-square w-full rounded-2xl object-cover"
                loading="lazy"
              />
            </div>

            <div className="mt-3">
              <div className="min-h-[40px] text-sm font-semibold text-slate-900 line-clamp-2">
                {p.name}
              </div>

              <div className="mt-2 flex items-center gap-2 text-xs text-slate-500">
                <span>Rating {p.rating ?? 4.6}</span>
                <span>({p.reviews ?? 120})</span>
              </div>

              <div className="mt-2 flex items-center gap-2">
                <span className="text-lg font-semibold text-slate-900">
                  ${Number(p.price || 0).toFixed(2)}
                </span>
              </div>

              <div className="mt-2 flex items-center justify-between text-xs">
                <span className="rounded-full bg-slate-100 px-2 py-1 text-slate-600">
                  {p.shipping || "Free shipping"}
                </span>
                <span
                  className={`font-semibold ${
                    p.stock === "Low stock" ? "text-amber-600" : "text-emerald-700"
                  }`}
                >
                  {p.stock || "In stock"}
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
