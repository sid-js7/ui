export default function SectionTitle({ children, sub }) {
  return (
    <div>
      <h2 className="flex items-center gap-4 text-5xl font-bold leading-none text-ink sm:text-6xl">
        <span className="h-10 w-3 -skew-x-12 bg-accent" />
        {children}
      </h2>
      {sub && <p className="mt-3 max-w-xl text-mute">{sub}</p>}
    </div>
  );
}
