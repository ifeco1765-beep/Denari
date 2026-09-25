
export default function ConfirmModal({
  title,
  message,
  confirmLabel,
  cancelLabel = "Cancel",
  onConfirm,
  onCancel,
}) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-ink-900/40 px-6">
      <div className="w-full max-w-sm rounded-2xl bg-white p-8 text-center shadow-2xl">
        <h2 className="text-lg font-extrabold uppercase tracking-wide text-red-600">
          {title}
        </h2>
        <p className="mt-3 text-[15px] text-ink-900">{message}</p>
        <div className="mt-6 flex gap-3">
          <button
            type="button"
            onClick={onCancel}
            className="h-11 flex-1 rounded-xl bg-emerald-600 font-semibold text-white hover:bg-emerald-700"
          >
            {cancelLabel}
          </button>
          <button
            type="button"
            onClick={onConfirm}
            className="h-11 flex-1 rounded-xl bg-red-600 font-semibold text-white hover:bg-red-700"
          >
            {confirmLabel}
          </button>
        </div>
      </div>
    </div>
  );
}
