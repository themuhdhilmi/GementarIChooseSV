/* eslint-disable @next/next/no-img-element */
'use client'
import { breakpoints } from '@/app/config/breakpoints'
import { useParams } from 'next/navigation'
import React, { useEffect, useState } from 'react'
import { useMediaQuery } from 'usehooks-ts'
import LeftSection from './components/LeftSection'
import RightSection from './components/RightSection'
import MainSection from './components/MainSection'
import { useSession } from 'next-auth/react'
import { useUserInformation } from '@/app/utilities/storage/user/useUserInformation'
import { useGetLecturer } from '@/app/utilities/storage/lecturer/useGetLecturer'
import { useAddLecturerInfo } from '@/app/utilities/storage/lecturer/information/useAddLecturerInfo'
import { ToastContainer } from 'react-toastify'
import { useDeleteLecturerInfo } from '@/app/utilities/storage/lecturer/information/useDeleteLecturerInfo'
import { useUpdateLecturerInfo } from '@/app/utilities/storage/lecturer/information/useUpdateLecturerInfo'
import { useAddLecturerInfoTag } from '@/app/utilities/storage/lecturer/information/useAddLecturerInfoTag'
import { useDeleteLecturerInfoTag } from '../../../../../utilities/storage/lecturer/information/useDeleteLecturerInfoTag'
import { FaHome } from 'react-icons/fa'
import { Button, Label, Modal, TextInput } from 'flowbite-react'

const Page = () => {
  const params = useParams<{
    email: string
  }>()

  const session = useSession()
  const { fetchData, name, role, email } = useUserInformation()
  const { fetchData: getCurrentLecturerData, data: lecturerData } = useGetLecturer()
  const { data: addLecturerInfo } = useAddLecturerInfo()
  const { data: deleteLecturerInfo } = useDeleteLecturerInfo()
  const { data: updateLecturerInfo } = useUpdateLecturerInfo()
  const { data: addLecturerInfoTag } = useAddLecturerInfoTag()
  const { data: deleteLecturerInfoTag } = useDeleteLecturerInfoTag()

  const isDesktop = useMediaQuery(`(max-width: ${breakpoints.desktop})`)

  useEffect(() => {
    fetchData()
    getCurrentLecturerData(decodeURIComponent(params.email))
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [role, addLecturerInfo, deleteLecturerInfo, updateLecturerInfo, addLecturerInfoTag, deleteLecturerInfoTag])

  let canEdit = false

  if (role === 'LECTURER') {
    if (email === decodeURIComponent(params.email)) {
      canEdit = true
    }
  }

  if (role === 'ADMIN') {
    canEdit = true
  }

  return (
    <div>
      <div className="navbar bg-red-700 text-neutral-content">
        <div className="navbar-start">
          {isDesktop ? (
            <div className="dropdown">
              <div tabIndex={0} role="button" className="btn btn-ghost btn-circle">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h7" />
                </svg>
              </div>
              <ul tabIndex={0} className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52 text-black">
                <li>
                  <a href="/dashboard/view/lecturerDirectory" className="btn">
                    Staff Directory List
                  </a>
                </li>
                {canEdit ? (
                  <li>
                    <EditProfileModal />
                  </li>
                ) : (
                  ''
                )}
              </ul>
            </div>
          ) : (
            ''
          )}

          <a className="btn btn-ghost text-xl">JTMK STAFF DIRECTORY</a>
        </div>
        <div className="navbar-center hidden lg:flex"></div>
        {isDesktop ? (
          ''
        ) : (
          <div className="navbar-end">
            {canEdit ? <EditProfileModal /> : ''}

            <a href="/dashboard/view/lecturerDirectory" className="btn">
              <FaHome />
            </a>
          </div>
        )}
      </div>
      <ToastContainer position="top-right" autoClose={5000} hideProgressBar={false} newestOnTop={false} closeOnClick rtl={false} pauseOnFocusLoss draggable pauseOnHover theme="light" />

      {isDesktop ? (
        <div className="justify-center pt-2 px-4">
          <div className="grid grid-rows-3 justify-center">
            <div className="w-full flex flex-row justify-center">
              <LeftSection canEdit={canEdit} lecturerData={lecturerData} />
            </div>
            <div className="w-full flex flex-row justify-center px-6 mt-9">
              <MainSection canEdit={canEdit} lecturerData={lecturerData} />
            </div>
            <div className="w-full flex flex-row justify-center">{/* <RightSection lecturerData={lecturerData} /> */}</div>
          </div>
        </div>
      ) : (
        <div className="justify-center pt-2 px-4">
          <div className="flex justify-center">
            <div>
              <LeftSection canEdit={canEdit} lecturerData={lecturerData} />
            </div>
            <div className="grow min-w-96">
              <MainSection canEdit={canEdit} lecturerData={lecturerData} />
            </div>
            <div>
              <RightSection canEdit={canEdit} lecturerData={lecturerData} />
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default Page

function EditProfileModal() {
  const [openModal, setOpenModal] = useState(false)

  return (
    <>
      <button className="btn mr-2" onClick={() => setOpenModal(true)}>
        EDIT
      </button>
      <Modal dismissible show={openModal} onClose={() => setOpenModal(false)}>
        <Modal.Header>Edit Profile</Modal.Header>
        <Modal.Body>
          <form className="flex w-full flex-col gap-4">
            <div>
              <div className="mb-2 block">
                <Label htmlFor="small" value="Email" />
              </div>
              <TextInput id="small" type="text" sizing="sm" required />
            </div>
            <div>
              <div className="mb-2 block">
                <Label htmlFor="small" value="Name" />
              </div>
              <TextInput id="small" type="text" sizing="sm" required />
            </div>
            <div>
              <div className="mb-2 block">
                <Label htmlFor="small" value="Track" />
              </div>
              <TextInput id="small" type="text" sizing="sm" />
            </div>
            <div>
              <div className="mb-2 block">
                <Label htmlFor="small" value="Expertise (Optional)" />
              </div>
              <TextInput id="small" type="text" sizing="sm" placeholder="Game Development,Web Development,Software Development" />
            </div>
            <div>
              <div className="mb-2 block">
                <Label htmlFor="small" value="Scopus ID (Optional)" />
              </div>
              <TextInput id="small" type="text" sizing="sm" placeholder="https://www.scopus.com/authid/detail.uri?authorId=XXXXXXX" />
            </div>
            <div>
              <div className="mb-2 block">
                <Label htmlFor="small" value="Wos ID (Optional)" />
              </div>
              <TextInput id="small" type="text" sizing="sm" placeholder="https://www.webofscience.com/wos/author/rid/XXXXXXXXX" />
            </div>
            <div>
              <div className="mb-2 block">
                <Label htmlFor="small" value="Google Scholar (Optional)" />
              </div>
              <TextInput id="small" type="text" sizing="sm" placeholder="https://scholar.google.com/citations?user=&hl=en&user=XXXXXXXXXX" />
            </div>
            <Button type="submit">Submit</Button>
          </form>
        </Modal.Body>
        <Modal.Footer>
          {/* <Button onClick={() => setOpenModal(false)}>I accept</Button> */}
          <Button color="gray" onClick={() => setOpenModal(false)}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  )
}
