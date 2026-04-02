import { useState } from "react";
import "./NurseTriage.css";

export default function NurseTriage() {
  const [pain, setPain] = useState(0);
  const [triage, setTriage] = useState("");
  const [flags, setFlags] = useState({
    chest: false,
    head: false,
    trauma: false,
    seizure: false
  });

  const toggleFlag = (key) => {
    setFlags({ ...flags, [key]: !flags[key] });
  };

  return (
    <div className="triage-page">

      {/* HEADER */}
      <div className="triage-header">
        <h2>Nurse Triage Module</h2>
        <p>Patient: Mohammad Ali | MRN: MRN00245 | Status: Waiting</p>
      </div>

      {/* CHIEF COMPLAINT */}
      <div className="triage-card">
        <h3>Chief Complaint</h3>
        <input placeholder="Chest pain since 2 hours..."
         />
    </div>

      {/* PAIN */ }
  <div className="triage-card">
    <h3>Pain Assessment</h3>
    <div className="pain-scale">
      {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map(num => (
        <span
          key={num}
          className={pain === num ? "active" : ""}
          onClick={() => setPain(num)}
        >
          {num}
        </span>
      ))}
    </div>
  </div>

  {/* VITALS */ }
  <div className="triage-card grid-2">
    <input placeholder="Heart Rate" />
    <input placeholder="Resp Rate" />
    <input placeholder="Temperature" />
    <input placeholder="Blood Pressure" />
    <input placeholder="SpO2" />
  </div>

  {/* RED FLAGS */ }
  <div className="triage-card">
    <h3>Red Flags</h3>
    <div className="flags">
      {["chest", "head", "trauma", "seizure"].map((f) => (
        <button
          key={f}
          className={flags[f] ? "flag active" : "flag"}
          onClick={() => toggleFlag(f)}
        >
          {f.toUpperCase()}
        </button>
      ))}
    </div>
  </div>

  {/* AI SUGGEST */ }
  <div className="triage-card ai-box">
    <h3>AI Suggested Level</h3>
    <p className="ai-result">LEVEL 1 - EMERGENT</p>
    <small>Based on vitals + symptoms</small>
  </div>

  {/* TRIAGE LEVEL */ }
  <div className="triage-card">
    <h3>Triage Level</h3>
    <div className="triage-buttons">
      {["Critical", "Emergency", "Urgent", "Semi-Urgent", "Non-Urgent"].map(t => (
        <button
          key={t}
          className={triage === t ? "active" : ""}
          onClick={() => setTriage(t)}
        >
          {t}
        </button>
      ))}
    </div>
  </div>

  {/* 🔥 ISOLATION (NEW ADD) */ }
  <div className="triage-card">
    <h3>Isolation</h3>
    <div className="flags">
      {["Droplet", "Contact", "Airborne"].map((item) => (
        <button key={item} className="flag">{item}</button>
      ))}
    </div>
  </div>

  {/* ACTION */ }
  <div className="actions">
    <button className="draft">Save Draft</button>
    <button className="complete">Complete Triage</button>
  </div>

    </div >
  );
}