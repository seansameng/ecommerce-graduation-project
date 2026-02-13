import { useNavigate } from "react-router-dom";
import useCart from "../../hooks/useCart";

const FALLBACK_IMAGE =
  "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=600&h=600&fit=crop";

function ProductCard({ product, onAdd, onView }) {
  const imageSrc = product.img || product.imageUrl || FALLBACK_IMAGE;
  const discount = product.tag || product.discount;

  return (
    <div className="group overflow-hidden rounded-3xl bg-white p-4 shadow-sm ring-1 ring-slate-200 transition hover:-translate-y-0.5 hover:shadow-lg">
      <div className="relative">
        <img
          src={imageSrc}
          alt={product.name}
          className="aspect-square w-full rounded-2xl object-cover"
          loading="lazy"
        />
        {discount ? (
          <span className="absolute left-3 top-3 rounded-full bg-emerald-600 px-2.5 py-1 text-xs font-semibold text-white">
            {discount}
          </span>
        ) : null}
      </div>

      <div className="mt-3">
        <div className="min-h-[40px] text-sm font-semibold text-slate-900 line-clamp-2">
          {product.name}
        </div>

        <div className="mt-2 flex items-center gap-2 text-xs text-slate-500">
          <span>⭐ {product.rating ?? 4.6}</span>
          <span>({product.reviews ?? 120})</span>
        </div>

        <div className="mt-2 flex items-center gap-2">
          {product.oldPrice ? (
            <span className="text-xs text-slate-400 line-through">
              ${Number(product.oldPrice).toFixed(2)}
            </span>
          ) : null}
          <span className="text-lg font-semibold text-slate-900">
            ${Number(product.price || 0).toFixed(2)}
          </span>
        </div>

        <div className="mt-2 flex items-center justify-between text-xs">
          <span className="rounded-full bg-slate-100 px-2 py-1 text-slate-600">
            {product.shipping || "Free shipping"}
          </span>
          <span
            className={`font-semibold ${
              product.stock === "Low stock" ? "text-amber-600" : "text-emerald-700"
            }`}
          >
            {product.stock || "In stock"}
          </span>
        </div>

        <button
          type="button"
          onClick={onAdd}
          className="mt-3 w-full rounded-xl bg-emerald-600 px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-emerald-700 focus-visible:ring-2 focus-visible:ring-emerald-500 group-hover:scale-[1.01] transform-gpu"
        >
          Add to Cart
        </button>
        <button
          type="button"
          onClick={onView}
          className="mt-2 w-full text-xs font-semibold text-slate-600 hover:text-slate-900"
        >
          Details →
        </button>
      </div>
    </div>
  );
}

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
      <div className="flex items-end justify-between">
        <h2 className="text-xl font-semibold tracking-tight">Featured Deals</h2>
        <button
          type="button"
          onClick={() => navigate("/products")}
          className="text-sm font-semibold text-emerald-700 hover:text-emerald-800"
        >
          See all deals →
        </button>
      </div>

      <div className="mt-4 grid gap-4 grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
        {featuredDeals.map((p) => (
          <ProductCard
            key={p.id ?? p.name}
            product={p}
            onAdd={() => handleAddToCart(p)}
            onView={() => (p?.id ? navigate(`/products/${p.id}`) : navigate("/products"))}
          />
        ))}
      </div>
    </section>
  );
}
