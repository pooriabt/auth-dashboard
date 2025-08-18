"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/context/AuthContext";
import Input from "@/components/Input/Input";
import Button from "@/components/Button/Button";
import styles from "./auth.module.scss";

export default function AuthPage() {
  const [phone, setPhone] = useState("");
  const [error, setError] = useState("");
  const router = useRouter();
  const { setUser } = useAuth();

  const validatePhone = (value: string) => /^09\d{9}$/.test(value.trim());

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validatePhone(phone)) {
      setError("شماره تلفن معتبر نیست (باید با 09 شروع و 11 رقم باشد)");
      return;
    }

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
        <h1>Login</h1>
        <form onSubmit={onSubmit}>
          <Input
            label="Phone Number"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            placeholder="09xxxxxxxxx"
            error={error}
          />
          <Button type="submit">Login</Button>
        </form>
      </div>
    </div>
  );
}
