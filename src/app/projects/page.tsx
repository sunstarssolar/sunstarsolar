import { prisma } from "@/lib/prisma";

export default async function ProjectsPage() {
  const projects = await prisma.project.findMany({
    where: { isPublic: true },
    select: {
      id: true, projectCode: true, city: true, district: true, state: true,
      projectType: true, capacityKw: true, panelBrand: true, inverterBrand: true,
      completionDate: true, status: true, description: true, publicImageUrls: true
    },
    orderBy: { createdAt: "desc" }
  });

  return (
    <main className="container">
      <h1>Our Solar Projects</h1>
      <p className="muted">Completed and published solar installations.</p>
      <div className="projects">
        {projects.map(p => (
          <article className="card" key={p.id}>
            <h2>{p.capacityKw} kW {p.projectType} Solar Project</h2>
            <p>📍 {p.city}, {p.district}, {p.state}</p>
            <p>☀️ Panel: {p.panelBrand || "—"}</p>
            <p>⚡ Inverter: {p.inverterBrand || "—"}</p>
            <p>✅ {p.status}</p>
            {p.description && <p>{p.description}</p>}
          </article>
        ))}
      </div>
    </main>
  );
}