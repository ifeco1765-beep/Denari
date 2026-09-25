import { useNavigate } from "react-router-dom";
import { Check } from "lucide-react";
import AuthSplitLayout from "../components/AuthSplitLayout";
import Button from "../components/Button";
import { useUser } from "../context/UserContext";
import { useNotifications } from "../context/NotificationsContext";

const NEXT_STEPS = [
  "Track your expenses",
  "Create a budget",
  "Set savings goal",
  "Achieve Financial freedom",
];

export default function OnboardingSuccess() {
  const navigate = useNavigate();
  const { user } = useUser();
  const { addNotification } = useNotifications();

  const handleGoToDashboard = () => {
    const firstName = user.fullName?.trim().split(" ")[0];
    addNotification({
      title: "Welcome to DENARI!",
      body: firstName
        ? `You're all set, ${firstName}. Start by adding your first expense or creating a budget.`
        : "You're all set. Start by adding your first expense or creating a budget.",
      category: "Account",
      iconKey: "sparkles",
    });
    navigate("/dashboard");
  };

  return (
    <AuthSplitLayout>
      <h1 className="text-2xl font-bold text-ink-900">Welcome to DENARI</h1>
      <p className="mt-1 text-[15px] text-ink-500">
        Your account has been created succesfully.
      </p>

      <div className="mt-8 rounded-2xl bg-[#FDF1E6] p-6">
        <p className="text-base font-bold text-ink-900">What&apos;s next?</p>
        <ul className="mt-5 flex flex-col gap-4">
          {NEXT_STEPS.map((step) => (
            <li key={step} className="flex items-center gap-3">
              <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-[#EF4B36]">
                <Check size={14} strokeWidth={3} className="text-white" />
              </span>
              <span className="text-sm text-ink-900">{step}</span>
            </li>
          ))}
        </ul>
      </div>

      <Button onClick={handleGoToDashboard} className="mt-8">
        Go to Dashboard
      </Button>
    </AuthSplitLayout>
  );
}