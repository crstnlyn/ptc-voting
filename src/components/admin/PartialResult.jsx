import React from "react";
import usePartialResult from "../hooks/usePartialResult";

import { useState } from "react";

const PartialResult = () => {
  const { groupedCandidates, loading, userCount, votecastedCount, schedules } =
    usePartialResult();

  if (loading) {
    return (
      <div className="w-full h-full flex items-center justify-center">
        <div className="loading loading-spinner text-success"></div>
      </div>
    );
  }
  return (
    <div className="min-w-full ">
      <div className=" relative lg:h-50 flex flex-col items-center justify-center p-10 ">
        <div
          className=""
          style={{
            backgroundImage: "url('/FuturePtc2.png')",
            backgroundSize: "cover",
            backgroundPosition: "center",
            backgroundRepeat: "no-repeat",
            filter: "blur(5px)",
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
            zIndex: -1,
            position: "absolute",
          }}
        ></div>
        <div className="w-full mb-4">
          <h2 className="text-center text-xl text-base-100 font-bold">
            Voting Schedule
          </h2>
          <p className="text-center text-base-100">
            Start:{" "}
            {schedules?.startTime
              ? new Date(schedules.startTime).toLocaleString()
              : "Not set"}{" "}
            - End:{" "}
            {schedules?.endTime
              ? new Date(schedules.endTime).toLocaleString()
              : "Not set"}
          </p>

          <h1 className="text-xl text-base-100 font-bold text-center mt-2">
            Election Returns Transmitted: {votecastedCount} out of {userCount}{" "}
            Voters
          </h1>
          <h2 className="text-center text-xl text-success  font-black ">
            {userCount === 0
              ? "0%"
              : `${((votecastedCount / userCount) * 100).toFixed(2)}%`}
          </h2>
        </div>

        <div className="w-full h-4 bg-gray-200 rounded-full">
          <div
            className=" h-4 bg-success rounded-full"
            style={{
              width:
                userCount === 0
                  ? "0%"
                  : `${(votecastedCount / userCount) * 100}%`,
            }}
          ></div>
        </div>
      </div>
      <div className="lg:grid grid-cols-8  auto-rows-auto gap-4  ">
        <div className="col-span-3 col-start-2 p-4 rounded-box ">
          <h1 className="text-center text-xl bg-primary rounded-tl-lg rounded-tr-lg text-base-100 font-bold">
            President
          </h1>
          {(groupedCandidates["President"] || []).length === 0 ? (
            <p className="text-center font-bold text-gray-700">No Candidate</p>
          ) : (
            (groupedCandidates["President"] || []).map((c) => (
              <div className="card shadow-md " key={c.id}>
                <div className=" card-body flex flex-col gap-3">
                  <div className="w-full flex justify-between items-center">
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

                  <div className="w-full items-center justify-center gap-2">
                    <div className="w-full h-3 bg-gray-200 rounded-full ">
                      <div
                        className="h-3 bg-success rounded-full"
                        style={{
                          width:
                            c.voteCount > 0
                              ? `${(c.voteCount / userCount) * 100}%`
                              : "0%",
                        }}
                      ></div>
                    </div>
                    <p className="text-xs font-medium text-success ">
                      {c.voteCount > 0 ? c.voteCount : 0} votes ({" "}
                      {c.voteCount > 0
                        ? ((c.voteCount / userCount) * 100).toFixed(2)
                        : 0}
                      % )
                    </p>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
        <div className="col-span-3 col-start-5  p-4 rounded-box">
          <h1 className="text-center text-xl bg-secondary rounded-tl-lg rounded-tr-lg text-base-100 font-bold">
            Vice-President
          </h1>
          {(groupedCandidates["Vice-President"] || []).length === 0 ? (
            <p className="text-center font-bold text-gray-700">No Candidate</p>
          ) : (
            (groupedCandidates["Vice-President"] || []).map((c) => (
              <div className="card shadow-md " key={c.id}>
                <div className=" card-body flex flex-col gap-3">
                  <div className="w-full flex justify-between items-center">
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

                  <div className="w-full items-center justify-center gap-2">
                    <div className="w-full h-3 bg-gray-200 rounded-full ">
                      <div
                        className="h-3 bg-success rounded-full"
                        style={{
                          width:
                            c.voteCount > 0
                              ? `${(c.voteCount / userCount) * 100}%`
                              : "0%",
                        }}
                      ></div>
                    </div>
                    <p className="text-xs font-medium text-success ">
                      {c.voteCount > 0 ? c.voteCount : 0} votes ({" "}
                      {c.voteCount > 0
                        ? ((c.voteCount / userCount) * 100).toFixed(2)
                        : 0}
                      % )
                    </p>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
        <div className="col-span-3 col-start-2 row-start-2  p-4 rounded-box ">
          <h1 className="text-center text-xl bg-accent rounded-tl-lg rounded-tr-lg text-base-100 font-bold">
            Secretary
          </h1>
          {(groupedCandidates["Secretary"] || []).length === 0 ? (
            <p className="text-center font-bold text-gray-700">No Candidate</p>
          ) : (
            (groupedCandidates["Secretary"] || []).map((c) => (
              <div className="card shadow-md " key={c.id}>
                <div className=" card-body flex flex-col gap-3">
                  <div className="w-full flex justify-between items-center">
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

                  <div className="w-full items-center justify-center gap-2">
                    <div className="w-full h-3 bg-gray-200 rounded-full ">
                      <div
                        className="h-3 bg-success rounded-full"
                        style={{
                          width:
                            c.voteCount > 0
                              ? `${(c.voteCount / userCount) * 100}%`
                              : "0%",
                        }}
                      ></div>
                    </div>
                    <p className="text-xs font-medium text-success ">
                      {c.voteCount > 0 ? c.voteCount : 0} votes ({" "}
                      {c.voteCount > 0
                        ? ((c.voteCount / userCount) * 100).toFixed(2)
                        : 0}
                      % )
                    </p>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
        <div className="col-span-3  col-start-5 row-start-3 p-4 rounded-box ">
          <h1 className="text-center text-xl bg-info rounded-tl-lg rounded-tr-lg text-base-100 font-bold">
            Treasurer
          </h1>
          {(groupedCandidates["Treasurer"] || []).length === 0 ? (
            <p className="text-center font-bold text-gray-700">No Candidate</p>
          ) : (
            (groupedCandidates["Treasurer"] || []).map((c) => (
              <div className="card shadow-md " key={c.id}>
                <div className=" card-body flex flex-col gap-3">
                  <div className="w-full flex justify-between items-center">
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

                  <div className="w-full items-center justify-center gap-2">
                    <div className="w-full h-3 bg-gray-200 rounded-full ">
                      <div
                        className="h-3 bg-success rounded-full"
                        style={{
                          width:
                            c.voteCount > 0
                              ? `${(c.voteCount / userCount) * 100}%`
                              : "0%",
                        }}
                      ></div>
                    </div>
                    <p className="text-xs font-medium text-success ">
                      {c.voteCount > 0 ? c.voteCount : 0} votes ({" "}
                      {c.voteCount > 0
                        ? ((c.voteCount / userCount) * 100).toFixed(2)
                        : 0}
                      % )
                    </p>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
        <div className="col-span-3  col-start-2 row-start-3  p-4 rounded-box ">
          <h1 className="text-center text-xl bg-warning rounded-tl-lg rounded-tr-lg text-base-100 font-bold">
            Auditor
          </h1>
          {(groupedCandidates["Auditor"] || []).length === 0 ? (
            <p className="text-center font-bold text-gray-700">No Candidate</p>
          ) : (
            (groupedCandidates["Auditor"] || []).map((c) => (
              <div className="card shadow-md " key={c.id}>
                <div className=" card-body flex flex-col gap-3">
                  <div className="w-full flex justify-between items-center">
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

                  <div className="w-full items-center justify-center gap-2">
                    <div className="w-full h-3 bg-gray-200 rounded-full ">
                      <div
                        className="h-3 bg-success rounded-full"
                        style={{
                          width:
                            c.voteCount > 0
                              ? `${(c.voteCount / userCount) * 100}%`
                              : "0%",
                        }}
                      ></div>
                    </div>
                    <p className="text-xs font-medium text-success ">
                      {c.voteCount > 0 ? c.voteCount : 0} votes ({" "}
                      {c.voteCount > 0
                        ? ((c.voteCount / userCount) * 100).toFixed(2)
                        : 0}
                      % )
                    </p>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
        <div className="col-span-3 col-start-5 p-4 rounded-box ">
          <h1 className="text-center text-xl bg-error rounded-tl-lg rounded-tr-lg text-base-100 font-bold">
            P.I.O
          </h1>
          {(groupedCandidates["P.I.O"] || []).length === 0 ? (
            <p className="text-center font-bold text-gray-700">No Candidate</p>
          ) : (
            (groupedCandidates["P.I.O"] || []).map((c) => (
              <div className="card shadow-md " key={c.id}>
                <div className=" card-body flex flex-col gap-3">
                  <div className="w-full flex justify-between items-center">
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

                  <div className="w-full items-center justify-center gap-2">
                    <div className="w-full h-3 bg-gray-200 rounded-full ">
                      <div
                        className="h-3 bg-success rounded-full"
                        style={{
                          width:
                            c.voteCount > 0
                              ? `${(c.voteCount / userCount) * 100}%`
                              : "0%",
                        }}
                      ></div>
                    </div>
                    <p className="text-xs font-medium text-success ">
                      {c.voteCount > 0 ? c.voteCount : 0} votes ({" "}
                      {c.voteCount > 0
                        ? ((c.voteCount / userCount) * 100).toFixed(2)
                        : 0}
                      % )
                    </p>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default PartialResult;
