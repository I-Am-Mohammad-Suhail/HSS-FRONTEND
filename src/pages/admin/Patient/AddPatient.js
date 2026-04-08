
import { useState, useEffect, useRef } from "react";
import "./AddPatient.css";

const countryCityMap = {
  India: ["Delhi", "Mumbai", "Bangalore", "Hyderabad", "Chennai", "Kolkata", "Pune", "Ahmedabad", "Jaipur", "Indore"],

  USA: ["New York", "Los Angeles", "Chicago", "Houston", "Phoenix", "Philadelphia", "San Antonio", "San Diego", "Dallas", "San Jose"],

  UK: ["London", "Manchester", "Birmingham", "Liverpool", "Leeds", "Glasgow", "Sheffield", "Edinburgh", "Bristol", "Leicester"],

  Canada: ["Toronto", "Vancouver", "Montreal", "Calgary", "Ottawa", "Edmonton", "Winnipeg", "Quebec City", "Hamilton", "Kitchener"],

  Australia: ["Sydney", "Melbourne", "Brisbane", "Perth", "Adelaide", "Gold Coast", "Canberra", "Newcastle", "Wollongong", "Hobart"],

  Germany: ["Berlin", "Munich", "Hamburg", "Frankfurt", "Cologne", "Stuttgart", "Dusseldorf", "Leipzig", "Dortmund", "Essen"],

  France: ["Paris", "Marseille", "Lyon", "Toulouse", "Nice", "Nantes", "Strasbourg", "Montpellier", "Bordeaux", "Lille"],

  China: ["Beijing", "Shanghai", "Guangzhou", "Shenzhen", "Chengdu", "Chongqing", "Wuhan", "Hangzhou", "Xi'an", "Nanjing"],

  Japan: ["Tokyo", "Osaka", "Yokohama", "Nagoya", "Sapporo", "Fukuoka", "Kobe", "Kyoto", "Hiroshima", "Sendai"],

  Russia: ["Moscow", "Saint Petersburg", "Novosibirsk", "Yekaterinburg", "Kazan", "Nizhny Novgorod", "Chelyabinsk", "Samara", "Omsk", "Rostov"],

  UAE: ["Dubai", "Abu Dhabi", "Sharjah", "Ajman", "Ras Al Khaimah", "Fujairah", "Umm Al Quwain", "Al Ain", "Khor Fakkan", "Dibba"],

  SaudiArabia: ["Riyadh", "Jeddah", "Mecca", "Medina", "Dammam", "Khobar", "Taif", "Tabuk", "Abha", "Hail"],

  Pakistan: ["Karachi", "Lahore", "Islamabad", "Rawalpindi", "Faisalabad", "Multan", "Peshawar", "Quetta", "Sialkot", "Hyderabad"],

  Bangladesh: ["Dhaka", "Chittagong", "Khulna", "Rajshahi", "Sylhet", "Barisal", "Rangpur", "Mymensingh", "Comilla", "Narayanganj"],

  Brazil: ["Sao Paulo", "Rio de Janeiro", "Brasilia", "Salvador", "Fortaleza", "Belo Horizonte", "Manaus", "Curitiba", "Recife", "Porto Alegre"],

  SouthAfrica: ["Johannesburg", "Cape Town", "Durban", "Pretoria", "Port Elizabeth", "Bloemfontein", "East London", "Polokwane", "Nelspruit", "Kimberley"],

  Italy: ["Rome", "Milan", "Naples", "Turin", "Palermo", "Genoa", "Bologna", "Florence", "Venice", "Verona"],

  Spain: ["Madrid", "Barcelona", "Valencia", "Seville", "Zaragoza", "Malaga", "Murcia", "Palma", "Bilbao", "Alicante"],

  Mexico: ["Mexico City", "Guadalajara", "Monterrey", "Puebla", "Tijuana", "Leon", "Juarez", "Zapopan", "Merida", "Cancun"],

  Indonesia: ["Jakarta", "Surabaya", "Bandung", "Medan", "Bekasi", "Tangerang", "Depok", "Semarang", "Palembang", "Makassar"]
};

