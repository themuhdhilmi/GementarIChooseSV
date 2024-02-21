'use client'
import React, { useEffect } from 'react'
import { useMediaQuery } from 'usehooks-ts'
import { breakpoints } from '../config/breakpoints'
import { SiHtmlacademy } from 'react-icons/si'
import Image from 'next/image'
import Countdown from 'react-countdown'
import { useSession } from 'next-auth/react'
import { useUserInformation } from '../utilities/storage/user/useUserInformation'
import AdminMenu from './HeaderComponents/AdminMenu'
import Link from 'next/link'
import Loading from './LoadingFullScreen'
import GuestMenu from './HeaderComponents/GuestMenu'
import { useGetsessions } from '../utilities/storage/user/useGetSessions'
import LoadingLeftBottom from './LoadingLeftBottom'
import ToastSuccess from './ToastSuccess'
const Header = () => {
  const session = useSession()
  const { data : sessions, fetchData: fetchSession } = useGetsessions()
  const { fetchData, name, role } = useUserInformation()
  const isDesktop = useMediaQuery(`(max-width: ${breakpoints.desktop})`)
  const isTablet = useMediaQuery(`(max-width: ${breakpoints.tablet})`)

  useEffect(() => {
    fetchSession()
    fetchData()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])
  function checkIfUserLoggedIn() {
    if (session.status === 'unauthenticated') {
      return false
    } else {
      if (role === 'GUEST') {
        //signOut();
      }
    }
    return true
  }

  if (session.status === 'loading') {
    return <Loading /> // You can also render a loading indicator here if needed
  }

  const renderer = ({ days }: any) => {
    // Render a countdown
    return <span>{days}</span>
  }

  return (
    <div className="static">
      <LoadingLeftBottom />
      <ToastSuccess />
      {checkIfUserLoggedIn() ? <div className={`-z-50 absolute bg-gradient-to-r from-red-600 to-red-800 ${isDesktop ? 'min-h-screen' : 'min-h-96'} min-w-full px-5 py-2`} /> : <div className={`-z-50 absolute bg-gradient-to-r from-red-600 to-red-800 ${isTablet ? 'min-h-52' : isDesktop ? 'min-h-52' : 'min-h-52'} min-w-full px-5 py-2`} />}

      <div className={`bg-none ${!isDesktop ? 'px-24' : 'px-6'}  py-2`}>
        {!isDesktop ? (
          <div className="navbar rounded-lg p-0 ">
            <div className="navbar-start text-white ">
              <Link href={'/'} className="btn btn-ghost text-white text-xl rounded-lg">
                <SiHtmlacademy />
                iChooseSV [{role}]
              </Link>
            </div>
            <div className="navbar-center">
              <div className="badge badge-neutral">Final presentation</div>
              <div className="badge ">
                <Countdown date={'2025-02-01T01:02:03'} renderer={renderer} />
              </div>
              <div className="ml-2 badge badge-neutral">Session</div>
              <div className="badge ">
                {sessions?.sessionSelected?.number} {sessions?.sessionSelected?.yearOne}/{sessions?.sessionSelected?.yearTwo}
              </div>
            </div>

            {checkIfUserLoggedIn() ? (
              <div className="navbar-end">
                <button className="btn rounded-lg min-h-fit border-red-700 bg-red-700 text-white hover:bg-red-900 hover:border-red-700">
                  <div className="avatar">
                    <div className="w-10 mask mask-hexagon">
                      <Image alt="" width={500} height={500} src="/images/profile.jpg" />
                    </div>
                  </div>
                  <Link href={`/dashboard/view/profileSettings`} className="text-ellipsis">
                    {name}
                  </Link>
                </button>
              </div>
            ) : (
              <div className="navbar-end">
                <Link href={'/auth/signin'} className="btn rounded-lg min-h-fit border-red-700 bg-red-700 text-white hover:bg-red-900 hover:border-red-700">
                  <p className="text-ellipsis">Login</p>
                </Link>
              </div>
            )}
          </div>
        ) : (
          <div className="navbar rounded-lg p-0 ">
            <div className="navbar-start text-white ">
              <Link href={'/'} className="btn btn-ghost text-white text-xl rounded-lg">
                <SiHtmlacademy />
                iChooseSV
              </Link>
            </div>

            {checkIfUserLoggedIn() ? (
              ''
            ) : (
              <Link href={'/auth/signin'} className="navbar-end text-white">
                Login
              </Link>
            )}
            <div className="navbar-center"></div>
          </div>
        )}
        {role === 'ADMIN' ? <AdminMenu renderer={renderer} name={name} /> : ''}
        {role === 'GUEST' ? <GuestMenu renderer={renderer} /> : ''}
      </div>
    </div>
  )
}

export default Header
