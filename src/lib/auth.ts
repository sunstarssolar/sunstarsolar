import { SignJWT, jwtVerify } from "jose";

const secret = new TextEncoder().encode(process.env.AUTH_SECRET);

export async function createWorkerSession(workerId: string, workerCode: string) {
  if (!process.env.AUTH_SECRET) throw new Error("AUTH_SECRET is missing");

  return new SignJWT({ workerId, workerCode, role: "worker" })
    .setProtectedHeader({ alg: "HS256" })
    .setIssuedAt()
    .setExpirationTime("8h")
    .sign(secret);
}

export async function verifyWorkerSession(token: string) {
  try {
    const { payload } = await jwtVerify(token, secret);
    if (payload.role !== "worker" || typeof payload.workerId !== "string") return null;
    return {
      workerId: payload.workerId,
      workerCode: typeof payload.workerCode === "string" ? payload.workerCode : ""
    };
  } catch {
    return null;
  }
}