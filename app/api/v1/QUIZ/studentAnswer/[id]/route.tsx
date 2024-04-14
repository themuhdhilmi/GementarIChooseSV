import { NextRequest, NextResponse } from 'next/server'
import prisma from '@/prisma/client'

export async function GET(request: NextRequest, { params }: any) {

  try {

    const studentAnswer = await prisma.studentAnswer.findFirst({
        where : {
            questionId : params.id
        }
    })

    if(!studentAnswer)
    {
        return NextResponse.json(
            {
              error : "user doesn't interact with this question",
              isInteracted : false
            },
            {
              status: 400,
            }
          )
    }

    return NextResponse.json(
        {
            studentAnswer
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