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
            <div className="w-full px-4 py-10 sm:px-6 lg:px-8">
                <div className="grid grid-cols-1 gap-8 lg:grid-cols-[1.2fr_1fr_1fr_1fr_1.2fr]">
                    {/* Logo + Tagline */}
                    <div>
                        <div className="flex items-center gap-2">
                            <div className="grid h-9 w-9 place-items-center rounded-lg bg-emerald-500 text-white text-sm font-bold">
                                S
                            </div>
                            <div className="text-base font-extrabold tracking-tight text-slate-900">
                                Shop<span className="text-emerald-600">Ease</span>
                            </div>
                        </div>
                        <p className="mt-2 text-sm text-slate-500">
                            Premium tech, simple shopping.
                        </p>
                    </div>

                    {/* Quick Links */}
                    <div>
                        <div className="text-sm font-extrabold text-slate-900">Quick Links</div>
                        <ul className="mt-3 space-y-2 text-sm text-slate-600">
                            <li><a className="hover:text-slate-900" href="/products">Products</a></li>
                            <li><a className="hover:text-slate-900" href="/orders">Orders</a></li>
                            <li><a className="hover:text-slate-900" href="/account">Account</a></li>
                            <li><a className="hover:text-slate-900" href="/settings">Settings</a></li>
                        </ul>
                    </div>

                    {/* Categories */}
                    <div>
                        <div className="text-sm font-extrabold text-slate-900">Categories</div>
                        <ul className="mt-3 space-y-2 text-sm text-slate-600">
                            <li>
                                <a className="hover:text-slate-900" href="/products">All Products</a>
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
                        <div className="mt-3 space-y-2 text-sm text-slate-600">
                            <a className="block hover:text-slate-900" href="mailto:support@shopease.com">
                                support@shopease.com
                            </a>
                            <a className="block hover:text-slate-900" href="tel:+85512345678">
                                +855 12 345 678
                            </a>
                            <div className="text-slate-500">Phnom Penh, Cambodia</div>
                        </div>
                    </div>

                    {/* Newsletter */}
                    <div>
                        <div className="text-sm font-extrabold text-slate-900">Newsletter</div>
                        <p className="mt-2 text-sm text-slate-500">Get product updates and deals.</p>
                        <form className="mt-3 flex gap-2">
                            <input
                                type="email"
                                placeholder="Email address"
                                aria-label="Email address"
                                className="w-full rounded-lg border border-slate-200 px-3 py-2 text-sm text-slate-800 placeholder:text-slate-400 focus:border-emerald-500 focus:outline-none focus:ring-2 focus:ring-emerald-200"
                            />
                            <button
                                type="button"
                                className="rounded-lg bg-emerald-500 px-4 py-2 text-sm font-semibold text-white hover:bg-emerald-600"
                            >
                                Join
                            </button>
                        </form>
                    </div>
                </div>

                <div className="mt-6 flex flex-wrap items-center justify-between gap-4">
                    <div className="flex items-center gap-3">
                        <a
                            className="grid h-9 w-9 place-items-center rounded-full border border-slate-200 text-slate-600 hover:border-emerald-300 hover:text-emerald-700"
                            href="https://www.facebook.com/"
                            target="_blank"
                            rel="noreferrer"
                            aria-label="Facebook"
                        >
                            <svg viewBox="0 0 24 24" className="h-4 w-4" fill="currentColor" aria-hidden="true">
                                <path d="M13.5 9.5V7.3c0-1 .7-1.2 1.2-1.2h1.8V3.2h-2.4c-2.7 0-3.3 2-3.3 3.3v3H9v2.9h1.8V21h3.7v-8.6h2.5l.4-2.9h-2.9z" />
                            </svg>
                        </a>
                        <a
                            className="grid h-9 w-9 place-items-center rounded-full border border-slate-200 text-slate-600 hover:border-emerald-300 hover:text-emerald-700"
                            href="https://www.instagram.com/"
                            target="_blank"
                            rel="noreferrer"
                            aria-label="Instagram"
                        >
                            <svg viewBox="0 0 24 24" className="h-4 w-4" fill="currentColor" aria-hidden="true">
                                <path d="M7 3h10a4 4 0 0 1 4 4v10a4 4 0 0 1-4 4H7a4 4 0 0 1-4-4V7a4 4 0 0 1 4-4zm10 2H7a2 2 0 0 0-2 2v10a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V7a2 2 0 0 0-2-2zm-5 3.2A3.8 3.8 0 1 1 8.2 12 3.8 3.8 0 0 1 12 8.2zm0 2A1.8 1.8 0 1 0 13.8 12 1.8 1.8 0 0 0 12 10.2zm4.6-2.6a1 1 0 1 1-1-1 1 1 0 0 1 1 1z" />
                            </svg>
                        </a>
                        <a
                            className="grid h-9 w-9 place-items-center rounded-full border border-slate-200 text-slate-600 hover:border-emerald-300 hover:text-emerald-700"
                            href="https://www.tiktok.com/"
                            target="_blank"
                            rel="noreferrer"
                            aria-label="TikTok"
                        >
                            <svg viewBox="0 0 24 24" className="h-4 w-4" fill="currentColor" aria-hidden="true">
                                <path d="M15 3c.4 2.3 2.2 3.9 4.5 4v2.3a7.1 7.1 0 0 1-4.5-1.6v6.6A5.7 5.7 0 1 1 9.3 8h2.4a3.3 3.3 0 1 0 3.3 3.3z" />
                            </svg>
                        </a>
                        <a
                            className="grid h-9 w-9 place-items-center rounded-full border border-slate-200 text-slate-600 hover:border-emerald-300 hover:text-emerald-700"
                            href="https://www.youtube.com/"
                            target="_blank"
                            rel="noreferrer"
                            aria-label="YouTube"
                        >
                            <svg viewBox="0 0 24 24" className="h-4 w-4" fill="currentColor" aria-hidden="true">
                                <path d="M22 12s0-3.5-.4-5a3 3 0 0 0-2.1-2.1C17.9 4.5 12 4.5 12 4.5s-5.9 0-7.5.4A3 3 0 0 0 2.4 7C2 8.5 2 12 2 12s0 3.5.4 5a3 3 0 0 0 2.1 2.1c1.6.4 7.5.4 7.5.4s5.9 0 7.5-.4a3 3 0 0 0 2.1-2.1c.4-1.5.4-5 .4-5zM10 15.5v-7l6 3.5-6 3.5z" />
                            </svg>
                        </a>
                    </div>
                    <div className="flex items-center gap-3 text-xs text-slate-500">
                        <span className="text-slate-400">Payments:</span>
                        <span className="rounded border border-slate-200 px-2 py-1">VISA</span>
                        <span className="rounded border border-slate-200 px-2 py-1">Mastercard</span>
                        <span className="rounded border border-slate-200 px-2 py-1">PayPal</span>
                        <span className="rounded border border-slate-200 px-2 py-1">ABA</span>
                    </div>
                </div>

                <div className="mt-6 border-t border-slate-100 pt-4 text-xs text-slate-500">
                    <div className="flex flex-wrap items-center gap-2">
                        <span>© 2026 ShopEase</span>
                        <span className="text-slate-300">·</span>
                        <a className="hover:text-slate-900" href="/privacy">Privacy Policy</a>
                        <span className="text-slate-300">·</span>
                        <a className="hover:text-slate-900" href="/terms">Terms</a>
                        <span className="text-slate-300">·</span>
                        <a className="hover:text-slate-900" href="/returns">Return Policy</a>
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
