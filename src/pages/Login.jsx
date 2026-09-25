import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { getAdditionalUserInfo } from "firebase/auth";
import AuthSplitLayout from "../components/AuthSplitLayout";
import Input from "../components/Input";
import Button from "../components/Button";
import SocialAuthRow from "../components/SocialAuthRow";
import LoadingScreen from "../components/LoadingScreen";
import { useAuth } from "../context/AuthContext";
import { useUser } from "../context/UserContext";

const ERROR_MESSAGES = {
  "auth/invalid-credential": "Incorrect email or password.",
  "auth/user-not-found": "No account found with that email.",
  "auth/wrong-password": "Incorrect email or password.",
  "auth/too-many-requests": "Too many attempts. Please wait a moment and try again.",
};


const TRANSITION_MS = 900;


export default function Login() {
  const navigate = useNavigate();
  const { logIn, signInWithGoogle } = useAuth();
  const { updateUser } = useUser();
  const [formData, setFormData] = useState({ identifier: "", password: "" });
  const [error, setError] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [googleLoading, setGoogleLoading] = useState(false);
  const [transitioning, setTransitioning] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const goToDashboard = () => {
    setTransitioning(true);
    setTimeout(() => navigate("/dashboard"), TRANSITION_MS);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    if (!formData.identifier.includes("@")) {
      setError("Please log in with your email address for now — phone login isn't set up yet.");
      return;
    }

    setSubmitting(true);
    try {
      await logIn(formData.identifier, formData.password);
      goToDashboard();
    } catch (err) {
      setError(ERROR_MESSAGES[err.code] || "Something went wrong logging in. Please try again.");
      setSubmitting(false);
    }
  };

  const handleGoogleClick = async () => {
    setError("");
    setGoogleLoading(true);
    try {
      const result = await signInWithGoogle();
      const { isNewUser } = getAdditionalUserInfo(result) || {};

      updateUser({
  fullName: result.user.displayName || "",
  email: result.user.email || "",
  avatar: result.user.photoURL || null,
});

if (isNewUser) {
  navigate("/choose-currency");
} else {
  goToDashboard();
}
    } catch (err) {
      if (err.code !== "auth/popup-closed-by-user") {
        setError("Google sign-in didn't go through. Please try again.");
      }
    } finally {
      setGoogleLoading(false);
    }
  };

  if (transitioning) {
    return <LoadingScreen />;
  }

  return (
    <AuthSplitLayout>
      <h1 className="text-3xl font-bold text-ink-900">Log In</h1>
      <p className="mt-2 text-[15px] text-ink-500">
        Welcome back! Please log in to continue
      </p>

      <form onSubmit={handleSubmit} className="mt-8 flex flex-col gap-5">
        <Input
          label="Email or Phone number"
          name="identifier"
          placeholder="Enter Email or phone number"
          value={formData.identifier}
          onChange={handleChange}
          required
        />

        <div>
          <Input
            label="Password"
            name="password"
            isPassword
            placeholder="Enter password"
            value={formData.password}
            onChange={handleChange}
            required
          />
          <div className="mt-2 text-right">
            <button
              type="button"
              onClick={() => navigate("/forgot-password")}
              className="text-sm font-semibold text-brand-500 hover:underline"
            >
              Forgot password?
            </button>
          </div>
        </div>

        {error && <p className="text-sm font-medium text-red-600">{error}</p>}

        <Button type="submit" className="mt-1" disabled={submitting}>
          {submitting ? "Logging in…" : "Get Started"}
        </Button>
      </form>

      <SocialAuthRow
        label="or continue with"
        onGoogleClick={handleGoogleClick}
        googleLoading={googleLoading}
      />

      <p className="mt-6 text-center text-sm text-ink-500">
        don&apos;t have an account?{" "}
        <button
          onClick={() => navigate("/signup")}
          className="font-semibold text-brand-500 hover:underline"
        >
          Sign up
        </button>
      </p>
    </AuthSplitLayout>
  );
}