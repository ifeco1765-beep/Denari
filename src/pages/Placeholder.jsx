export default function Placeholder({ name }) {
  return (
    <div className="flex min-h-screen w-full flex-col items-center justify-center gap-2 px-6 text-center">
      <h1 className="text-xl font-bold">{name}</h1>
      <p className="text-sm text-ink-500">
        Denari
      </p>
    </div>
  );
}
