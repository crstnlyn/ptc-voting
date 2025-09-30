import { useState, useEffect, use } from "react";
import {
  collection,
  getDocs,
  where,
  query,
  onSnapshot,
} from "firebase/firestore";
import { db } from "../config/Firebase";

const useCandidates = () => {
  const [candidates, setCandidates] = useState([]);
  const [groupedCandidates, setGroupedCandidates] = useState({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const candidateColl = collection(db, "Candidates");
    const q = query(candidateColl, where("status", "==", "approved"));

    const unsubscribe = onSnapshot(
      q,
      (snapshot) => {
        const data = snapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setCandidates(data);

        // ✅ Group by position
        const grouped = data.reduce((acc, candidate) => {
          const position = candidate.position || "Unassigned";
          if (!acc[position]) acc[position] = [];
          acc[position].push(candidate);
          return acc;
        }, {});
        setGroupedCandidates(grouped);

        setLoading(false);
      },
      (error) => {
        console.error("Error fetching candidates:", error);
        setLoading(false);
      }
    );

    // ✅ Cleanup listener on unmount
    return () => unsubscribe();
  }, []);

  return { candidates, groupedCandidates, loading };
};

export default useCandidates;
