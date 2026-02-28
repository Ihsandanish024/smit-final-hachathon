const User = require("../models/User");
// const Appointment = require("../models/Appointment");
// const DiagnosisLog = require("../models/DiagnosisLog");

const getDashboardStats = async (req, res) => {
  try {
    // Total counts by role
    const totalPatients = await User.countDocuments({ role: "patient" });
    const totalDoctors = await User.countDocuments({ role: "doctor" });
    const totalReceptionists = await User.countDocuments({ role: "receptionist" });

    // Monthly Appointments (for current month)
    const now = new Date();
    const startMonth = new Date(now.getFullYear(), now.getMonth(), 1);
    const monthlyAppointments = await Appointment.countDocuments({
      date: { $gte: startMonth, $lte: now },
    });

    // Most common diagnosis (top 1)
    const commonDiagnosis = await DiagnosisLog.aggregate([
      { $group: { _id: "$aiResponse", count: { $sum: 1 } } },
      { $sort: { count: -1 } },
      { $limit: 1 },
    ]);

    res.json({
      totalPatients,
      totalDoctors,
      totalReceptionists,
      monthlyAppointments,
      mostCommonDiagnosis: commonDiagnosis[0]?._id || "N/A",
    });
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ message: "Server error" });
  }
};

module.exports = { getDashboardStats };