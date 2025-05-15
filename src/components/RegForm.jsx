import React, { useState } from "react";
import { auth, googleProvider, db } from "./config/Firebase";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signInWithPopup,
} from "firebase/auth";
import { setDoc, doc } from "firebase/firestore";
import { ToastContainer, toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import Loading from "./Loading";

const RegForm = () => {
  const [reg_student_id, setRegStudentId] = useState("");
  const [reg_fName, setRegFname] = useState("");
  const [reg_lName, setRegLname] = useState("");
  const [reg_email, setRegEmail] = useState("");
  const [reg_course, setRegCourse] = useState("");
  const [reg_password, setRegPassword] = useState("");
  const [reg_confirmPass, setRegConfirmPass] = useState("");
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const handeleSignIn = async (e) => {
    e.preventDefault();

    if (reg_password !== reg_confirmPass) {
      toast.error("Password and Confirm Password do not match", {
        position: "top-center",
      });
    } else {
      const allowedDomain = "@paterostechnologicalcollege.edu.ph"; // <-- your allowed domain here

      if (!reg_email.endsWith(allowedDomain)) {
        toast.error("Please use your institutional email address.", {
          position: "top-center",
        });
        return;
      }
      try {
        setLoading(true);
        await createUserWithEmailAndPassword(auth, reg_email, reg_password);
        const user = auth.currentUser;
        if (user) {
          await setDoc(doc(db, "Users", user.uid), {
            firstName: reg_fName,
            lastName: reg_lName,
            studentID: reg_student_id,
            email: reg_email,
            course: reg_course,
            password: reg_password,
            isVoted: false,
            isNew: true,
            isCandidate: false,
          });
        }
        toast.success("User Registered Successfully", {
          position: "top-center",
        });
        setRegStudentId("");
        setRegEmail("");
        setRegCourse("");
        setRegPassword("");

        await signInWithEmailAndPassword(auth, reg_email, reg_password);
        navigate("/student");
      } catch (error) {
        toast.error(error.message, {
          position: "top-center",
        });
      } finally {
        setLoading(false);
      }
    }
  };

  return (
    <>
      {loading && <Loading />}
      <div className="w-full h-auto">
        <form
          action=""
          onSubmit={handeleSignIn}
          className="w-full border-black px-10 flex flex-col gap-3"
        >
          <div id="reg-fname_input" className="flex flex-col">
            <label htmlFor="reg_fName">First Name:</label>
            <input
              type="text"
              id="reg_fName"
              className="h-10 border-black border-2 rounded-md pl-2"
              value={reg_fName}
              onChange={(e) => setRegFname(e.target.value)}
            />
          </div>
          <div id="reg-fname_input" className="flex flex-col">
            <label htmlFor="reg_lName">Last Name:</label>
            <input
              type="text"
              id="reg_lName"
              className="h-10 border-black border-2 rounded-md pl-2"
              value={reg_lName}
              onChange={(e) => setRegLname(e.target.value)}
            />
          </div>
          <div id="reg-schoolID_input" className="flex flex-col">
            <label htmlFor="reg-school-id">School ID:</label>
            <input
              type="text"
              id="reg-school-id"
              className="h-10 border-black border-2 rounded-md pl-2"
              value={reg_student_id}
              onChange={(e) => setRegStudentId(e.target.value)}
            />
          </div>
          <div id="reg-email-input" className="flex flex-col ">
            <label htmlFor="reg-email">Email: </label>
            <input
              type="text"
              id="reg-email"
              className="h-10 border-black border-2 rounded-md pl-2"
              value={reg_email}
              onChange={(e) => setRegEmail(e.target.value)}
            />
          </div>
          <div id="reg-course_input" className="flex flex-col">
            <label htmlFor="reg-course">Course: </label>
            <input
              type="text"
              id="reg-course"
              className="h-10 border-black border-2 rounded-md pl-2"
              value={reg_course}
              onChange={(e) => setRegCourse(e.target.value)}
            />
          </div>
          <div id="reg-password-input" className="flex flex-col">
            <label htmlFor="reg-password">Password: </label>
            <input
              type="password"
              name=""
              id="reg-password"
              className="h-10 border-black border-2 rounded-md pl-2"
              value={reg_password}
              onChange={(e) => setRegPassword(e.target.value)}
            />
          </div>
          <div id="reg-confirm-password-input" className="flex flex-col">
            <label htmlFor="reg-cPassword">Confirm Password: </label>
            <input
              type="password"
              name=""
              id="reg-password"
              className="h-10 border-black border-2 rounded-md pl-2"
              value={reg_confirmPass}
              onChange={(e) => setRegConfirmPass(e.target.value)}
            />
          </div>
          <div className="flex flex-col gap-3">
            <button className="w-full bg-[#0bc94e] text-black font-bold h-10 rounded-md shadow-lg border-2 border-black hover:bg-green-700 hover:text-white transition duration-300 cursor-pointer">
              Register
            </button>
          </div>
        </form>
      </div>
    </>
  );
};

export default RegForm;
