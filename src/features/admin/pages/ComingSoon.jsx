import { useParams } from 'react-router-dom';

export default function ComingSoon() {
  const section = useParams()['*'];
  return (
    <div className="grid h-full min-h-64 place-items-center text-center">
      <div>
        <h2 className="text-7xl font-bold capitalize leading-none text-ink">{section}</h2>
        <p className="mt-3 text-mute">This section is coming next.</p>
      </div>
    </div>
  );
}
