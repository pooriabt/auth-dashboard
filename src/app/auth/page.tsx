"use client";

import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { loginSchema, LoginFormData } from "@/lib/validation";
import { useAuth } from "@/context/AuthContext";
import Input from "@/components/Input/Input";
import Button from "@/components/Button/Button";
import styles from "./auth.module.scss";

export default function AuthPage() {
  const { setUser } = useAuth();
  const router = useRouter();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
  });

  const onSubmit = async () => {
    const res = await fetch("https://randomuser.me/api/?results=1&nat=us");
    const data = await res.json();
    const user = data.results[0];

    setUser({
      name: `${user.name.first} ${user.name.last}`,
      email: user.email,
      picture: user.picture.thumbnail,
    });

    router.push("/dashboard");
  };

  return (
    <div className={styles.container}>
      <form onSubmit={handleSubmit(onSubmit)} className={styles.form}>
        <h1>Login</h1>
        <Input
          label="Phone Number"
          {...register("phone")}
          error={errors.phone?.message}
        />
        <Button type="submit">Login</Button>
      </form>
    </div>
  );
}
