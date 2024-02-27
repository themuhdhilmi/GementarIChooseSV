'use client'
import { useResponseApplication } from '@/app/utilities/storage/lecturer/useResponseApplication'
import { useGetsessions } from '@/app/utilities/storage/user/useGetSessions'
import { useUserInformation } from '@/app/utilities/storage/user/useUserInformation'
import { Alert } from 'flowbite-react'
import Link from 'next/link'
import React, { useEffect, useState } from 'react'
import { HiInformationCircle } from 'react-icons/hi'

const NotifyUser = () => {
  const { role, email } = useUserInformation()
  const { data: sessionData } = useGetsessions()
  const { data : responseApplicationData} = useResponseApplication()

  const [isAlertHaveStudentRequest, setIsAlertHaveStudentRequest] = useState(false)

  useEffect(() => {
    const fetchData = async () => {
      if (role === 'LECTURER') {
        const response = await fetch(`/api/v1/AUTH/manageUser/lecturer?email=${email}&selection=EMAIL`)
        const data = await response.json()
        if (response.ok) {
          const requestForSupervisor = await data?.lecturer?.LecturerInformation?.StudentInformation.filter((student: any) => student.lecturerAcceptedStudent === 'REQUESTED').filter((student: any) => student.sessionYearId === sessionData?.sessionSelected?.id)
            console.log(data?.lecturer?.LecturerInformation?.StudentInformation)
          if (requestForSupervisor?.length > 0) {
            setIsAlertHaveStudentRequest(true)
          } else {
            setIsAlertHaveStudentRequest(false)
          }
        } else {
        }
      }
    }

    fetchData()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [role, sessionData,responseApplicationData])

  if (isAlertHaveStudentRequest) {
    return (
      <>
        <Alert color="failure" icon={HiInformationCircle}>
          <span className="font-medium">Alert!</span> You have pending student approval.<Link className='text-blue-700' href={'/dashboard/lecturer/studentManage/' + email}>Click here to continue...</Link>
        </Alert>
      </>
    )
  }

  if (role === 'STUDENT') {
  }

  return <></>
}

export default NotifyUser
