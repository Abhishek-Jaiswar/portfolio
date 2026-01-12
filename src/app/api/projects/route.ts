import prisma from "@/src/lib/prisma";
import { NextRequest, NextResponse } from "next/server";

export async function GET() {
  try {
    const projects = await prisma.project.findMany({
      orderBy: {
        createdAt: "desc",
      },
    });

    return NextResponse.json({
      success: true,
      projects,
    });
  } catch (error) {
    console.error("GET /projects error:", error);

    return NextResponse.json(
      { success: false, message: "Failed to load projects" },
      { status: 500 }
    );
  }
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();

    const { title, description, image, sourceCodeUrl, hostedUrl } = body;

    if (!title || !description || !sourceCodeUrl) {
      return NextResponse.json(
        { success: false, message: "Missing required fields" },
        { status: 400 }
      );
    }

    const project = await prisma.project.create({
      data: {
        title,
        description,
        image,
        sourceCodeUrl,
        hostedUrl,
      },
    });

    return NextResponse.json({
      success: true,
      project,
    });
  } catch (error) {
    console.error("POST /projects error:", error);

    return NextResponse.json(
      { success: false, message: "Failed to create project" },
      { status: 500 }
    );
  }
}
