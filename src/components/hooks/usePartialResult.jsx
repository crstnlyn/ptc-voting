import { useState, useEffect } from "react";
import { collection, where, query, onSnapshot, doc } from "firebase/firestore";
import { db } from "../config/Firebase";

const usePartialResult = () => {
  const [candidates, setCandidates] = useState([]);
  const [groupedCandidates, setGroupedCandidates] = useState({});
  const [loading, setLoading] = useState(true);
  const [userCount, setUserCount] = useState(0);
  const [votecastedCount, setVotecastedCount] = useState(0);
  const [schedules, setSchedule] = useState(null);

  useEffect(() => {
    const candidateColl = collection(db, "Candidates");
    const q = query(candidateColl, where("status", "==", "approved"));

    const usersColl = collection(db, "Users");
    const votesColl = collection(db, "StudentVotes");

    const unsubUsers = onSnapshot(usersColl, (snapshot) => {
      setUserCount(snapshot.size);
    });

    const unsubVotes = onSnapshot(votesColl, (snapshot) => {
      setVotecastedCount(snapshot.size);
    });

    const unsubSched = onSnapshot(doc(db, "config", "election"), (snapshot) => {
      if (snapshot.exists()) {
        setSchedule(snapshot.data());
      } else {
        setSchedule(null);
      }
    });

    const unsubCandidates = onSnapshot(
      q,
      (snapshot) => {
        const data = snapshot.docs.map((doc) => {
          const d = doc.data();
          return {
            id: doc.id,
            ...d,
            voteCount: Number(d.voteCount) || 0,
          };
        });
        setCandidates(data);

        // ✅ Group by position
        const grouped = data.reduce((acc, candidate) => {
          const position = candidate.position || "Unassigned";
          if (!acc[position]) acc[position] = [];
          acc[position].push(candidate);
          return acc;
        }, {});

        // ✅ Sort each group ascending by voteCount
        const sortedGrouped = {};
        Object.keys(grouped).forEach((pos) => {
          sortedGrouped[pos] = [...grouped[pos]].sort(
            (a, b) => b.voteCount - a.voteCount
          );
        });

        setGroupedCandidates(sortedGrouped);
        setLoading(false);
      },
      (error) => {
        console.error("Error fetching candidates:", error);
        setLoading(false);
      }
    );

    // ✅ Cleanup listeners on unmount
    return () => {
      unsubCandidates();
      unsubUsers();
      unsubVotes();
      unsubSched();
    };
  }, []);

  return {
    candidates,
    groupedCandidates,
    loading,
    userCount,
    votecastedCount,
    schedules,
  };
};

export default usePartialResult;
