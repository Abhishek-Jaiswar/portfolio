import { NextRequest, NextResponse } from "next/server";
import { projects } from "@/app/data/data";
// import { prisma } from "@/lib/prisma";

export const GET = async (req: NextRequest, res: NextResponse) => {
  try {

    // const projects = await 

    return NextResponse.json({
      message: "Got items",
      success: true,
      projects,
    });
  } catch (error) {
    return NextResponse.json({
      message: "Failed to load data",
      success: false,
    });
  }
};
