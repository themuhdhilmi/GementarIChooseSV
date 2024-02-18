"use client";
import HereIsEmpty from "@/app/components/HereIsEmpty";
import { useAddStudentTitle } from "@/app/utilities/storage/student/useAddStudentTitle";
import React, { useEffect, useState } from "react";
import { useUpdateStudentTitle } from "../../../../../utilities/storage/student/useUpdateStudentTitle";

const Title = (props: any) => {
  const [editTeamTitle, setEditTeamTitle] = useState(99);

  const [emailLead, setEmailLead] = useState("");
  const [name, setName] = useState("");
  const [matricTitleId, setMatricTitleId] = useState("");
  const { sendData: sendAddStudentTitle } = useAddStudentTitle();
  const { sendData: sendUpdateStudentTitle } = useUpdateStudentTitle();
  const items = [
    "Item 1",
    "Item 2",
    "Item 3",
    "Item 4",
    "Item 5",
    "Item 6",
    "Item 7",
    "Item 8",
    "Item 9",
    "Item 10",
  ];

  useEffect(() => {
    setEmailLead(props.selectViewUser?.email);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [props.selectViewUser?.email]);

  const sendDataTitle = (e: any) => {
    if (matricTitleId === "") {
      if (e === "None" && name === "None") {
        return;
      }
      const postData = {
        emailLead: emailLead,
        name: name,
      };
      sendAddStudentTitle(postData);
    } else {
      const postData = {
        emailLead: emailLead,
        name: name,
        projectTitleId: matricTitleId,
      };

      sendUpdateStudentTitle(postData);
    }
  };

  return (
    <div className="overflow-x-auto px-5 rounded-lg shadow-lg my-7">
      <div className="badge font-bold">
        Project Title
      </div>
      {/* {props.selectViewUser?.studentInformation?.ProjectTitle?.length === 0 ? ( */}
      {false ? (
        <div className="py-6">
          <HereIsEmpty />
        </div>
      ) : (
        <table className="table ">
          <tbody>
            {/* {props.selectViewUser?.studentInformation?.ProjectTitle.map( */}
            {items.map((item: any, index: number) => {
              let quota =
                props?.selectViewUser?.studentInformation?.titleQuota ??
                props?.selectViewUser?.studentInformation?.SessionYear
                  ?.globalTitleQuota ??
                0;

              if (
                index - 1 >=
                props.selectViewUser?.studentInformation?.ProjectTitle?.length
              ) {
                return <></>;
              }

              if (index >= quota) {
                return <></>;
              }

              if (editTeamTitle === index) {
                return (
                  <tr key={index}>
                    {!props.isDesktop ? <th>{index + 1}</th> : null}
                    <td>
                      <input
                        value={name}
                        // onClick={}
                        onChange={(e: any) => {
                          setName(e.target.value);
                        }}
                        type="text"
                        placeholder="Type here"
                        className="input input-bordered w-full max-w-xs rounded-lg"
                      />
                    </td>
                    {/* <td>
                      <input
                        value={matricTitleId}
                        // onClick={}
                        onChange={(e: any) => {
                          setMatricTitleId(e.target.value);
                        }}
                        type="text"
                        placeholder="Type here"
                        className="input input-bordered w-full max-w-xs"
                      />
                    </td> */}
                    <td>
                      <button
                        onClick={() => {
                          setEditTeamTitle(99);
                          setMatricTitleId(
                            props.selectViewUser?.studentInformation
                              ?.ProjectTitle[index]?.id ?? ""
                          );
                          sendDataTitle(
                            props.selectViewUser?.studentInformation
                              ?.ProjectTitle[index]?.matricTitleId ?? "None"
                          );
                        }}
                        className="btn btn-sm text-white bg-blue-950 rounded-lg mr-1"
                      >
                        Confirm
                      </button>
                      <button
                        onClick={() => setEditTeamTitle(99)}
                        className="btn btn-sm text-white bg-red-700 rounded-lg"
                      >
                        Cancel
                      </button>
                    </td>
                  </tr>
                );
              }

              return (
                <tr key={index}>
                  {!props.isDesktop ? <th>{index + 1}</th> : null}
                  <td>
                    {props.selectViewUser?.studentInformation?.ProjectTitle[
                      index
                    ]?.name ?? "None"}
                  </td>
                  {/* <td>
                    {props.selectViewUser?.studentInformation?.ProjectTitle[index]
                      ?.matricTitleId ?? "None"}
                  </td> */}
                  <td>
                    <button
                      onClick={() => {
                        setEditTeamTitle(index);
                        setName(
                          props.selectViewUser?.studentInformation
                            ?.ProjectTitle[index]?.name ?? "None"
                        );
                        setMatricTitleId(
                          props.selectViewUser?.studentInformation
                            ?.ProjectTitle[index]?.id ?? ""
                        );
                      }}
                      className="btn btn-sm text-white bg-blue-950 rounded-lg"
                    >
                      Edit
                    </button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default Title;
