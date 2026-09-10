export function formatCurrency(amount) {
  const num = Number(amount) || 0;
  return `₹${num.toLocaleString('en-IN', { maximumFractionDigits: 2 })}`;
}

export function formatWeight(weight) {
  if (weight === null || weight === undefined || weight === '') {
    return '0.00 kg';
  }
  const num = Number(weight);
  return Number.isFinite(num) ? `${num.toFixed(2)} kg` : '0.00 kg';
}

export function formatDate(dateString) {
  if (!dateString) return '—';
  try {
    const d = new Date(dateString);
    if (isNaN(d.getTime())) return String(dateString);
    return d.toLocaleDateString('en-IN', {
      day: '2-digit',
      month: 'short',
      year: 'numeric',
    });
  } catch {
    return String(dateString);
  }
}

export function formatDateTime(dateString) {
  if (!dateString) return '—';
  try {
    const d = new Date(dateString);
    if (isNaN(d.getTime())) return String(dateString);
    return `${d.toLocaleDateString('en-IN', {
      day: '2-digit',
      month: 'short',
      year: 'numeric',
    })} · ${d.toLocaleTimeString('en-IN', {
      hour: '2-digit',
      minute: '2-digit',
      hour12: true,
    })}`;
  } catch {
    return String(dateString);
  }
}

export function calculateAge(dob) {
  if (!dob) return '—';
  try {
    const birth = new Date(dob);
    if (isNaN(birth.getTime())) return '—';
    const now = new Date();
    let months = (now.getFullYear() - birth.getFullYear()) * 12 + (now.getMonth() - birth.getMonth());
    if (now.getDate() < birth.getDate()) months -= 1;
    months = Math.max(0, months);
    const years = Math.floor(months / 12);
    const remMonths = months % 12;
    if (years === 0) return `${months} mo`;
    return remMonths > 0 ? `${years}y ${remMonths}m` : `${years} yr`;
  } catch {
    return '—';
  }
}
