export default function StatCard({ label, value, color }) {
  return (
    <div style={{ background: '#fff', borderRadius: 18, padding: '22px 20px', boxShadow: '0 24px 60px rgba(15, 23, 42, 0.06)', border: '1px solid rgba(226,232,240,0.7)', minHeight: 120, display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 12, marginBottom: 10 }}>
        <div style={{ width: 36, height: 36, borderRadius: 12, background: `${color}1A` }} />
        <div style={{ fontSize: 11, letterSpacing: 0.55, textTransform: 'uppercase', color: '#64748B', fontWeight: 700 }}>{label}</div>
      </div>
      <div style={{ fontSize: 30, fontWeight: 800, color: '#0F172A', lineHeight: 1.05 }}>{value}</div>
    </div>
  );
}
