"use client";

import { useEffect, useState } from "react";
import { api } from "@/lib/api";

export default function AnalyticsCards() {
  const [stats, setStats] = useState(null);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const { data } = await api.get("/admin/stats");
        setStats(data);
      } catch (error) {
        console.error(error);
      }
    };
    fetchStats();
  }, []);

  if (!stats) return <p>Loading analytics...</p>;

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
      <div className="bg-white p-6 rounded shadow">
        <h3 className="text-gray-500">Total Patients</h3>
        <p className="text-2xl font-bold">{stats.totalPatients}</p>
      </div>
      <div className="bg-white p-6 rounded shadow">
        <h3 className="text-gray-500">Total Doctors</h3>
        <p className="text-2xl font-bold">{stats.totalDoctors}</p>
      </div>
      <div className="bg-white p-6 rounded shadow">
        <h3 className="text-gray-500">Total Receptionists</h3>
        <p className="text-2xl font-bold">{stats.totalReceptionists}</p>
      </div>
      <div className="bg-white p-6 rounded shadow">
        <h3 className="text-gray-500">Monthly Appointments</h3>
        <p className="text-2xl font-bold">{stats.monthlyAppointments}</p>
      </div>
      <div className="bg-white p-6 rounded shadow">
        <h3 className="text-gray-500">Most Common Diagnosis</h3>
        <p className="text-2xl font-bold">{stats.mostCommonDiagnosis}</p>
      </div>
    </div>
  );
}