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
import { DeleteQuizModal } from './components/DeleteQuizModal'
import 'react-datetime/css/react-datetime.css'
import { ChangeDateModal } from './components/ChangeDateModal'
import { useUpdateQuestion } from '@/app/utilities/storage/quiz/useUpdateQuestion'
import { formatTime, formatTimeDifference, timeStatus } from '@/app/utilities/storage/quiz/useQuestionTimeInfo'
import { DeleteSubjectModal } from './components/DeleteSubjectModal'

const Page = () => {
  const params = useParams<{
    id: string
  }>()

  const { fetchData, data } = useGetSubjectById()
  const { sendData, data: addQuestionData } = useAddQuestion()
  const { data: dataDeleteQuestion } = useDeleteQuestion()
  const { data: useUpdateQuestionData } = useUpdateQuestion()

  const [value, onChange] = useState<any>(new Date())

  const [title, setTitle] = useState('')
  const [timer, setTimer] = useState(0)

  const isDesktop = useMediaQuery(`(max-width: ${breakpoints.desktop})`)

  useEffect(() => {
    fetchData(decodeURIComponent(params.id))
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [addQuestionData, dataDeleteQuestion, useUpdateQuestionData])

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
        <div className="overflow-x-auto ">
          <div className="flex flex-row py-5">
            <div className="w-1/2 font-medium ">
              <p className="underline decoration-1 ">Quiz List [{data?.subject?.title}]</p>
            </div>
          </div>

          <div>
            <div className=" flex flex-row-reverse">

            <label className="form-control ml-2">
                <div className="label">
                  <span className="label-text-alt">&nbsp;</span>
                </div>
                <DeleteSubjectModal subjectId={params.id}/>
                <div className="label"></div>
              </label>

              <label className="form-control">
                <div className="label">
                  <span className="label-text-alt">&nbsp;</span>
                </div>
                <button onClick={() => addSubject()} className="btn ">
                  ADD
                </button>
                <div className="label"></div>
              </label>

              <label className="form-control w-full max-w-xs">
                <div className="label">
                  <span className="label-text-alt">&nbsp;</span>
                </div>
                <input placeholder="Title" className="input input-bordered w-full max-w-xs rounded-l-lg" value={title} onChange={(e) => setTitle(e.target.value)}></input>
                <div className="label"></div>
              </label>
            </div>
            <div className="">
              {data?.subject?.Question?.map((item: any, index: number) => {
                return (
                  <div key={index} className="">
                    <Banner className="w-full mt-3">
                      <div className="flex w-full flex-col justify-between rounded-lg border border-gray-100 bg-white p-4 shadow-sm dark:border-gray-600 dark:bg-gray-700 md:flex-row">
                        <div className=" mb-3 mr-4 flex flex-col items-start md:mb-0 md:flex-row md:items-center">
                          <a href="#" className="mb-2 flex items-center border-gray-200 dark:border-gray-600 md:mb-0 md:mr-4 md:border-r md:pr-4">
                            <span className="self-center whitespace-nowrap text-lg font-semibold dark:text-white md:pr-6">({index + 1}) {item.title}</span>
                          </a>
                          <p className="flex items-center text-sm font-normal text-gray-500 dark:text-gray-400">[{formatTime(item?.timeStart)}</p>
                          &nbsp;-&nbsp;
                          <p className="flex items-center text-sm font-normal text-gray-500 dark:text-gray-400">{formatTime(item?.timeEnd)}]</p>
                          &nbsp;
                          <p className="flex items-center text-sm font-normal text-gray-500 dark:text-gray-400">Duration : {formatTimeDifference(new Date(item?.timeStart), new Date(item?.timeEnd))}</p>
                          &nbsp;
                          <p className="flex items-center text-sm font-normal text-gray-500 dark:text-gray-400">{timeStatus(item?.timeStart, item?.timeEnd)}</p>
                        </div>

                        <div className="flex flex-shrink-0 items-center gap-1">
                          <ChangeDateModal questionId={item?.id} timeEnd={item?.timeEnd} timeStart={item?.timeStart} />
                          <Link href={`/dashboard/viewQuiz/quizCreation/questionCreation/childQuestionCreation/${item?.id}`}>
                            <Button>VIEW</Button>
                          </Link>
                          <DeleteQuizModal questionId={item?.id} />
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
