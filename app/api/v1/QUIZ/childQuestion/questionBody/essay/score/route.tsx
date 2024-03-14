import { NextRequest, NextResponse } from 'next/server'
import prisma from '@/prisma/client'
import { z } from 'zod'

const schemaPUT = z.object({
  childQuestionId: z.string(),
  point: z.number(),
})
export async function PUT(request: NextRequest, response: NextResponse) {
  try {
    const body = await request.json()

    const validation = schemaPUT.safeParse(body)

    if (!validation.success) {
      return NextResponse.json(validation.error.errors, {
        status: 400,
      })
    }

    const findQuestionBody = await prisma.questionBody.findFirst({
      where: {
        childQuestion: {
          id: body.childQuestionId,
        },
      },
      include: {
        childQuestion: {
          include: {
            questionBody: {
              include: {
                answer: true,
              },
            },
          },
        },
      },
    })

    if (!findQuestionBody) {
      const createQuestionBody = await prisma.questionBody.create({
        data: {
          string: '[SERVER] Auto Generated for Essay',
          childQuestion: {
            connect: {
              id: body.childQuestionId,
            },
          },
        },
      })

      const createAnswerString = await prisma.answerString.create({
        data: {
          string: '[SERVER] Auto Generated for Essay',
          point: body.point,
          QuestionBody: {
            connect: {
              id: createQuestionBody.id,
            },
          },
        },
      })

      return NextResponse.json(
        {
          createQuestionBody,
          createAnswerString,
        },
        {
          status: 200,
        }
      )
    }

    const updateAnswerString = await prisma.answerString.updateMany({
      where: {
        QuestionBody: {
          every: {
            id: findQuestionBody.id,
          },
        },
      },
      data: {
        point: body.point,
      },
    })

    return NextResponse.json(
      {
        updateAnswerString,
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
