import { NextRequest, NextResponse } from 'next/server'
import prisma from '@/prisma/client'

export async function GET(request: NextRequest, { params }: any) {
  try {

    const subject = await prisma.question.findFirstOrThrow({
        where : {
            id: params.id
        },
        include: {
            childQuestion: {
                include: {
                    answerDummy: true
                }
            },

        }
    })

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