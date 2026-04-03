export default function Header({ patientInfo, setPatientInfo, handlePhotoChange, handleMRNBlur }) {
  return (
    <div className="emr-header">
      <div className="profile">
        <label>
          <img
            src={patientInfo.photo || "https://via.placeholder.com/80"}
            alt="patient"
          />
          <input type="file" hidden onChange={handlePhotoChange} />
        </label>

        <div>
          <input
            placeholder="Patient Name"
            value={patientInfo.name}
            onChange={e => setPatientInfo({ ...patientInfo, name: e.target.value })}
          />

          <div className="sub">
            <input placeholder="Age" value={patientInfo.age}
              onChange={e => setPatientInfo({ ...patientInfo, age: e.target.value })} />

            <input placeholder="MRN" value={patientInfo.mrn}
              onBlur={handleMRNBlur}
              onChange={e => setPatientInfo({ ...patientInfo, mrn: e.target.value })} />

            <input placeholder="Encounter"
              value={patientInfo.encounter}
              onChange={e => setPatientInfo({ ...patientInfo, encounter: e.target.value })} />

            <input placeholder="Allergies"
              value={patientInfo.allergies}
              onChange={e => setPatientInfo({ ...patientInfo, allergies: e.target.value })} />
          </div>
        </div>
      </div>
    </div>
  );
}