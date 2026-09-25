import { useState } from "react";
import { useNavigate } from "react-router-dom";
import AuthSplitLayout from "../components/AuthSplitLayout";
import Button from "../components/Button";
import PinInput from "../components/PinInput";

export default function SetupPin() {
  const navigate = useNavigate();
  const [pin, setPin] = useState("");

  const handleSubmit = () => {
    console.log("PIN set:", pin);
    navigate("/enter-pin");
  };

  return (
    <AuthSplitLayout>
      <h1 className="text-3xl font-bold text-ink-900">Set up pin</h1>
      <p className="mt-2 text-[15px] text-ink-500">
        Create a 4-digit pin to secure your account.
      </p>

      <div className="mt-12 flex justify-center">
        <PinInput length={4} masked value={pin} onChange={setPin} />
      </div>

      <Button onClick={handleSubmit} disabled={pin.length < 4} className="mt-12">
        Continue
      </Button>
    </AuthSplitLayout>
  );
}
