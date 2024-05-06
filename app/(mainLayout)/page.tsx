'use client'
import { breakpoints } from '@/app/config/breakpoints'
import React from 'react'
import { useMediaQuery } from 'usehooks-ts'
import InformationalLink from './components/Feed/InformationalLink'
import Feed from './components/Feed/Feed'
import Image from 'next/image'

const Page = () => {
  const isDesktop = useMediaQuery(`(max-width: ${breakpoints.desktop})`)

  return (
    <div className={`${!isDesktop ? 'px-24' : 'px-0'}`}>
      <div className="stats shadow"></div>
      <div className="justify-center px-4  border rounded-lg  bg-white shadow-lg">
        <div className="overflow-x-auto">
          <div className="flex flex-row py-5">
            <div className="w-1/2 font-medium ">
              <p className="underline decoration-1">Feeds News & Update</p>
            </div>
          </div>
          {!isDesktop ? (
            <div className="grid grid-cols-4 gap-4 min-h-screen">
              <div className={`col-span-3`}>
                <Feed />
              </div>
              <div>
                <InformationalLink />
                <Image src="/images/logohome.png" alt="alt" width={400} height={400} />
              </div>
            </div>
          ) : (
            <div className="flex flex-col min-h-screen">
              <div className={`col-span-3`}>
                <InformationalLink />
              </div>
              <div>
                <Feed />
                <Image src="/images/logohome.png" alt="alt" width={400} height={400} />
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default Page
