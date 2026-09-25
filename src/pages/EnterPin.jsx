import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Logo from "../components/Logo";
import Button from "../components/Button";
import PinInput from "../components/PinInput";


export default function EnterPin() {
  const navigate = useNavigate();
  const [pin, setPin] = useState("");

  const handleSubmit = () => {
    console.log("PIN entered:", pin);
    navigate("/choose-currency");
  };

  return (
    <div className="flex min-h-screen w-full flex-col items-center justify-center gap-10 bg-brand-500 px-6 py-16">
      <Logo variant="light" withMark size="text-3xl" />

      <div className="flex flex-col items-center gap-6">
        <p className="text-base font-medium text-white">Enter your 4-digit PIN</p>
        <PinInput length={4} masked shape="dot" value={pin} onChange={setPin} />
      </div>

      <Button
        variant="secondary"
        onClick={handleSubmit}
        disabled={pin.length < 4}
        className="max-w-xs"
      >
        Get Started
      </Button>
    </div>
  );
}
