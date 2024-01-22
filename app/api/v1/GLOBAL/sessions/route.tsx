import prisma from "@/prisma/client";
import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";

export async function GET(request: NextRequest, response: NextResponse) {
  try {
    const sessionsList = await prisma.sessionYear.findMany();

    const sessionSelected = await prisma.sessionYear.findFirst({
      where: {
        isSelected: true,
      },
    });

    return NextResponse.json(
      {
        sessionSelected,
        sessionsList,
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

const schema = z.object({
  sessionID: z.string().min(4),
});

export async function POST(request: NextRequest, response: NextResponse) {
  try {
    const body = await request.json();

    const validation = schema.safeParse(body);

    if (!validation.success) {
      return NextResponse.json(validation.error.errors, {
        status: 400,
      });
    }

    const sessions = await prisma.sessionYear.findFirstOrThrow({
      where: {
        id: body.sessionID,
      },
    });

    const sessionSetAllFalse = await prisma.sessionYear.updateMany({
        data  : {
            isSelected : false
        }
    })

    const sessionSetTargetedTrue = await prisma.sessionYear.update({
        where : {
            id: body.sessionID,
        },
        data  : {
            isSelected : true
        }
    })

    return NextResponse.json(
      {
        sessionSetTargetedTrue,
        sessionSetAllFalse
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
