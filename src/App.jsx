import { useState } from "react";
import StudentDashboard from "./components/StudentDashboard";
import Registration from "./components/Registration";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer } from "react-toastify";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import ProtectedRoute from "./components/ProtectedRoute";
import { AuthProvider } from "./components/AuthContext";
import AdminDashboard from "./components/admin/AdminDashboard";
import Dashboard from "./components/admin/Dashboard";
import { Navigate } from "react-router-dom";
import Candidates from "./components/admin/Candidates";
import PartialResult from "./components/admin/PartialResult";
import Applicants from "./components/admin/Applicants";
import Home from "./components/Home";
import Voters from "./components/admin/Voters";
import ManageAdmin from "./components/admin/ManageAdmin";
import CreateSchedule from "./components/admin/CreateScheadule";

function App() {
  const [count, setCount] = useState(0);

  return (
    <>
      <AuthProvider>
        <Router>
          <div id="App" className="w-full h-full">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/login" element={<Registration />}></Route>
              <Route
                path="/student"
                element={
                  <ProtectedRoute type="student">
                    <StudentDashboard />
                  </ProtectedRoute>
                }
              ></Route>
              <Route
                path="/admin"
                element={
                  <ProtectedRoute type="admin">
                    <AdminDashboard></AdminDashboard>
                  </ProtectedRoute>
                }
              >
                <Route index element={<Navigate to="dash" replace />} />
                <Route path="dash" element={<Dashboard />} />
                <Route path="candidates" element={<Candidates />} />
                <Route path="partialresult" element={<PartialResult />} />
                <Route path="applicants" element={<Applicants />} />
                <Route path="voters" element={<Voters />} />
                <Route path="manageadmins" element={<ManageAdmin />} />
                <Route path="schedule" element={<CreateSchedule />} />
              </Route>
            </Routes>
          </div>
        </Router>
      </AuthProvider>

      <ToastContainer />
    </>
  );
}

export default App;
