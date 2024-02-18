"use client";
import React, { useEffect, useState } from "react";
import ToastError from "@/app/components/ToastError";
import { useGetsessions } from "@/app/utilities/storage/user/useGetSessions";
import LoadingLeftBottom from "@/app/components/LoadingLeftBottom";
import { useAddLecturer } from "@/app/utilities/storage/lecturer/useAddLecturer";
import { useGetLecturers } from "@/app/utilities/storage/lecturer/useGetLecturers";

const UseAddLecturer = (props: any) => {
  const {
    sendData,
    success,
    data,
    loading: loadingAddLecturer,
  } = useAddLecturer();
  const { sessions, loading } = useGetsessions();
  const { fetchData } = useGetLecturers();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [track, setTrack] = useState("SOFTWARE");
  const postData = {
    name: name,
    email: email,
    password: email,
    confirmPassword: email,
    track: track,
  };

  useEffect(() => {
    fetchData(sessions.sessionSelected?.id);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [sessions, success]);

  const createNewUser = (event: any) => {
    event.preventDefault();
    sendData(postData);
  };

  if (loading) {
    return <LoadingLeftBottom />;
  }

  if (loadingAddLecturer) {
    return <LoadingLeftBottom />;
  }

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
                <span>Lecturer Creation Successfull</span>
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
                <span>Lecturer Creation Failed</span>
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
              <span className="label-text">Email</span>
            </div>
            <input
              required
              type="text"
              placeholder="hilmi@gementar.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="input input-bordered w-full rounded-lg"
              pattern="^\S{12,}$"
            />
            <div className="label">
              <span className="label-text-alt"></span>
              <span className="label-text-alt">Ex : hilmi@gementar.com</span>
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
            {!loading ? (
              <button
                type="submit"
                className="btn w-full my-5 bg-red-600 rounded-lg hover:bg-red-800 text-white"
              >
                Add Lecturers
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

export default UseAddLecturer;
