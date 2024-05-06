import { NextRequest, NextResponse } from 'next/server'
import bcrypt from 'bcrypt'
import prisma from '@/prisma/client'
import { z } from 'zod'

export async function GET(request: NextRequest, response: NextResponse) {
  try {
    const { searchParams } = new URL(request.url)

    const selection = searchParams.get('selection') as string
    const email = searchParams.get('email') as string

    if (selection === 'EMAIL') {
      const lecturer = await prisma.user.findUniqueOrThrow({
        where: {
          email: email,
          role: 'LECTURER',
        },
        include: {
          LecturerInformation: {
            include: {
              StudentInformation: {
                include: {
                  User: true,
                  SessionYear: true,
                },
              },
              LecturerBiographyInfo : {
                include : {
                  LecturerBiographyInfoTag : true
                }
              },
              SessionYear: true,
            },
          },
        },
      })

      return NextResponse.json(
        {
          lecturer,
        },
        {
          status: 200,
        }
      )
    }

    if (selection === 'SESSION') {
      const sessionID = searchParams.get('sessionID') as string

      const session = await prisma.sessionYear.findFirst({
        where: {
          id: sessionID,
        },
        include: {
          Supervisor: {
            include: {
              User: true,
              StudentInformation: true,
            },
          },
        },
      })

      session?.Supervisor.forEach((supervisor: any) => {
        // Count the number of accepted students for the current supervisor
        const acceptedCount = supervisor.StudentInformation.filter((student: any) => student.lecturerAcceptedStudent === 'ACCEPTED').length
        // Count the number of requested students for the current supervisor
        const requestCount = supervisor.StudentInformation.filter((student: any) => student.lecturerAcceptedStudent === 'REQUESTED').length
        // Count the number of declined students for the current supervisor
        const declinedCount = supervisor.StudentInformation.filter((student: any) => student.lecturerAcceptedStudent === 'DECLINED').length

        // Add counts to the supervisor object
        supervisor.acceptedStudentsCount = acceptedCount
        supervisor.requestedStudentsCount = requestCount
        supervisor.declinedStudentsCount = declinedCount
      })

      return NextResponse.json(
        {
          session,
        },
        {
          status: 200,
        }
      )
    }

    if (selection === 'ALL') {
      const lecturers = await prisma.lecturerInformation.findMany({
        include: {
          User: true,
          SessionYear: {
            where: {
              isSelected: true,
            },
          },
        },
      })

      return NextResponse.json(
        {
          lecturers,
        },
        {
          status: 200,
        }
      )
    }
  } catch (error) {
    return NextResponse.json(
      {
        error,
      },
      {
        status: 400,
      }
    )
  }
}

const TrackEnum = z.enum(['SOFTWARE', 'SECURITY', 'NETWORK'])
const schemaPOST = z.object({
  name: z.string().min(4),
  email: z.string().email(),
  password: z.string().min(4),
  confirmPassword: z.string().min(4),
  track: TrackEnum,
})
export async function POST(request: NextRequest, response: NextResponse) {
  try {
    const body = await request.json()
    const passwordEncrypt = await bcrypt.hash(body.password, 10)

    const validation = schemaPOST.safeParse(body)

    if (!validation.success) {
      return NextResponse.json(validation.error.errors, {
        status: 400,
      })
    }

    // DEBUG : PLEASE ADD ADMIN VER
    const lecturer = await prisma.user.create({
      data: {
        name: body.name,
        email: body.email,
        hashedPassword: passwordEncrypt,
        role: 'LECTURER',
      },
    })

    const lecturerData = await prisma.lecturerInformation.create({
      data: {
        Track: body.track,
        User: {
          connect: {
            id: lecturer.id,
          },
        },
      },
    })

    return NextResponse.json(
      {
        lecturer,
        lecturerData,
      },
      {
        status: 200,
      }
    )
  } catch (error) {
    return NextResponse.json(
      {
        error,
      },
      {
        status: 400,
      }
    )
  }
}

const schemaPUT = z.object({
  id: z.string(),
  name: z.string().min(4).nullable(),
  email: z.string().email().nullable(),
  password: z.string().min(4).nullable(),
  track: TrackEnum.nullable(),
  supervisorQuota: z.number().nullable(),
  googleID: z.string().min(4).nullable(),
  wosID: z.string().min(4).nullable(),
  scopusID: z.string().min(4).nullable(),
  expertise: z.string().min(4).nullable(),
})

export async function PUT(request: NextRequest, response: NextResponse) {
  try {
    const body = await request.json()

    let passwordEncrypt = null
    if (body.password) {
      passwordEncrypt = await bcrypt.hash(body.password, 10)
    }

    const validation = schemaPUT.safeParse(body)

    if (!validation.success) {
      return NextResponse.json(validation.error.errors, {
        status: 400,
      })
    }

    // DEBUG : PLEASE ADD ADMIN VER
    // DEBUG : IF USER SAME ROLE ALSO CAN RUN

    const lecturer = await prisma.user.update({
      where: {
        id: body.id,
      },
      data: {
        name: body.name !== null ? body.name : undefined,
        email: body.email !== null ? body.email : undefined,
        hashedPassword: body.password !== null ? passwordEncrypt : undefined,
      },
    })

    const lecturerData = await prisma.lecturerInformation.update({
      where: {
        userId: lecturer.id,
      },
      data: {
        Track: body.track !== null ? body.track : undefined,
        supervisorQuota: body.supervisorQuota !== null ? body.supervisorQuota : undefined,
        googleID: body.googleID ?? null,
        wosID: body.wosID ?? null,
        scopusID: body.scopusID ?? null,
        expertise: body.expertise ?? null,
      },
    })

    return NextResponse.json(
      {
        lecturer,
        lecturerData,
      },
      {
        status: 200,
      }
    )
  } catch (error) {
    return NextResponse.json(
      {
        error,
      },
      {
        status: 400,
      }
    )
  }
}

const schemaDELETE = z.object({
  id: z.string(),
})
export async function DELETE(request: NextRequest, response: NextResponse) {
  try {
    const body = await request.json()

    const validation = schemaDELETE.safeParse(body)

    if (!validation.success) {
      return NextResponse.json(validation.error.errors, {
        status: 400,
      })
    }

    // DEBUG : PLEASE ADD ADMIN VER
    // DEBUG : IF USER SAME ROLE ALSO CAN RUN

    const findLecturer = await prisma.lecturerInformation.findFirstOrThrow({
      where: {
        id: body.id,
      },
      include: {
        User: true,
      },
    })

    const deleteLecturer = await prisma.lecturerInformation.delete({
      where: {
        id: findLecturer.id,
      },
    })

    const deleteUser = await prisma.user.delete({
      where: {
        id: findLecturer.User.id,
      },
    })

    return NextResponse.json(
      {
        deleteLecturer,
        deleteUser,
      },
      {
        status: 200,
      }
    )
  } catch (error) {
    return NextResponse.json(
      {
        error,
      },
      {
        status: 400,
      }
    )
  }
}
