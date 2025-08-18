"use client";

import { useAuth } from "@/context/AuthContext";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import styles from "./dashboard.module.scss";

export default function Dashboard() {
  const { user } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!user) router.replace("/auth");
  }, [user]);

  if (!user) return null;

  return (
    <div className={styles.dashboard}>
      <h1>Welcome to the Dashboard</h1>
      <p>Hello, {user.name}</p>
    </div>
  );
}
