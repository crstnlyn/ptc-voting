import React, { useState } from "react";
import image from "../assets/ptc.png";
import { auth } from "./config/Firebase";
import { signInWithEmailAndPassword } from "firebase/auth";
import Modal from "./Modal";
import RegForm from "./RegForm";
import { ToastContainer, toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import Loading from "./Loading";

const Registration = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isModalOpen, setModalOpen] = useState(false);
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const handleSignin = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      await signInWithEmailAndPassword(auth, email, password);
      toast.success("Successfully logged in!", {
        position: "top-center",
      });
      navigate("/student");
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
      <div className="h-screen w-full h-sceen flex items-center justify-center bg-radial from-[rgb(38_184_28)] from-0% to-[rgb(24_35_15)] p-4">
        <div className="w-full max-w-5xl lg:h-[70%] h-[auto]  bg-white shadow-lg rounded-xl overflow-hidden flex flex-col lg:flex-row ">
          {/* Left Section */}
          <div className="w-full lg:w-1/2 flex flex-col items-center justify-center p-6 bg-white lg:border-r-2">
            <img
              src={image}
              alt="PTC Logo"
              className="lg:w-[300px] lg:h-[300px] size-50  object-contain mb-4 "
            />
            <h1 className="text-2xl font-bold text-center">PTCian's Choice</h1>
          </div>

          {/* Right Section */}
          <div className="w-full lg:w-1/2 p-6 flex flex-col justify-center gap-4">
            <form onSubmit={handleSignin} className="space-y-4">
              <div>
                <label htmlFor="username" className="block font-semibold">
                  Username:
                </label>
                <input
                  type="text"
                  id="username"
                  name="username"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="juandelacruz123@paterostechnologicalcollege.edu.ph"
                  className="w-full h-10 border-2 rounded-md px-3 focus:outline-none focus:ring-2 focus:ring-green-500"
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
                  className="w-full h-10 border-2 rounded-md px-3 focus:outline-none focus:ring-2 focus:ring-green-500"
                />
              </div>
              <button
                type="submit"
                className="w-full h-10 bg-green-500 hover:bg-green-700 text-white font-bold rounded-full transition-all duration-300 border-2 border-black"
              >
                Log in
              </button>
            </form>

            <p className="text-center">
              Create new account?{" "}
              <span
                onClick={() => setModalOpen(true)}
                className="text-blue-600 cursor-pointer underline"
              >
                Sign up
              </span>
            </p>
          </div>
        </div>

        {/* Modal */}
        <Modal isOpen={isModalOpen} onClose={() => setModalOpen(false)}>
          <h1 className="text-2xl font-bold mb-4">Register</h1>
          <RegForm />
        </Modal>

        <ToastContainer />
      </div>
    </>
  );
};

export default Registration;
