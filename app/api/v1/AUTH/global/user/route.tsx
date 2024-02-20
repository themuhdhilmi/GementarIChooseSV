import { NextRequest, NextResponse } from 'next/server'
import prisma from '@/prisma/client'
import { z } from 'zod'
import { getToken } from 'next-auth/jwt'

export async function GET(request: NextRequest, response: NextResponse) {
  try {
    const token = await getToken({
      req: request,
    })

    const user = await prisma.user.findUnique({
      where: {
        id: token?.sub,
      },
    })

    return NextResponse.json(
      {
        user,
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
