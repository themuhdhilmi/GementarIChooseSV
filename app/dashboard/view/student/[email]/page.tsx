"use client";
import LoadingLeftBottom from "@/app/components/LoadingLeftBottom";
import { breakpoints } from "@/app/config/breakpoints";
import UseGetStudent from "@/app/dashboard/view/student/[email]/components/UseGetStudent";
import { useAddStudentMember } from "@/app/utilities/storage/student/useAddStudentMember";
import { useAddStudentTitle } from "@/app/utilities/storage/student/useAddStudentTitle";
import { useGetStudent } from "@/app/utilities/storage/student/useGetStudent";
import { useStudentApplySupervisor } from "@/app/utilities/storage/student/useStudentApplySupervisor";
import { useUpdateStudent } from "@/app/utilities/storage/student/useUpdateStudent";
import { useUpdateStudentMember } from "@/app/utilities/storage/student/useUpdateStudentMember";
import { useUpdateStudentTitle } from "@/app/utilities/storage/student/useUpdateStudentTitle";
import { useParams, useRouter } from "next/navigation";
import React, { useEffect } from "react";
import { useMediaQuery } from "usehooks-ts";

const Page = () => {
  const params = useParams<{ email: string }>();
  const { student, fetchData, doneFetch } = useGetStudent();
  const { data: studentApplySupervisor } = useStudentApplySupervisor();
  const { data: studentAddMember } = useAddStudentMember();
  const { data: studentUpdateMember } = useUpdateStudentMember();
  const { data: studentUpdate } = useUpdateStudent();
  const { data: studentAddTitle } = useAddStudentTitle();
  const { data: studentUpdateTitle } = useUpdateStudentTitle();

  const isDesktop = useMediaQuery(`(max-width: ${breakpoints.desktop})`);
  const router = useRouter();
  useEffect(() => {
    fetchData(params.email);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [
    studentApplySupervisor,
    studentAddMember,
    studentUpdateMember,
    studentUpdate,
    studentAddTitle,
    studentUpdateTitle,
  ]);

  const funcCloseAll = () => {
    router.back();
  };

  return (
    <div className={`${isDesktop ? "px-6" : "px-24"}`}>
      <UseGetStudent
        selectViewUser={student.student}
        funcCloseAll={funcCloseAll}
      />
    </div>
  );
};

export default Page;
