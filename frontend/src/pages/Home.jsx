import { useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { FiSearch, FiUser, FiShoppingCart } from "react-icons/fi";
const categories = [
  {
    name: "Phones",
    img: "https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?auto=format&fit=crop&w=900&q=60",
    href: "/category/phones",
  },
  {
    name: "Headphones",
    img: "https://images.unsplash.com/photo-1518443895914-25f2f7a1c1c5?auto=format&fit=crop&w=900&q=60",
    href: "/category/headphones",
  },
  {
    name: "Watches",
    img: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?auto=format&fit=crop&w=900&q=60",
    href: "/category/watches",
  },
  {
    name: "Chargers",
    img: "https://images.unsplash.com/photo-1582560475093-87fb4a2b7b38?auto=format&fit=crop&w=900&q=60",
    href: "/category/chargers",
  },
  {
    name: "Laptops",
    img: "https://images.unsplash.com/photo-1496181133206-80ce9b88a853?auto=format&fit=crop&w=900&q=60",
    href: "/category/laptops",
  },
  {
    name: "Tablets",
    img: "https://images.unsplash.com/photo-1587825140708-dfaf72ae4b04?auto=format&fit=crop&w=900&q=60",
    href: "/category/tablets",
  },
];

const featuredDeals = [
  {
    tag: "-15%",
    category: "COMPUTERS",
    name: "Ultrabook Pro Series X",
    rating: 4.9,
    reviews: 540,
    oldPrice: 1099.0,
    price: 934.15,
    img: "https://images.unsplash.com/photo-1496181133206-80ce9b88a853?auto=format&fit=crop&w=900&q=60",
  },
  {
    tag: "",
    category: "PHOTOGRAPHY",
    name: "Instax Mini Bundle",
    rating: 4.7,
    reviews: 128,
    oldPrice: null,
    price: 120.0,
    img: "https://images.unsplash.com/photo-1526170375885-4d8ecf77b99f?auto=format&fit=crop&w=900&q=60",
  },
  {
    tag: "",
    category: "ACCESSORIES",
    name: "RGB Mechanical Keyboard",
    rating: 4.8,
    reviews: 89,
    oldPrice: null,
    price: 120.0,
    img: "https://images.unsplash.com/photo-1517336714731-489689fd1ca8?auto=format&fit=crop&w=900&q=60",
  },
  {
    tag: "",
    category: "TABLETS",
    name: "Tablet Pro 11-inch",
    rating: 4.9,
    reviews: 245,
    oldPrice: null,
    price: 799.0,
    img: "https://images.unsplash.com/photo-1587825140708-dfaf72ae4b04?auto=format&fit=crop&w=900&q=60",
  },
];

const recentlyViewed = [
  {
    name: "Smart Fitness Watch",
    price: 199,
    img: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?auto=format&fit=crop&w=900&q=60",
  },
  {
    name: "Premium Headphones",
    price: 239.2,
    img: "https://images.unsplash.com/photo-1518443895914-25f2f7a1c1c5?auto=format&fit=crop&w=900&q=60",
  },
  {
    name: "Tablet Pro 11-inch",
    price: 799,
    img: "https://images.unsplash.com/photo-1587825140708-dfaf72ae4b04?auto=format&fit=crop&w=900&q=60",
  },
  {
    name: "Wireless Charging Lamp",
    price: 45,
    img: "https://images.unsplash.com/photo-1519710164239-da123dc03ef4?auto=format&fit=crop&w=900&q=60",
  },
  {
    name: "RGB Mechanical Keyboard",
    price: 120,
    img: "https://images.unsplash.com/photo-1517336714731-489689fd1ca8?auto=format&fit=crop&w=900&q=60",
  },
];

function Badge({ children }) {
  return (
    <span className="inline-flex items-center rounded-full bg-emerald-50 px-2.5 py-1 text-xs font-semibold text-emerald-700 ring-1 ring-emerald-100">
      {children}
    </span>
  );
}

function IconPill({ title, desc }) {
  return (
    <div className="flex items-center gap-3 rounded-2xl bg-white px-4 py-3 shadow-sm ring-1 ring-slate-100">
      <div className="h-9 w-9 rounded-xl bg-emerald-50 ring-1 ring-emerald-100" />
      <div className="leading-tight">
        <div className="text-sm font-semibold text-slate-900">{title}</div>
        <div className="text-xs text-slate-500">{desc}</div>
      </div>
    </div>
  );
}

function Card({ img, children }) {
  return (
    <div className="group overflow-hidden rounded-3xl bg-white shadow-sm ring-1 ring-slate-100">
      <div className="relative h-44 w-full overflow-hidden">
        <img
          src={img}
          alt=""
          className="h-full w-full object-cover transition duration-500 group-hover:scale-[1.03]"
          loading="lazy"
        />
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/40 via-black/10 to-transparent" />
      </div>
      <div className="p-4">{children}</div>
    </div>
  );
}

export default function Home() {
  const [q, setQ] = useState("");

  const topNav = useMemo(
    () => ["Home", "Phones", "Headphones", "Smartwatches", "Chargers", "Laptops", "Tablets", "Deals"],
    []
  );

  return (
    <div
      className="min-h-screen bg-[#f7f4ee] text-slate-900"
      style={{ fontFamily: '"Space Grotesk", "DM Sans", "Segoe UI", sans-serif' }}
    >
      <style>{`
        @keyframes fadeUp {
          from { opacity: 0; transform: translateY(18px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes floatSlow {
          0% { transform: translateY(0px); }
          50% { transform: translateY(-8px); }
          100% { transform: translateY(0px); }
        }
      `}</style>
      <header className="sticky top-0 z-30 border-b border-slate-200/60 bg-white/80 backdrop-blur">
        <div className="mx-auto max-w-6xl px-4">
          <div className="flex items-center justify-between py-3">
            <Link to="/" className="flex items-center gap-2">
              <div className="grid h-9 w-9 place-items-center rounded-xl bg-emerald-500 text-white font-bold">
                S
              </div>
              <div className="text-lg font-extrabold tracking-tight">
                Shop<span className="text-emerald-600">Ease</span>
              </div>
            </Link>

            <div className="hidden md:flex w-[520px] max-w-[52vw] items-center gap-2 rounded-2xl bg-slate-50 px-4 py-2 ring-1 ring-slate-200">
              <FiSearch className="text-slate-400" />
              <input
                value={q}
                onChange={(e) => setQ(e.target.value)}
                placeholder="Search for phones, laptops, and more..."
                className="w-full bg-transparent text-sm outline-none placeholder:text-slate-400"
              />
            </div>

            <div className="flex items-center gap-3">
              <Link
                to="/login"
                className="hidden sm:inline-flex items-center gap-2 rounded-xl px-3 py-2 text-sm font-semibold text-slate-700 hover:bg-slate-50"
              >
                Sign In
              </Link>
              <button className="grid h-10 w-10 place-items-center rounded-xl hover:bg-slate-50 ring-1 ring-slate-200">
                <FiUser className="text-slate-500" />
              </button>
              <button className="relative grid h-10 w-10 place-items-center rounded-xl hover:bg-slate-50 ring-1 ring-slate-200">
                <FiShoppingCart className="text-slate-500" />
                <span className="absolute -right-1 -top-1 grid h-5 w-5 place-items-center rounded-full bg-emerald-500 text-[11px] font-bold text-white">
                  3
                </span>
              </button>
            </div>
          </div>

          <nav className="flex items-center gap-6 overflow-x-auto pb-3 text-sm text-slate-600">
            {topNav.map((item) => (
              <Link
                key={item}
                to={item === "Home" ? "/" : `/${item.toLowerCase()}`}
                className={`whitespace-nowrap hover:text-slate-900 ${item === "Deals" ? "font-semibold text-rose-600" : ""
                  }`}
              >
                {item}
              </Link>
            ))}
          </nav>

          <div className="md:hidden pb-3">
            <div className="flex items-center gap-2 rounded-2xl bg-slate-50 px-4 py-2 ring-1 ring-slate-200">
              <FiSearch className="text-slate-400" />
              <input
                value={q}
                onChange={(e) => setQ(e.target.value)}
                placeholder="Search products..."
                className="w-full bg-transparent text-sm outline-none placeholder:text-slate-400"
              />
            </div>
          </div>
        </div>
      </header>

      <main className="mx-auto max-w-6xl px-4">
        <section className="pt-8">
          <div className="relative overflow-hidden rounded-[32px] bg-[#0f172a]">
            <div className="absolute -left-10 -top-16 h-48 w-48 rounded-full bg-emerald-400/40 blur-3xl" />
            <div className="absolute right-0 top-10 h-56 w-56 rounded-full bg-amber-300/30 blur-3xl" />
            <div className="grid gap-8 px-6 py-10 md:px-10 lg:grid-cols-[1.1fr_0.9fr] lg:items-center">
              <div style={{ animation: "fadeUp 0.6s ease-out both" }}>
                <div className="mb-4">
                  <Badge>TECH WEEK SALE</Badge>
                </div>
                <h1 className="max-w-xl text-4xl font-extrabold leading-tight text-white md:text-5xl">
                  Next‑Gen Tech <br /> Feels Effortless
                </h1>
                <p className="mt-4 max-w-lg text-sm text-white/85 md:text-base">
                  Curated devices and accessories that balance performance, design, and price — built for everyday
                  momentum.
                </p>
                <div className="mt-6 flex flex-wrap gap-3">
                  <Link
                    to="/products"
                    className="inline-flex items-center justify-center rounded-xl bg-emerald-500 px-5 py-3 text-sm font-bold text-white hover:bg-emerald-600"
                  >
                    Shop Now
                  </Link>
                  <Link
                    to="/categories"
                    className="inline-flex items-center justify-center rounded-xl bg-white/10 px-5 py-3 text-sm font-bold text-white ring-1 ring-white/20 hover:bg-white/20"
                  >
                    View Categories
                  </Link>
                </div>
                <div className="mt-8 flex flex-wrap gap-3 text-xs text-white/70">
                  <span className="rounded-full border border-white/20 px-3 py-1">Fast shipping</span>
                  <span className="rounded-full border border-white/20 px-3 py-1">Easy returns</span>
                  <span className="rounded-full border border-white/20 px-3 py-1">Official warranty</span>
                </div>
              </div>

              <div className="relative">
                <div
                  className="absolute -left-6 -top-6 h-16 w-16 rounded-2xl bg-white/10 blur-md"
                  style={{ animation: "floatSlow 5s ease-in-out infinite" }}
                />
                <div className="rounded-3xl bg-white/8 p-4 ring-1 ring-white/15">
                  <div className="text-xs font-bold uppercase tracking-[0.2em] text-white/60">
                    Editor’s picks
                  </div>
                  <div className="mt-4 space-y-4">
                    {featuredDeals.slice(0, 2).map((deal) => (
                      <div
                        key={deal.name}
                        className="flex items-center gap-4 rounded-2xl bg-white/10 p-3 ring-1 ring-white/10"
                      >
                        <img
                          src={deal.img}
                          alt={deal.name}
                          className="h-16 w-20 rounded-xl object-cover"
                          loading="lazy"
                        />
                        <div>
                          <div className="text-xs font-semibold text-white/60">{deal.category}</div>
                          <div className="text-sm font-extrabold text-white">{deal.name}</div>
                          <div className="mt-1 text-sm font-bold text-emerald-300">
                            ${deal.price.toFixed(2)}
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="mt-6 grid gap-3 md:grid-cols-4">
            <IconPill title="Free Shipping" desc="On orders over $50" />
            <IconPill title="Official Warranty" desc="1 year protection" />
            <IconPill title="Tech Support" desc="Expert assistance" />
            <IconPill title="Easy Returns" desc="30-day guarantee" />
          </div>
        </section>

        <section className="mt-12">
          <div className="flex items-end justify-between">
            <h2 className="text-xl font-extrabold tracking-tight">Shop by Category</h2>
            <Link to="/categories" className="text-sm font-semibold text-emerald-600 hover:text-emerald-700">
              View All
            </Link>
          </div>

          <div className="mt-4 grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-6">
            {categories.map((c) => (
              <Link
                key={c.name}
                to={c.href}
                className="group relative overflow-hidden rounded-2xl bg-white shadow-sm ring-1 ring-slate-100"
              >
                <img
                  src={c.img}
                  alt={c.name}
                  className="h-28 w-full object-cover transition duration-500 group-hover:scale-[1.03]"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/55 via-black/10 to-transparent" />
                <div className="absolute bottom-2 left-2 right-2">
                  <div className="rounded-xl bg-black/30 px-3 py-2 text-center text-sm font-bold text-white backdrop-blur">
                    {c.name}
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </section>

        <section className="mt-12">
          <h2 className="text-xl font-extrabold tracking-tight">Featured Deals</h2>

          <div className="mt-4 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {featuredDeals.map((p) => (
              <div key={p.name} className="overflow-hidden rounded-3xl bg-white shadow-sm ring-1 ring-slate-100">
                <div className="relative h-44 overflow-hidden">
                  <img
                    src={p.img}
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
                  <div className="text-[11px] font-bold tracking-wider text-slate-400">{p.category}</div>
                  <div className="mt-1 font-extrabold">{p.name}</div>
                  <div className="mt-2 flex items-center gap-2 text-xs text-slate-500">
                    <span className="text-amber-500">★</span>
                    <span className="font-semibold text-slate-700">{p.rating}</span>
                    <span>({p.reviews})</span>
                  </div>

                  <div className="mt-3 flex items-baseline gap-2">
                    {p.oldPrice ? (
                      <span className="text-sm text-slate-400 line-through">${p.oldPrice.toFixed(2)}</span>
                    ) : null}
                    <span className="text-lg font-extrabold text-emerald-600">${p.price.toFixed(2)}</span>
                  </div>

                  <div className="mt-4 flex gap-2">
                    <button className="flex-1 rounded-xl bg-slate-900 px-4 py-2 text-sm font-bold text-white hover:bg-slate-800">
                      Add to Cart
                    </button>
                    <button className="rounded-xl px-4 py-2 text-sm font-bold ring-1 ring-slate-200 hover:bg-slate-50">
                      View
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        <section className="mt-10 pb-16">
          <div className="flex items-center gap-2">
            <div className="h-6 w-6 rounded-xl bg-emerald-50 ring-1 ring-emerald-100" />
            <h2 className="text-xl font-extrabold tracking-tight">Recently Viewed</h2>
          </div>

          <div className="mt-4 grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-5">
            {recentlyViewed.map((p) => (
              <Card key={p.name} img={p.img}>
                <div className="font-extrabold text-sm">{p.name}</div>
                <div className="mt-2 text-sm font-bold text-emerald-600">${p.price.toFixed(2)}</div>
              </Card>
            ))}
          </div>
        </section>
      </main>

      <footer className="border-t border-slate-100 bg-white">
        <div className="mx-auto max-w-6xl px-4 py-10">
          <div className="grid gap-8 md:grid-cols-4">
            <div>
              <div className="flex items-center gap-2">
                <div className="grid h-9 w-9 place-items-center rounded-xl bg-emerald-500 text-white font-bold">
                  S
                </div>
                <div className="text-lg font-extrabold tracking-tight">
                  Shop<span className="text-emerald-600">Ease</span>
                </div>
              </div>
              <p className="mt-3 text-sm text-slate-500">
                Your #1 destination for phones, laptops, and electronic accessories.
              </p>
            </div>

            <div>
              <div className="text-sm font-extrabold">Shop</div>
              <ul className="mt-3 space-y-2 text-sm text-slate-500">
                <li>
                  <Link className="hover:text-slate-900" to="/category/phones">
                    All Phones
                  </Link>
                </li>
                <li>
                  <Link className="hover:text-slate-900" to="/category/laptops">
                    Laptops & Tablets
                  </Link>
                </li>
                <li>
                  <Link className="hover:text-slate-900" to="/new">
                    New Arrivals
                  </Link>
                </li>
                <li>
                  <Link className="hover:text-slate-900" to="/clearance">
                    Clearance
                  </Link>
                </li>
              </ul>
            </div>

            <div>
              <div className="text-sm font-extrabold">Support</div>
              <ul className="mt-3 space-y-2 text-sm text-slate-500">
                <li>
                  <Link className="hover:text-slate-900" to="/track">
                    Track Order
                  </Link>
                </li>
                <li>
                  <Link className="hover:text-slate-900" to="/guides">
                    Device Guides
                  </Link>
                </li>
                <li>
                  <Link className="hover:text-slate-900" to="/returns">
                    Shipping & Returns
                  </Link>
                </li>
                <li>
                  <Link className="hover:text-slate-900" to="/privacy">
                    Privacy Policy
                  </Link>
                </li>
              </ul>
            </div>

            <div>
              <div className="text-sm font-extrabold">Newsletter</div>
              <p className="mt-3 text-sm text-slate-500">
                Subscribe for the latest tech news and exclusive discounts.
              </p>
              <div className="mt-3 flex gap-2">
                <input
                  className="w-full rounded-xl bg-slate-50 px-3 py-2 text-sm outline-none ring-1 ring-slate-200 focus:ring-emerald-300"
                  placeholder="Enter your email"
                />
                <button className="rounded-xl bg-emerald-500 px-4 py-2 text-sm font-bold text-white hover:bg-emerald-600">
                  Join
                </button>
              </div>
            </div>
          </div>

          <div className="mt-10 flex flex-col gap-3 border-t border-slate-100 pt-6 text-xs text-slate-400 md:flex-row md:items-center md:justify-between">
            <div>© {new Date().getFullYear()} ShopEase Electronics. All rights reserved.</div>
            <div className="flex gap-4">
              <Link className="hover:text-slate-700" to="/terms">
                Terms
              </Link>
              <Link className="hover:text-slate-700" to="/privacy">
                Privacy
              </Link>
              <Link className="hover:text-slate-700" to="/cookies">
                Cookies
              </Link>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
