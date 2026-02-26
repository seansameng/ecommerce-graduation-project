import { useEffect, useMemo, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { Heart, ShoppingCart } from "lucide-react";
import { getProductById, getProducts } from "../api/productApi";
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
  const [activeTab, setActiveTab] = useState("specs");
  const [qty, setQty] = useState(1);
  const [selectedImage, setSelectedImage] = useState(0);
  const [selectedColor, setSelectedColor] = useState("Silver");
  const [selectedStorage, setSelectedStorage] = useState("256GB");
  const [relatedProducts, setRelatedProducts] = useState([]);
  const [relatedStatus, setRelatedStatus] = useState("idle");

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

  useEffect(() => {
    let ignore = false;
    if (!product?.category) return;

    setRelatedStatus("loading");
    getProducts({ category: product.category })
      .then((res) => {
        if (ignore) return;
        const items = Array.isArray(res?.data) ? res.data : [];
        const filtered = items.filter((p) => p.id !== product.id).slice(0, 6);
        setRelatedProducts(filtered);
        setRelatedStatus("success");
      })
      .catch(() => {
        if (ignore) return;
        setRelatedProducts([]);
        setRelatedStatus("error");
      });

    return () => {
      ignore = true;
    };
  }, [product?.category, product?.id]);

  const galleryImages = useMemo(() => {
    const src = product?.imageUrl || FALLBACK_IMAGE;
    return [src, src, src, src];
  }, [product]);

  const inStock =
    product?.stock === null || product?.stock === undefined
      ? true
      : Number(product?.stock) > 0;

  const price = Number(product?.price || 0);
  const listPrice = price ? Number((price * 1.2).toFixed(2)) : 0;
  const saveAmount = listPrice > price ? Number((listPrice - price).toFixed(2)) : 0;
  const ratingValue = Number(product?.rating || 4.0);
  const ratingCount = Number(product?.reviews || 128);

  return (
    <div
      className="min-h-screen bg-slate-50 text-slate-900"
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
          <>
            <div className="text-xs text-slate-500">
              <Link to="/" className="hover:text-slate-900">Home</Link>{" "}
              <span className="text-slate-300">/</span>{" "}
              <Link to="/products" className="hover:text-slate-900">All Products</Link>{" "}
              <span className="text-slate-300">/</span>{" "}
              <span className="text-emerald-700">{product.category || "Products"}</span>{" "}
              <span className="text-slate-300">/</span>{" "}
              <span className="text-slate-700">{product.name}</span>
            </div>

            <div className="mt-6 grid gap-8 lg:grid-cols-[1.15fr_0.85fr]">
              <div className="rounded-3xl bg-white p-6 ring-1 ring-slate-200/70">
                <div className="rounded-2xl border border-slate-100 bg-slate-50 p-6">
                  <img
                    src={galleryImages[selectedImage]}
                    alt={product.name}
                    className="h-full w-full rounded-xl object-contain"
                  />
                </div>
                <div className="mt-4 grid grid-cols-4 gap-3">
                  {galleryImages.map((src, idx) => (
                    <button
                      key={`${src}-${idx}`}
                      type="button"
                      onClick={() => setSelectedImage(idx)}
                      className={`overflow-hidden rounded-xl border ${
                        selectedImage === idx ? "border-emerald-400" : "border-slate-200"
                      }`}
                    >
                      <img
                        src={src}
                        alt={`${product.name} thumbnail ${idx + 1}`}
                        className="h-16 w-full object-cover"
                      />
                    </button>
                  ))}
                </div>
              </div>

              <div className="rounded-3xl bg-white p-6 ring-1 ring-slate-200/70">
                <div className="text-[11px] font-semibold uppercase tracking-[0.2em] text-emerald-600">
                  {product.category || "Products"}
                </div>
                <h1 className="mt-2 text-3xl font-extrabold text-slate-900">
                  {product.name}
                </h1>
                <div className="mt-2 flex items-center gap-2 text-xs text-slate-600">
                  <div className="flex items-center gap-0.5">
                    {Array.from({ length: 5 }).map((_, i) => (
                      <svg
                        key={i}
                        viewBox="0 0 20 20"
                        className={`h-4 w-4 ${i < Math.round(ratingValue) ? "text-amber-400" : "text-slate-200"}`}
                        fill="currentColor"
                        aria-hidden="true"
                      >
                        <path d="M10 15.3l-4.1 2.5 1.1-4.7-3.6-3.1 4.8-.4L10 5l1.8 4.6 4.8.4-3.6 3.1 1.1 4.7z" />
                      </svg>
                    ))}
                  </div>
                  <span>{ratingValue.toFixed(1)} ({ratingCount} reviews)</span>
                </div>

                <div className="mt-4 flex flex-wrap items-center gap-2 text-xs">
                  <span className="inline-flex items-center gap-1 rounded-full bg-emerald-50 px-3 py-1 font-semibold text-emerald-700">
                    {inStock ? `${product.stock || 20} in stock` : "Out of stock"}
                  </span>
                  <span className="text-slate-400">-</span>
                  <span className="text-slate-500">Ships in 24 hours</span>
                  <span className="inline-flex items-center rounded-full bg-amber-50 px-3 py-1 font-semibold text-amber-700">
                    Premium delivery
                  </span>
                </div>

                <p className="mt-4 text-sm text-slate-600 leading-relaxed">
                  {product.description || "Balanced specs for students: browsing, docs, and light projects. Thin, lightweight, with all-day battery."}
                </p>

                <div className="mt-6 space-y-4">
                  <div>
                    <div className="text-xs font-semibold text-slate-500">Color: {selectedColor}</div>
                    <div className="mt-2 flex gap-2">
                      {["Silver", "Gold", "Space Gray"].map((c) => (
                        <button
                          key={c}
                          type="button"
                          onClick={() => setSelectedColor(c)}
                          className={`rounded-lg border px-3 py-1 text-xs font-semibold ${
                            selectedColor === c
                              ? "border-emerald-500 bg-emerald-50 text-emerald-700"
                              : "border-slate-200 text-slate-600"
                          }`}
                        >
                          {c}
                        </button>
                      ))}
                    </div>
                  </div>

                  <div>
                    <div className="text-xs font-semibold text-slate-500">Storage: {selectedStorage}</div>
                    <div className="mt-2 flex gap-2">
                      {["256GB", "512GB", "1TB"].map((s) => (
                        <button
                          key={s}
                          type="button"
                          onClick={() => setSelectedStorage(s)}
                          className={`rounded-lg border px-3 py-1 text-xs font-semibold ${
                            selectedStorage === s
                              ? "border-emerald-500 bg-emerald-50 text-emerald-700"
                              : "border-slate-200 text-slate-600"
                          }`}
                        >
                          {s}
                        </button>
                      ))}
                    </div>
                  </div>

                  <div className="flex items-center gap-4">
                    <div className="text-xs font-semibold text-slate-500">Quantity</div>
                    <div className="inline-flex items-center rounded-xl border border-slate-200 bg-white px-2 py-1">
                      <button
                        type="button"
                        className="h-8 w-8 rounded-lg border border-slate-200 text-sm"
                        onClick={() => setQty((v) => Math.max(1, v - 1))}
                      >
                        -
                      </button>
                      <span className="px-4 text-sm font-semibold">{qty}</span>
                      <button
                        type="button"
                        className="h-8 w-8 rounded-lg border border-slate-200 text-sm"
                        onClick={() => setQty((v) => v + 1)}
                      >
                        +
                      </button>
                    </div>
                    <span className="text-xs text-slate-400">Max 10 per order</span>
                  </div>
                </div>

                <div className="mt-6">
                  <div className="text-[11px] font-semibold uppercase tracking-[0.3em] text-slate-400">
                    Price
                  </div>
                  <div className="mt-2 flex items-center gap-3">
                    <div className="text-3xl font-extrabold text-slate-900">
                      ${price.toFixed(2)}
                    </div>
                    {saveAmount > 0 && (
                      <>
                        <span className="rounded-full bg-rose-50 px-2 py-1 text-xs font-semibold text-rose-600">
                          Save ${saveAmount.toFixed(0)}
                        </span>
                        <span className="text-sm text-slate-400 line-through">
                          ${listPrice.toFixed(2)}
                        </span>
                      </>
                    )}
                  </div>
                </div>

                <div className="mt-6 flex flex-wrap gap-3">
                  <button
                    type="button"
                    onClick={() => {
                      addToCart(
                        {
                          id: product.id,
                          name: product.name,
                          price: product.price,
                          imageUrl: product.imageUrl || FALLBACK_IMAGE,
                        },
                        qty
                      );
                      navigate("/cart");
                    }}
                    disabled={!inStock}
                    className={`inline-flex items-center justify-center gap-2 rounded-xl px-5 py-3 text-sm font-bold transition-all ${
                      inStock
                        ? "bg-emerald-600 text-white hover:bg-emerald-700"
                        : "bg-slate-200 text-slate-500 cursor-not-allowed"
                    }`}
                  >
                    <ShoppingCart className="w-4 h-4" />
                    Add to Cart
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      addToCart(
                        {
                          id: product.id,
                          name: product.name,
                          price: product.price,
                          imageUrl: product.imageUrl || FALLBACK_IMAGE,
                        },
                        qty
                      );
                      navigate("/checkout");
                    }}
                    className="rounded-xl border border-emerald-200 bg-white px-5 py-3 text-sm font-bold text-emerald-700 hover:bg-emerald-50"
                  >
                    Buy Now
                  </button>
                  <button
                    type="button"
                    className="rounded-xl border border-slate-200 px-4 py-3 text-sm font-semibold text-slate-600 hover:bg-slate-50"
                    aria-label="Add to wishlist"
                  >
                    <Heart className="h-4 w-4" />
                  </button>
                </div>

                <div className="mt-6 grid gap-2 sm:grid-cols-3">
                  {[
                    "Free shipping on $50+",
                    "30-day returns",
                    "1-year warranty",
                  ].map((item) => (
                    <div
                      key={item}
                      className="rounded-xl border border-slate-100 bg-slate-50 px-3 py-2 text-xs font-semibold text-slate-600"
                    >
                      {item}
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div className="mt-8 border-t border-slate-200 pt-6">
              <div className="text-sm font-extrabold text-slate-900">
                Related Products
              </div>
              <div className="mt-4 rounded-2xl bg-white p-6 ring-1 ring-slate-200/70">
                {relatedStatus === "loading" && (
                  <div className="text-sm text-slate-500">Loading related products...</div>
                )}
                {relatedStatus !== "loading" && relatedProducts.length === 0 && (
                  <div className="text-sm text-slate-500">No related products found.</div>
                )}
                {relatedProducts.length > 0 && (
                  <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                    {relatedProducts.map((item) => (
                      <Link
                        key={item.id}
                        to={`/products/${item.id}`}
                        className="rounded-xl border border-slate-100 p-4 hover:shadow-sm"
                      >
                        <div className="h-32 rounded-lg bg-slate-100 overflow-hidden">
                          <img
                            src={item.imageUrl || FALLBACK_IMAGE}
                            alt={item.name}
                            className="h-full w-full object-cover"
                            loading="lazy"
                          />
                        </div>
                        <div className="mt-3 text-sm font-semibold text-slate-800">
                          {item.name}
                        </div>
                        <div className="text-xs text-slate-500">
                          ${Number(item.price || 0).toFixed(2)}
                        </div>
                      </Link>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </>
        )}
      </main>

      <Footer />
    </div>
  );
}
