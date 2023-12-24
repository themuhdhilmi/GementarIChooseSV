import { NextRequest, NextResponse } from "next/server";
import { getToken } from "next-auth/jwt";
import bcrypt from "bcrypt";
import prisma from "@/prisma/client";
import { z } from "zod";
import getSupervisorListForCurrentSession from "./getSupervisorListForCurrentSession";

export async function GET(request: NextRequest, response: NextResponse) {

        const debug = await getSupervisorListForCurrentSession("clqi38ax3000011kd46197nz4");

        return NextResponse.json(
            {
                debug
            })

}