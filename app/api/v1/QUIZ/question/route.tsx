import { NextRequest, NextResponse } from 'next/server'
import bcrypt from 'bcrypt'
import prisma from '@/prisma/client'
import { z } from 'zod'

export async function GET(request: NextRequest, response: NextResponse) {
  try {
    // const body = await request.json()

    const subject = await prisma.question.findMany()

    return NextResponse.json(
      {
        subject,
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

const schemaPOST = z.object({
  title: z.string().min(4),
  timeLimit: z.number(),
  subjectId: z.string(),
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

    const createQuestion = await prisma.question.create({
      data: {
        title: body.title,
        timeLimit: body.timeLimit,
        subjectId: body.subjectId,
      },
    })

    return NextResponse.json(
      {
        createQuestion,
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
