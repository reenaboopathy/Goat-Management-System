export const COLORS = {
  INK: '#1E1B18',
  PRIMARY: '#1B3A8C',
  ACCENT: '#1DBF73',
  PAPER: '#F7F8F5',
  LINE: '#DDE2DA',
  MUTED: '#7C8579',
};
export const STORAGE_KEY = 'selsolve-tenants-v1';

export function emptyTenantData() {
  return { goats: [], weights: [], vaccinations: [], medical: [], breeding: [], transactions: [] };
}

export function slugify(s) {
  return s.toLowerCase().trim().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
}

export function goatLabel(goats, id) {
  const g = goats.find((x) => x.id === id);
  return g ? `${g.tagId} · ${g.name}` : id;
}

export function ageFromDob(dob) {
  const diff = Date.now() - new Date(dob).getTime();
  const months = Math.floor(diff / (1000 * 60 * 60 * 24 * 30.44));
  return months < 12 ? `${months} mo` : `${Math.floor(months / 12)}y ${months % 12}mo`;
}

export const TABS = [
  { key: 'dashboard', label: 'Dashboard' },
  { key: 'goats', label: 'Goats' },
  { key: 'weights', label: 'Weight Log' },
  { key: 'breeding', label: 'Breeding' },
  { key: 'vaccinations', label: 'Vaccinations' },
  { key: 'medical', label: 'Medical' },
  { key: 'transactions', label: 'Sales / Purchase' },
  { key: 'reports', label: 'Reports' },
];
