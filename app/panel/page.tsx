"use client";
import { useSession } from "next-auth/react";
import React, { useState } from "react";
import Loading from "../components/Loading";
import { RoleEnum } from "../config/interface";
import Student from "./student/Student";
import Admin from "./admin/Admin";
import Lecturer from "./lecturer/Lecturer";

const Page = () => {
  const session = useSession();
  const [roleSelection, setRoleSelection] = useState<RoleEnum>(
    RoleEnum.STUDENT
  );

  function checkIfAvailable() {
    //   if (session.status === "unauthenticated") {
    //     router.push("/api/auth/signin");
    //   }

    if (session.status === "unauthenticated") {
      return false;
    }
    return true;
  }

  if (session.status === "loading") {
    return <Loading />; // You can also render a loading indicator here if needed
  }

  return (
    <div>
      {roleSelection === RoleEnum.ADMIN ? <Admin/> : ""}
      {roleSelection === RoleEnum.STUDENT ? <Student/> : ""}
      {roleSelection === RoleEnum.LECTURER ? <Lecturer/> : ""}
    </div>
  );
};

export default Page;
