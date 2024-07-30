'use client'
import React from 'react'
import Image from 'next/image'
import { Button, Timeline } from 'flowbite-react'
import { HiArrowNarrowRight } from 'react-icons/hi'

const SideInfo = (props: any) => {
  return (
    <div className={`${!props.isDesktop ? 'w-1/4 ' : 'w-full '} px-1`}>
      <div className="flex flex-row bg-red-600 rounded-lg shadow-lg">
        <div>
          <div className="avatar">
            <div className="w-12 my-2 mx-2 mask mask-hexagon">
              <Image alt="" width={500} height={500} src="/images/profile.jpg" />
            </div>
          </div>
        </div>
        <div className="my-3 w-full ">
          <p className="text-sm font-bold text-white">{props.selectViewUser?.name.toUpperCase()}</p>
          <p className="text-sm text-slate-100">{props.selectViewUser?.studentInformation?.matricNumber}</p>
          <p className="text-sm text-slate-100">{props.selectViewUser?.email}</p>
        </div>
      </div>
      <div className="font-extrabold text-red-600 my-2  py-2 text-center rounded-lg shadow-2xl">{props.selectViewUser?.studentInformation?.Track}</div>
      <div className="text-center mt-6 font-extrabold">
        <p>STATUS</p>

        {props.isSupervisorDeclined ? (
          <p className="badge bg-yellow-500 text-white">2/4</p>
        ) : props.isSupervisorAccepted ? (
          <p className="badge bg-green-600 text-white">4/4 ✓</p>
        ) : props.isSupervisorRequested ? (
          <p className="badge bg-yellow-500 text-white">3/4</p>
        ) : props.isTitleCompleted ? (
          <p className="badge bg-red-600 text-white">2/4</p>
        ) : props.isMemberCompleted ? (
          <p className="badge bg-red-600 text-white">1/4</p>
        ) : (
          <p className="badge bg-red-600 text-white">0/4</p>
        )}
      </div>

      <div className="text-center mt-2 font-extrabold">
        <p>Team Member Quota</p>
        <p className="text-red-600">{props.selectViewUser?.studentInformation?.memberQuota ?? 'USING GLOBAL'}</p>
      </div>

      <div className="text-center mt-2 font-extrabold">
        <p>Title Quota</p>
        <p className="text-red-600">{props.selectViewUser?.studentInformation?.titleQuota ?? 'USING GLOBAL'}</p>
      </div>

      <div className="text-center mt-2 font-extrabold">
        <p>Supervisor</p>
        <p className="text-red-600">{props.selectViewUser?.studentInformation?.LecturerInformation?.User?.name ?? ''}</p>

        {/* {props?.selectViewUser?.studentInformation?.lecturerAcceptedStudent ===
        "ACCEPTED" ? (
          <p className="text-green-600">
            {props?.selectViewUser?.studentInformation?.lecturerAcceptedStudent}
          </p>
        ) : (
          <p className="text-red-600">
            {props?.selectViewUser?.studentInformation?.lecturerAcceptedStudent}
          </p>
        )} */}
        {props?.selectViewUser?.studentInformation?.lecturerAcceptedStudent === 'REQUESTED' ? <p className="text-red-700">[Waiting for approval]</p> : ''}
        {props?.selectViewUser?.studentInformation?.lecturerAcceptedStudent === 'DECLINED' ? <p className="text-red-700">[Approval declined by supervisor]</p> : ''}
        {props?.selectViewUser?.studentInformation?.lecturerAcceptedStudent === 'ACCEPTED' ? <p className="text-green-800">[Approved]</p> : ''}
      </div>
    </div>
  )
}

export default SideInfo
