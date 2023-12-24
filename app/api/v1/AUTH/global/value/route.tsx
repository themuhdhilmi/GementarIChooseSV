import { NextRequest, NextResponse } from "next/server";
import prisma from "@/prisma/client";
import { z } from "zod";

const schemaPUT = z.object({
    sessionId: z.string(),
    memberQuota: z.number().nullable(),
    projectTitleQuota: z.number().nullable(),
    supervisorQuota: z.number().nullable()

});
export async function PUT(request: NextRequest, response: NextResponse) {
    try {
        const body = await request.json();
        const validation = schemaPUT.safeParse(body);

        if (!validation.success) {
            return NextResponse.json(validation.error.errors, {
                status: 400,
            });
        }

        const updateGlobal = await prisma.sessionYear.update({
            where: {
                id: body.sessionId
            },
            data: {
                globalTitleQuota: body.projectTitleQuota !== null ? body.projectTitleQuota : undefined,
                globalMemberQuota: body.memberQuota !== null ? body.memberQuota : undefined,
                globalSupervisorQuota: body.supervisorQuota !== null ? body.supervisorQuota : undefined,
            }
        })

        return NextResponse.json(
            {
                updateGlobal,
            },
            {
                status: 200,
            }
        );
    } catch (error) {
        return NextResponse.json(
            {
                error,
            },
            {
                status: 400,
            }
        );
    }
}

