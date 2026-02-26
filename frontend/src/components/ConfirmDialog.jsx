import { FiAlertTriangle } from "react-icons/fi";

export default function ConfirmDialog({
  open,
  title = "Confirm action",
  description = "",
  error = "",
  confirmText = "Confirm",
  cancelText = "Cancel",
  onConfirm,
  onClose,
  loading = false,
  danger = true,
}) {
  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50">
      <div className="absolute inset-0 bg-black/40" onClick={onClose} />
      <div className="absolute inset-0 flex items-center justify-center p-4">
        <div className="w-full max-w-md overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-xl">
          <div className="flex items-center gap-3 border-b border-slate-200 px-6 py-4">
            <div
              className={[
                "flex h-10 w-10 items-center justify-center rounded-xl",
                danger ? "bg-rose-50 text-rose-600" : "bg-emerald-50 text-emerald-600",
              ].join(" ")}
            >
              <FiAlertTriangle />
            </div>
            <div>
              <p className="text-xs text-slate-500">Please confirm</p>
              <h3 className="text-lg font-extrabold text-slate-900">{title}</h3>
            </div>
          </div>

          <div className="px-6 py-4 text-sm text-slate-600">
            {description}
            {error ? (
              <div className="mt-3 rounded-xl border border-rose-200 bg-rose-50 px-3 py-2 text-xs font-semibold text-rose-700">
                {error}
              </div>
            ) : null}
          </div>

          <div className="flex items-center justify-end gap-3 border-t border-slate-200 px-6 py-4">
            <button
              onClick={onClose}
              disabled={loading}
              className="rounded-xl border border-slate-200 px-4 py-2 text-sm font-bold text-slate-700 hover:bg-slate-50 disabled:opacity-60"
            >
              {cancelText}
            </button>
            <button
              onClick={onConfirm}
              disabled={loading}
              className={[
                "rounded-xl px-4 py-2 text-sm font-bold text-white disabled:opacity-60",
                danger ? "bg-rose-600 hover:bg-rose-700" : "bg-emerald-600 hover:bg-emerald-700",
              ].join(" ")}
            >
              {loading ? "Working..." : confirmText}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
