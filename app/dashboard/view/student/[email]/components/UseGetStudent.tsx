"use client";
import { breakpoints } from "@/app/config/breakpoints";
import React, { useEffect, useState } from "react";
import { useMediaQuery } from "usehooks-ts";
import TeamMembers from "./TeamMembers";
import Title from "./Title";
import SideInfo from "./SideInfo";
import Supervisor from "./Supervisor";
import EditQuota from "./EditQuota";

const UseGetStudent = (props: any) => {
  const isDesktop = useMediaQuery(`(max-width: ${breakpoints.desktop})`);
  const [editQuota, setEditQuota] = useState(false);
  return (
    <div className="mb-5 ">
      <div className="stats shadow"></div>
      <div className="justify-center px-4 pb-10  border rounded-lg  bg-white shadow-lg">
        <div className="overflow-x-auto">
          <div className="flex flex-row py-5">
            <div className="w-1/2 font-medium ">
              <p className="underline decoration-1">Students Info</p>
            </div>
            <div className="flex gap-2 py-1 flex-row-reverse w-1/2">
              <button
                onClick={props.funcCloseAll}
                className="btn btn-sm bg-red-600 rounded-lg hover:bg-red-800 text-white"
              >
                CLOSE
              </button>
              {props.canEditAdmin ? (
                <button
                  onClick={() => setEditQuota(!editQuota)}
                  className="btn btn-sm  rounded-lg text-white bg-blue-950"
                >
                  Reset Password
                </button>
              ) : (
                ""
              )}
              {props.canEditAdmin ? (
                <button
                  onClick={() => setEditQuota(!editQuota)}
                  className="btn btn-sm  rounded-lg text-white bg-blue-950"
                >
                  Edit Quota
                </button>
              ) : (
                ""
              )}
            </div>
          </div>
          <div
            className={`flex ${
              !isDesktop ? "flex-row" : "flex-col"
            } flex-wrap `}
          >
            <SideInfo
              selectViewUser={props.selectViewUser}
              isDesktop={isDesktop}
              canEdit={props.canEdit}
            />
            <div className={`${!isDesktop ? "w-3/4 " : "w-full "}  px-4 `}>
              {editQuota ? (
                <EditQuota
                  selectViewUser={props.selectViewUser}
                  isDesktop={isDesktop}
                  canEdit={props.canEdit}
                />
              ) : (
                ""
              )}

              <TeamMembers
                selectViewUser={props.selectViewUser}
                isDesktop={isDesktop}
                canEdit={props.canEdit}
              />
              <Title
                selectViewUser={props.selectViewUser}
                isDesktop={isDesktop}
                canEdit={props.canEdit}
              />
              <Supervisor
                selectViewUser={props.selectViewUser}
                isDesktop={isDesktop}
                canEdit={props.canEdit}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UseGetStudent;
