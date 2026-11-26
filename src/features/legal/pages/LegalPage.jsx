import { useLoaderData } from 'react-router-dom';
import { SUPPORT_EMAIL } from '../../../shared/config';
import SectionTitle from '../../landing/components/SectionTitle';

// Replace the placeholder text with your real legal copy (or load it from the backend).
const pages = {
  'privacy-policy': { title: 'Privacy Policy', body: ['What we collect: your Telegram ID, game ID and payment details needed to run tournaments.', 'How we use it: to verify players, process payouts and prevent fraud.', 'Your rights: you can request data deletion by contacting support.'] },
  'terms-and-conditions': { title: 'Terms and Conditions', body: ['You must be 18 or older and eligible under your state laws.', 'Entry fees and prizes are defined per match.', 'We may suspend accounts that break these terms.'] },
  'fair-play-policy': { title: 'Fair Play Policy', body: ['Hacks, banned emulators, teaming and match fixing are not allowed.', 'Violations lead to disqualification, forfeited winnings and a permanent ban.'] },
  'refund-and-cancellation': { title: 'Refund and Cancellation', body: ['If we cancel a match, entry fees return to your wallet.', 'Entry fees are not refundable after a match has started.'] },
  'contact-us': { title: 'Contact Us', body: [`Email us at ${SUPPORT_EMAIL} or message our Telegram bot for help with matches, wallet and payouts.`] },
};

export function legalLoader({ params }) {
  const page = pages[params.slug];
  if (!page) throw new Response('Not found', { status: 404 });
  return page;
}

export default function LegalPage() {
  const { title, body } = useLoaderData();
  return (
    <article className="mx-auto max-w-3xl px-5 py-20">
      <SectionTitle>{title}</SectionTitle>
      <div className="mt-8 space-y-5 text-lg leading-relaxed text-mute">
        {body.map((p) => <p key={p}>{p}</p>)}
      </div>
    </article>
  );
}
