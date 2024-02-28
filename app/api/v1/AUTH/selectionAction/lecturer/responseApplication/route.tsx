import { NextRequest, NextResponse } from 'next/server'
import { getToken } from 'next-auth/jwt'
import prisma from '@/prisma/client'
import { z } from 'zod'

const schemaPOST = z.object({
  selection: z.boolean(),
  studentEmail: z.string(),
})
export async function POST(request: NextRequest, response: NextResponse) {
  try {
    const body = await request.json()
    const token = await getToken({
      req: request,
    })
    const validation = schemaPOST.safeParse(body)

    if (!validation.success) {
      return NextResponse.json(validation.error.errors, {
        status: 400,
      })
    }

    const user = await prisma.user.findUnique({
      where: {
        id: token?.sub,
      },
    })

    if (!user) {
      return NextResponse.json(
        {
          error: 'Must be loggedIn User',
        },
        {
          status: 400,
        }
      )
    } else {
      if (user.role === 'STUDENT') {
        return NextResponse.json(
          {
            error: "Student Aren't allowed to use this endpoint",
          },
          {
            status: 400,
          }
        )
      }
    }

    const getStudentUser = await prisma.user.findFirstOrThrow({
      where: {
        email: body.studentEmail,
      },
    })

    const getStudent = await prisma.studentInformation.findFirstOrThrow({
      where: {
        userId: getStudentUser.id,
      },
      include: {
        LecturerInformation: {
          include: { User: true },
        },
      },
    })

    if (user.role !== 'ADMIN') {
      if (user.role === 'LECTURER') {
        if (getStudent?.LecturerInformation?.User.email !== user.email) {
          return NextResponse.json(
            {
              error: 'Lecturer requested and response mismatch',
            },
            {
              status: 400,
            }
          )
        }
      }
    }

    const findLecturer = await prisma.lecturerInformation.findFirstOrThrow({
      where: {
        User: {
          email: getStudent?.LecturerInformation?.User.email,
        },
      },
      include: {
        StudentInformation: true,
        SessionYear: true,
      },
    })

    const findCurrentSession = await prisma.sessionYear.findFirstOrThrow({
      where: {
        isSelected: true,
      },
    })

    const supervisorAceptedStudentCount = await findLecturer?.StudentInformation.filter((student: any) => student.lecturerAcceptedStudent === 'ACCEPTED').filter((student: any) => student.sessionYearId === findCurrentSession?.id).length
    const quotaCount = findLecturer?.supervisorQuota ?? findCurrentSession?.globalSupervisorQuota

    if (supervisorAceptedStudentCount >= quotaCount) {
      return NextResponse.json(
        {
          error: 'Exceeded supervisor quota',
        },
        {
          status: 400,
        }
      )
    }

    const updateStudent = await prisma.studentInformation.update({
      where: {
        id: getStudent.id,
      },
      data: {
        lecturerAcceptedStudent: body.selection ? 'ACCEPTED' : 'DECLINED',
      },
    })

    const findLecturerAfterJob = await prisma.lecturerInformation.findFirstOrThrow({
      where: {
        User: {
          email: getStudent?.LecturerInformation?.User.email,
        },
      },
      include: {
        StudentInformation: true,
        SessionYear: true,
      },
    })

    const supervisorAceptedStudentCountAfterJob = await findLecturerAfterJob?.StudentInformation.filter((student: any) => student.lecturerAcceptedStudent === 'ACCEPTED').filter((student: any) => student.sessionYearId === findCurrentSession?.id).length
    const quotaCount2 = findLecturerAfterJob?.supervisorQuota ?? findCurrentSession?.globalSupervisorQuota

    if (supervisorAceptedStudentCountAfterJob >= quotaCount2) {
      const updateManyStudent = await prisma.studentInformation.updateMany({
        where: {
          LecturerInformation: {
            id: findLecturerAfterJob.id
          },
          lecturerAcceptedStudent: 'REQUESTED',
        },
        data: {
          lecturerAcceptedStudent: 'DECLINED',
        },
      })

      return NextResponse.json(
        {
          updateStudent,
          updateManyStudent,
          trigger: 'Declined all requested for exceeding quota',
        },
        {
          status: 200,
        }
      )
    }

    return NextResponse.json(
      {
        updateStudent,
        
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
