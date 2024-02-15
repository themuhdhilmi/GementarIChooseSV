"use client";
import { breakpoints } from "@/app/config/breakpoints";
import UseGetStudent from "@/app/dashboard/admin/studentsManager/components/UseGetStudent";
import { useGetStudent } from "@/app/utilities/storage/student/useGetStudent";
import { useParams, useRouter } from "next/navigation";
import React, { useEffect } from "react";
import { useMediaQuery } from "usehooks-ts";

const Page = () => {
  const params = useParams<{ email: string }>();
  const { student, fetchData, doneFetch } = useGetStudent();
  const isDesktop = useMediaQuery(`(max-width: ${breakpoints.desktop})`);
  const router = useRouter();
  useEffect(() => {
    fetchData(params.email);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

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
