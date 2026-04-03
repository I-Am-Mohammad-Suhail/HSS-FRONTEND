// import React, { useState, useEffect } from "react";
// import "./EMR.css";

// export default function EMR() {
//   const [tab, setTab] = useState("notes");

//   const [vitals, setVitals] = useState({
//     hr: "",
//     sys: "",
//     dia: "",
//     rr: "",
//     spo2: "",
//     temp: ""
//   });

//   const [redFlags, setRedFlags] = useState({
//     chestPain: false,
//     hypoxia: false,
//     trauma: false,
//     seizure: false
//   });
//   // ================= PATIENT HEADER =================
// const [patientInfo, setPatientInfo] = useState({
//   name: "",
//   age: "",
//   mrn: "",
//   encounter: "",
//   allergies: ""
// });

// // ================= MEDICATION ORDER =================
// const [medOrder, setMedOrder] = useState({
//   medication: "",
//   dosage: "",
//   priority: "",
//   startDate: ""
// });

//   // ✅ default on load
//   const [aiLevel, setAiLevel] = useState("LEVEL 5 – NON-URGENT");
//   const [triage, setTriage] = useState("LEVEL 5");

//   // ================= AI TRIAGE LOGIC =================
//   useEffect(() => {
//     const { hr, sys, dia, rr, spo2, temp } = vitals;

//     const anyValue =
//       hr || sys || dia || rr || spo2 || temp ||
//       Object.values(redFlags).some(v => v);

//     if (!anyValue) {
//       setAiLevel("LEVEL 5 – NON-URGENT");
//       setTriage("LEVEL 5");
//       return;
//     }

//     let level = "LEVEL 5 – NON-URGENT";

//     // 🔴 LEVEL 1 – CRITICAL
//     if (
//       Number(spo2) > 0 && Number(spo2) < 90 ||
//       Number(hr) > 130 ||
//       Number(sys) > 0 && Number(sys) < 90 ||
//       redFlags.seizure ||
//       redFlags.trauma
//     ) {
//       level = "LEVEL 1 – CRITICAL";
//     }

//     // 🟠 LEVEL 2 – EMERGENT
//     else if (
//       redFlags.chestPain ||
//       redFlags.hypoxia ||
//       Number(temp) >= 39 ||
//       Number(rr) > 25
//     ) {
//       level = "LEVEL 2 – EMERGENT";
//     }

//     // 🟡 LEVEL 3 – URGENT
//     else if (
//       Number(hr) > 100 ||
//       Number(rr) > 20 ||
//       Number(temp) > 38
//     ) {
//       level = "LEVEL 3 – URGENT";
//     }

//     // 🟢 LEVEL 4 – SEMI-URGENT
//     else {
//       level = "LEVEL 4 – SEMI-URGENT";
//     }

//     setAiLevel(level);
//     setTriage(level.split("–")[0].trim());

//   }, [vitals, redFlags]);

//   return (
//     <div className="emr-wrapper">

//       {/* ================= TABS ================= */}
//       <div className="tabs">
//         <button
//           className={tab === "notes" ? "active" : ""}
//           onClick={() => setTab("notes")}
//         >
//           Clinical Notes
//         </button>

//         <button
//           className={tab === "vitals" ? "active" : ""}
//           onClick={() => setTab("vitals")}
//         >
//           Vitals
//         </button>

//          <button
//   className={tab === "CPOE" ? "active" : ""}
//   onClick={() => setTab("CPOE")}
// >
//   CPOE
// </button>
 

//       </div>
     

//       {/* ================= CLINICAL NOTES ================= */}
//       {tab === "notes" && (
//         <div className="card">
//           <label>Chief Complaint</label>
//           <input />

//           <label>History of Present Illness</label>
//           <textarea />

//           <label>Assessment</label>
//           <textarea />

//           <label>Plan</label>
//           <textarea />
//         </div>
//       )}

//       {/* ================= VITALS ================= */}
//       {tab === "vitals" && (
//         <div className="card">

//           <h3>Vital Signs</h3>

//           <div className="grid">
//             <input placeholder="Heart Rate 60–100 bpm"
//               onChange={e => setVitals({ ...vitals, hr: e.target.value })} />

