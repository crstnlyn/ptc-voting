import React from "react";
import useCandidates from "../hooks/useCandidates";
import { useState } from "react";
import { TriangleAlert } from "lucide-react";
import { toast } from "react-toastify";
import { collection, getDocs, updateDoc } from "firebase/firestore";

const Candidates = () => {
  const { groupedCandidates, loading } = useCandidates();
  const [open, setOpen] = useState(false);
  const [newLoading, setLoading] = useState(false);

  if (loading) {
    return (
      <div className="w-full h-full flex item-center justify-center">
        <div className="loading loading-spinner text-success"></div>
      </div>
    );
  }
  const handleDelete = async () => {
    setLoading(true);
    try {
      const candidatesSnap = await getDocs(collection(db, "candidates"));
      const deletePromises = candidatesSnap.docs.map((d) =>
        deleteDoc(doc(db, "candidates", d.id))
      );

      await Promise.all(deletePromises);
      await resetAllVotes();
      toast.success("All candidates removed!", {
        position: "top-center",
      });
    } catch (err) {
      console.error(err);
      toast.error("Error removing candidates.", {
        position: "top-center",
      });
    }
    setLoading(false);
    setOpen(false);
  };

  const resetAllVotes = async () => {
    try {
      const userSnapshot = await getDocs(collection(db, "Users"));

      const updatePromises = userSnapshot.docs.map(async (userDoc) => {
        const userRef = doc(db, "Users", userDoc.id);
        await updateDoc(userRef, { isVoted: false, isCandiate: false });
      });

      await Promise.all(updatePromises);
      toast.success("All student votes have been reset");
    } catch (error) {
      toast.error("Error in reseting the votes of all student");
    }
  };

  return (
    <div className="min-w-full p-6">
      <div className="flex justify-end mb-4">
        <button
          className="btn btn-error text-base-100"
          onClick={() => setOpen(true)}
        >
          Clear all candidates
        </button>
      </div>

      {/* Candidate Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* ✅ Each Position Section */}
        {[
          { title: "President", color: "bg-primary" },
          { title: "Vice-President", color: "bg-secondary" },
          { title: "Secretary", color: "bg-accent" },
          { title: "Treasurer", color: "bg-info" },
          { title: "Auditor", color: "bg-warning" },
          { title: "P.I.O", color: "bg-error" },
        ].map(({ title, color }) => (
          <div key={title} className="p-4 rounded-lg bg-base-100 ">
            <h1
              className={`text-center text-lg sm:text-xl font-bold text-base-100 ${color} rounded-t-md py-2`}
            >
              {title}
            </h1>

            {(groupedCandidates[title] || []).length === 0 ? (
              <p className="text-center font-bold text-gray-600 mt-3">
                No Candidate
              </p>
            ) : (
              (groupedCandidates[title] || []).map((c) => (
                <div
                  key={c.id}
                  className="card bg-base-100 shadow-md mb-2 hover:shadow-lg transition-all duration-200"
                >
                  <div className="card-body flex flex-col lg:flex-row-reverse sm:flex-row justify-between items-center gap-4">
                    <img
                      src={c.profilePic}
                      alt="Candidate"
                      className="w-20 h-20 rounded-full object-cover border-2 border-gray-300"
                    />
                    <div className="flex flex-col items-center sm:items-start text-center sm:text-left">
                      <h1 className="text-lg font-bold">
                        {c.firstname} {c.middleName} {c.lastname}
                      </h1>
                      <p className="text-sm text-gray-600">{c.studentID}</p>
                      <p className="text-sm text-gray-700">
                        {c.course} - {c.yearLevel}
                      </p>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>
        ))}
      </div>

      {open && (
        <div className="modal modal-open">
          <div className="modal-box">
            <h3 className="font-bold text-lg flex gap-2 items-center">
              <TriangleAlert /> Confirm Delete
            </h3>
            <p className="py-4">
              Are you sure you want to remove <b>all candidates</b>? This cannot
              be undone.
            </p>
            <div className="modal-action">
              <button
                className="btn btn-outline"
                onClick={() => setOpen(false)}
              >
                Cancel
              </button>
              <button
                className={`btn btn-error text-base-100 ${
                  newLoading ? "loading" : ""
                }`}
                onClick={handleDelete}
              >
                {newLoading ? "Deleting..." : "Yes, Delete All"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Candidates;
