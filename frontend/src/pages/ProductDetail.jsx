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

  const inStock = Number(product?.stock) > 0;

  return (
    <div
      className="min-h-screen bg-[#f7f4ee] text-slate-900"
      style={{ fontFamily: '"Space Grotesk", "DM Sans", "Segoe UI", sans-serif' }}
    >
      <Navbar q={q} setQ={setQ} cartCount={3} brand={{ name: "ShopEase", href: "/" }} />

      <main className="max-w-7xl mx-auto px-6 lg:px-8 py-10">
        <div className="flex items-center justify-between text-sm">
          <Link to="/products" className="font-semibold text-emerald-600 hover:text-emerald-700">
            Back to Products
          </Link>
          <button
            type="button"
            onClick={() => navigate(-1)}
            className="text-slate-500 hover:text-slate-700"
          >
            Go Back
          </button>
        </div>

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
          <div className="mt-8 grid gap-8 lg:grid-cols-[1.1fr_0.9fr]">
            <div className="rounded-3xl bg-white ring-1 ring-slate-100 overflow-hidden">
              <img
                src={product.imageUrl || FALLBACK_IMAGE}
                alt={product.name}
                className="h-full w-full object-cover"
              />
            </div>

            <div className="rounded-3xl bg-white p-8 ring-1 ring-slate-100">
              <div className="text-xs font-semibold uppercase tracking-wider text-slate-500">
                {product.category || "Uncategorized"}
              </div>
              <h1 className="mt-2 text-3xl font-extrabold text-slate-900">
                {product.name}
              </h1>
              <p className="mt-4 text-sm text-slate-600 leading-relaxed">
                {product.description || "No description available."}
              </p>

              <div className="mt-6 flex items-center gap-4">
                <div className="text-3xl font-extrabold text-emerald-600">
                  ${Number(product.price || 0).toFixed(2)}
                </div>
                <span className="rounded-full bg-slate-100 px-3 py-1 text-xs font-semibold text-slate-600">
                  {inStock ? `${product.stock} in stock` : "Out of stock"}
                </span>
              </div>

              <div className="mt-8 grid grid-cols-2 gap-3">
                <button
                  type="button"
                  onClick={() =>
                    addToCart({
                      id: product.id,
                      name: product.name,
                      price: product.price,
                      imageUrl: product.imageUrl || FALLBACK_IMAGE,
                    })
                  }
                  disabled={!inStock}
                  className={`inline-flex items-center justify-center gap-2 rounded-xl px-4 py-3 text-sm font-bold transition-all ${
                    inStock
                      ? "bg-gradient-to-r from-emerald-500 to-teal-500 text-white shadow hover:shadow-lg"
                      : "bg-slate-200 text-slate-500 cursor-not-allowed"
                  }`}
                >
                  <ShoppingCart className="w-4 h-4" />
                  Add to Cart
                </button>
                <Link
                  to="/cart"
                  className="inline-flex items-center justify-center rounded-xl px-4 py-3 text-sm font-bold ring-1 ring-slate-200 hover:bg-slate-50"
                >
                  View Cart
                </Link>
              </div>
            </div>
          </div>
        )}
      </main>

      <Footer />
    </div>
  );
}
