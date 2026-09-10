export default function StatusPill({ status }) {
  const palette = {
    Active: '#127C4B',
    Sold: '#7C8579',
    'Due Soon': '#A33B3B',
    Done: '#127C4B',
    Pregnant: '#7A4FA0',
    Kidded: '#127C4B',
  };
  const color = palette[status] || '#1B3A8C';
  return (
    <span style={{ color, background: `${color}1a`, border: `1px solid ${color}`, borderRadius: 20, padding: '3px 10px', fontSize: 11.5, fontWeight: 700 }}>
      {status}
    </span>
  );
}
