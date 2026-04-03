export default function Tabs({ tab, setTab }) {
  return (
    <div className="tabs">
      <button className={tab==="notes"?"active":""} onClick={()=>setTab("notes")}>Clinical Notes</button>
      <button className={tab==="vitals"?"active":""} onClick={()=>setTab("vitals")}>Vitals</button>
      <button className={tab==="cpoe"?"active":""} onClick={()=>setTab("cpoe")}>CPOE</button>
    </div>
  );
}