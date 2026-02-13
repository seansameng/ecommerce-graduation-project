import { Link, useParams } from "react-router-dom";

export default function OrderSuccess() {
    const { id } = useParams();

    return (
        <div
            className="min-h-screen bg-[#f7f4ee] text-slate-900"
            style={{ fontFamily: '"Ubuntu", "Segoe UI", sans-serif' }}
        >
            <main className="max-w-3xl mx-auto px-6 lg:px-8 py-16">
                <div className="rounded-3xl bg-white p-8 ring-1 ring-slate-100">
                    <h1 className="text-3xl font-extrabold tracking-tight">Order placed</h1>
                    <p className="mt-2 text-sm text-slate-600">
                        Your order has been created{ id ? ` (Order #${id}).` : "."}
                    </p>

                    <div className="mt-8 flex flex-wrap gap-3">
                        <Link
                            to="/products"
                            className="inline-flex rounded-xl bg-emerald-500 px-5 py-3 text-sm font-extrabold text-white hover:bg-emerald-600"
                        >
                            Continue shopping
                        </Link>
                        <Link
                            to="/"
                            className="inline-flex rounded-xl bg-slate-50 px-5 py-3 text-sm font-extrabold text-slate-900 ring-1 ring-slate-200 hover:bg-slate-100"
                        >
                            Home
                        </Link>
                    </div>
                </div>
            </main>
        </div>
    );
}
