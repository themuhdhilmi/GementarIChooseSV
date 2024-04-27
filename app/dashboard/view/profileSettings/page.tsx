'use client'
import { breakpoints } from '@/app/config/breakpoints'
import { useGetLecturer } from '@/app/utilities/storage/lecturer/useGetLecturer'
import { useGetStudent } from '@/app/utilities/storage/student/useGetStudent'
import { useUpdateEmail } from '@/app/utilities/storage/user/profile/useUpdateEmail'
import { useUpdatePassword } from '@/app/utilities/storage/user/useUpdatePassword'
import { useUserInformation } from '@/app/utilities/storage/user/useUserInformation'
import React, { useEffect, useState } from 'react'
import { useMediaQuery } from 'usehooks-ts'
import { useUpdateLecturerID } from '../../../utilities/storage/user/profile/useUpdateLecturerID'
import { useUpdateMatricNumber } from '@/app/utilities/storage/user/profile/useUpdateMatricNumber'
import { useUpdateMobile } from '@/app/utilities/storage/user/profile/useUpdateMobile'

const Page = () => {
  const isDesktop = useMediaQuery(`(max-width: ${breakpoints.desktop})`)
  const [currentPassword, setCurrentPassword] = useState('')
  const [newPassword, setNewPassword] = useState('')
  const [newPasswordConfirm, setNewPasswordConfirm] = useState('')

  const [email, setEmail] = useState('')
  const [id, setId] = useState('')
  const [matricNumber, setMatricNumber] = useState('')
  const [mobile, setMobile] = useState('')

  const { data } = useUserInformation()
  const { sendData } = useUpdatePassword()
  const { data: userData } = useUserInformation()
  const { fetchData: fetchStudent, data: studentData } = useGetStudent()
  const { fetchData: fetchLecturer, data: lecturerData } = useGetLecturer()

  const { sendData: fetchDatauseUpdateEmail } = useUpdateEmail()
  const { sendData: fetchDatauseUpdateLecturerID } = useUpdateLecturerID()
  const { sendData: fetchDatuseUpdateMatricNumbera } = useUpdateMatricNumber()
  const { sendData: fetchDatauseUpdateMobile } = useUpdateMobile()

  const postData = {
    id: data?.user?.id,
    password: newPassword,
  }

  useEffect(() => {
    if (userData?.user?.role === 'STUDENT') {
      fetchStudent(userData?.user?.email)
    }

    if (userData?.user?.role === 'LECTURER') {
      fetchLecturer(userData?.user?.email)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [userData])

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

  const updateEmail = () => {
    if (email === '') return

    const postData = {
      email: userData?.user?.email,
      newEmail: email,
    }
    fetchDatauseUpdateEmail(postData)
  }

  const updateMatricNumber = () => {
    if (matricNumber === '') return
    const postData = {
      email: userData?.user?.email,
      newMatricNumber: matricNumber,
    }
    fetchDatuseUpdateMatricNumbera(postData)
  }

  const updateLecturerID = () => {
    if (id === '') return
    const postData = {
      email: userData?.user?.email,
      newId: id,
    }
    fetchDatauseUpdateLecturerID(postData)
  }

  const updateMobile = () => {
    if (mobile === '') return
    const postData = {
      email: userData?.user?.email,
      newMobileNumber: mobile,
    }
    fetchDatauseUpdateMobile(postData)
  }

  return (
    <div className={`${!isDesktop ? 'px-24' : 'px-0'}`}>
      <div className="stats shadow"></div>
      <div className="justify-center px-4  border rounded-lg  bg-white shadow-lg">
        <div className="overflow-x-auto">
          <div className="flex flex-row py-5">
            <div className="w-full font-medium ">
              <p className="underline decoration-1">Profile Settings</p>
              <form className="border rounded-lg p-5">
                <div className="w-full text-black mt-3 mb-8 form-control">
                  <label className="w-full ">
                    <div className="label">
                      <span className="label-text text-black">Email</span>
                    </div>

                    <div className="join w-full">
                      <input className="input input-bordered join-item w-full" value={email} onChange={(e) => setEmail(e.target.value)} placeholder={userData?.user?.email} />
                      <button className="btn join-item bg-blue-700 text-white hover:bg-blue-900 rounded-lg" onClick={() => updateEmail()}>
                        Change
                      </button>
                    </div>

                    {userData?.user?.role === 'STUDENT' ? (
                      <div className="label">
                        <span className="label-text text-black mt-5">Matric Number</span>
                      </div>
                    ) : (
                      ''
                    )}

                    {userData?.user?.role === 'STUDENT' ? (
                      <div className="join w-full">
                        <input className="input input-bordered join-item w-full" value={matricNumber} onChange={(e) => setMatricNumber(e.target.value)} placeholder={studentData?.student?.studentInformation?.matricNumber} />
                        <button className="btn join-item bg-blue-700 text-white hover:bg-blue-900  rounded-lg" onClick={() => updateMatricNumber()}>
                          Change
                        </button>
                      </div>
                    ) : (
                      ''
                    )}

                    {userData?.user?.role === 'LECTURER' ? (
                      <div className="label">
                        <span className="label-text text-black mt-5">ID</span>
                      </div>
                    ) : (
                      ''
                    )}

                    {userData?.user?.role === 'LECTURER' ? (
                      <div className="join w-full">
                        <input className="input input-bordered join-item w-full" value={id} onChange={(e) => setId(e.target.value)} placeholder={userData?.user?.noID} />
                        <button className="btn join-item bg-blue-700 text-white hover:bg-blue-900 rounded-lg" onClick={() => updateLecturerID()}>
                          Change
                        </button>
                      </div>
                    ) : (
                      ''
                    )}

                    <div className="label">
                      <span className="label-text text-black mt-5">Mobile Number</span>
                    </div>
                    <div className="join w-full">
                      <input className="input input-bordered join-item w-full " value={mobile} onChange={(e) => setMobile(e.target.value)} placeholder={userData?.user?.mobileNumber ?? 'No phone number'} />
                      <button className="btn join-item bg-blue-700 text-white  hover:bg-blue-900 rounded-lg" onClick={() => updateMobile()}>Change</button>
                    </div>
                  </label>
                </div>
              </form>

              <form className="border rounded-lg p-5" onSubmit={resetPassword}>
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

                <button type="submit" className="btn w-full my-5 bg-blue-600 rounded-lg hover:bg-blue-800 text-white">
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
