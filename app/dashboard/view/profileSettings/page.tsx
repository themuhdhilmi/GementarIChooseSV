'use client'
import { breakpoints } from '@/app/config/breakpoints'
import { useUpdatePassword } from '@/app/utilities/storage/user/useUpdatePassword'
import { useUserInformation } from '@/app/utilities/storage/user/useUserInformation'
import React, { useState } from 'react'
import { useMediaQuery } from 'usehooks-ts'

const Page = () => {
  const isDesktop = useMediaQuery(`(max-width: ${breakpoints.desktop})`)
  const [currentPassword, setCurrentPassword] = useState('')
  const [newPassword, setNewPassword] = useState('')
  const [newPasswordConfirm, setNewPasswordConfirm] = useState('')
  const { data } = useUserInformation()
  const { sendData } = useUpdatePassword()

  const postData = {
    id: data?.user?.id,
    password: newPassword,
  }

  const resetPassword = (event: any) => {
    event.preventDefault()

    if (newPassword === '') {
      return null
    }

    sendData(postData)
    setCurrentPassword('')
    setNewPassword('')
    setNewPasswordConfirm('')
  }

  return (
    <div className={`${!isDesktop ? 'px-24' : 'px-0'}`}>
      <div className="stats shadow"></div>
      <div className="justify-center px-4  border rounded-lg  bg-white shadow-lg">
        <div className="overflow-x-auto">
          <div className="flex flex-row py-5">
            <div className="w-full font-medium ">
              <p className="underline decoration-1">Profile Settings</p>
              <form onSubmit={resetPassword}>
                <div className="w-full text-black mt-3 mb-8 form-control">
                  <label className="w-full ">
                    <div className="label">
                      <span className="label-text text-black">Reset Password</span>
                    </div>
                    <div className="join w-full">
                      <input
                        required
                        value={currentPassword}
                        onChange={(e) => {
                          setCurrentPassword(e.target.value)
                        }}
                        type="password"
                        placeholder="current password"
                        className="input w-full rounded-lg input-bordered join-item text-black"
                      />
                    </div>
                  </label>
                </div>

                <div className="w-full text-black  my-3 ">
                  <label className="w-full ">
                    <div className="join w-full">
                      <input
                        required
                        value={newPassword}
                        onChange={(e) => {
                          setNewPassword(e.target.value)
                        }}
                        type="password"
                        placeholder="new password"
                        className="input w-full rounded-lg input-bordered join-item text-black"
                      />
                    </div>
                  </label>
                </div>

                <div className="w-full text-black  my-3 ">
                  <label className="w-full ">
                    <div className="join w-full">
                      <input
                        required
                        value={newPasswordConfirm}
                        onChange={(e) => {
                          setNewPasswordConfirm(e.target.value)
                        }}
                        type="password"
                        placeholder="confirm new password"
                        className="input w-full rounded-lg input-bordered join-item text-black"
                      />
                    </div>
                  </label>
                </div>

                <button type="submit" className="btn w-full my-5 bg-red-600 rounded-lg hover:bg-red-800 text-white">
                  Change Password
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Page
