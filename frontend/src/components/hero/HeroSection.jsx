import { Link } from "react-router-dom";

function Badge({ children }) {
  return (
    <span className="inline-flex items-center rounded-full bg-emerald-50 px-2.5 py-1 text-xs font-semibold text-emerald-700 ring-1 ring-emerald-100">
      {children}
    </span>
  );
}

export default function HeroSection({ featuredDeals = [] }) {
  const picks = featuredDeals.slice(0, 2);

  return (
    <section className="pt-8">
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

      <div className="relative overflow-hidden rounded-[32px] bg-[#0f172a]">
        <div className="absolute -left-10 -top-16 h-48 w-48 rounded-full bg-emerald-400/40 blur-3xl" />
        <div className="absolute right-0 top-10 h-56 w-56 rounded-full bg-amber-300/30 blur-3xl" />

        <div className="grid gap-8 px-6 py-10 md:px-10 lg:grid-cols-[1.1fr_0.9fr] lg:items-center">
          <div style={{ animation: "fadeUp 0.6s ease-out both" }}>
            <div className="mb-4">
              <Badge>TECH WEEK SALE</Badge>
            </div>
            <h1 className="max-w-xl text-4xl font-extrabold leading-tight text-white md:text-5xl">
              Next-Gen Tech <br /> Feels Effortless
            </h1>
            <p className="mt-4 max-w-lg text-sm text-white/85 md:text-base">
              Curated devices and accessories that balance performance, design, and price - built for everyday momentum.
            </p>

            <div className="mt-6 flex flex-wrap gap-3">
              <Link
                to="/products"
                className="inline-flex items-center justify-center rounded-xl bg-emerald-500 px-5 py-3 text-sm font-bold text-white hover:bg-emerald-600"
              >
                Shop Now
              </Link>
              <Link
                to="/#categories"
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
              <div className="text-xs font-bold uppercase tracking-[0.2em] text-white/60">Editor's picks</div>
              <div className="mt-4 space-y-4">
                {picks.map((deal) => (
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
                        ${Number(deal.price || 0).toFixed(2)}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
