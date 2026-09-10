export default function SimpleField({ icon: Icon, label, children }) {
  return (
    <div style={{ marginBottom: 14 }}>
      <label style={{ display: 'flex', alignItems: 'center', gap: 6, fontSize: 12, fontWeight: 700, color: '#1B3A8C', marginBottom: 5 }}>
        {Icon && <Icon size={13} />} {label}
      </label>
      {children}
    </div>
  );
}
