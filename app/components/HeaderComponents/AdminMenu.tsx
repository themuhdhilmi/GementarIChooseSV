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
import { DrawerAdminMenu } from './Drawer/DrawerAdminMenu'

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
          <Link href={`/`} className={`btn btn-sm rounded-lg border-0  bg-red-800 text-white hover:bg-red-900 ${getFirstThreePathName() === '/' ? '' : 'bg-opacity-0'}`}>
            <AiOutlineGlobal />
            Feed
          </Link>

          <Link href={`/dashboard/admin/globalValue`} className={`btn btn-sm rounded-lg border-0  bg-red-800 text-white hover:bg-red-900 ${getFirstThreePathName() === '/dashboard/admin/globalValue' ? '' : 'bg-opacity-0'} `}>
            <AiOutlineGlobal />
            Manage Sessions
          </Link>

          <Link href={`/dashboard/admin/studentsManager`} className={`btn btn-sm rounded-lg border-0 bg-red-800 text-white hover:bg-red-900 ${getFirstThreePathName() === '/dashboard/admin/studentsManager' ? '' : 'bg-opacity-0'}  `}>
            <PiStudentFill />
            Students Manager
          </Link>

          <Link href={`/dashboard/admin/lecturersManager`} className={`btn btn-sm rounded-lg border-0 bg-red-800 text-white hover:bg-red-900 ${getFirstThreePathName() === '/dashboard/admin/lecturersManager' ? '' : 'bg-opacity-0'}  `}>
            <FaPerson />
            Lecturers Manager
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
          <DrawerAdminMenu renderer={props?.renderer} name={props?.name} />
        </div>
      )}
    </div>
  )
}

export default AdminMenu
