import { NextRequest, NextResponse } from 'next/server'
import prisma from '@/prisma/client'
import { getToken } from 'next-auth/jwt'

export async function GET(request: NextRequest, { params }: any) {

  try {
    const token = await getToken({
      req: request,
    })

    const user = await prisma.user.findUnique({
      where: {
        id: token?.sub,
      },
      include : {
        StudentAnswer : {
          include : {
            doneQuestion : true
          }
        }
      }
    })

    const studentAnswer = await prisma.studentAnswer.findFirst({
        where : {
            questionId : params.id,
            userId : user?.id
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