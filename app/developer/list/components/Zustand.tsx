"use client";
import { useStudents } from "@/app/utilities/storage/useStudents";
import { useCartStore } from "@/app/utilities/storage/zustand";
import { Button } from "flowbite-react";
import React, { useEffect } from "react";
import { json } from "stream/consumers";
import Student from "./Student";

const Zustand = () => {
  const { fetchData } = useStudents();
  const { students } = useStudents();
  useEffect(() => {
    // Example: Fetch data when the component mounts
    fetchData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div>
      <div className="mockup-browser border border-base-300">
        <div className="mockup-browser-toolbar">
          <div className="input border border-base-300">Students</div>
        </div>
        <div className="justify-center px-4 py-16 border-t border-base-300">
          {/* {JSON.stringify(students)} */}
          <div className="flex justify-center px-4 py-16 border-t border-base-300">
            <div className="badge badge-accent">page : {students.page}</div>
            <div className="badge badge-accent">
              pageSize : {students.pageSize}
            </div>
            <div className="badge badge-accent">
              totalPage : {students.totalPages}
            </div>
            <div className="badge badge-accent">
              studentsCount : {students.studentsCount}
            </div>
            <div className="badge badge-accent">page : {students.page}</div>
          </div>

          {students.students?.map((item: any, index: number) => {
            return (
              <div className="grid grid-cols-2 gap-4" key={index}>
                <div className="bg-slate-50">Name : {item.name}</div>
                <div className="bg-slate-50">Email : {item.email}</div>
                <div >
                  Matric : {item.studentInformation.matricNumber}
                </div>
                <div >
                  Member Quota : {item.studentInformation.memberQuota ?? "null"}
                </div>
                <div className="bg-slate-50">
                  Title Quota : {item.studentInformation.titleQuota ?? "null"}
                </div>
                <div className="bg-slate-50">
                  Supervisor Status :
                  {item.studentInformation.lecturerAcceptedStudent}
                </div>
                <div >
                  Session Year : {item.studentInformation.SessionYear.number}
                  {item.studentInformation.SessionYear.yearOne}/
                  {item.studentInformation.SessionYear.yearTwo} |
                  globalMemberQuota :
                  {item.studentInformation.SessionYear.globalMemberQuota} |
                  globalTitleQuota :
                  {item.studentInformation.SessionYear.globalTitleQuota} |
                  globalSupervisorQuota :
                  {item.studentInformation.SessionYear.globalSupervisorQuota}
                </div>
                <div>
                  Selected Supervisor :
                  {item.studentInformation.LecturerInformation.User.name} |
                  {item.studentInformation.LecturerInformation.User.email} |
                  {item.studentInformation.LecturerInformation.Track}
                </div>

                <div className="overflow-x-auto col-span-2">
                  <table className="table table-xs">
                    <thead>
                      <tr>
                        <th></th>
                        <th>Name</th>
                        <th>No Matric</th>
                      </tr>
                    </thead>
                    <tbody>
                      {item.studentInformation.Member.map(
                        (item: any, index: number) => {
                          return (
                            // <div key={index}>
                            //   <div>Name : {item.name}</div>
                            //   <div>Name : {item.matricNumber}</div>
                            // </div>

                            <tr key={index}>
                              <th>{index + 1}</th>
                              <td>{item.name}</td>
                              <td>{item.matricNumber}</td>
                            </tr>
                          );
                        }
                      )}
                    </tbody>
                  </table>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default Zustand;
