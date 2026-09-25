import { Settings as SettingsIcon, User, LogOut, X } from "lucide-react";



const OPTIONS = [
  { action: "settings", label: "Settings", icon: SettingsIcon },
  { action: "profile", label: "Profile", icon: User },
  { action: "logout", label: "Log out", icon: LogOut, danger: true },
];

export default function MoreSheet({ onClose, onSelect }) {
  return (
    <div
      className="fixed inset-0 z-50 flex items-end justify-center bg-black/40 sm:items-center"
      onClick={onClose}
    >
      <div
        className="w-full max-w-xl rounded-t-2xl bg-white p-4 pb-6 sm:max-w-sm sm:rounded-2xl sm:pb-4"
        onClick={(e) => e.stopPropagation()}
      >

        <div className="flex flex-col gap-2">
          {OPTIONS.map(({ action, label, icon: Icon, danger }) => (
            <button
              key={action}
              type="button"
              onClick={() => onSelect(action)}
              className={`flex items-center gap-3 rounded-xl border border-ink-100 px-4 py-3 text-left ${
                danger ? "text-red-600" : "text-ink-900"
              }`}
            >
              <Icon size={17} />
              <span className="text-sm font-medium">{label}</span>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}