//             <input placeholder="BP Systolic 90–120 mmHg"
//               onChange={e => setVitals({ ...vitals, sys: e.target.value })} />

//             <input placeholder="BP Diastolic 60–80 mmHg"
//               onChange={e => setVitals({ ...vitals, dia: e.target.value })} />

//             <input placeholder="Respiratory Rate 12–20 /min"
//               onChange={e => setVitals({ ...vitals, rr: e.target.value })} />

//             <input placeholder="SpO₂ 95–100 %"
//               onChange={e => setVitals({ ...vitals, spo2: e.target.value })} />

//             <input placeholder="Temperature 36.5–37.5 °C"
//               onChange={e => setVitals({ ...vitals, temp: e.target.value })} />
//           </div>

//           {/* ===== RED FLAGS ===== */}
//           <h3>Red Flags Detected</h3>
//           <div className="checks">
//             {Object.keys(redFlags).map((key) => (
//               <label key={key}>
//                 <input
//                   type="checkbox"
//                   checked={redFlags[key]}
//                   onChange={() =>
//                     setRedFlags({ ...redFlags, [key]: !redFlags[key] })
//                   }
//                 />
//                 {key}
//               </label>
//             ))}
//           </div>

//           {/* ===== AI RESULT ===== */}
//           <div className="ai-box">
//             <h3>AI Suggested Level</h3>
//             <strong>{aiLevel}</strong>
//           </div>

//           {/* ===== TRIAGE BUTTONS WITH LABEL ===== */}
//           <h3>Triage Level</h3>

//           <div className="triage">
//             <button className={triage === "LEVEL 1" ? "active red" : "red"}>
//               LEVEL 1 – CRITICAL
//             </button>

//             <button className={triage === "LEVEL 2" ? "active orange" : "orange"}>
//               LEVEL 2 – EMERGENT
//             </button>

//             <button className={triage === "LEVEL 3" ? "active yellow" : "yellow"}>
//               LEVEL 3 – URGENT
//             </button>

//             <button className={triage === "LEVEL 4" ? "active green" : "green"}>
//               LEVEL 4 – SEMI-URGENT
//             </button>

//             <button className={triage === "LEVEL 5" ? "active blue" : "blue"}>
//               LEVEL 5 – NON-URGENT
//             </button>
//           </div>

//           {/* ===== ISOLATION ===== */}
//           <h3>Isolation</h3>
//           <div className="checks">
//             <label><input type="checkbox" /> Droplet</label>
//             <label><input type="checkbox" /> Contact</label>
//             <label><input type="checkbox" /> None</label>
//           </div>

//           <label>Nurse Name</label>
//           <input placeholder="Enter nurse name" />

//         </div>
//       )}

//       {/* ================= FOOTER ================= */}
//       <div className="footer-btns">
//         <button className="draft">Save Draft</button>
//         <button className="complete">Complete Visit</button>
//       </div>
     
    
     
      

//     </div>
//   );
// }



// import React, { useState, useEffect } from "react";
// import "./EMR.css";

// export default function EMR() {

//   const [tab, setTab] = useState("notes");
//   /* ================= PATIENT HEADER ================= */
//   const [patientInfo, setPatientInfo] = useState({
//     name: "",
//     age: "",
//     mrn: "",
//     encounter: "",
//     allergies: "",
//     photo: ""
//   });
//   /* ===== PHOTO UPLOAD ADD ===== */
// const handlePhotoChange = (e) => {
//   const file = e.target.files[0];
//   if (!file) return;

//   setPatientInfo({
//     ...patientInfo,
//     photo: URL.createObjectURL(file)
//   });
// };

//   const handleMRNBlur = async () => {
//     if (!patientInfo.mrn) return;

//     try {
//       const res = await fetch(`/api/patient/${patientInfo.mrn}`);
//       if (res.ok) {
//         const data = await res.json();
//         setPatientInfo({
//           name: data.name,
//           age: data.age,
//           mrn: data.mrn,
//           encounter: data.encounter,
//           allergies: data.allergies,
//           photo: data.photo
//         });
//       }
//     } catch (err) {
//       console.log("MRN not found");
//     }
//   };
 

