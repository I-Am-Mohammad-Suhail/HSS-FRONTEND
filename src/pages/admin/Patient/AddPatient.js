// import { useState, useEffect } from "react";
// import "./AddPatient.css";

// const countryCityMap = {
//   India: ["Delhi", "Mumbai", "Bangalore", "Chennai","Hydrabad","Pune","Indore"],
//   UAE: ["Dubai", "Abu Dhabi", "Sharjah","Jeddah"],
//   USA: ["New York", "Chicago","Wasington","London"],
// };

// const countryCodes = [
//   { code: "+91", name: "India" },
//   { code: "+971", name: "UAE" },
//   { code: "+1", name: "USA" },
//   { code: "+44", name: "UK" },
//   { code: "+61", name: "Australia" },
// ];

// export default function AddPatient() {
//   const [dob, setDob] = useState("");
//   const [age, setAge] = useState("");
//   const [country, setCountry] = useState("");
//   const [cityList, setCityList] = useState([]);
//   const [photo, setPhoto] = useState(null);

//   const [countryCode, setCountryCode] = useState("+91");
//   const [emgCountryCode, setEmgCountryCode] = useState("+91");

//   const [patientIdNumber, setPatientIdNumber] = useState("");
//   const [emergencyIdNumber, setEmergencyIdNumber] = useState("");

  
//   const [patientIdExpiry, setPatientIdExpiry] = useState("");
//   const [emergencyIdExpiry, setEmergencyIdExpiry] = useState("");


//   useEffect(() => {
//     if (!dob) return;
//     const birth = new Date(dob);
//     const today = new Date();
//     let a = today.getFullYear() - birth.getFullYear();
//     const m = today.getMonth() - birth.getMonth();
//     if (m < 0 || (m === 0 && today.getDate() < birth.getDate())) a--;
//     setAge(a);
//   }, [dob]);

//   const handleCountryChange = (value) => {
//     setCountry(value);
//     setCityList(countryCityMap[value] || []);
//   };

//   // temporary scan simulation
//   const handleScan = (type) => {
//     const fakeId = Math.floor(100000000000 + Math.random() * 900000000000);
//     if (type === "patient") setPatientIdNumber(fakeId);
//     if (type === "emergency") setEmergencyIdNumber(fakeId);
//   };

//   return (
    
//       <div className="patient-page">

//         {/* HEADER */}
//         <div className="patient-header">
//           <div>
//             <h2>Patient Registration</h2>
//           </div>

//           {/* PHOTO */}
//           <div className="photo-box">
//             {photo ? (
//               <img src={photo} alt="patient" />
//             ) : (
//               <span>Upload Photo</span>
//             )}

//             <input
//               type="file"
//               accept="image/*"
//               capture="environment"
//               onChange={(e) =>
//                 setPhoto(URL.createObjectURL(e.target.files[0]))
//               }
//             />
//           </div>
//         </div>

//         <div className="patient-card">
    
//           <section>
//   <h3>Patient Information</h3>

//   {/* ---------- ROW 1 ---------- */}
//   <div className="grid">

//     <div>
//       <label>Medical Record Number (MRN)</label>
//       <input placeholder="MRN123" />
//     </div>

//     <div className="span-2">
//       <label>Display Name</label>
//       <input placeholder="John A Doe" />
//     </div>

//   </div>

//   {/* ---------- ROW 2 ---------- */}
//   <div className="grid">

//     <div>
//       <label>Title</label>
//       <select>
//         <option>Mr</option>
//         <option>Mrs</option>
//         <option>Miss</option>

//       </select>
//     </div>

//     <div>
//       <label>First Name</label>
//       <input />
//     </div>

//     <div>
//       <label>Middle Name</label>
//       <input />
//     </div>

//     <div>
//       <label>Last Name</label>
//       <input />
//     </div>

//   </div>

//   {/* ---------- ROW 3 ---------- */}
//   <div className="grid">

//     <div>
//       <label>Date of Birth</label>
//       <input
//         type="date"
//         value={dob}
//         onChange={(e) => setDob(e.target.value)}
//       />
//     </div>

//     <div>
//       <label>Age</label>
//       <input value={age} readOnly />
//     </div>

//     <div>
//       <label>Gender</label>
//       <select>
//         <option>Male</option>
//         <option>Female</option>
//       </select>
//     </div>

//     <div>
//       <label>Marital Status</label>
//       <select>
//         <option>Single</option>
//         <option>Married</option>
//       </select>
//     </div>

//   </div>
// </section>


//           {/* ================= CONTACT ================= */}
//           <section>
//             <h3>Contact Details</h3>
//             <div className="grid">

