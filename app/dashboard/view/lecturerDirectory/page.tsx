'use client'
import { breakpoints } from '@/app/config/breakpoints'
import { ToggleSwitch } from 'flowbite-react'
import React, { useEffect, useState } from 'react'
import { useMediaQuery } from 'usehooks-ts'
import LecturerCard from './components/LecturerCard'
import { useGetLecturers } from '@/app/utilities/storage/lecturer/useGetLecturers'
import { useGetsessions } from '@/app/utilities/storage/user/useGetSessions'

const Page = () => {
  const isDesktop = useMediaQuery(`(max-width: ${breakpoints.desktop})`)

  const { fetchData, lecturers: dataLecturer } = useGetLecturers()
  const { data: dataSession } = useGetsessions()

  useEffect(() => {
    if (dataSession) {
      fetchData(dataSession?.sessionSelected?.id)
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dataSession])

  const [isToggleSV, setIsToggleSV] = useState(false)

  const onToggleSV = () => {
    setIsToggleSV(!isToggleSV)
  }
  //   item?.SessionYear[0]?.isSelected

  return (
    <div className={`${!isDesktop ? 'px-24' : 'px-0'}`}>
      <div className="stats shadow"></div>
      <div className="justify-center px-4  border rounded-lg  bg-white shadow-lg">
        <div className="overflow-x-auto">
          <div className="flex flex-row py-5">
            <div className="w-1/2 font-medium ">
              <p className="underline decoration-1">Staff Directory</p>
            </div>
          </div>
        </div>
        <div className="flex flex-row-reverse w-full my-3">
          {/* <ToggleSwitch checked={isToggleSV} label="Filter SV" onChange={onToggleSV} /> */}
          <label className="label cursor-pointer">
            <span className="label-tex pr-5">Filter Supervisor</span>
            <input type="checkbox" className="toggle rounded-lg" onChange={onToggleSV} checked={isToggleSV} />
          </label>
        </div>

        <div>
          {isToggleSV === true ? (
            <div className="flex flex-wrap justify-center px-32" style={{ minWidth: '288px' }}>
              {dataLecturer?.lecturers?.map((item: any, index: number) => {
                if (item?.SessionYear[0]?.isSelected) {
                  return (
                    <div key={index}>
                      <LecturerCard item={item} />
                    </div>
                  )
                }
              })}
            </div>
          ) : (
            <div className="flex flex-wrap justify-center px-32" style={{ minWidth: '288px' }}>
              {dataLecturer?.lecturers?.map((item: any, index: number) => {
                return (
                  <div key={index}>
                    <LecturerCard item={item} />
                  </div>
                )
              })}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default Page
