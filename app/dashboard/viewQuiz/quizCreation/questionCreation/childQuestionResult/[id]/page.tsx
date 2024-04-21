'use client'
import { useGetQuestionById } from '@/app/utilities/storage/quiz/useGetQuestionById'
import { useParams } from 'next/navigation'
import React, { useEffect, useState } from 'react'
import { Banner } from 'flowbite-react'
import { breakpoints } from '@/app/config/breakpoints'
import { useMediaQuery } from 'usehooks-ts'
import { ConfirmScoreModal } from './modal/ConfirmScoreModal'
import { useUpdateQuestionListScore } from '@/app/utilities/storage/quiz/useUpdateQuestionListScore'
import { useUpdateIsCheckByLecturerTrue } from '@/app/utilities/storage/quiz/useUpdateIsCheckByLecturerTrue'
import { ViewScorePerAnswer } from './modal/ViewScorePerAnswer'
// questionType: z.enum(['MULTI_CHOICE', 'ESSAY', 'FILL_IN_THE_BLANKS']),
const Page = () => {
  const params = useParams<{
    id: string
  }>()

  const { fetchData, data } = useGetQuestionById()
  const { data: updateQuestionListScore } = useUpdateQuestionListScore()
  const {data : useUpdateLecturertrue } =  useUpdateIsCheckByLecturerTrue()

  const isDesktop = useMediaQuery(`(max-width: ${breakpoints.desktop})`)

  useEffect(() => {
    fetchData(decodeURIComponent(params.id))
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [updateQuestionListScore, useUpdateLecturertrue])

  const getStudent = () => {
    for (let index = 0; index < data?.subject?.StudentAnswer.length; index++) {
      const item = data?.subject?.StudentAnswer[0]

      const id = item?.id

      const userName = item?.user?.name
      const userEmail = item?.user?.email
      const isItemChecked = item?.isCheckedByLecturer
      const totalScore = item?.totalScore
      const arrayAnswerList = item.StudentAnswerList

      if (isItemChecked) {
        return (
          <div>
            <Banner>
              <div className="flex w-full flex-col justify-between rounded-lg border border-gray-100 bg-white p-4 shadow-sm dark:border-gray-600 dark:bg-gray-700 md:flex-row">
                <div className="mb-3 mr-4 flex flex-col items-start md:mb-0 md:flex-row md:items-center">
                  <p className="flex items-center text-sm font-normal text-gray-500 dark:text-gray-400">Name : {userName} | Email : {userEmail}</p>
                </div>
                <div className="flex shrink-0 items-center">
                  Final Score : {totalScore}
                </div>
              </div>
            </Banner>
          </div>
        )
      }

      if (!isItemChecked) {
        return (
          <div>
            <Banner>
              <div className="flex w-full flex-col justify-between rounded-lg border border-gray-100 bg-white p-4 shadow-sm dark:border-gray-600 dark:bg-gray-700 md:flex-row">
                <div className="mb-3 mr-4 flex flex-col items-start md:mb-0 md:flex-row md:items-center">
                  <p className="flex items-center text-sm font-normal text-gray-500 dark:text-gray-400">Name : {userName} | Email : {userEmail}</p>
                </div>
                <div className="flex shrink-0 items-center">
                  <ConfirmScoreModal arrayAnswerList={arrayAnswerList} id={id}/>
                </div>
              </div>
            </Banner>
          </div>
        )
      }
    }
  }

  return (
    <div className={`${!isDesktop ? 'px-24' : 'px-0'}`}>
      <div className="justify-center px-4  border rounded-lg  bg-white shadow-lg py-5">
        <div className="overflow-x-auto">
          <div className="flex flex-row py-5">
            <div className="w-1/2 font-medium ">
              <p className=" decoration-1 ">Question Result [{data?.subject?.title}]</p>
            </div>
          </div>
          {/* {getStudent()} */}


          {data?.subject?.StudentAnswer?.map((inItem : any, index : number) => {
          const item = inItem;

          const id = item?.id

          const userName = item?.user?.name
          const userEmail = item?.user?.email
          const isItemChecked = item?.isCheckedByLecturer
          const totalScore = item?.totalScore
          const arrayAnswerList = item.StudentAnswerList

          if (isItemChecked) {
            return (
              <div key={index}>
                <Banner>
                  <div className="flex w-full flex-col justify-between rounded-lg border border-gray-100 bg-white p-4 shadow-sm dark:border-gray-600 dark:bg-gray-700 md:flex-row">
                    <div className="mb-3 mr-4 flex flex-col items-start md:mb-0 md:flex-row md:items-center">
                      <p className="flex items-center text-sm font-normal text-gray-500 dark:text-gray-400">Name : {userName} | Email : {userEmail}</p>
                    </div>
                    <div className="flex flex-row shrink-0 items-center gap-2">
                      <p>Final Score : {totalScore}</p>
                      <ViewScorePerAnswer arrayAnswerList={arrayAnswerList} id={id}/>
                    </div>
                  </div>
                </Banner>
              </div>
            )
          }
    
          if (!isItemChecked) {
            return (
              <div key={index}>
                <Banner>
                  <div className="flex w-full flex-col justify-between rounded-lg border border-gray-100 bg-white p-4 shadow-sm dark:border-gray-600 dark:bg-gray-700 md:flex-row">
                    <div className="mb-3 mr-4 flex flex-col items-start md:mb-0 md:flex-row md:items-center">
                      <p className="flex items-center text-sm font-normal text-gray-500 dark:text-gray-400">Name : {userName} | Email : {userEmail}</p>
                    </div>
                    <div className="flex shrink-0 items-center">
                      <ConfirmScoreModal arrayAnswerList={arrayAnswerList} id={id}/>
                    </div>
                  </div>
                </Banner>
              </div>
            )
          }



          })}
        </div>
      </div>
    </div>
  )
}

export default Page
