import { NextRequest, NextResponse } from "next/server";
import { getToken } from "next-auth/jwt";
import bcrypt from "bcrypt";
import prisma from "@/prisma/client";
import { z } from "zod";
import { apiDefaultPagination } from "@/app/config/api";
import { Prisma } from "@prisma/client";

export async function GET(request: NextRequest, response: NextResponse) {
  try {
    const { searchParams } = new URL(request.url);
    const pageParam = parseInt(searchParams.get("page") as string);
    const pageSizeParam = parseInt(searchParams.get("pageSize") as string);
    const sessionParam = searchParams.get("session") as string;
    const emailParam = searchParams.get("email") as string;
    const typeParam = searchParams.get("type") as string;


    if(typeParam === 'single')
    {
      const student = await prisma.user.findFirstOrThrow({
        where : {
          email : emailParam
        },
        include: {
          studentInformation: {
            include: {
              Member: true,
              SessionYear: true,
              LecturerInformation: {
                include : {
                  User : true
                }
              },
            },
          },
        },
      })

      return NextResponse.json(
        {
          student
        },
        {
          status: 200,
        }
      );
    }

    if(typeParam === 'many')
    {
      let page = pageParam ? pageParam : 1;
      let pageSize = pageSizeParam ? pageSizeParam : apiDefaultPagination.pageSize;
      const students = await prisma.user.findMany({
        orderBy: { createdAt: Prisma.SortOrder.desc } as any,
        where: {
          role: "STUDENT",
          studentInformation : {
            sessionYearId : sessionParam
          }
        },
        include: {
          studentInformation: {
            include: {
              Member: true,
              SessionYear: true,
              LecturerInformation: {
                include : {
                  User : true
                }
              },
            },
          },
        },
        skip: (page - 1) * pageSize,
        take: pageSize,
      });
  
      const studentsCount = await prisma.user.count({
        where: {
          role: "STUDENT",
        },
      });
      const totalPages = Math.ceil(studentsCount / pageSize);
  
      return NextResponse.json(
        {
          page,
          pageSize,
          totalPages,
          studentsCount,
          students,
        },
        {
          status: 200,
        }
      );
    }


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

const TrackEnum = z.enum(["SOFTWARE", "SECURITY", "NETWORK"]);
const schema = z.object({
  name: z.string().min(4),
  email: z.string().email(),
  matricNumber: z.string().min(5).max(15),
  password: z.string().min(4),
  confirmPassword: z.string().min(4),
  sessionYearID: z.string(),
  track: TrackEnum,
});

export async function POST(request: NextRequest, response: NextResponse) {
  try {
    const body = await request.json();

    let passwordEncrypt = null;
    if (body.password) {
      passwordEncrypt = await bcrypt.hash(body.password, 10);
    }

    const validation = schema.safeParse(body);

    if (!validation.success) {
      return NextResponse.json(validation.error.errors, {
        status: 400,
      });
    }

    // DEBUG : PLEASE ADD ADMIN VER

    const checkIfMaticNumberAlreadyExisted = await prisma.studentInformation.findFirst({
      where : {
        matricNumber : body.matricNumber
      }
    })

    if(checkIfMaticNumberAlreadyExisted)
    {
      return NextResponse.json(
        {
          errors : [{message : `Matric number ${body.matricNumber} already existed`, path : ''}]
        },
        {
          status: 400,
        }
      );
    }

    const student = await prisma.user.create({
      data: {
        name: body.name,
        email: body.email,
        hashedPassword: passwordEncrypt,
        role: "STUDENT",
      },
    });

    const studentData = await prisma.studentInformation.create({
      data: {
        Track: body.track,
        matricNumber: body.matricNumber,
        SessionYear: {
          connect: { id: body.sessionYearID },
        },
        User: {
          connect: { id: student.id },
        },
      },
    });

    return NextResponse.json(
      {
        student,
        studentData,
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

const schemaPUT = z.object({
  id: z.string(),
  name: z.string().min(4).nullable(),
  email: z.string().email().nullable(),
  matricNumber: z.string().min(5).max(15).nullable(),
  password: z.string().min(4).nullable(),
  track: TrackEnum.nullable(),

  sessionYearID: z.string().nullable(),
  memberQuota: z.number().nullable(),
  titleQuota: z.number().nullable(),
});
export async function PUT(request: NextRequest, response: NextResponse) {
  try {
    const body = await request.json();
    const passwordEncrypt = await bcrypt.hash(body.password, 10);

    const validation = schemaPUT.safeParse(body);

    if (!validation.success) {
      return NextResponse.json(validation.error.errors, {
        status: 400,
      });
    }

    // DEBUG : PLEASE ADD ADMIN VER
    // DEBUG : IF USER SAME ROLE ALSO CAN RUN

    const student = await prisma.user.update({
      where: {
        id: body.id,
      },
      data: {
        name: body.name !== null ? body.name : undefined,
        email: body.email !== null ? body.email : undefined,
        hashedPassword: body.password !== null ? passwordEncrypt : undefined,
      },
    });

    const studentData = await prisma.studentInformation.update({
      where: {
        userId: student.id,
      },
      data: {
        Track: body.track !== null ? body.track : undefined,
        matricNumber:
          body.matricNumber !== null ? body.matricNumber : undefined,
        memberQuota: body.memberQuota,
        titleQuota: body.titleQuota,
        sessionYearId:
          body.sessionYearId !== null ? body.sessionYearId : undefined,
      },
    });

    return NextResponse.json(
      {
        studentData,
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

const schemaDELETE = z.object({
  id: z.string(),
});
export async function DELETE(request: NextRequest, response: NextResponse) {
  try {
    const body = await request.json();

    const validation = schemaDELETE.safeParse(body);

    if (!validation.success) {
      return NextResponse.json(validation.error.errors, {
        status: 400,
      });
    }

    // DEBUG : PLEASE ADD ADMIN VER
    // DEBUG : IF USER SAME ROLE ALSO CAN RUN

    const findStudent = await prisma.studentInformation.findFirstOrThrow({
      where: {
        id: body.id,
      },
      include: {
        User: true,
      },
    });

    const deleteStudent = await prisma.studentInformation.delete({
      where: {
        id: findStudent.id,
      },
    });

    const deleteUser = await prisma.user.delete({
      where: {
        id: findStudent.User.id,
      },
    });

    return NextResponse.json(
      {
        deleteStudent,
        deleteUser,
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
