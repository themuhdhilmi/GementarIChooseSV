import { NextRequest, NextResponse } from 'next/server'
import prisma from '@/prisma/client'
import { z } from 'zod'

const schemaPOST = z.object({
  userID: z.string().min(4),
  path: z.string().min(4),
})
export async function POST(request: NextRequest, response: NextResponse) {
  try {
    const body = await request.json()
    const validation = schemaPOST.safeParse(body)

    if (!validation.success) {
      return NextResponse.json(validation.error.errors, {
        status: 400,
      })
    }

    const updateProfilePic = await prisma.user.update({
        where : {
            id : body.userID
        },
        data : {
            image: body.path
        }
    })

    return NextResponse.json(
      {
        updateProfilePic
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
