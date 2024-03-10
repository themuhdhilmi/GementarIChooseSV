import { NextRequest, NextResponse } from 'next/server'
import prisma from '@/prisma/client'
import { z } from 'zod'

const schemaUPDATE = z.object({
  childQuestionId: z.string(),
  questionString: z.string(),
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


    const updateQuestion = await prisma.questionBody.findFirst({
      where: {
        childQuestionId: body.childQuestionId,
      },
    })

    if (!updateQuestion) {

      const updateQuestionBody = await prisma.questionBody.create({
        data: {
          string: body.questionString,
          childQuestion: {
            connect: {
              id: body.childQuestionId,
            },
          },
        },
      })
    } else {

      const updateQuestionBody = await prisma.questionBody.update({
        where: {
          id: updateQuestion.id,
        },
        data: {
          string: body.questionString,
        },
      })
    }

    return NextResponse.json(
      {
        updateQuestion,
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
  childQuestionBodyId: z.string(),
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

    const updateQuestion = await prisma.questionBody.delete({
      where: {
        id: body.childQuestionBodyId,
      },
    })

    return NextResponse.json(
      {
        updateQuestion,
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
