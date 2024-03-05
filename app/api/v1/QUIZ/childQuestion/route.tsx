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

    const createChildQuestion = await prisma.childQuestion.create({
      data: {
        questionType: body.questionType,
        questionId: body.questionId,
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
