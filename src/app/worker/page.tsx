 "use client";

import { FormEvent, useEffect, useState } from "react";
import { useRouter } from "next/navigation";

const initial = {
  customerName: "", customerMobile: "", fullAddress: "",
  city: "", district: "", state: "Rajasthan", pincode: "",
  projectType: "Residential", capacityKw: "",
  panelBrand: "", inverterBrand: "",
  installationDate: "", completionDate: "",
  status: "Completed", description: "", publicImageUrls: [] as string[]
};

export default function WorkerPage() {
  const router = useRouter();
  const [form, setForm] = useState(initial);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const [projects, setProjects] = useState<any[]>([]);

  async function loadMine() {
    const res = await fetch("/api/projects/mine");
    if (res.status === 401) router.push("/login");
    else setProjects((await res.json()).projects || []);
  }

  useEffect(() => { loadMine(); }, []);

  function update(key: string, value: string) {
    setForm(prev => ({ ...prev, [key]: value }));
  }

  async function submit(e: FormEvent) {
    e.preventDefault();
    setError(""); setMessage("");

    const res = await fetch("/api/projects", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        ...form,
        capacityKw: Number(form.capacityKw),
        publicImageUrls: []
      })
    });

    const data = await res.json();

    if (!res.ok) {
      setError(data.error || "Could not submit project.");
      return;
    }

    setMessage(`Published successfully: ${data.project.projectCode}`);
    setForm(initial);
    loadMine();
  }

  async function logout() {
    await fetch("/api/auth/logout", { method: "POST" });
    router.push("/login");
    router.refresh();
  }

  return (
    <main className="container">
      <div className="topbar">
        <div><h1>Worker Project Portal</h1><p className="muted">Submitted projects are published automatically.</p></div>
        <button onClick={logout}>Logout</button>
      </div>

      <form className="card grid" onSubmit={submit}>
        <h2>Customer Information</h2>
        <input placeholder="Customer Name *" value={form.customerName} onChange={e => update("customerName", e.target.value)} />
        <input placeholder="Mobile Number *" value={form.customerMobile} onChange={e => update("customerMobile", e.target.value)} />
        <textarea placeholder="Full Address (private)" value={form.fullAddress} onChange={e => update("fullAddress", e.target.value)} />

        <h2>Public Project Information</h2>
        <input placeholder="City *" value={form.city} onChange={e => update("city", e.target.value)} />
        <input placeholder="District *" value={form.district} onChange={e => update("district", e.target.value)} />
        <input placeholder="State *" value={form.state} onChange={e => update("state", e.target.value)} />
        <input placeholder="Pincode" value={form.pincode} onChange={e => update("pincode", e.target.value)} />
        <select value={form.projectType} onChange={e => update("projectType", e.target.value)}>
          <option>Residential</option><option>Commercial</option><option>Industrial</option><option>Agricultural</option><option>Other</option>
        </select>
        <input type="number" step="0.01" placeholder="Solar Capacity (kW) *" value={form.capacityKw} onChange={e => update("capacityKw", e.target.value)} />
        <input placeholder="Panel Brand" value={form.panelBrand} onChange={e => update("panelBrand", e.target.value)} />
        <input placeholder="Inverter Brand" value={form.inverterBrand} onChange={e => update("inverterBrand", e.target.value)} />
        <input type="date" value={form.installationDate} onChange={e => update("installationDate", e.target.value)} />
        <input type="date" value={form.completionDate} onChange={e => update("completionDate", e.target.value)} />
        <textarea placeholder="Project description" value={form.description} onChange={e => update("description", e.target.value)} />

        {error && <p className="error">{error}</p>}
        {message && <p className="success">{message}</p>}
        <button type="submit">Submit & Publish Project</button>
      </form>

      <section className="card">
        <h2>My Submissions</h2>
        {projects.map(p => (
          <div className="row" key={p.id}>
            <b>{p.projectCode}</b><span>{p.capacityKw} kW</span><span>{p.city}, {p.state}</span><span>{p.status}</span>
          </div>
        ))}
      </section>
    </main>
  );
}