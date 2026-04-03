export default function CPOE() {
  return (
    <div className="card">
      <div className="med-grid">
        <input placeholder="Medication" />
        <select><option>Dosage</option></select>
        <select><option>Priority</option></select>
        <input type="date" />
      </div>
    </div>
  );
}