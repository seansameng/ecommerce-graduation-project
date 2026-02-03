const Footer = () => {
    return (
        <footer className="border-t border-slate-100 bg-white">
            <div className="max-w-7xl mx-auto px-4 py-12 sm:px-6 lg:px-8">
                <div className="grid grid-cols-1 gap-8 md:grid-cols-[1.2fr_1fr_1fr_1fr]">
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
                            Smart devices, curated accessories, and premium tech built for everyday momentum.
                        </p>
                    </div>

                    <div>
                        <div className="text-sm font-extrabold text-slate-900">Shop</div>
                        <ul className="mt-3 space-y-2 text-sm text-slate-500">
                            <li>
                                <a className="hover:text-slate-900" href="/products">
                                    All Products
                                </a>
                            </li>
                            <li>
                                <a className="hover:text-slate-900" href="/category/phones">
                                    Phones
                                </a>
                            </li>
                            <li>
                                <a className="hover:text-slate-900" href="/category/laptops">
                                    Laptops
                                </a>
                            </li>
                            <li>
                                <a className="hover:text-slate-900" href="/category/accessories">
                                    Accessories
                                </a>
                            </li>
                        </ul>
                    </div>

                    <div>
                        <div className="text-sm font-extrabold text-slate-900">Support</div>
                        <ul className="mt-3 space-y-2 text-sm text-slate-500">
                            <li>
                                <a className="hover:text-slate-900" href="/track">
                                    Track Order
                                </a>
                            </li>
                            <li>
                                <a className="hover:text-slate-900" href="/returns">
                                    Shipping & Returns
                                </a>
                            </li>
                            <li>
                                <a className="hover:text-slate-900" href="/warranty">
                                    Warranty
                                </a>
                            </li>
                            <li>
                                <a className="hover:text-slate-900" href="/support">
                                    Contact Support
                                </a>
                            </li>
                        </ul>
                    </div>

                    <div>
                        <div className="text-sm font-extrabold text-slate-900">Company</div>
                        <ul className="mt-3 space-y-2 text-sm text-slate-500">
                            <li>
                                <a className="hover:text-slate-900" href="/about">
                                    About
                                </a>
                            </li>
                            <li>
                                <a className="hover:text-slate-900" href="/careers">
                                    Careers
                                </a>
                            </li>
                            <li>
                                <a className="hover:text-slate-900" href="/privacy">
                                    Privacy Policy
                                </a>
                            </li>
                            <li>
                                <a className="hover:text-slate-900" href="/terms">
                                    Terms
                                </a>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
            <div className="border-t border-slate-100">
                <div className="max-w-7xl mx-auto px-4 py-6 text-xs text-slate-400">
                    © {new Date().getFullYear()} ShopEase Electronics. All rights reserved.
                </div>
            </div>
        </footer>
    );
};

export default Footer;
