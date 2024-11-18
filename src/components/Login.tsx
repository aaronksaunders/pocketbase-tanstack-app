import { useState } from "react";
import { login } from "../api/auth";
import { Link, useNavigate } from "@tanstack/react-router";

export default function Login({ redirect }: { redirect?: string }) {
  console.log("redirect", redirect);
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await login(email, password);
      navigate({
        to: redirect || "/home",
        replace: true,
      });
    } catch (err) {
      console.error(err);
      setError(
        "Invalid email or password " + (err as { message: string }).message
      );
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      {error && <div style={{ color: "red", marginBottom: 10 }}>{error}</div>}
      <input
        type="email"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <button type="submit">Login</button>
      <Link to="/create-account">Create Account</Link>
    </form>
  );
}
