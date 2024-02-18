"use client";
import HereIsEmpty from "@/app/components/HereIsEmpty";
import { useAddStudentMember } from "@/app/utilities/storage/student/useAddStudentMember";
import { useUpdateStudentMember } from "@/app/utilities/storage/student/useUpdateStudentMember";
import React, { useEffect, useState } from "react";

const TeamMembers = (props: any) => {
  const [editTeamMember, setEditTeamMember] = useState(99);

  const [emailLead, setEmailLead] = useState("");
  const [name, setName] = useState("");
  const [matricNumber, setMatricNumber] = useState("");
  const { sendData: sendAddStudentMember } = useAddStudentMember();
  const { sendData: sendUpdateStudentMember } = useUpdateStudentMember();
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

  const sendDataMember = (e: any) => {
    if (e === "None") {
      if (name === "None" && matricNumber === "None") {
      } else {
        const postData = {
          emailLead: emailLead,
          name: name,
          matricNumber: matricNumber,
        };
        sendAddStudentMember(postData);
      }
    } else {
      const postData = {
        emailLead: emailLead,
        name: name,
        matricNumber: e,
        newMatricNumber: matricNumber,
      };

      sendUpdateStudentMember(postData);
    }
  };

  return (
    <div className="overflow-x-auto px-5 rounded-lg shadow-lg">
      <div className="badge font-bold">Team Members</div>
      {/* {props.selectViewUser?.studentInformation?.Member?.length === 0 ? ( */}
      {false ? (
        <div className="py-6">
          <HereIsEmpty />
        </div>
      ) : (
        <table className="table ">
          <tbody>
            {/* {props.selectViewUser?.studentInformation?.Member.map( */}
            {items.map((item: any, index: number) => {
              let quota =
                props?.selectViewUser?.studentInformation?.memberQuota ??
                props?.selectViewUser?.studentInformation?.SessionYear
                  ?.globalMemberQuota ??
                0;

              if (
                index - 1 >=
                props.selectViewUser?.studentInformation?.Member?.length
              ) {
                return <></>;
              }

              if (index >= quota) {
                return <></>;
              }

              if (editTeamMember === index) {
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
                    <td>
                      <input
                        value={matricNumber}
                        // onClick={}
                        onChange={(e: any) => {
                          setMatricNumber(e.target.value);
                        }}
                        type="text"
                        placeholder="Type here"
                        className="input input-bordered w-full max-w-xs rounded-lg"
                      />
                    </td>
                    <td>
                      <button
                        onClick={() => {
                          setEditTeamMember(99);
                          sendDataMember(
                            props.selectViewUser?.studentInformation?.Member[
                              index
                            ]?.matricNumber ?? "None"
                          );
                        }}
                        className="btn btn-sm text-white bg-blue-950 rounded-lg mr-1"
                      >
                        Confirm
                      </button>
                      <button
                        onClick={() => setEditTeamMember(99)}
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
                    {props.selectViewUser?.studentInformation?.Member[index]
                      ?.name ?? "None"}
                  </td>
                  <td>
                    {props.selectViewUser?.studentInformation?.Member[index]
                      ?.matricNumber ?? "None"}
                  </td>
                  <td>
                    <button
                      onClick={() => {
                        setEditTeamMember(index);
                        setName(
                          props.selectViewUser?.studentInformation?.Member[
                            index
                          ]?.name ?? "None"
                        );
                        setMatricNumber(
                          props.selectViewUser?.studentInformation?.Member[
                            index
                          ]?.matricNumber ?? "None"
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

export default TeamMembers;
