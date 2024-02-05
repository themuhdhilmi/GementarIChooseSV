import { NextRequest, NextResponse } from "next/server";
import prisma from "@/prisma/client";

export async function GET(request: NextRequest, response: NextResponse) {
  const getFirstSessionSelected = await prisma.sessionYear.findFirst({
    where: {
      isSelected: true,
    },
  });

  const debug = await prisma.sessionYear.findFirst({
    where: {
      id: getFirstSessionSelected!.id,
    },
    include: {
      Supervisor: {
        include: {
          User: true,
        },
      },
    },
  });

  return NextResponse.json({
    debug,
  });
}
