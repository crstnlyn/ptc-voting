import React, { useEffect, useState } from "react";
import { UserCheck, UserRoundPen, Users, UserStar } from "lucide-react";
import Card from "./Card";
import { db } from "../config/Firebase";
import ChartComponent from "./ChartComponent";
import useDashboardCount from "../hooks/useDashboardCount";
import { NavLink, useNavigate } from "react-router-dom";

const Dashboard = () => {
  const [userCount, setUserCount] = useState(0);
  const [applicantCount, setApplicantCount] = useState(0);
  const [candidatesCount, setCandidateCount] = useState(0);
  const [votescastedCount, setVotescastedCount] = useState(0);
  const [rejected, setRejectedCount] = useState(0);
  const [approved, setApprovedCount] = useState(0);
  const [loading, setLoading] = useState(true);
  const [months, setMonths] = useState([]);
  const [values, setValues] = useState([]);

  useDashboardCount({
    setUserCount,
    setApplicantCount,
    setCandidateCount,
    setVotescastedCount,
    setApprovedCount,
    setRejectedCount,
    setMonths,
    setValues,
    setLoading,
  });

  const navigate = useNavigate();

  return (
    <div className=" min-w-full p-4 flex flex-col gap-6 bg-base-100 ">
      {loading ? (
        <div className="w-auto h-full flex items-center justify-center ">
          <span class="loading loading-spinner text-success loading-xl"></span>
        </div>
      ) : (
        <>
          <div className="flex lg:flex-row flex-col gap-4 justify-evenly items-center ">
            <Card
              num={userCount}
              title="Total Registered"
              icon={
                <Users className="size-10 bg-accent/10 p-2 rounded-full text-accent" />
              }
              footer={
                <button
                  className="btn btn-accent text-base-100 w-full"
                  onClick={() => navigate("/admin/voters")}
                >
                  View
                </button>
              }
            />

            <Card
              num={applicantCount}
              title="Pending Applicants"
              icon={
                <UserRoundPen className="size-10 bg-info/10 p-2 rounded-full text-info" />
              }
              footer={
                <button
                  className="btn btn-info text-base-100 w-full"
                  onClick={() => navigate("/admin/applicants  ")}
                >
                  View
                </button>
              }
            />

            <Card
              num={candidatesCount}
              title="Total Candidates"
              icon={
                <UserStar className="size-10 bg-warning/10 p-2 rounded-full text-warning" />
              }
              footer={
                <button
                  className="btn btn-warning text-base-100 w-full"
                  onClick={() => navigate("/admin/candidates")}
                >
                  View
                </button>
              }
            />

            <Card
              num={votescastedCount}
              title="Vote Casted"
              icon={
                <UserCheck className="size-10 bg-success/10 p-2 rounded-full text-success" />
              }
              footer={
                <div className="w-full h-12 flex items-center justify-center gap-2">
                  <div className="w-full h-3 bg-gray-200 rounded-full ">
                    <div
                      className="w-full h-3 bg-success rounded-full"
                      style={{
                        width:
                          userCount === 0
                            ? "0%"
                            : `${(votescastedCount / userCount) * 100}%`,
                      }}
                    ></div>
                  </div>
                  <span className="text-xs font-medium text-success ">
                    {userCount === 0
                      ? "0%"
                      : `${((votescastedCount / userCount) * 100).toFixed(2)}%`}
                  </span>
                </div>
              }
            />
          </div>

          {/* Line Chart */}
          <div className="card w-full min-h-[220px] sm:min-h-[280px] lg:h-[320px] shadow-sm   rounded-box p-4 flex items-center justify-center">
            <ChartComponent
              className="border-1 border-black"
              type="line"
              title="User Growth"
              labels={months}
              datas={values}
              color={["#134686"]}
            />
          </div>

          {/* Charts Section */}
          <div className="flex flex-col lg:flex-row gap-4 w-full">
            {/* Doughnut chart */}
            <div className="card flex-1 w-full min-h-[220px] sm:min-h-[280px] lg:h-[320px] shadow-sm rounded-box p-4 flex items-center justify-center">
              <ChartComponent
                type="doughnut"
                labels={["Voters Casted", "Not Voted"]}
                datas={[votescastedCount, userCount - votescastedCount]}
                title="Voter Turnout"
                color={["#4CAF50", "#E0E0E0"]}
              />
            </div>

            {/* Bar chart: Application Status */}
            <div className="card flex-1 w-full min-h-[220px] sm:min-h-[280px] lg:h-[320px] shadow-sm rounded-box p-4 flex items-center justify-center">
              <ChartComponent
                type="bar"
                title="Application Status"
                labels={["Approved", "Rejected", "Pending"]}
                datas={[approved, rejected, applicantCount]}
                color={["#22c55e", "#ef4444", "#facc15"]}
              />
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default Dashboard;