const countryCodes = {
  India: "+91",
  USA: "+1",
  UK: "+44",
  Canada: "+1",
  Australia: "+61",
  Germany: "+49",
  France: "+33",
  China: "+86",
  Japan: "+81",
  Russia: "+7",
  UAE: "+971",
  SaudiArabia: "+966",
  Pakistan: "+92",
  Bangladesh: "+880",
  Brazil: "+55",
  SouthAfrica: "+27",
  Italy: "+39",
  Spain: "+34",
  Mexico: "+52",
  Indonesia: "+62"
};
const phoneLengthByCountry = {
  India: 10,
  USA: 10,
  UK: 10,
  UAE: 9,
  Pakistan: 10,
  Bangladesh: 10,
};

const idTypes = ["Aadhaar CARD", "PAN CARD", "Passport", "VOTER ID", "DRIVING LICENSE"];

export default function AddPatient() {

  const [mrn, setMrn] = useState("");
  const [dob, setDob] = useState("");
  const [age, setAge] = useState("");
  const [showPopup, setShowPopup] = useState(false);

  // CONTACT
  const [contactCountry, setContactCountry] = useState("");
  const [contactCities, setContactCities] = useState([]);
  const [contactCode, setContactCode] = useState("");

  // EMERGENCY
  const [emergencyCountry, setEmergencyCountry] = useState("");
  const [emergencyCities, setEmergencyCities] = useState([]);
  const [emergencyCode, setEmergencyCode] = useState("");

  const [primaryId, setPrimaryId] = useState({ number: "", expiry: "" });
  const [secondaryId, setSecondaryId] = useState({ number: "", expiry: "" });

  // ✅ PHOTO STATE
  const [photo, setPhoto] = useState(null);

  // ✅ CAMERA STATE
  const [cameraOn, setCameraOn] = useState(false);
  const videoRef = useRef(null);

  // ✅ AGE CALC (FIXED)
  useEffect(() => {
    if (!dob) return;

    const birth = new Date(dob);
    const today = new Date();

    let years = today.getFullYear() - birth.getFullYear();
    let months = today.getMonth() - birth.getMonth();
    let days = today.getDate() - birth.getDate();

    if (days < 0) {
      months--;
      const prevMonth = new Date(today.getFullYear(), today.getMonth(), 0);
      days += prevMonth.getDate();
    }

    if (months < 0) {
      years--;
      months += 12;
    }

    const formattedAge = `${years}Y${String(months).padStart(2, "0")}M${String(days).padStart(2, "0")}D`;

    setAge(formattedAge);
  }, [dob]);
  // CONTACT
  const handleContactCountry = (value) => {
    setContactCountry(value);
    setContactCities(countryCityMap[value] || []);
    setContactCode(countryCodes[value] || "");
  };

  // EMERGENCY
  const handleEmergencyCountry = (value) => {
    setEmergencyCountry(value);
    setEmergencyCities(countryCityMap[value] || []);
    setEmergencyCode(countryCodes[value] || "");
  };
  const validateForm = () => {
    if (!photo) return "Photo is required";

    if (!document.querySelectorAll("select")[0].value) return "Title is required";

    if (!document.querySelector('input[placeholder="First Name"]').value)
      return "First Name is required";

    if (!document.querySelector('input[placeholder="Last Name"]').value)
      return "Last Name is required";

    if (!dob) return "Date of Birth is required";

    const birthDate = new Date(dob);
    const today = new Date();

    if (birthDate > today) {
      return "Future DOB not allowed";
    }

    if (birthDate.getFullYear() < 1900) {
      return "DOB cannot be before 1900";
    }

    if (!document.querySelectorAll("select")[1].value)
      return "Gender is required";

    if (!document.querySelectorAll("select")[2].value)
      return "Marital Status is required";

    if (!contactCountry) return "Country is required";

    if (!document.querySelector('input[placeholder="Mobile"]').value)
      return "Mobile Number is required";

    const mobile = document.querySelectorAll('input[placeholder="Mobile"]')[0].value;

    const requiredLength = phoneLengthByCountry[contactCountry] || 10;

    if (mobile.length !== requiredLength) {
      return `${contactCountry} mobile must be ${requiredLength} digits`;
    }

    if (!document.querySelector('input[placeholder="Nationality"]').value)
      return "Nationality is required";

    if (!document.querySelectorAll("select")[3].value)
      return "Blood Group is required";

    if (!document.querySelectorAll("select")[5].value)
      return "Primary ID Type is required";

    if (!document.querySelectorAll('input[placeholder="Full Name"]')[0].value)
      return "Emergency Full Name is required";

    if (!document.querySelectorAll("input[placeholder='Mobile']")[1]?.value)
      return "Emergency Mobile is required";

    if (!document.querySelectorAll("select")[8]?.value)
      return "Relationship is required";

    return null;
  };

  // MRN
  const handleSubmit = async () => {
    try {

      const error = validateForm();

      if (error) {
        alert(error);
        return;
      }

      const formData = new FormData();

      formData.append("displayName", document.querySelector('input[placeholder="Display Name"]').value);
      formData.append("title", document.querySelectorAll("select")[0].value);
      formData.append("firstName", document.querySelectorAll("input")[2].value);
      formData.append("lastName", document.querySelectorAll("input")[4].value);
      formData.append("dob", dob);
      formData.append("age", age || "");

      // formData.append("contact", JSON.stringify({
      //   address: "Indore",
      //   country,
      //   city: cities[0],
      //   code,
      //   mobile: "9999999999",
      //   nationality: "Indian",
      //   religion: "Hindu",
      //   isVip: false
      // }));
      formData.append("contact", JSON.stringify({
        address: document.querySelector('input[placeholder="Address"]').value,
        country: contactCountry,
        city: document.querySelectorAll("select")[6]?.value || "",
        code: contactCode,
        mobile: document.querySelector('input[placeholder="Mobile"]').value,
        nationality: document.querySelector('input[placeholder="Nationality"]').value,
        religion: document.querySelectorAll("select")[4]?.value || "",
        isVip: document.querySelector('input[type="checkbox"]').checked
      }));

      formData.append("identification", JSON.stringify([
        {
          type: "Aadhaar",
          number: primaryId.number,
          expiry: primaryId.expiry
        }
      ]));

      formData.append("emergency", JSON.stringify({
        name: "Father",
        relationship: "Father"
      }));

      if (photo) {
        formData.append("photo", photo);
      }

      // ✅ DUMMY LOGIC
      const responseData = {
        data: {
          mrn: "MRN" + Math.floor(Math.random() * 10000)
        }
      };

      console.log(responseData);

      setMrn(responseData.data.mrn);

      setShowPopup(true);

    } catch (err) {
      console.log(err);
      alert("Error saving patient");
    }
  };
  // ✅ CAMERA FUNCTION
  const openCamera = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ video: true });
      videoRef.current.srcObject = stream;
      setCameraOn(true);
    } catch (err) {
      alert("Camera permission denied");
    }
  };

  return (
    <div className="patient-container">

      <div className="patient-header">
        <h2>Patient Registration</h2>

        {/* ✅ PHOTO FIX */}


        {/* 
        <div className="photo-box">
          <span className="photo-required">*</span>

          {photo ? <img src={URL.createObjectURL(photo)} alt="preview" /> : <span>Upload</span>}
          <input
            type="file"
            accept="image/*"
            onChange={(e) => {
              if (e.target.files[0]) {
                setPhoto(e.target.files[0]);
              }
            }}
          />
        </div> */}
        <div className="photo-wrapper">
          <span className="photo-required">*</span>

          <div className="photo-box">
            {photo ? (
              <img src={URL.createObjectURL(photo)} alt="preview" />
            ) : (
              <span>Upload</span>
            )}

            <input
              type="file"
              accept="image/*"
              onChange={(e) => {
                if (e.target.files[0]) {
                  setPhoto(e.target.files[0]);
                }
              }}
            />
          </div>
        </div>

      </div>

      <div className="patient-card">

        <h3>Patient Info</h3>
        <div className="patient-grid-3">

          <div>
            <label>MRN</label>
            <input value={mrn} placeholder="MRN" readOnly />
          </div>

          <div className="patient-span-2">
            <label>Display Name</label>
            <input placeholder="Display Name" />
          </div>

        </div>
        <div className="patient-grid-4">

          <div>
            <label>Title <span className="required">*</span></label>
            <select defaultValue="">
              <option value="">Select</option>
              <option value="Mr">Mr</option>
              <option value="Ms">Ms</option>
            </select>
          </div>

          <div>
            <label>First Name <span className="required">*</span></label>
            <input
              placeholder="First Name"
              onInput={(e) => {
                e.target.value = e.target.value.replace(/[^A-Za-z\s]/g, "");
              }}
            />
          </div>

          <div>
            <label>Middle Name</label>
            <input placeholder="Middle Name" />
          </div>

          <div>
            <label>Last Name <span className="required">*</span></label>
            <input
              placeholder="Last Name"
              onInput={(e) => {
                e.target.value = e.target.value.replace(/[^A-Za-z\s]/g, "");
              }}
            />
          </div>

        </div>
        <div className="patient-grid-4">

          <div>
            <label>Date of Birth <span className="required">*</span></label>
            <input
              type="date"
              min="1900-01-01"
              max={new Date().toISOString().split("T")[0]}
              onChange={(e) => setDob(e.target.value)}
            />
          </div>

          <div>
            <label>Age</label>
            <input value={age} placeholder="Age" readOnly />
          </div>

          <div>
            <label>Gender <span className="required">*</span></label>
            <select defaultValue="">
              <option value="">Select Gender</option>
              <option value="Male">Male</option>
              <option value="Female">Female</option>
            </select>
          </div>

          <div>
            <label>Marital Status <span className="required">*</span></label>
            <select defaultValue="">
              <option value="">Select Marital Status</option>
              <option value="Single">Single</option>
              <option value="Married">Married</option>
            </select>
          </div>

        </div>
        <div className="patient-grid-4 align-center">

          <div>
            <label>Blood Group <span className="required">*</span></label>
            <select defaultValue="">
              <option value="">Select Blood Group</option>
              <option value="A+">A+</option>
              <option value="A-">A-</option>
              <option value="B+">B+</option>
              <option value="B-">B-</option>
              <option value="AB+">AB+</option>
              <option value="AB-">AB-</option>
              <option value="O+">O+</option>
              <option value="O-">O-</option>
            </select>
          </div>

          <div>
            <label>Nationality <span className="required">*</span></label>
            <input
              placeholder="Nationality"
              onInput={(e) => {
                e.target.value = e.target.value.replace(/[^A-Za-z\s]/g, "");
              }}
            />
          </div>

          <div>
            <label>Religion</label>
            <select defaultValue="">
              <option value="">Select Religion</option>
              <option value="Hindu">Hindu</option>
              <option value="Muslim">Muslim</option>
              <option value="Christian">Christian</option>
              <option value="Sikh">Sikh</option>
            </select>
          </div>
          <div className="vip-field">
            <label>VIP</label>
            <div className="vip-row">
              <label className="switch">
                <input type="checkbox" />
                <span className="slider"></span>
              </label>
            </div>
          </div>

        </div>


        {/* CONTACT */}
        <h3>Contact</h3>

        <div className="patient-grid-1">
          <div>
            <label>Address</label>
            <input placeholder="Address" />
          </div>
        </div>

        <div className="patient-grid-4">

          <div>
            <label>Country <span className="required">*</span></label>
            <select defaultValue="" onChange={(e) => handleContactCountry(e.target.value)}>
              <option value="">Select Country</option>
              {Object.keys(countryCityMap).map(c => (
                <option key={c} value={c}>{c}</option>
              ))}
            </select>
          </div>

          <div>
            <label>City</label>
            <select defaultValue="">
              <option value="">Select City</option>
              {contactCities.map(c => (
                <option key={c} value={c}>{c}</option>
              ))}
            </select>
          </div>

          <div>
            <label>Code</label>
            <input value={contactCode} placeholder="Code" readOnly />
          </div>

          <div>
            <label>Mobile <span className="required">*</span></label>
            <input
              placeholder="Mobile"
              maxLength={phoneLengthByCountry[contactCountry] || 10}
              onInput={(e) => {
                e.target.value = e.target.value.replace(/\D/g, "");
              }}
            />
          </div>

        </div>



        {/* IDENTIFICATION */}
        <h3>Identification</h3>

        {/* PRIMARY ID */}
        <div className="patient-grid-4">

          <div>
            <label>Primary ID Type <span className="required">*</span></label>
            <select defaultValue="">
              <option value="">Select ID Type</option>
              {idTypes.map(i => <option key={i} value={i}>{i}</option>)}
            </select>
          </div>

          <div>
            <label> Primery ID Number</label>
            <input placeholder="ID Number" />
          </div>

          <div>
            <label>Expiry Date</label>
            <input type="date" />
          </div>

          <div>
            <label>Scan</label>
            <button
              className="scan-btn full-width"
              onClick={openCamera}
            >
              📷
            </button>
          </div>

        </div>

        {/* SECONDARY ID */}
        <div className="patient-grid-4">

          <div>
            <label>Secondary ID Type</label>
            <select defaultValue="">
              <option value="">Select ID Type</option>
              {idTypes.map(i => <option key={i} value={i}>{i}</option>)}
            </select>
          </div>

          <div>
            <label>Secondry ID Number</label>
            <input placeholder="ID Number" />
          </div>

          <div>
            <label>Expiry Date</label>
            <input type="date" />
          </div>
          <div>
            <label>Scan</label>
            <button
              className="scan-btn full-width"
              onClick={openCamera}
            >
              📷
            </button>
          </div>

        </div>

        {/* EMERGENCY */}
        <h3>Emergency</h3>

        <div className="patient-grid-2">

          <div>
            <label>Full Name <span className="required">*</span></label>
            <input
              placeholder="Last Name"
              onInput={(e) => {
                e.target.value = e.target.value.replace(/[^A-Za-z\s]/g, "");
              }}
            />
          </div>

          <div>
            <label>Relationship <span className="required">*</span> <span className="required">*</span></label>
            <select defaultValue="">
              <option value="">Select Relationship</option>
              <option value="Father">Father</option>
              <option value="Mother">Mother</option>
              <option value="Spouse">Spouse</option>
            </select>
          </div>

        </div>
        <div className="patient-grid-4">

          <div>
            <label>Country</label>
            <select defaultValue="" onChange={(e) => handleEmergencyCountry(e.target.value)}>
              <option value="">Select Country</option>
              {Object.keys(countryCityMap).map(c => (
                <option key={c} value={c}>{c}</option>
              ))}
            </select>
          </div>

          <div>
            <label>City</label>
            <select defaultValue="">
              <option value="">Select City</option>
              {emergencyCities.map(c => (
                <option key={c} value={c}>{c}</option>
              ))}
            </select>
          </div>

          <div>
            <label>Code</label>
            <input value={emergencyCode} placeholder="Code" readOnly />
          </div>

          <div>
            <label>Mobile <span className="required">*</span></label>
            <input
              placeholder="Mobile"
              maxLength={phoneLengthByCountry[contactCountry] || 10}
              onInput={(e) => {
                e.target.value = e.target.value.replace(/\D/g, "");
              }}
            />
          </div>

        </div>
        <div className="patient-grid-4">

          <div>
            <label>ID Type</label>
            <select defaultValue="">
              <option value="">Select ID Type</option>
              {idTypes.map(i => <option key={i} value={i}>{i}</option>)}
            </select>
          </div>

          <div>
            <label>ID Number</label>
            <input placeholder="ID Number" />
          </div>

          <div>
            <label>Expiry Date</label>
            <input type="date" />
          </div>

          <div>
            <label>Scan</label>
            <button
              className="scan-btn full-width"
              onClick={openCamera}
            >
              📷
            </button>
          </div>

        </div>

        <button className="submit" onClick={handleSubmit}>
          Register Patient
        </button>

      </div>

      {/* ✅ CAMERA MODAL */}
      {cameraOn && (
        <div className="camera-modal">
          <video ref={videoRef} autoPlay></video>
          <button onClick={() => setCameraOn(false)}>Close</button>
        </div>
      )}

      {showPopup && (
        <div className="popup">
          <div className="popup-box">
            <h2>Patient Registered</h2>
            <p>MRN Generated Successfully</p>
            <h3>{mrn}</h3>
            <button onClick={() => setShowPopup(false)}>OK</button>
          </div>
        </div>
      )}

    </div>
  );
}


