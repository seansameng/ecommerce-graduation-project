import { useEffect, useMemo, useState } from "react";
import Navbar from "../components/navbar/Navbar.jsx";
import Footer from "../components/footer/Footer.jsx";

import HeroSection from "../components/hero/HeroSection.jsx";
import InfoPills from "../components/hero/InfoPills.jsx";
import CategorySection from "../components/category/CategorySection.jsx";
import FeaturedDealsSection from "../components/product/FeaturedDealsSection.jsx";
import RecentlyViewedSection from "../components/recent/RecentlyViewedSection.jsx";

import { categories } from "../data/homeData";
import { getProducts } from "../api/productApi";

const FALLBACK_IMAGE =
  "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=600&h=600&fit=crop";

export default function Home() {
  const [q, setQ] = useState("");
  const [products, setProducts] = useState([]);

  useEffect(() => {
    let ignore = false;

    getProducts()
      .then((res) => {
        if (ignore) return;
        const items = Array.isArray(res.data) ? res.data : [];
        const mapped = items.map((product) => ({
          id: product.id,
          name: product.name,
          category: product?.category?.name || product?.category || "Uncategorized",
          price: product.price,
          img: product.imageUrl || FALLBACK_IMAGE,
        }));
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

  const featuredDeals = useMemo(() => products.slice(0, 4), [products]);
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
      className="min-h-screen bg-[#f7f4ee] text-slate-900"
      style={{ fontFamily: '"Space Grotesk", "DM Sans", "Segoe UI", sans-serif' }}
    >
      <Navbar q={q} setQ={setQ} cartCount={3} brand={{ name: "ShopEase", href: "/" }} />

      <main className="max-w-7xl mx-auto px-6 lg:px-8">
        <HeroSection featuredDeals={featuredDeals} />
        <InfoPills />
        <CategorySection categories={categories} />
        <FeaturedDealsSection featuredDeals={featuredDeals} />
        <RecentlyViewedSection recentlyViewed={recentlyViewed} />
      </main>

      <Footer />
    </div>
  );
}
