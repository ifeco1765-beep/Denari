import Logo from "./Logo";

export default function LoadingScreen() {
  return (
    <div className="flex h-dvh w-full flex-col items-center justify-center gap-6 bg-white">
      <Logo size="text-2xl" />
      <div
        className="h-8 w-8 animate-spin rounded-full border-[3px] border-brand-100 border-t-brand-500"
        role="status"
        aria-label="Loading"
      />
    </div>
  );
}