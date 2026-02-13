import React, { useEffect, useMemo, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { Filter, Search, ShoppingCart, X } from "lucide-react";
import Navbar from "../components/navbar/Navbar.jsx";
import Footer from "../components/footer/Footer.jsx";
import { getProducts } from "../api/productApi";
import useCart from "../hooks/useCart";

const FALLBACK_IMAGE =
  "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=600&h=600&fit=crop";

/*
const DUMMY_PRODUCTS = [
  {
    id: "se-01",
    name: "ShopEase X1 Pro Ultrabook 14”",
    description: "Ultra-thin performance with all-day battery.",
    price: 1099,
    oldPrice: 1299,
    discount: "-15%",
    rating: 4.7,
    reviews: 212,
    category: "Laptops",
    brand: "ShopEase",
    stock: 18,
    shipping: "Free shipping",
    imageUrl: "https://images.unsplash.com/photo-1496181133206-80ce9b88a853?auto=format&fit=crop&w=900&q=60",
  },
  {
    id: "se-02",
    name: "AeroSound ANC Wireless Headphones",
    description: "Noise cancellation with studio-grade clarity.",
    price: 179,
    oldPrice: 229,
    discount: "-22%",
    rating: 4.5,
    reviews: 94,
    category: "Audio",
    brand: "AeroSound",
    stock: 6,
    shipping: "Free shipping",
    imageUrl: "https://images.unsplash.com/photo-1518443895914-25f2f7a1c1c5?auto=format&fit=crop&w=900&q=60",
  },
  {
    id: "se-03",
    name: "Photon Mini 4K Action Camera",
    description: "Waterproof, stabilization, 4K capture.",
    price: 249,
    oldPrice: null,
    discount: "",
    rating: 4.4,
    reviews: 61,
    category: "Cameras",
    brand: "Photon",
    stock: 24,
    shipping: "Free shipping",
    imageUrl: "https://images.unsplash.com/photo-1526170375885-4d8ecf77b99f?auto=format&fit=crop&w=900&q=60",
  },
  {
    id: "se-04",
    name: "PulseFit S3 Smartwatch",
    description: "Health tracking, GPS, and 7‑day battery.",
    price: 199,
    oldPrice: 249,
    discount: "-20%",
    rating: 4.6,
    reviews: 128,
    category: "Wearables",
    brand: "PulseFit",
    stock: 12,
    shipping: "Free shipping",
    imageUrl: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?auto=format&fit=crop&w=900&q=60",
  },
  {
    id: "se-05",
    name: "ZenPhone Pro Max 6.8”",
    description: "Flagship camera and ultra-smooth display.",
    price: 999,
    oldPrice: 1099,
    discount: "-9%",
    rating: 4.8,
    reviews: 315,
    category: "Phones",
    brand: "ZenPhone",
    stock: 8,
    shipping: "Free shipping",
    imageUrl: "https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?auto=format&fit=crop&w=900&q=60",
  },
  {
    id: "se-06",
    name: "Dock+ 8‑in‑1 USB‑C Hub",
    description: "Power delivery, HDMI, and SD expansion.",
    price: 59,
    oldPrice: null,
    discount: "",
    rating: 4.2,
    reviews: 42,
    category: "Accessories",
    brand: "Dock+",
    stock: 42,
    shipping: "Free shipping",
    imageUrl: "https://images.unsplash.com/photo-1517336714731-489689fd1ca8?auto=format&fit=crop&w=900&q=60",
  },
  {
    id: "se-07",
    name: "Nebula 12” Tablet + Keyboard",
    description: "Work-ready tablet with premium keyboard.",
    price: 499,
    oldPrice: 549,
    discount: "-9%",
    rating: 4.5,
    reviews: 73,
    category: "Tablets",
    brand: "Nebula",
    stock: 10,
    shipping: "Free shipping",
    imageUrl: "https://images.unsplash.com/photo-1587825140708-dfaf72ae4b04?auto=format&fit=crop&w=900&q=60",
  },
  {
    id: "se-08",
    name: "LumaSound Compact Speaker",
    description: "360° sound with deep bass.",
    price: 89,
    oldPrice: 109,
    discount: "-18%",
    rating: 4.3,
    reviews: 57,
    category: "Audio",
    brand: "LumaSound",
    stock: 15,
    shipping: "Free shipping",
    imageUrl: "https://images.unsplash.com/photo-1518443895914-25f2f7a1c1c5?auto=format&fit=crop&w=900&q=60",
  },
  {
    id: "se-09",
    name: "VisionAir 4K Monitor 27”",
    description: "Color-accurate 4K panel with HDR.",
    price: 429,
    oldPrice: 479,
    discount: "-10%",
    rating: 4.6,
    reviews: 88,
    category: "Accessories",
    brand: "VisionAir",
    stock: 20,
    shipping: "Free shipping",
    imageUrl: "https://images.unsplash.com/photo-1527443224154-9f69b0f0a09f?auto=format&fit=crop&w=900&q=60",
  },
  {
    id: "se-10",
    name: "Orion Pro DSLR Kit",
    description: "Complete kit with lens + bag bundle.",
    price: 1199,
    oldPrice: 1349,
    discount: "-11%",
    rating: 4.7,
    reviews: 152,
    category: "Cameras",
    brand: "Orion",
    stock: 4,
    shipping: "Free shipping",
    imageUrl: "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?auto=format&fit=crop&w=900&q=60",
  },
  {
    id: "se-11",
    name: "PulseFit Bands Set",
    description: "Soft‑touch sport bands (3 pack).",
    price: 29,
    oldPrice: null,
    discount: "",
    rating: 4.1,
    reviews: 36,
    category: "Wearables",
    brand: "PulseFit",
    stock: 50,
    shipping: "Free shipping",
    imageUrl: "https://images.unsplash.com/photo-1519710164239-da123dc03ef4?auto=format&fit=crop&w=900&q=60",
  },
  {
    id: "se-12",
    name: "Core i9 Creator Laptop 16”",
    description: "High‑performance build for creators.",
    price: 1899,
    oldPrice: 2099,
    discount: "-10%",
    rating: 4.8,
    reviews: 203,
    category: "Laptops",
    brand: "CoreTech",
    stock: 7,
    shipping: "Free shipping",
    imageUrl: "https://images.unsplash.com/photo-1517336714731-489689fd1ca8?auto=format&fit=crop&w=900&q=60",
  },
];
*/

const SORT_OPTIONS = [
  { value: "best", label: "Best match" },
  { value: "price-asc", label: "Price low-high" },
  { value: "price-desc", label: "Price high-low" },
  { value: "newest", label: "Newest" },
  { value: "rating", label: "Rating" },
];

export default function Product() {
  const location = useLocation();
  const { addToCart, cartCount } = useCart();
  const [q, setQ] = useState("");
  const [products, setProducts] = useState([]);
  const [status, setStatus] = useState("idle");
  const [error, setError] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [searchInput, setSearchInput] = useState("");
  const [sortBy, setSortBy] = useState("best");
  const [showFilters, setShowFilters] = useState(false);
  const [visibleCount, setVisibleCount] = useState(8);

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
    const term = searchTerm.toLowerCase();
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
  }, [allProducts, filters, searchTerm]);

  const sortedProducts = useMemo(() => {
    const items = [...filteredProducts];
    switch (sortBy) {
      case "price-asc":
        return items.sort((a, b) => a.price - b.price);
      case "price-desc":
        return items.sort((a, b) => b.price - a.price);
      case "newest":
        return items.sort((a, b) => String(b.id).localeCompare(String(a.id)));
      case "rating":
        return items.sort((a, b) => b.rating - a.rating);
      default:
        return items.sort((a, b) => b.rating * b.reviews - a.rating * a.reviews);
    }
  }, [filteredProducts, sortBy]);

  const visibleProducts = useMemo(
    () => sortedProducts.slice(0, visibleCount),
    [sortedProducts, visibleCount]
  );

  const onSearchSubmit = (event) => {
    event.preventDefault();
    setSearchTerm(searchInput.trim());
  };

  const clearAllFilters = () => {
    setFilters({
      category: "All",
      brand: "All",
      rating: 0,
      availability: "all",
      priceMin: priceBounds.min,
      priceMax: priceBounds.max,
    });
    setSearchTerm("");
    setSearchInput("");
  };

  const activeChips = useMemo(() => {
    const chips = [];
    if (searchTerm) chips.push({ key: "search", label: `Search: ${searchTerm}` });
    if (filters.category !== "All") chips.push({ key: "category", label: filters.category });
    if (filters.brand !== "All") chips.push({ key: "brand", label: filters.brand });
    if (filters.rating > 0) chips.push({ key: "rating", label: `${filters.rating}+ stars` });
    if (filters.availability === "in") chips.push({ key: "availability", label: "In stock" });
    if (
      filters.priceMin !== priceBounds.min ||
      filters.priceMax !== priceBounds.max
    ) {
      chips.push({
        key: "price",
        label: `Price: $${filters.priceMin}–$${filters.priceMax}`,
      });
    }
    return chips;
  }, [filters, priceBounds.max, priceBounds.min, searchTerm]);

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

      <section className="border-b border-slate-200/60 bg-white">
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
      </section>

      <section className="max-w-[1280px] mx-auto px-4 md:px-6 lg:px-8 py-6">
        <PLPToolbar
          searchInput={searchInput}
          setSearchInput={setSearchInput}
          onSearchSubmit={onSearchSubmit}
          activeChips={activeChips}
          onRemoveChip={(key) => {
            if (key === "search") setSearchTerm("");
            if (key === "category") setFilters((prev) => ({ ...prev, category: "All" }));
            if (key === "brand") setFilters((prev) => ({ ...prev, brand: "All" }));
            if (key === "rating") setFilters((prev) => ({ ...prev, rating: 0 }));
            if (key === "availability") setFilters((prev) => ({ ...prev, availability: "all" }));
            if (key === "price")
              setFilters((prev) => ({
                ...prev,
                priceMin: priceBounds.min,
                priceMax: priceBounds.max,
              }));
          }}
          clearAll={clearAllFilters}
          sortBy={sortBy}
          setSortBy={setSortBy}
          totalCount={sortedProducts.length}
          visibleCount={visibleProducts.length}
          onOpenFilters={() => setShowFilters(true)}
        />

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
            {status !== "loading" && sortedProducts.length === 0 && (
              <EmptyState onReset={clearAllFilters} />
            )}
            {sortedProducts.length > 0 && (
              <>
                <ProductGrid
                  products={visibleProducts}
                  onAdd={(product) =>
                    addToCart({
                      id: product.id,
                      name: product.name,
                      price: product.price,
                      imageUrl: product.imageUrl || FALLBACK_IMAGE,
                    })
                  }
                />
                <Pagination
                  canLoadMore={visibleProducts.length < sortedProducts.length}
                  onLoadMore={() => setVisibleCount((count) => count + 4)}
                />
              </>
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

function PLPToolbar({
  searchInput,
  setSearchInput,
  onSearchSubmit,
  activeChips,
  onRemoveChip,
  clearAll,
  sortBy,
  setSortBy,
  totalCount,
  visibleCount,
  onOpenFilters,
}) {
  return (
    <div className="rounded-3xl border border-slate-200 bg-white p-5 shadow-sm">
      <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
        <form onSubmit={onSearchSubmit} className="flex w-full lg:max-w-xl gap-3">
          <div className="relative flex-1">
            <Search className="w-5 h-5 text-slate-400 absolute left-4 top-1/2 -translate-y-1/2" />
            <input
              value={searchInput}
              onChange={(event) => setSearchInput(event.target.value)}
              placeholder="Search by product name"
              className="w-full border border-slate-200 rounded-xl px-12 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
              aria-label="Search products"
            />
          </div>
          <button
            type="submit"
            className="px-5 py-3 rounded-xl bg-emerald-600 text-white font-semibold hover:bg-emerald-700 transition-colors"
          >
            Search
          </button>
        </form>

        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={onOpenFilters}
            className="inline-flex items-center gap-2 rounded-xl border border-slate-200 px-3 py-2 text-sm font-semibold text-slate-700 hover:bg-slate-50 lg:hidden"
          >
            <Filter className="w-4 h-4" />
            Filters
          </button>
          <select
            value={sortBy}
            onChange={(event) => setSortBy(event.target.value)}
            className="rounded-xl border border-slate-200 px-3 py-2 text-sm font-semibold text-slate-700"
            aria-label="Sort products"
          >
            {SORT_OPTIONS.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
          <div className="text-sm text-slate-500">
            Showing {Math.min(visibleCount, totalCount)} of {totalCount} items
          </div>
        </div>
      </div>

      <div className="mt-4 flex flex-wrap items-center gap-2">
        {activeChips.map((chip) => (
          <button
            key={chip.key}
            type="button"
            onClick={() => onRemoveChip(chip.key)}
            className="inline-flex items-center gap-2 rounded-full bg-slate-100 px-3 py-1 text-xs font-semibold text-slate-600 hover:bg-slate-200"
          >
            {chip.label}
            <X className="w-3 h-3" />
          </button>
        ))}
        {activeChips.length > 0 && (
          <button
            type="button"
            onClick={clearAll}
            className="text-xs font-semibold text-emerald-700 hover:text-emerald-800"
          >
            Clear all
          </button>
        )}
      </div>
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
        className={`absolute bottom-0 left-0 right-0 rounded-t-3xl bg-white p-5 shadow-xl transition-transform ${
          open ? "translate-y-0" : "translate-y-full"
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
              className={`rounded-full px-3 py-1 text-xs font-semibold ${
                filters.rating === value
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
  const inStock = product.stock > 0;

  return (
    <div className="flex h-full flex-col rounded-3xl border border-slate-200 bg-white p-4 shadow-sm transition hover:-translate-y-0.5 hover:shadow-lg">
      <div className="relative">
        {!loaded && <div className="absolute inset-0 animate-pulse rounded-2xl bg-slate-100" />}
        <img
          src={product.imageUrl || FALLBACK_IMAGE}
          alt={product.name}
          className={`aspect-square w-full rounded-2xl object-cover ${loaded ? "opacity-100" : "opacity-0"}`}
          loading="lazy"
          onLoad={() => setLoaded(true)}
        />
        {product.discount ? (
          <span className="absolute left-3 top-3 rounded-full bg-emerald-600 px-2.5 py-1 text-xs font-semibold text-white">
            {product.discount}
          </span>
        ) : null}
      </div>

      <div className="mt-3 flex flex-1 flex-col">
        <div className="min-h-[40px] text-sm font-semibold text-slate-900 line-clamp-2">
          {product.name}
        </div>
        <div className="mt-1 text-xs text-slate-500 line-clamp-2 min-h-[32px]">
          {product.description}
        </div>

        <div className="mt-2 flex items-center gap-2 text-xs text-slate-500">
          <span>⭐ {product.rating}</span>
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
          <span className={`font-semibold ${inStock ? "text-emerald-700" : "text-amber-600"}`}>
            {inStock ? "In stock" : "Low stock"}
          </span>
        </div>

        <div className="mt-auto pt-4">
          <button
            type="button"
            onClick={onAdd}
            className="w-full rounded-xl bg-emerald-600 px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-emerald-700 focus-visible:ring-2 focus-visible:ring-emerald-500"
          >
            <span className="inline-flex items-center justify-center gap-2">
              <ShoppingCart className="w-4 h-4" />
              Add to Cart
            </span>
          </button>
          <Link to={`/products/${product.id}`} className="mt-2 block text-center text-xs font-semibold text-slate-600">
            Details →
          </Link>
        </div>
      </div>
    </div>
  );
}

function Pagination({ canLoadMore, onLoadMore }) {
  if (!canLoadMore) return null;
  return (
    <div className="mt-6 flex justify-center">
      <button
        type="button"
        onClick={onLoadMore}
        className="rounded-xl border border-slate-200 px-6 py-3 text-sm font-semibold text-slate-700 hover:bg-slate-50"
      >
        Load more
      </button>
    </div>
  );
}

function EmptyState({ onReset }) {
  return (
    <div className="rounded-3xl border border-slate-200 bg-white p-10 text-center">
      <h3 className="text-lg font-semibold text-slate-900">No results found</h3>
      <p className="mt-2 text-sm text-slate-600">
        Try adjusting your filters or search for a different product.
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
