import { useState } from 'react';
import { Building2, User, Lock, AlertCircle } from 'lucide-react';
import Logo from './Logo.jsx';
import SimpleField from './SimpleField.jsx';

export default function TenantLogin({ onLogin, onCreateTenant, onRecoverPassword }) {
  const [slug, setSlug] = useState('');
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [mode, setMode] = useState('login');

  function submit(e) {
    e.preventDefault();
    setError('');

    if (mode === 'login') {
      const res = onLogin(slug.trim(), username, password);
      if (!res.ok) setError(res.error);
      return;
    }

    if (mode === 'forgot') {
      const res = onRecoverPassword(slug.trim(), username);
      if (res.ok) {
        setSuccess(res.message);
        setError('');
      } else {
        setError(res.error);
        setSuccess('');
      }
      return;
    }

    const res = onCreateTenant({ farmId: slug.trim(), username, email, password });
    if (!res.ok) setError(res.error);
  }

  return (
    <div style={{ background: 'rgba(255,255,255,0.96)', borderRadius: 30, padding: '36px 32px', boxShadow: '0 32px 80px rgba(15,23,42,0.12)', width: '100%', maxWidth: 520, border: '1px solid rgba(15,23,42,0.08)' }}>
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 12, marginBottom: 28 }}>
        <Logo size={56} />
        <div style={{ textTransform: 'uppercase', letterSpacing: 1.4, color: '#2563EB', fontSize: 12, fontWeight: 800 }}>Farm management</div>
        <div style={{ textAlign: 'center' }}>
          <div style={{ fontSize: 24, fontWeight: 800, color: '#111827' }}>{mode === 'login' ? 'Welcome back' : mode === 'create' ? 'Create your farm' : 'Recover password'}</div>
          <p style={{ margin: '12px 0 0', fontSize: 14, color: '#6B7280', lineHeight: 1.7 }}>
            {mode === 'login'
              ? 'Sign in to access your farm dashboard and herd management tools.'
              : mode === 'create'
              ? 'Register a farm account to track animals, events, and operations.'
              : 'Enter your farm name and username or email to recover your password.'}
          </p>
        </div>
      </div>

      <div style={{ display: 'flex', gap: 20, alignItems: 'flex-start', flexWrap: 'wrap' }}>
        <form onSubmit={submit} style={{ flex: 1, minWidth: 320 }}>
          <SimpleField icon={Building2} label='Farm name'>
            <input value={slug} onChange={(e) => setSlug(e.target.value)} style={{ width: '100%', padding: '14px 16px', border: '1px solid #E5E7EB', borderRadius: 14, fontSize: 14, background: '#fff', color: '#111827' }} placeholder='Enter farm name' />
          </SimpleField>
          <SimpleField icon={User} label={mode === 'login' ? 'Username or Email' : 'Username'}>
            <input value={username} onChange={(e) => setUsername(e.target.value)} style={{ width: '100%', padding: '14px 16px', border: '1px solid #E5E7EB', borderRadius: 14, fontSize: 14, background: '#fff', color: '#111827' }} placeholder={mode === 'login' ? 'Enter username or email' : 'Enter username or email'} />
          </SimpleField>
          {mode === 'create' ? (
            <SimpleField icon={User} label='Email'>
              <input value={email} onChange={(e) => setEmail(e.target.value)} style={{ width: '100%', padding: '14px 16px', border: '1px solid #E5E7EB', borderRadius: 14, fontSize: 14, background: '#fff', color: '#111827' }} placeholder='Enter email (optional)' />
            </SimpleField>
          ) : null}
          {mode !== 'forgot' ? (
            <SimpleField icon={Lock} label='Password'>
              <div>
                <input type='password' value={password} onChange={(e) => setPassword(e.target.value)} style={{ width: '100%', padding: '14px 16px', border: '1px solid #E5E7EB', borderRadius: 14, fontSize: 14, background: '#fff', color: '#111827' }} placeholder='Enter password' />
                <div style={{ marginTop: 10, textAlign: 'right' }}>
                  <button type='button' onClick={() => { setMode('forgot'); setSuccess(''); setError(''); }} style={{ background: 'transparent', border: 'none', color: '#2563EB', fontWeight: 700, cursor: 'pointer', fontSize: 13 }}>
                    Forgot password?
                  </button>
                </div>
              </div>
            </SimpleField>
          ) : null}
          {error && (
            <div style={{ display: 'flex', gap: 8, alignItems: 'center', color: '#A33B3B', fontSize: 13, marginBottom: 14 }}>
              <AlertCircle size={16} /> {error}
            </div>
          )}
          <button type='submit' style={{ width: '100%', background: 'linear-gradient(135deg, #2563EB, #1D4ED8)', color: '#fff', border: 'none', padding: '14px 0', borderRadius: 14, fontWeight: 700, fontSize: 15, cursor: 'pointer', boxShadow: '0 16px 32px rgba(37,99,235,0.18)' }}>
            {mode === 'login' ? 'Log in' : mode === 'create' ? 'Create account' : 'Recover password'}
          </button>
        </form>

        {mode === 'forgot' ? (
          <div style={{ width: 300, padding: 22, border: '1px solid rgba(37,99,235,0.16)', borderRadius: 24, background: '#EFF6FF', minHeight: 220 }}>
            <div style={{ fontSize: 14, fontWeight: 700, marginBottom: 12, color: '#1B3A8C' }}>Recover password</div>
            <div style={{ fontSize: 13, color: '#4B5563', marginBottom: 16, lineHeight: 1.7 }}>
              Enter your farm name and username or email to recover your access.
            </div>
            {success ? (
              <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
                <div style={{ fontSize: 14, fontWeight: 700, color: '#0F2A60' }}>Password found</div>
                <div style={{ fontSize: 14, fontWeight: 700, color: '#1B3A8C', wordBreak: 'break-all' }}>{success.replace('Your password is: ', '')}</div>
              </div>
            ) : (
              <div style={{ fontSize: 13, color: '#334155' }}>Your recovered password will appear here after search.</div>
            )}
          </div>
        ) : null}
      </div>

      <div style={{ marginTop: 18, textAlign: 'center', fontSize: 13, color: '#6B7280' }}>
        {mode === 'login' ? (
          <button type='button' onClick={() => { setMode('create'); setSuccess(''); setError(''); }} style={{ background: 'transparent', border: 'none', color: '#2563EB', fontWeight: 700, cursor: 'pointer' }}>
            Create a new farm account
          </button>
        ) : (
          <button type='button' onClick={() => { setMode('login'); setSuccess(''); setError(''); }} style={{ background: 'transparent', border: 'none', color: '#2563EB', fontWeight: 700, cursor: 'pointer' }}>
            Back to login
          </button>
        )}
      </div>
    </div>
  );
}
