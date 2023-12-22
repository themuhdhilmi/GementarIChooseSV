import { NextRequest, NextResponse } from "next/server";
import { getToken } from "next-auth/jwt";
import bcrypt from "bcrypt";
import prisma from "@/prisma/client";
import { number } from "zod";
import { connect } from "http2";
// import { z } from "zod";

// const schema = z.object({
//     gigId: z.number(),
//     accept: z.boolean()
// })

export async function POST(request: NextRequest, response: NextResponse) {

    const body = await request.json();
    const passwordEncrypt = await bcrypt.hash("password", 10);

    const deleteJob = await prisma.studentInformation.deleteMany({});
    const deleteTesterInformation = await prisma.lecturerInformation.deleteMany({});
    const deleteReqInformation = await prisma.sessionYear.deleteMany({});
    const deletedUsers = await prisma.user.deleteMany({});

    // const validation = schema.safeParse(body);

    // if (!validation.success) {
    //     return NextResponse.json(
    //         validation.error.errors,
    //         {
    //             status: 400
    //         })
    // }

    const initialSession = await prisma.sessionYear.create({
        data: {
            number: 1,
            yearOne: 2023,
            yearTwo: 2024
        }
    })

    const initialSession2 = await prisma.sessionYear.create({
        data: {
            number: 2,
            yearOne: 2023,
            yearTwo: 2024
        }
    })

    const admin = await prisma.user.create({
        data: {
            email: "admin@mail.com",
            name: "admin",
            hashedPassword: passwordEncrypt,
            role: "ADMIN",
        },
    });

    const lecturer = await prisma.user.create({
        data: {
            email: "aminahbibi@example.com",
            name: "Puan Aminah",
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
            SessionYear: {
                connect: [
                    { id: initialSession.id }
                ]
            }
        }
    })


    const lecturer2 = await prisma.user.create({
        data: {
            email: "encikFaizul@example.com",
            name: "EncikFaizul",
            hashedPassword: passwordEncrypt,
            role: "LECTURER",
        },
    });


    const lecturerData2 = await prisma.lecturerInformation.create({
        data: {
            Track: 'SOFTWARE',
            User: {
                connect: { id: lecturer2.id }
            },
            SessionYear: {
                connect: [
                    { id: initialSession.id },
                    { id: initialSession2.id },
                ]
            }
        }
    })


    const student = await prisma.user.create({
        data: {
            email: 'student@mail.com',
            name: 'Student Kamal',
            hashedPassword: passwordEncrypt,
            role: 'STUDENT'
        }
    })



    const studentData = await prisma.studentInformation.create({
        data: {
            matricNumber: "01DDT20F1122",
            Track: "SOFTWARE",
            User: {
                connect: { id: student.id }
            },
            SessionYear: {
                connect:
                    { id: initialSession.id }
            }
        },
    })


    const student2 = await prisma.user.create({
        data: {
            email: 'student2@mail.com',
            name: 'Student Samdol',
            hashedPassword: passwordEncrypt,
            role: 'STUDENT'
        }
    })

    const studentData2 = await prisma.studentInformation.create({
        data: {
            matricNumber: "01DDT20F1122",
            Track: "SOFTWARE",
            User: {
                connect: { id: student2.id }
            },
            SessionYear: {
                connect:
                    { id: initialSession.id }
            },
            LecturerInformation : {
                connect : {
                    id : lecturerData.id
                }
            }
        },
    })



    const getSessionList = await prisma.sessionYear.findMany({
        include: {
            StudentInformation: true,
            Supervisor: {
                include: {
                    User: {
                        select: {
                            name: true
                        }
                    }
                }
            }
        }
    })

    return NextResponse.json(
        {
            getSessionList
        },
        {
            status: 400
        })
}


