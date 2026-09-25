import { useState } from "react";
import { useNavigate } from "react-router-dom";
import AuthSplitLayout from "../components/AuthSplitLayout";
import Button from "../components/Button";
import CurrencyOption from "../components/CurrencyOption";
import Flag from "../components/Flag";
import { useUser } from "../context/UserContext";
import { CURRENCIES } from "../utilities/currency";

export default function ChooseCurrency() {
  const navigate = useNavigate();
  const { user, updateUser } = useUser();
  const [selected, setSelected] = useState(user.currency || "NGN");

  const handleSubmit = () => {
    updateUser({ currency: selected });
    console.log("Selected currency:", selected);
    navigate("/about-you");
  };

  return (
    <AuthSplitLayout>
      <h1 className="text-3xl font-bold text-ink-900">Choose currency</h1>
      <p className="mt-2 text-[15px] text-ink-500">
        Select your preferred currency to get started
      </p>

      <div className="mt-8 flex flex-col gap-3">
        {CURRENCIES.map((c) => (
          <CurrencyOption
            key={c.code}
            flag={<Flag code={c.flagCode} />}
            name={c.name}
            subtitle={`${c.symbol} (${c.code})`}
            selected={selected === c.code}
            onSelect={() => setSelected(c.code)}
          />
        ))}
      </div>

      <Button onClick={handleSubmit} className="mt-8">
        Continue
      </Button>
    </AuthSplitLayout>
  );
}