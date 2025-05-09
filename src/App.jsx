import { useState } from "react";
import StudentDashboard from "./components/StudentDashboard";
import Registration from "./components/Registration";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer } from "react-toastify";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Policy from "./components/Policy";
import ProtectedRoute from "./components/ProtectedRoute";
import { AuthProvider } from "./components/AuthContext";

function App() {
  const [count, setCount] = useState(0);

  return (
    <>
      <AuthProvider>
        <Router>
          <div id="App" className="w-full h-full">
            <Routes>
              <Route path="/" element={<Registration />}></Route>
              <Route
                path="/student"
                element={
                  <ProtectedRoute>
                    <StudentDashboard />
                  </ProtectedRoute>
                }
              ></Route>
              <Route
                path="/policy"
                element={
                  <ProtectedRoute>
                    <Policy />
                  </ProtectedRoute>
                }
              ></Route>
            </Routes>
          </div>
        </Router>
      </AuthProvider>

      <ToastContainer />
    </>
  );
}

export default App;
