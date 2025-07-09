"use client"; // Enables client-side rendering for this component

import { useRouter } from "next/navigation";
import React, { useState } from "react";

function RegisterPage() {
    // State hooks to manage form input values
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const router = useRouter(); // Next.js router for navigation

    // Form submission handler
    const handleSumit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault(); // Prevent page reload on form submit

        // Simple password confirmation check
        if (password !== confirmPassword) {
            alert("passwords do not match");
            return;
        }

        try {
            // Send POST request to the registration API endpoint
            const res = await fetch("/api/auth/register", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    email,
                    password,
                }),
            });

            const data = await res.json();

            // Handle API error response
            if (!res.ok) {
                throw new Error(data.error || "Registration failed");
            }

            console.log(data); // Log response data (can be removed in production)

            // Redirect to login page upon successful registration
            router.push("/login");
        } catch (error) {
            // Log any unexpected errors
            console.error(error);
        }
    };

    return (
        <div>
            <h1>Register</h1>

            {/* Registration Form */}
            <form onSubmit={handleSumit}>
                <input
                    type="email"
                    placeholder="Email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)} // Update email state
                />
                <input
                    type="password"
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)} // Update password state
                />
                <input
                    type="password"
                    placeholder="Confirm Password"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)} // Update confirm password state
                />
                <button type="submit">Register</button>
            </form>

            {/* Link to login page */}
            <div>
                <p>
                    Already have an account? <a href="/login">Login</a>
                </p>
            </div>
        </div>
    );
}

export default RegisterPage;
