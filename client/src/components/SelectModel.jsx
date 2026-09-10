import { Search, Check, X } from "lucide-react";

export default function SelectModal({ title, options, selected, query, onQueryChange, onPick, onClose }) {
  const filtered = options.filter((o) =>
    o.toLowerCase().includes(query.trim().toLowerCase())
  );

  return (
    <div
      onClick={onClose}
      style={{
        position: "fixed",
        inset: 0,
        background: "rgba(15,23,42,0.45)",
        display: "flex",
        alignItems: "flex-end",
        justifyContent: "center",
        zIndex: 50
      }}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        style={{
          background: "#fff",
          width: "100%",
          maxWidth: 420,
          maxHeight: "80vh",
          borderRadius: "20px 20px 0 0",
          display: "flex",
          flexDirection: "column",
          boxShadow: "0 -8px 40px rgba(15,23,42,0.18)",
          overflow: "hidden"
        }}
      >
        <div style={{ width: 36, height: 4, borderRadius: 2, background: "#E1E7EF", margin: "10px auto 4px" }} />

        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "14px 20px 12px" }}>
          <div style={{ fontSize: 17, fontWeight: 700, color: "#1A2332" }}>{title}</div>
          <button
            onClick={onClose}
            aria-label="Close"
            style={{
              background: "#EEF2F6",
              border: "none",
              borderRadius: 999,
              width: 30,
              height: 30,
              display: "grid",
              placeItems: "center",
              cursor: "pointer",
              color: "#64748B"
            }}
          >
            <X size={16} />
          </button>
        </div>

        <div style={{ padding: "0 20px 14px" }}>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: 10,
              background: "#EEF2F6",
              borderRadius: 12,
              padding: "10px 14px"
            }}
          >
            <Search size={17} color="#94A3B8" />
            <input
              autoFocus
              value={query}
              onChange={(e) => onQueryChange(e.target.value)}
              placeholder="Search..."
              style={{
                flex: 1,
                border: "none",
                outline: "none",
                fontSize: 15,
                color: "#1A2332",
                background: "transparent"
              }}
            />
          </div>
        </div>

        <div style={{ overflowY: "auto", padding: "0 10px 10px" }}>
          {filtered.length === 0 && (
            <div style={{ padding: "28px 12px", textAlign: "center", color: "#94A3B8", fontSize: 14 }}>
              Nothing matches "{query}".
            </div>
          )}
          {filtered.map((option) => {
            const isSelected = option === selected;
            return (
              <div
                key={option}
                onClick={() => onPick(option)}
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  padding: "13px 12px",
                  borderRadius: 10,
                  cursor: "pointer",
                  fontSize: 15,
                  fontWeight: isSelected ? 700 : 400,
                  color: isSelected ? "#1E3A5F" : "#1A2332",
                  background: isSelected ? "#E8EEF5" : "transparent"
                }}
              >
                {option}
                {isSelected && <Check size={17} color="#1E3A5F" />}
              </div>
            );
          })}
        </div>

        <div style={{ padding: 16, borderTop: "1px solid #E1E7EF" }}>
          <button
            onClick={onClose}
            style={{
              width: "100%",
              background: "#1E3A5F",
              color: "#fff",
              border: "none",
              borderRadius: 12,
              padding: "13px 0",
              fontSize: 15,
              fontWeight: 700,
              cursor: "pointer"
            }}
          >
            Done
          </button>
        </div>
      </div>
    </div>
  );
}