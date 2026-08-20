import logoSrc from './DTF STICKER PRINTING (2).png';

export default function Logo({ size = 34 }) {
  return (
    <div style={{ width: size, height: size, overflow: 'hidden', display: 'flex', alignItems: 'center', justifyContent: 'center', background: '#fff' }}>
      <img src={logoSrc} alt="SelSolve logo" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
    </div>
  );
}
