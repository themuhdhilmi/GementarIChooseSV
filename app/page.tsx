'use client'
import { breakpoints } from '@/app/config/breakpoints'
import React from 'react'
import { useMediaQuery } from 'usehooks-ts'

//// Database Design
//// [API] Login API
//// [API] RESTFULL  GET|PUT|POST Lecturer
//// [API] RESTFULL  GET|PUT|POST Student
//// [API] RESTFULL  GET|PUT|POST StudentMember
//// [API] RESTFULL  GET|PUT|POST StudentProjectTitle
//// [API] RESTFULL  GET          admin
//// [API] RESTFULL  GET|POST     sessions
//// [API] RESTFULL  GET          Lecturer
//// [API] EXPRESSJS GET|POST     poster
//// [MAIN TEMPLATE] Login
//// [MAIN TEMPLATE] Student View Data
//// [MAIN TEMPLATE] Student View Edit Password | Setting SV
//// [MAIN TEMPLATE] Student View Individual Quota Member and Title
//// [MAIN TEMPLATE] Login   Supervisor Selection
//// [MAIN TEMPLATE] Mobile  Adjustment
//// [MAIN TEMPLATE] Admin   Add/Remove Student
//// [MAIN TEMPLATE] Admin   Add/Remove Lecturer
//// [MAIN TEMPLATE] Admin   Manage Global Session
//// [MAIN TEMPLATE] Permission view pages
//// [MAIN TEMPLATE] Mobile  Adjustment
//// [Global Dashboard]   Implement profile setting (Implement change password).
//// [Lecturer Dashbaord] Implement Lecturer Manage Supervisee.

//TODO [Lecturer Dashbaord] Above same for when lecturer accepted student in API then check and decline all requested students.
//TODO [Student] Make Alert On top if student didn't complete their task to 3/4

//TODO [Admin Dashboard]    Add Final Presentation Date.
//TODO [Admin Dashboard]    Update Final presentation Date Counter Header.
//TODO [Admin Dashboard]    Add Moderator Account.
//TODO [Global Dashboard]   Per-session result.
//TODO [Lecturer Dashbaord] Lecturer Profile.
//TODO [Lecturer Directory] Lecturer List Page. https://directory.upsi.edu.my
//TODO [Lecturer Directory] Lecturer View Page.

//TODO Populate Feed Pages

//TODO [====FINAL BOSS====] IMPLEMENT SECURITY IN API SIDE


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
        </div>
      </div>
    </div>
  )
}

export default Page
