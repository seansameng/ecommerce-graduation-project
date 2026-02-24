import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { ShoppingCart } from "lucide-react";
import { getProductById } from "../api/productApi";
import Navbar from "../components/navbar/Navbar.jsx";
import Footer from "../components/footer/Footer.jsx";
import useCart from "../hooks/useCart";

const FALLBACK_IMAGE =
  "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=900&h=900&fit=crop";

export default function ProductDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { addToCart } = useCart();
  const [q, setQ] = useState("");
  const [status, setStatus] = useState("idle");
  const [error, setError] = useState("");
  const [product, setProduct] = useState(null);

  useEffect(() => {
    let ignore = false;
    if (!id) return;

    setStatus("loading");
    setError("");

    getProductById(id)
      .then((res) => {
        if (ignore) return;
        setProduct(res.data ?? null);
        setStatus("success");
      })
      .catch((err) => {
        if (ignore) return;
        setStatus("error");
        setError(
          err?.response?.data?.message ||
            err?.message ||
            "Failed to load product."
        );
      });

    return () => {
      ignore = true;
    };
  }, [id]);

  const inStock =
    product?.stock === null || product?.stock === undefined
      ? true
      : Number(product?.stock) > 0;

  return (
    <div
      className="min-h-screen bg-gradient-to-b from-[#f7f4ee] via-white to-[#f1f5f9] text-slate-900"
      style={{ fontFamily: '"Ubuntu", "Segoe UI", sans-serif' }}
    >
      <Navbar q={q} setQ={setQ} cartCount={3} brand={{ name: "ShopEase", href: "/" }} />

      <main className="max-w-7xl mx-auto px-6 lg:px-8 py-10">
        {status === "loading" && (
          <div className="mt-8 grid gap-6 lg:grid-cols-[1.1fr_0.9fr]">
            <div className="aspect-square rounded-3xl bg-white/70 ring-1 ring-slate-200 animate-pulse" />
            <div className="rounded-3xl bg-white/70 ring-1 ring-slate-200 p-6 space-y-4 animate-pulse">
              <div className="h-4 w-1/3 rounded bg-slate-200" />
              <div className="h-7 w-3/4 rounded bg-slate-200" />
              <div className="h-4 w-full rounded bg-slate-200" />
              <div className="h-4 w-5/6 rounded bg-slate-200" />
              <div className="h-10 w-1/2 rounded bg-slate-200" />
            </div>
          </div>
        )}

        {status === "error" && (
          <div className="mt-8 rounded-2xl bg-red-50 text-red-700 border border-red-100 p-6">
            {error}
          </div>
        )}

        {status === "success" && product && (
          <div className="mt-8 grid gap-8 lg:grid-cols-[1.08fr_0.92fr]">
            <div className="rounded-[36px] bg-white/80 ring-1 ring-slate-200/70 shadow-[0_30px_80px_-60px_rgba(15,23,42,0.55)] backdrop-blur">
              <div className="relative overflow-hidden rounded-[34px] bg-gradient-to-br from-emerald-50 via-white to-slate-50 p-6">
                <div className="absolute -right-20 -top-24 h-48 w-48 rounded-full bg-emerald-200/40 blur-3xl" />
                <div className="absolute -left-20 -bottom-24 h-44 w-44 rounded-full bg-slate-200/60 blur-3xl" />
                <div className="relative rounded-3xl bg-white p-4 ring-1 ring-slate-100">
                  <img
                    src={product.imageUrl || FALLBACK_IMAGE}
                    alt={product.name}
                    className="h-full w-full rounded-2xl object-cover"
                  />
                </div>
              </div>
            </div>

            <div className="rounded-[36px] bg-white/90 p-8 ring-1 ring-slate-200/70 shadow-[0_28px_70px_-60px_rgba(15,23,42,0.45)] backdrop-blur">
              <div className="flex flex-wrap items-center gap-3 text-[11px] font-semibold uppercase tracking-[0.3em] text-slate-400">
                <span>{product.category || "Uncategorized"}</span>
                {product.brand ? (
                  <span className="rounded-full bg-slate-100 px-2.5 py-1 text-[10px] tracking-[0.2em] text-slate-500">
                    {product.brand}
                  </span>
                ) : null}
              </div>

              <h1 className="mt-4 text-3xl font-extrabold text-slate-900 md:text-4xl">
                {product.name}
              </h1>

              <div className="mt-3 flex flex-wrap items-center gap-3 text-sm text-slate-600">
                <span className="rounded-full bg-emerald-50 px-3 py-1 text-xs font-semibold text-emerald-700">
                  {inStock ? `${product.stock} in stock` : "Out of stock"}
                </span>
                {product.rating ? (
                  <span className="text-xs font-semibold text-slate-500">
                    Rating {product.rating} {product.reviews ? `(${product.reviews})` : ""}
                  </span>
                ) : null}
                <span className="text-xs text-slate-400">•</span>
                <span className="text-xs text-slate-500">Ships in 24 hours</span>
              </div>

              <p className="mt-5 text-sm text-slate-600 leading-relaxed">
                {product.description || "No description available."}
              </p>

              <div className="mt-6 grid gap-3 sm:grid-cols-3">
                {[
                  "Free shipping on orders $50+",
                  "30-day easy returns",
                  "1-year official warranty",
                ].map((item) => (
                  <div
                    key={item}
                    className="rounded-2xl border border-slate-100 bg-slate-50 px-3 py-2 text-xs font-semibold text-slate-600"
                  >
                    {item}
                  </div>
                ))}
              </div>

              <div className="mt-8 flex items-center justify-between gap-4">
                <div>
                  <div className="text-xs uppercase tracking-[0.3em] text-slate-400">
                    Price
                  </div>
                  <div className="mt-2 text-4xl font-extrabold text-slate-900">
                    ${Number(product.price || 0).toFixed(2)}
                  </div>
                </div>
                <div className="rounded-2xl border border-emerald-100 bg-emerald-50 px-4 py-3 text-xs font-semibold text-emerald-700">
                  {product.shipping || "Premium delivery"}
                </div>
              </div>

              <div className="mt-8 grid grid-cols-1 gap-3">
                <button
                  type="button"
                  onClick={() => {
                    addToCart({
                      id: product.id,
                      name: product.name,
                      price: product.price,
                      imageUrl: product.imageUrl || FALLBACK_IMAGE,
                    });
                    navigate("/cart");
                  }}
                  disabled={!inStock}
                  className={`inline-flex items-center justify-center gap-2 rounded-xl px-4 py-3 text-sm font-bold transition-all ${
                    inStock
                      ? "bg-gradient-to-r from-emerald-600 to-emerald-500 text-white shadow hover:shadow-lg"
                      : "bg-slate-200 text-slate-500 cursor-not-allowed"
                  }`}
                >
                  <ShoppingCart className="w-4 h-4" />
                  Add to Cart
                </button>
              </div>
            </div>
          </div>
        )}
      </main>

      <Footer />
    </div>
  );
}
