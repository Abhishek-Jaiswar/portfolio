import prisma from "@/src/lib/prisma";
import { uploadToCloudinary } from "@/src/lib/utils/uploadToCloudinary";
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
    const formData = await req.formData();

    const title = formData.get("title") as string;
    const description = formData.get("description") as string;
    const sourceCodeUrl = formData.get("sourceCodeUrl") as string;
    const hostedUrl = formData.get("hostedUrl") as string;
    const image = formData.get("image") as File;

    if (!title || !description || !sourceCodeUrl || !image) {
      return NextResponse.json(
        { success: false, message: "Missing required fields" },
        { status: 400 }
      );
    }

    const bytes = await image.arrayBuffer();
    const buffer = Buffer.from(bytes);

    const { secure_url } = await uploadToCloudinary(buffer, {
      folder: "projects",
    });

    const project = await prisma.project.create({
      data: {
        title,
        description,
        sourceCodeUrl,
        hostedUrl,
        image: secure_url,
      },
    });

    return NextResponse.json({ success: true, project }, { status: 201 });
  } catch (error) {
    console.error("Upload error:", error);
    return NextResponse.json(
      { success: false, message: "Upload failed" },
      { status: 500 }
    );
  }
}
