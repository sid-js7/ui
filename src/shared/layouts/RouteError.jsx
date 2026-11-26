import { Link, useRouteError } from 'react-router-dom';

export default function RouteError() {
  const err = useRouteError();
  return (
    <div className="grid min-h-screen place-items-center bg-bg px-6 text-center">
      <div>
        <p className="font-display text-9xl font-bold leading-none text-accent">{err?.status || 'Oops'}</p>
        <p className="mt-3 text-mute">This page is not on the map.</p>
        <Link to="/" className="cut mt-6 inline-block bg-accent px-8 py-3 font-display text-xl font-semibold uppercase text-white">Back to home</Link>
      </div>
    </div>
  );
}
