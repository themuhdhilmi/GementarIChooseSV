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

const GuestMenu = (props: any) => {
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
          <Link href={`/`} className={`btn btn-sm rounded-lg border-0  bg-red-800 text-white hover:bg-red-900 ${getFirstThreePathName() === '/' ? '' : 'bg-opacity-0'}`}>
            <AiOutlineGlobal />
            Feed
          </Link>

          <div className="w-full flex flex-row-reverse">
            <Link href={`https://academy.gementar.com`} className={`btn btn-sm rounded-lg border-0 text-red-600 bg-white hover: hover:text-white`}>
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

          {/* <div className="flex flex-wrap py-5 w-full">

          </div>
          <div className="flex flex-wrap"></div>
          <div className="flex flex-wrap bg-red-500 rounded-lg">
            <Link
              href={`/`}
              className={`btn btn-sm rounded-lg border-0  bg-red-700 text-white hover:bg-red-900 ${
                getFirstThreePathName() === "/" ? "" : "bg-opacity-0"
              } w-full`}
            >
              <AiOutlineGlobal />
              Feed
            </Link>

          </div> */}

          <div className="w-full flex">
            <Link href={`https://academy.gementar.com`} className={`${isMobileLandscape ? 'text-xs' : ''} btn rounded-lg border-0 text-red-600 bg-white hover: hover:text-white w-full my-5`}>
              {isMobileLandscape ? '' : <IoIosConstruct />}
              GementarTeam Mentorship Programme
            </Link>
          </div>
        </div>
      )}
    </div>
  )
}

export default GuestMenu
