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
  const [isModalOpen, setModalOpen] = useState("");
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const handleSignin = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      // Create a new account using email and password
      await signInWithEmailAndPassword(auth, email, password);
      toast.success("Successfully login!", {
        position: "top-center",
      });
      navigate("/student");
    } catch (err) {
      // Show any error message from Firebase
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
      <div className=" w-full h-screen bg-radial from-[rgb(38_184_28)] from-0% to-[rgb(24_35_15)] flex items-center justify-center ">
        <div
          id="login"
          className="lg:h-[70%] h-[70%] py-5 w-[90%] lg:w-[70%] bg-white shadow-lg rounded-[10px] flex border flex-col lg:flex-row gap-5 lg:gap-0"
        >
          <div className="lg:w-1/2 flex items-center justify-center flex-col gap-2 ">
            <img
              src={image}
              alt="asdas"
              className="lg:w-[300px] lg:h-[300px] size-50 object-cover"
            />
            <h1 className="text-xl font-bold lg:hid ">PTCian's Choice</h1>
          </div>
          <div
            id="right"
            className=" lg:w-1/2 flex flex-col items-center justify-center gap-[10px] lg:border-l-2"
          >
            <form
              onSubmit={handleSignin}
              className="flex flex-col gap-[10px] w-full justify-center items-center lg:px-15  px-5 "
            >
              <div id="username-field" className="flex flex-col  h-auto w-full">
                <label htmlFor="username" className="text-left">
                  Username:
                </label>
                <input
                  className=" h-[40px] rounded-[5px] border-2 pl-2 focus:outline-2 "
                  type="text"
                  id="username"
                  name="username"
                  value={email}
                  placeholder="juandelacruz123@paterostechnologicalcollege.edu.ph"
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
              <div id="password-field" className="flex flex-col h-auto w-full">
                <label htmlFor="password" className="text-left">
                  Password:
                </label>
                <input
                  className=" w-full h-[40px] rounded-[5px] text-[1em] pl-2 border-2 focus:outline-2"
                  type="password"
                  id="password"
                  value={password}
                  name="password"
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>
              <button
                id="login-btn"
                type="submit"
                className="h-[40px] w-full shadow-md font-bold bg-[#0bc94e] text-black rounded-[30px] cursor-pointer border-black border-2 hover:bg-green-700 hover:text-white transition-all duration-300"
              >
                Log in
              </button>
            </form>

            <p>
              Create new account?
              <a
                onClick={() => setModalOpen(true)}
                className="text-[rgb(60_140_231)] cursor-pointer underline underline-offset-1 "
              >
                {" "}
                Sign up
              </a>
            </p>
          </div>

          <Modal isOpen={isModalOpen} onClose={() => setModalOpen(false)}>
            <h1 className="text-2xl font-bold">Register</h1>
            <RegForm />
          </Modal>
        </div>
      </div>
    </>
  );
};

export default Registration;
