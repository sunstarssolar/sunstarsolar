 "use client";

import { FormEvent, useState } from "react";
import { useRouter } from "next/navigation";

export default function WorkerLogin() {
  const router = useRouter();
  const [workerCode, setWorkerCode] = useState("");
  const [pin, setPin] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function submit(e: FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError("");

    const res = await fetch("/api/auth/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ workerCode, pin })
    });

const responseText = await res.text();

let data: { error?: string; ok?: boolean; worker?: any } = {};

try {
  data = responseText ? JSON.parse(responseText) : {};
} catch {
  console.error("Invalid API response:", responseText);
  setError("Server returned an invalid response. Check the terminal/server logs.");
  setLoading(false);
  return;
}

if (!res.ok) {
  setError(data.error || "Login failed");
  setLoading(false);
  return;
}

router.push("/worker");
router.refresh();

    router.push("/worker");
    router.refresh();
  }

  return (
    <main className="center">
      <form className="card" onSubmit={submit}>
        <h1>Worker Login</h1>
        <p className="muted">Use the Worker ID and PIN provided by SM Green Energy.</p>

        <label>Worker ID</label>
        <input value={workerCode} onChange={e => setWorkerCode(e.target.value)} placeholder="SMW-001" />

        <label>PIN</label>
        <input value={pin} onChange={e => setPin(e.target.value)} type="password" inputMode="numeric" />

        {error && <p className="error">{error}</p>}
        <button disabled={loading}>{loading ? "Signing in..." : "Login"}</button>
      </form>
    </main>
  );
}