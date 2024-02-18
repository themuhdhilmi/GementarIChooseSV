"use client";
import { breakpoints } from "@/app/config/breakpoints";
import UseGetStudent from "@/app/dashboard/view/student/[email]/components/UseGetStudent";
import { useAddStudentMember } from "@/app/utilities/storage/student/useAddStudentMember";
import { useAddStudentTitle } from "@/app/utilities/storage/student/useAddStudentTitle";
import { useGetStudent } from "@/app/utilities/storage/student/useGetStudent";
import { useStudentApplySupervisor } from "@/app/utilities/storage/student/useStudentApplySupervisor";
import { useUpdateStudent } from "@/app/utilities/storage/student/useUpdateStudent";
import { useUpdateStudentMember } from "@/app/utilities/storage/student/useUpdateStudentMember";
import { useUpdateStudentTitle } from "@/app/utilities/storage/student/useUpdateStudentTitle";
import { useUserInformation } from "@/app/utilities/storage/user/useUserInformation";
import { useParams, useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import { useMediaQuery } from "usehooks-ts";

//TODO Add upload project poster
//TODO Add Reset Password
//TODO Supervisor disable on selection if the supervisor quota is full
//TODO Disable student edit when supervisor status -> ACCEPTED
//TODO Change the email placeholder

const Page = () => {
  const params = useParams<{ email: string }>();
  const { student, fetchData, doneFetch } = useGetStudent();
  const { data: studentApplySupervisor } = useStudentApplySupervisor();
  const { data: studentAddMember } = useAddStudentMember();
  const { data: studentUpdateMember } = useUpdateStudentMember();
  const { data: studentUpdate } = useUpdateStudent();
  const { data: studentAddTitle } = useAddStudentTitle();
  const { data: studentUpdateTitle } = useUpdateStudentTitle();
  const { role, email } = useUserInformation();
  const isDesktop = useMediaQuery(`(max-width: ${breakpoints.desktop})`);
  const [canEdit, setCanEdit] = useState(false);
  const [canEditAdmin, setCanEditAdmin] = useState(false);

  const router = useRouter();
  useEffect(() => {
    if (role === "ADMIN") {
      setCanEdit(true);
      setCanEditAdmin(true);
    } else if (role === "STUDENT") {
      if (params.email === email) {
        setCanEdit(true);
      }
    }

    fetchData(params.email);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [
    studentApplySupervisor,
    studentAddMember,
    studentUpdateMember,
    studentUpdate,
    studentAddTitle,
    studentUpdateTitle,
    role,
  ]);

  const funcCloseAll = () => {
    router.back();
  };

  return (
    <div className={`${isDesktop ? "px-6" : "px-24"}`}>
      <UseGetStudent
        selectViewUser={student.student}
        funcCloseAll={funcCloseAll}
        canEdit={canEdit}
        canEditAdmin={canEditAdmin}
      />
    </div>
  );
};

export default Page;
