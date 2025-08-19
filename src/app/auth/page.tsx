"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/context/AuthContext";
import { z } from "zod";
import Button from "@/components/Button/Button";
import styles from "./auth.module.scss";

const schema = z.object({
  phone: z
    .string()
    .regex(
      /^09\d{9}$/,
      "شماره تلفن معتبر نیست (باید با 09 شروع و 11 رقم باشد)"
    ),
});

export default function AuthPage() {
  const [phone, setPhone] = useState("");
  const [error, setError] = useState("");
  const router = useRouter();
  const { setUser } = useAuth();

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const result = schema.safeParse({ phone });

    if (!result.success) {
      const issue = result.error.issues?.[0];
      if (issue) {
        setError(issue.message);
      }
      return;
    }

    setError("");

    const res = await fetch("https://randomuser.me/api/?results=1&nat=us");
    const data = await res.json();
    const rawUser = data.results[0];

    const formattedUser = {
      fullName: `${rawUser.name.first} ${rawUser.name.last}`,
      email: rawUser.email,
      phone: rawUser.phone,
      birthDate: new Date(rawUser.dob.date).toLocaleDateString(),
      city: rawUser.location.city,
      state: rawUser.location.state,
      country: rawUser.location.country,
      thumbnail: rawUser.picture.thumbnail,
    };

    setUser(formattedUser);
    router.push("/dashboard");
  };

  return (
    <div className={styles.container}>
      <div className={styles.card}>
        <h1>Sign In</h1>

        <form onSubmit={onSubmit} className={styles.form}>
          <div className={styles.inputRow}>
            <label htmlFor="phone">Phone Number :</label>
            <input
              id="phone"
              type="text"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              placeholder="09xxxxxxxxx"
            />
          </div>

          {error && <p className={styles.error}>{error}</p>}

          <Button type="submit" className={styles.loginButton}>
            Login
          </Button>
        </form>
      </div>
    </div>
  );
}
