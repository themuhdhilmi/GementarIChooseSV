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

const Page = () => {
  const params = useParams<{
    id: string
  }>()

  const { fetchData, data } = useGetSubjectById()
  const { sendData, data: addQuestionData } = useAddQuestion()
  const { data : dataDeleteQuestion } = useDeleteQuestion();

  const [title, setTitle] = useState('')
  const [timer, setTimer] = useState(0)

  const isDesktop = useMediaQuery(`(max-width: ${breakpoints.desktop})`)

  useEffect(() => {
    fetchData(decodeURIComponent(params.id))
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [addQuestionData, dataDeleteQuestion])

  const addSubject = () => {
    if (title === '') return

    const postData = {
      title: title,
      timeLimit: timer,
      subjectId: params.id,
    }

    // sendDataAddSubject(postData)
    sendData(postData)
    setTitle('')
  }

  return (
    <div className={`${!isDesktop ? 'px-24' : 'px-0'}`}>
      <div className="justify-center px-4  border rounded-lg  bg-white shadow-lg py-5">
        <div className="overflow-x-auto">
          <div className="flex flex-row py-5">
            <div className="w-1/2 font-medium ">
              <p className="underline decoration-1 ">Quiz List</p>
            </div>
          </div>

          <div>

            <div className="">
              {data?.subject?.Question?.map((item: any, index: number) => {
                return (
                  <div key={index} className="">
                    <Banner className='w-full mt-3'>
                      <div className="flex w-full flex-col justify-between rounded-lg border border-gray-100 bg-white p-4 shadow-sm dark:border-gray-600 dark:bg-gray-700 md:flex-row">
                        <div className=" mb-3 mr-4 flex flex-col items-start md:mb-0 md:flex-row md:items-center">
                          <a href="https://flowbite.com/" className="mb-2 flex items-center border-gray-200 dark:border-gray-600 md:mb-0 md:mr-4 md:border-r md:pr-4">
                            <img src="https://flowbite.com/docs/images/logo.svg" className="mr-2 h-6" alt="Flowbite Logo" />
                            <span className="self-center whitespace-nowrap text-lg font-semibold dark:text-white md:pr-6">{item.title}</span>
                          </a>
                          <p className="flex items-center text-sm font-normal text-gray-500 dark:text-gray-400">({item?.timeLimit} Minutes)</p>
                        </div>
                        <div className="flex flex-shrink-0 items-center gap-1">
                          <Link href={`/dashboard/viewQuiz/courses/answerQuiz/${item?.id}`}>
                            <Button>AnswerQuestion</Button>
                          </Link>
                        </div>
                      </div>
                    </Banner>
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
