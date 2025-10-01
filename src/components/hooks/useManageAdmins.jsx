import { collection, onSnapshot } from "firebase/firestore";
import React, { useEffect, useState } from "react";
import { db } from "../config/Firebase";

const useManageAdmins = () => {
  const [admins, setAdmins] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onSnapshot(
      collection(db, "Admin"),
      (snapshot) => {
        const data = snapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setAdmins(data);
        setTimeout(() => setLoading(false), 500);
      },
      (error) => {
        console.error("Error fetching: ", error);
      }
    );

    return () => unsubscribe();
  }, []);

  return { admins, loading };
};

export default useManageAdmins;
