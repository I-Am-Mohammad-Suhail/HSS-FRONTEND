// import { Link } from "react-router-dom";

// const Sidebar = () => {
//   return (
//     <div className="sidebar">
//       <h3>ADMIN</h3>

//       <ul>
//         <li>
//           <Link to="/admin/dashboard">DASHBOARD</Link>
//         </li>

//         <li>
//           <Link to="/admin/patients/register">
//             PATIENT REGISTRATION
//           </Link>
//         </li>

//         <li>
//           <Link to="/admin/patients/visit">
//             PATIENT VISIT
//           </Link>
//         </li>

//         <li>
//           <Link to="/admin/emr">EMR</Link>
//         </li>

//         <li>
//           <Link to="/admin/billing">BILLING</Link>
//         </li>
//       </ul>
//     </div>
//   );
// };

// export default Sidebar;
import { Link } from "react-router-dom";

const Sidebar = () => {
  return (
    <div className="sidebar">
      <h3>ADMIN</h3>

      <ul>
        <li>
          <Link to="/admin">DASHBOARD</Link>
        </li>

        <li>
          <Link to="/admin/patients/register">
            PATIENT REGISTRATION
          </Link>
        </li>

        <li>
            <Link to="/admin/patients/visit">PATIENT VISIT</Link>

        </li>

        <li>
          <Link to="/admin/emr">EMR</Link>
        </li>

        <li>
          <Link to="/admin/billing">BILLING</Link>
        </li>
      </ul>
    </div>
  );
};

export default Sidebar;

