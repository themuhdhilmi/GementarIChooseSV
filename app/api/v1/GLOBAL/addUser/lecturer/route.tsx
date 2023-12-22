import { NextRequest, NextResponse } from "next/server";
import { getToken } from "next-auth/jwt";
import bcrypt from "bcrypt";
import prisma from "@/prisma/client";
import { number } from "zod";
import { connect } from "http2";
import { z } from "zod";

const schema = z.object({
    name : z.string().min(4),
    email: z.string().email(),
    password: z.string().min(4),
    confirmPassword: z.string().min(4),
})

export async function POST(request: NextRequest, response: NextResponse) {

    const body = await request.json();
    const passwordEncrypt = await bcrypt.hash(body.password, 10);

    const validation = schema.safeParse(body);

    if (!validation.success) {
        return NextResponse.json(
            validation.error.errors,
            {
                status: 400
            })
    }

    // DEBUG : PLEASE ADD ADMIN VER

    const lecturer = await prisma.user.create({
        data: {
            email: body.name,
            name: body.email,
            hashedPassword: passwordEncrypt,
            role: "LECTURER",
        },
    });

    const lecturerData = await prisma.lecturerInformation.create({
        data: {
            Track: 'SOFTWARE',
            User: {
                connect: { id: lecturer.id }
            },
        }
    })

    return NextResponse.json(
        {
            lecturerData
        },
        {
            status: 400
        })
}


