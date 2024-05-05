import { NextRequest, NextResponse } from 'next/server'
import prisma from '@/prisma/client'
import { z } from 'zod'

const schemaUPDATE = z.object({
  childQuestionId: z.string(),
  arrayOfAnswer: z.any(),
})
export async function PUT(request: NextRequest, response: NextResponse) {
  try {
    const body = await request.json()
    const validation = schemaUPDATE.safeParse(body)

    if (!validation.success) {
      return NextResponse.json(validation.error.errors, {
        status: 400,
      })
    }

    const checkifChildQuestionBodyAvailable = await prisma.questionBody.findFirst({
      where: {
        childQuestionId: body?.childQuestionId,
      },
    })

    if (!checkifChildQuestionBodyAvailable) {
      const createChildQuestionForChildQuestionId = await prisma.questionBody.create({
        data: {
          string: 'Created for FITB',
          childQuestion: {
            connect: {
              id: body?.childQuestionId,
            },
          },
        },
      })
    }

    const checkifChildQuestionBodyAvailable2 = await prisma.questionBody.findFirst({
      where: {
        childQuestion: {
          id: body?.childQuestionId,
        },
      },
    })

    const deleteAllAnswer = await prisma.answerString.deleteMany({
      where: {
        QuestionBody: {
          every: {
            childQuestionId: body?.childQuestionId,
          },
        },
      },
    })

    const answerStrings = await body?.arrayOfAnswer?.map((answer: any) => {
      const answerString = {
        stringBefore: answer.stringBefore || null,
        string: answer.string,
        stringAfter: answer.stringAfter || null,
        point: parseInt(answer.point),
        QuestionBody: {
          connect: {
            id: checkifChildQuestionBodyAvailable2?.id,
          },
        },
      }
      return answerString
    })

    if (answerStrings) {
      const createManyAnswersPromises = answerStrings.map(async (answerString: any) => {
        return await prisma.answerString.create({
          data: answerString,
        })
      })


      if(createManyAnswersPromises.length >= 1)
      {
        return NextResponse.json(
            {
              createManyAnswersPromises,
            },
            {
              status: 200,
            }
          )
      }


    }

    return NextResponse.json(
        {
          error : "error",
        },
        {
          status: 400,
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
