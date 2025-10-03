import React from "react";
import useCandidates from "../hooks/useCandidates";
import { useState } from "react";
import { TriangleAlert } from "lucide-react";

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
      alert("All candidates removed!");
    } catch (err) {
      console.error(err);
      alert("Error removing candidates.");
    }
    setLoading(false);
    setOpen(false);
  };

  return (
    <div className="min-w-full p-4 ">
      <div className="flex justify-end pr-4 ">
        <button
          className="btn btn-error text-base-100 "
          onClick={() => setOpen(true)}
        >
          Clear all candidates
        </button>
      </div>
      <div className="grid grid-cols-6 auto-rows-auto gap-4">
        <div className="col-span-3 row-span-2 p-4 rounded-box ">
          <h1 className="text-center text-xl bg-primary rounded-tl-lg rounded-tr-lg text-base-100 font-bold">
            President
          </h1>
          {(groupedCandidates["President"] || []).length === 0 ? (
            <p className="text-center font-bold text-gray-700">No Candidate</p>
          ) : (
            (groupedCandidates["President"] || []).map((c) => (
              <div className="card shadow-md " key={c.id}>
                <div className=" card-body flex-row justify-between items-center">
                  <div className="flex flex-col gap-1">
                    <h1 className="text-lg font-bold">
                      {c.firstname} {c.middleName} {c.lastname}
                    </h1>
                    <p>{c.studentID}</p>
                    <p>
                      {c.course} {c.yearLevel}
                    </p>
                  </div>
                  <img
                    src={c.profilePic}
                    alt=""
                    className="w-20 h-20 rounded-full"
                  />
                </div>
              </div>
            ))
          )}
        </div>
        <div className="col-span-3 row-span-2 col-start-4 p-4 rounded-box">
          <h1 className="text-center text-xl bg-secondary rounded-tl-lg rounded-tr-lg text-base-100 font-bold">
            Vice-President
          </h1>
          {(groupedCandidates["Vice-President"] || []).length === 0 ? (
            <p className="text-center font-bold text-gray-700">No Candidate</p>
          ) : (
            (groupedCandidates["Vice-President"] || []).map((c) => (
              <div className="card shadow-md " key={c.id}>
                <div className=" card-body flex-row justify-between items-center">
                  <div className="flex flex-col gap-1">
                    <h1 className="text-lg font-bold">
                      {c.firstname} {c.middleName} {c.lastname}
                    </h1>
                    <p>{c.studentID}</p>
                    <p>
                      {c.course} {c.yearLevel}
                    </p>
                  </div>
                  <img
                    src={c.profilePic}
                    alt=""
                    className="w-20 h-20 rounded-full"
                  />
                </div>
              </div>
            ))
          )}
        </div>
        <div className="col-span-3 row-span-2 row-start-3  p-4 rounded-box ">
          <h1 className="text-center text-xl bg-accent rounded-tl-lg rounded-tr-lg text-base-100 font-bold">
            Secretary
          </h1>
          {(groupedCandidates["Secretary"] || []).length === 0 ? (
            <p className="text-center font-bold text-gray-700">No Candidate</p>
          ) : (
            (groupedCandidates["Secretary"] || []).map((c) => (
              <div className="card shadow-md " key={c.id}>
                <div className=" card-body flex-row justify-between items-center">
                  <div className="flex flex-col gap-1">
                    <h1 className="text-lg font-bold">
                      {c.firstname} {c.middleName} {c.lastname}
                    </h1>
                    <p>{c.studentID}</p>
                    <p>
                      {c.course} {c.yearLevel}
                    </p>
                  </div>
                  <img
                    src={c.profilePic}
                    alt=""
                    className="w-20 h-20 rounded-full"
                  />
                </div>
              </div>
            ))
          )}
        </div>
        <div className="col-span-3 row-span-2 col-start-4 row-start-3  p-4 rounded-box ">
          <h1 className="text-center text-xl bg-info rounded-tl-lg rounded-tr-lg text-base-100 font-bold">
            Treasurer
          </h1>
          {(groupedCandidates["Treasurer"] || []).length === 0 ? (
            <p className="text-center font-bold text-gray-700">No Candidate</p>
          ) : (
            (groupedCandidates["Treasurer"] || []).map((c) => (
              <div className="card shadow-md " key={c.id}>
                <div className=" card-body flex-row justify-between items-center">
                  <div className="flex flex-col gap-1">
                    <h1 className="text-lg font-bold">
                      {c.firstname} {c.middleName} {c.lastname}
                    </h1>
                    <p>{c.studentID}</p>
                    <p>
                      {c.course} {c.yearLevel}
                    </p>
                  </div>
                  <img
                    src={c.profilePic}
                    alt=""
                    className="w-20 h-20 rounded-full"
                  />
                </div>
              </div>
            ))
          )}
        </div>
        <div className="col-span-3 row-span-2 row-start-5  p-4 rounded-box ">
          <h1 className="text-center text-xl bg-warning rounded-tl-lg rounded-tr-lg text-base-100 font-bold">
            Auditor
          </h1>
          {(groupedCandidates["Auditor"] || []).length === 0 ? (
            <p className="text-center font-bold text-gray-700">No Candidate</p>
          ) : (
            (groupedCandidates["Auditor"] || []).map((c) => (
              <div className="card shadow-md " key={c.id}>
                <div className=" card-body flex-row justify-between items-center">
                  <div className="flex flex-col gap-1">
                    <h1 className="text-lg font-bold">
                      {c.firstname} {c.middleName} {c.lastname}
                    </h1>
                    <p>{c.studentID}</p>
                    <p>
                      {c.course} {c.yearLevel}
                    </p>
                  </div>
                  <img
                    src={c.profilePic}
                    alt=""
                    className="w-20 h-20 rounded-full"
                  />
                </div>
              </div>
            ))
          )}
        </div>
        <div className="col-span-3 row-span-2 col-start-4 row-start-5  p-4 rounded-box ">
          <h1 className="text-center text-xl bg-error rounded-tl-lg rounded-tr-lg text-base-100 font-bold">
            P.I.O
          </h1>
          {(groupedCandidates["P.I.O"] || []).length === 0 ? (
            <p className="text-center font-bold text-gray-700">No Candidate</p>
          ) : (
            (groupedCandidates["P.I.O"] || []).map((c) => (
              <div className="card shadow-md " key={c.id}>
                <div className=" card-body flex-row justify-between items-center">
                  <div className="flex flex-col gap-1">
                    <h1 className="text-lg font-bold">
                      {c.firstname} {c.middleName} {c.lastname}
                    </h1>
                    <p>{c.studentID}</p>
                    <p>
                      {c.course} {c.yearLevel}
                    </p>
                  </div>
                  <img
                    src={c.profilePic}
                    alt=""
                    className="w-20 h-20 rounded-full"
                  />
                </div>
              </div>
            ))
          )}
        </div>
      </div>

      {/* Modal */}
      {open && (
        <div className="modal modal-open">
          <div className="modal-box">
            <h3 className="font-bold text-lg flex gap-2">
              {" "}
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
                  loading ? "loading" : ""
                }`}
                onClick={handleDelete}
              >
                {loading ? "Deleting..." : "Yes, Delete All"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Candidates;
