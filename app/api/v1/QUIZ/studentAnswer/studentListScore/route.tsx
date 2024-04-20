import { NextRequest, NextResponse } from 'next/server'
import prisma from '@/prisma/client'

export async function PUT(request: NextRequest, response: NextResponse) {
  try {
    const body = await request.json()

    const updateAnswerList = await prisma.studentAnswerList.update({
      where: {
        id: body.id,
      },
      data: {
        score: body.score,
      },
      include : {
        StudentAnswer : true
      }
    })

    const studentAnswer = await prisma.studentAnswer.findUniqueOrThrow({
      where: {
        id: updateAnswerList.StudentAnswer?.id,
      },
    })

    const updateStudentAnswer = await prisma.studentAnswer.update({
      where: {
        id: studentAnswer.id,
      },
      data: {
        totalScore: studentAnswer.totalScore + body.score,
      },
    })

    return NextResponse.json(
      {
        updateAnswerList,
        updateStudentAnswer
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
