'use client'
import { breakpoints } from '@/app/config/breakpoints'
import { Alert } from 'flowbite-react'
import React, { useEffect } from 'react'
import { HiInformationCircle } from 'react-icons/hi'
import { useMediaQuery } from 'usehooks-ts'
import TableHome1 from './components/TableHome1'
import { useGetHomeQuizList } from './utilities/storage/useGetHomeQuizList'
import TableHome2 from './components/TableHome2'
import TableHome3 from './components/TableHome3'
import TableHome4 from './components/TableHome4'

const Page = () => {
  const isDesktop = useMediaQuery(`(max-width: ${breakpoints.desktop})`)
  const { fetchData, data } = useGetHomeQuizList()


  useEffect(() => {
    fetchData()
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

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
                  <div className="mt-5 mx-1 rounded-lg shadow-md">
                    {/* {JSON.stringify(data)} */}
                    <TableHome1 data={data}/>
                    <TableHome2 data={data}/>
                    <TableHome3 data={data}/>
                    <TableHome4 data={data}/>
                  </div>

                  {/* <div className="bg-slate-200 mt-5 mx-1 rounded-lg shadow-md">2 - JOINED STUDENT BUT ARE NOT COMPLETED YET</div> */}
                </div>
              </div>
              {/* <div className="flex-none w-96 ">
                <div className="w-full flex flex-col">
                  <div className="bg-slate-200 mt-5 mx-1 rounded-lg shadow-md">
                    <Alert color="success" icon={HiInformationCircle} rounded>
                      <span className="font-medium">Info!</span> Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
                    </Alert>
                  </div>
                </div>
              </div> */}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Page
