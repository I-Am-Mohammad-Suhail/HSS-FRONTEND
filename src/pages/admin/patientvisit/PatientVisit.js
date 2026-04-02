// import { useState } from "react";
// import "./PatientVisit.css";

// export default function PatientVisit() {
//   const [photo, setPhoto] = useState(null);

//   return (
//     <div className="visit-page">

//       {/* ================= HEADER ================= */}
//       <div className="visit-header">
//         <div className="patient-box">
//           <div className="avatar">mongo db 
//             {photo ? <img src={photo} alt="" /> : "Upload"}
//             <input
//               type="file"
//               accept="image/*"
//               onChange={(e) =>
//                 setPhoto(URL.createObjectURL(e.target.files[0]))
//               }
//             />
//           </div>

//           <div className="patient-info">
//             <input className="patient-name" placeholder="Patient Name" />
//             <div className="meta">Age | Blood Group | Gender</div>
//           </div>
//         </div>

//         <div className="pt-id">PT123456</div>
//       </div>

//       {/* ================= VISIT DETAILS ================= */}
//       <div className="card">
//         <h3>Visit Details</h3>

//         <div className="visit-grid">

//           <div>
//             <label>Visit ID</label>
//             <select>
//               <option>V12345</option>
//             </select>
//           </div>

//           <div>
//             <label>Visit Type</label>
//             <select>
//               <option>OPD</option>
//               <option>IPD</option>
//             </select>
//           </div>

//           <div>
//             <label>Visit Date & Time</label>
//             <input type="datetime-local" />
//           </div>

//           <div>
//             <label>Department</label>
//             <select>
//               <option>General Medicine</option>
//             </select>
//           </div>

//           <div>
//             <label>Clinic / Location</label>
//             <select>
//               <option>OPD – Room 101</option>
//             </select>
//           </div>

//           <div>
//             <label>Attending Doctor</label>
//             <input placeholder="Doctor Name" />
//           </div>

//               {/* <div>
//                 <label>Scan ID</label>
//                 <button
//                   type="button"
//                   className="scan-btn"
//                   onClick={() => handleScan("emergency")}
//                 >
//                   Scan ID
//                 </button>
//               </div> */}

//         </div>
//       </div>

//       {/* ================= BILLING ================= */}
//       <div className="card billing-grid">

//         {/* LEFT */}
//         <div>
//           <h3>Billing & Administrative</h3>

//           <div className="billing-left">

//             <div>
//               <label>Plan Name</label>
//               <input />
//             </div>

//             <div>
//               <label>Patient Type</label>
//               <select>
//                 <option>Insurance</option>
//                 <option>Cash</option>
//               </select>
//             </div>

//             <div>
//               <label>Insurance Expiry</label>
//               <input type="date" />
//             </div>

//             <div>
//               <label>Insurance Provider</label>
//               <select>
//                 <option>ABC Health Insurance</option>
//               </select>
//             </div>

//             <div>
//               <label>Network</label>
//               <select>
//                 <option>Network A</option>
//               </select>
//             </div>

//             <div>
//               <label>Member ID</label>
//               <input />
//             </div>

//             <div>
//               <label>Card Number</label>
//               <input />
//             </div>

//             <div>
//               <label>Referral Source</label>
//               <input />
//             </div>

//             <div className="full">
//               <label>Chief Complaint / Visit Reason</label>
//               <textarea rows="3" />
//             </div>

//           </div>
//         </div>

//         {/* RIGHT */}
//         <div>
//           <h3>Schedule of Benefits</h3>

//           <div className="benefit-head">
//             <span>Service</span>
//             <span>%</span>
//             <span>Amount</span>
//           </div>

//           {[
//             "Consultation",
//             "Diagnostic",
//             "Lab Copay",
//             "Radiology",
//             "Pharmacy",
//             "Dental",
//             "Maternity",
//             "Optical",
//           ].map((item) => (
//             <div key={item} className="benefit-row">
//               <span>{item}</span>
//               <input placeholder="%" />
//               <input placeholder="Amount" />
//             </div>
//           ))}
//         </div>

//       </div>

//       {/* ================= ACTIONS ================= */}
//       <div className="actions">
//         <button className="save">Save Visit</button>
//         <button className="emr">Save & Go to EMR</button>
//       </div>

