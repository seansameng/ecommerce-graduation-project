import { Link } from "react-router-dom";

export default function CategorySection({ categories = [] }) {
  return (
    <section id="categories" className="mt-12">
      <div className="flex items-end justify-between">
        <h2 className="text-xl font-extrabold tracking-tight">Shop by Category</h2>
        <Link to="/products" className="text-sm font-semibold text-emerald-600 hover:text-emerald-700">
          View All
        </Link>
      </div>

      <div className="mt-4 grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-6">
        {categories.map((c) => (
          <Link
            key={c.name}
            to={`/products?category=${encodeURIComponent(c.name)}`}
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
  );
}
