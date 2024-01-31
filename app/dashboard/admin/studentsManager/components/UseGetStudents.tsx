"use client";
import { useGetStudents } from "@/app/utilities/storage/useGetStudents";
import React, { useEffect } from "react";
import { useGetsessions } from "@/app/utilities/storage/useGetSessions";
import { useMediaQuery } from "usehooks-ts";
import { breakpoints } from "@/app/config/breakpoints";
import { FaEye } from "react-icons/fa";
import UseDeleteStudent from "./UseDeleteStudent";
import Link from "next/link";
import HereIsEmpty from "@/app/components/HereIsEmpty";
const UseGetStudents = (props: any) => {
  const isDesktop = useMediaQuery(`(max-width: ${breakpoints.desktop})`);
  const isMobileLandscape = useMediaQuery(
    `(max-width: ${breakpoints.mobileLandscape})`,
  );
  const isMobile = useMediaQuery(`(max-width: ${breakpoints.mobile})`);
  const { students, fetchData } = useGetStudents();
  const { sessions } = useGetsessions();

  useEffect(() => {
    fetchData(sessions.sessionSelected?.id);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [sessions, students]);

  return (
    <div>
      <div className="stats shadow"></div>
      <div className="justify-center px-4  border rounded-lg  bg-white shadow-lg">
        <div className="overflow-x-auto">
          <div className="flex flex-row py-5">
            <div className="w-1/2 font-medium ">
              <p className="underline decoration-1">Students Manager</p>
            </div>
            <div className="flex gap-2 py-1 flex-row-reverse w-1/2">
              <button
                onClick={props.funcOpenAddStudent}
                className="btn btn-sm bg-red-600 rounded-lg hover:bg-red-800 text-white"
              >
                Add Student
              </button>
            </div>
          </div>
          {students.students?.length === 0 ? (
            <div className="py-6">
              <HereIsEmpty />
            </div>
          ) : (
            <table className="table table-xs">
              <thead>
                <tr>
                  {isMobileLandscape ? "" : <th></th>}
                  {isMobileLandscape ? "" : <th>Name</th>}
                  <th>Matric Number</th>
                  {isMobile ? "" : <th>Completion Status</th>}
                  <th></th>
                </tr>
              </thead>
              <tbody>
                {students.students?.map((item: any, index: number) => {
                  return (
                    <tr key={index}>
                      {isMobileLandscape ? "" : <th>{index + 1}</th>}
                      {isMobileLandscape ? "" : <td>{item.name}</td>}

                      <td>{item.studentInformation?.matricNumber}</td>
                      {isMobile ? (
                        ""
                      ) : (
                        <td>
                          <div className="badge text-white badge-error">
                            INCOMPLETE
                          </div>
                        </td>
                      )}

                      <td>
                        {/* <button
                        onClick={() => {
                          props.funcViewStudent();
                          props.setSelectViewUser(item);
                        }}
                        className=""
                      >
                        <div className="px-2">
                          <FaEye />
                        </div>
                      </button> */}
                        <Link href={`/dashboard/view/student/${item?.email}`}>
                          <div className="py-1">
                            <FaEye />
                          </div>
                        </Link>
                        <UseDeleteStudent
                          email={item?.email}
                          id={item?.studentInformation?.id}
                        />
                      </td>
                    </tr>
                  );
                })}
              </tbody>
              <tfoot>
                <tr>
                  {isMobileLandscape ? "" : <th></th>}
                  {isMobileLandscape ? "" : <th>Name</th>}
                  {isMobile ? "" : <th>Matric Number</th>}
                  <th>Completion Status</th>
                  <th></th>
                </tr>
              </tfoot>
            </table>
          )}
        </div>
      </div>
    </div>
  );
};

export default UseGetStudents;
