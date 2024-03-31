'use client'
import { breakpoints } from '@/app/config/breakpoints'
import { useAddSubject } from '@/app/utilities/storage/quiz/useAddSubject'
import { useGetSubject } from '@/app/utilities/storage/quiz/useGetSubject'
import Link from 'next/link'
import React, { useEffect, useState } from 'react'
import { useMediaQuery } from 'usehooks-ts'

const Page = () => {
  const { fetchData: fetchDataGetSubject, data: dataGetSubject } = useGetSubject()
  const { sendData: sendDataAddSubject, data: dataAddSubject } = useAddSubject()
  const isDesktop = useMediaQuery(`(max-width: ${breakpoints.desktop})`)
  const [titleSubject, setTitleSubject] = useState('')

  const test = () => {}

  useEffect(() => {
    fetchDataGetSubject()

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dataAddSubject])

  const addSubject = () => {
    if (titleSubject === '') return

    const postData = {
      title: titleSubject,
    }

    sendDataAddSubject(postData)
    setTitleSubject('')
  }

  return (
    <div className={`${!isDesktop ? 'px-24' : 'px-0'}`}>
      <div className="justify-center px-4  border rounded-lg  bg-white shadow-lg py-5">
        <div className="overflow-x-auto">
          <div className="flex flex-row py-5">
            <div className="w-1/2 font-medium ">
              <p className="underline decoration-1 ">Course List</p>
            </div>
          </div>

          <div>
            <div className=' flex flex-row-reverse'>
            <button onClick={() => addSubject()} className="btn rounded-r-lg bg-red-700 text-white">
                Add New Courses
              </button>
              <input placeholder='Course title' className="input input-bordered w-full max-w-xs rounded-l-lg" value={titleSubject} onChange={(e) => setTitleSubject(e.target.value)}></input>{' '}
            </div>
            <div className="flex flex-wrap  py-4 gap-2">
              {dataGetSubject?.subject?.map((item: any, index: number) => {
                return (
                  <div key={index} className="grow w-96 pt-5 rounded-lg border ">
                    <div className="flex flex-col w-full ">
                      <div className="w-full text-center py-3">{item.title}</div>
                      <div className="w-full">
                        <Link href={`/dashboard/viewQuiz/quizCreation/questionCreation/${item?.id}`}>
                          <button className="btn w-full bg-red-700 text-white">VIEW</button>
                        </Link>
                      </div>
                    </div>
                  </div>
                )
              })}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Page
