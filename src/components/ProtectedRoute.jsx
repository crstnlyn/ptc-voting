import React, { useState, useEffect } from "react";
import { Navigate } from "react-router-dom";
import { auth, db } from "./config/Firebase";
import { doc, getDoc } from "firebase/firestore";
import { onAuthStateChanged } from "firebase/auth";
import Loading from "./Loading";

const ProtectedRoute = ({ children, type }) => {
  const [user, setUser] = useState(null);
  const [role, setRole] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
      setUser(currentUser);

      if (!currentUser) {
        setRole(null);
        setLoading(false);

        return;
      }

      const adminRef = doc(db, "Admin", currentUser.uid);
      const adminSnap = await getDoc(adminRef);

      if (adminSnap.exists()) {
        setRole("admin");
      } else {
        const studentRef = doc(db, "Users", currentUser.uid);
        const studentSnap = await getDoc(studentRef);

        if (studentSnap.exists()) {
          setRole("student");
        } else {
          setRole(null);
        }
      }

      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  if (loading) return <Loading />;
  if (!user) return <Navigate to="/login" replace />;

  // 🚫 block mismatched access
  if (role !== type) {
    if (role === "student") return <Navigate to="/student" replace />;
    if (role === "admin") return <Navigate to="/admin" replace />;
    return <Navigate to="/login" replace />;
  }

  return children;
};

export default ProtectedRoute;
