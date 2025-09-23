import React, { useEffect } from "react";
import { db } from "../config/Firebase";
import {
  collection,
  query,
  where,
  getCountFromServer,
  getDocs,
} from "firebase/firestore";
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
  const fetchAllCounts = async () => {
    try {
      setLoading(true); // start loading

      const usersColl = collection(db, "Users");
      const votesColl = collection(db, "StudentVotes");
      const candidatesColl = collection(db, "Candidates");
      const signinsRef = collection(db, "Users");

      const queries = {
        applicants: query(candidatesColl, where("status", "==", "pending")),
        candidates: query(candidatesColl, where("status", "==", "approved")),
        approved: query(candidatesColl, where("status", "==", "approved")),
        rejected: query(candidatesColl, where("status", "==", "rejected")),
      };

      // Run queries in parallel
      const [
        userSnapshot,
        voteSnapshot,
        applicantSnapshot,
        candidateSnapshot,
        approvedSnapshot,
        rejectedSnapshot,
        snapshot,
      ] = await Promise.all([
        getCountFromServer(usersColl),
        getCountFromServer(votesColl),
        getCountFromServer(queries.applicants),
        getCountFromServer(queries.candidates),
        getCountFromServer(queries.approved),
        getCountFromServer(queries.rejected),
        getDocs(signinsRef),
      ]);

      // Update states
      setUserCount(userSnapshot.data().count);
      setVotescastedCount(voteSnapshot.data().count);
      setApplicantCount(applicantSnapshot.data().count);
      setCandidateCount(candidateSnapshot.data().count);
      setApprovedCount(approvedSnapshot.data().count);
      setRejectedCount(rejectedSnapshot.data().count);
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
    } catch (error) {
    } finally {
      setLoading(false); // stop loading
    }
  };

  useEffect(() => {
    fetchAllCounts();
  }, []);
};

export default useDashboardCount;
