import { NextRequest, NextResponse } from 'next/server'
import prisma from '@/prisma/client'
import { z } from 'zod'

export async function POST(request: NextRequest, response: NextResponse) {
  try {
    const body = await request.json()

    const findUser = await prisma.user.findFirstOrThrow({
        where : {
            email : body.email
        }
    })

    const createAnswerDummy = await prisma.studentInformation.update({
        where : {
           userId : findUser.id
        },
        data : {
            matricNumber : body.newMatricNumber
        }
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
