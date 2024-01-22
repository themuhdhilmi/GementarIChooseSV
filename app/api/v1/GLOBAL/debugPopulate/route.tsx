import { NextRequest, NextResponse } from "next/server";
import bcrypt from "bcrypt";
import prisma from "@/prisma/client";

export async function POST(request: NextRequest, response: NextResponse) {


    try {
        const passwordEncrypt = await bcrypt.hash("password", 10);

        const deleteMember = await prisma.member.deleteMany({});
        const deleteProject = await prisma.projectTitle.deleteMany({});
        const deleteJob = await prisma.studentInformation.deleteMany({});
        const deleteTesterInformation = await prisma.lecturerInformation.deleteMany({});
        const deleteReqInformation = await prisma.sessionYear.deleteMany({});
        const deletedUsers = await prisma.user.deleteMany({});



        const session = await prisma.sessionYear.create({
            data: {
                number: 1,
                yearOne: 2023,
                yearTwo: 2024,
                isSelected : true
            }
        })

        const session2 = await prisma.sessionYear.create({
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

        ///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////// LECTURER START +
        const lecturer = await prisma.user.create({
            data: {
                email: "lectureraminah@example.com",
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
                        { id: session.id }
                    ]
                }
            }
        })

        /////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
        const lecturer2 = await prisma.user.create({
            data: {
                email: "lecturerfaizul@example.com",
                name: "Encik Faizul",
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
                        { id: session.id },
                        { id: session2.id },
                    ]
                }
            }
        })

        /////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
        const lecturer3 = await prisma.user.create({
            data: {
                email: "lecturerzamri@example.com",
                name: "Zamri Ahmad",
                hashedPassword: passwordEncrypt,
                role: "LECTURER",
            },
        });


        const lecturerData3 = await prisma.lecturerInformation.create({
            data: {
                Track: 'SOFTWARE',
                User: {
                    connect: { id: lecturer3.id }
                },
                SessionYear: {
                    connect: [
                        { id: session.id },
                        { id: session2.id },
                    ]
                }
            }
        })

        ///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////// LECTURER END -


        ///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////// STUDENT START +
        const student = await prisma.user.create({
            data: {
                email: 'studentkamal@mail.com',
                name: 'Kamal Abdillah',
                hashedPassword: passwordEncrypt,
                role: 'STUDENT'
            }
        })

        const studentData = await prisma.studentInformation.create({
            data: {
                matricNumber: "01DDT20F1123",
                Track: "NETWORK",
                User: {
                    connect: { id: student.id }
                },
                SessionYear: {
                    connect:
                        { id: session.id }
                },
                LecturerInformation: {
                    connect: {
                        id: lecturerData2.id
                    }
                }
            },
        })

        const studentMember = await prisma.member.create({
            data: {
                matricNumber: "01DDT20F4321",
                name: "Hazimah Kairuddin",
                StudentInformation: {
                    connect: studentData
                }
            }
        })

        const studentMember2 = await prisma.member.create({
            data: {
                matricNumber: "01DDT20F4521",
                name: "Kamaruddin Ahmed",
                StudentInformation: {
                    connect: studentData
                }
            }
        })

        const studentMember3 = await prisma.member.create({
            data: {
                matricNumber: "01DDT50F4321",
                name: "Fitri Abd Zaman",
                StudentInformation: {
                    connect: studentData
                }
            }
        })

        const projectTitle = await prisma.projectTitle.create({
            data: {
                name: "Crab Game",
                StudentInformation: {
                    connect: {
                        id: studentData.id
                    }
                }
            }
        })

        const projectTitle2 = await prisma.projectTitle.create({
            data: {
                name: "Casino Slot",
                StudentInformation: {
                    connect: {
                        id: studentData.id
                    }
                }
            }
        })

        const projectTitle3 = await prisma.projectTitle.create({
            data: {
                name: "VR Game",
                StudentInformation: {
                    connect: {
                        id: studentData.id
                    }
                }
            }
        })

        ///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////// STUDENT END -

        const getSessionList = await prisma.sessionYear.findMany({
            include: {
                StudentInformation: {
                    include: {
                        User: true,
                        Member: true,
                        ProjectTitle: true,
                        LecturerInformation: {
                            include: {
                                User: true
                            }
                        }
                    }
                },
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
                status: 200
            })

    } catch (error) {
        return NextResponse.json(
            {
                error,
                note : 'has you migrate the database yet?'
            },
            {
                status: 400
            })
    }
}


