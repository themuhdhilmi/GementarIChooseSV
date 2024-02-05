"use client";
import HereIsEmpty from "@/app/components/HereIsEmpty";
import { breakpoints } from "@/app/config/breakpoints";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import { useMediaQuery } from "usehooks-ts";

const UseGetStudent = (props: any) => {
  const isDesktop = useMediaQuery(`(max-width: ${breakpoints.desktop})`);
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
            </div>
          </div>
          <div
            className={`flex ${
              !isDesktop ? "flex-row" : "flex-col"
            } flex-wrap `}
          >
            <div className={`${!isDesktop ? "w-1/4 " : "w-full "} px-1`}>
              <div className="flex flex-row bg-red-600 rounded-lg shadow-lg">
                <div>
                  <div className="avatar">
                    <div className="w-12 my-2 mx-2 mask mask-hexagon">
                      <Image
                        alt=""
                        width={500}
                        height={500}
                        src="/images/profile.jpg"
                      />
                    </div>
                  </div>
                </div>
                <div className="my-3 w-full ">
                  <p className="text-sm font-bold text-white">
                    {props.selectViewUser?.name}
                  </p>
                  <p className="text-sm text-slate-100">
                    {props.selectViewUser?.studentInformation?.matricNumber}
                  </p>
                  <p className="text-sm text-slate-100">
                    {props.selectViewUser?.email}
                  </p>
                </div>
              </div>
              <div className="font-extrabold text-red-600 my-2  py-2 text-center rounded-lg shadow-2xl">
                {props.selectViewUser?.studentInformation?.Track}
              </div>
              <div className="text-center mt-6 font-extrabold">
                <p>STATUS</p>
                <p className="badge bg-red-600 text-white">INCOMPLETE (X)</p>
              </div>

              <div className="text-center mt-2 font-extrabold">
                <p>Team Member Quota</p>
                <p className="text-red-600">
                  {props.selectViewUser?.studentInformation?.memberQuota ??
                    "USING GLOBAL"}
                </p>
              </div>

              <div className="text-center mt-2 font-extrabold">
                <p>Title Quota</p>
                <p className="text-red-600">
                  {props.selectViewUser?.studentInformation?.titleQuota ??
                    "USING GLOBAL"}
                </p>
              </div>

              <div className="text-center mt-2 font-extrabold">
                <p>Supervisor</p>
                <p className="text-red-600">
                  {props.selectViewUser?.studentInformation?.LecturerInformation
                    ?.User?.name ?? "NONE"}
                </p>
              </div>
            </div>

            <div className={`${!isDesktop ? "w-3/4 " : "w-full "}  px-4 `}>
              <div className="overflow-x-auto px-5 rounded-lg shadow-lg">
                <div className="badge font-bold">Team Members</div>

                {props.selectViewUser?.studentInformation?.Member?.length ===
                0 ? (
                  <div className="py-6">
                    <HereIsEmpty />
                  </div>
                ) : (
                  <table className="table ">
                    <tbody>
                      {props.selectViewUser?.studentInformation?.Member.map(
                        (item: any, index: number) => {
                          return (
                            <tr key={index}>
                              {!isDesktop ? <th>{index + 1}</th> : null}
                              <td>{item.name}</td>
                              <td>{item.matricNumber}</td>
                            </tr>
                          );
                        },
                      )}
                    </tbody>
                  </table>
                )}
              </div>
              <div className="overflow-x-auto px-5 my-5 rounded-lg shadow-lg">
                <div className="badge font-bold">Title</div>

                {props.selectViewUser?.studentInformation?.Member?.length ===
                0 ? (
                  <div className="py-6">
                    <HereIsEmpty />
                  </div>
                ) : (
                  <table className="table ">
                    <tbody>
                      {props.selectViewUser?.studentInformation?.Member.map(
                        (item: any, index: number) => {
                          return (
                            <tr key={index}>
                              <th>{index + 1} </th>
                              <td>Title One</td>
                              <td>
                                {" "}
                                <Link
                                  href={"/test"}
                                  className="text-blue-600 text-sm"
                                >
                                  Poster 1 (X)
                                </Link>
                              </td>
                            </tr>
                          );
                        },
                      )}
                    </tbody>
                  </table>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UseGetStudent;
