import { NextRequest, NextResponse } from 'next/server'
import { getToken } from 'next-auth/jwt'
import bcrypt from 'bcrypt'
import prisma from '@/prisma/client'
import { z } from 'zod'

const schemaPOST = z.object({
  selection: z.boolean(),
  studentEmail: z.string(),
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

    const getStudentUser = await prisma.user.findFirstOrThrow({
      where: {
        email: body.studentEmail,
      },
    })

    const getStudent = await prisma.studentInformation.findFirstOrThrow({
      where: {
       userId: getStudentUser.id,
      },
    })

    const updateStudent = await prisma.studentInformation.update({
      where : {
        id: getStudent.id
      },
      data : {
        lecturerAcceptedStudent: body.selection ? 'ACCEPTED' : 'DECLINED'
      }
    })


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
