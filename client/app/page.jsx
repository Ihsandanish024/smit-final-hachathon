"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import UsersTable from "./admin/dashboard/UserTable";
import UserModal from "./admin/dashboard/UserModal";
import AnalyticsCards from "./admin/dashboard/AnalyticsCards";

export default function AdminDashboard() {
  const router = useRouter();
  const [user, setUser] = useState(null);
  const [modalOpen, setModalOpen] = useState(false);
  const [editUser, setEditUser] = useState(null);

  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem("user"));
    if (!storedUser || storedUser.role !== "admin") router.push("/admin/login");
    else setUser(storedUser);
  }, []);

  if (!user) return <p>Loading...</p>;

  return (
    <div className="flex min-h-screen">
      {/* Sidebar */}
      <aside className="w-64 bg-gray-900 text-white p-6">
        <h1 className="text-2xl font-bold mb-6">Clinic Admin</h1>
        <nav className="flex flex-col space-y-3">
          <button onClick={() => setModalOpen(true)} className="bg-blue-600 py-2 px-4 rounded hover:bg-blue-700">Create User</button>
        </nav>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-6 bg-gray-100">
        <h2 className="text-xl font-semibold mb-4">Analytics</h2>
        <AnalyticsCards />

        <h2 className="text-xl font-semibold mb-4">All Users</h2>
        <UsersTable setEditUser={setEditUser} setModalOpen={setModalOpen} />
      </main>

      {modalOpen && (
        <UserModal setModalOpen={setModalOpen} editUser={editUser} setEditUser={setEditUser} />
      )}
    </div>
  );
}