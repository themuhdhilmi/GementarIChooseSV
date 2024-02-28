'use client'
import { useResponseApplication } from '@/app/utilities/storage/lecturer/useResponseApplication'
import { useStudentApplySupervisor } from '@/app/utilities/storage/student/useStudentApplySupervisor'
import { useGetsessions } from '@/app/utilities/storage/user/useGetSessions'
import { useUserInformation } from '@/app/utilities/storage/user/useUserInformation'
import { Alert } from 'flowbite-react'
import Link from 'next/link'
import React, { useEffect, useState } from 'react'
import { HiInformationCircle } from 'react-icons/hi'

const NotifyUser = () => {
  const { role, email } = useUserInformation()
  const { data: sessionData } = useGetsessions()
  const { data: responseApplicationData } = useResponseApplication()
  const {data : studentApplySupervisorData} = useStudentApplySupervisor();

  const [isAlertHaveStudentRequest, setIsAlertHaveStudentRequest] = useState(false)
  const [isAlertStudentNotFinish, setIsAlertStudentNotFinish] = useState(false)

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
  }, [role, sessionData, responseApplicationData])

  useEffect(() => {

    setIsAlertStudentNotFinish(false)
    const fetchData = async () => {
      if (role === 'STUDENT') {
        const response = await fetch(`/api/v1/AUTH/manageUser/student?email=${email}&type=single`)
        const data = await response.json()
        if (response.ok) {
          console.log(JSON.stringify(data.student.studentInformation.lecturerAcceptedStudent))

          if (data?.student?.studentInformation?.lecturerAcceptedStudent === 'DECLINED') {
            setIsAlertStudentNotFinish(true)
          }

          if (data?.student?.studentInformation?.lecturerAcceptedStudent === 'NONE') {
            setIsAlertStudentNotFinish(true)
          }
        } else {
        }
      }
    }

    fetchData()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [role, sessionData, responseApplicationData, studentApplySupervisorData])

  if (isAlertHaveStudentRequest) {
    return (
      <>
        <Alert color="failure" icon={HiInformationCircle}>
          <span className="font-medium">Alert!</span> You have pending student approval.
          <Link className="text-blue-700" href={'/dashboard/lecturer/studentManage/' + email}>
            Click here to continue...
          </Link>
        </Alert>
      </>
    )
  }

  if (isAlertStudentNotFinish) {
    return (
      <>
        <Alert color="failure" icon={HiInformationCircle}>
          <span className="font-medium">Alert!</span> Please complete your supervisor selection for at least [3/4] progress.
          <Link className="text-blue-700" href={'/dashboard/view/student/' + email}>
            Click here to continue...
          </Link>
        </Alert>
      </>
    )
  }

  return <></>
}

export default NotifyUser
