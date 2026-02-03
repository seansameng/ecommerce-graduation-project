import CategoryCard from "./CategoryCard";

const CategorySection = ({ categories }) => {
    return (
        <section className="mt-8">
            <div className="flex items-center justify-between mb-4">
                <h2 className="text-lg font-semibold">Shop by Category</h2>
                <a href="/products" className="text-sm text-emerald-600">
                    View All
                </a>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-4">
                {categories.map((cat) => (
                    <CategoryCard key={cat.id} {...cat} />
                ))}
            </div>
        </section>
    );
};

export default CategorySection;
