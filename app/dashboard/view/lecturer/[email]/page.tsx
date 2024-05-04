/* eslint-disable @next/next/no-img-element */
'use client'
import { breakpoints } from '@/app/config/breakpoints'
import { useParams } from 'next/navigation'
import React from 'react'
import { useMediaQuery } from 'usehooks-ts'
import LeftSection from './components/leftSection'

const Page = () => {
  const isDesktop = useMediaQuery(`(max-width: ${breakpoints.desktop})`)
  const params = useParams<{
    email: string
  }>()

  return (
    <div className={`${!isDesktop ? 'px-24' : 'px-0'}`}>
      <div className="stats shadow"></div>
      <div className="justify-center px-4  border rounded-lg  bg-black shadow-lg">
        {/* <div className="grid grid-cols-8 gap-1 bg-slate-400">
          <div className="col-span-2 bg-red-600"><LeftSection /></div>
          <div className="col-span-5"><LeftSection /></div>
          <div className="col-span-1 bg-red-600"><LeftSection /></div>
        </div> */}


        <div className="flex flex-wrap-reverse">
          <div><LeftSection /></div>
          <div className='grow'></div>
          <div><LeftSection /></div>
        </div>
      </div>
    </div>
  )
}

export default Page
