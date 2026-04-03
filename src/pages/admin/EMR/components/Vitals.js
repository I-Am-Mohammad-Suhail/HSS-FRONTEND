export default function Vitals({ vitals, setVitals, redFlags, setRedFlags, aiLevel, triage }) {
  return (
    <div className="card">

      <div className="grid">
        <input placeholder="HR" onChange={e=>setVitals({...vitals, hr:e.target.value})}/>
        <input placeholder="BP Sys" onChange={e=>setVitals({...vitals, sys:e.target.value})}/>
      </div>

      <div className="ai-box">
        <strong>{aiLevel}</strong>
      </div>

      <div className="triage">
        <button className={triage==="LEVEL 1"?"active":""}>LEVEL 1</button>
      </div>

    </div>
  );
}