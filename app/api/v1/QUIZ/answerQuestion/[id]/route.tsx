import { NextRequest, NextResponse } from 'next/server'
import { getToken } from 'next-auth/jwt'
import prisma from '@/prisma/client'
import { z } from 'zod'

export async function GET(request: NextRequest, { params }: any) {
  try {
    const body = await request.json()
    const token = await getToken({
      req: request,
    })

    const user = await prisma.user.findUnique({
      where: {
        id: token?.sub,
      },
    })

    if (!user) {
      return NextResponse.json(
        {
          error: 'Must be loggedIn User',
        },
        {
          status: 400,
        }
      )
    }

    if (user.role !== 'STUDENT') 
    {
      return NextResponse.json(
        {
          error: 'Must Be Student',
        },
        {
          status: 400,
        }
      )
    }


    // find if user already answer then output error.
    // 

    const question = await prisma.question.findFirstOrThrow({
      where : {
        id : params.id
      }
    })

    const childQuestion = await prisma.childQuestion.findFirstOrThrow({
      where : {
        questionId : question.id
      }
    })

    const subject = await prisma.question.findFirstOrThrow({
      where: {
        id: params.id,
      },
      include: {
        childQuestion: {
          orderBy: {
            sortingPosition: 'asc', // Order by sortingPosition ascending to get the next item
          },
          include: {
            questionBody: {
              include: {
                answer: true,
              },
            },
            answerDummy: true,
          },
        },
      },
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