// import { useState, useEffect, useRef } from "react";
// import "./AddPatient.css";

// const countryCityMap = {
//   India: ["Delhi", "Mumbai", "Pune","Banglore","Hydrabad","Indore"],
//   UAE: ["Dubai", "Abu Dhabi", "Sharjah","Jeddah","Saudi Arebia"],
//   USA: ["New York", "Chicago","London"],
// };

// const countryCodes = {
//   India: "+91",
//   UAE: "+971",
//   USA: "+1",
// };

// const idTypes = ["Aadhaar CARD", "PAN CARD", "Passport","VOTER ID","DRIVING LICENSE"];

// let mrnCounter = 1;

// export default function AddPatient() {

//   const [mrn, setMrn] = useState("");
//   const [dob, setDob] = useState("");
//   const [age, setAge] = useState("");
//   const [country, setCountry] = useState("");
//   const [cities, setCities] = useState([]);
//   const [code, setCode] = useState("");
//   const [showPopup, setShowPopup] = useState(false);

//   const [primaryId, setPrimaryId] = useState({ number: "", expiry: "" });
//   const [secondaryId, setSecondaryId] = useState({ number: "", expiry: "" });

//   // ✅ PHOTO STATE
//   const [photo, setPhoto] = useState(null);

//   // ✅ CAMERA STATE
//   const [cameraOn, setCameraOn] = useState(false);
//   const videoRef = useRef(null);