//   /* ================= VITALS ================= */
//   const [vitals, setVitals] = useState({
//     hr: "", sys: "", dia: "", rr: "", spo2: "", temp: ""
//   });

//   const [redFlags, setRedFlags] = useState({
//     chestPain: false,
//     hypoxia: false,
//     trauma: false,
//     seizure: false
//   });

//   const [aiLevel, setAiLevel] = useState("LEVEL 5 – NON-URGENT");
//   const [triage, setTriage] = useState("LEVEL 5");

//   useEffect(() => {
//     const { hr, sys, rr, spo2, temp } = vitals;

//     let level = "LEVEL 5 – NON-URGENT";

//     if (
//       Number(spo2) > 0 && Number(spo2) < 90 ||
//       Number(hr) > 130 ||
//       Number(sys) > 0 && Number(sys) < 90 ||
//       redFlags.seizure ||
//       redFlags.trauma
//     ) level = "LEVEL 1 – CRITICAL";

//     else if (
//       redFlags.chestPain ||
//       redFlags.hypoxia ||
//       Number(temp) >= 39 ||
//       Number(rr) > 25
//     ) level = "LEVEL 2 – EMERGENT";

//     else if (
//       Number(hr) > 100 ||
//       Number(rr) > 20 ||
//       Number(temp) > 38
//     ) level = "LEVEL 3 – URGENT";

//     else level = "LEVEL 4 – SEMI-URGENT";

//     setAiLevel(level);
//     setTriage(level.split("–")[0].trim());

//   }, [vitals, redFlags]);

//   /* ================= CPOE ================= */
//   const [cpoeTab, setCpoeTab] = useState("med");

//   return (
//     <div className="emr-wrapper">

//       {/* ================= HEADER ================= */}
//       <div className="emr-header">
//         <div className="profile">
//           <label>
//   <img
//     src={patientInfo.photo || "https://via.placeholder.com/80"}
//     alt="patient"
//   />
//   <input
//     type="file"
//     accept="image/*"
//     capture="environment"
//     hidden
//     onChange={handlePhotoChange}
//   />
// </label>
//           <div>
//             <input
//               placeholder="Patient Name"
//               value={patientInfo.name}
//               onChange={e => setPatientInfo({ ...patientInfo, name: e.target.value })}
//             />
//             <div className="sub">
//               <input
//                 placeholder="Age"
//                 value={patientInfo.age}
//                 onChange={e => setPatientInfo({ ...patientInfo, age: e.target.value })}
//               />
//               <input
//                 placeholder="MRN"
//                 value={patientInfo.mrn}
//                 onBlur={handleMRNBlur}
//                 onChange={e => setPatientInfo({ ...patientInfo, mrn: e.target.value })}
//               />
//               <input
//                 placeholder="Encounter No"
//                 value={patientInfo.encounter}
//                 onChange={e => setPatientInfo({ ...patientInfo, encounter: e.target.value })}
//               />
//               <input
//                 placeholder="Allergies"
//                 value={patientInfo.allergies}
//                 onChange={e => setPatientInfo({ ...patientInfo, allergies: e.target.value })}
//               />
//             </div>
//           </div>
//         </div>
//       </div>

//       {/* ================= BODY ================= */}
//       <div className="emr-body">

//         {/* ===== TABS ===== */}
//         <div className="tabs">
//           <button className={tab === "notes" ? "active" : ""} onClick={() => setTab("notes")}>Clinical Notes</button>
//           <button className={tab === "vitals" ? "active" : ""} onClick={() => setTab("vitals")}>Vitals</button>
//           <button className={tab === "cpoe" ? "active" : ""} onClick={() => setTab("cpoe")}>CPOE</button>
//         </div>

//         {/* ================= CLINICAL NOTES ================= */}
//         {tab === "notes" && (
//           <div className="emrcard">
//             <label>Chief Complaint</label>
//             <input />
//             <label>History of Present Illness</label>
//             <textarea />
//             <label>Assessment</label>
//             <textarea />
//             <label>Plan</label>
//             <textarea />
//           </div>
//         )}

//         {/* ================= VITALS ================= */}
//         {tab === "vitals" && (
//           <div className="card">
//             <h3>Vital Signs</h3>

