import { useState } from "react";
import "./PatientVisit.css";

export default function PatientVisit() {
  const [photo, setPhoto] = useState(null);

  return (
    <div className="visit-page">

      {/* ================= HEADER ================= */}
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
            <input className="patient-name" placeholder="Patient Name" />
            <div className="meta">Age | Blood Group | Gender</div>
          </div>
        </div>

        <div className="pt-id">PT123456</div>
      </div>

      {/* ================= VISIT DETAILS ================= */}
      <div className="card">
        <h3>Visit Details</h3>

        <div className="visit-grid">

          <div>
            <label>Visit ID</label>
            <select>
              <option>V12345</option>
            </select>
          </div>

          <div>
            <label>Visit Type</label>
            <select>
              <option>OPD</option>
              <option>IPD</option>
            </select>
          </div>

          <div>
            <label>Visit Date & Time</label>
            <input type="datetime-local" />
          </div>

          <div>
            <label>Department</label>
            <select>
              <option>General Medicine</option>
            </select>
          </div>

          <div>
            <label>Clinic / Location</label>
            <select>
              <option>OPD – Room 101</option>
            </select>
          </div>

          <div>
            <label>Attending Doctor</label>
            <input placeholder="Doctor Name" />
          </div>
          
              {/* <div>
                <label>Scan ID</label>
                <button
                  type="button"
                  className="scan-btn"
                  onClick={() => handleScan("emergency")}
                >
                  Scan ID
                </button>
              </div> */}

        </div>
      </div>

      {/* ================= BILLING ================= */}
      <div className="card billing-grid">

        {/* LEFT */}
        <div>
          <h3>Billing & Administrative</h3>

          <div className="billing-left">

            <div>
              <label>Plan Name</label>
              <input />
            </div>

            <div>
              <label>Patient Type</label>
              <select>
                <option>Insurance</option>
                <option>Cash</option>
              </select>
            </div>

            <div>
              <label>Insurance Expiry</label>
              <input type="date" />
            </div>

            <div>
              <label>Insurance Provider</label>
              <select>
                <option>ABC Health Insurance</option>
              </select>
            </div>

            <div>
              <label>Network</label>
              <select>
                <option>Network A</option>
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

            <div>
              <label>Referral Source</label>
              <input />
            </div>

            <div className="full">
              <label>Chief Complaint / Visit Reason</label>
              <textarea rows="3" />
            </div>

          </div>
        </div>

        {/* RIGHT */}
        <div>
          <h3>Schedule of Benefits</h3>

          <div className="benefit-head">
            <span>Service</span>
            <span>%</span>
            <span>Amount</span>
          </div>

          {[
            "Consultation",
            "Diagnostic",
            "Lab Copay",
            "Radiology",
            "Pharmacy",
            "Dental",
            "Maternity",
            "Optical",
          ].map((item) => (
            <div key={item} className="benefit-row">
              <span>{item}</span>
              <input placeholder="%" />
              <input placeholder="Amount" />
            </div>
          ))}
        </div>

      </div>

      {/* ================= ACTIONS ================= */}
      <div className="actions">
        <button className="save">Save Visit</button>
        <button className="emr">Save & Go to EMR</button>
      </div>

    </div>
  );
}
