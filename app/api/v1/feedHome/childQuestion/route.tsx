import { NextRequest, NextResponse } from 'next/server'
import prisma from '@/prisma/client'

export async function GET(request: NextRequest, response: NextResponse) {
  try {

    const questionOnTheWay = await prisma.question.findMany({
        where : {
            timeStart : {
                gte : new Date()
            }
        },
        include : {
            subject : true,
            StudentAnswer : true
        }
    })

    const questionOnProgress = await prisma.question.findMany({
        where : {
            timeStart : {
                lte : new Date()
            },
            timeEnd : {
                gte : new Date()
            }
        },
        include : {
            subject : true,
            StudentAnswer : true
        }
    })


    const answerList = await prisma.studentAnswer.findMany({
        where : {
            question : {
                timeStart : {
                    lte : new Date()
                },
                timeEnd : {
                    gte : new Date()
                }
            }
        },
        include : {
            question : {
                include : {
                    childQuestion : true
                }
            },
            StudentAnswerList : true,
            user : true
        }
    })

    const answerListIncomplete = await prisma.studentAnswer.findMany({
        where : {
            question : {
                timeStart : {
                    gte : new Date()
                },
            },
            isCheckedByLecturer : false
        },
        include : {
            question : true,
            StudentAnswerList : true,
            user : true
        }
    })

    return NextResponse.json(
      {
        questionOnTheWay,
        questionOnProgress,
        answerList,
        answerListIncomplete
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

export const dynamic = "force-dynamic";