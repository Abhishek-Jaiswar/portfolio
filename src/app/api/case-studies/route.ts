import prisma from "@/src/lib/prisma";
import { NextRequest, NextResponse } from "next/server";

export async function GET() {
  try {
    const caseStudies = await prisma.caseStudy.findMany({
      where: { published: true },
      orderBy: { createdAt: "desc" },
    });
    return NextResponse.json({ success: true, caseStudies });
  } catch (error) {
    console.error("GET /api/case-studies error:", error);
    return NextResponse.json(
      { success: false, message: "Failed to load case studies" },
      { status: 500 }
    );
  }
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();

    const {
      slug, title, client, category, duration,
      description, challenge, solution,
      tech, metrics, image, published = true,
    } = body;

    if (!slug || !title || !client || !category || !duration || !description || !challenge || !solution) {
      return NextResponse.json(
        { success: false, message: "Missing required fields" },
        { status: 400 }
      );
    }

    const caseStudy = await prisma.caseStudy.create({
      data: {
        slug,
        title,
        client,
        category,
        duration,
        description,
        challenge,
        solution,
        tech: Array.isArray(tech) ? tech : (tech ?? "").split(",").map((t: string) => t.trim()).filter(Boolean),
        metrics: Array.isArray(metrics) ? metrics : (metrics ?? "").split(",").map((m: string) => m.trim()).filter(Boolean),
        image: image || null,
        published,
      },
    });

    return NextResponse.json({ success: true, caseStudy }, { status: 201 });
  } catch (error: any) {
    console.error("POST /api/case-studies error:", error);
    if (error.code === "P2002") {
      return NextResponse.json(
        { success: false, message: "A case study with this slug already exists" },
        { status: 409 }
      );
    }
    return NextResponse.json(
      { success: false, message: "Failed to create case study" },
      { status: 500 }
    );
  }
}
