"use client";
import { useAddStudent } from "@/app/utilities/storage/useAddStudent";
import React, { useEffect, useState } from "react";
import InfoBadge from "./components/InfoBadge";
import { RoleEnum } from "@/app/config/interface";
import ToastError from "@/app/components/ToastError";
import { ToastContainer, toast } from "react-toastify";
import { useGetsessions } from "@/app/utilities/storage/useGetSessions";
import { useGetStudents } from "@/app/utilities/storage/useGetStudents";
import { breakpoints } from "@/app/config/breakpoints";
import { useMediaQuery } from "usehooks-ts";

const UseAddStudent = (props : any) => {
  const isDesktop = useMediaQuery(`(max-width: ${breakpoints.desktop})`);
  const isMobileLandscape = useMediaQuery(
    `(max-width: ${breakpoints.mobileLandscape})`
  );
  const { sendData, success, data } = useAddStudent();
  const { sessions, loading, fetchData } = useGetsessions();
  const { fetchData: fetchDataStudents } = useGetStudents();
  const [name, setName] = useState("");
  const [matricNumber, setMatricNumber] = useState("");
  const [selectedSession, setSelectedSession] = useState("");
  const [track, setTrack] = useState("SOFTWARE");
  const postData = {
    name: name,
    email: matricNumber + "@mail.com",
    matricNumber: matricNumber,
    password: matricNumber,
    confirmPassword: matricNumber,
    sessionYearID: selectedSession,
    track: track,
  };

  useEffect(() => {
    fetchData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    setSelectedSession(sessions.sessionSelected?.id);
    fetchDataStudents();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [sessions, success]);

  const createNewUser = (event: any) => {
    event.preventDefault();
    sendData(postData);
  };

  return (
    <div>
      <div className=" bg-white rounded-lg px-5 shadow-lg">
        <div className="py-5">
        <button onClick={props.funcCloseAll} className="btn btn-circle">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
        </button>
        </div>

        <ToastError errors={data} />
        <div className="flex justify-center">
          <form onSubmit={createNewUser} className=" w-full">
            {success === "SUCCESS" ? (
              <div role="alert" className="alert alert-info">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  className="stroke-current shrink-0 w-6 h-6"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                  ></path>
                </svg>
                <span>Student Creation Successfull</span>
              </div>
            ) : (
              ""
            )}
            {success === "ERROR" ? (
              <div role="alert" className="alert alert-error">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="stroke-current shrink-0 h-6 w-6"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
                <span>Student Creation Failed</span>
              </div>
            ) : (
              ""
            )}
            <div className="label">
              <span className="label-text">Name</span>
            </div>
            <input
              required
              type="text"
              placeholder="Hilmi Azmi"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="input input-bordered w-full rounded-lg"
              pattern=".{4,}$"
            />
            <div className="label">
              <span className="label-text-alt"></span>
              <span className="label-text-alt">Minimum 4 characters</span>
            </div>
            <div className="label">
              <span className="label-text">Matric Number</span>
            </div>
            <input
              required
              type="text"
              placeholder="01DDT20F1122"
              value={matricNumber}
              onChange={(e) => setMatricNumber(e.target.value)}
              className="input input-bordered w-full rounded-lg"
              pattern="^\S{12,}$"
            />
            <div className="label">
              <span className="label-text-alt"></span>
              <span className="label-text-alt">Ex : 01DDT20F1122</span>
            </div>
            <div className="label">
              <span className="label-text">Track</span>
            </div>
            <select
              value={track}
              onChange={(e) => setTrack(e.target.value)}
              className="select select-bordered w-full rounded-lg"
            >
              <option value={"SOFTWARE"} selected>
                SOFTWARE
              </option>
              <option value={"SECURITY"}>SECURITY</option>
              <option value={"NETWORK"}>NETWORK</option>
            </select>
            <div className="label">
              <span className="label-text">Session</span>
            </div>
            <select
              value={selectedSession}
              onChange={(e) => setSelectedSession(e.target.value)}
              className="select select-bordered w-full rounded-lg"
            >
              {loading
                ? ""
                : sessions.sessionsList?.map((item: any, index: number) => {
                    if (item.isSelected) {
                      return (
                        <option value={item.id} key={index} selected>
                          SESI {item.number} {item.yearOne}/{item.yearOne}
                        </option>
                      );
                    } else {
                      return (
                        <option value={item.id} key={index}>
                          SESI {item.number} {item.yearOne}/{item.yearOne}
                        </option>
                      );
                    }
                  })}
            </select>
            {!loading ? (
              <button type="submit" className="btn rounded-lg w-full my-5 bg-red-600 rounded-lg hover:bg-red-800 text-white">
                Add Students
              </button>
            ) : (
              <button className="btn w-full my-5 btn-disabled">
                <span className="loading loading-spinner"></span>
                loading
              </button>
            )}
          </form>
        </div>
      </div>
    </div>
  );
};

export default UseAddStudent;
