import { Banner, Button } from 'flowbite-react'
import React from 'react'
import { HiX } from 'react-icons/hi'
import { FcReadingEbook } from "react-icons/fc";
import Link from 'next/link';
const StudentRequest = () => {
  return (
    <Banner className="w-full my-1">
      <div className="flex w-full flex-col justify-between rounded-lg border border-gray-100 bg-white p-4 shadow-sm dark:border-gray-600 dark:bg-gray-700 md:flex-row ">
        <div className="mb-3 mr-4 flex flex-col items-start md:mb-0 md:flex-row md:items-center">
          <Link href="https://flowbite.com/" className="px-5 mb-2 flex items-center border-gray-200 dark:border-gray-600 md:mb-0 md:mr-4 md:border-r md:pr-4">
          <FcReadingEbook />
            <span className="self-center whitespace-nowrap text-lg font-semibold dark:text-white md:pr-6">View Profile</span>
          </Link>
          <p className="flex items-center text-sm font-normal text-gray-500 dark:text-gray-400">Build websites even faster with components on top of Tailwind CSS</p>
        </div>
        <div className="flex gap-1 flex-shrink-0 items-center">
          <Button href="#">Accept</Button>
          <Button href="#">Decline</Button>
          {/* <Banner.CollapseButton color="gray" className="border-0 bg-transparent text-gray-500 dark:text-gray-400">
            <HiX className="h-4 w-4" />
          </Banner.CollapseButton> */}
        </div>
      </div>
    </Banner>
  )
}

export default StudentRequest
