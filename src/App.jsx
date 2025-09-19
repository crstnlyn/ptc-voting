import { useState } from "react";
import StudentDashboard from "./components/StudentDashboard";
import Registration from "./components/Registration";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer } from "react-toastify";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Policy from "./components/Policy";
import ProtectedRoute from "./components/ProtectedRoute";
import { AuthProvider } from "./components/AuthContext";
import AdminDashboard from "./components/admin/AdminDashboard";
import Dashboard from "./components/admin/Dashboard";
import { Navigate } from "react-router-dom";
import Candidates from "./components/admin/Candidates";
import Analytics from "./components/admin/Analytics";

function App() {
  const [count, setCount] = useState(0);

  return (
    <>
      <AuthProvider>
        <Router>
          <div id="App" className="w-full h-full">
            <Routes>
              <Route path="/" element={<Analytics></Analytics>} />
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
                <Route path="candidate" element={<Candidates />} />
                <Route path="analytics" element={<Analytics />} />
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
