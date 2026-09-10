import { ShieldCheck, Building2, ArrowRight } from 'lucide-react';
import { COLORS } from '../data.js';
import Logo from './Logo.jsx';

export default function RoleChooser({ onPick }) {
  return (
    <div style={{ minHeight: '100vh', background: COLORS.PRIMARY, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: 24 }}>
      <Logo size={56} />
      <span style={{ fontSize: 24, fontWeight: 800, color: '#fff', marginTop: 8 }}>SelSolve</span>
      <p style={{ color: '#C7D0EE', fontSize: 13.5, margin: '4px 0 32px' }}>Multi-tenant farm management platform</p>

      <div style={{ display: 'flex', gap: 16, flexWrap: 'wrap', justifyContent: 'center', maxWidth: 640 }}>
        <div className="clickcard" onClick={() => onPick('admin-login')} style={{ width: 260, background: '#fff', borderRadius: 10, padding: 24, cursor: 'pointer' }}>
          <ShieldCheck size={26} color={COLORS.ACCENT} />
          <h3 style={{ margin: '12px 0 4px', fontSize: 17, color: COLORS.PRIMARY }}>Super Admin</h3>
          <p style={{ margin: 0, fontSize: 12.5, color: COLORS.MUTED, lineHeight: 1.5 }}>Create and manage tenant farms from the backend.</p>
          <div style={{ display: 'flex', alignItems: 'center', gap: 4, marginTop: 14, fontSize: 12.5, fontWeight: 700, color: COLORS.PRIMARY }}>Enter <ArrowRight size={13} /></div>
        </div>
        <div className="clickcard" onClick={() => onPick('tenant-login')} style={{ width: 260, background: '#fff', borderRadius: 10, padding: 24, cursor: 'pointer' }}>
          <Building2 size={26} color={COLORS.PRIMARY} />
          <h3 style={{ margin: '12px 0 4px', fontSize: 17, color: COLORS.PRIMARY }}>Tenant Login</h3>
          <p style={{ margin: 0, fontSize: 12.5, color: COLORS.MUTED, lineHeight: 1.5 }}>Log in to your farm's own dashboard and records.</p>
          <div style={{ display: 'flex', alignItems: 'center', gap: 4, marginTop: 14, fontSize: 12.5, fontWeight: 700, color: COLORS.PRIMARY }}>Enter <ArrowRight size={13} /></div>
        </div>
      </div>
    </div>
  );
}
