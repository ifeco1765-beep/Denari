import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Logo from "../components/Logo";


export default function Splash() {
  const navigate = useNavigate();

  
  useEffect(() => {
    const timer = setTimeout(() => navigate("/welcome"), 2000);
    return () => clearTimeout(timer);
  }, [navigate]);

  return (
    <div className="flex h-full min-h-screen w-full flex-col items-center justify-end bg-brand-500 pb-20 pt-24">
      <div className="flex flex-1 flex-col items-center justify-center">
        <Logo variant="light" withMark size="text-3xl" />
      </div>
      <p className="text-center font-display text-base font-medium leading-snug text-white">
        Take control of your money
        <br />
        build your tomorrow
      </p>
    </div>
  );
}