//   ✅ AGE CALC (FIXED)
//   useEffect(() => {
//     if (!dob) return;

//     const birth = new Date(dob);
//     const today = new Date();

//     let years = today.getFullYear() - birth.getFullYear();
//     let months = today.getMonth() - birth.getMonth();
//     let days = today.getDate() - birth.getDate();

//     if (days < 0) {
//       months--;
//       const prevMonth = new Date(today.getFullYear(), today.getMonth(), 0);
//       days += prevMonth.getDate();
//     }

//     if (months < 0) {
//       years--;
//       months += 12;
//     }

//     const formattedAge = `${years}Y${String(months).padStart(2, "0")}M${String(days).padStart(2, "0")}D`;

//     setAge(formattedAge);
//   }, [dob]);

//   // COUNTRY
//   const handleCountry = (value) => {
//     setCountry(value);
//     setCities(countryCityMap[value] || []);
//     setCode(countryCodes[value] || "");
//   };

//   // MRN
//   const generateMRN = () => {
//     const id = "MRN" + String(mrnCounter).padStart(3, "0");
//     mrnCounter++;
//     return id;
//   };

//   const handleSubmit = () => {
//     const newMrn = generateMRN();
//     setMrn(newMrn);
//     setShowPopup(true);
//   };

//   // ✅ CAMERA FUNCTION
//   const openCamera = async () => {
//     try {
//       const stream = await navigator.mediaDevices.getUserMedia({ video: true });
//       videoRef.current.srcObject = stream;
//       setCameraOn(true);
//     } catch (err) {
//       alert("Camera permission denied");
//     }
//   };

