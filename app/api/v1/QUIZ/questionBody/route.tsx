import { NextRequest, NextResponse } from 'next/server'
import prisma from '@/prisma/client'
import { z } from 'zod'

// const schemaPOST = z.object({
//   questionId: z.string(),
//   questionType: z.enum(['MULTI_CHOICE', 'ESSAY', 'FILL_IN_THE_BLANKS']),
// })
export async function POST(request: NextRequest, response: NextResponse) {
  try {
    const body = await request.json()

    // const validation = schemaPOST.safeParse(body)

    // if (!validation.success) {
    //   return NextResponse.json(validation.error.errors, {
    //     status: 400,
    //   })
    // }

    const createAnswer = await prisma.answerString.create({
      data: {
        string: body.answerString,
      },
    })

    const createQuestionBody = await prisma.questionBody.create({
      data: {
        childQuestionId: body.childQuestionId,
        string: body.string,
        stringBefore: body.sringBefore ?? undefined,
        point: body.point,
        answerStringId: createAnswer.id,
      },
    })

    return NextResponse.json(
      {
        createAnswer,
        createQuestionBody,
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
