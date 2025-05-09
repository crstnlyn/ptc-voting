import React, { useEffect, useState } from "react";
import { auth, db } from "./config/Firebase";
import {
  addDoc,
  doc,
  getDoc,
  updateDoc,
  collection,
  serverTimestamp,
  loadBundle,
} from "firebase/firestore";
import { signOut } from "firebase/auth";
import Policy_Card from "./Policy_Card";
import Navbar from "./Navbar";
import Modal from "./Modal";
import dp from "../assets/defaultPic.jpg";
import StepperController from "./StepperController";
import Stepper from "./Stepper";
import { StepperContext } from "./StepperContext";
import Personal from "./steps/Personal";
import Identification from "./steps/Identification";
import { toast } from "react-toastify";
import { format } from "date-fns";
import { supabase } from "./config/supabase";
import CandicacyDetails from "./steps/CandicacyDetails";
import PolicyModal from "./PolicyModal";
import Loading from "./Loading";
import Aside from "./Aside";

const StudentDashboard = () => {
  const [isModalOpen, setModalOpen] = useState(true);
  const [showPolicy, setShowPolicy] = useState(false);
  const [userDetails, setUserDetails] = useState(null);
  const [currentStep, setCurrentStep] = useState(1);
  const [userData, setUserData] = useState("");
  const [finalData, setFinalData] = useState([]);
  const [isLoading, setLoading] = useState(false);
  const [isCandidate, setCandidate] = useState(false);

  const [navOpen, setNavOpen] = useState(false);

  const toggleNav = () => setNavOpen(!navOpen);

  const fetchUserData = async () => {
    auth.onAuthStateChanged(async (user) => {
      const docRef = doc(db, "Users", user.uid);
      const docSnap = await getDoc(docRef);
      if (docSnap.exists()) {
        setUserDetails(docSnap.data());
        const data = docSnap.data();
        if (data.isNew) {
          setShowPolicy(true);
        }
        if (data.isCandidate) {
          setCandidate(true);
        }
      } else {
        console.log("doesnt exist");
      }
    });
  };

  useEffect(() => {
    fetchUserData();
  }, []);

  const handleAccept = async () => {
    const username = auth.currentUser;
    if (username) {
      const userRef = doc(db, "Users", username.uid);
      await updateDoc(userRef, {
        isNew: false,
      });
      setShowPolicy(false);
    }
  };

  const steps = [
    "Personal Information",
    "Identification",
    "Candidacy Details",
    "Completed",
  ];

  const displaySteps = (step) => {
    switch (step) {
      case 1:
        return <Personal />;
      case 2:
        return <Identification />;
      case 3:
        return <CandicacyDetails />;
    }
  };

  const isValid = () => {
    if (currentStep === 1) {
      const {
        firstname,
        lastname,
        middleName,
        studentID,
        course,
        yearLevel,
        section,
        email,
        phoneNumber,
      } = userData;
      return (
        firstname &&
        lastname &&
        middleName &&
        studentID &&
        course &&
        yearLevel &&
        section &&
        email &&
        phoneNumber
      );
    } else if (currentStep === 2) {
      const { profilePic, schoolId } = userData;
      return profilePic && schoolId;
    } else if (currentStep === 3) {
      const { position, affiliate, platforms } = userData;
      console.log(platforms);
      return position && affiliate && platforms;
    }

    return true;
  };

  const uploadFile = async (file) => {
    const filePath = `public/${Date.now()}_${file.name}`; // Unique file path

    const { data, error } = await supabase.storage
      .from("candidate-documents") // your bucket
      .upload(filePath, file, {
        cacheControl: "3600",
        upsert: false,
      });

    if (error) {
      console.error("Upload error:", error.message);
      return null;
    }

    const { publicUrl } = supabase.storage
      .from("candidate-documents")
      .getPublicUrl(filePath).data;

    return publicUrl;
  };

  const handleClick = async (direction) => {
    const now = new Date();
    const formattedDate = format(now, "MMMM d, yyyy h:mm a");

    let newStep = currentStep;
    if (direction === "next") {
      if (!isValid()) {
        toast.error("Please fill in all the required fields!", {
          position: "top-center",
        });
        return;
      }

      if (currentStep === steps.length - 1) {
        try {
          setLoading(true);
          let profilePicUrl = "";
          let schoolIDUrl = "";

          if (userData.profilePic) {
            profilePicUrl = await uploadFile(userData.profilePic);
          }

          if (userData.schoolId) {
            schoolIDUrl = await uploadFile(userData.schoolId);
          }
          await addDoc(collection(db, "Candidates"), {
            ...userData,
            profilePic: profilePicUrl,
            schoolId: schoolIDUrl,
            createdAtDate: formattedDate,
          });
          toast.success("Form is submitted!", {
            position: "top-center",
          });
          setUserData({});
          setCurrentStep(1);
        } catch (err) {
          toast.error(err.message, {
            position: "top-center",
          });
        } finally {
          setLoading(false);
          const username = auth.currentUser;
          if (username) {
            const userRef = doc(db, "Users", username.uid);
            await updateDoc(userRef, {
              isCandidate: true,
            });
            setCandidate(true);
          }
        }
      }
      newStep++;
    } else {
      newStep--;
    }

    if (newStep > 0 && newStep <= steps.length && setCurrentStep(newStep)) {
      setCurrentStep(newStep);
    }
  };

  return (
    <div className="w-full h-full bg-[#F5F7F8]">
      {isLoading && <Loading />}
      <Navbar navOpen={navOpen} toggleNav={toggleNav} />

      {userDetails ? (
        <div className="flex flex-col lg:flex-row min-h-screen">
          {/* Sidebar */}
          <div className="">
            <Aside navOpen={navOpen} userDetails={userDetails} />
          </div>
          {/* Main Content */}
          <main className=" lg:w-4/5 w-full px-4 flex justify-center my-5 lg:my-0 ">
            <div className="w-full max-w-full h-[85%] bg-white shadow-xl rounded-xl mt-25 relative">
              {isCandidate ? (
                <div className="flex justify-center items-center lg:h-full h-100 flex-col px-2 ">
                  <h1 className="text-2xl font-bold text-green-600 text-center mt-10">
                    🎉 Thank you for submitting your candidacy!
                  </h1>
                  <p className="text-center text-gray-600 mt-2">
                    We have received your information. Please wait for the
                    confirmation!
                  </p>
                </div>
              ) : (
                <div className="pt-5">
                  <Stepper steps={steps} currentStep={currentStep} />

                  <div className="my-10 p-1">
                    <StepperContext.Provider
                      value={{
                        userData,
                        setUserData,
                        finalData,
                        setFinalData,
                      }}
                    >
                      {displaySteps(currentStep)}
                    </StepperContext.Provider>
                  </div>

                  {/* Stepper Controller */}
                  <div className="w-full px-5 pb-4">
                    <StepperController
                      handleClick={handleClick}
                      currentStep={currentStep}
                      steps={steps}
                    />
                  </div>
                </div>
              )}
            </div>
          </main>
        </div>
      ) : (
        <p className="text-center mt-20">Loading...</p>
      )}

      {/* Policy Modal */}
      {showPolicy && (
        <PolicyModal isOpen={isModalOpen} onClose={() => setModalOpen(false)}>
          <Policy_Card />
          <button
            onClick={handleAccept}
            className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700 mb-5 lg:w-1/8"
          >
            Accept
          </button>
        </PolicyModal>
      )}
    </div>
  );
};

export default StudentDashboard;
