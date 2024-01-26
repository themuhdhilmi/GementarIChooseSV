import { NextRequest, NextResponse } from "next/server";
import { getToken } from "next-auth/jwt";
import bcrypt from "bcrypt";
import prisma from "@/prisma/client";
import { z } from "zod";
import { apiDefaultPagination } from "@/app/config/api";
import { Prisma } from "@prisma/client";
import { getCsrfToken, getSession } from "next-auth/react";

function censorName(name: any) {
  const nameParts = name.split(" ");
  const censoredParts = nameParts.map(
    (part: string | any[]) => part[0] + "*".repeat(part.length - 1)
  );
  return censoredParts.join(" ");
}

export async function GET(request: NextRequest, response: NextResponse) {
  const token = await getToken({ req: request });

  const csrfToken = await getCsrfToken()

//   const user = await prisma.user.findUnique({
//     where: {
//       id: token?.sub,
//     },
//   });

  return NextResponse.json(
    {
      token,
      csrfToken
    },
    {
      status: 200,
    }
  );
}
