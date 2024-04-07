'use client'
import { breakpoints } from '@/app/config/breakpoints'
import { useAddQuestion } from '@/app/utilities/storage/quiz/useAddQuestion'
import { useDeleteQuestion } from '@/app/utilities/storage/quiz/useDeleteQuestion'
import { useGetSubjectById } from '@/app/utilities/storage/quiz/useGetSubjectById'
import { Banner, Button } from 'flowbite-react'
import Link from 'next/link'
import { useParams } from 'next/navigation'
import React, { useEffect, useState } from 'react'
import { useMediaQuery } from 'usehooks-ts'
import { DeleteQuizModal } from '../../../quizCreation/questionCreation/[id]/components/DeleteQuizModal'
import { useGetQuestionById } from '@/app/utilities/storage/quiz/useGetQuestionById'
import AnswerMultiChoice from './components/AnswerMultiChoice'
import AnswerFITB from './components/AnswerFITB'
import AnswerEssay from './components/AnswerEssay'

const Page = () => {
  const params = useParams<{
    id: string
  }>()
  const { fetchData, data } = useGetQuestionById()

  const isDesktop = useMediaQuery(`(max-width: ${breakpoints.desktop})`)

  useEffect(() => {
    fetchData(decodeURIComponent(params.id))
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <div className={`${!isDesktop ? 'px-24' : 'px-0'}`}>
      <div className="justify-center px-4  border rounded-lg  bg-white shadow-lg py-5">
        <div className="overflow-x-auto">
          <div className="flex flex-row py-5">
            <div className="w-1/2 font-medium ">
              <p className="underline decoration-1 ">Answer Quiz</p>
            </div>
          </div>
          <div>
            {data?.subject?.childQuestion.map((item: any, index: number) => {
              if (item.questionType === 'MULTI_CHOICE') {
                return <><AnswerMultiChoice item={item}/></>
              }

              if (item.questionType === 'FILL_IN_THE_BLANKS') {
                return <><AnswerFITB  item={item}/></>
              }

              if (item.questionType === 'ESSAY') {
                return <><AnswerEssay  item={item}/></>
              }
            })}
          </div>
        </div>
      </div>
    </div>
  )
}

export default Page
