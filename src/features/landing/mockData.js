// Fallback data until the backend endpoint is wired. Adding a game = adding an item here (or in the API response).
const min = (m) => new Date(Date.now() + m * 60000).toISOString();

export const mockLanding = {
  stats: [
    { label: 'Paid to players', value: '₹48L+' },
    { label: 'Matches hosted', value: '12,400' },
    { label: 'Active players', value: '85K' },
  ],
  games: [
    { id: 'bgmi', name: 'BGMI', genre: 'Battle royale', modes: 'Solo, Duo, Squad', from: '#c2410c', to: '#ef4444', status: 'live' },
    { id: 'freefire', name: 'Free Fire', genre: 'Battle royale', modes: 'Solo, Duo, Squad, Clash', from: '#9f1239', to: '#ec4899', status: 'live' },
    { id: 'next', name: 'Next game', genre: 'Coming soon', modes: 'Tell us what you play', from: '#6366f1', to: '#2de2c4', status: 'soon' },
  ],
  winners: [
    { id: 1, player: 'Rudra_X', game: 'BGMI', amount: 5000, time: '4 min ago' },
    { id: 2, player: 'Sniper_Aarav', game: 'Free Fire', amount: 2500, time: '12 min ago' },
    { id: 3, player: 'NightWolf07', game: 'BGMI', amount: 10000, time: '31 min ago' },
    { id: 4, player: 'Kaal_Op', game: 'Free Fire', amount: 1200, time: '1 hr ago' },
    { id: 5, player: 'Zoya.gg', game: 'BGMI', amount: 3000, time: '2 hr ago' },
    { id: 6, player: 'Vikram_VK', game: 'Free Fire', amount: 7500, time: '3 hr ago' },
  ],
  matches: [
    { id: 'm1', game: 'BGMI', title: 'Erangel Squad Showdown', mode: 'Squad', entry: 50, prize: 5000, slots: '82/100', startsAt: min(25) },
    { id: 'm2', game: 'Free Fire', title: 'Bermuda Clash Night', mode: 'Solo', entry: 20, prize: 1500, slots: '41/48', startsAt: min(70) },
    { id: 'm3', game: 'BGMI', title: 'Miramar Duo Rush', mode: 'Duo', entry: 30, prize: 2500, slots: '30/50', startsAt: min(130) },
  ],
};
