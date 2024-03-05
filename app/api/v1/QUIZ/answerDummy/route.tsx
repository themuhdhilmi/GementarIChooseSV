import { NextRequest, NextResponse } from 'next/server'
import prisma from '@/prisma/client'
import { z } from 'zod'

export async function POST(request: NextRequest, response: NextResponse) {
  try {
    const body = await request.json()

    const createAnswerDummy = await prisma.answerStringDummy.create({
      data: {
        string: body.string,
        childQuestionId: body.childQuestionId,
      },
    })

    return NextResponse.json(
      {
        createAnswerDummy,
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
