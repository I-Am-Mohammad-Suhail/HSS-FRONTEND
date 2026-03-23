// import "./Dashboard.css";
// import { Link } from "react-router-dom";

// export default function Dashboard() {
//   return (
//     <div className="admin-layout">

//       <aside className="sidebar">
//         <h2>HIS</h2>

//         <nav>
//           <Link to="/admin">Dashboard</Link>
//           <Link to="/admin/patients">Patients</Link>
//           <Link to="#">Visits</Link>
//           <Link to="#">EMR</Link>
//           <Link to="#">Billing</Link>
//         </nav>
//       </aside>

//       <main className="content">
//         <h1>Admin Dashboard</h1>

//         <div className="cards">
//           <div className="card">Patients</div>
//           <div className="card">Visits</div>
//           <div className="card">EMR</div>
//           <div className="card">Billing</div>
//         </div>
//       </main>

//     </div>
//   );
// }
import AdminLayout from "../AdminLayout";

const Dashboard = () => {
  const totalPatients = 2; // baad me backend se

  return (
    <AdminLayout>
      <h2>Dashboard</h2>

      <div style={{ padding: "20px", background: "#eee", width: "300px" }}>
        <h3>Total Registered Patients</h3>
        <h1>{totalPatients}</h1>
      </div>
    </AdminLayout>
  );
};

export default Dashboard;