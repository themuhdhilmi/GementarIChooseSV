"use client";
import React, { useEffect, useState } from "react";
import Tab from "./components/Tab";
import Admin from "./mainPage/Admin";
import Student from "./mainPage/Student";
import Lecturer from "./mainPage/Lecturer";
import Global from "./mainPage/Global";

export enum PageAdmin {
  Admin,
  Student,
  Lecturer,
  Global,
}

const Page = () => {
  const [pageAdmin, setPageAdmin] = useState(PageAdmin.Admin);

  return (
    <div className="p-5">
      <Tab setPageAdmin={setPageAdmin} pageAdmin={pageAdmin} />
      <div className="p-5"></div>

      {pageAdmin === PageAdmin.Admin ? <Admin /> : null}
      {pageAdmin === PageAdmin.Student ? <Student /> : null}
      {pageAdmin === PageAdmin.Lecturer ? <Lecturer /> : null}
      {pageAdmin === PageAdmin.Global ? <Global /> : null}
    </div>
  );
};

export default Page;
