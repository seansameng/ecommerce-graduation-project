import { useNavigate } from "react-router-dom";
import useCart from "../../hooks/useCart";

const FALLBACK_IMAGE =
  "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=600&h=600&fit=crop";

export default function FeaturedDealsSection({ featuredDeals = [] }) {
  const navigate = useNavigate();
  const { addToCart } = useCart();

  const handleAddToCart = (product) => {
    addToCart({
      id: product.id,
      name: product.name,
      price: product.price,
      imageUrl: product.imageUrl || product.img || FALLBACK_IMAGE,
    });
    navigate("/cart");
  };

  return (
    <section className="mt-12">
      <h2 className="text-xl font-extrabold tracking-tight">Featured Deals</h2>

      <div className="mt-4 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {featuredDeals.map((p) => {
          const imageSrc = p.img || p.imageUrl || FALLBACK_IMAGE;
          const category = p?.category?.name || p?.category || "Uncategorized";
          return (
            <div
              key={p.id ?? p.name}
              className="overflow-hidden rounded-3xl bg-white shadow-sm ring-1 ring-slate-100"
            >
              <div className="relative h-44 overflow-hidden">
                <img
                  src={imageSrc}
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
                <div className="text-[11px] font-bold tracking-wider text-slate-400">
                  {category}
                </div>
                <div className="mt-1 font-extrabold">{p.name}</div>

                {p.rating ? (
                  <div className="mt-2 flex items-center gap-2 text-xs text-slate-500">
                    <span className="text-amber-500">*</span>
                    <span className="font-semibold text-slate-700">{p.rating}</span>
                    {p.reviews ? <span>({p.reviews})</span> : null}
                  </div>
                ) : null}

                <div className="mt-3 flex items-baseline gap-2">
                  {p.oldPrice ? (
                    <span className="text-sm text-slate-400 line-through">
                      ${Number(p.oldPrice).toFixed(2)}
                    </span>
                  ) : null}
                  <span className="text-lg font-extrabold text-emerald-600">
                    ${Number(p.price || 0).toFixed(2)}
                  </span>
                </div>

                <div className="mt-4 flex gap-2">
                  <button
                    type="button"
                    onClick={() => handleAddToCart(p)}
                    className="flex-1 rounded-xl bg-slate-900 px-4 py-2 text-sm font-bold text-white hover:bg-slate-800"
                  >
                    Add to Cart
                  </button>
                  <button
                    type="button"
                    onClick={() =>
                      p?.id ? navigate(`/products/${p.id}`) : navigate("/products")
                    }
                    className="rounded-xl px-4 py-2 text-sm font-bold ring-1 ring-slate-200 hover:bg-slate-50"
                  >
                    View
                  </button>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
