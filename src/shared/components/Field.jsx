// Labelled input in the site's style. `right` renders an element inside the field (e.g. show/hide button).
export default function Field({ label, id, right, ...props }) {
  return (
    <div>
      <label htmlFor={id} className="font-display text-xl uppercase tracking-wide text-ink">{label}</label>
      <div className="relative mt-1">
        <input id={id} {...props}
               className="w-full border border-line bg-bg px-4 py-3 text-ink placeholder:text-mute focus:border-accent focus:outline-none" />
        {right && <div className="absolute inset-y-0 right-3 flex items-center">{right}</div>}
      </div>
    </div>
  );
}
