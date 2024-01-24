"use client";
import UseGetStudent from "@/app/developer/list/components/UseGetStudent";
import { useGetStudent } from "@/app/utilities/storage/useGetStudent";
import { useParams } from "next/navigation";
import React, { useEffect } from "react";

const Page = () => {
  const params = useParams<{ email: string }>();
  const { fetchData } = useGetStudent();

  useEffect(() => {
    fetchData(params.email);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div>
      {JSON.stringify(params.email)}
      <UseGetStudent
        selectViewUser={selectViewUser}
        funcCloseAll={funcCloseAll}
      />
    </div>
  );
};

export default Page;
