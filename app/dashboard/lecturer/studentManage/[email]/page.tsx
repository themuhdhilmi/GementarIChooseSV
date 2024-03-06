'use client'
import { breakpoints } from '@/app/config/breakpoints'
import { useParams } from 'next/navigation'
import React, { useEffect } from 'react'
import { useMediaQuery } from 'usehooks-ts'
import StudentRequest from './components/StudentRequest'
import { useGetLecturer } from '@/app/utilities/storage/lecturer/useGetLecturer'
import { useGetsessions } from '@/app/utilities/storage/user/useGetSessions'
import { useResponseApplication } from '@/app/utilities/storage/lecturer/useResponseApplication'
import StudentSelected from './components/StudentSelected'
import StudentDeclined from './components/StudentDeclined'

const Page = () => {
  const params = useParams<{
    email: string
  }>()
  const isDesktop = useMediaQuery(`(max-width: ${breakpoints.desktop})`)
  const { fetchData, data: lecturerData } = useGetLecturer()
  const { data } = useResponseApplication()
  const { data: sessionData } = useGetsessions()

  useEffect(() => {
    fetchData(decodeURIComponent(params.email))
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data])

  // const acceptedCount = supervisor.StudentInformation.filter((student: any) => student.lecturerAcceptedStudent === 'ACCEPTED').length

  const requestForSupervisor = lecturerData?.lecturer?.LecturerInformation?.StudentInformation.filter((student: any) => student.lecturerAcceptedStudent === 'REQUESTED').filter((student: any) => student.sessionYearId === sessionData?.sessionSelected?.id)
  const SupervisorDecline = lecturerData?.lecturer?.LecturerInformation?.StudentInformation.filter((student: any) => student.lecturerAcceptedStudent === 'DECLINED').filter((student: any) => student.sessionYearId === sessionData?.sessionSelected?.id)
  const SupervisorAccepted = lecturerData?.lecturer?.LecturerInformation?.StudentInformation.filter((student: any) => student.lecturerAcceptedStudent === 'ACCEPTED').filter((student: any) => student.sessionYearId === sessionData?.sessionSelected?.id)

  return (
    <div className={`${!isDesktop ? 'px-24' : 'px-0'}`}>
      <div className="stats shadow"></div>
      <div className="justify-center px-4  border rounded-lg  bg-white shadow-lg">
        <div className="overflow-x-auto">
          <div className="flex flex-row py-5">
            <div className="w-full font-medium ">
              <p className="underline decoration-1">Student Manager [{decodeURIComponent(params.email)}]</p>
              <div className="w-full">
                {requestForSupervisor?.map((item: any, index: number) => {
                  return (
                    <>
                      <StudentRequest student={item} />
                    </>
                  )
                })}
                {SupervisorDecline?.map((item: any, index: number) => {
                  return <>{/* <StudentDeclined student={item} /> */}</>
                })}
                <div className="py-9 px-2 bg-slate-50 rounded-lg round my-5">
                  <p>
                    Approved Student({SupervisorAccepted?.length ?? 0}/{lecturerData?.lecturer?.LecturerInformation?.supervisorQuota ?? sessionData?.sessionSelected?.globalSupervisorQuota})
                  </p>
                  {SupervisorAccepted?.map((item: any, index: number) => {
                    return (
                      <>
                        <StudentSelected student={item} />
                      </>
                    )
                  })}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Page
