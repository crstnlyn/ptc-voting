import React from "react";
import useVoters from "../hooks/useVoters.jsx";
import Card from "./Card.jsx";
import { UserRound, UserRoundCheck, UserStar, UserX } from "lucide-react";

const Voters = () => {
  const {
    voters,
    loading,
    votersCount,
    candidateCounts,
    votedCounts,
    notVotedCount,
  } = useVoters();

  if (loading) {
    return (
      <div className="w-full h-full flex items-center justify-center">
        <div className="loading loading-spinner text-success"></div>
      </div>
    );
  }

  return (
    <div className="min-w-full p-5 flex flex-col gap-4">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="card shadow-sm">
          <div className="card-body">
            <div className="card-title justify-between">
              <div className="flex items-center gap-2 text-info">
                <UserRound /> <h1>User List</h1>
              </div>
              <span>All ({votersCount})</span>
            </div>
          </div>
        </div>

        <div className="card shadow-sm">
          <div className="card-body">
            <div className="card-title justify-between">
              <div className="flex items-center gap-2 text-warning">
                <UserStar /> <h1>Candidates</h1>
              </div>
              <span>{candidateCounts}</span>
            </div>
          </div>
        </div>

        <div className="card shadow-sm">
          <div className="card-body">
            <div className="card-title justify-between">
              <div className="flex items-center gap-2 text-error">
                <UserX /> <h1>Not Yet Voted</h1>
              </div>
              <span>{notVotedCount}</span>
            </div>
          </div>
        </div>

        <div className="card shadow-sm">
          <div className="card-body">
            <div className="card-title justify-between">
              <div className="flex items-center gap-2 text-success">
                <UserRoundCheck /> <h1>Vote Casted</h1>
              </div>
              <span>{votedCounts}</span>
            </div>
          </div>
        </div>
      </div>

      {voters.length === 0 ? (
        <div className="mt-2">
          <h1 className="font-bold text-center text-gray-500">
            No Registered User Yet
          </h1>
        </div>
      ) : (
        <div className="overflow-x-auto shadow-lg rounded-md border-2 border-base-200">
          <table className="table table-zebra w-full text-sm md:text-base table-sm lg:table-md">
            <thead className="text-base bg-base-200">
              <tr>
                <th className="w-12 text-center">#</th>
                <th>Email</th>
                <th className="text-center">Date Created</th>
                <th className="text-center">Candidate</th>
                <th className="w-20 text-center">Voted</th>
              </tr>
            </thead>
            <tbody>
              {voters.map((user, index) => (
                <tr key={user.id}>
                  <th className="text-center">{index + 1}</th>
                  <td className="truncate max-w-[200px]">{user.maskedEmail}</td>
                  <td className="text-center">
                    {user.timestamp
                      ? user.timestamp.toDate().toLocaleString()
                      : "N/A"}
                  </td>
                  <td className="text-center">
                    <span
                      className={`badge ${
                        user.isCandidate ? "badge-success" : "badge-warning"
                      } text-base-100`}
                    >
                      {user.isCandidate ? "Yes" : "No"}
                    </span>
                  </td>
                  <td className="w-20 text-center">
                    <span
                      className={`badge ${
                        user.isVoted ? "badge-success" : "badge-error"
                      } text-base-100`}
                    >
                      {user.isVoted ? "Yes" : "No"}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default Voters;
