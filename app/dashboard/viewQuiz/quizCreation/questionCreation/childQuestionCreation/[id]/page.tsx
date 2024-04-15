'use client'
import { useGetQuestionById } from '@/app/utilities/storage/quiz/useGetQuestionById'
import { useParams } from 'next/navigation'
import React, { useEffect, useState } from 'react'
import { ChildQuestionList } from './components/ChildQuestionList'
import { Button, Tooltip } from 'flowbite-react'
import { breakpoints } from '@/app/config/breakpoints'
import { useMediaQuery } from 'usehooks-ts'
import { useAddChildQuestion } from '@/app/utilities/storage/quiz/useAddChildQuestion'
import { useDeleteChildQuestion } from '@/app/utilities/storage/quiz/useDeleteChildQuestion'
import { useSortChildQuestion } from '@/app/utilities/storage/quiz/useSortChildQuestion'
import { useUpdateChildQuestion } from '@/app/utilities/storage/quiz/useUpdateChildQuestion'
import { useUpdateChildQuestionBodyMCQ } from '@/app/utilities/storage/quiz/MCQ/useUpdateChildQuestionBodyMCQ'
import { useAddAnswerMCQ } from '@/app/utilities/storage/quiz/MCQ/useAddAnswerMCQ'
import { useAddDummyAnswerMCQ } from '@/app/utilities/storage/quiz/MCQ/useAddDummyAnswerMCQ'
import { useDeleteAnswerMCQ } from '@/app/utilities/storage/quiz/MCQ/useDeleteAnswerMCQ'
import { useUpdateAnswerMCQ } from '@/app/utilities/storage/quiz/MCQ/useUpdateAnswerMCQ'
import { useDeleteDummyAnswerMCQ } from '@/app/utilities/storage/quiz/MCQ/useDeleteDummyAnswerMCQ'
import { useUpdateDummyAnswerMCQ } from '@/app/utilities/storage/quiz/MCQ/useUpdateDummyAnswerMCQ'
import { useUpdateScoreESSAY } from '@/app/utilities/storage/quiz/ESSAY/useUpdateScoreESSAY'
import { useUpdateAnswerFITB } from '@/app/utilities/storage/quiz/FITB/useUpdateAnswerFITB'
// questionType: z.enum(['MULTI_CHOICE', 'ESSAY', 'FILL_IN_THE_BLANKS']),
const Page = () => {
  const params = useParams<{
    id: string
  }>()

  const { fetchData, data } = useGetQuestionById()
  const { sendData, data: addChildQuestionData } = useAddChildQuestion()

  const { data: deleteChildQuestionData } = useDeleteChildQuestion()
  const { data: userSortChildrenQuestionData } = useSortChildQuestion()
  const { data: useUpdateChildQuestionData } = useUpdateChildQuestion()
  const { data: MCQQuestionData } = useUpdateChildQuestionBodyMCQ()
  const { data: sendAddDummyAnswerMCQ } = useAddDummyAnswerMCQ()
  const { data: sendAddAnswerMCQ } = useAddAnswerMCQ()
  const { data: sendDeleteAnswerMCQ } = useDeleteAnswerMCQ()
  const { data : updateAnswerMCQ } = useUpdateAnswerMCQ()
  const { data: sendDeleteDummyAnswerMCQ } = useDeleteDummyAnswerMCQ()
  const { data: updateDummyAnswerMCQData } = useUpdateDummyAnswerMCQ()
  const { data: updateScoreData } = useUpdateScoreESSAY();
  const { data: updateAnswerFITB } = useUpdateAnswerFITB();
  const isDesktop = useMediaQuery(`(max-width: ${breakpoints.desktop})`)

  useEffect(() => {
    fetchData(decodeURIComponent(params.id))
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [updateAnswerFITB, updateScoreData, updateDummyAnswerMCQData, addChildQuestionData, deleteChildQuestionData, userSortChildrenQuestionData, useUpdateChildQuestionData, MCQQuestionData, sendAddDummyAnswerMCQ, sendAddAnswerMCQ,sendDeleteAnswerMCQ, updateAnswerMCQ, sendDeleteDummyAnswerMCQ])

  const createChildQuestion = (type: string) => {
    const postData = {
      questionId: params.id,
      questionType: type,
    }

    sendData(postData)
  }

  return (
    <div className={`${!isDesktop ? 'px-24' : 'px-0'}`}>
      <div className="justify-center px-4  border rounded-lg  bg-white shadow-lg py-5">
        <div className="overflow-x-auto">
          <div className="flex flex-row py-5">
            <div className="w-1/2 font-medium ">
              <p className=" decoration-1 ">Question Creation [{data?.subject?.title}]</p>
            </div>
          </div>
          <div className="flex flex-row-reverse gap-1 pr-4 py-3">
            <Tooltip content="Essay">
              <button onClick={() => createChildQuestion('ESSAY')} className="btn btn-xs rounded-lg">
                Add Essay Question
              </button>
            </Tooltip>
            <Tooltip content="Fill In The Blank Question">
              <button onClick={() => createChildQuestion('FILL_IN_THE_BLANKS')} className="btn btn-xs rounded-lg">
                Add FITB Question
              </button>
            </Tooltip>
            <Tooltip content="Multiple Choice Question">
              <button onClick={() => createChildQuestion('MULTI_CHOICE')} className="btn btn-xs rounded-lg">
                Add MCQ Question
              </button>
            </Tooltip>
          </div>
          <ChildQuestionList questionId={params.id} childQuestion={data?.subject?.childQuestion} />
        </div>
      </div>
    </div>
  )
}

export default Page
