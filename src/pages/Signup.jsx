import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { getAdditionalUserInfo } from "firebase/auth";
import AuthSplitLayout from "../components/AuthSplitLayout";
import Input from "../components/Input";
import Button from "../components/Button";
import SocialAuthRow from "../components/SocialAuthRow";
import { useUser } from "../context/UserContext";
import { useAuth } from "../context/AuthContext";


const ERROR_MESSAGES = {
  "auth/email-already-in-use": "An account with this email already exists.",
  "auth/invalid-email": "That email address doesn't look right.",
  "auth/weak-password": "Password should be at least 6 characters.",
};


export default function Signup() {
  const navigate = useNavigate();
  const { updateUser } = useUser();
  const { signUp, signInWithGoogle } = useAuth();
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phone: "",
    password: "",
    confirmPassword: "",
  });
  const [error, setError] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [googleLoading, setGoogleLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleNext = (e) => {
    e.preventDefault();
    setStep(2);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    if (formData.password !== formData.confirmPassword) {
      setError("Passwords don't match.");
      return;
    }

    setSubmitting(true);
    try {
      
      await signUp(formData.email, formData.password, formData.fullName);

      
      updateUser({
        fullName: formData.fullName,
        email: formData.email,
        phone: formData.phone,
      });
      navigate("/verify-otp", { state: { phone: formData.phone } });
    } catch (err) {
      setError(ERROR_MESSAGES[err.code] || "Something went wrong creating your account. Please try again.");
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

      
      navigate(isNewUser ? "/choose-currency" : "/dashboard");
    } catch (err) {
      if (err.code !== "auth/popup-closed-by-user") {
        setError("Google sign-in didn't go through. Please try again.");
      }
    } finally {
      setGoogleLoading(false);
    }
  };

  return (
    <AuthSplitLayout>
      <h1 className="text-3xl font-bold text-ink-900">Sign up</h1>

      {step === 1 ? (
        <form onSubmit={handleNext} className="mt-8 flex flex-col gap-5">
          <Input
            label="Full Name"
            name="fullName"
            placeholder="Enter your full name"
            value={formData.fullName}
            onChange={handleChange}
            required
          />
          <Input
            label="Email"
            name="email"
            type="email"
            placeholder="Enter your Email address"
            value={formData.email}
            onChange={handleChange}
            required
          />
          <Input
            label="Phone number"
            name="phone"
            type="tel"
            placeholder="Enter your phone number"
            value={formData.phone}
            onChange={handleChange}
            required
          />
          <Button type="submit" className="mt-3">
            Next
          </Button>

          {error && <p className="mt-3 text-sm font-medium text-red-600">{error}</p>}
          <SocialAuthRow
            label="or sign up with"
            onGoogleClick={handleGoogleClick}
            googleLoading={googleLoading}
          />

          <p className="text-center text-sm text-ink-500">
            Already have an account?{" "}
            <button
              type="button"
              onClick={() => navigate("/login")}
              className="font-semibold text-brand-500 hover:underline"
            >
              Log in
            </button>
          </p>
        </form>
      ) : (
        <form onSubmit={handleSubmit} className="mt-8 flex flex-col gap-5">
          <Input
            label="password"
            name="password"
            isPassword
            placeholder="Create a password"
            value={formData.password}
            onChange={handleChange}
            required
            minLength={6}
          />
          <Input
            label="confirm password"
            name="confirmPassword"
            isPassword
            placeholder="Confirm password"
            value={formData.confirmPassword}
            onChange={handleChange}
            required
          />

          {error && <p className="text-sm font-medium text-red-600">{error}</p>}

          <Button type="submit" className="mt-3" disabled={submitting}>
            {submitting ? "Creating account…" : "Get Started"}
          </Button>
          <p className="text-center text-sm text-ink-500">
            Already have an account?{" "}
            <button
              type="button"
              onClick={() => navigate("/login")}
              className="font-semibold text-brand-500 hover:underline"
            >
              Log in
            </button>
          </p>
        </form>
      )}
    </AuthSplitLayout>
  );
}