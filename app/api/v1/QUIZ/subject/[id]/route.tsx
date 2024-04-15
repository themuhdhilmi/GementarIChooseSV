import { NextRequest, NextResponse } from 'next/server'
import bcrypt from 'bcrypt'
import prisma from '@/prisma/client'
import { z } from 'zod'

export async function GET(request: NextRequest, { params }: any) {
  try {

    const subject = await prisma.subject.findFirstOrThrow({
      where: {
        id: params.id,
      },
      include: {
        Question: {
          include: {
            childQuestion: {
              include: {
                questionBody: {
                  include : {
                    answer : true
                  }
                },
                answerDummy: true,
              },
            },
          },
        },
      },
    })




    return NextResponse.json(
      {
        subject

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
