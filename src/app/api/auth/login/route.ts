import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import { prisma } from "@/lib/prisma";
import { createWorkerSession } from "@/lib/auth";
import { loginSchema } from "@/lib/validation";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const parsed = loginSchema.safeParse(body);
    if (!parsed.success) {
      return NextResponse.json({ error: "Invalid Worker ID or PIN." }, { status: 400 });
    }

    const worker = await prisma.worker.findUnique({
      where: { workerCode: parsed.data.workerCode.toUpperCase() }
    });

    if (!worker || !worker.active) {
      return NextResponse.json({ error: "Invalid Worker ID or inactive worker." }, { status: 401 });
    }

    const ok = await bcrypt.compare(parsed.data.pin, worker.pinHash);
    if (!ok) {
      return NextResponse.json({ error: "Invalid Worker ID or PIN." }, { status: 401 });
    }

    const token = await createWorkerSession(worker.id, worker.workerCode);

    const response = NextResponse.json({
      ok: true,
      worker: { name: worker.name, workerCode: worker.workerCode }
    });

    response.cookies.set("worker_session", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      path: "/",
      maxAge: 60 * 60 * 8
    });

    return response;
  } catch {
    return NextResponse.json({ error: "Login failed." }, { status: 500 });
  }
}