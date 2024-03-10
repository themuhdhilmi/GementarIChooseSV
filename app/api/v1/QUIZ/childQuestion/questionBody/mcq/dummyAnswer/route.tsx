import { NextRequest, NextResponse } from 'next/server'
import prisma from '@/prisma/client'
import { z } from 'zod'

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
    const createAnswer = await prisma.answerStringDummy.create({
      data: {
        string: 'Empty Dummy Answer',
        childQuestion: {
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
  answerStringDummyId: z.string(),
  answerString: z.string(),
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
    const updateAnswer = await prisma.answerStringDummy.update({
      where: {
        id: body.answerStringDummyId,
      },
      data: {
        string: body.answerString,
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
  answerStringDummyId: z.string(),
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
    const deleteAnswer = await prisma.answerStringDummy.delete({
      where: {
        id: body.answerStringDummyId,
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
