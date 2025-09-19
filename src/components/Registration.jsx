import React, { use, useEffect, useState } from "react";
import image from "../assets/ptc.png";
import { auth, db } from "./config/Firebase";
import { signInWithEmailAndPassword } from "firebase/auth";
import Modal from "./Modal";
import RegForm from "./RegForm";
import { ToastContainer, toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import Loading from "./Loading";
import { doc, getDoc, collection } from "firebase/firestore";

const Registration = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isModalOpen, setModalOpen] = useState(false);
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [userDetails, setUserDetails] = useState("");

  const handleSignin = async (e) => {
    e.preventDefault();
    try {
      const userCred = await signInWithEmailAndPassword(auth, email, password);
      setLoading(true);
      toast.success("Successfully logged in!", {
        position: "top-center",
      });
      const docRef = doc(db, "Admin", userCred.user.uid);
      const docSnap = await getDoc(docRef);
      if (docSnap.exists()) {
        navigate("/admin");
      } else {
        navigate("/student");
      }
    } catch (err) {
      toast.error(err.message, {
        position: "top-center",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      {loading && <Loading />}
      <div
        className="min-h-screen flex justify-center bg-left bg-cover relative"
        style={{ backgroundImage: "url('/FuturePtc2.png')" }}
      >
        <div className="flex-1 flex flex-col justify-center items-center bg-gradient-to-br from-[rgba(38_184_28)] text-white p-10">
          <h1 className="text-5xl font-bold mb-6">PTCian's Choice</h1>
          <p className="text-lg max-w-lg text-center">
            Your Voice, Your Vote, Your Future.
          </p>
        </div>

        <div className="w-full max-w-md items-center justify-center bg-white/90 shadow-lg overflow-hidden flex flex-col lg:flex-row p-8 rounded-tl-lg rounded-bl-lg">
          <div className="card w-full flex flex-col items-center ">
            <img src={image} alt="" className="size-40 " />

            <form onSubmit={handleSignin} className="w-full space-y-4">
              <div>
                <label htmlFor="username" className="block font-semibold ">
                  Username:
                </label>
                <input
                  type="email"
                  id="username"
                  name="username"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="juandelacruz123@paterostechnologicalcollege.edu.ph"
                  className=" input w-full h-10 border-2 rounded-md px-3 focus:outline-none focus:ring-2 focus:ring-green-500 text-black"
                  required
                />
              </div>
              <div>
                <label htmlFor="password" className="block font-semibold">
                  Password:
                </label>
                <input
                  type="password"
                  id="password"
                  name="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="input w-full h-10 border-2 rounded-md px-3 focus:outline-none focus:ring-2 focus:ring-green-500"
                  required
                />
              </div>
              <button type="submit" class="btn btn-outline btn-success w-full">
                Log in
              </button>
            </form>
          </div>
        </div>

        <ToastContainer />
      </div>
    </>
  );
};

export default Registration;
