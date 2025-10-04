import { Plus, SquarePen, UserLock, UserPen, UserPlus, X } from "lucide-react";
import React, { useState } from "react";
import useManageAdmins from "../hooks/useManageAdmins";
import {
  createUserWithEmailAndPassword,
  getAuth,
  updatePassword,
  reauthenticateWithCredential,
  EmailAuthProvider,
} from "firebase/auth";
import { auth, db } from "../config/Firebase";
import { doc, setDoc, deleteDoc } from "firebase/firestore";
import { toast, ToastContainer } from "react-toastify";

const ManageAdmin = () => {
  const { admins, loading } = useManageAdmins();
  const [fullname, setFullname] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [modalLoading, setModalLoading] = useState(false);
  const [selectedAdminId, setSelectedAdminId] = useState(null);
  const [selectedAdminName, setSelectedAdminName] = useState(null);

  const handleAddAdmin = async (e) => {
    e.preventDefault();
    try {
      setModalLoading(true);
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );

      await setDoc(doc(db, "Admin", userCredential.user.uid), {
        fullname,
        email,
        role: "admin",
        createdAt: new Date(),
      });

      e.target.reset();
    } catch (error) {
      toast.error("Error adding admin ", {
        position: "top-center",
      });
    } finally {
      setModalLoading(false);
      document.getElementById("my_modal_3").close();
      toast.success("Success adding admin! ", {
        position: "top-center",
      });
    }
  };

  const changePassword = async (currentPassword, newPassword) => {
    const auth = getAuth();
    const user = auth.currentUser;

    if (!user) {
      throw new Error("No user is logged in");
    }

    try {
      setModalLoading(true);
      const credential = EmailAuthProvider.credential(
        user.email,
        currentPassword
      );
      await reauthenticateWithCredential(user, credential);
      await updatePassword(user, newPassword);
    } catch (error) {
      toast.error("Error changing password", {
        position: "top-center",
      });
    } finally {
      setModalLoading(false);
      document.getElementById("changePassword").close();
      toast.success("Password changed successfully!", {
        position: "top-center",
      });
    }
  };

  const handleChangePassword = async (e) => {
    e.preventDefault();
    await changePassword(currentPassword, newPassword);
  };

  const handleRemoveAdmin = async (id) => {
    try {
      await deleteDoc(doc(db, "Admin", id));
      toast.success("Admin removed from Firestore!", {
        position: "top-center",
      });
    } catch (error) {
      toast.error(`Error removing admin: ${error.message}`, {
        position: "top-center",
      });
    }
  };

  if (loading) {
    return (
      <div className="w-full h-full flex items-center justify-center">
        <div className="loading loading-spinner text-success"></div>
      </div>
    );
  }

  return (
    <div className="min-w-full p-4 bg-base-100">
      <div className="card shadow-md mt-2">
        <div className="card-body flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <div className="card-title flex items-center gap-2">
            <UserLock className="text-info" />
            <h1 className="text-xl font-bold">Manage Admins</h1>
          </div>

          <div className="btngrp flex flex-wrap gap-3 ">
            <button
              className="btn btn-success text-base-100 flex items-center gap-2 w-full lg:w-auto"
              onClick={() => document.getElementById("my_modal_3").showModal()}
            >
              <Plus /> Add Admin
            </button>
            <button
              className="btn btn-error text-base-100 flex items-center gap-2 w-full lg:w-auto"
              onClick={() =>
                document.getElementById("changePassword").showModal()
              }
            >
              <SquarePen /> Change Password
            </button>
          </div>
        </div>
      </div>

      <div className="overflow-x-auto shadow-md rounded-box mt-4 border border-base-200">
        <table className="table table-zebra w-full lg:table-md table-sm">
          <thead className="bg-base-200">
            <tr>
              <th className="text-center w-12">#</th>
              <th className="text-center">Full Name</th>
              <th className="text-center">Email</th>
              <th className="text-center">Date Created</th>
              <th className="text-center w-28">Action</th>
            </tr>
          </thead>
          <tbody>
            {admins.map((a, i) => (
              <tr key={a.id}>
                <th className="text-center">{i + 1}</th>
                <td className="text-center">{a.fullname || "N/A"}</td>
                <td className="text-center break-words">{a.email}</td>
                <td className="text-center">
                  {a.createdAt ? a.createdAt.toDate().toLocaleString() : ""}
                </td>
                <td className="text-center">
                  <button
                    className="btn btn-circle btn-xs btn-error text-base-100"
                    onClick={() => {
                      setSelectedAdminId(a.id);
                      setSelectedAdminName(a.fullname);
                      document.getElementById("removeAdmin").showModal();
                    }}
                  >
                    <X className="h-4" />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* ===== Add Admin Modal ===== */}
      <dialog id="my_modal_3" className="modal">
        <div className="modal-box">
          {modalLoading ? (
            <div className="w-full h-full flex flex-col items-center justify-center">
              <h1>Loading...</h1>
              <div className="loading loading-spinner text-success mt-2"></div>
            </div>
          ) : (
            <>
              <form method="dialog">
                <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">
                  ✕
                </button>
              </form>
              <div className="flex items-center gap-2 text-lg mb-2">
                <UserPlus />
                <h1>Add New Admin</h1>
              </div>

              <form onSubmit={handleAddAdmin}>
                <fieldset className="fieldset">
                  <label className="label">Fullname</label>
                  <input
                    type="text"
                    className="input w-full"
                    placeholder="Fullname"
                    onChange={(e) => setFullname(e.target.value)}
                  />

                  <label className="label">Email</label>
                  <input
                    type="email"
                    className="input w-full"
                    placeholder="Email"
                    onChange={(e) => setEmail(e.target.value)}
                  />

                  <label className="label">Password</label>
                  <input
                    type="password"
                    className="input w-full"
                    placeholder="Password"
                    onChange={(e) => setPassword(e.target.value)}
                  />

                  <button className="btn btn-success text-base-100 mt-4 w-full">
                    Confirm
                  </button>
                </fieldset>
              </form>
            </>
          )}
        </div>
      </dialog>

      <dialog id="changePassword" className="modal">
        <div className="modal-box">
          {modalLoading ? (
            <div className="w-full h-full flex flex-col items-center justify-center">
              <h1>Loading...</h1>
              <div className="loading loading-spinner text-success mt-2"></div>
            </div>
          ) : (
            <>
              <form method="dialog">
                <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">
                  ✕
                </button>
              </form>
              <div className="flex items-center gap-2 text-lg mb-2">
                <UserPen />
                <h1>Change Password</h1>
              </div>

              <form onSubmit={handleChangePassword}>
                <fieldset className="fieldset">
                  <label className="label">Current Password</label>
                  <input
                    type="password"
                    className="input w-full"
                    placeholder="Current Password"
                    onChange={(e) => setCurrentPassword(e.target.value)}
                  />

                  <label className="label">New Password</label>
                  <input
                    type="password"
                    className="input w-full"
                    placeholder="New Password"
                    onChange={(e) => setNewPassword(e.target.value)}
                  />

                  <button className="btn btn-error text-base-100 mt-4 w-full">
                    Confirm
                  </button>
                </fieldset>
              </form>
            </>
          )}
        </div>
      </dialog>

      <dialog id="removeAdmin" className="modal">
        <div className="modal-box">
          <h3 className="font-bold text-lg text-error">Remove Admin</h3>
          <p className="py-4">
            Are you sure you want to remove{" "}
            <span className="font-semibold">{selectedAdminName}</span>?
          </p>
          <div className="modal-action flex gap-2">
            <button
              onClick={() => handleRemoveAdmin(selectedAdminId)}
              className="btn btn-error text-white"
            >
              Confirm
            </button>
            <form method="dialog">
              <button className="btn">Close</button>
            </form>
          </div>
        </div>
      </dialog>

      <ToastContainer />
    </div>
  );
};

export default ManageAdmin;
