'use client'
import { breakpoints } from '@/app/config/breakpoints'
import { Alert } from 'flowbite-react'
import React from 'react'
import { HiInformationCircle } from 'react-icons/hi'
import { useMediaQuery } from 'usehooks-ts'

const Page = () => {
  const isDesktop = useMediaQuery(`(max-width: ${breakpoints.desktop})`)

  return (
    <div className={`${!isDesktop ? 'px-24' : 'px-0'}`}>
      <div className="stats shadow"></div>
      <div className="justify-center px-4  border rounded-lg  bg-white shadow-lg">
        <div className="overflow-x-auto">
          <div className="flex flex-row py-5">
            <div className="w-1/2 font-medium \">
              <p className="underline decoration-1">Feeds News & Update</p>
            </div>
          </div>

          <div className="w-full mb-5">
            <div className="flex w-full ">
              <div className="grow 0">
                <div className="w-full flex flex-col">
                  <div className="bg-slate-200 mt-5 mx-1 rounded-lg shadow-md">1 - STATUS OF COURSES ONGOING AND ON THE WAY</div>

                  <div className="bg-slate-200 mt-5 mx-1 rounded-lg shadow-md">2 - JOINED STUDENT BUT ARE NOT COMPLETED YET</div>
                </div>
              </div>
              <div className="flex-none w-96 ">
                <div className="w-full flex flex-col">
                  <div className="bg-slate-200 mt-5 mx-1 rounded-lg shadow-md">
                    <Alert color="success" icon={HiInformationCircle} rounded>
                      <span className="font-medium">Info alert!</span> Change a few things up and try submitting again.
                    </Alert>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Page
