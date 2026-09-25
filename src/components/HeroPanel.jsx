import heroPhoto from "../assets/hero-branch.jpg";

export default function HeroPanel() {
  return (
    <div className="hidden h-full w-full lg:block">
      <img
        src={heroPhoto}
        alt=""
        aria-hidden="true"
        className="h-full w-full object-cover"
      />
    </div>
  );
}
