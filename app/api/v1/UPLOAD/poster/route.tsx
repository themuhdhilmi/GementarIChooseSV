import prisma from "@/prisma/client";
import { writeFile } from "fs/promises";
import { NextRequest, NextResponse } from "next/server";

const MAX_FILE_SIZE_MB = 5; // Set the maximum allowed file size in megabytes
const ALLOWED_FILE_TYPES = ["application/pdf"]; // Set the allowed file types

export async function POST(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const email = searchParams.get("email") as string;
    const projectID = searchParams.get("projectID") as string;

    const checkStudent = await prisma.user.findFirstOrThrow({
      where: {
        email: email,
        role: "STUDENT",
      },
    });

    const checkIsStudent = await prisma.studentInformation.findFirstOrThrow({
      where: {
        User: checkStudent,
      },
    });

    const checkIfTitleAvailable = await prisma.projectTitle.findFirstOrThrow({
      where: {
        StudentInformation: checkIsStudent,
        id: projectID,
      },
    });

    const data = await request.formData();
    const file: File | null = data.get("file") as unknown as File;

    if (!file) {
      return NextResponse.json({ success: false, error: "No file uploaded" });
    }

    // Validate file size
    const fileSizeMB = file.size / (1024 * 1024); // Convert bytes to megabytes
    if (fileSizeMB > MAX_FILE_SIZE_MB) {
      return NextResponse.json({
        success: false,
        error: `File size exceeds the allowed limit, ${MAX_FILE_SIZE_MB}MB`,
      });
    }

    // Validate file type
    if (!ALLOWED_FILE_TYPES.includes(file.type)) {
      return NextResponse.json({ success: false, error: "Invalid file type" });
    }

    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);

    // With the file data in the buffer, you can do whatever you want with it.
    // For this, we'll just write it to the filesystem in a new location
    const path = `/student/poster/${email}_${projectID}.pdf`;

    const updatePath = await prisma.projectTitle.update({
      where: {
        id: checkIfTitleAvailable.id,
      },
      data: {
        uploadedPoster: path,
      },
    });

    try {
      await writeFile("public" + path, buffer);
      console.log(`Open ${path} to see the uploaded file`);
      return NextResponse.json({ success: true });
    } catch (error) {
      console.error("Error writing file:", error);
      return NextResponse.json({ success: false, error: "Error writing file" });
    }
  } catch (error) {
    return NextResponse.json(
      {
        error,
      },
      {
        status: 400,
      },
    );
  }
}
