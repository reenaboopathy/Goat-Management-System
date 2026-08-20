import { Bell, Menu, RefreshCcw } from 'lucide-react';
import { DASHBOARD_CARDS } from '../constants/Navigation.js';

export default function DashboardPage({
  tenantSession,
  onOpenSidebar,
  onNavigate,
}) {
  return (
    <div>
      {/* ================= HEADER ================= */}
      <div
        style={{
          background: '#1E3A8A',
          padding: '26px 20px 30px',
        }}
      >
        <div
          style={{
            maxWidth: 1180,
            margin: '0 auto',
            display: 'flex',
            flexDirection: 'column',
            gap: 22,
          }}
        >
          {/* Top Header */}
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              gap: 12,
              flexWrap: 'wrap',
            }}
          >
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: 14,
              }}
            >
              <button
                onClick={onOpenSidebar}
                aria-label="Open menu"
                style={{
                  width: 44,
                  height: 44,
                  borderRadius: 14,
                  backgroundColor: 'rgba(255,255,255,0.18)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  border: 'none',
                  cursor: 'pointer',
                }}
              >
                <Menu size={18} color="#fff" />
              </button>

              <div>
                <div
                  style={{
                    color: '#fff',
                    fontSize: 22,
                    fontWeight: 800,
                    letterSpacing: 0.7,
                  }}
                >
                  My Goat Manager
                </div>

                <div
                  style={{
                    color: 'rgba(255,255,255,0.82)',
                    fontSize: 14,
                    marginTop: 4,
                  }}
                >
                  A modern dashboard for your farm operations.
                </div>
              </div>
            </div>

            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: 12,
                flexWrap: 'wrap',
              }}
            >
              <div
                style={{
                  width: 44,
                  height: 44,
                  borderRadius: 14,
                  backgroundColor: 'rgba(255,255,255,0.18)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
              >
                <Bell size={20} color="#fff" />
              </div>

              <div
                style={{
                  padding: '10px 14px',
                  borderRadius: 999,
                  background: 'rgba(255,255,255,0.12)',
                  color: '#fff',
                  fontSize: 13,
                  fontWeight: 700,
                }}
              >
                Active
              </div>
            </div>
          </div>

          {/* Greeting */}
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              gap: 14,
              flexWrap: 'wrap',
            }}
          >
            <div
              style={{
                color: 'rgba(255,255,255,0.9)',
                fontSize: 15,
              }}
            >
              Hello, {tenantSession?.name || 'Farm Manager'}. Ready to manage
              your herd today?
            </div>

            <div
              style={{
                display: 'flex',
                gap: 10,
                flexWrap: 'wrap',
              }}
            >
              <div
                style={{
                  color: '#fff',
                  fontSize: 13,
                  background: 'rgba(255,255,255,0.12)',
                  borderRadius: 14,
                  padding: '10px 14px',
                }}
              >
                Farm status: Live
              </div>

              <div
                style={{
                  color: '#fff',
                  fontSize: 13,
                  background: 'rgba(255,255,255,0.12)',
                  borderRadius: 14,
                  padding: '10px 14px',
                }}
              >
                Quick actions
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* ================= DASHBOARD CARDS ================= */}
      <div
        style={{
          maxWidth: 1180,
          margin: '0 auto',
          padding: '22px 16px 32px',
        }}
      >
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
            gap: 20,
          }}
        >
          {DASHBOARD_CARDS.map((card) => {
            const Icon = card.icon;

            return (
              <div
                key={card.key}
                role="button"
                tabIndex={0}
                onClick={() => {
                  // IMPORTANT:
                  // Farm Setup card -> farmsetup page
                  // Medical card -> medical page
                  onNavigate(card.key);
                }}
                onKeyDown={(event) => {
                  if (event.key === 'Enter' || event.key === ' ') {
                    event.preventDefault();
                    onNavigate(card.key);
                  }
                }}
                style={{
                  background: '#fff',
                  borderRadius: 24,
                  minHeight: 190,
                  padding: 24,
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'space-between',
                  boxShadow: '0 24px 60px rgba(15,23,42,0.08)',
                  border: '1px solid rgba(15,23,42,0.04)',
                  cursor: 'pointer',
                  transition:
                    'transform 0.2s ease, box-shadow 0.2s ease',
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = 'translateY(-5px)';
                  e.currentTarget.style.boxShadow =
                    '0 30px 70px rgba(15,23,42,0.13)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = 'translateY(0)';
                  e.currentTarget.style.boxShadow =
                    '0 24px 60px rgba(15,23,42,0.08)';
                }}
              >
                {/* Icon + Title */}
                <div
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: 14,
                  }}
                >
                  <div
                    style={{
                      width: 52,
                      height: 52,
                      borderRadius: 18,
                      background: card.accent,
                      display: 'grid',
                      placeItems: 'center',
                      color: '#1D4ED8',
                    }}
                  >
                    <Icon size={20} />
                  </div>

                  <div
                    style={{
                      fontSize: 15,
                      fontWeight: 700,
                      color: '#111827',
                    }}
                  >
                    {card.label}
                  </div>
                </div>

                {/* Description */}
                <div
                  style={{
                    marginTop: 18,
                    color: '#4B5563',
                    fontSize: 13,
                    lineHeight: 1.6,
                    textAlign: 'center',
                  }}
                >
                  Manage {card.label.toLowerCase()} with fast updates and easy
                  access.
                </div>
              </div>
            );
          })}
        </div>

        {/* ================= SYNC BUTTON ================= */}
        <div
          style={{
            display: 'flex',
            justifyContent: 'flex-end',
            marginTop: 28,
          }}
        >
          <button
            type="button"
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: 10,
              background: 'linear-gradient(135deg, #2563EB, #1D4ED8)',
              color: '#fff',
              border: 'none',
              borderRadius: 999,
              padding: '14px 22px',
              fontWeight: 700,
              fontSize: 14,
              boxShadow: '0 16px 40px rgba(37,99,235,0.22)',
              cursor: 'pointer',
            }}
          >
            <RefreshCcw size={18} />
            Sync data
          </button>
        </div>
      </div>
    </div>
  );
}