import { useNavigate } from "react-router-dom";
import Logo from "../components/Logo";
import Button from "../components/Button";


export default function Welcome() {
  const navigate = useNavigate();

  return (
    <div className="flex h-full min-h-screen w-full flex-col justify-between bg-white px-6 pb-10 pt-20">
      <div className="flex flex-1 flex-col items-center justify-center gap-4 text-center">
        <h1 className="text-2xl leading-snug">
          Welcome to
          <br />
          <Logo variant="dark" size="text-2xl" />
        </h1>
        <p className="max-w-[240px] text-[15px] text-ink-500">
          Your personal finance companion
        </p>
      </div>

      <div className="flex flex-col items-center gap-4">
        <Button onClick={() => navigate("/signup")}>Get Started</Button>
        <p className="text-sm text-ink-500">
          Already have an account?{" "}
          <button
            onClick={() => navigate("/login")}
            className="font-semibold text-brand-500 hover:underline"
          >
            Log in
          </button>
        </p>
      </div>
    </div>
  );
}
