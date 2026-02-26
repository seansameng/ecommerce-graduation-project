import { useEffect, useMemo, useState } from "react";
import Navbar from "../components/navbar/Navbar.jsx";
import Footer from "../components/footer/Footer.jsx";
import Breadcrumb from "../components/Breadcrumb.jsx";

import HeroSection from "../components/hero/HeroSection.jsx";
import InfoPills from "../components/hero/InfoPills.jsx";
import CategorySection from "../components/category/CategorySection.jsx";
import FeaturedDealsSection from "../components/product/FeaturedDealsSection.jsx";
import RecentlyViewedSection from "../components/recent/RecentlyViewedSection.jsx";

import { getProducts } from "../api/productApi";
import { getCategories } from "../api/categoryApi";

const FALLBACK_IMAGE =
  "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=600&h=600&fit=crop";

export default function Home() {
  const [q, setQ] = useState("");
  const [products, setProducts] = useState([]);
  const [categoryItems, setCategoryItems] = useState([]);

  useEffect(() => {
    let ignore = false;

    getProducts()
      .then((res) => {
        if (ignore) return;
        const items = Array.isArray(res.data) ? res.data : [];
        const mapped = items.map((product, index) => {
          const price = Number(product.price || 0);
          const hasDiscount = index % 3 === 0;
          const oldPrice = hasDiscount ? Number((price * 1.18).toFixed(2)) : null;
          const discountPercent = hasDiscount
            ? `-${Math.round((1 - price / oldPrice) * 100)}%`
            : "";

          return {
            id: product.id,
            name: product.name,
            category: product?.category?.name || product?.category || "Uncategorized",
            price,
            oldPrice,
            tag: discountPercent,
            rating: product.rating ?? 4.8 - (index % 4) * 0.1,
            reviews: product.reviews ?? 60 + index * 9,
            shipping: "Free shipping",
            stock: index % 4 === 0 ? "Low stock" : "In stock",
            img: product.imageUrl || FALLBACK_IMAGE,
          };
        });
        setProducts(mapped);
      })
      .catch(() => {
        if (ignore) return;
        setProducts([]);
      });

    return () => {
      ignore = true;
    };
  }, []);

  useEffect(() => {
    let ignore = false;
    getCategories()
      .then((res) => {
        if (ignore) return;
        const items = Array.isArray(res.data)
          ? res.data
            .map((c) => ({
              name: c?.name,
              imageUrl: c?.imageUrl || c?.image_url || "",
            }))
            .filter((c) => c.name)
          : [];
        setCategoryItems(items);
      })
      .catch(() => {
        if (ignore) return;
        setCategoryItems([]);
      });

    return () => {
      ignore = true;
    };
  }, []);

  const normalizedQuery = useMemo(() => q.trim().toLowerCase(), [q]);
  const hasQuery = normalizedQuery.length > 0;
  const filteredProducts = useMemo(() => {
    if (!hasQuery) return products;
    return products.filter((product) => {
      const name = String(product.name || "").toLowerCase();
      const category = String(product.category || "").toLowerCase();
      return name.includes(normalizedQuery) || category.includes(normalizedQuery);
    });
  }, [hasQuery, normalizedQuery, products]);

  const featuredDeals = useMemo(() => products.slice(0, 8), [products]);
  const categories = useMemo(() => {
    const map = new Map();
    categoryItems.forEach((cat) => {
      if (!cat.name || map.has(cat.name)) return;
      const name = cat.name;
      const match = products.find((p) => p.category === name);
      map.set(name, {
        name,
        imageUrl: cat.imageUrl || "",
        img: cat.imageUrl || match?.img || match?.imageUrl || FALLBACK_IMAGE,
      });
    });
    return Array.from(map.values());
  }, [categoryItems, products]);
  const recentlyViewed = useMemo(() => {
    const shuffled = [...products];
    for (let i = shuffled.length - 1; i > 0; i -= 1) {
      const j = Math.floor(Math.random() * (i + 1));
      [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
    }
    return shuffled.slice(0, 5);
  }, [products]);

  return (
    <div
      className="min-h-screen bg-slate-50 text-slate-900"
      style={{ fontFamily: '"Ubuntu", "Segoe UI", sans-serif' }}
    >
      <Navbar q={q} setQ={setQ} cartCount={3} brand={{ name: "ShopEase", href: "/" }} />

      <main className="mx-auto max-w-[1280px] px-4 md:px-6 lg:px-8">
        <Breadcrumb />
        <HeroSection featuredDeals={featuredDeals} />
        {/* <InfoPills /> */}
        {hasQuery ? (
          <section className="mt-12">
            <div className="flex items-end justify-between">
              <h2 className="text-xl font-semibold tracking-tight">Search results</h2>
              <div className="text-sm text-slate-500">
                {filteredProducts.length} result{filteredProducts.length === 1 ? "" : "s"}
              </div>
            </div>

            {filteredProducts.length === 0 ? (
              <div className="mt-4 rounded-2xl border border-slate-200 bg-white p-6 text-slate-600">
                No products match "{q}". Try a different keyword.
              </div>
            ) : (
              <FeaturedDealsSection
                featuredDeals={filteredProducts}
                title="Products"
                showCta={false}
              />
            )}
          </section>
        ) : (
          <>
            {categories.length > 0 && <CategorySection categories={categories} />}
            {featuredDeals.length > 0 && <FeaturedDealsSection featuredDeals={featuredDeals} />}
            {recentlyViewed.length > 0 && <RecentlyViewedSection recentlyViewed={recentlyViewed} />}
          </>
        )}
      </main>

      <Footer categories={categories} />
    </div>
  );
}



