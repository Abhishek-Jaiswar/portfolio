import prisma from "@/src/lib/prisma";
import { uploadToCloudinary } from "@/src/lib/utils/uploadToCloudinary";
import { NextRequest, NextResponse } from "next/server";

export async function GET() {
  try {
    const blogs = await prisma.blogPost.findMany({
      where: { published: true },
      orderBy: { createdAt: "desc" },
    });
    return NextResponse.json({ success: true, blogs });
  } catch (error) {
    console.error("GET /api/blogs error:", error);
    return NextResponse.json(
      { success: false, message: "Failed to load blogs" },
      { status: 500 }
    );
  }
}

export async function POST(req: NextRequest) {
  try {
    const formData = await req.formData();

    const title = formData.get("title") as string;
    const slug = formData.get("slug") as string;
    const excerpt = formData.get("excerpt") as string;
    const content = formData.get("content") as string;
    const category = formData.get("category") as string;
    const readTime = formData.get("readTime") as string;
    const featured = formData.get("featured") === "true";
    const published = formData.get("published") !== "false";
    const imageFile = formData.get("image") as File | null;

    if (!title || !slug || !excerpt || !content || !category || !readTime) {
      return NextResponse.json(
        { success: false, message: "Missing required fields" },
        { status: 400 }
      );
    }

    let imageUrl: string | null = null;
    if (imageFile && imageFile.size > 0) {
      const bytes = await imageFile.arrayBuffer();
      const buffer = Buffer.from(bytes);
      const { secure_url } = await uploadToCloudinary(buffer, { folder: "blogs" });
      imageUrl = secure_url;
    }

    const blog = await prisma.blogPost.create({
      data: {
        title,
        slug,
        excerpt,
        content,
        category,
        readTime,
        featured,
        published,
        image: imageUrl,
      },
    });

    return NextResponse.json({ success: true, blog }, { status: 201 });
  } catch (error: any) {
    console.error("POST /api/blogs error:", error);
    if (error.code === "P2002") {
      return NextResponse.json(
        { success: false, message: "A blog with this slug already exists" },
        { status: 409 }
      );
    }
    return NextResponse.json(
      { success: false, message: "Failed to create blog" },
      { status: 500 }
    );
  }
}
