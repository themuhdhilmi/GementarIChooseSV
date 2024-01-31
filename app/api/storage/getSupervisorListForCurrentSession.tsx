// checkLecturerStudent.tsx
import React from "react";
import prisma from "@/prisma/client";

const getSupervisorListForCurrentSession = async (sessionId: string) => {
  const getSupervisorList = await prisma.sessionYear.findUniqueOrThrow({
    where: {
      id: sessionId,
    },
    include: {
      Supervisor: {
        include: {
          User: true,
        },
      },
    },
  });

  return getSupervisorList;
};

export default getSupervisorListForCurrentSession;
