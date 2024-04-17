'use client'
import { breakpoints } from '@/app/config/breakpoints'
import { useAddQuestion } from '@/app/utilities/storage/quiz/useAddQuestion'
import { useDeleteQuestion } from '@/app/utilities/storage/quiz/useDeleteQuestion'
import { useGetSubjectById } from '@/app/utilities/storage/quiz/useGetSubjectById'
import { Badge, Banner, Button } from 'flowbite-react'
import Link from 'next/link'
import { useParams } from 'next/navigation'
import React, { useEffect, useState } from 'react'
import { useMediaQuery } from 'usehooks-ts'
import { isTimeStatus, timeStatus } from '@/app/utilities/storage/quiz/useQuestionTimeInfo'
import Countdown from 'react-countdown'

const Page = () => {
  const params = useParams<{
    id: string
  }>()

  const { fetchData, data } = useGetSubjectById()
  const { sendData, data: addQuestionData } = useAddQuestion()
  const { data: dataDeleteQuestion } = useDeleteQuestion()

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

  const [list, setList] = useState<any>([])
  useEffect(() => {
    const getList = async () => {
      if (!data?.subject?.Question) {
        return
      }

      const promises = data?.subject?.Question?.map(async (item: any, index: number) => {
        const response = await fetch(`/api/v1/QUIZ/studentAnswer/${item?.id}`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          },
        })
        const result = await response.json()

        let totalPoints = 0
        await item.childQuestion.forEach((childQuestion: any) => {
          childQuestion.questionBody.forEach((body: any) => {
            totalPoints += body.answer.reduce((acc: any, curr: any) => acc + curr.point, 0)
          })
        })

        return (
          <div key={index} className="">
            <Banner className="w-full mt-3">
              <div className="flex w-full flex-col justify-between rounded-lg border border-gray-100 bg-white p-4 shadow-sm dark:border-gray-600 dark:bg-gray-700 md:flex-row">
                <div className=" mb-3 mr-4 flex flex-col items-start md:mb-0 md:flex-row md:items-center">
                  <a href="#" className="mb-2 flex items-center border-gray-200 dark:border-gray-600 md:mb-0 md:mr-4 md:border-r md:pr-4">
                    <span className="self-center whitespace-nowrap text-lg font-semibold dark:text-white md:pr-6">
                      ({index + 1}) {item.title}
                    </span>
                  </a>

                  <Badge color="gray" className='mx-2'><p className="flex items-center text-sm font-normal text-gray-500 dark:text-gray-400">{timeStatus(item?.timeStart, item?.timeEnd)}</p></Badge>
                  <Badge color="info" className='mx-2'><p className="px-3"> {result?.studentAnswer?.totalScore === undefined ? "[Does not participate]" : result?.studentAnswer?.isCheckedByLecturer === true ? `SCORE : ${result?.studentAnswer?.totalScore}/${totalPoints}` : isTimeStatus(item?.timeStart, item?.timeEnd) === "ONGOING" ? "[Ongoing]" : "[Score submitted. Pending review from lecturer.]"}</p></Badge>
                </div>
                <div className="flex flex-shrink-0 items-center gap-1">
                  {isTimeStatus(item?.timeStart, item?.timeEnd) === 'ONGOING' ? (
                    <Link href={`/dashboard/viewQuiz/courses/answerQuiz/${item?.id}`}>
                      <Button>AnswerQuestion</Button>
                    </Link>
                  ) : (
                    ''
                  )}
                </div>
              </div>
            </Banner>
          </div>
        )
      })

      // Wait for all promises to resolve
      const resolvedList = await Promise?.all(promises)
      setList(resolvedList)
    }

    if (data) {
      getList()
    }
  }, [data])

  return (
    <div className={`${!isDesktop ? 'px-24' : 'px-0'}`}>
      <div className="justify-center px-4  border rounded-lg  bg-white shadow-lg py-5">
        <div className="overflow-x-auto">
          <div className="flex flex-row py-5">
            <div className="w-1/2 font-medium ">
              <p className="underline decoration-1 ">Quiz List [{data?.subject?.title}]</p>
            </div>
          </div>

          <div>
            <div className="">
              {/* {data?.subject?.Question?.map((item: any, index: number) => {
                return (
                  <div key={index} className="">
                    <Banner className="w-full mt-3">
                      <div className="flex w-full flex-col justify-between rounded-lg border border-gray-100 bg-white p-4 shadow-sm dark:border-gray-600 dark:bg-gray-700 md:flex-row">
                        <div className=" mb-3 mr-4 flex flex-col items-start md:mb-0 md:flex-row md:items-center">
                          <a href="#" className="mb-2 flex items-center border-gray-200 dark:border-gray-600 md:mb-0 md:mr-4 md:border-r md:pr-4">
                            <span className="self-center whitespace-nowrap text-lg font-semibold dark:text-white md:pr-6">
                              ({index + 1}) {item.title}
                            </span>
                          </a>
                          <p className="flex items-center text-sm font-normal text-gray-500 dark:text-gray-400">{timeStatus(item?.timeStart, item?.timeEnd)}</p>
                        </div>
                        <div className="flex flex-shrink-0 items-center gap-1">
                          {isTimeStatus(item?.timeStart, item?.timeEnd) === 'ONGOING' ? (
                            <Link href={`/dashboard/viewQuiz/courses/answerQuiz/${item?.id}`}>
                              <Button>AnswerQuestion</Button>
                            </Link>
                          ) : (
                            ''
                          )}
                        </div>
                      </div>
                    </Banner>
                  </div>
                )
              })} */}

              {list?.map((item: any, index: number) => {
                return item
              })}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Page
