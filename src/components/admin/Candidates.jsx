import React from "react";
import useCandidates from "./useCandidates";

const Candidates = () => {
  const { groupedCandidates, loading } = useCandidates();
  if (loading) {
    return (
      <div className="w-full h-full flex item-center justify-center">
        <div className="loading loading-spinner text-success"></div>
      </div>
    );
  }

  return (
    <div className="min-w-full h-full p-4">
      <div className="grid grid-cols-6 auto-rows-auto gap-4">
        <div className="col-span-3 row-span-2 p-4 rounded-box ">
          <h1 className="text-center text-xl bg-primary rounded-tl-lg rounded-tr-lg text-base-100 font-bold">
            President
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
        <div className="col-span-3 row-span-2 col-start-4 row-start-3  p-4 rounded-box ">
          <h1 className="text-center text-xl bg-info rounded-tl-lg rounded-tr-lg text-base-100 font-bold">
            Treasurer
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
        <div className="col-span-3 row-span-2 row-start-5  p-4 rounded-box ">
          <h1 className="text-center text-xl bg-warning rounded-tl-lg rounded-tr-lg text-base-100 font-bold">
            Auditor
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
        <div className="col-span-3 row-span-2 col-start-4 row-start-5  p-4 rounded-box ">
          <h1 className="text-center text-xl bg-error rounded-tl-lg rounded-tr-lg text-base-100 font-bold">
            P.I.O
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
      </div>
    </div>
  );
};

export default Candidates;
