const Footer = () => {
    return (
        <footer className="border-t border-slate-100 bg-white">
            <div className="max-w-7xl mx-auto px-4 py-12 sm:px-6 lg:px-8">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-8" text="middle">
                    Comming soon. Implementing footer content.
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
