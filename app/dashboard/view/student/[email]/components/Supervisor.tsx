"use client";
import HereIsEmpty from "@/app/components/HereIsEmpty";
import { useGetLecturersPerSession } from "@/app/utilities/storage/lecturer/useGetLecturersPerSession";
import { useGetStudent } from "@/app/utilities/storage/student/useGetStudent";
import { useStudentApplySupervisor } from "@/app/utilities/storage/student/useStudentApplySupervisor";
import React, { useEffect, useState } from "react";

const Supervisor = (props: any) => {
  const { fetchData, lecturers } = useGetLecturersPerSession();
  const { sendData, loading } = useStudentApplySupervisor();
  const [selectedValue, setSelectedValue] = useState();
  // const { fetchData : fetchDataStudent } = useGetStudent();

  useEffect(() => {
    fetchData(props.selectViewUser?.studentInformation.sessionYearId);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [props.selectViewUser?.studentInformation.sessionYearId, loading]);

  const postData = {
    email: props?.selectViewUser?.email,
    lecturerEmail: selectedValue,
  };

  return (
    <div className="overflow-x-auto rounded-lg shadow-lg mb-2">
      <div className="badge font-bold w-full rounded-t-lg bg-blue-950 text-white">
        Supervisor
      </div>
      <div className="flex flex-col border mx-10 my-4 py-5 rounded-lg text-center">
        <div>Your Selected Lecturer</div>
        {/* {JSON.stringify(lecturers?.session?.Supervisor)} */}
        <div>
          {
            props?.selectViewUser?.studentInformation?.LecturerInformation?.User
              ?.name
          }
        </div>
        <div>
          {props?.selectViewUser?.studentInformation?.lecturerAcceptedStudent}
        </div>
      </div>
      {(lecturers?.session?.Supervisor?.length ?? 0) === 0 ? (
        <div className="py-6">
          <HereIsEmpty />
        </div>
      ) : (
        <div>
          {props?.selectViewUser?.studentInformation
            ?.lecturerAcceptedStudent === "ACCEPTED" ? (
            ""
          ) : (
            <div className="mx-10 my-4">
              {props.canEdit ? (
                <div className="join w-full ">
                  <div className="w-full">
                    <select
                      value={selectedValue}
                      onChange={(e: any) => {
                        setSelectedValue(e.target.value);
                      }}
                      className="select w-full max-w-full select-bordered  rounded-l-lg"
                    >
                      <option>Choose supervisor...</option>
                      {lecturers.session.Supervisor.map(
                        (item: any, index: number) => {
                          if (
                            item?.acceptedStudentsCount >=
                            (item?.supervisorQuota ??
                              lecturers?.session?.globalSupervisorQuota)
                          ) {
                            return <></>;
                          }

                          return (
                            <option value={item.User.email} key={index}>
                              {item.User.name} 
                              {/* | accepted :{" "}
                              {item?.acceptedStudentsCount}/
                              {item?.supervisorQuota ??
                                lecturers?.session?.globalSupervisorQuota} */}
                            </option>
                          );
                        }
                      )}
                    </select>
                  </div>
                  <button
                    onClick={() => sendData(postData)}
                    className="btn join-item text-white bg-blue-950  rounded-lg"
                  >
                    Select
                  </button>
                </div>
              ) : (
                ""
              )}
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default Supervisor;
