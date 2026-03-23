import Patient from "../../components/Patient";
import Visit from "../../components/Visit";
import Billing from "../../components/Billing";

export default function ReceptionDashboard() {
  return (
    <>
      <h1>Reception Dashboard</h1>
      <Patient />
      <Visit />
      <Billing />
    </>
  );
}