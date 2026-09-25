import { useState } from "react";
import { useNavigate } from "react-router-dom";
import AuthSplitLayout from "../components/AuthSplitLayout";
import Input from "../components/Input";
import Button from "../components/Button";
import { useAuth } from "../context/AuthContext";


export default function ForgotPassword() {
  const navigate = useNavigate();
  const { resetPassword } = useAuth();
  const [identifier, setIdentifier] = useState("");
  const [error, setError] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [sent, setSent] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    if (!identifier.includes("@")) {
      setError("Please enter your email address — phone reset isn't set up yet.");
      return;
    }

    setSubmitting(true);
    try {
      await resetPassword(identifier);
      setSent(true);
    } catch (err) {
      setError(
        err.code === "auth/invalid-email"
          ? "That email address doesn't look right."
          : "Something went wrong. Please try again."
      );
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <AuthSplitLayout>
      <h1 className="text-3xl font-bold text-ink-900">Forgot Password</h1>
      <p className="mt-2 text-[15px] text-ink-500">
        No worries! Enter your email or phone number and we&apos;ll send you a reset link
      </p>

      <form onSubmit={handleSubmit} className="mt-8 flex flex-col gap-5">
        <Input
          label="Email or Phone number"
          placeholder="Enter Email or phone number"
          value={identifier}
          onChange={(e) => setIdentifier(e.target.value)}
          required
          disabled={sent}
        />

        {/* Envelope illustration, matching the reset-link screen */}
        <div className="flex items-center justify-center py-6" aria-hidden="true">
          <svg width="110" height="88" viewBox="0 0 110 88" fill="none">
            <path
              d="M18 20C18 15.58 21.58 12 26 12H84C88.42 12 92 15.58 92 20V70C92 74.42 88.42 78 84 78H26C21.58 78 18 74.42 18 70V20Z"
              fill="#F0576B"
            />
            <path d="M18 20L55 48L92 20" stroke="#fff" strokeWidth="3" strokeLinejoin="round" />
            <rect x="38" y="26" width="34" height="24" rx="2" fill="#fff" />
            <rect x="43" y="32" width="24" height="2.5" rx="1.25" fill="#6B6C77" />
            <rect x="43" y="38" width="24" height="2.5" rx="1.25" fill="#6B6C77" />
            <rect x="43" y="44" width="14" height="2.5" rx="1.25" fill="#F0576B" />
          </svg>
        </div>

        {error && <p className="text-sm font-medium text-red-600">{error}</p>}
        {sent && (
          <p className="text-sm font-medium text-emerald-600">
            Check your inbox — if an account exists for that email, a reset link is on its way.
          </p>
        )}

        <Button type="submit" disabled={submitting || sent}>
          {submitting ? "Sending…" : sent ? "Link sent" : "Send Reset Link"}
        </Button>
      </form>

      <button
        onClick={() => navigate("/login")}
        className="mt-4 text-center text-sm font-semibold text-brand-500 hover:underline"
      >
        Back to Log in
      </button>
    </AuthSplitLayout>
  );
}