//   return (
//     <div className="container">

//       <div className="header">
//         <h2>Patient Registration</h2>

//         {/* ✅ PHOTO FIX */}
//         <div className="photo-box">
//           {photo ? <img src={photo} alt="preview" /> : <span>Upload</span>}
//           <input
//             type="file"
//             accept="image/*"
//             onChange={(e) => {
//               if (e.target.files[0]) {
//                 setPhoto(URL.createObjectURL(e.target.files[0]));
//               }
//             }}
//           />
//         </div>
//       </div>

//       <div className="card">

//         <h3>Patient Info</h3>

//         <div className="grid-3">
//           <input value={mrn} placeholder="MRN" readOnly />
//           <input className="span-2" placeholder="Display Name" />
//         </div>

//         <div className="grid-4">
//           <select><option>Mr</option></select>
//           <input placeholder="First Name" />
//           <input placeholder="Middle Name" />
//           <input placeholder="Last Name" />
//         </div>

//         <div className="grid-4">
//           <input type="date" onChange={(e)=>setDob(e.target.value)} />
//           <input value={age} placeholder="Age" readOnly />
//           <select><option>Male</option></select>
//           <select><option>Single</option></select>
//         </div>

//         {/* CONTACT */}
//         <h3>Contact</h3>

//         <div className="grid-1">
//           <input placeholder="Address" />
//         </div>

