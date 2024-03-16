import { NextRequest, NextResponse } from 'next/server'
import bcrypt from 'bcrypt'
import prisma from '@/prisma/client'
import { z } from 'zod'

const schemaPOST = z.object({
  questionId: z.string(),
  questionType: z.enum(['MULTI_CHOICE', 'ESSAY', 'FILL_IN_THE_BLANKS']),
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

    const getGreatestChildQuestion = await prisma.childQuestion.findFirst({
      where: {
        questionId: body.questionId,
      },
      orderBy: [
        {
          sortingPosition: 'desc',
        },
      ],
    })

    const createChildQuestion = await prisma.childQuestion.create({
      data: {
        questionType: body.questionType,
        questionId: body.questionId,
        sortingPosition: (getGreatestChildQuestion?.sortingPosition ?? 0) + 1,
      },
    })

    return NextResponse.json(
      {
        createChildQuestion,
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
  childQuestionId: z.string(),
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

    const deleteChildQuestion = await prisma.childQuestion.delete({
      where: {
        id: body.childQuestionId,
      },
    })

    return NextResponse.json(
      {
        deleteChildQuestion,
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
  childQuestionId: z.string(),
  label: z.string().nullable(),
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

    const updateLabel = await prisma.childQuestion.update({
      where: {
        id: body.childQuestionId,
      },
      data: {
        label: body.label ?? undefined,
      },
    })

    return NextResponse.json(
      {
        updateLabel,
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