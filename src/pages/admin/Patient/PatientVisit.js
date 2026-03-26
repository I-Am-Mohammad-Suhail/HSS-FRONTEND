// import { useState } from "react";
// import "./PatientVisit.css";

// export default function PatientVisit() {
//   const [photo, setPhoto] = useState(null);

//   return (
//     <div className="visit-page">

//       {/* ================= HEADER ================= */}
//       <div className="visit-header">
//         <div className="patient-box">
//           <div className="avatar">
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





import { useState } from "react";
import "./PatientVisit.css";

export default function PatientVisit() {
  const [photo, setPhoto] = useState(null);
  const [mrn, setMrn] = useState("");
  const [patient, setPatient] = useState(null);

  const [department, setDepartment] = useState("");
  const [doctorList, setDoctorList] = useState([]);

  const [showPopup, setShowPopup] = useState(false);

  // 🔥 VISIT ID AUTO
  const visitId = "V" + Date.now();

  // 🔥 SEARCH API
  // const handleSearch = async () => {
  //   try {
  //     const res = await fetch(`http://localhost:5000/api/patient/${mrn}`);
  //     const data = await res.json();

  //     setPatient(data);
  //   } catch {
  //     alert("Patient not found");
  //   }
  // };
  const handleSearch = () => {
  if (!mrn) return alert("Enter MRN");

  // ✅ DUMMY DATA (FRONTEND TEST)
  const dummyPatient = {
    mrn: mrn,
    displayName: "Suhail",
    age: "22Y02M10D",
    gender: "Male"
  };

  setPatient(dummyPatient);
};

  // 🔥 DOCTOR BASED ON DEPARTMENT
  const doctors = {
    "General Medicine": ["Dr Sharma", "Dr Khan"],
    Cardiology: ["Dr Heart", "Dr Pulse"],
    Orthopedic: ["Dr Bone", "Dr Joint"],
  };

  const handleDepartment = (dept) => {
    setDepartment(dept);
    setDoctorList(doctors[dept] || []);
  };

  return (
    <div className="visit-page">

      {/* 🔍 SEARCH */}
      <div className="search-box">
        <input
          placeholder="Enter MRN"
          value={mrn}
          onChange={(e) => setMrn(e.target.value)}
        />
        <button onClick={handleSearch}>Search</button>
      </div>

      {/* ================= HEADER ================= */}
      {patient && (
        <div className="visit-header">
          <div className="patient-box">

            <div className="avatar">
              {photo ? <img src={photo} alt="" /> : "Upload"}
              <input
                type="file"
                accept="image/*"
                onChange={(e) =>
                  setPhoto(URL.createObjectURL(e.target.files[0]))
                }
              />
            </div>

            <div className="patient-info">
              <input
                className="patient-name"
                value={patient.displayName}
                readOnly
              />

              <div className="meta">
                {patient.age} | 
                
                {/* BLOOD GROUP DROPDOWN */}
                <select>
                  <option>Blood Group</option>
                  <option>A+</option>
                  <option>B+</option>
                  <option>O+</option>
                  <option>AB+</option>
                  <option>A-</option>
                  <option>B-</option>
                  <option>O-</option>
                  <option>AB-</option>
                </select>

                | {patient.gender}
              </div>
            </div>

          </div>

          <div className="pt-id">{patient.mrn}</div>
        </div>
      )}

      {/* ================= VISIT DETAILS ================= */}
      {patient && (
        <div className="card">
          <h3>Visit Details</h3>

          <div className="visit-grid">

            <div>
              <label>Visit ID</label>
              <input value={visitId} readOnly />
            </div>

            <div>
              <label>Visit Type</label>
              <select>
                <option>OPD</option>
                <option>IPD</option>
                <option>Emergency</option>
              </select>
            </div>

            <div>
              <label>Visit Date & Time</label>
              <input
                type="datetime-local"
                defaultValue={new Date().toISOString().slice(0, 16)}
              />
            </div>

            <div>
              <label>Department</label>
              <select onChange={(e) => handleDepartment(e.target.value)}>
                <option>Select</option>
                <option>General Medicine</option>
                <option>Cardiology</option>
                <option>Orthopedic</option>
              </select>
            </div>

            <div>
              <label>Clinic / Location</label>
              <select>
                <option>OPD – Room 101</option>
                <option>OPD – Room 102</option>
              </select>
            </div>

            <div>
              <label>Attending Doctor</label>
              <select>
                <option>Select Doctor</option>
                {doctorList.map((doc) => (
                  <option key={doc}>{doc}</option>
                ))}
              </select>
            </div>

          </div>
        </div>
      )}

      {/* ================= BILLING ================= */}
      {patient && (
        <div className="card billing-grid">

          <div>
            <h3>Billing & Administrative</h3>

            <div className="billing-left">

              <div>
                <label>Plan Name</label>
                <select>
                  <option>Basic</option>
                  <option>Premium</option>
                </select>
              </div>

              <div>
                <label>Patient Type</label>
                <select>
                  <option>Insurance</option>
                  <option>Cash</option>
                  <option>Online</option>
                  <option>Card</option>
                </select>
              </div>

              <div>
                <label>Insurance Expiry</label>
                <input type="date" />
              </div>

              <div>
                <label>Insurance Provider</label>
                <select>
                  <option>ABC Health</option>
                  <option>Star Health</option>
                </select>
              </div>

              <div>
                <label>Member ID</label>
                <input />
              </div>

              <div>
                <label>Card Number</label>
                <input />
              </div>

              <div className="full">
                <label>Chief Complaint</label>
                <textarea />
              </div>

            </div>
          </div>

        </div>
      )}

      {/* ================= ACTIONS ================= */}
      {patient && (
        <div className="actions">
          <button className="save">Save Visit</button>

          <button onClick={() => setShowPopup(true)}>
            Schedule of Benefits
          </button>
        </div>
      )}

      {/* ================= POPUP ================= */}
      {showPopup && (
        <div className="popup">
          <div className="popup-content">
            <h3>Schedule of Benefits</h3>

            {[
              "Consultation",
              "Diagnostic",
              "Lab",
              "Radiology",
            ].map((item) => (
              <div key={item} className="benefit-row">
                <span>{item}</span>
                <input placeholder="%" />
                <input placeholder="Amount" />
              </div>
            ))}

            <button onClick={() => setShowPopup(false)}>Save</button>
          </div>
        </div>
      )}

    </div>
  );
}