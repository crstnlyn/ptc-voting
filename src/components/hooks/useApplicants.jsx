import { db } from "../config/Firebase";
import { collection, onSnapshot, query, where } from "firebase/firestore";

const useApplicants = ({ setApplicants, setLoading }) => {
  const fetchApplicants = () => {
    setLoading(true);
    const applicantsColl = collection(db, "Candidates");
    const q = query(applicantsColl, where("status", "==", "pending"));

    const unsub = onSnapshot(
      q,
      (snapshot) => {
        const applicants = snapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));

        setApplicants(applicants);
        setLoading(false);
      },
      (error) => {
        setLoading(false);
      }
    );

    return unsub;
  };

  return { fetchApplicants };
};

export default useApplicants;