//               <div>
//                 <label>Address</label>
//                 <input />
//               </div>

//               <div>
//                 <label>Country</label>
//                 <select
//                   value={country}
//                   onChange={(e) => handleCountryChange(e.target.value)}
//                 >
//                   <option value="">Select Country</option>
//                   {Object.keys(countryCityMap).map((c) => (
//                     <option key={c}>{c}</option>
//                   ))}
//                 </select>
//               </div>

//               <div>
//                 <label>City</label>
//                 <select>
//                   <option>Select City</option>
//                   {cityList.map((city) => (
//                     <option key={city}>{city}</option>
//                   ))}
//                 </select>
//               </div>

//               <div>
//                 <label>Country Code</label>
//                 <select
//                   value={countryCode}
//                   onChange={(e) => setCountryCode(e.target.value)}
//                 >
//                   {countryCodes.map((c) => (
//                     <option key={c.code} value={c.code}>
//                       {c.name} ({c.code})
//                     </option>
//                   ))}
//                 </select>
//               </div>

//               <div>
//                 <label>Mobile Number</label>
//                 <input placeholder="Mobile number" />
//               </div>

//             </div>
//           </section>

//           {/* ================= IDENTIFICATION ================= */}
//           <section>
//             <h3>Patient Identification</h3>
//             <div className="grid">

//               <div>
//                 <label>ID Type</label>
//                 <select>
//                   <option>Aadhaar Card</option>
//                   <option>PAN Card</option>
//                   <option>Voter ID</option>
//                   <option>Passport</option>
//                   <option>Driving License</option>
//                 </select>
//               </div>

//               <div>
//                 <label>ID Number</label>
//                 <input value={patientIdNumber} />
//               </div>
//                 <div>
//                 <label>ID Expiry Date</label>
//                 <input
//                   type="date"
//                   value={emergencyIdExpiry}
//                   onChange={(e) => setEmergencyIdExpiry(e.target.value)}
//                 />
//               </div>

//               <div>
//                 <label>Scan ID</label>
//                 <button
//                   type="button"
//                   className="scan-btn"
//                   onClick={() => handleScan("patient")}
//                 >
//                   Scan ID Card
//                 </button>
//               </div>

//             </div>
//           </section>

//           {/* ================= EMERGENCY ================= */}
//           <section>
//             <h3>Emergency Contact</h3>
//             <div className="grid">

//               <div>
//                 <label>First Name</label>
//                 <input />
//               </div>

//               <div>
//                 <label>Last Name</label>
//                 <input />
//               </div>

//               <div>
//                 <label>Relationship</label>
//                 <select>
//                   <option>Father</option>
//                   <option>Mother</option>
//                   <option>Spouse</option>
//                   <option>Brother</option>
//                   <option>Sister</option>
//                 </select>
//               </div>

//               <div>
//                 <label>Country Code</label>
//                 <select
//                   value={emgCountryCode}
//                   onChange={(e) => setEmgCountryCode(e.target.value)}
//                 >
//                   {countryCodes.map((c) => (
//                     <option key={c.code} value={c.code}>
//                       {c.name} ({c.code})
//                     </option>
//                   ))}
//                 </select>
//               </div>

//               <div>
//                 <label>Mobile Number</label>
//                 <input />
//               </div>

//               <div>
//                 <label>ID Type</label>
//                 <select>
//                   <option>Aadhaar</option>
//                   <option>PAN</option>
//                   <option>Voter ID</option>
//                 </select>
//               </div>

//               <div>
//                 <label>ID Number</label>
//                 <input value={emergencyIdNumber} />
//               </div>
//                 <div>
//                 <label>ID Expiry Date</label>
//                 <input
//                   type="date"
//                   value={emergencyIdExpiry}
//                   onChange={(e) => setEmergencyIdExpiry(e.target.value)}
//                 />
//               </div>

//               <div>
//                 <label>Scan ID</label>
//                 <button
//                   type="button"
//                   className="scan-btn"
//                   onClick={() => handleScan("emergency")}
//                 >
//                   Scan ID
//                 </button>
//               </div>

//             </div>
//           </section>

//           <div className="actions">
//             <button className="submit">Register Patient</button>
//           </div>

//         </div>
//       </div>
    
//   );
// }
  


import { useState, useEffect } from "react";
import "./AddPatient.css";

const countryCityMap = {
  India: ["Delhi", "Mumbai", "Pune"],
  UAE: ["Dubai", "Abu Dhabi", "Sharjah"],
  USA: ["New York", "Chicago"],
};

