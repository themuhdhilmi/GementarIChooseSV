'use client'
import { Banner } from 'flowbite-react'
import React from 'react'
import Link from 'next/link';
import { useResponseApplication } from '@/app/utilities/storage/lecturer/useResponseApplication';
import { FaCheckCircle } from "react-icons/fa";
const StudentSelected = (props : any) => {
  const { sendData } = useResponseApplication();

  const selectionHandlerFalse = () => {
    const postData = {
      studentEmail: props?.student?.User?.email,
      selection: false
    }

    sendData(postData)

  }

  const selectionHandlerTrue = () => {
    const postData = {
      studentEmail: props?.student?.User?.email,
      selection: true
    }
    sendData(postData)
  }

  return (
    <Banner className="w-full my-1">
      <div className="flex w-full flex-col justify-between rounded-lg border border-gray-100 bg-white p-4 shadow-sm dark:border-gray-600 dark:bg-gray-700 md:flex-row ">
        <div className="mb-3 mr-4 flex flex-col items-start md:mb-0 md:flex-row md:items-center">
            <span className="self-center whitespace-nowrap text-lg font-semibold dark:text-white md:pr-6 flex flex-row"><div className='text-green-700'><FaCheckCircle /></div>{props?.student?.matricNumber}</span>
             Your selected supervisee...
            <Link className='text-blue-800' href={'/dashboard/view/student/' + props?.student?.User?.email}>Click to view profile</Link>
        </div>
        <div className="flex gap-1 flex-shrink-0 items-center">
          {/* <button onClick={selectionHandlerFalse} className='btn  rounded-lg border-0  bg-red-700 text-white hover:bg-red-900' >Decline</button> */}
          {/* <Banner.CollapseButton color="gray" className="border-0 bg-transparent text-gray-500 dark:text-gray-400">
            <HiX className="h-4 w-4" />
          </Banner.CollapseButton> */}
        </div>
      </div>
    </Banner>
  )
}

export default StudentSelected
