import React, { useEffect, useMemo, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { ShoppingCart, X } from "lucide-react";
import Navbar from "../components/navbar/Navbar.jsx";
import Footer from "../components/footer/Footer.jsx";
import { getProducts } from "../api/productApi";
import useCart from "../hooks/useCart";

const FALLBACK_IMAGE =
  "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=600&h=600&fit=crop";



export default function Product() {
  const location = useLocation();
  const { addToCart, cartCount } = useCart();
  const [q, setQ] = useState("");
  const [products, setProducts] = useState([]);
  const [status, setStatus] = useState("idle");
  const [error, setError] = useState("");
  const [showFilters, setShowFilters] = useState(false);

  const categoryFromUrl = useMemo(() => {
    const params = new URLSearchParams(location.search);
    const value = params.get("category");
    return value ? value.trim() : "All";
  }, [location.search]);

  const [filters, setFilters] = useState({
    category: categoryFromUrl || "All",
    brand: "All",
    rating: 0,
    availability: "all",
    priceMin: 0,
    priceMax: 2000,
  });

  useEffect(() => {
    setFilters((prev) => ({ ...prev, category: categoryFromUrl || "All" }));
  }, [categoryFromUrl]);

  useEffect(() => {
    let ignore = false;
    setStatus("loading");
    setError("");

    getProducts()
      .then((res) => {
        if (ignore) return;
        const items = Array.isArray(res.data) ? res.data : [];
        const mapped = items.map((product, index) => {
          const price = Number(product.price || 0);
          const oldPrice = index % 3 === 0 ? Number((price * 1.18).toFixed(2)) : null;
          const discount = oldPrice ? `-${Math.round((1 - price / oldPrice) * 100)}%` : "";
          return {
            id: product.id,
            name: product.name,
            description: product.description || "Performance built for everyday use.",
            price,
            oldPrice,
            discount,
            rating: product.rating ?? 4.7 - (index % 4) * 0.1,
            reviews: product.reviews ?? 60 + index * 9,
            category: product?.category?.name || product?.category || "Accessories",
            brand: product.brand || "ShopEase",
            stock: Number(product.stock ?? 12),
            status: product.status ? String(product.status).toUpperCase() : "ACTIVE",
            shipping: "Free shipping",
            imageUrl: product.imageUrl || FALLBACK_IMAGE,
          };
        });
        setProducts(mapped);
        setStatus("success");
      })
      .catch((err) => {
        if (ignore) return;
        setStatus("error");
        setError(err?.message || "Failed to load products.");
      });

    return () => {
      ignore = true;
    };
  }, []);

  const allProducts = products;

  const categories = useMemo(() => {
    const set = new Set(allProducts.map((p) => p.category).filter(Boolean));
    return ["All", ...Array.from(set)];
  }, [allProducts]);

  const brands = useMemo(() => {
    const set = new Set(allProducts.map((p) => p.brand).filter(Boolean));
    return ["All", ...Array.from(set)];
  }, [allProducts]);

  const priceBounds = useMemo(() => {
    if (allProducts.length === 0) return { min: 0, max: 2000 };
    const prices = allProducts.map((p) => Number(p.price || 0));
    return { min: Math.floor(Math.min(...prices)), max: Math.ceil(Math.max(...prices)) };
  }, [allProducts]);

  useEffect(() => {
    setFilters((prev) => ({
      ...prev,
      priceMin: priceBounds.min,
      priceMax: priceBounds.max,
    }));
  }, [priceBounds.min, priceBounds.max]);

  const filteredProducts = useMemo(() => {
    const term = q.trim().toLowerCase();
    return allProducts.filter((p) => {
      if (term) {
        const haystack = `${p.name} ${p.description} ${p.brand} ${p.category}`.toLowerCase();
        if (!haystack.includes(term)) return false;
      }
      if (filters.category !== "All" && p.category !== filters.category) return false;
      if (filters.brand !== "All" && p.brand !== filters.brand) return false;
      if (p.price < filters.priceMin || p.price > filters.priceMax) return false;
      if (filters.rating > 0 && p.rating < filters.rating) return false;
      if (filters.availability === "in" && p.stock <= 0) return false;
      return true;
    });
  }, [allProducts, filters, q]);

  const clearAllFilters = () => {
    setFilters({
      category: "All",
      brand: "All",
      rating: 0,
      availability: "all",
      priceMin: priceBounds.min,
      priceMax: priceBounds.max,
    });
    setQ("");
  };


  return (
    <div
      className="min-h-screen bg-slate-50 text-slate-900"
      style={{ fontFamily: '"Ubuntu", "Segoe UI", sans-serif' }}
    >
      <Navbar
        q={q}
        setQ={setQ}
        cartCount={cartCount}
        brand={{ name: "ShopEase", href: "/" }}
      />

      {/* <section className="border-b border-slate-200/60 bg-white">
        <div className="max-w-[1280px] mx-auto px-4 md:px-6 lg:px-8 py-10">
          <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
            <div>
              <div className="text-xs uppercase tracking-[0.4em] text-emerald-600 font-semibold mb-3">
                Curated tech
              </div>
              <h1 className="text-3xl md:text-5xl font-semibold text-slate-900 mb-2">
                Product Collection
              </h1>
              <p className="text-slate-600 max-w-2xl">
                Browse premium tech with clean pricing and fast delivery.
              </p>
            </div>
            <Link to="/" className="text-emerald-700 font-semibold hover:text-emerald-800">
              Back to Home
            </Link>
          </div>
        </div>
      </section> */}

      <section className="max-w-[1280px] mx-auto px-4 md:px-6 lg:px-8 py-6">
        <div className="mb-4 flex justify-end lg:hidden">
          <button
            type="button"
            onClick={() => setShowFilters(true)}
            className="rounded-xl border border-slate-200 px-3 py-2 text-sm font-semibold text-slate-700 hover:bg-slate-50"
          >
            Filters
          </button>
        </div>

        <div className="mt-6 grid gap-6 lg:grid-cols-[260px_1fr]">
          <FilterSidebar
            categories={categories}
            brands={brands}
            filters={filters}
            priceBounds={priceBounds}
            onChange={setFilters}
          />

          <div>
            {status === "loading" && <SkeletonGrid />}
            {status === "error" && (
              <div className="rounded-2xl border border-red-100 bg-red-50 p-6 text-red-700">
                {error}
              </div>
            )}
            {status !== "loading" && filteredProducts.length === 0 && (
              <EmptyState onReset={clearAllFilters} />
            )}
            {filteredProducts.length > 0 && (
              <ProductGrid
                products={filteredProducts}
                onAdd={(product) =>
                  addToCart({
                    id: product.id,
                    name: product.name,
                    price: product.price,
                    imageUrl: product.imageUrl || FALLBACK_IMAGE,
                    stock: product.stock,
                    status: product.status,
                  })
                }
              />
            )}
          </div>
        </div>
      </section>

      <FilterDrawer
        open={showFilters}
        onClose={() => setShowFilters(false)}
        categories={categories}
        brands={brands}
        filters={filters}
        priceBounds={priceBounds}
        onChange={setFilters}
        onReset={clearAllFilters}
      />

      <Footer categories={categories} />
    </div>
  );
}

function FilterSidebar({ categories, brands, filters, priceBounds, onChange }) {
  return (
    <div className="hidden lg:block">
      <div className="rounded-3xl border border-slate-200 bg-white p-5 shadow-sm sticky top-24">
        <FilterControls
          categories={categories}
          brands={brands}
          filters={filters}
          priceBounds={priceBounds}
          onChange={onChange}
        />
      </div>
    </div>
  );
}

function FilterDrawer({
  open,
  onClose,
  categories,
  brands,
  filters,
  priceBounds,
  onChange,
  onReset,
}) {
  return (
    <div className={`fixed inset-0 z-50 ${open ? "pointer-events-auto" : "pointer-events-none"}`}>
      <div
        className={`absolute inset-0 bg-black/40 transition ${open ? "opacity-100" : "opacity-0"}`}
        onClick={onClose}
      />
      <div
        className={`absolute bottom-0 left-0 right-0 rounded-t-3xl bg-white p-5 shadow-xl transition-transform ${open ? "translate-y-0" : "translate-y-full"
          }`}
      >
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-semibold">Filters</h3>
          <button type="button" onClick={onClose} className="rounded-full p-2 hover:bg-slate-100">
            <X className="w-5 h-5" />
          </button>
        </div>
        <div className="mt-4 max-h-[65vh] overflow-y-auto pr-2">
          <FilterControls
            categories={categories}
            brands={brands}
            filters={filters}
            priceBounds={priceBounds}
            onChange={onChange}
          />
        </div>
        <div className="mt-4 flex gap-3">
          <button
            type="button"
            onClick={onReset}
            className="flex-1 rounded-xl border border-slate-200 py-3 text-sm font-semibold text-slate-700"
          >
            Reset
          </button>
          <button
            type="button"
            onClick={onClose}
            className="flex-1 rounded-xl bg-emerald-600 py-3 text-sm font-semibold text-white"
          >
            Apply
          </button>
        </div>
      </div>
    </div>
  );
}

function FilterControls({ categories, brands, filters, priceBounds, onChange }) {
  return (
    <div className="space-y-6 text-sm">
      <div>
        <div className="text-xs font-semibold uppercase tracking-widest text-slate-400 mb-3">
          Category
        </div>
        <div className="space-y-2">
          {categories.map((cat) => (
            <label key={cat} className="flex items-center gap-2 text-slate-700">
              <input
                type="radio"
                name="category"
                checked={filters.category === cat}
                onChange={() => onChange((prev) => ({ ...prev, category: cat }))}
              />
              {cat}
            </label>
          ))}
        </div>
      </div>

      <div>
        <div className="text-xs font-semibold uppercase tracking-widest text-slate-400 mb-3">
          Brand
        </div>
        <div className="space-y-2">
          {brands.map((brand) => (
            <label key={brand} className="flex items-center gap-2 text-slate-700">
              <input
                type="radio"
                name="brand"
                checked={filters.brand === brand}
                onChange={() => onChange((prev) => ({ ...prev, brand }))}
              />
              {brand}
            </label>
          ))}
        </div>
      </div>

      <div>
        <div className="text-xs font-semibold uppercase tracking-widest text-slate-400 mb-3">
          Price range
        </div>
        <div className="flex items-center gap-3">
          <input
            type="number"
            min={priceBounds.min}
            max={priceBounds.max}
            value={filters.priceMin}
            onChange={(e) =>
              onChange((prev) => ({
                ...prev,
                priceMin: Math.min(Number(e.target.value), prev.priceMax),
              }))
            }
            className="w-24 rounded-lg border border-slate-200 px-2 py-1"
          />
          <span className="text-slate-400">to</span>
          <input
            type="number"
            min={priceBounds.min}
            max={priceBounds.max}
            value={filters.priceMax}
            onChange={(e) =>
              onChange((prev) => ({
                ...prev,
                priceMax: Math.max(Number(e.target.value), prev.priceMin),
              }))
            }
            className="w-24 rounded-lg border border-slate-200 px-2 py-1"
          />
        </div>
        <input
          type="range"
          min={priceBounds.min}
          max={priceBounds.max}
          value={filters.priceMax}
          onChange={(e) =>
            onChange((prev) => ({ ...prev, priceMax: Number(e.target.value) }))
          }
          className="mt-3 w-full"
        />
      </div>

      <div>
        <div className="text-xs font-semibold uppercase tracking-widest text-slate-400 mb-3">
          Rating
        </div>
        <div className="flex flex-wrap gap-2">
          {[4.5, 4, 3.5].map((value) => (
            <button
              key={value}
              type="button"
              onClick={() => onChange((prev) => ({ ...prev, rating: value }))}
              className={`rounded-full px-3 py-1 text-xs font-semibold ${filters.rating === value
                ? "bg-emerald-600 text-white"
                : "bg-slate-100 text-slate-600"
                }`}
            >
              {value}+ stars
            </button>
          ))}
        </div>
      </div>

      <div>
        <div className="text-xs font-semibold uppercase tracking-widest text-slate-400 mb-3">
          Availability
        </div>
        <div className="space-y-2">
          {[
            { value: "all", label: "All" },
            { value: "in", label: "In stock" },
          ].map((opt) => (
            <label key={opt.value} className="flex items-center gap-2 text-slate-700">
              <input
                type="radio"
                name="availability"
                checked={filters.availability === opt.value}
                onChange={() => onChange((prev) => ({ ...prev, availability: opt.value }))}
              />
              {opt.label}
            </label>
          ))}
        </div>
      </div>
    </div>
  );
}

function ProductGrid({ products, onAdd }) {
  return (
    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
      {products.map((product) => (
        <ProductCard key={product.id} product={product} onAdd={() => onAdd(product)} />
      ))}
    </div>
  );
}

function ProductCard({ product, onAdd }) {
  const [loaded, setLoaded] = useState(false);
  const navigate = useNavigate();
  const inStock = product.stock > 0;
  const isActive = !product.status || String(product.status).toUpperCase() === "ACTIVE";
  const canAddToCart = inStock && isActive;

  return (
    <div
      role="button"
      tabIndex={0}
      onClick={() => navigate(`/products/${product.id}`)}
      onKeyDown={(event) => {
        if (event.key === "Enter" || event.key === " ") {
          event.preventDefault();
          navigate(`/products/${product.id}`);
        }
      }}
      className="flex h-full flex-col rounded-3xl border border-slate-200 bg-white p-4 shadow-sm transition hover:-translate-y-0.5 hover:shadow-lg cursor-pointer"
    >
      <div className="relative">
        {!loaded && <div className="absolute inset-0 animate-pulse rounded-2xl bg-slate-100" />}
        <Link to={`/products/${product.id}`} className="block" onClick={(event) => event.stopPropagation()}>
          <img
            src={product.imageUrl || FALLBACK_IMAGE}
            alt={product.name}
            className={`aspect-square w-full rounded-2xl object-cover ${loaded ? "opacity-100" : "opacity-0"}`}
            loading="lazy"
            onLoad={() => setLoaded(true)}
          />
        </Link>
        {product.discount ? (
          <span className="absolute left-3 top-3 rounded-full bg-emerald-600 px-2.5 py-1 text-xs font-semibold text-white">
            {product.discount}
          </span>
        ) : null}
      </div>

      <div className="mt-3 flex flex-1 flex-col">
        <Link
          to={`/products/${product.id}`}
          onClick={(event) => event.stopPropagation()}
          className="min-h-[40px] text-sm font-semibold text-slate-900 line-clamp-2 hover:text-emerald-700"
        >
          {product.name}
        </Link>
        <div className="mt-1 text-xs text-slate-500 line-clamp-2 min-h-[32px]">
          {product.description}
        </div>

        <div className="mt-2 flex items-center gap-2 text-xs text-slate-500">
          <span>Rating {product.rating}</span>
          <span>({product.reviews})</span>
        </div>

        <div className="mt-2 flex items-center gap-2">
          {product.oldPrice ? (
            <span className="text-xs text-slate-400 line-through">
              ${Number(product.oldPrice).toFixed(2)}
            </span>
          ) : null}
          <span className="text-lg font-semibold text-slate-900">
            ${Number(product.price).toFixed(2)}
          </span>
        </div>

        <div className="mt-2 flex items-center justify-between text-xs">
          <span className="rounded-full bg-slate-100 px-2 py-1 text-slate-600">
            {product.shipping || "Free shipping"}
          </span>
          <span
            className={`font-semibold ${canAddToCart ? "text-emerald-700" : "text-rose-600"
              }`}
          >
            {canAddToCart ? "In stock" : inStock ? "Unavailable" : "Out of stock"}
          </span>
        </div>

        <div className="mt-auto pt-4">
          <button
            type="button"
            onClick={(event) => {
              event.stopPropagation();
              onAdd();
            }}
            disabled={!canAddToCart}
            className={`w-full rounded-xl px-4 py-2.5 text-sm font-semibold text-white transition focus-visible:ring-2 focus-visible:ring-emerald-500 ${canAddToCart
              ? "bg-emerald-600 hover:bg-emerald-700"
              : "cursor-not-allowed bg-slate-300"
              }`}
          >
            <span className="inline-flex items-center justify-center gap-2">
              <ShoppingCart className="w-4 h-4" />
              {canAddToCart ? "Add to Cart" : "Unavailable"}
            </span>
          </button>
        </div>
      </div>
    </div>
  );
}

function EmptyState({ onReset }) {
  return (
    <div className="rounded-3xl border border-slate-200 bg-white p-10 text-center">
      <h3 className="text-lg font-semibold text-slate-900">No results found</h3>
      <p className="mt-2 text-sm text-slate-600">
        Try adjusting your filters to see more products.
      </p>
      <button
        type="button"
        onClick={onReset}
        className="mt-4 rounded-xl bg-emerald-600 px-5 py-2.5 text-sm font-semibold text-white"
      >
        Reset filters
      </button>
    </div>
  );
}

function SkeletonGrid() {
  return (
    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
      {Array.from({ length: 8 }).map((_, index) => (
        <SkeletonCard key={index} />
      ))}
    </div>
  );
}

function SkeletonCard() {
  return (
    <div className="rounded-3xl border border-slate-200 bg-white p-4">
      <div className="aspect-square rounded-2xl bg-slate-100 animate-pulse" />
      <div className="mt-3 space-y-2">
        <div className="h-4 w-3/4 rounded bg-slate-100 animate-pulse" />
        <div className="h-3 w-2/3 rounded bg-slate-100 animate-pulse" />
        <div className="h-3 w-1/3 rounded bg-slate-100 animate-pulse" />
        <div className="h-10 rounded bg-slate-100 animate-pulse" />
      </div>
    </div>
  );
}