const countryCodes = {
  India: "+91",
  UAE: "+971",
  USA: "+1",
};

const idTypes = ["Aadhaar", "PAN", "Passport"];

let mrnCounter = 1;

export default function AddPatient() {
  const [mrn, setMrn] = useState("");
  const [dob, setDob] = useState("");
  const [age, setAge] = useState("");
  const [country, setCountry] = useState("");
  const [cities, setCities] = useState([]);
  const [code, setCode] = useState("");
  const [showPopup, setShowPopup] = useState(false);

  const [primaryId, setPrimaryId] = useState({ number: "", expiry: "" });
  const [secondaryId, setSecondaryId] = useState({ number: "", expiry: "" });

  // AGE
  useEffect(() => {
    if (!dob) return;
    const birth = new Date(dob);
    const today = new Date();
    setAge(today.getFullYear() - birth.getFullYear());
  }, [dob]);

  // COUNTRY CHANGE
  const handleCountry = (value) => {
    setCountry(value);
    setCities(countryCityMap[value] || []);
    setCode(countryCodes[value] || "");
  };

  // MRN
  const generateMRN = () => {
    const id = "MRN" + String(mrnCounter).padStart(3, "0");
    mrnCounter++;
    return id;
  };

  const handleSubmit = () => {
    const newMrn = generateMRN();
    setMrn(newMrn);
    setShowPopup(true);
  };

  return (
    <div className="container">

      <div className="header">
        <h2>Patient Registration</h2>

        <div className="photo-box">
          <span>Upload</span>
          <input type="file" />
        </div>
      </div>

      <div className="card">

        {/* PATIENT */}
        <h3>Patient Info</h3>

        <div className="grid-3">
          <input value={mrn} placeholder="MRN" readOnly />
          <input className="span-2" placeholder="Display Name" />
        </div>

        <div className="grid-4">
          <select><option>Mr</option></select>
          <input placeholder="First Name" />
          <input placeholder="Middle Name" />
          <input placeholder="Last Name" />
        </div>

        <div className="grid-4">
          <input type="date" onChange={(e)=>setDob(e.target.value)} />
          <input value={age} placeholder="Age" readOnly />
          <select><option>Male</option></select>
          <select><option>Single</option></select>
        </div>

        {/* CONTACT */}
        <h3>Contact</h3>

        <div className="grid-1">
          <input placeholder="Address" />
        </div>

        <div className="grid-2">
          <select onChange={(e)=>handleCountry(e.target.value)}>
            <option>Select Country</option>
            {Object.keys(countryCityMap).map(c=> <option key={c}>{c}</option>)}
          </select>

          <select>
            <option>Select City</option>
            {cities.map(c=> <option key={c}>{c}</option>)}
          </select>
        </div>

        <div className="grid-2">
          <input value={code} placeholder="Code" readOnly />
          <input placeholder="Mobile" />
        </div>

        <div className="grid-3">
          <input placeholder="Nationality" />
          <input placeholder="Religion" />
          <label className="vip"><input type="checkbox" /> VIP</label>
        </div>

        {/* IDENTIFICATION */}
        <h3>Identification</h3>

        <div className="grid-4">
          <select>{idTypes.map(i=><option key={i}>{i}</option>)}</select>
          <input placeholder="ID Number" />
          <button>Scan</button>
          <input
            type="date"
            onChange={(e)=>setPrimaryId({...primaryId, expiry:e.target.value})}
          />
        </div>

        <div className="grid-4">
          <select>{idTypes.map(i=><option key={i}>{i}</option>)}</select>
          <input placeholder="ID Number" />
          <button>Scan</button>
          <input
            type="date"
            onChange={(e)=>setSecondaryId({...secondaryId, expiry:e.target.value})}
          />
        </div>

        {/* EMERGENCY */}
        <h3>Emergency</h3>

        <div className="grid-2">
          <input placeholder="Full Name" />
          <input placeholder="Relationship" />
        </div>

        <div className="grid-4">
          <select>{idTypes.map(i=><option key={i}>{i}</option>)}</select>
          <input placeholder="ID Number" />
          <button>Scan</button>
          <input type="date" />
        </div>

        <button className="submit" onClick={handleSubmit}>
          Register Patient
        </button>

      </div>

      {showPopup && (
        <div className="popup">
          <div className="popup-box">
            <h2>Patient Registered</h2>
            <p>MRN Generated Successfully</p>
            <h3>{mrn}</h3>
            <button onClick={()=>setShowPopup(false)}>OK</button>
          </div>
        </div>
      )}

    </div>
  );
}