"use client";
import React, { useEffect, useState } from "react";
import UseGetStudents from "./components/UseGetStudents";
import UseAddStudent from "./components/UseAddStudent";
import { useGetsessions } from "@/app/utilities/storage/useGetSessions";
import BreadCrumbs from "@/app/components/BreadCrumbs";
import { breakpoints } from "@/app/config/breakpoints";
import { useMediaQuery } from "usehooks-ts";
import UseGetStudent from "./components/UseGetStudent";

export enum Drawer {
  NONE,
  ADD,
  ADD_BULK,
  VIEW,
}

const Page = () => {
  const isDesktop = useMediaQuery(`(max-width: ${breakpoints.desktop})`);
  const isMobileLandscape = useMediaQuery(
    `(max-width: ${breakpoints.mobileLandscape})`
  );
  const { sessions, loading, fetchData } = useGetsessions();
  const [selectedSession, setSelectedSession] = useState("");
  const [openDrawer, setOpenDrawer] = useState<Drawer>(Drawer.NONE);

  useEffect(() => {
    setSelectedSession(sessions.sessionSelected?.id);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [sessions]);

  const funcOpenAddStudent = () => {
    setOpenDrawer(Drawer.ADD);
  };

  const funcOpenBulkAddStudent = () => {
    setOpenDrawer(Drawer.ADD_BULK);
  };

  const funcCloseAll = () => {
    setOpenDrawer(Drawer.NONE);
  };

  const funcViewStudent = () => {
    setOpenDrawer(Drawer.VIEW);
  };

  return (
    <div className={`${isDesktop ? "px-6" : "px-24"}`}>
      {openDrawer === Drawer.NONE ? (
        <div className="grid grid-cols-1 gap-4">
          <div className="col-span-3">
            <UseGetStudents
              funcViewStudent={funcViewStudent}
              funcOpenAddStudent={funcOpenAddStudent}
              funcOpenBulkAddStudent={funcOpenBulkAddStudent}
            />
          </div>
        </div>
      ) : (
        ""
      )}

      {openDrawer === Drawer.ADD ? (
        <div
          className={`grid ${
            isDesktop ? "grid-cols-1" : "grid-cols-4 gap-4"
          }  `}
        >
          <div className="col-span-1">
            <UseAddStudent funcCloseAll={funcCloseAll} />
          </div>

          <div className={`${isDesktop ? "" : "col-span-3"} `}>
            <UseGetStudents
              funcViewStudent={funcViewStudent}
              funcOpenAddStudent={funcOpenAddStudent}
              funcOpenBulkAddStudent={funcOpenBulkAddStudent}
            />
          </div>
        </div>
      ) : (
        ""
      )}

      {openDrawer === Drawer.VIEW ? (
        <div>
          <UseGetStudent funcCloseAll={funcCloseAll} />
        </div>
      ) : (
        ""
      )}

      {openDrawer === Drawer.ADD_BULK ? (
        <div className="grid grid-cols-4 gap-4">
          <div className="col-span-1">
            <UseAddStudent funcCloseAll={funcCloseAll} />
          </div>

          <div className="col-span-3">
            <UseGetStudents
              funcViewStudent={funcViewStudent}
              funcOpenAddStudent={funcOpenAddStudent}
              funcOpenBulkAddStudent={funcOpenBulkAddStudent}
            />
          </div>
        </div>
      ) : (
        ""
      )}
    </div>
  );
};

export default Page;
