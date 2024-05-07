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
import { Button, Checkbox, Label, Modal, TextInput, Tooltip } from 'flowbite-react'
import { useUpdateLecturer } from '@/app/utilities/storage/lecturer/useUpdateLecturer'
import LoadingLeftBottom from '@/app/(mainLayout)/components/LoadingLeftBottom'
import { FileUploader } from 'react-drag-drop-files'
import { useAddUserProfilePicture } from '@/app/utilities/storage/user/useAddUserProfilePicture'
import { useUploadFile } from '@/app/utilities/storage/storage/useUploadFile'

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
  const { data: updateLecturer } = useUpdateLecturer()
  const { data : AddUserProfilePicture} = useAddUserProfilePicture()


  const isDesktop = useMediaQuery(`(max-width: ${breakpoints.desktop})`)

  useEffect(() => {
    fetchData()
    getCurrentLecturerData(decodeURIComponent(params.email))
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [role, addLecturerInfo, deleteLecturerInfo, updateLecturerInfo, addLecturerInfoTag, deleteLecturerInfoTag, updateLecturer,AddUserProfilePicture])

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
      <LoadingLeftBottom />
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
                    <EditProfileModal lecturerData={lecturerData} />
                  </li>
                ) : (
                  ''
                )}
                {role === 'ADMIN' ? (
                  <li>
                    <ResetPassword lecturerData={lecturerData} />
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
            {canEdit ? <EditProfileModal lecturerData={lecturerData} /> : ''}
            {role === 'ADMIN' ? <ResetPassword lecturerData={lecturerData} /> : ''}

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

function EditProfileModal(props: any) {
  const [openModal, setOpenModal] = useState(false)
  const [email, setEmail] = useState(props?.lecturerData?.lecturer?.email)
  const [name, setName] = useState(props?.lecturerData?.lecturer?.name || '') // Added default value
  const [track, setTrack] = useState(props?.lecturerData?.lecturer?.track || '') // Added default value
  const [expertise, setExpertise] = useState(props?.lecturerData?.lecturer?.LecturerInformation?.Track || '') // Added default value
  const [scopusID, setScopusID] = useState(props?.lecturerData?.lecturer?.LecturerInformation?.scopusID || '') // Added default value
  const [wosID, setWosID] = useState(props?.lecturerData?.lecturer?.LecturerInformation?.wosID || '') // Added default value
  const [googleScholar, setGoogleScholar] = useState(props?.lecturerData?.lecturer?.LecturerInformation?.googleID || '') // Added default value
  const { data : AddUserProfilePicture, sendData : sendProfilePictureData} = useAddUserProfilePicture()
  const { data : uploadFileData , sendData : sendUploadFileToServer } = useUploadFile()

  const { sendData } = useUpdateLecturer()

  function isEmpty(obj : any) {
    for(let key in obj) {
        if(obj.hasOwnProperty(key))
            return false;
    }
    return true;
}

  useEffect(() => {
    if(isEmpty(uploadFileData)) return

    const postData = {
      userID : props?.lecturerData?.lecturer?.id,
      path : uploadFileData.path
    }

    sendProfilePictureData(postData)

  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [uploadFileData])
  

  useEffect(() => {
    setEmail(props?.lecturerData?.lecturer?.email || '')
    setName(props?.lecturerData?.lecturer?.name || '') // Added default value
    setTrack(props?.lecturerData?.lecturer?.LecturerInformation?.Track || '') // Added default value
    setExpertise(props?.lecturerData?.lecturer?.LecturerInformation?.expertise || '') // Added default value
    setScopusID(props?.lecturerData?.lecturer?.LecturerInformation?.scopusID || '') // Added default value
    setWosID(props?.lecturerData?.lecturer?.LecturerInformation?.wosID || '') // Added default value
    setGoogleScholar(props?.lecturerData?.lecturer?.LecturerInformation?.googleID || '') // Added default value
  }, [props?.lecturerData])

  const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setName(e.target.value)
  }

  const handleTrackChange = (e: any) => {
    setTrack(e)
  }

  const handleExpertiseChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setExpertise(e.target.value)
  }

  const handleScopusIDChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setScopusID(e.target.value)
  }

  const handleWosIDChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setWosID(e.target.value)
  }

  const handleGoogleScholarChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setGoogleScholar(e.target.value)
  }

  const submit = (e: any) => {
    e.preventDefault()

    const postData = {
      id: props?.lecturerData?.lecturer?.id,
      name: name,
      email: email,
      password: null,
      track: track === '' ? null : track,
      supervisorQuota: null,
      googleID: googleScholar === '' ? null : googleScholar,
      wosID: wosID === '' ? null : wosID,
      scopusID: scopusID === '' ? null : scopusID,
      expertise: expertise === '' ? null : expertise,
    }

    sendData(postData)
  }

  return (
    <>
      <button className="btn mr-2" onClick={() => setOpenModal(true)}>
        EDIT
      </button>
      <Modal dismissible show={openModal} onClose={() => setOpenModal(false)}>
        <Modal.Header>Edit Profile</Modal.Header>
        <Modal.Body>
          <div className="mb-2 block">
            <Label value="Upload Profile Image" />
          </div>
          <FileUploader handleChange={(file: any) => {
            sendUploadFileToServer(file)
          }} name="file" types={['PNG','JPG']} />
          <form className="flex w-full flex-col gap-4" onSubmit={submit}>
            <div>
              <div className="mb-2 block">
                <Label htmlFor="small" value="Email" />
              </div>
              <TextInput id="small" value={email} onChange={(e) => setEmail(e.target.value)} type="text" sizing="sm" required />
            </div>
            <div>
              <div className="mb-2 block">
                <Label htmlFor="small" value="Name" />
              </div>
              <TextInput id="small" value={name} onChange={handleNameChange} type="text" sizing="sm" required />
            </div>
            <div>
              <div className="mb-2 block">
                <Label htmlFor="small" value="Track" />
              </div>
              {/* <TextInput id="small" value={track} onChange={handleTrackChange} type="text" sizing="sm" /> */}
              <select value={track} onChange={(e) => handleTrackChange(e.target.value)} className="select select-bordered w-full rounded-lg">
                <option value={'SOFTWARE'} selected={track === 'SOFTWARE' ? true : false}>
                  SOFTWARE
                </option>
                <option value={'SECURITY'} selected={track === 'SECURITY' ? true : false}>
                  SECURITY
                </option>
                <option value={'NETWORK'} selected={track === 'NETWORK' ? true : false}>
                  NETWORK
                </option>
              </select>
            </div>
            <div>
              <div className="mb-2 block">
                <Label htmlFor="small" value="Expertise (Optional)" />
              </div>
              <TextInput className="w-full" id="small" value={expertise} onChange={handleExpertiseChange} type="text" sizing="sm" placeholder="Game Development,Web Development,Software Development" />
            </div>
            <div>
              <div className="mb-2 block">
                <Label htmlFor="small" value="Scopus ID (Optional)" />
              </div>
              <TextInput id="small" value={scopusID} onChange={handleScopusIDChange} type="text" sizing="sm" placeholder="https://www.scopus.com/authid/detail.uri?authorId=XXXXXXX" />
            </div>
            <div>
              <div className="mb-2 block">
                <Label htmlFor="small" value="Wos ID (Optional)" />
              </div>
              <TextInput id="small" value={wosID} onChange={handleWosIDChange} type="text" sizing="sm" placeholder="https://www.webofscience.com/wos/author/rid/XXXXXXXXX" />
            </div>
            <div>
              <div className="mb-2 block">
                <Label htmlFor="small" value="Google Scholar (Optional)" />
              </div>
              <TextInput id="small" value={googleScholar} onChange={handleGoogleScholarChange} type="text" sizing="sm" placeholder="https://scholar.google.com/citations?user=&hl=en&user=XXXXXXXXXX" />
            </div>
            <Button type="submit">Submit</Button>
          </form>
        </Modal.Body>
      </Modal>
    </>
  )
}