//         <div className="grid-4">
//           <select onChange={(e)=>handleCountry(e.target.value)}>
//             <option>Select Country</option>
//             {Object.keys(countryCityMap).map(c=> <option key={c}>{c}</option>)}
//           </select>

//           <select>
//             <option>Select City</option>
//             {cities.map(c=> <option key={c}>{c}</option>)}
//           </select>

//           <input value={code} placeholder="Code" readOnly />
//           <input placeholder="Mobile" />
//         </div>

//         <div className="grid-3 align-center">
//           <input placeholder="Nationality" />

//           <select>
//             <option>Select Religion</option>
//             <option>Hindu</option>
//             <option>Muslim</option>
//             <option>Christian</option>
//             <option>Sikh</option>
//           </select>

//           {/* <label className="vip">
//             <input type="checkbox" /> VIP
//           </label> */}
//             {/* ✅ MODERN VIP SWITCH */}
//   <div className="vip-switch">
//     <label className="switch">
//       <input type="checkbox" />
//       <span className="slider"></span>
//     </label>
//     <span>VIP</span>
//   </div>
//         </div>

//         {/* IDENTIFICATION */}
//         <h3>Identification</h3>

//         <div className="grid-4">
//           <select>{idTypes.map(i=><option key={i}>{i}</option>)}</select>
//           <input placeholder="ID Number" />
//           <button className="scan-btn" onClick={openCamera}>📷</button>
//           <input type="date" />
//         </div>

