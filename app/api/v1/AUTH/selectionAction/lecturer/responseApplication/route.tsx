import { NextRequest, NextResponse } from "next/server";
import { getToken } from "next-auth/jwt";
import bcrypt from "bcrypt";
import prisma from "@/prisma/client";
import { z } from "zod";

export async function GET(request: NextRequest, response: NextResponse) {
  return NextResponse.json(
    {
      implememt: "Please Implement",
    },
    {
      status: 400,
    },
  );
}
