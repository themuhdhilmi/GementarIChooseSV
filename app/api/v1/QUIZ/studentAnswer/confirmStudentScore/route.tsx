import { NextRequest, NextResponse } from 'next/server'
import prisma from '@/prisma/client'


export async function PUT(request: NextRequest, response: NextResponse) {
  try {
    const body = await request.json()

    const updateStudentAnswer = await prisma.studentAnswer.update({
        where : {
            id : body.id
        },
        data : {
            isCheckedByLecturer : true
        }
    })

    return NextResponse.json(
      {
        updateStudentAnswer,
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
