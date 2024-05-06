import { NextRequest, NextResponse } from 'next/server'
import { getToken } from 'next-auth/jwt'
import prisma from '@/prisma/client'
import { z } from 'zod'

export async function GET(request: NextRequest, response: NextResponse) {
  try {
    const { searchParams } = new URL(request.url)
    const email = searchParams.get('email') as string

    let user = await prisma.user.findUniqueOrThrow({
      where: {
        email: email,
      },
    })

    const userStudent = await prisma.studentInformation.findFirstOrThrow({
      where: {
        User: user,
      },
    })

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
    })

    return NextResponse.json(
      {
        user,
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

const schemaPOST = z.object({
  email: z.string(),
  lecturerEmail: z.string(),
})
export async function POST(request: NextRequest, response: NextResponse) {
  try {
    const body = await request.json()
    const validation = schemaPOST.safeParse(body)

    if (!validation.success) {
      return NextResponse.json(validation.error.errors, {
        status: 400,
      })
    }

    const user = await prisma.user.findUniqueOrThrow({
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
    })

    const userStudent = await prisma.studentInformation.findFirstOrThrow({
      where: {
        id: user?.studentInformation?.id,
      },
    })

    if (userStudent.lecturerAcceptedStudent === 'ACCEPTED') {
      return NextResponse.json(
        {
          error: {
            name: 'student already accepted',
          },
        },
        {
          status: 400,
        }
      )
    }

    let userLecturer = await prisma.user.findUniqueOrThrow({
      where: {
        email: body.lecturerEmail,
      },
    })

    const userLecturerInfo = await prisma.lecturerInformation.findFirstOrThrow({
      where: {
        User: userLecturer,
      },
      include: {
        SessionYear: {
          where: {
            id: user?.studentInformation?.SessionYear.id,
          },
        },
        StudentInformation: true,
      },
    })

    userLecturer = await prisma.user.findUniqueOrThrow({
      where: {
        email: body.lecturerEmail,
      },
    })

    if (!userLecturerInfo.SessionYear) {
      return NextResponse.json(
        {
          error: {
            name: 'Not a supervisor',
          },
        },
        {
          status: 400,
        }
      )
    }

    const countStudent = userLecturerInfo?.StudentInformation?.filter((info : any) => info.lecturerAcceptedStudent === 'ACCEPTED').length ?? 0
    const countSupervisorQuota = userLecturerInfo.supervisorQuota ?? userLecturerInfo.SessionYear[0].globalSupervisorQuota ?? 0

    if (countStudent >= countSupervisorQuota) {
      return NextResponse.json(
        {
          error: {
            acceptedStudentCount: countStudent,
            countSupervisorQuota,
            name: 'Supervisor is already full',
          },
        },
        {
          status: 400,
        }
      )
    }

    const updateStudentSupervisor = await prisma.studentInformation.update({
      where: {
        id: userStudent.id,
      },
      data: {
        lecturerAcceptedStudent: 'REQUESTED',
        lecturerInformationId: userLecturerInfo.id,
      },
    })

    return NextResponse.json(
      {
        countStudent,
        updateStudentSupervisor,
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
