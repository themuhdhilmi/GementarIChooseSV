"use client";
import { useGetStudents } from "@/app/utilities/storage/useGetStudents";
import { useCartStore } from "@/app/utilities/storage/zustand";
import { Button } from "flowbite-react";
import React, { useEffect } from "react";
import { json } from "stream/consumers";
import InfoBadge from "./components/InfoBadge";
import { useGetsessions } from "@/app/utilities/storage/useGetSessions";
import { useMediaQuery } from "usehooks-ts";
import { breakpoints } from "@/app/config/breakpoints";
import { FaEye } from "react-icons/fa";
import { BsPencilSquare } from "react-icons/bs";
import { RiDeleteBinLine } from "react-icons/ri";
const UseGetStudents = (props: any) => {
  const isDesktop = useMediaQuery(`(max-width: ${breakpoints.desktop})`);
  const isMobileLandscape = useMediaQuery(
    `(max-width: ${breakpoints.mobileLandscape})`
  );
  const isMobile = useMediaQuery(`(max-width: ${breakpoints.mobile})`);
  const { fetchData } = useGetStudents();
  const { sessions, loading, fetchData: fetchDataSession } = useGetsessions();
  const { students } = useGetStudents();
  useEffect(() => {
    // Example: Fetch data when the component mounts
    fetchData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

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
                      <button className="">
                        <div className="px-2">
                          <FaEye />
                        </div>
                      </button>
                      <button className="px-2">
                        <div>
                          <BsPencilSquare />
                        </div>
                      </button>
                      <button className="text-red-600">
                        <div className="px-2">
                          <RiDeleteBinLine />
                        </div>
                      </button>
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
        </div>
      </div>
    </div>
  );
};

export default UseGetStudents;
