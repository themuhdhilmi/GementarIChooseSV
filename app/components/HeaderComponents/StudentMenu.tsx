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
import { useParams, usePathname } from 'next/navigation'
import Link from 'next/link'
import { signOut } from 'next-auth/react'

const StudentMenu = (props: any) => {
  const isDesktop = useMediaQuery(`(max-width: ${breakpoints.desktop})`)
  const isMobileLandscape = useMediaQuery(`(max-width: ${breakpoints.mobileLandscape})`)
  const pathname = usePathname()
  const params = useParams<{
    email: string
  }>()

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
          <Link href={`/`} className={`btn btn-sm rounded-lg border-0  bg-red-800 text-white hover:bg-red-900 ${getFirstThreePathName() === '/' ? '' : 'bg-opacity-0'}`}>
            <AiOutlineGlobal />
            Feed
          </Link>

          <Link href={`/dashboard/view/student/${props.email}`} className={`btn btn-sm rounded-lg border-0  bg-red-800 text-white hover:bg-red-900 ${(getFirstThreePathName() + `/${decodeURIComponent(params.email)}`) === ('/dashboard/view/student'  + `/${props.email}`) ? '' : 'bg-opacity-0'} `}>
            <AiOutlineGlobal />
            Supervisor Selection
          </Link>

          <Link href={`/dashboard/view/profileSettings`} className={`btn btn-sm rounded-lg border-0 bg-red-800 text-white hover:bg-red-900 ${getFirstThreePathName() === '/dashboard/view/profileSettings' ? '' : 'bg-opacity-0'}  `}>
            <IoIosConstruct />
            Profile Settings
          </Link>

          <button onClick={() => signOut()} className={`btn btn-sm rounded-lg border-0 bg-red-700 text-white hover:bg-red-900 ${getFirstThreePathName() === '' ? '' : 'bg-opacity-0'}  `}>
            <FaPowerOff />
            Log Out
          </button>

          <div className="w-full flex flex-row-reverse">
            <Link href={``} className={`btn btn-sm rounded-lg border-0 text-red-600 bg-white hover: hover:text-white`}>
              <IoIosConstruct />
              GementarTeam Mentorship Programme
            </Link>
          </div>
        </div>
      ) : (
        <div>
          {isMobileLandscape ? (
            ''
          ) : (
            <div className="flex flex-col w-full">
              <div className="flex flex-row">
                <div className="badge badge-neutral  w-1/2">Final presentation</div>
                <div className="badge  w-1/2">
                  <Countdown date={'2025-02-01T01:02:03'} renderer={props.renderer} />
                </div>
              </div>

              <div className="flex flex-row">
                <div className=" badge badge-neutral  w-1/2">Session</div>
                <div className="badge w-1/2">1 2022/2023</div>
              </div>
            </div>
          )}

          <div className="flex flex-wrap py-5 w-full">
            <Link href={``} className={`${isMobileLandscape ? 'text-xs' : ''} btn rounded-lg border-0 border-red-700 bg-red-700 text-white hover:bg-red-900 ${getFirstThreePathName() === '' ? '' : 'bg-opacity-0'} hover:border-red-700 w-full`}>
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
          <div className="flex flex-wrap bg-red-500 rounded-lg">
            <Link href={`/`} className={`btn btn-sm rounded-lg border-0  bg-red-700 text-white hover:bg-red-900 ${getFirstThreePathName() === '/' ? '' : 'bg-opacity-0'} w-full`}>
              <AiOutlineGlobal />
              Feed
            </Link>

            <Link href={`/dashboard/view/student/${props.email}`} className={`btn btn-sm rounded-lg border-0  bg-red-700 text-white hover:bg-red-900 ${(getFirstThreePathName() + `/${props.email}`) === ('/dashboard/view/student'  + `/${props.email}`) ? '' : 'bg-opacity-0'} w-full`}>
              <AiOutlineGlobal />
              Supervisor Selection
            </Link>

            <Link href={`/dashboard/view/profileSettings`} className={`btn btn-sm rounded-lg border-0 bg-red-700 text-white hover:bg-red-900 ${getFirstThreePathName() === '/dashboard/view/profileSettings' ? '' : 'bg-opacity-0'}    w-full`}>
              <IoIosConstruct />
              Profile Settings
            </Link>

            <button onClick={() => signOut()} className={`btn btn-sm rounded-lg border-0 bg-red-700 text-white hover:bg-red-900 ${getFirstThreePathName() === '' ? '' : 'bg-opacity-0'}    w-full`}>
              <FaPowerOff />
              Log Out
            </button>
          </div>

          <div className="w-full flex">
            <Link href={``} className={`${isMobileLandscape ? 'text-xs' : ''} btn rounded-lg border-0 text-red-600 bg-white hover: hover:text-white w-full my-5`}>
              {isMobileLandscape ? '' : <IoIosConstruct />}
              GementarTeam Mentorship Programme
            </Link>
          </div>
        </div>
      )}
    </div>
  )
}

export default StudentMenu
