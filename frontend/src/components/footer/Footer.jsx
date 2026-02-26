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
            <div className="w-full px-4 py-8 sm:px-6 lg:px-8">
                <div className="flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
                    {/* Brand */}
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

                    {/* Links */}
                    <div className="flex flex-wrap items-center gap-4 text-sm text-slate-600">
                        <a className="hover:text-slate-900" href="/products">
                            Products
                        </a>
                        <a className="hover:text-slate-900" href="/orders">
                            Orders
                        </a>
                        <a className="hover:text-slate-900" href="/account">
                            Account
                        </a>
                        <a className="hover:text-slate-900" href="/settings">
                            Settings
                        </a>
                        <a className="hover:text-slate-900" href="mailto:support@shopease.com">
                            support@shopease.com
                        </a>
                    </div>

                    {/* Social */}
                    <div className="flex items-center gap-3 text-sm text-slate-600">
                        <a
                            className="hover:text-slate-900"
                            href="https://www.facebook.com/"
                            target="_blank"
                            rel="noreferrer"
                        >
                            Facebook
                        </a>
                        <span className="text-slate-300">•</span>
                        <a
                            className="hover:text-slate-900"
                            href="https://www.instagram.com/"
                            target="_blank"
                            rel="noreferrer"
                        >
                            Instagram
                        </a>
                        <span className="text-slate-300">•</span>
                        <a
                            className="hover:text-slate-900"
                            href="https://www.tiktok.com/"
                            target="_blank"
                            rel="noreferrer"
                        >
                            TikTok
                        </a>
                    </div>
                </div>
            </div>

            <div className="border-t border-slate-100">
                <div className="w-full px-4 py-4 text-xs text-slate-400 sm:px-6 lg:px-8">
                    © {new Date().getFullYear()} ShopEase. All rights reserved.
                </div>
            </div>
        </footer>
    );
};

export default Footer;
