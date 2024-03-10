import { NextRequest, NextResponse } from 'next/server'
import prisma from '@/prisma/client'
import { z } from 'zod'

//TODO Change answer to dummyanswer

const schemaCREATE = z.object({
  childQuestionId: z.string(),
})
export async function POST(request: NextRequest, response: NextResponse) {
  try {
    const body = await request.json()

    const validation = schemaCREATE.safeParse(body)

    if (!validation.success) {
      return NextResponse.json(validation.error.errors, {
        status: 400,
      })
    }
    const createAnswer = await prisma.answerString.create({
      data: {
        string: 'Empty Answer',
        point: 1,
        QuestionBody: {
          connect: {
            id: body.childQuestionId,
          },
        },
      },
    })

    return NextResponse.json(
      {
        createAnswer,
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

const schemaUPDATE = z.object({
  answerStringId: z.string(),
  answerString: z.string(),
  point: z.number(),
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

    // IMPLEMENT
    const updateAnswer = await prisma.answerString.update({
      where: {
        id: body.answerStringId,
      },
      data: {
        string: body.answerString,
        point: body.point,
      },
    })

    return NextResponse.json(
      {
        updateAnswer,
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
  answerStringId: z.string(),
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

    // IMPLEMENT
    const deleteAnswer = await prisma.answerString.delete({
      where: {
        id: body.answerStringId,
      },
    })

    return NextResponse.json(
      {
        deleteAnswer,
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
