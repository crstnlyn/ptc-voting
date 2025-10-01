import { Plus, SquarePen, UserLock, UserPen, UserPlus, X } from "lucide-react";
import React, { useState } from "react";
import useManageAdmins from "../hooks/useManageAdmins";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth, db } from "../config/Firebase";
import { doc, setDoc } from "firebase/firestore";

const ManageAdmin = () => {
  const { admins, loading } = useManageAdmins();
  const [fullname, setFullname] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleAddAdmin = async (e) => {
    e.preventDefault();
    try {
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

      document.getElementById("my_modal_3").close();
      e.target.reset();
    } catch (error) {
      console.error("Error Adding Admin ");
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
        <div className="card-body flex-row justify-between ">
          <div className="card-title">
            <UserLock />
            <h1 className="text-xl font-bold">Manage Admins</h1>
          </div>
          <div className="btngrp flex gap-4">
            <button
              className="btn btn-success text-base-100"
              onClick={() => document.getElementById("my_modal_3").showModal()}
            >
              <Plus /> Add Admin
            </button>
            <button
              className="btn btn-error text-base-100"
              onClick={() =>
                document.getElementById("changePassword").showModal()
              }
            >
              <SquarePen /> Change Password
            </button>
          </div>
        </div>
      </div>

      <div className="overflow-x-auto shadow-md rounded-box mt-2">
        <table className="table table-zebra">
          <thead>
            <tr>
              <th></th>
              <th className="text-center">Fullname</th>
              <th className="text-center">Email</th>
              <th className="text-center">Date Created</th>
              <th className="w-30 text-center">Action</th>
            </tr>
          </thead>
          <tbody>
            {admins.map((a, i) => (
              <tr key={a.id}>
                <th>{i + 1}</th>
                <td className="text-center">{a.fullname || "N/A"}</td>
                <td className="text-center">{a.email}</td>
                <td className="text-center">
                  {a.createdAt ? a.createdAt.toDate().toLocaleString() : ""}
                </td>
                <td className="text-center">
                  <button className="btn  btn-circle btn-xs btn-error text-base-100 ">
                    {" "}
                    <X className="h-4 " />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Modals */}
      <dialog id="my_modal_3" className="modal">
        <div className="modal-box">
          <form method="dialog">
            {/* if there is a button in form, it will close the modal */}
            <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">
              ✕
            </button>
          </form>
          <div className=" flex gap-2 text-lg mb-2">
            <UserPlus />
            <h1>Add New Admin</h1>
          </div>

          <form action="" onSubmit={handleAddAdmin}>
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
              <button className="btn btn-success text-base-100 mt-4">
                Confirm
              </button>
            </fieldset>
          </form>
        </div>
      </dialog>

      {/*  modal 2 */}
      <dialog id="changePassword" className="modal">
        <div className="modal-box">
          <form method="dialog">
            {/* if there is a button in form, it will close the modal */}
            <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">
              ✕
            </button>
          </form>
          <div className=" flex gap-2 text-lg mb-2">
            <UserPen />
            <h1>Change Password</h1>
          </div>

          <form action="">
            <fieldset className="fieldset">
              <label className="label">Current Password</label>
              <input
                type="password"
                className="input w-full"
                placeholder="Current Password"
              />
              <label className="label">New Password</label>
              <input
                type="password"
                className="input w-full"
                placeholder="New Password"
              />
              <button className="btn btn-error text-base-100 mt-4">
                Confirm
              </button>
            </fieldset>
          </form>
        </div>
      </dialog>
    </div>
  );
};

export default ManageAdmin;
