"use client";

import { useState, useEffect } from "react";
import { api } from "@/lib/api";

export default function UserModal({ setModalOpen, editUser, setEditUser }) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [role, setRole] = useState("doctor");
  const [password, setPassword] = useState("");

  useEffect(() => {
    if (editUser) {
      setName(editUser.name);
      setEmail(editUser.email);
      setRole(editUser.role);
      setPassword(""); // optional
    }
  }, [editUser]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (editUser) {
        await api.put(`/users/${editUser._id}`, { name, email, role });
      } else {
        await api.post("/users", { name, email, role, password });
      }
      setModalOpen(false);
      setEditUser(null);
      window.location.reload(); // refresh users table
    } catch (error) {
      console.error(error);
      alert(error.response?.data?.message || "Something went wrong");
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-40 flex justify-center items-center">
      <div className="bg-white p-6 rounded w-96">
        <h2 className="text-xl font-bold mb-4">{editUser ? "Edit User" : "Create User"}</h2>
        <form onSubmit={handleSubmit} className="space-y-3">
          <input
            className="w-full border px-2 py-1"
            placeholder="Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
          <input
            className="w-full border px-2 py-1"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            type="email"
            required
          />
          {!editUser && (
            <input
              className="w-full border px-2 py-1"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              type="password"
              required
            />
          )}
          <select
            className="w-full border px-2 py-1"
            value={role}
            onChange={(e) => setRole(e.target.value)}
            required
          >
            <option value="doctor">Doctor</option>
            <option value="receptionist">Receptionist</option>
            <option value="patient">Patient</option>
            <option value="admin">Admin</option>
          </select>
          <div className="flex justify-end space-x-2 mt-3">
            <button type="button" onClick={() => setModalOpen(false)} className="px-4 py-2 bg-gray-300 rounded hover:bg-gray-400">Cancel</button>
            <button type="submit" className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700">{editUser ? "Update" : "Create"}</button>
          </div>
        </form>
      </div>
    </div>
  );
}