//     </div>
//   );
// }





import { useState, useRef, useEffect } from "react";
import "./PatientVisit.css";
const DEPARTMENT_DATA = {
  "General Medicine": {
    locations: ["Room 101", "Room 102", "Room 103"],
    doctors: [
      "Dr. Arjun Sharma",
      "Dr. Priya Mehta",
      "Dr. Ravi Gupta",
      "Dr. Sunita Rao",
    ],
  },
  OPD: {
    locations: ["OPD – Bay 1", "OPD – Bay 2", "OPD – Bay 3", "OPD – Bay 4"],
    doctors: ["Dr. Neha Joshi", "Dr. Karan Verma", "Dr. Divya Patel"],
  },
  IPD: {
    locations: [
      "IPD Ward A",
      "IPD Ward B",
      "IPD Ward C",
      "IPD – Private Room",
    ],
    doctors: [
      "Dr. Amit Tiwari",
      "Dr. Sneha Kulkarni",
      "Dr. Rajesh Singh",
      "Dr. Pooja Nair",
    ],
  },
  Cardiology: {
    locations: ["Cardio OPD – Room 201", "Cardio ICU", "Cardio Ward"],
    doctors: ["Dr. Vivek Anand", "Dr. Meera Iyer", "Dr. Suresh Pillai"],
  },
  Pediatrics: {
    locations: ["Peds OPD – Room 301", "Peds Ward", "NICU"],
    doctors: ["Dr. Anjali Desai", "Dr. Rohit Kumar", "Dr. Priti Shah"],
  },
  Orthopedics: {
    locations: ["Ortho OPD – Room 401", "Ortho Ward", "Physio Room"],
    doctors: ["Dr. Harish Nanda", "Dr. Rekha Bhatt", "Dr. Sanjay More"],
  },
  Gynecology: {
    locations: ["Gynec OPD – Room 501", "Labour Ward", "Gynec Ward"],
    doctors: ["Dr. Nisha Patil", "Dr. Kavita Jain", "Dr. Alka Sood"],
  },
};

const BENEFIT_SERVICES = [
  "Consultation",
  "Diagnostic",
  "Lab Copay",
  "Radiology",
  "Pharmacy",
  "Dental",
  "Maternity",
  "Optical",
];

const EMPTY_BENEFITS = Object.fromEntries(
  BENEFIT_SERVICES.map((s) => [s, { pct: "", amt: "" }])
);

const INSURANCE_PROVIDERS = [
  "ABC Health Insurance",
  "Star Health",
  "ICICI Lombard",
  "Bajaj Allianz",
  "HDFC ERGO",
  "New India Assurance",
];

const NETWORKS = ["Network A", "Network B", "Network C", "TPA Direct"];

const VISIT_TYPES = ["OPD", "IPD", "Emergency", "Day Care"];

