import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { verifyWorkerSession } from "@/lib/auth";

export async function GET(request: NextRequest) {
  const token = request.cookies.get("worker_session")?.value;
  if (!token) return NextResponse.json({ error: "Login required." }, { status: 401 });

  const session = await verifyWorkerSession(token);
  if (!session) return NextResponse.json({ error: "Session expired." }, { status: 401 });

  const projects = await prisma.project.findMany({
    where: { workerId: session.workerId },
    select: {
      id: true,
      projectCode: true,
      city: true,
      district: true,
      state: true,
      capacityKw: true,
      projectType: true,
      status: true,
      createdAt: true
    },
    orderBy: { createdAt: "desc" }
  });

  return NextResponse.json({ projects });
}