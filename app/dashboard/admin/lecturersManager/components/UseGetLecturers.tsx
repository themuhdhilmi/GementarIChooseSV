'use client'
import React, { useEffect } from 'react'
import { useGetsessions } from '@/app/utilities/storage/user/useGetSessions'
import { useMediaQuery } from 'usehooks-ts'
import { breakpoints } from '@/app/config/breakpoints'
import { FaEye } from 'react-icons/fa'
import Link from 'next/link'
import HereIsEmpty from '@/app/components/HereIsEmpty'
import { useGetLecturers } from '@/app/utilities/storage/lecturer/useGetLecturers'
import UseDeleteLecturer from './UseDeleteLecturer'
import { useDeleteLecturer } from '@/app/utilities/storage/lecturer/useDeleteLecturer'
import { FaHandPointer } from 'react-icons/fa'
import { BsToggles } from 'react-icons/bs'
import { useSetLecturerAsSupervisor } from '@/app/utilities/storage/lecturer/useSetLecturerAsSupervisor'

const UseGetLecturers = (props: any) => {
  const isDesktop = useMediaQuery(`(max-width: ${breakpoints.desktop})`)
  const isMobileLandscape = useMediaQuery(`(max-width: ${breakpoints.mobileLandscape})`)
  const isMobile = useMediaQuery(`(max-width: ${breakpoints.mobile})`)
  const { lecturers, fetchData } = useGetLecturers()
  const { loading: loadingDelete } = useDeleteLecturer()
  const { data: sessions } = useGetsessions()
  const { data: useSetLecturerAsSupervisorData, sendData } = useSetLecturerAsSupervisor()
  useEffect(() => {
    fetchData(sessions.sessionSelected?.id)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [sessions, loadingDelete, useSetLecturerAsSupervisorData])

  const toggleSv = (email: any) => {
    const postData = {
      lecturerEmail: email,
    }
    sendData(postData)
  }
  return (
    <div>
      <div className="stats shadow"></div>
      <div className="justify-center px-4  border rounded-lg  bg-white shadow-lg">
        <div className="overflow-x-auto">
          <div className="flex flex-row py-5">
            <div className="w-1/2 font-medium ">
              <p className="underline decoration-1">Lecturers Manager</p>
            </div>
            <div className="flex gap-2 py-1 flex-row-reverse w-1/2">
              <button onClick={props.funcOpenAddLecturer} className="btn btn-sm bg-blue-600 rounded-lg hover:bg-blue-800 text-white">
                Add Lecturer
              </button>
            </div>
          </div>
          {lecturers.lecturers?.length === 0 ? (
            <div className="py-6">
              <HereIsEmpty />
            </div>
          ) : (
            <table className="table table-xs">
              <thead>
                <tr>
                  {isMobileLandscape ? '' : <th></th>}
                  {isMobileLandscape ? '' : <th>Name</th>}
                  <th>Email</th>
                  {/* {isMobile ? '' : <th>Completion Status</th>} */}
                </tr>
              </thead>
              <tbody>
                {lecturers.lecturers?.map((item: any, index: number) => {
                  const hasMatchingID = item.SessionYear?.some((session: any) => {
                    return session.id === sessions?.sessionSelected?.id
                  })

                  return (
                    <tr key={index}>
                      {isMobileLandscape ? '' : <th>{index + 1}</th>}
                      <td>{item.User?.name}</td>
                      <td>{item.User?.email}</td>
                      {/* <td>{hasMatchingID ? <div className="badge text-white badge-neutral">SV</div> : <div className="badge text-white badge-error">NO</div>}</td> */}
                      <td>
                        <div className="flex flex-row-reverse w-full">
                          <div className={`${isMobile ? 'flex flex-col max-w-min gap-2' : 'flex flex-row max-w-min gap-2'} `}>
                            {/* <button onClick={() => toggleSv(item.User?.email)} className="btn rounded-lg py-1 btn-sm bg-slate-600 hover:bg-slate-800 text-white">
                              <BsToggles />
                            </button> */}
                            {/* <Link href={`/dashboard/lecturer/studentManage/${item.User?.email}`}>
                              <button className="btn rounded-lg py-1 btn-sm bg-slate-600 hover:bg-slate-800 text-white">
                                <FaHandPointer />
                              </button>
                            </Link>
                            <Link href={`/dashboard/view/lecturer/${item.User?.email}`}>
                              <button className="btn rounded-lg py-1 btn-sm bg-slate-600 hover:bg-slate-800 text-white">
                                <FaEye />
                              </button>
                            </Link> */}
                            <UseDeleteLecturer email={item.User?.email} id={item?.id} />
                          </div>
                        </div>
                      </td>
                    </tr>
                  )
                })}
              </tbody>
              <tfoot>
                <tr>
                  {isMobileLandscape ? '' : <th></th>}
                  {isMobileLandscape ? '' : <th>Name</th>}
                  {isMobile ? '' : <th>Matric Number</th>}
                  {/* <th>Completion Status</th> */}
                  <th></th>
                </tr>
              </tfoot>
            </table>
          )}
        </div>
      </div>
    </div>
  )
}

export default UseGetLecturers
