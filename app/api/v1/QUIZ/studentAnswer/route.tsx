import { NextRequest, NextResponse } from 'next/server'
import prisma from '@/prisma/client'

export async function POST(request: NextRequest, response: NextResponse) {
  try {
    const body = await request.json()

    const studentAnswer = await prisma.studentAnswer.findFirst({
      where: {
        userId: body.userId,
        questionId: body.questionId,
      },
    })

    if (studentAnswer) {
      return NextResponse.json(
        {
          error: 'user already joined the question',
        },
        {
          status: 400,
        }
      )
    }

    const createNewStudentAnswer = await prisma.studentAnswer.create({
      data: {
        userId: body.userId,
        questionId: body.questionId,
      },
    })

    return NextResponse.json(
      {
        createNewStudentAnswer,
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

export async function PUT(request: NextRequest, response: NextResponse) {
  try {
    const body = await request.json()

    const studentAnswer = await prisma.studentAnswer.findFirstOrThrow({
      where: {
        questionId: body.questionId,
        userId: body.userId,
      },
      include: {
        doneQuestion: true,
      },
    })

    if (!studentAnswer) {
      return NextResponse.json(
        {
          error: "user doesn't interact with this question",
        },
        {
          status: 400,
        }
      )
    }

    const createAnswerList = await prisma.studentAnswerList.create({
      data: {
        title: body.title,
        score: body.addScore,
        totalScore: body.totalScore,
        essayResult: body.essayResult ?? null,
      },
    })

    const updateStudentAnswer = await prisma.studentAnswer.update({
      where: {
        id: studentAnswer.id,
      },
      data: {
        totalScore: body.addScore >= 0 ? studentAnswer.totalScore + body.addScore : undefined,
        doneQuestion: {
          connect: {
            id: body.childQuestionId,
          },
        },
        StudentAnswerList: {
          connect: {
            id: createAnswerList.id,
          },
        },
      },
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
