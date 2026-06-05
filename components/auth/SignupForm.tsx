"use client";

import { useState } from "react";


export default function SignupForm() {
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] =
    useState("");

  const [message, setMessage] = useState("");

  async function handleSubmit(
    e: React.FormEvent
  ) {
    e.preventDefault();

    if (password !== confirmPassword) {
      setMessage("Passwords do not match");
      return;
    }

    const response = await fetch(
  "/api/auth/signup",
  {
    method: "POST",
    headers: {
      "Content-Type":
        "application/json",
    },
    body: JSON.stringify({
      fullName,
      email,
      password,
    }),
  }
);

const result =
  await response.json();

if (!response.ok) {
  setMessage(result.error);
  return;
}

    

    setMessage(
      "Verification email sent. Please verify your account."
    );
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="flex flex-col gap-4"
    >
      <input
        placeholder="Full Name"
        value={fullName}
        onChange={(e) =>
          setFullName(e.target.value)
        }
      />

      <input
        placeholder="Email"
        type="email"
        value={email}
        onChange={(e) =>
          setEmail(e.target.value)
        }
      />

      <input
        placeholder="Password"
        type="password"
        value={password}
        onChange={(e) =>
          setPassword(e.target.value)
        }
      />

      <input
        placeholder="Confirm Password"
        type="password"
        value={confirmPassword}
        onChange={(e) =>
          setConfirmPassword(
            e.target.value
          )
        }
      />

      <button type="submit">
        Sign Up
      </button>

      <p>{message}</p>
    </form>
  );
}