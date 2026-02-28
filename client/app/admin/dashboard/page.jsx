"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

export default function AdminDashboard() {
  const router = useRouter();
  const [user, setUser] = useState(null);

  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem("user"));
    if (!storedUser || storedUser.role !== "admin") {
      router.push("/admin/login");
    } else {
      setUser(storedUser);
    }
  }, []);

  if (!user) return <p>Loading...</p>;

  return (
    <div className="p-10">
      <h1 className="text-2xl font-bold">Welcome, {user.name}</h1>
      <p className="mt-4">Role: {user.role}</p>
      <p className="mt-2">Admin dashboard content here</p>
    </div>
  );
}