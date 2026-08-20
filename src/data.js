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

export const DEMO_TENANTS = {
  'green-valley-farm': {
    name: 'Green Valley Farm',
    status: 'Active',
    createdAt: '2026-05-01',
    users: [{ username: 'farmer', password: 'farm123', email: 'farmer@greenvalley.com', name: 'Ramasamy' }],
    data: {
      goats: [
        { id: 'G001', tagId: 'TN-001', name: 'Karuppi', breed: 'Tellicherry', gender: 'Female', dob: '2023-02-10', status: 'Active' },
        { id: 'G002', tagId: 'TN-002', name: 'Vellai', breed: 'Boer', gender: 'Female', dob: '2022-11-05', status: 'Active' },
        { id: 'G003', tagId: 'TN-003', name: 'Raja', breed: 'Sirohi', gender: 'Male', dob: '2022-06-20', status: 'Active' },
      ],
      weights: [
        { id: 1, goatId: 'G001', date: '2026-05-01', weightKg: 18 },
        { id: 2, goatId: 'G001', date: '2026-06-01', weightKg: 21 },
        { id: 3, goatId: 'G002', date: '2026-06-01', weightKg: 33 },
      ],
      vaccinations: [{ id: 1, goatId: 'G001', vaccine: 'PPR', date: '2026-06-01', nextDue: '2026-12-01', status: 'Done' }],
      medical: [{ id: 1, goatId: 'G002', issue: 'Foot rot', treatment: 'Antibiotic', date: '2026-06-15', vet: 'Dr. Kumar', cost: 450 }],
      breeding: [{ id: 1, doeId: 'G001', buckName: 'Raja (G003)', matingDate: '2026-04-01', expectedDate: '2026-09-01', kidsBorn: 0, status: 'Pregnant' }],
      transactions: [{ id: 1, type: 'Purchase', goatRef: 'TN-002 Vellai', party: 'Murugan Farm', amount: 8500, date: '2022-11-05' }],
    },
  },
};

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
