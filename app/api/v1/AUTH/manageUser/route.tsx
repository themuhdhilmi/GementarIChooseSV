import { NextRequest, NextResponse } from 'next/server'
import bcrypt from 'bcrypt'
import prisma from '@/prisma/client'
import { z } from 'zod'

const schemaPUT = z.object({
  id: z.string(),
  password: z.string().min(4).nullable(),
})
export async function PUT(request: NextRequest, response: NextResponse) {
  try {
    const body = await request.json()
    let passwordEncrypt = null

    if (body.password !== null) {
      passwordEncrypt = await bcrypt.hash(body.password, 10)
    }

    const validation = schemaPUT.safeParse(body)

    if (!validation.success) {
      return NextResponse.json(validation.error.errors, {
        status: 400,
      })
    }

    passwordEncrypt = await bcrypt.hash(body.password, 10)

    const getUser = await prisma.user.update({
      where: {
        id: body.id,
      },
      data: {
        hashedPassword: passwordEncrypt,
        hasChangeOneTimePassword: true
      },
    })

    return NextResponse.json(
      {
        getUser,
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
