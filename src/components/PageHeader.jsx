export default function PageHeader({ title, subtitle, action }) {
  return (
    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', flexWrap: 'wrap', gap: 16, marginBottom: 24 }}>
      <div>
        <h1 style={{ margin: 0, fontSize: 28, color: '#0F172A', fontWeight: 800, lineHeight: 1.05 }}>{title}</h1>
        {subtitle && <p style={{ margin: '10px 0 0', fontSize: 14, color: '#475569', maxWidth: 520 }}>{subtitle}</p>}
      </div>
      {action}
    </div>
  );
}
