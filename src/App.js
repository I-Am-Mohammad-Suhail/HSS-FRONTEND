import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

import Login from "./pages/Login";
import ProtectedRoute from "./auth/ProtectedRoute";

import AdminLayout from "./pages/AdminLayout";
import Dashboard from "./pages/admin/Dashboard";
import AddPatient from "./pages/admin/Patient/AddPatient";
import PatientVisit from "./pages/admin/patientvisit/PatientVisit";
import EMR from "./pages/admin/EMR/EMR";
import Billing from "./pages/admin/biling/billing";
import NurseTriage from "./pages/admin/Triage/NurseTriage";
import "./styles/admin.css";
import "./styles/common.css";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>

        {/* LOGIN */}
        <Route path="/" element={<Login />} />

        {/* ADMIN */}
        <Route
          path="/admin"
          element={
            <ProtectedRoute role="ADMIN">
              <AdminLayout />
            </ProtectedRoute>
          }
        >

          {/* dashboard */}
          <Route index element={<Dashboard />} />

          {/* patient registration */}
          <Route
            path="patients/register"
            element={<AddPatient />}
          />

          {/* patient visit */}
          <Route
            path="patients/visit"
            element={<PatientVisit />}
          />

          {/* EMR */}
          <Route
            path="emr"
            element={<EMR />}
          />

          {/* ✅ BILLING — FIXED */}
          <Route
            path="billing"
            element={<Billing />}
          />

        </Route>
        {/* nurse triage*/}
  <Route path="/admin" element={<AdminLayout />}>

    <Route path="triage" element={<NurseTriage />} />

  </Route>


        {/* fallback */}
        <Route path="*" element={<Navigate to="/" />} />

      </Routes>
    </BrowserRouter>
  );
}
