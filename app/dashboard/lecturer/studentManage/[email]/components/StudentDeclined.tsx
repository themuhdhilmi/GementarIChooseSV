'use client'
import { Banner } from 'flowbite-react'
import React from 'react'
import Link from 'next/link'
import { BiSolidMessageAltError } from 'react-icons/bi'
const StudentDeclined = (props: any) => {
  return (
    <Banner className="w-full my-1">
      <div className="flex w-full flex-col justify-between rounded-lg border border-gray-100 bg-white p-4 shadow-sm dark:border-gray-600 dark:bg-gray-700 md:flex-row ">
        <div className="mb-3 mr-4 flex flex-col items-start md:mb-0 md:flex-row md:items-center">
          <span className="self-center whitespace-nowrap text-lg font-semibold dark:text-white md:pr-6 flex flex-row">
            <div className="">
              <BiSolidMessageAltError />
            </div>
            {props?.student?.matricNumber}
          </span>
          You has declined this student...
          <Link className="text-blue-800" href={'/dashboard/view/student/' + props?.student?.User?.email}>
            Click to view profile
          </Link>
        </div>
        <div className="flex gap-1 flex-shrink-0 items-center">
          {/* <Banner.CollapseButton color="gray" className="border-0 bg-transparent text-gray-500 dark:text-gray-400">
            <HiX className="h-4 w-4" />
          </Banner.CollapseButton> */}
        </div>
      </div>
    </Banner>
  )
}

export default StudentDeclined
