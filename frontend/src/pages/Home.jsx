import { useState } from "react";
import Navbar from "../components/navbar/Navbar.jsx";
import Footer from "../components/footer/Footer.jsx";

// import HeroSection from "../components/hero/HeroSection.jsx";
// import InfoPills from "../components/hero/InfoPills.jsx";
import CategorySection from "../components/category/CategorySection.jsx";
import FeaturedDealsSection from "../components/product/FeaturedDealsSection.jsx";
import RecentlyViewedSection from "../components/recent/RecentlyViewedSection.jsx";

import { categories, featuredDeals, recentlyViewed } from "../data/homeData";

export default function Home() {
  const [q, setQ] = useState("");

  return (
    <div
      className="min-h-screen bg-[#f7f4ee] text-slate-900"
      style={{ fontFamily: '"Space Grotesk", "DM Sans", "Segoe UI", sans-serif' }}
    >
      <Navbar q={q} setQ={setQ} cartCount={3} brand={{ name: "ShopEase", href: "/" }} />

      <main className="mx-auto max-w-6xl px-4">
        {/* <HeroSection featuredDeals={featuredDeals} /> */}
        {/* <InfoPills /> */}
        <CategorySection categories={categories} />
        <FeaturedDealsSection featuredDeals={featuredDeals} />
        <RecentlyViewedSection recentlyViewed={recentlyViewed} />
      </main>

      <Footer />
    </div>
  );
}
