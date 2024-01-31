import { NextRequest, NextResponse } from "next/server";
import { getToken } from "next-auth/jwt";
import prisma from "@/prisma/client";
import { z } from "zod";
import getSupervisorStudentListForCurrentSession from "@/app/api/storage/getSupervisorStudentListForCurrentSession";

export async function GET(request: NextRequest, response: NextResponse) {
  try {
    const { searchParams } = new URL(request.url);
    const email = searchParams.get("email") as string;

    let user = await prisma.user.findUniqueOrThrow({
      where: {
        email: email,
      },
    });

    const userStudent = await prisma.studentInformation.findFirstOrThrow({
      where: {
        User: user,
      },
    });

    user = await prisma.user.findUniqueOrThrow({
      where: {
        email: email,
      },
      include: {
        studentInformation: {
          include: {
            LecturerInformation: true,
            ProjectTitle: true,
            Member: true,
            SessionYear: true,
          },
        },
      },
    });

    return NextResponse.json(
      {
        user,
      },
      {
        status: 200,
      },
    );
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

const schemaPOST = z.object({
  email: z.string(),
  lecturerEmail: z.string(),
});
export async function POST(request: NextRequest, response: NextResponse) {
  try {
    const body = await request.json();
    const validation = schemaPOST.safeParse(body);

    if (!validation.success) {
      return NextResponse.json(validation.error.errors, {
        status: 400,
      });
    }

    let user = await prisma.user.findUniqueOrThrow({
      where: {
        email: body.email,
      },
    });

    const userStudent = await prisma.studentInformation.findFirstOrThrow({
      where: {
        User: user,
      },
    });

    user = await prisma.user.findUniqueOrThrow({
      where: {
        email: body.email,
      },
      include: {
        studentInformation: {
          include: {
            LecturerInformation: true,
            ProjectTitle: true,
            Member: true,
            SessionYear: true,
          },
        },
      },
    });

    if (userStudent.lecturerAcceptedStudent === "ACCEPTED") {
      return NextResponse.json(
        {
          error: {
            name: "student already accepted",
          },
        },
        {
          status: 400,
        },
      );
    }

    let userLecturer = await prisma.user.findUniqueOrThrow({
      where: {
        email: body.lecturerEmail,
      },
    });

    const userLecturerInfo = await prisma.lecturerInformation.findFirstOrThrow({
      where: {
        User: userLecturer,
      },
    });

    userLecturer = await prisma.user.findUniqueOrThrow({
      where: {
        email: body.lecturerEmail,
      },
    });

    const check = await getSupervisorStudentListForCurrentSession(
      body.lecturerEmail,
      userStudent.sessionYearId,
    );

    if (check.isFull) {
      return NextResponse.json(
        {
          error: {
            name: "Supervisor is already full",
          },
        },
        {
          status: 400,
        },
      );
    }

    if (!check.isSupervisor) {
      return NextResponse.json(
        {
          error: {
            name: "Not a supervisor",
          },
        },
        {
          status: 400,
        },
      );
    }

    const updateStudentSupervisor = await prisma.studentInformation.update({
      where: {
        id: userStudent.id,
      },
      data: {
        lecturerAcceptedStudent: "NONE",
        lecturerInformationId: userLecturerInfo.id,
      },
    });

    return NextResponse.json(
      {
        updateStudentSupervisor,
      },
      {
        status: 200,
      },
    );
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