// ─────────────────────────────────────────────────────────────────────────────
//  DoctorSearch — searchable dropdown filtered by department
// ─────────────────────────────────────────────────────────────────────────────
function DoctorSearch({ doctors, value, onChange }) {
  const [query, setQuery] = useState(value || "");
  const [open, setOpen] = useState(false);
  const ref = useRef(null);

  const filtered = doctors.filter((d) =>
    d.toLowerCase().includes(query.toLowerCase())
  );

  useEffect(() => {
    const handler = (e) => {
      if (ref.current && !ref.current.contains(e.target)) setOpen(false);
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  useEffect(() => {
    setQuery(value || "");
  }, [value, doctors]);

  const select = (doc) => {
    setQuery(doc);
    onChange(doc);
    setOpen(false);
  };

  return (
    <div className="doctor-search" ref={ref}>
      <div className="ds-input-wrap">
        <input
          className="ds-input"
          placeholder="Search doctor..."
          value={query}
          onChange={(e) => {
            setQuery(e.target.value);
            onChange("");
            setOpen(true);
          }}
          onFocus={() => setOpen(true)}
          onKeyDown={(e) => {
            if (e.key === "Enter" && filtered.length > 0) select(filtered[0]);
            if (e.key === "Escape") setOpen(false);
          }}
        />
        <span className="ds-icon">⌕</span>
      </div>

      {open && (
        <ul className="ds-dropdown">
          {filtered.length === 0 ? (
            <li className="ds-no-result">No doctors found</li>
          ) : (
            filtered.map((doc) => (
              <li
                key={doc}
                className={`ds-item ${doc === value ? "active" : ""}`}
                onMouseDown={() => select(doc)}
              >
                <span className="ds-avatar">
                  {doc.split(" ").slice(-1)[0][0]}
                </span>
                {doc}
              </li>
            ))
          )}
        </ul>
      )}
    </div>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
//  BenefitsModal — schedule of benefits popup
// ─────────────────────────────────────────────────────────────────────────────
function BenefitsModal({ benefits, onChange, onClose }) {
  const [local, setLocal] = useState(benefits);

  const update = (service, field, val) =>
    setLocal((prev) => ({
      ...prev,
      [service]: { ...prev[service], [field]: val },
    }));

  const save = () => {
    onChange(local);
    onClose();
  };

  return (
    <div
      className="modal-overlay"
      onClick={(e) => e.target === e.currentTarget && onClose()}
    >
      <div className="modal-box">
        <div className="modal-header">
          <h3>Schedule of Benefits</h3>
          <button className="modal-close" onClick={onClose} aria-label="Close">
            ✕
          </button>
        </div>

        <div className="modal-body">
          <div className="benefit-head">
            <span>Service</span>
            <span>Coverage %</span>
            <span>Max Amount</span>
          </div>

          {BENEFIT_SERVICES.map((svc) => (
            <div key={svc} className="benefit-row">
              <span className="svc-name">{svc}</span>

              <div className="input-with-unit">
                <input
                  type="number"
                  min="0"
                  max="100"
                  placeholder="0"
                  value={local[svc]?.pct || ""}
                  onChange={(e) => update(svc, "pct", e.target.value)}
                />
                <span className="unit-label">%</span>
              </div>

              <div className="input-with-unit">
                <span className="unit-label">₹</span>
                <input
                  type="number"
                  min="0"
                  placeholder="0"
                  value={local[svc]?.amt || ""}
                  onChange={(e) => update(svc, "amt", e.target.value)}
                />
              </div>
            </div>
          ))}
        </div>

        <div className="modal-footer">
          <button className="btn-cancel" onClick={onClose}>Cancel</button>
          <button className="btn-save-benefits" onClick={save}>Save Benefits</button>
        </div>
      </div>
    </div>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
//  PatientVisit — main page component
// ─────────────────────────────────────────────────────────────────────────────
export default function PatientVisit() {
  const [photo, setPhoto] = useState(null);
  const [department, setDepartment] = useState("General Medicine");
  const [location, setLocation] = useState("");
  const [doctor, setDoctor] = useState("");
  const [showBenefits, setShowBenefits] = useState(false);
  const [benefits, setBenefits] = useState(EMPTY_BENEFITS);
  const [patient, setPatient] = useState(null);
  const [selectedBG, setSelectedBG] = useState("");
  const BLOOD_GROUPS = [
    "A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-"
  ];

  const deptData = DEPARTMENT_DATA[department] || { locations: [], doctors: [] };
  const filledCount = BENEFIT_SERVICES.filter(
    (s) => benefits[s]?.pct || benefits[s]?.amt
  ).length;

  const handleDeptChange = (dept) => {
    setDepartment(dept);
    setLocation("");
    setDoctor("");
  };
  const fetchPatient = async (mrn) => {
    try {
      const res = await fetch(`http://localhost:5000/api/patient/by-mrn/${mrn}`);
      const data = await res.json();

      if (data.success) {
        setPatient(data.data);
      }
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="visit-page">

      {/* ══════════════════════════════════════════════ HEADER */}
      <input
        placeholder="Enter MRN"
        onBlur={(e) => fetchPatient(e.target.value)}
      />
      <div className="visit-header">
        <div className="patient-box">
          <div className="avatar">
            {photo ? <img src={photo} alt="Patient" /> : "📷 Upload"}
            <input
              type="file"
              accept="image/*"
              onChange={(e) => setPhoto(URL.createObjectURL(e.target.files[0]))}
            />
          </div>
          <div className="patient-info">
            <div className="patient-name">
              {patient
                ? `${patient.firstName} ${patient.lastName}`
                : "Patient Name"}
            </div>

            <div className="meta">
              <span>{patient?.age || "Age"}</span>

              <select
                className={`blood-group-dropdown ${selectedBG ? "selected" : ""}`}
                value={selectedBG}
                onChange={(e) => setSelectedBG(e.target.value)}
              >
                <option value="">BG</option>
                {BLOOD_GROUPS.map((bg) => (
                  <option key={bg} value={bg}>{bg}</option>
                ))}
              </select>

              <span>{patient?.gender || "Gender"}</span>
            </div>
          </div>
        </div>
        <div className="pt-id">
          {patient?.mrn || "PT ID"}
        </div>
      </div>

      {/* ══════════════════════════════════════════ VISIT DETAILS */}
      <div className="card">
        <h3>Visit Details</h3>
        <div className="visit-grid">

          <div>
            <label>Visit ID</label>
            <select><option>V12345</option></select>
          </div>

          <div>
            <label>Visit Type</label>
            <select>
              {VISIT_TYPES.map((t) => <option key={t}>{t}</option>)}
            </select>
          </div>

          <div>
            <label>Visit Date &amp; Time</label>
            <input type="datetime-local" />
          </div>

          <div>
            <label>Department</label>
            <select
              value={department}
              onChange={(e) => handleDeptChange(e.target.value)}
            >
              {Object.keys(DEPARTMENT_DATA).map((d) => (
                <option key={d}>{d}</option>
              ))}
            </select>
          </div>

          <div>
            <label>Clinic / Location</label>
            <select
              value={location}
              onChange={(e) => setLocation(e.target.value)}
            >
              <option value="">-- Select Location --</option>
              {deptData.locations.map((l) => (
                <option key={l}>{l}</option>
              ))}
            </select>
          </div>

          <div>
            <label>Attending Doctor</label>
            <DoctorSearch
              doctors={deptData.doctors}
              value={doctor}
              onChange={setDoctor}
            />
          </div>

        </div>
      </div>

      {/* ══════════════════════════════════════ BILLING & ADMIN */}
      <div className="card">
        <h3>Billing &amp; Administrative</h3>
        <div className="billing-left">

          <div>
            <label>Plan Name</label>
            <input placeholder="Enter plan name" />
          </div>

          <div>
            <label>Patient Type</label>
            <select>
              <option>Insurance</option>
              <option>Cash</option>
              <option>Corporate</option>
            </select>
          </div>

          <div>
            <label>Insurance Expiry</label>
            <input type="date" />
          </div>

          <div>
            <label>Insurance Provider</label>
            <select>
              {INSURANCE_PROVIDERS.map((p) => <option key={p}>{p}</option>)}
            </select>
          </div>

          <div>
            <label>Network</label>
            <select>
              {NETWORKS.map((n) => <option key={n}>{n}</option>)}
            </select>
          </div>

          <div>
            <label>Member ID</label>
            <input placeholder="Member ID" />
          </div>

          <div>
            <label>Card Number</label>
            <input placeholder="Card number" />
          </div>

          <div>
            <label>Referral Source</label>
            <input placeholder="Referral source" />
          </div>

          <div className="full">
            <label>Chief Complaint / Visit Reason</label>
            <textarea rows="3" placeholder="Describe the chief complaint..." />
          </div>

          <div className="full">
            <label>Schedule of Benefits</label>
            <div className="benefits-trigger-wrap">
              <button
                className="benefits-btn"
                onClick={() => setShowBenefits(true)}
              >
                📋 Configure Benefits
                {filledCount > 0 && (
                  <span className="benefits-badge">{filledCount} filled</span>
                )}
              </button>
              {filledCount === 0 && (
                <span className="benefits-hint">Click to set coverage details</span>
              )}
            </div>
          </div>

        </div>
      </div>

      {/* ══════════════════════════════════════════════ ACTIONS */}
      <div className="actions">
        <button className="save-btn">💾 Save Visit</button>
      </div>

      {/* ══════════════════════════════════ BENEFITS MODAL */}
      {showBenefits && (
        <BenefitsModal
          benefits={benefits}
          onChange={setBenefits}
          onClose={() => setShowBenefits(false)}
        />
      )}
    </div>
  );
}