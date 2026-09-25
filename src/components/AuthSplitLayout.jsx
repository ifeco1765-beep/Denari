import HeroPanel from "./HeroPanel";

export default function AuthSplitLayout({ children }) {
  return (
    <div className="flex h-dvh w-full bg-white">
      <div className="flex w-full flex-col justify-center overflow-y-auto px-6 py-6 sm:px-12 sm:py-8 md:px-16 lg:w-[46%] lg:px-20">
        <div className="mx-auto w-full max-w-md">{children}</div>
      </div>
      <div className="hidden flex-1 lg:block">
        <HeroPanel />
      </div>
    </div>
  );
}