//             <div className="grid">
//               <input placeholder="Heart Rate" onChange={e => setVitals({ ...vitals, hr: e.target.value })} />
//               <input placeholder="BP Systolic" onChange={e => setVitals({ ...vitals, sys: e.target.value })} />
//               <input placeholder="BP Diastolic" onChange={e => setVitals({ ...vitals, dia: e.target.value })} />
//               <input placeholder="Respiratory Rate" onChange={e => setVitals({ ...vitals, rr: e.target.value })} />
//               <input placeholder="SpO₂" onChange={e => setVitals({ ...vitals, spo2: e.target.value })} />
//               <input placeholder="Temperature" onChange={e => setVitals({ ...vitals, temp: e.target.value })} />
//             </div>

//             <h3>Red Flags</h3>
//             <div className="checks">
//               {Object.keys(redFlags).map(key => (
//                 <label key={key}>
//                   <input
//                     type="checkbox"
//                     checked={redFlags[key]}
//                     onChange={() => setRedFlags({ ...redFlags, [key]: !redFlags[key] })}
//                   />
//                   {key}
//                 </label>
//               ))}
//             </div>

//             <div className="ai-box">
//               <h3>AI Suggested Level</h3>
//               <strong>{aiLevel}</strong>
//             </div>

//             <h3>Triage Level</h3>
//             <div className="triage">
//               <button className={triage === "LEVEL 1" ? "active" : ""}>LEVEL 1 – CRITICAL</button>
//               <button className={triage === "LEVEL 2" ? "active" : ""}>LEVEL 2 – EMERGENT</button>
//               <button className={triage === "LEVEL 3" ? "active" : ""}>LEVEL 3 – URGENT</button>
//               <button className={triage === "LEVEL 4" ? "active" : ""}>LEVEL 4 – SEMI-URGENT</button>
//               <button className={triage === "LEVEL 5" ? "active" : ""}>LEVEL 5 – NON-URGENT</button>
//             </div>

//             <h3>Isolation</h3>
//             <div className="checks">
//               <label><input type="checkbox" /> Droplet</label>
//               <label><input type="checkbox" /> Contact</label>
//               <label><input type="checkbox" /> None</label>
//             </div>

//             <label>Nurse Name</label>
//             <input placeholder="Enter nurse name" />
//           </div>
//         )}

//         {/* ================= CPOE ================= */}
//         {tab === "cpoe" && (
//           <div className="card">

//             <div className="tabs">
//               <button className={cpoeTab === "med" ? "active" : ""} onClick={() => setCpoeTab("med")}>Medications</button>
//               <button className={cpoeTab === "lab" ? "active" : ""} onClick={() => setCpoeTab("lab")}>Lab / Radiology</button>
//               <button className={cpoeTab === "proc" ? "active" : ""} onClick={() => setCpoeTab("proc")}>Procedures</button>
//             </div>

//             {cpoeTab === "med" && (
//               <>
//              <div className="med-grid">

//   <input placeholder="Medication" />

//   {/* DOSAGE DROPDOWN */}
//   <select>
//     <option>Dosage</option>
//     <option>2.5 ml</option>
//     <option>5 ml</option>
//     <option>10 ml</option>
//     <option>20 ml</option>
//     <option>50 mg</option>
//     <option>100 mg</option>
//   </select>

//   {/* PRIORITY DROPDOWN */}
//   <select>
//     <option>Priority</option>
//     <option>Routine</option>
//     <option>Urgent</option>
//     <option>STAT</option>
//   </select>

//   <input type="date" />

// </div>

//                 <div className="cds-alert">
//                   ⚠ Drug Interaction Alert
//                 </div>

//                 <div className="med-actions">
//                   <button className="draft">Cancel</button>
//                   <button className="complete">Add Order</button>
//                 </div>

//                 <table className="med-table">
//                   <thead>
//                     <tr>
//                       <th>Type</th>
//                       <th>Name</th>
//                       <th>Status</th>
//                       <th>Action</th>
//                     </tr>
//                   </thead>
//                   <tbody>
//                     <tr>
//                       <td>Medication</td>
//                       <td>Atorvastatin</td>
//                       <td>ACTIVE</td>
//                       <td>View | Edit | Cancel</td>
//                     </tr>
//                   </tbody>
//                 </table>
//               </>
//             )}

