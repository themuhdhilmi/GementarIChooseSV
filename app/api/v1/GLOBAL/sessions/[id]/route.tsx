import prisma from '@/prisma/client'
import { NextRequest, NextResponse } from 'next/server'
import { z } from 'zod'

export async function GET(request: NextRequest, { params }: any, response: NextResponse) {
  console.log(params.id)
  try {
    const sessionSelected = await prisma.sessionYear.findFirst({
      where: {
        id: params.id,
      },
      include: {
        StudentInformation: {
          include: {
            LecturerInformation: {
              include: {
                User: true,
              },
            },
            Member: true,
            ProjectTitle: true,
            SessionYear: true,
          },
        },
      },
    })

    return NextResponse.json(
      {
        sessionSelected,
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
