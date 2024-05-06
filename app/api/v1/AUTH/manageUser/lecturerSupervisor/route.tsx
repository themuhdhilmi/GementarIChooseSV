import { NextRequest, NextResponse } from 'next/server'
import prisma from '@/prisma/client'
import { z } from 'zod'

const schemaPOST = z.object({
  lecturerEmail: z.string().min(4),
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

    // DEBUG : PLEASE ADD ADMIN VER
    const getCurrentSession = await prisma.sessionYear.findFirstOrThrow({
      where: {
        isSelected: true,
      },
      include: {
        Supervisor: {
          include: {
            User: true,
          },
        },
      },
    })

    // Find the lecturer in the supervisors list
    const lecturerIndex = getCurrentSession.Supervisor.findIndex((item : any) => item.User.email === body.lecturerEmail)

    const getFirstSession = await prisma.sessionYear.findFirstOrThrow({
        where : {
            isSelected: true
        }
      })

      const getLecturerUser = await prisma.user.findFirstOrThrow({
        where: {
            email  : body.lecturerEmail
        }
      })

    if (lecturerIndex !== -1) {

      const updateCurrentSessionRevokeSv = await prisma.sessionYear.update({
        where: {
            id: getFirstSession.id
        },
        data : {
            Supervisor: {
                disconnect : {
                    userId: getLecturerUser.id
                }
            }
        }
      })

      return NextResponse.json(
        {
            updateCurrentSessionRevokeSv,
        },
        {
          status: 200,
        }
      )
    }

    const updateCurrentSessionSetSv = await prisma.sessionYear.update({
        where: {
            id: getFirstSession.id
        },
        data : {
            Supervisor: {
                connect : {
                    userId: getLecturerUser.id
                }
            }
        }
      })

    return NextResponse.json(
      {
        updateCurrentSessionSetSv,
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
