import { NextRequest, NextResponse } from 'next/server'
import prisma from '@/prisma/client'

export async function GET(request: NextRequest,{ params }: any) {
  try {

    const user = await prisma.user.findUnique({
      where: {
        email: params.email
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
