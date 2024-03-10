import { NextRequest, NextResponse } from 'next/server'
import bcrypt from 'bcrypt'
import prisma from '@/prisma/client'
import { z } from 'zod'

const schemaPUT = z.object({
  questionId: z.string(),
  childQuestionId: z.string(),
  isGoingUp: z.boolean(),
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

    const getChildQuestion = await prisma.childQuestion.findFirstOrThrow({
      where: {
        id: body?.childQuestionId,
      },
    })

    const getGreatestChildQuestion = await prisma.childQuestion.findFirst({
      where: {
        questionId: body.questionId,
        sortingPosition: {
          gt: getChildQuestion.sortingPosition, // Get items greater than the current sortingPosition
        },
      },
      orderBy: {
        sortingPosition: 'asc', // Order by sortingPosition ascending to get the next item
      },
    })

    const getLeastChildQuestion = await prisma.childQuestion.findFirst({
      where: {
        questionId: body.questionId,
        sortingPosition: {
          lt: getChildQuestion.sortingPosition, // Get items lesser than the current sortingPosition
        },
      },
      orderBy: {
        sortingPosition: 'desc', // Order by sortingPosition descending to get the previous item
      },
    })

    if (body.isGoingUp) {
      const goUp = await prisma.childQuestion.update({
        where: {
          id: body.childQuestionId,
        },
        data: {
          sortingPosition: getLeastChildQuestion?.sortingPosition ?? undefined,
        },
      })

      const goUp2 = await prisma.childQuestion.update({
        where: {
          id: getLeastChildQuestion?.id,
        },
        data: {
          sortingPosition: getChildQuestion?.sortingPosition ?? undefined,
        },
      })
    } else {
      const goDown = await prisma.childQuestion.update({
        where: {
          id: body.childQuestionId,
        },
        data: {
          sortingPosition: getGreatestChildQuestion?.sortingPosition ?? undefined,
        },
      })

      const goDown2 = await prisma.childQuestion.update({
        where: {
          id: getGreatestChildQuestion?.id,
        },
        data: {
          sortingPosition: getChildQuestion?.sortingPosition ?? undefined,
        },
      })
    }

    return NextResponse.json(
      {
        getChildQuestion,
        getGreatestChildQuestion,
        getLeastChildQuestion,
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
