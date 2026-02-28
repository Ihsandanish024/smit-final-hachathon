"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";

export default function AutoLogin() {
  const router = useRouter();

  useEffect(() => {
    const autoLogin = async () => {
      try {
        // ✅ replace with your admin credentials
        const email = "admin@example.com";
        const password = "admin123";

        const { data } = await axios.post(
          `${process.env.NEXT_PUBLIC_API_URL}/auth/login`,
          { email, password }
        );

        // Save token & user in localStorage
        localStorage.setItem("token", data.token);
        localStorage.setItem("user", JSON.stringify(data.user));

        // Redirect to dashboard
        router.push("");
      } catch (err) {
        console.error("Auto login failed:", err.response?.data || err.message);
      }
    };

    autoLogin();
  }, [router]);

  return <p>Logging in...</p>;
}