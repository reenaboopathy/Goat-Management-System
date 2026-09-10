import { X } from 'lucide-react';

export default function FormCard({ title, onClose, children }) {
  return (
    <div style={{ background: '#fff', border: '1px solid #DDE2DA', borderRadius: 6, padding: 18, marginBottom: 18, position: 'relative' }}>
      <button onClick={onClose} style={{ position: 'absolute', top: 12, right: 12, background: 'transparent', border: 'none', color: '#7C8579' }}>
        <X size={16} />
      </button>
      <h4 style={{ margin: '0 0 14px', fontSize: 14.5, color: '#1B3A8C' }}>{title}</h4>
      {children}
    </div>
  );
}
