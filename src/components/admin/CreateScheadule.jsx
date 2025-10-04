import { useState, useEffect } from "react";
import { doc, onSnapshot, setDoc } from "firebase/firestore";
import { db } from "../config/Firebase";
import { CalendarCheck, CalendarSearch, Vote } from "lucide-react";
import { toast, ToastContainer } from "react-toastify";

const CreateSchedule = () => {
  const [startTime, setStartTime] = useState("");
  const [endTime, setEndTime] = useState("");
  const [loading, setLoading] = useState(false);
  const [schedules, setSchedule] = useState(null);

  const saveSchedule = async () => {
    if (!startTime || !endTime) {
      toast.error("Please select both start and end time.", {
        position: "top-center",
      });
      return;
    }

    setLoading(true);
    try {
      await setDoc(doc(db, "config", "election"), {
        startTime,
        endTime,
      });
      toast.success("Election schedule saved successfully!", {
        position: "top-center",
      });
    } catch (err) {
      console.error(err);
      toast.error("Error saving schedule.", {
        position: "top-center",
      });
    }
    setLoading(false);
  };

  useEffect(() => {
    const docRef = doc(db, "config", "election");

    const unsubscribe = onSnapshot(docRef, (snapshot) => {
      if (snapshot.exists()) {
        setSchedule(snapshot.data());
      } else {
        setSchedule(null);
      }
    });

    return () => unsubscribe();
  }, []);

  return (
    <div className=" min-w-full bg-base-100 ">
      <div className="grid grid-cols-5 grid-rows-4 gap-4">
        <div className="col-span-5">
          <div className="card bg-base-100 shadow-sm">
            <div className="card-body">
              <h2 className="card-title text-black">
                {" "}
                <CalendarCheck className="h-5" /> Election Schedule
              </h2>
              <p className="pl-2">
                <span className="font-semibold">Start:</span>{" "}
                {schedules?.startTime
                  ? new Date(schedules.startTime).toLocaleString()
                  : "Not set"}
              </p>
              <p className="pl-2">
                <span className="font-semibold">End:</span>{" "}
                {schedules?.endTime
                  ? new Date(schedules.endTime).toLocaleString()
                  : "Not set"}
              </p>
            </div>
          </div>
        </div>
        <div className="w-full col-span-3 row-span-2 col-start-2 row-start-2 bg-base-200 p-6 rounded-2xl shadow-lg ">
          <div className="flex justify-center items-center  gap-2 mb-6">
            <CalendarSearch className="w-8 h-6" />
            <h2 className="text-2xl font-bold text-center">
              Set Voting Schedule
            </h2>
          </div>

          {/* Start Time */}
          <div className="form-control">
            <label className="label">
              <span className="label-text">Start Time</span>
            </label>
            <input
              type="datetime-local"
              value={startTime}
              onChange={(e) => setStartTime(e.target.value)}
              className="input input-bordered w-full"
            />
          </div>

          {/* End Time */}
          <div className="form-control mb-4">
            <label className="label">
              <span className="label-text">End Time</span>
            </label>
            <input
              type="datetime-local"
              value={endTime}
              onChange={(e) => setEndTime(e.target.value)}
              className="input input-bordered w-full"
            />
          </div>

          {/* Save Button */}
          <button
            onClick={saveSchedule}
            disabled={loading}
            className="btn btn-success text-base-100 w-full mt-4"
          >
            {loading ? "Saving..." : "Save Schedule"}
          </button>
        </div>
      </div>

      <ToastContainer />
    </div>
  );
};

export default CreateSchedule;
