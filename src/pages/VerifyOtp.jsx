import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import AuthSplitLayout from "../components/AuthSplitLayout";
import Button from "../components/Button";
import PinInput from "../components/PinInput";

const START_SECONDS = 90; 
const FALLBACK_PHONE = "+234 000 000 0000"; 

export default function VerifyOtp() {
  const navigate = useNavigate();
  const location = useLocation();
  const phone = location.state?.phone || FALLBACK_PHONE;
  const [code, setCode] = useState("");
  const [secondsLeft, setSecondsLeft] = useState(START_SECONDS);

 
  useEffect(() => {
    if (secondsLeft <= 0) return;
    const id = setTimeout(() => setSecondsLeft((s) => s - 1), 1000);
    return () => clearTimeout(id);
  }, [secondsLeft]);

  const minutes = String(Math.floor(secondsLeft / 60)).padStart(2, "0");
  const seconds = String(secondsLeft % 60).padStart(2, "0");

  const handleResend = () => {
    
    console.log("Resend code requested");
    setSecondsLeft(START_SECONDS);
  };

  const handleSubmit = () => {
    console.log("OTP submitted:", code);
    navigate("/setup-pin");
  };

  return (
    <AuthSplitLayout>
      <h1 className="text-3xl font-bold text-ink-900">Verify OTP</h1>
      <p className="mt-2 text-[15px] text-ink-500">
        Enter the 6-digit code sent to{" "}
        <span className="font-semibold text-brand-500">{phone}</span>
      </p>

      <div className="mt-10 flex flex-col items-center gap-6">
        <PinInput length={6} value={code} onChange={setCode} />

        <p className="text-center text-sm text-ink-500">
          Code expires in{" "}
          <span className="font-semibold text-ink-900">
            {minutes}:{seconds}
          </span>
          <br />
          Didn&apos;t receive code?{" "}
          <button
            type="button"
            onClick={handleResend}
            disabled={secondsLeft > 0}
            className="font-semibold text-brand-500 hover:underline disabled:cursor-not-allowed disabled:text-ink-300 disabled:no-underline"
          >
            Resend
          </button>
        </p>
      </div>

      <Button onClick={handleSubmit} disabled={code.length < 6} className="mt-10">
        Verify and Continue
      </Button>
    </AuthSplitLayout>
  );
}