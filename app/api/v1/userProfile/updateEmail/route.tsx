import { NextRequest, NextResponse } from 'next/server'
import prisma from '@/prisma/client'
import { z } from 'zod'

export async function POST(request: NextRequest, response: NextResponse) {
  try {
    const body = await request.json()

    const createAnswerDummy = await prisma.user.update({
      where : {
        email : body.email
      },
      data : {
        email : body.newEmail
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
