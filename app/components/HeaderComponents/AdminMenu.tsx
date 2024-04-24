'use client'
import React from 'react'
import { useMediaQuery } from 'usehooks-ts'
import { AiOutlineGlobal } from 'react-icons/ai'
import { IoIosConstruct } from 'react-icons/io'
import { PiStudentFill } from 'react-icons/pi'
import { FaPowerOff } from 'react-icons/fa6'
import { FaPerson } from 'react-icons/fa6'
import Image from 'next/image'
import Countdown from 'react-countdown'
import { breakpoints } from '@/app/config/breakpoints'
import { usePathname } from 'next/navigation'
import Link from 'next/link'
import { signOut } from 'next-auth/react'

const AdminMenu = (props: any) => {
  const isDesktop = useMediaQuery(`(max-width: ${breakpoints.desktop})`)
  const isMobileLandscape = useMediaQuery(`(max-width: ${breakpoints.mobileLandscape})`)
  const pathname = usePathname()

  const getFirstThreePathName = () => {
    // Split the URL path by "/"
    const pathSegments = pathname.split('/')

    // Take the first three segments
    const firstThreeSegments = pathSegments.slice(0, 4)

    // Join the segments back together to get the result
    const resultPath = firstThreeSegments.join('/')

    return resultPath
  }
  return (
    <div>
      {/* {getFirstThreePathName()} */}
      {!isDesktop ? (
        <div className="flex flex-row gap-3 py-5">
          {/* <Link href={`/`} className={`btn btn-sm rounded-lg border-0  bg-blue-800 text-white hover:bg-blue-900 ${getFirstThreePathName() === '/' ? '' : 'bg-opacity-0'}`}>
            <AiOutlineGlobal />
            Home
          </Link> */}

          {/* <Link href={`/dashboard/admin/globalValue`} className={`btn btn-sm rounded-lg border-0  bg-blue-800 text-white hover:bg-blue-900 ${getFirstThreePathName() === '/dashboard/admin/globalValue' ? '' : 'bg-opacity-0'} `}>
            <AiOutlineGlobal />
            Manage Sessions
          </Link> */}

          <Link href={`/dashboard/viewQuiz/quizCreation`} className={`btn btn-sm rounded-lg border-0 bg-blue-800 text-white hover:bg-blue-900 ${getFirstThreePathName() === '/dashboard/viewQuiz/quizCreation' ? '' : 'bg-opacity-0'}  `}>
            <AiOutlineGlobal />
            Subject Management
          </Link>

          <Link href={`/dashboard/admin/studentsManager`} className={`btn btn-sm rounded-lg border-0 bg-blue-800 text-white hover:bg-blue-900 ${getFirstThreePathName() === '/dashboard/admin/studentsManager' ? '' : 'bg-opacity-0'}  `}>
            <PiStudentFill />
            Students Management
          </Link>

          <Link href={`/dashboard/admin/lecturersManager`} className={`btn btn-sm rounded-lg border-0 bg-blue-800 text-white hover:bg-blue-900 ${getFirstThreePathName() === '/dashboard/admin/lecturersManager' ? '' : 'bg-opacity-0'}  `}>
            <FaPerson />
            Lecturer Management
          </Link>

          <Link href={`/dashboard/view/profileSettings`} className={`btn btn-sm rounded-lg border-0 bg-blue-800 text-white hover:bg-blue-900 ${getFirstThreePathName() === '/dashboard/view/profileSettings' ? '' : 'bg-opacity-0'}  `}>
            <IoIosConstruct />
            Profile Settings
          </Link>

          <button onClick={() => signOut()} className={`btn btn-sm rounded-lg border-0 bg-blue-500 text-white hover:bg-blue-900 ${getFirstThreePathName() === '' ? '' : 'bg-opacity-0'}  `}>
            <FaPowerOff />
            Log Out
          </button>

          <div className="w-full flex flex-row-reverse">
            {/* <Link href={``} className={`btn btn-sm rounded-lg border-0 text-blue-600 bg-white hover: hover:text-white`}>
              <IoIosConstruct />
               Mentorship Programme
            </Link> */}
          </div>
        </div>
      ) : (
        <div>
          {isMobileLandscape ? (
            ''
          ) : (
            <div className="flex flex-col w-full">
              {/* <div className="flex flex-row">
                <div className="badge badge-neutral  w-1/2">Final presentation</div>
                <div className="badge  w-1/2">
                  <Countdown date={'2025-02-01T01:02:03'} renderer={props.renderer} />
                </div>
              </div>

              <div className="flex flex-row">
                <div className=" badge badge-neutral  w-1/2">Session</div>
                <div className="badge w-1/2">1 2022/2023</div>
              </div> */}
            </div>
          )}

          <div className="flex flex-wrap py-5 w-full">
            <Link href={``} className={`${isMobileLandscape ? 'text-xs' : ''} btn rounded-lg border-0 border-blue-500 bg-blue-500 text-white hover:bg-blue-900 ${getFirstThreePathName() === '' ? '' : 'bg-opacity-0'} hover:border-blue-500 w-full`}>
              {isMobileLandscape ? (
                ''
              ) : (
                <div className="avatar">
                  <div className="w-10 mask mask-hexagon">
                    <Image alt="" width={500} height={500} src="/images/profile.jpg" />
                  </div>
                </div>
              )}
              {props.name}
            </Link>
          </div>
          <div className="flex flex-wrap"></div>
          <div className="flex flex-wrap bg-blue-500 rounded-lg">
            <Link href={`/`} className={`btn btn-sm rounded-lg border-0  bg-blue-500 text-white hover:bg-blue-900 ${getFirstThreePathName() === '/' ? '' : 'bg-opacity-0'} w-full`}>
              <AiOutlineGlobal />
              Home
            </Link>

            <Link href={`/dashboard/admin/globalValue`} className={`btn btn-sm rounded-lg border-0  bg-blue-500 text-white hover:bg-blue-900 ${getFirstThreePathName() === '/dashboard/admin/globalValue' ? '' : 'bg-opacity-0'} w-full`}>
              <AiOutlineGlobal />
              Manage Sessions
            </Link>

            <Link href={`/dashboard/admin/studentsManager`} className={`btn btn-sm rounded-lg border-0 bg-blue-500 text-white hover:bg-blue-900 ${getFirstThreePathName() === '/dashboard/admin/studentsManager' ? '' : 'bg-opacity-0'}    w-full`}>
              <PiStudentFill />
              Students Management
            </Link>

            <Link href={`/dashboard/admin/lecturersManager`} className={`btn btn-sm rounded-lg border-0 bg-blue-500 text-white hover:bg-blue-900 ${getFirstThreePathName() === '/dashboard/admin/lecturersManager' ? '' : 'bg-opacity-0'}    w-full`}>
              <FaPerson />
              Lecturer Manager
            </Link>

            <Link href={`/dashboard/view/profileSettings`} className={`btn btn-sm rounded-lg border-0 bg-blue-500 text-white hover:bg-blue-900 ${getFirstThreePathName() === '/dashboard/view/profileSettings' ? '' : 'bg-opacity-0'}    w-full`}>
              <IoIosConstruct />
              Profile Settings
            </Link>

            <button onClick={() => signOut()} className={`btn btn-sm rounded-lg border-0 bg-blue-500 text-white hover:bg-blue-900 ${getFirstThreePathName() === '' ? '' : 'bg-opacity-0'}    w-full`}>
              <FaPowerOff />
              Log Out
            </button>
          </div>

          <div className="w-full flex">
            {/* <Link href={``} className={`${isMobileLandscape ? 'text-xs' : ''} btn rounded-lg border-0 text-blue-600 bg-white hover: hover:text-white w-full my-5`}>
              {isMobileLandscape ? '' : <IoIosConstruct />}
               Mentorship Programme
            </Link> */}
          </div>
        </div>
      )}
    </div>
  )
}

export default AdminMenu
