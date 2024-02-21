'use client'
import { useUpdateStudent } from '@/app/utilities/storage/student/useUpdateStudent'
import React, { useState } from 'react'

const ResetPassword = (props: any) => {
  const { sendData, success } = useUpdateStudent()
  const [password, setPassword] = useState('')

  const sendResetPasswordMember = () => {
    const postData = {
      id: props?.selectViewUser?.id,
      name: null,
      email: null,
      matricNumber: null,
      password: password,
      track: null,
      sessionYearID: null,
      memberQuota: parseInt(props?.selectViewUser?.studentInformation?.memberQuota),
      titleQuota: parseInt(props?.selectViewUser?.studentInformation?.titleQuota),
    }

    sendData(postData)
  }

  return (
    <div className="overflow-x-auto rounded-lg shadow-lg mb-2">
      <div className="badge font-bold w-full rounded-t-lg bg-red-700 text-white">Reset Password</div>
      <div className="mx-10 my-4">
        <div className="join w-full ">
          <div className="w-full">
            <input
              onChange={(e: any) => {
                setPassword(e.target.value)
              }}
              type="text"
              placeholder="password"
              className="input input-bordered  w-full rounded-l-lg"
            />
          </div>
          <button onClick={() => sendResetPasswordMember()} className="btn join-item text-white bg-blue-950  rounded-lg">
            Set Password
          </button>
        </div>
      </div>
    </div>
  )
}

export default ResetPassword
