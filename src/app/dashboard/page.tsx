"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/context/AuthContext";
import styles from "./dashboard.module.scss";

export default function Dashboard() {
  const { user, setUser } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!user) router.replace("/auth");
  }, [user]);

  if (!user) return null;

  return (
    <div className={styles.dashboard}>
      <h1>Welcome to the Dashboard</h1>
      <div className={styles.profileCard}>
        <img src={user.thumbnail} alt="User thumbnail" />
        <p>
          <strong>Name:</strong> {user.fullName}
        </p>
        <p>
          <strong>Email:</strong> {user.email}
        </p>
        <p>
          <strong>Phone:</strong> {user.phone}
        </p>
        <p>
          <strong>DOB:</strong> {user.birthDate}
        </p>
        <p>
          <strong>Location:</strong> {user.city}, {user.state}, {user.country}
        </p>
      </div>
      <button
        onClick={() => {
          setUser(null);
          router.push("/auth");
        }}
      >
        Logout
      </button>
    </div>
  );
}
