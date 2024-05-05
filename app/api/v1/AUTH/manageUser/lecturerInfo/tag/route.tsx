import { NextRequest, NextResponse } from 'next/server'
import prisma from '@/prisma/client'
import { z } from 'zod'

const LecturerBiographyInfoTagColor = z.enum(['RED', 'GREEN', 'BLUE', 'YELLOW'])
const schemaPOST = z.object({
  lecturerBiographyInfoID: z.string(),
  text: z.string(),
  LecturerBiographyInfoTagColor: LecturerBiographyInfoTagColor,
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

    const createTag = await prisma.lecturerBiographyInfoTag.create({
      data: {
        text: body.text,
        LecturerBiographyInfoTagColor: body.LecturerBiographyInfoTagColor,
        LecturerBiographyInfo: {
          connect: {
            id: body.lecturerBiographyInfoID,
          },
        },
      },
    })

    return NextResponse.json(
      {
        createTag,
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

const schemaDELETE = z.object({
    LecturerBiographyInfoTagID: z.string(),
})
export async function DELETE(request: NextRequest, response: NextResponse) {
  try {
    const body = await request.json()

    const validation = schemaDELETE.safeParse(body)

    if (!validation.success) {
      return NextResponse.json(validation.error.errors, {
        status: 400,
      })
    }

    const deleteInfoTag = await prisma.lecturerBiographyInfoTag.delete({
      where: {
        id: body.LecturerBiographyInfoTagID,
      },
    })

    return NextResponse.json(
      {
        deleteInfoTag,
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
