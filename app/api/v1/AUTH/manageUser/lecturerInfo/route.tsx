import { NextRequest, NextResponse } from 'next/server'
import prisma from '@/prisma/client'
import { z } from 'zod'

const LecturerBiographyInfoType = z.enum(['RESEARCH', 'ARTICLE', 'CONSULTATION', 'AWARD_RECOGNITION', 'PROCEEDING', 'OTHERS', 'SUPERVISION'])
const schemaPOST = z.object({
  email: z.string().email(),
  lecturerBiographyInfoType: LecturerBiographyInfoType
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

    const findLecturer  = await prisma.user.findFirstOrThrow({
        where : {
            email : body.email,
            role : 'LECTURER'
        },
        include : {
            LecturerInformation : true
        }
    })
    
    // return NextResponse.json(
    //   {
    //     asdsadd : findLecturer?.LecturerInformation?.id
    //   },
    //   {
    //     status: 200,
    //   }
    // )

    const createBioInfo  = await prisma.lecturerBiographyInfo.create({
        data : {
            LecturerBiographyInfoType : body?.lecturerBiographyInfoType,
            LecturerInformation : {
                connect : {
                    id : findLecturer?.LecturerInformation?.id
                }
            }
        }
    })

    return NextResponse.json(
      {
        createBioInfo
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

const schemaPUT = z.object({
  lecturerBiographyInfoID: z.string(),
  mainText: z.string().nullable(),
  subText: z.string().nullable()
})
export async function PUT(request: NextRequest, response: NextResponse) {
  try {
    const body = await request.json()

    const validation = schemaPUT.safeParse(body)

    if (!validation.success) {
      return NextResponse.json(validation.error.errors, {
        status: 400,
      })
    }

    const updateLecturerBioGraphy = await prisma.lecturerBiographyInfo.update({
        where : {
            id : body.lecturerBiographyInfoID
        },
        data : {
            mainText: body.mainText ?? undefined,
            subText: body.subText ?? undefined,
        }
    })

    return NextResponse.json(
      {
        updateLecturerBioGraphy
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
    lecturerBiographyInfoID: z.string(),
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

      const deleteInfoTag = await prisma.lecturerBiographyInfoTag.deleteMany({
        where : {
            id : body.lecturerBiographyInfoID
        }
      })

      const deleteInfo = await prisma.lecturerBiographyInfo.delete({
        where : {
            id : body.lecturerBiographyInfoID
        }
      })

      return NextResponse.json(
        {
            deleteInfo,
            deleteInfoTag
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