function ResetPassword(props: any) {
  const [openModal, setOpenModal] = useState(false)
  const [password, setPassword] = useState('')
  const { sendData } = useUpdateLecturer()

  function onCloseModal() {
    setOpenModal(false)
    setPassword('')
  }

  const submit = () => {
    if (password === '') return

    const postData = {
      id: props?.lecturerData?.lecturer?.id,
      name: props?.lecturerData?.lecturer?.name,
      email: props?.lecturerData?.lecturer?.email,
      password: password,
      track: props?.lecturerData?.lecturer?.LecturerInformation?.Track,
      supervisorQuota: null,
      googleID: props?.lecturerData?.lecturer?.LecturerInformation?.googleID,
      wosID: props?.lecturerData?.lecturer?.LecturerInformation?.wosID,
      scopusID: props?.lecturerData?.lecturer?.LecturerInformation?.scopusID,
      expertise: props?.lecturerData?.lecturer?.LecturerInformation?.expertise,
    }

    sendData(postData)
  }

  return (
    <>
      <button className="btn mr-2" onClick={() => setOpenModal(true)}>
        RESET PASSWORD
      </button>
      <Modal show={openModal} size="md" onClose={onCloseModal} popup>
        <Modal.Header />
        <Modal.Body>
          <div className="space-y-6">
            <h3 className="text-xl font-medium text-gray-900 dark:text-white">Reset Password</h3>
            <div>
              <div className="mb-2 block">
                <Label htmlFor="password" value="New Password" />
              </div>
              <TextInput value={password} onChange={(e) => setPassword(e.target.value)} id="password" type="password" required />
            </div>
            <div className="w-full">
              <Button onClick={submit}>Reset Password</Button>
            </div>
          </div>
        </Modal.Body>
      </Modal>
    </>
  )
}
