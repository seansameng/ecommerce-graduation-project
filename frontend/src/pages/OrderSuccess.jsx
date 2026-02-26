import { Link, useParams } from "react-router-dom";

import Navbar from "../components/navbar/Navbar.jsx";

import Footer from "../components/footer/Footer.jsx";
import Breadcrumb from "../components/Breadcrumb.jsx";

import { useState } from "react";



export default function OrderSuccess() {

    const { id } = useParams();

    const [q, setQ] = useState("");

    const steps = [

        { id: 1, label: "Cart" },

        { id: 2, label: "Checkout" },

        { id: 3, label: "Confirmation" },

    ];

    const activeStep = 3;



    return (

        <div

            className="min-h-screen bg-slate-50 text-slate-900"

            style={{ fontFamily: '"Ubuntu", "Segoe UI", sans-serif' }}

        >

            <Navbar q={q} setQ={setQ} cartCount={0} brand={{ name: "ShopEase", href: "/" }} />



            <main className="max-w-6xl mx-auto px-6 lg:px-8 py-12">
                <Breadcrumb />

                <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">

                    <div>

                        <h1 className="text-3xl font-extrabold tracking-tight">Confirmation</h1>

                        <p className="mt-1 text-sm text-slate-500">

                            Your order has been placed successfully.

                        </p>

                    </div>

                    <div className="flex items-center text-xs font-semibold text-slate-500">

                        {steps.map((step, index) => {

                            const isCompleted = step.id < activeStep;

                            const isActive = step.id === activeStep;

                            return (

                                <div key={step.id} className="flex items-center">

                                    <div className="flex items-center gap-2">

                                        <div

                                            className={`h-7 w-7 rounded-full border flex items-center justify-center ${

                                                isCompleted

                                                    ? "border-emerald-500 bg-emerald-500 text-white"

                                                    : isActive

                                                        ? "border-emerald-500 bg-emerald-500 text-white"

                                                        : "border-slate-300 bg-white text-slate-700"

                                            }`}

                                        >

                                            {isCompleted ? (
                        <svg
                          viewBox="0 0 20 20"
                          fill="none"
                          className="h-4 w-4"
                          aria-hidden="true"
                        >
                          <path
                            d="M5 10.5l3 3 7-7"
                            stroke="currentColor"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />
                        </svg>
                      ) : (
                        step.id
                      )}

                                        </div>

                                        <span className={isActive || isCompleted ? "text-emerald-700" : ""}>

                                            {step.label}

                                        </span>

                                    </div>

                                    {index < steps.length - 1 && (

                                        <span className="mx-4 h-px w-10 bg-slate-300" />

                                    )}

                                </div>

                            );

                        })}

                    </div>

                </div>



                <div className="mt-8 grid gap-6 lg:grid-cols-[1.2fr_0.8fr]">

                    <div className="rounded-3xl bg-white p-8 ring-1 ring-slate-100">

                        <div className="flex items-start gap-4">

                            <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-emerald-50 text-emerald-600 ring-1 ring-emerald-100">

                                <span className="text-xl font-extrabold"><svg viewBox="0 0 20 20" fill="none" className="h-6 w-6" aria-hidden="true">
  <path d="M5 10.5l3 3 7-7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
</svg></span>

                            </div>

                            <div>

                                <h2 className="text-2xl font-extrabold tracking-tight">Confirmation</h2>

                                <p className="mt-2 text-sm text-slate-600">

                                    We received your order{ id ? ` (Order #${id}).` : "."} A confirmation email

                                    will be sent shortly.

                                </p>

                            </div>

                        </div>



                        <div className="mt-6 grid gap-4 sm:grid-cols-2">

                            <div className="rounded-2xl border border-slate-100 bg-slate-50 p-4">

                                <div className="text-xs font-semibold text-slate-500">Next steps</div>

                                <ul className="mt-2 space-y-2 text-sm text-slate-700">

                                    <li>We are preparing your items for shipment.</li>

                                    <li>You will receive tracking details once shipped.</li>

                                    <li>Need help? Contact support from your account page.</li>

                                </ul>

                            </div>

                            <div className="rounded-2xl border border-slate-100 bg-slate-50 p-4">

                                <div className="text-xs font-semibold text-slate-500">Estimated delivery</div>

                                <div className="mt-2 text-sm font-semibold text-slate-800">3-5 business days</div>

                                <p className="mt-1 text-xs text-slate-500">

                                    Delivery time depends on your location and carrier availability.

                                </p>

                            </div>

                        </div>



                        <div className="mt-8 flex flex-wrap gap-3">

                            <Link

                                to="/products"

                                className="inline-flex rounded-xl bg-emerald-500 px-5 py-3 text-sm font-extrabold text-white hover:bg-emerald-600"

                            >

                                Continue shopping

                            </Link>

                            <Link

                                to="/orders"

                                className="inline-flex rounded-xl bg-slate-50 px-5 py-3 text-sm font-extrabold text-slate-900 ring-1 ring-slate-200 hover:bg-slate-100"

                            >

                                View orders

                            </Link>

                        </div>

                    </div>



                    <div className="h-fit rounded-3xl bg-white p-6 ring-1 ring-slate-100">

                        <div className="text-lg font-extrabold">Order details</div>

                        <div className="mt-4 space-y-3 text-sm">

                            <div className="flex items-center justify-between">

                                <span className="text-slate-500">Order ID</span>

                                <span className="font-semibold">{id ? `#${id}` : "Pending"}</span>

                            </div>

                            <div className="flex items-center justify-between">

                                <span className="text-slate-500">Status</span>

                                <span className="rounded-full bg-emerald-50 px-3 py-1 text-xs font-semibold text-emerald-700 ring-1 ring-emerald-100">

                                    Confirmed

                                </span>

                            </div>

                            <div className="flex items-center justify-between">

                                <span className="text-slate-500">Support</span>

                                <span className="font-semibold">24/7 Chat</span>

                            </div>

                        </div>



                        <div className="mt-6 rounded-2xl border border-slate-100 bg-slate-50 p-4 text-xs text-slate-500">

                            Keep your order number for reference. You can track your order from the Orders page.

                        </div>

                    </div>

                </div>

            </main>



            <Footer />

        </div>

    );

}

