export default function CenteredAuthShell({ children }) {
  return (
    <div className="auth-shell" style={{
      minHeight: '100vh',
      background: 'linear-gradient(180deg, #142C5D 0%, #0D1D3D 100%)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      padding: 24,
    }}>
      <div className="auth-shell-inner" style={{ width: '100%', maxWidth: 520, padding: 16 }}>
        {children}
      </div>
    </div>
  );
}
