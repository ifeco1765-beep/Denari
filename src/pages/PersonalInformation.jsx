// src/pages/PersonalInformation.jsx — full file, replaces the earlier read-only version

import { useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { ChevronLeft, User, Mail, Phone, Cake, Briefcase, Camera, Pencil, Check, X } from "lucide-react";
import DashboardShell from "../components/DashboardShell";
import { useUser } from "../context/UserContext";
import { resizeImage } from "../utilities/image";

const FIELDS = [
  { key: "fullName", label: "Full name", icon: User, editable: true },
  { key: "email", label: "Email", icon: Mail, editable: false }, // owned by Firebase Auth
  { key: "phone", label: "Phone", icon: Phone, editable: true },
  { key: "dob", label: "Date of birth", icon: Cake, editable: true },
  { key: "occupation", label: "Occupation", icon: Briefcase, editable: true },
];

export default function PersonalInformation() {
  const navigate = useNavigate();
  const { user, loaded, updateUser, updateAvatarLocal, isGoogleUser } = useUser();
  const fileInputRef = useRef(null);
  const [editingKey, setEditingKey] = useState(null);
  const [draftValue, setDraftValue] = useState("");

  const startEdit = (key) => {
    setEditingKey(key);
    setDraftValue(user[key] || "");
  };

  const saveEdit = async () => {
    await updateUser({ [editingKey]: draftValue });
    setEditingKey(null);
  };

  const handleAvatarPick = async (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    try {
      const dataUrl = await resizeImage(file);
      updateAvatarLocal(dataUrl);
    } catch (err) {
      console.error("Failed to process image:", err);
    }
    e.target.value = ""; 
  };

  return (
    <DashboardShell>
      <div className="mx-auto max-w-xl">
        <div className="flex items-center gap-3">
          <button type="button" onClick={() => navigate(-1)} aria-label="Back">
            <ChevronLeft size={19} className="text-ink-900" />
          </button>
          <h1 className="text-xl font-bold text-ink-900">Personal Information</h1>
        </div>

        <div className="mt-6 flex flex-col items-center">
          <div className="relative">
            <span className="flex h-20 w-20 items-center justify-center overflow-hidden rounded-full border-2 border-ink-900">
              {user.avatar ? (
                <img src={user.avatar} alt="" className="h-full w-full object-cover" />
              ) : (
                <User size={34} className="text-ink-900" />
              )}
            </span>

            {!isGoogleUser && (
              <>
                <button
                  type="button"
                  onClick={() => fileInputRef.current?.click()}
                  aria-label="Change profile picture"
                  className="absolute -bottom-1 -right-1 flex h-7 w-7 items-center justify-center rounded-full bg-brand-500 text-white ring-2 ring-white"
                >
                  <Camera size={13} />
                </button>
                <input
                  ref={fileInputRef}
                  type="file"
                  accept="image/*"
                  onChange={handleAvatarPick}
                  className="hidden"
                />
              </>
            )}
          </div>
          {isGoogleUser && (
            <p className="mt-2 text-xs text-ink-400">Synced from your Google account</p>
          )}
        </div>

        <div className="mt-8 flex flex-col gap-3">
          {!loaded ? (
            FIELDS.map(({ key }) => (
              <div key={key} className="h-[60px] animate-pulse rounded-xl border border-ink-100 bg-ink-50" />
            ))
          ) : (
            FIELDS.map(({ key, label, icon: Icon, editable }) => {
              const isEditing = editingKey === key;
              return (
                <div
                  key={key}
                  className="flex items-center gap-3 rounded-xl border border-ink-100 bg-white px-4 py-3"
                >
                  <Icon size={17} className="text-ink-700" />
                  <span className="flex flex-1 flex-col">
                    <span className="text-xs text-ink-500">{label}</span>
                    {isEditing ? (
                      <input
                        autoFocus
                        value={draftValue}
                        onChange={(e) => setDraftValue(e.target.value)}
                        className="mt-0.5 border-b border-ink-200 text-sm font-medium text-ink-900 outline-none"
                      />
                    ) : (
                      <span className="text-sm font-medium text-ink-900">
                        {user[key] || "Not set"}
                      </span>
                    )}
                  </span>

                  {editable &&
                    (isEditing ? (
                      <span className="flex items-center gap-2">
                        <button type="button" onClick={saveEdit} aria-label="Save">
                          <Check size={16} className="text-green-600" />
                        </button>
                        <button type="button" onClick={() => setEditingKey(null)} aria-label="Cancel">
                          <X size={16} className="text-ink-400" />
                        </button>
                      </span>
                    ) : (
                      <button type="button" onClick={() => startEdit(key)} aria-label={`Edit ${label}`}>
                        <Pencil size={15} className="text-ink-400" />
                      </button>
                    ))}
                </div>
              );
            })
          )}
        </div>
      </div>
    </DashboardShell>
  );
}