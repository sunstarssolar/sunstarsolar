import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { verifyWorkerSession } from "@/lib/auth";
import { makeProjectCode } from "@/lib/project-code";
import { projectSchema } from "@/lib/validation";

function publicProject(project: any) {
  return {
    id: project.id,
    projectCode: project.projectCode,
    city: project.city,
    district: project.district,
    state: project.state,
    pincode: project.pincode,
    projectType: project.projectType,
    capacityKw: project.capacityKw,
    panelBrand: project.panelBrand,
    inverterBrand: project.inverterBrand,
    installationDate: project.installationDate,
    completionDate: project.completionDate,
    status: project.status,
    description: project.description,
    publicImageUrls: project.publicImageUrls,
    createdAt: project.createdAt
  };
}

export async function GET(request: NextRequest) {
  const limit = Math.min(Number(request.nextUrl.searchParams.get("limit") || 24), 100);

  const projects = await prisma.project.findMany({
    where: { isPublic: true },
    orderBy: { createdAt: "desc" },
    take: limit
  });

  // IMPORTANT: private customer fields are deliberately not selected/returned.
  return NextResponse.json({ projects: projects.map(publicProject) });
}

export async function POST(request: NextRequest) {
  const token = request.cookies.get("worker_session")?.value;
  if (!token) return NextResponse.json({ error: "Worker login required." }, { status: 401 });

  const session = await verifyWorkerSession(token);
  if (!session) return NextResponse.json({ error: "Session expired. Login again." }, { status: 401 });

  const worker = await prisma.worker.findUnique({
    where: { id: session.workerId, active: true },
    select: { id: true }
  });

  if (!worker) return NextResponse.json({ error: "Worker account is inactive." }, { status: 403 });

  try {
    const body = await request.json();
    const parsed = projectSchema.safeParse(body);

    if (!parsed.success) {
      return NextResponse.json(
        { error: "Invalid project data.", details: parsed.error.flatten() },
        { status: 400 }
      );
    }

    const data = parsed.data;

    const project = await prisma.project.create({
      data: {
        projectCode: makeProjectCode(),
        workerId: worker.id,

        customerName: data.customerName,
        customerMobile: data.customerMobile,
        fullAddress: data.fullAddress || null,

        city: data.city,
        district: data.district,
        state: data.state,
        pincode: data.pincode || null,
        projectType: data.projectType,
        capacityKw: data.capacityKw,
        panelBrand: data.panelBrand || null,
        inverterBrand: data.inverterBrand || null,
        installationDate: data.installationDate ? new Date(data.installationDate) : null,
        completionDate: data.completionDate ? new Date(data.completionDate) : null,
        status: data.status,
        description: data.description || null,
        publicImageUrls: data.publicImageUrls,
        isPublic: true
      }
    });

    return NextResponse.json({
      ok: true,
      message: "Project submitted and published successfully.",
      project: publicProject(project)
    }, { status: 201 });
  } catch {
    return NextResponse.json({ error: "Could not save project." }, { status: 500 });
  }
}