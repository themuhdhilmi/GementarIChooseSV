import { NextRequest, NextResponse } from 'next/server'
import prisma from '@/prisma/client'
import { z } from 'zod'

const schemaPOST = z.object({
  title: z.string().min(4),
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

    const createSubject = await prisma.subject.create({
      data: {
        title: body.title,
      },
    })

    return NextResponse.json(
      {
        createSubject,
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

export async function GET(request: NextRequest, response: NextResponse) {
  try {

    const subject = await prisma.subject.findMany({
      where: {
        isHidden: false
      },
      include: {
        Question: {
          include: {
            childQuestion: {
              include: {
                questionBody: true,
                answerDummy: true,
              },
            },
          },
        },
      },
    })

    return NextResponse.json(
      {
        subject,
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

const schemaDelete = z.object({
  subjectId: z.string(),
})
export async function DELETE(request: NextRequest, response: NextResponse) {
  try {
    const body = await request.json()
    const validation = schemaDelete.safeParse(body)

    if (!validation.success) {
      return NextResponse.json(validation.error.errors, {
        status: 400,
      })
    }

    const hideSubject = await prisma.subject.update({
      where: {
        id: body.subjectId
      },
      data: {
        isHidden : true
      }
    });

    return NextResponse.json(
      {
        hideSubject
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