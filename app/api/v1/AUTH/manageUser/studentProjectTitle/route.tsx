import { NextRequest, NextResponse } from 'next/server'
import prisma from '@/prisma/client'
import { z } from 'zod'

const schemaPOST = z.object({
  emailLead: z.string().min(4),
  name: z.string().min(4),
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

    let checkLead = await prisma.studentInformation.findFirstOrThrow({
      where: {
        User: {
          email: body.emailLead,
          role: 'STUDENT',
        },
      },
      include: {
        ProjectTitle: true,
      },
    })

    const sessionGet = await prisma.sessionYear.findFirstOrThrow({
      where: {
        id: checkLead.sessionYearId,
      },
    })

    if (!checkLead.titleQuota) {
      if (checkLead.ProjectTitle.length >= sessionGet.globalTitleQuota) {
        return NextResponse.json(
          {
            error: 'ExceedGlobalProjectTitleQuotaError',
            globalQuota: sessionGet.globalTitleQuota,
            currentQuota: checkLead.ProjectTitle.length,
            code: 'P4310',
          },
          {
            status: 400,
          }
        )
      }
    } else {
      if (checkLead.ProjectTitle.length >= checkLead.titleQuota) {
        return NextResponse.json(
          {
            error: 'ExceedInternalProjectTitleQuotaError',
            internalQuota: checkLead.titleQuota,
            currentQuota: checkLead.ProjectTitle.length,
            code: 'P4310',
          },
          {
            status: 400,
          }
        )
      }
    }

    const newProjectTitle = await prisma.projectTitle.create({
      data: {
        name: body.name !== null ? body.name.trim() : undefined,
        studentInformationId: checkLead.id,
      },
    })

    checkLead = await prisma.studentInformation.findFirstOrThrow({
      where: {
        User: {
          email: body.emailLead,
          role: 'STUDENT',
        },
      },
      include: {
        ProjectTitle: true,
      },
    })

    return NextResponse.json(
      {
        newProjectTitle,
        projectCount: checkLead.ProjectTitle.length,
        leadInfo: checkLead,
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
  emailLead: z.string().min(4),
  projectTitleId: z.string(),
  name: z.string().min(4).nullable(),
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



    const emailLead = await prisma.studentInformation.findFirstOrThrow({
      where: {
        User: {
          email: body.emailLead,
        },
        ProjectTitle: {
          some: {
            id: body.projectTitleId,
          },
        },
      },
    })

    
    const projectTitle = await prisma.projectTitle.findFirstOrThrow({
      where: {
        id: body.projectTitleId,
      },
    })

    const updateProjectTitle = await prisma.projectTitle.update({
      where: {
        id: projectTitle.id,
      },
      data: {
        name: body.name !== null ? body.name.trim() : undefined,
        uploadedPoster: body.projectTitleId,
      },
    })

    return NextResponse.json(
      {
        updateProjectTitle,
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
  emailLead: z.string().min(4),
  projectTitleId: z.string(),
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

    const emailLead = await prisma.studentInformation.findFirstOrThrow({
      where: {
        User: {
          email: body.emailLead,
        },
        ProjectTitle: {
          some: {
            id: body.projectTitleId,
          },
        },
      },
    })

    const projectTitle = await prisma.projectTitle.findFirstOrThrow({
      where: {
        id: body.projectTitleId,
      },
    })

    const deleteProjectTitle = await prisma.projectTitle.delete({
      where: {
        id: projectTitle.id,
      },
    })

    return NextResponse.json(
      {
        deleteProjectTitle,
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