//           </div>
//         )}

//         {/* ================= FOOTER ================= */}
//         <div className="footer-btns">
//           <button className="draft">Save Draft</button>
//           <button className="complete">Complete Visit</button>
//         </div>

//       </div>
//     </div>
//   );
// }
// import React, { useState, useEffect } from "react";
// import "./EMR.css";
// import Header from "./components/Header";
// import Tabs from "./components/Tab";
// import ClinicalNotes from "./components/ClinicNotes";
// import Vitals from "./components/Vitals";
// import CPOE from "./components/CPOE";

// export default function EMR() {

//   const [tab, setTab] = useState("notes");
//   /* ================= PATIENT HEADER ================= */
//   const [patientInfo, setPatientInfo] = useState({
//     name: "",
//     age: "",
//     mrn: "",
//     encounter: "",
//     allergies: "",
//     photo: ""
//   });
//   /* ===== PHOTO UPLOAD ADD ===== */
// const handlePhotoChange = (e) => {
//   const file = e.target.files[0];
//   if (!file) return;

//   setPatientInfo({
//     ...patientInfo,
//     photo: URL.createObjectURL(file)
//   });
// };

//   const handleMRNBlur = async () => {
//     if (!patientInfo.mrn) return;

//     try {
//       const res = await fetch(`/api/patient/${patientInfo.mrn}`);
//       if (res.ok) {
//         const data = await res.json();
//         setPatientInfo({
//           name: data.name,
//           age: data.age,
//           mrn: data.mrn,
//           encounter: data.encounter,
//           allergies: data.allergies,
//           photo: data.photo
//         });
//       }
//     } catch (err) {
//       console.log("MRN not found");
//     }
//   };
 

//   /* ================= VITALS ================= */
//   const [vitals, setVitals] = useState({
//     hr: "", sys: "", dia: "", rr: "", spo2: "", temp: ""
//   });

//   const [redFlags, setRedFlags] = useState({
//     chestPain: false,
//     hypoxia: false,
//     trauma: false,
//     seizure: false
//   });

//   const [aiLevel, setAiLevel] = useState("LEVEL 5 – NON-URGENT");
//   const [triage, setTriage] = useState("LEVEL 5");

//   useEffect(() => {
//     const { hr, sys, rr, spo2, temp } = vitals;

//     let level = "LEVEL 5 – NON-URGENT";

//     if (
//       Number(spo2) > 0 && Number(spo2) < 90 ||
//       Number(hr) > 130 ||
//       Number(sys) > 0 && Number(sys) < 90 ||
//       redFlags.seizure ||
//       redFlags.trauma
//     ) level = "LEVEL 1 – CRITICAL";

//     else if (
//       redFlags.chestPain ||
//       redFlags.hypoxia ||
//       Number(temp) >= 39 ||
//       Number(rr) > 25
//     ) level = "LEVEL 2 – EMERGENT";

//     else if (
//       Number(hr) > 100 ||
//       Number(rr) > 20 ||
//       Number(temp) > 38
//     ) level = "LEVEL 3 – URGENT";

//     else level = "LEVEL 4 – SEMI-URGENT";

//     setAiLevel(level);
//     setTriage(level.split("–")[0].trim());

//   }, [vitals, redFlags]);

//   /* ================= CPOE ================= */
//   const [cpoeTab, setCpoeTab] = useState("med");
// return (
//   <div className="emr-wrapper">

//     <Header 
//       patientInfo={patientInfo}
//       setPatientInfo={setPatientInfo}
//       handlePhotoChange={handlePhotoChange}
//       handleMRNBlur={handleMRNBlur}
//     />

//     <div className="emr-body">

//       <Tabs tab={tab} setTab={setTab} />

//       {tab==="notes" && <ClinicalNotes />}
//       {tab==="vitals" && <Vitals 
//         vitals={vitals}
//         setVitals={setVitals}
//         redFlags={redFlags}
//         setRedFlags={setRedFlags}
//         aiLevel={aiLevel}
//         triage={triage}
//       />}
//       {tab==="cpoe" && <CPOE />}

//     </div>

//   </div>
// );
// }