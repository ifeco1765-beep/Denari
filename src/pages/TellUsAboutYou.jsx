import { useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { User, Camera } from "lucide-react";
import AuthSplitLayout from "../components/AuthSplitLayout";
import Input from "../components/Input";
import Button from "../components/Button";
import { useUser } from "../context/UserContext";


export default function TellUsAboutYou() {
  const navigate = useNavigate();
  const { user, updateUser } = useUser();
  const fileRef = useRef(null);
  const [avatar, setAvatar] = useState(user.avatar);
  const [formData, setFormData] = useState({
    fullName: user.fullName,
    dob: user.dob,
    occupation: user.occupation,
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleAvatarChange = (e) => {
    const file = e.target.files?.[0];
    if (file) setAvatar(URL.createObjectURL(file));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    updateUser({ ...formData, avatar });
    console.log("Profile data:", formData);
    navigate("/onboarding-success");
  };

  return (
    <AuthSplitLayout>
      <div className="flex items-start justify-between">
        <div>
          <h1 className="text-2xl font-bold text-ink-900 sm:text-3xl">Tell us about you</h1>
          <p className="mt-1.5 text-[15px] text-ink-500">
            This helps us personalize your experience
          </p>
        </div>

        <button
          type="button"
          onClick={() => fileRef.current?.click()}
          className="relative flex h-14 w-14 shrink-0 items-center justify-center rounded-full bg-brand-500"
          aria-label="Upload profile photo"
        >
          {avatar ? (
            <img src={avatar} alt="" className="h-full w-full rounded-full object-cover" />
          ) : (
            <User size={26} className="text-ink-900" />
          )}
          <span className="absolute -bottom-1 -right-1 flex h-6 w-6 items-center justify-center rounded-full bg-white shadow">
            <Camera size={12} className="text-ink-700" />
          </span>
        </button>
        <input
          ref={fileRef}
          type="file"
          accept="image/*"
          className="hidden"
          onChange={handleAvatarChange}
        />
      </div>

      <form onSubmit={handleSubmit} className="mt-6 flex flex-col gap-4">
        <Input
          label="Full Name"
          name="fullName"
          placeholder="Enter your full name"
          value={formData.fullName}
          onChange={handleChange}
          required
        />
        <Input
          label="Date of Birth"
          name="dob"
          type="date"
          placeholder="Select your date of birth"
          value={formData.dob}
          onChange={handleChange}
          required
        />
        <Input
          label="Occupation"
          name="occupation"
          placeholder="Enter your occupation"
          value={formData.occupation}
          onChange={handleChange}
          required
        />
        <Button type="submit" className="mt-1">
          Continue
        </Button>
      </form>
    </AuthSplitLayout>
  );
}