import { useState } from "react";
import "./billing.css";

export default function Billing() {
  const [charges, setCharges] = useState([
    { service: "", qty: 1, unit: 0, total: 0 }
  ]);

  const [insurance, setInsurance] = useState(0);

  const updateRow = (index, field, value) => {
    const updated = [...charges];
    updated[index][field] = value;

    const qty = Number(updated[index].qty || 0);
    const unit = Number(updated[index].unit || 0);
    updated[index].total = qty * unit;

    setCharges(updated);
  };

  const addRow = () => {
    setCharges([
      ...charges,
      { service: "", qty: 1, unit: 0, total: 0 }
    ]);
  };

  const removeRow = (index) => {
    const data = charges.filter((_, i) => i !== index);
    setCharges(data);
  };

  const subtotal = charges.reduce(
    (sum, row) => sum + Number(row.total || 0),
    0
  );

  const amountDue = subtotal - Number(insurance || 0);

  return (
    <div className="billing-page">
  <div className="billing-title">Billing</div>

      {/* ================= PATIENT BAR ================= */}
      <div className="patient-strip">
        John Doe | Age: 45 | Male | ID: PT123456
      </div>

      {/* ================= SUMMARY ================= */}
      <div className="billing-card summary">
        <h3>Billing Summary</h3>

        <div className="summary-grid">
          <div><b>Visit ID:</b> <input /></div>
          <div>
            <b>Visit Date:</b>
            <input type="datetime-local" />
          </div>
          <div>
            <b>Visit Type:</b>
            <select>
              <option>OPD</option>
              <option>IPD</option>
            </select>
          </div>
          <div>
            <b>Doctor:</b>
            <input />
          </div>
        </div>
      </div>

      {/* ================= CHARGES ================= */}
      <div className="card">
        <h3>Charges</h3>

        <table className="charges-table">
          <thead>
            <tr>
              <th>Service / Item</th>
              <th>Qty</th>
              <th>Unit Cost</th>
              <th>Total</th>
              <th></th>
            </tr>
          </thead>

          <tbody>
            {charges.map((row, i) => (
              <tr key={i}>
                <td>
                  <input
                    value={row.service}
                    onChange={(e) =>
                      updateRow(i, "service", e.target.value)
                    }
                  />
                </td>

                <td>
                  <input
                    type="number"
                    value={row.qty}
                    onChange={(e) =>
                      updateRow(i, "qty", e.target.value)
                    }
                  />
                </td>

                <td>
                  <input
                    type="number"
                    value={row.unit}
                    onChange={(e) =>
                      updateRow(i, "unit", e.target.value)
                    }
                  />
                </td>

                <td className="bold">
                  {row.total.toFixed(2)}
                </td>

                <td>
                  <button
                    className="delete"
                    onClick={() => removeRow(i)}
                  >
                    ✕
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {/* ================= TOTAL ================= */}
        <div className="total-box">
          <div>
            Subtotal:
            <span>{subtotal.toFixed(2)}</span>
          </div>

          <div>
            Insurance Coverage:
            <input
              type="number"
              value={insurance}
              onChange={(e) => setInsurance(e.target.value)}
            />
          </div>

          <div className="due">
            Amount Due:
            <span>{amountDue.toFixed(2)}</span>
          </div>
        </div>

        {/* ================= ACTIONS ================= */}
        <div className="billing-actions">
          <button className="blue" onClick={addRow}>
            + Add Charge
          </button>

          <button className="gray">Print Invoice</button>

          <button className="green">Process Payment</button>

          <button className="red">Close Visit</button>
        </div>
      </div>
    </div>
  );
}
