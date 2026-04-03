import { Link } from "react-router-dom";
import "../../styles/admin.css";

const Sidebar = () => {
  return (
    <div className="sidebar">
      <h3 className="logo">ADMIN</h3>

      <ul className="menu">
        <li><Link to="/admin">Dashboard</Link></li>
        <li><Link to="/admin/patients/register">Patient Registration</Link></li>
        <li><Link to="/admin/patients/visit">Patient Visit</Link></li>
        <li><Link to="/admin/emr">EMR</Link></li>
        <li><Link to="/admin/billing">Billing</Link></li>
        <li><Link to="/admin/triage">Nurse Triage</Link></li>
      

        
      </ul>
    </div>
  );
};

export default Sidebar;