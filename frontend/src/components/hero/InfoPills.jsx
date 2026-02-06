const pills = [
  { title: "Free Shipping", desc: "On orders over $50" },
  { title: "Official Warranty", desc: "1 year protection" },
  { title: "Tech Support", desc: "Expert assistance" },
  { title: "Easy Returns", desc: "30-day guarantee" },
];

function IconPill({ title, desc }) {
  return (
    <div className="flex items-center gap-3 rounded-2xl bg-white px-4 py-3 shadow-sm ring-1 ring-slate-100">
      <div className="h-9 w-9 rounded-xl bg-emerald-50 ring-1 ring-emerald-100" />
      <div className="leading-tight">
        <div className="text-sm font-semibold text-slate-900">{title}</div>
        <div className="text-xs text-slate-500">{desc}</div>
      </div>
    </div>
  );
}

export default function InfoPills() {
  return (
    <div className="mt-6 grid gap-3 md:grid-cols-4">
      {pills.map((pill) => (
        <IconPill key={pill.title} title={pill.title} desc={pill.desc} />
      ))}
    </div>
  );
}
