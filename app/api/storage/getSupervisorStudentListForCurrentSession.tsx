// checkLecturerStudent.tsx
import React from 'react';
import prisma from "@/prisma/client";

const getSupervisorStudentListForCurrentSession = async (email: string, sessionId: string) => {

    const getLecturer = await prisma.lecturerInformation.findFirstOrThrow({
        where: {
            User: {
                email: email
            }
        },
        include: {
            User: true
        }
    })

    const getLecturerSessionStudentNone = await prisma.sessionYear.findFirst({
        where: {
            id: sessionId,
            StudentInformation: {
                some: {
                    LecturerInformation: {
                        User: {
                            email: email
                        }
                    },
                    lecturerAcceptedStudent: 'NONE'
                },
            }
        },
        include: {
            StudentInformation: true
        }
    })

    const getLecturerSessionStudentDeclined = await prisma.sessionYear.findFirst({
        where: {
            id: sessionId,
            StudentInformation: {
                some: {
                    LecturerInformation: {
                        User: {
                            email: email
                        }
                    },
                    lecturerAcceptedStudent: 'DECLINED'
                },
            }
        },
        include: {
            StudentInformation: true
        }
    })

    const getLecturerSessionStudentAccepted = await prisma.sessionYear.findFirst({
        where: {
            id: sessionId,
            StudentInformation: {
                some: {
                    LecturerInformation: {
                        User: {
                            email: email
                        }
                    },
                    lecturerAcceptedStudent: 'ACCEPTED'
                },
            }
        },
        include: {
            StudentInformation: true
        }
    })

    const getSupervisor = await prisma.sessionYear.findFirst({
        where: {
            id: sessionId,
            Supervisor : {
                some : {
                    User : {
                        email : email
                    }
                }
            }
        },
        include: {
            StudentInformation: true
        }
    })

    let isFull = false;
    let supervisorQuota = 0;
    let supervisorStudent = 0;
    if (!getLecturer.supervisorQuota) {
        const acceptedStudentCount = getLecturerSessionStudentAccepted === null ? 0 : getLecturerSessionStudentAccepted.StudentInformation.length;

        if (getLecturerSessionStudentNone!.globalSupervisorQuota <= acceptedStudentCount) {
            isFull = true;
        }
        supervisorQuota = getLecturerSessionStudentNone!.globalSupervisorQuota;
        supervisorStudent = acceptedStudentCount;
    }
    else {
        const acceptedStudentCount = getLecturerSessionStudentAccepted === null ? 0 : getLecturerSessionStudentAccepted.StudentInformation.length;

        if (getLecturer.supervisorQuota <= acceptedStudentCount) {
            isFull = true;
        }
        supervisorQuota = getLecturer.supervisorQuota;
        supervisorStudent = acceptedStudentCount;
    }

    return {
        lecturer: {
            email : getLecturer.User.email,
            name : getLecturer.User.name,
            session : {
                number : getLecturerSessionStudentNone?.number ,
                yearOne : getLecturerSessionStudentNone?.yearOne ,
                yearTwo : getLecturerSessionStudentNone?.yearTwo ,
            } 
        },
        isFull,
        isSupervisor : getSupervisor !== null ? true : false,
        supervisorQuota,
        supervisorAccptedStudent :supervisorStudent,
        getRequestedStudent: getLecturerSessionStudentNone === null ? 0 : getLecturerSessionStudentNone.StudentInformation.length,
        getDeclinedStudent: getLecturerSessionStudentDeclined === null ? 0 : getLecturerSessionStudentDeclined.StudentInformation.length,
        getLecturerSessionStudentNone: getLecturerSessionStudentNone === null ? null : getLecturerSessionStudentNone.StudentInformation,
        getLecturerSessionStudentDeclined: getLecturerSessionStudentDeclined === null ? null : getLecturerSessionStudentDeclined.StudentInformation,
        acceptedLecturerStudentAccepted: getLecturerSessionStudentAccepted === null ? null : getLecturerSessionStudentAccepted.StudentInformation
    }
};

export default getSupervisorStudentListForCurrentSession;
