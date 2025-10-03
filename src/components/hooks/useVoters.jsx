import {
  collection,
  doc,
  onSnapshot,
  query,
  snapshotEqual,
  where,
} from "firebase/firestore";
import { useEffect, useState } from "react";
import { db } from "../config/Firebase";

const useVoters = () => {
  const [voters, setVoters] = useState([]);
  const [loading, setLoading] = useState(true);
  const [votersCount, setVotersCount] = useState();
  const [candidateCounts, setCandidateCounts] = useState();
  const [votedCounts, setVotedCounts] = useState();
  const [notVotedCount, setNotVotedCounts] = useState();

  const usersColl = collection(db, "Users");
  const q = query(usersColl, where("isCandidate", "==", true));
  const q2 = query(usersColl, where("isVoted", "==", true));
  const q3 = query(usersColl, where("isVoted", "==", false));

  useEffect(() => {
    const unsubscribe = onSnapshot(
      collection(db, "Users"),
      (snapshot) => {
        const data = snapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));

        const maskedEmails = data.map((user) => {
          if (user.email) {
            const [name, domain] = user.email.split("@");
            const maskedName =
              name.length > 2
                ? name.slice(0, 2) + "*".repeat(name.length - 2)
                : name;

            return {
              ...user,
              email: user.email,
              maskedEmail: `${maskedName}@${domain}`,
            };
          }

          return user;
        });

        setVoters(maskedEmails);
        setLoading(false);
      },
      (error) => {
        console.error("Error fetching voters: ", error);
      }
    );

    const unsubVoterscount = onSnapshot(collection(db, "Users"), (snapshot) => {
      setVotersCount(snapshot.size);
    });

    const unsubCandidates = onSnapshot(q, (snapshot) => {
      setCandidateCounts(snapshot.size);
    });

    const unsubVotedcounts = onSnapshot(q2, (snapshot) => {
      setVotedCounts(snapshot.size);
    });

    const unsubNotvotedcounts = onSnapshot(q3, (snapshot) => {
      setNotVotedCounts(snapshot.size);
    });

    return () => {
      unsubscribe(),
        unsubVoterscount(),
        unsubCandidates(),
        unsubVotedcounts(),
        unsubNotvotedcounts;
    };
  }, []);

  return {
    voters,
    loading,
    votersCount,
    candidateCounts,
    votedCounts,
    notVotedCount,
  };
};
export default useVoters;
