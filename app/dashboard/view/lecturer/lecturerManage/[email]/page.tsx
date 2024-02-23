'use client'
import { breakpoints } from '@/app/config/breakpoints'
import { useGetLecturer } from '@/app/utilities/storage/lecturer/useGetLecturer'
import { useParams } from 'next/navigation'
import React, { useEffect } from 'react'
import { useMediaQuery } from 'usehooks-ts'

const Page = () => {
  const params = useParams<{
    email: string
  }>()
  const isDesktop = useMediaQuery(`(max-width: ${breakpoints.desktop})`)
  const { fetchData, data } = useGetLecturer()

  useEffect(() => {
    fetchData(decodeURIComponent(params.email))
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <div className={`${!isDesktop ? 'px-24' : 'px-0'}`}>
      <div className="stats shadow"></div>
      <div className="justify-center px-4  border rounded-lg  bg-white shadow-lg">
        <div className="overflow-x-auto">
          <div className="flex flex-row py-5">
            <div className="w-1/2 font-medium ">
              <p className="underline decoration-1">Lecturer Manager</p>
              {JSON.stringify(data.lecturer?.LecturerInformation)}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Page
