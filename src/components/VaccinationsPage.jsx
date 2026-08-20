import RecordListPage from "./RecordlistPage.jsx";

export default function VaccinationsPage({ tenant, onBack, onAdd }) {
  const vaccinations = tenant?.data?.vaccinations || [];

  return (
    <RecordListPage
      title="Vaccinations"
      records={vaccinations}
      emptyMessage="No vaccinations have been logged yet!"
      onBack={onBack}
      onAdd={onAdd}
      renderRecord={(entry) => (
        <>
          <h3 style={{ margin: 0 }}>{entry.vaccine || "Vaccine"}</h3>
          <p style={{ margin: "6px 0 0", color: "#4B5563" }}>
            {entry.goatName || "Unnamed goat"} — given {entry.date}
            {entry.nextDueDate && ` · Next due: ${entry.nextDueDate}`}
          </p>
        </>
      )}
    />
  );
}