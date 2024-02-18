"use client";
import { useUpdateStudent } from "@/app/utilities/storage/student/useUpdateStudent";
import React, { useEffect, useState } from "react";

const EditQuota = (props: any) => {
  const { sendData, success } = useUpdateStudent();
  const [memberQuota, setMemberQuota] = useState(99);
  const [titleQuota, setTitleQuota] = useState(99);

  const sendEditQuotaMember = () => {
    let memberQuotaFilter = 0;

    if (memberQuota === 99) {
      memberQuotaFilter = 99;
    } else {
      memberQuotaFilter = memberQuota;
    }

    const postData = {
      id: props?.selectViewUser?.id,
      name: null,
      email: null,
      matricNumber: null,
      password: null,
      track: null,
      sessionYearID: null,
      memberQuota:
        parseInt(memberQuotaFilter.toString()) !== 99
          ? parseInt(memberQuotaFilter.toString())
          : null,
      titleQuota: parseInt(
        props?.selectViewUser?.studentInformation?.titleQuota,
      ),
    };

    sendData(postData);
  };

  const sendEditQuotaTitle = () => {
    let titleQuotaFilter = 0;

    if (titleQuota === 99) {
      titleQuotaFilter = 99;
    } else {
      titleQuotaFilter = titleQuota;
    }

    const postData = {
      id: props?.selectViewUser?.id,
      name: null,
      email: null,
      matricNumber: null,
      password: null,
      track: null,
      sessionYearID: null,
      memberQuota: parseInt(
        props?.selectViewUser?.studentInformation?.memberQuota,
      ),
      titleQuota:
        parseInt(titleQuotaFilter.toString()) !== 99
          ? parseInt(titleQuotaFilter.toString())
          : null,
    };

    sendData(postData);
  };

  return (
    <div className="overflow-x-auto rounded-lg shadow-lg mb-2">
      <div className="badge font-bold w-full rounded-t-lg bg-red-700 text-white">
        Edit Quota
      </div>
      <div className="mx-10 my-4">
        <div className="join w-full ">
          <div className="w-full">
            <select
              value={memberQuota}
              onChange={(e: any) => {
                setMemberQuota(e.target.value);
              }}
              className="select w-full max-w-full select-bordered  rounded-l-lg"
            >
              <option value={99}>Set Member Quota Global</option>
              <option value={1}>1</option>
              <option value={2}>2</option>
              <option value={3}>3</option>
              <option value={4}>4</option>
              <option value={5}>5</option>
              <option value={6}>6</option>
              <option value={7}>7</option>
              <option value={8}>8</option>
              <option value={9}>9</option>
              <option value={10}>10</option>
            </select>
          </div>
          <button
            onClick={() => sendEditQuotaMember()}
            className="btn join-item text-white bg-blue-950  rounded-lg"
          >
            Select
          </button>
        </div>
      </div>
      <div className="mx-10 my-4">
        <div className="join w-full ">
          <div className="w-full">
            <select
              value={titleQuota}
              onChange={(e: any) => {
                setTitleQuota(e.target.value);
              }}
              className="select w-full max-w-full select-bordered  rounded-l-lg"
            >
              <option value={99}>Set Project Title Quota Global</option>
              <option value={1}>1</option>
              <option value={2}>2</option>
              <option value={3}>3</option>
              <option value={4}>4</option>
              <option value={5}>5</option>
              <option value={6}>6</option>
              <option value={7}>7</option>
              <option value={8}>8</option>
              <option value={9}>9</option>
              <option value={10}>10</option>
            </select>
          </div>
          <button
            onClick={() => sendEditQuotaTitle()}
            className="btn join-item text-white bg-blue-950  rounded-lg"
          >
            Select
          </button>
        </div>
      </div>
    </div>
  );
};

export default EditQuota;