//         <div className="grid-4">
//           <select>{idTypes.map(i=><option key={i}>{i}</option>)}</select>
//           <input placeholder="ID Number" />
//           <button className="scan-btn" onClick={openCamera}>📷</button>
//           <input type="date" />
//         </div>

//         {/* EMERGENCY */}
//         <h3>Emergency</h3>

//         <div className="grid-2">
//           <input placeholder="Full Name" />
//           <select>
//             <option>Select Relationship</option>
//             <option>Father</option>
//             <option>Mother</option>
//             <option>Spouse</option>
//           </select>
//         </div>

//         <div className="grid-4">
//           <select>{idTypes.map(i=><option key={i}>{i}</option>)}</select>
//           <input placeholder="ID Number" />
//           <button className="scan-btn" onClick={openCamera}>📷</button>
//           <input type="date" />
//         </div>

//         <button className="submit" onClick={handleSubmit}>
//           Register Patient
//         </button>

//       </div>

//       {/* ✅ CAMERA MODAL */}
//       {cameraOn && (
//         <div className="camera-modal">
//           <video ref={videoRef} autoPlay></video>
//           <button onClick={()=>setCameraOn(false)}>Close</button>
//         </div>
//       )}

//       {showPopup && (
//         <div className="popup">
//           <div className="popup-box">
//             <h2>Patient Registered</h2>
//             <p>MRN Generated Successfully</p>
//             <h3>{mrn}</h3>
//             <button onClick={()=>setShowPopup(false)}>OK</button>
//           </div>
//         </div>
//       )}

//     </div>
//   );
// }