// Home login page
"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function LoginForm() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const router = useRouter();

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    setError(null);

    const res = await fetch("/api/auth/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password }),
    });

    if (res.ok) {
      router.push("/Admin-Dashboard"); // Redirect to home page on successful login
    } else {
      const data = await res.json();
      setError(data.message || "Login failed");
    }
  };

  return (
    <div className="flex justify-center items-center h-screen bg-gray-300">
      <form
        onSubmit={handleSubmit}
        className="bg-white p-6 rounded shadow-md w-96"
      >
        <h2 className="text-[30px] font-bold text-center uppercase mb-4">
          Login
        </h2>
        {error && <p className="text-red-500 mb-2">{error}</p>}
        <div className="mb-4">
          <label className="block mb-1 text-[18px] font-medium">Email</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full p-2 border rounded italic"
            required
          />
        </div>
        <div className="mb-4">
          <label className="block mb-1 text-[18px] font-medium">Password</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full p-2 border rounded"
            required
          />
        </div>
        <button
          type="submit"
          className="w-full bg-blue-500 text-white p-2 text-[16px] uppercase rounded"
        >
          Login
        </button>
      </form>
    </div>
  );
}
