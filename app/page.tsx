'use client'
import { breakpoints } from '@/app/config/breakpoints'
import React from 'react'
import { useMediaQuery } from 'usehooks-ts'

//TODO [Global Dashboard]   Implement profile setting (Implement change password).
//TODO [Lecturer Dashbaord] Implement Lecturer Manage Supervisee.
//TODO [Lecturer Dashbaord] Above same for when lecturer accepted student in API then check and decline all requested students.
//TODO [Admin Dashboard]    Add Final Presentation Date.
//TODO [Admin Dashboard]    Update Final presentation Date Counter Header.
//TODO [Global Dashboard]   Per-session result.
//TODO [Lecturer Dashbaord] Lecturer Profile.
//TODO [Lecturer Directory] Lecturer List Page. https://directory.upsi.edu.my
//TODO [Lecturer Directory] Lecturer View Page.

//TODO Populate Feed Pages


const Page = () => {
  const isDesktop = useMediaQuery(`(max-width: ${breakpoints.desktop})`)

  return (
    <div className={`${!isDesktop ? 'px-24' : 'px-6'}`}>
      <div className="stats shadow"></div>
      <div className="justify-center px-4  border rounded-lg  bg-white shadow-lg">
        <div className="overflow-x-auto">
          <div className="flex flex-row py-5">
            <div className="w-1/2 font-medium ">
              <p className="underline decoration-1">Feeds News & Update</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Page
