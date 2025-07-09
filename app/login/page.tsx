"use client"; // Enables client-side rendering for this component

import { signIn } from "next-auth/react"; // Import signIn method from NextAuth
import { useRouter } from "next/navigation"; // Next.js router for client-side navigation
import React, { useState } from "react";

function LoginPage() {
  // State hooks for managing form input values
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter(); // Router instance for navigation

  // Handle form submission
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault(); // Prevent default form behavior

    // Attempt to sign in using NextAuth's credentials provider
    const result = await signIn("credentials", {
      email,
      password,
      redirect: false, // Prevent auto redirection
    });

    if (result?.error) {
      // Handle sign-in error
      console.log(result.error);
    } else {
      // Redirect to home page on successful login
      router.push("/");
    }
  };

  return (
    <div>
      <h1>Login</h1>

      {/* Login form */}
      <form onSubmit={handleSubmit}>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)} // Update email state
        />
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)} // Update password state
        />
        <button type="submit">Login</button>
      </form>

      {/* Link to registration page */}
      <div>
        Don&apos;t have an account ?
        <button onClick={() => router.push("/register")}>Register</button>
      </div>
    </div>
  );
}

export default LoginPage;
