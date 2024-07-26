import { NextRequest, NextResponse } from 'next/server'
import prisma from '@/prisma/client'
import { z } from 'zod'

const schemaPOST = z.object({
  emailLead: z.string().min(4),
  name: z.string().min(4),
  matricNumber: z.string().min(5).max(15),
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
        Member: true,
      },
    })

    const sessionGet = await prisma.sessionYear.findFirstOrThrow({
      where: {
        id: checkLead.sessionYearId,
      },
    })

    if (!checkLead.memberQuota) {
      if (checkLead.Member.length >= sessionGet.globalMemberQuota) {
        return NextResponse.json(
          {
            error: 'ExceedGlobalMemberQuotaError',
            globalQuota: sessionGet.globalMemberQuota,
            currentQuota: checkLead.Member.length,
            code: 'P4310',
          },
          {
            status: 400,
          }
        )
      }
    } else {
      if (checkLead.Member.length >= checkLead.memberQuota) {
        return NextResponse.json(
          {
            error: 'ExceedInternalMemberQuotaError',
            internalQuota: checkLead.memberQuota,
            currentQuota: checkLead.Member.length,
            code: 'P4310',
          },
          {
            status: 400,
          }
        )
      }
    }

    const newMember = await prisma.member.create({
      data: {
        matricNumber: body.matricNumber.trim(),
        name: body.name.trim(),
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
        Member: true,
      },
    })

    return NextResponse.json(
      {
        newMember,
        memberCount: checkLead.Member.length,
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
  matricNumber: z.string().min(5).max(15).nullable(),
  newMatricNumber: z.string().min(5).max(15).nullable(),
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

    // DEBUG : PLEASE ADD ADMIN VER

    const studentInfo = await prisma.studentInformation.findFirstOrThrow({
      where: {
        User: {
          email: body.emailLead,
          role: 'STUDENT',
        },
      },
    })

    const getMember = await prisma.member.findFirstOrThrow({
      where: {
        studentInformationId: studentInfo.id,
        matricNumber: body.matricNumber,
      },
    })

    const updateMember = await prisma.member.update({
      where: {
        id: getMember.id,
      },
      data: {
        matricNumber: body.newMatricNumber !== null ? body.newMatricNumber.trim() : undefined,
        name: body.name !== null ? body.name.trim() : undefined,
      },
    })

    return NextResponse.json(
      {
        updateMember,
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
  matricNumber: z.string().min(5).max(15),
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

    // DEBUG : PLEASE ADD ADMIN VER

    const studentInfo = await prisma.studentInformation.findFirstOrThrow({
      where: {
        User: {
          email: body.emailLead,
          role: 'STUDENT',
        },
      },
    })

    const getMember = await prisma.member.findFirstOrThrow({
      where: {
        studentInformationId: studentInfo.id,
        matricNumber: body.matricNumber,
      },
    })

    const deleteMember = await prisma.member.delete({
      where: {
        id: getMember.id,
      },
    })

    return NextResponse.json(
      {
        deleteMember,
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
