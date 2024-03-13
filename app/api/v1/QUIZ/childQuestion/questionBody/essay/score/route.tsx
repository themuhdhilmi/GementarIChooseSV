import { NextRequest, NextResponse } from 'next/server'
import bcrypt from 'bcrypt'
import prisma from '@/prisma/client'
import { z } from 'zod'

const schemaPOST = z.object({
  questionBodyId: z.string(),
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

    //TODO SAMBUNG SINI [9:00 AM - 13/3/2024]

    const createAnswer = prisma.answerString.create({
        data: {
            string : 'generated answer for essay point',
            point: 4,
            QuestionBody : {
                connect : {
                    id: body.questionBodyId
                }
            }
        }
    })


    return NextResponse.json(
      {
        createChildQuestion : '',
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