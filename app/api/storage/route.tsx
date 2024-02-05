import { NextRequest, NextResponse } from "next/server";
import getSupervisorListForCurrentSession from "./getSupervisorListForCurrentSession";
import prisma from "@/prisma/client";

export async function GET(request: NextRequest, response: NextResponse) {
  const getFirstSessionSelected = await prisma.sessionYear.findFirst({
    where: {
      isSelected: true,
    },
  });

  const debug = await getSupervisorListForCurrentSession(
    getFirstSessionSelected!.id
  );

  return NextResponse.json({
    debug,
  });
}
