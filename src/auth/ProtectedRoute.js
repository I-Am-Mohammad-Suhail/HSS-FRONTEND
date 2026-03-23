// import { Navigate } from "react-router-dom";

// export default function ProtectedRoute({ children, role }) {
//   const userRole = localStorage.getItem("role");
//   if (!userRole) return <Navigate to="/" />;
//   if (role && userRole !== role) return <Navigate to="/" />;
//   return children;
// }import { Navigate } from "react-router-dom";

export default function ProtectedRoute({ children, role }) {
  const token = localStorage.getItem("token");
  const userRole = localStorage.getItem("role");

  // agar login hi nahi hai
  if (!token) {
    return <Navigate to="/" replace />;
  }

  // agar role match nahi karta
  if (role && userRole !== role) {
    return <Navigate to="/" replace />;
  }

  return children;
}