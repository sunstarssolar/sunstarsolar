import Link from "next/link";

export default function Home() {
  return (
    <main className="center">
      <div className="card">
        <h1>SM Green Energy Solutions</h1>
        <p>Solar project worker portal + public project showcase.</p>
        <div className="links">
          <Link href="/projects">Our Projects</Link>
          <Link href="/login">Employee Login</Link>
        </div>
      </div>
    </main>
  );
}