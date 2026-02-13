const Footer = ({ categories = [] }) => {
    const categoryItems = categories
        .map((item) => {
            if (typeof item === "string") return { name: item };
            if (!item) return null;

            const imageUrl = item.image_url || item.imageUrl || item.imgUrl || "";
            return {
                ...item,
                imageUrl,
            };
        })
        .filter((item) => item && item.name)
        .slice(0, 2);

    return (
        <footer className="border-t border-slate-100 bg-white">
            <div className="max-w-7xl mx-auto px-4 py-10 sm:px-6 lg:px-8">
                <div className="grid grid-cols-1 gap-8 md:grid-cols-[1.2fr_1fr_1fr]">
                    {/* Brand */}
                    <div>
                        <div className="flex items-center gap-2">
                            <div className="grid h-10 w-10 place-items-center rounded-xl bg-emerald-500 text-white font-bold">
                                S
                            </div>
                            <div className="text-lg font-extrabold tracking-tight text-slate-900">
                                Shop<span className="text-emerald-600">Ease</span>
                            </div>
                        </div>
                        <p className="mt-3 text-sm text-slate-500">
                            Premium tech, simple shopping.
                        </p>
                    </div>

                    {/* Shop */}
                    <div>
                        <div className="text-sm font-extrabold text-slate-900">Shop</div>
                        <ul className="mt-3 space-y-2 text-sm text-slate-500">
                            <li>
                                <a className="hover:text-slate-900" href="/products">
                                    All Products
                                </a>
                            </li>
                            {categoryItems.map((category) => (
                                <li key={category.name}>
                                    <a
                                        className="inline-flex items-center gap-2 hover:text-slate-900"
                                        href={`/products?category=${encodeURIComponent(category.name)}`}
                                    >
                                        {category.imageUrl ? (
                                            <img
                                                src={category.imageUrl}
                                                alt={`${category.name} category`}
                                                className="h-5 w-5 rounded object-cover"
                                                loading="lazy"
                                            />
                                        ) : null}
                                        <span>{category.name}</span>
                                    </a>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Contact */}
                    <div>
                        <div className="text-sm font-extrabold text-slate-900">Contact</div>
                        <ul className="mt-3 space-y-2 text-sm text-slate-500">
                            <li>
                                <a className="hover:text-slate-900" href="mailto:support@shopease.com">
                                    support@shopease.com
                                </a>
                            </li>
                            <li>
                                <a className="hover:text-slate-900" href="tel:+85512345678">
                                    +855 12 345 678
                                </a>
                            </li>
                            <li className="leading-relaxed">Phnom Penh, Cambodia</li>
                        </ul>
                    </div>
                </div>
            </div>

            <div className="border-t border-slate-100">
                <div className="max-w-7xl mx-auto px-4 py-5 text-xs text-slate-400">
                    © {new Date().getFullYear()} ShopEase. All rights reserved.
                </div>
            </div>
        </footer>
    );
};

export default Footer;
