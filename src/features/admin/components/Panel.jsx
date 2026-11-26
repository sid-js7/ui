// Dashboard box: fixed header, scrollable body. Page itself never scrolls on desktop.
export default function Panel({ title, right, className = '', delay = 0, children }) {
  return (
    <section className={`hud flex max-h-[26rem] min-h-0 animate-fade flex-col border border-line bg-panel lg:max-h-none ${className}`}
             style={{ animationDelay: `${delay}ms` }}>
      <header className="flex shrink-0 items-center justify-between gap-3 border-b border-line px-4 py-2">
        <h2 className="font-display text-xl font-semibold uppercase tracking-wider text-ink">{title}</h2>
        {right}
      </header>
      <div className="thin-scroll min-h-0 flex-1 overflow-y-auto p-4">{children}</div>
    </section>
  );
}
