import React, { useEffect, useState } from "react";
import useApplicants from "../hooks/useApplicants";
import { doc, updateDoc } from "firebase/firestore";
import { db } from "../config/Firebase";

const Applicants = () => {
  const [applicants, setApplicants] = useState([]);
  const [loading, setLoading] = useState(false);
  const [btnLoading, setBtnLoading] = useState({});

  const { fetchApplicants } = useApplicants({
    setApplicants,
    setLoading,
  });

  useEffect(() => {
    const unsub = fetchApplicants();
    return () => unsub && unsub();
  }, []);

  const getColorClass = (position) => {
    switch (position) {
      case "President":
        return "badge badge-primary";
      case "Vice-President":
        return "badge badge-secondary";
      case "Secretary":
        return "badge badge-accent";
      case "Treasurer":
        return "badge badge-info";
      case "Auditor":
        return "badge badge-warning";
      case "P.I.O":
        return "badge badge-error";
    }
  };

  const handleStatus = async (applicantID, stats) => {
    try {
      setBtnLoading((prev) => ({ ...prev, [applicantID]: stats }));

      await new Promise((resolve) => setTimeout(resolve, 1500));

      const applicantRef = doc(db, "Candidates", applicantID);
      await updateDoc(applicantRef, { status: stats });
    } catch (error) {
      console.error("Error updating status:", error);
    } finally {
      setBtnLoading((prev) => ({ ...prev, [applicantID]: null }));
    }
  };

  return (
    <div className="min-w-full  p-4 bg-base-100">
      {loading ? (
        <div className="w-full flex align-center justify-center">
          <span className="loading loading-spinner text-success"></span>
        </div>
      ) : (
        <>
          {applicants.length === 0 ? (
            <p className="text-gray-700 font-bold text-center">
              No Applicant/s
            </p>
          ) : (
            applicants.map((applicant) => (
              <div
                className="collapse collapse-arrow bg-base-100 shadow-md rounded-xl mb-3"
                key={applicant.id}
              >
                <input type="checkbox" />
                <div className="collapse-title text-lg font-semibold relative flex justify-between">
                  <div className="">
                    <h1>
                      {applicant.firstname +
                        " " +
                        applicant.middleName +
                        " " +
                        applicant.lastname}
                    </h1>
                    <p
                      className={`text-xs ${getColorClass(applicant.position)}`}
                    >
                      {applicant.position}
                    </p>
                    <p className="text-xs p-1">
                      {applicant.course + " - " + applicant.yearLevel}
                    </p>
                  </div>

                  <div className="shadow-md rounded-full">
                    <img
                      src={applicant.profilePic}
                      alt=""
                      className="rounded-full w-20 h-20"
                    />
                  </div>
                </div>
                <div className="collapse-content">
                  <div className="card bg-base-200 p-4 rounded-xl mb-3">
                    <p>
                      <span className="font-semibold">StudentID: </span>
                      {applicant.studentID}
                    </p>
                    <p>
                      <span className="font-semibold">Section: </span>
                      {applicant.section}
                    </p>
                    <p>
                      <span className="font-semibold">Affiliate: </span>
                      {applicant.affiliate}
                    </p>
                    <p>
                      <span className="font-semibold">Phone Number: </span>
                      {applicant.phoneNumber}
                    </p>
                  </div>
                  <div className="btn-grp flex gap-2 w-auto justify-end mt-4">
                    <button
                      className="btn btn-secondary btn-wide"
                      onClick={() => handleStatus(applicant.id, "reject")}
                      disabled={btnLoading[applicant.id]}
                    >
                      {btnLoading[applicant.id] === "reject" ? (
                        <span className="loading loading-spinner loading-sm"></span>
                      ) : (
                        "Reject"
                      )}
                    </button>

                    <button
                      className="btn btn-success btn-wide text-base-100/80"
                      onClick={() => handleStatus(applicant.id, "approved")}
                      disabled={btnLoading[applicant.id]}
                    >
                      {btnLoading[applicant.id] === "approved" ? (
                        <span className="loading loading-spinner loading-sm"></span>
                      ) : (
                        "Approved"
                      )}
                    </button>
                  </div>
                </div>
              </div>
            ))
          )}
        </>
      )}
    </div>
  );
};

export default Applicants;
