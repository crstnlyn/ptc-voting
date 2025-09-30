import { useEffect } from "react";
import { db } from "../config/Firebase";
import { collection, query, where, onSnapshot } from "firebase/firestore";
import { format } from "date-fns";

const useDashboardCount = ({
  setUserCount,
  setApplicantCount,
  setCandidateCount,
  setVotescastedCount,
  setApprovedCount,
  setRejectedCount,
  setMonths,
  setValues,
  setLoading,
}) => {
  useEffect(() => {
    setLoading(true);

    const usersColl = collection(db, "Users");
    const votesColl = collection(db, "StudentVotes");
    const candidatesColl = collection(db, "Candidates");

    const qApplicants = query(candidatesColl, where("status", "==", "pending"));
    const qCandidates = query(
      candidatesColl,
      where("status", "==", "approved")
    );
    const qApproved = query(candidatesColl, where("status", "==", "approved"));
    const qRejected = query(candidatesColl, where("status", "==", "rejected"));

    const unsubUsers = onSnapshot(usersColl, (snapshot) => {
      setUserCount(snapshot.size);
    });

    const unsubVotes = onSnapshot(votesColl, (snapshot) => {
      setVotescastedCount(snapshot.size);
    });

    const unsubApplicants = onSnapshot(qApplicants, (snapshot) => {
      setApplicantCount(snapshot.size);
    });

    const unsubCandidates = onSnapshot(qCandidates, (snapshot) => {
      setCandidateCount(snapshot.size);
    });

    const unsubApproved = onSnapshot(qApproved, (snapshot) => {
      setApprovedCount(snapshot.size);
    });

    const unsubRejected = onSnapshot(qRejected, (snapshot) => {
      setRejectedCount(snapshot.size);
    });

    // 🟢 Track users by month (signins chart)
    const unsubSignins = onSnapshot(usersColl, (snapshot) => {
      const counts = {};
      snapshot.forEach((doc) => {
        const data = doc.data();
        if (data.timestamp) {
          const month = format(data.timestamp.toDate(), "MMM yyyy");
          counts[month] = (counts[month] || 0) + 1;
        }
      });

      const months = Object.keys(counts).sort(
        (a, b) => new Date(a) - new Date(b)
      );
      const values = months.map((label) => counts[label]);

      setMonths(months);
      setValues(values);
      setLoading(false);
    });

    // cleanup all listeners when component unmounts
    return () => {
      unsubUsers();
      unsubVotes();
      unsubApplicants();
      unsubCandidates();
      unsubApproved();
      unsubRejected();
      unsubSignins();
    };
  }, [
    setUserCount,
    setApplicantCount,
    setCandidateCount,
    setVotescastedCount,
    setApprovedCount,
    setRejectedCount,
    setMonths,
    setValues,
    setLoading,
  ]);
};

export default useDashboardCount;
