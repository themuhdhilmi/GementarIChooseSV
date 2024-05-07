'use client'
import { breakpoints } from '@/app/config/breakpoints'
import { signOut } from 'next-auth/react'
import Image from 'next/image'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useState } from 'react'
import Countdown from 'react-countdown'
import { AiOutlineGlobal } from 'react-icons/ai'
import { FaPerson, FaPowerOff } from 'react-icons/fa6'
import { IoIosConstruct } from 'react-icons/io'
import { PiStudentFill } from 'react-icons/pi'
import { useMediaQuery } from 'usehooks-ts'


export function DrawerAdminMenu(props : {renderer : any, name : string}) {
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
    <>
      <div className="drawer">
        <input id="my-drawer" type="checkbox" className="drawer-toggle" />
        <div className="drawer-content pl-2 mr-4">
          <label htmlFor="my-drawer" className="btn w-full bg-white text-black drawer-button rounded-lg">
            Menu
          </label>
        </div>
        <div className="drawer-side" style={{ zIndex : 999}}>
        <label htmlFor="my-drawer" aria-label="close sidebar" className="drawer-overlay"></label>
        <div className='menu p-4 w-80 min-h-full bg-red-700'>
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

            <Link href={`/dashboard/admin/globalValue`} className={`btn btn-sm rounded-lg border-0  bg-red-700 text-white hover:bg-red-900 ${getFirstThreePathName() === '/dashboard/admin/globalValue' ? '' : 'bg-opacity-0'} w-full`}>
              <AiOutlineGlobal />
              Manage Sessions
            </Link>

            <Link href={`/dashboard/admin/studentsManager`} className={`btn btn-sm rounded-lg border-0 bg-red-700 text-white hover:bg-red-900 ${getFirstThreePathName() === '/dashboard/admin/studentsManager' ? '' : 'bg-opacity-0'}    w-full`}>
              <PiStudentFill />
              Students Manager
            </Link>

            <Link href={`/dashboard/admin/lecturersManager`} className={`btn btn-sm rounded-lg border-0 bg-red-700 text-white hover:bg-red-900 ${getFirstThreePathName() === '/dashboard/admin/lecturersManager' ? '' : 'bg-opacity-0'}    w-full`}>
              <FaPerson />
              Lecturer Manager
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
            <Link href={`https://academy.gementar.com`} className={`${isMobileLandscape ? 'text-xs' : ''} btn rounded-lg border-0 text-red-600 bg-white hover: hover:text-white w-full my-5`}>
              {isMobileLandscape ? '' : <IoIosConstruct />}
              GementarTeam Mentorship Programme
            </Link>
          </div>
        </div>
        
        </div>
      </div>
    </>
  )
}
