import { NextRequest, NextResponse } from "next/server";
import { getToken } from "next-auth/jwt";
import prisma from "@/prisma/client";
import { z } from "zod";

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
      }
    );
  } catch (error) {
    return NextResponse.json(
      {
        error,
      },
      {
        status: 400,
      }
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
        }
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
      userStudent.sessionYearId
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
        }
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
        }
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
      }
    );
  } catch (error) {
    return NextResponse.json(
      {
        error,
      },
      {
        status: 400,
      }
    );
  }
}

const getSupervisorStudentListForCurrentSession = async (
  email: string,
  sessionId: string
) => {
  const getLecturer = await prisma.lecturerInformation.findFirstOrThrow({
    where: {
      User: {
        email: email,
      },
    },
    include: {
      User: true,
    },
  });

  const getLecturerSessionStudentNone = await prisma.sessionYear.findFirst({
    where: {
      id: sessionId,
      StudentInformation: {
        some: {
          LecturerInformation: {
            User: {
              email: email,
            },
          },
          lecturerAcceptedStudent: "NONE",
        },
      },
    },
    include: {
      StudentInformation: true,
    },
  });

  const getLecturerSessionStudentDeclined = await prisma.sessionYear.findFirst({
    where: {
      id: sessionId,
      StudentInformation: {
        some: {
          LecturerInformation: {
            User: {
              email: email,
            },
          },
          lecturerAcceptedStudent: "DECLINED",
        },
      },
    },
    include: {
      StudentInformation: true,
    },
  });

  const getLecturerSessionStudentAccepted = await prisma.sessionYear.findFirst({
    where: {
      id: sessionId,
      StudentInformation: {
        some: {
          LecturerInformation: {
            User: {
              email: email,
            },
          },
          lecturerAcceptedStudent: "ACCEPTED",
        },
      },
    },
    include: {
      StudentInformation: true,
    },
  });

  const getSupervisor = await prisma.sessionYear.findFirst({
    where: {
      id: sessionId,
      Supervisor: {
        some: {
          User: {
            email: email,
          },
        },
      },
    },
    include: {
      StudentInformation: true,
    },
  });

  let isFull = false;
  let supervisorQuota = 0;
  let supervisorStudent = 0;
  if (!getLecturer.supervisorQuota) {
    const acceptedStudentCount =
      getLecturerSessionStudentAccepted === null
        ? 0
        : getLecturerSessionStudentAccepted.StudentInformation.length;

    if (
      getLecturerSessionStudentNone!.globalSupervisorQuota <=
      acceptedStudentCount
    ) {
      isFull = true;
    }
    supervisorQuota = getLecturerSessionStudentNone!.globalSupervisorQuota;
    supervisorStudent = acceptedStudentCount;
  } else {
    const acceptedStudentCount =
      getLecturerSessionStudentAccepted === null
        ? 0
        : getLecturerSessionStudentAccepted.StudentInformation.length;

    if (getLecturer.supervisorQuota <= acceptedStudentCount) {
      isFull = true;
    }
    supervisorQuota = getLecturer.supervisorQuota;
    supervisorStudent = acceptedStudentCount;
  }

  return {
    lecturer: {
      email: getLecturer.User.email,
      name: getLecturer.User.name,
      session: {
        number: getLecturerSessionStudentNone?.number,
        yearOne: getLecturerSessionStudentNone?.yearOne,
        yearTwo: getLecturerSessionStudentNone?.yearTwo,
      },
    },
    isFull,
    isSupervisor: getSupervisor !== null ? true : false,
    supervisorQuota,
    supervisorAccptedStudent: supervisorStudent,
    getRequestedStudent:
      getLecturerSessionStudentNone === null
        ? 0
        : getLecturerSessionStudentNone.StudentInformation.length,
    getDeclinedStudent:
      getLecturerSessionStudentDeclined === null
        ? 0
        : getLecturerSessionStudentDeclined.StudentInformation.length,
    getLecturerSessionStudentNone:
      getLecturerSessionStudentNone === null
        ? null
        : getLecturerSessionStudentNone.StudentInformation,
    getLecturerSessionStudentDeclined:
      getLecturerSessionStudentDeclined === null
        ? null
        : getLecturerSessionStudentDeclined.StudentInformation,
    acceptedLecturerStudentAccepted:
      getLecturerSessionStudentAccepted === null
        ? null
        : getLecturerSessionStudentAccepted.StudentInformation,
  };
};
