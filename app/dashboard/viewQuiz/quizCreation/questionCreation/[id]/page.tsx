'use client'
import { useAddQuestion } from '@/app/utilities/storage/quiz/useAddQuestion'
import { useGetSubject } from '@/app/utilities/storage/quiz/useGetSubject'
import { useGetSubjectById } from '@/app/utilities/storage/quiz/useGetSubjectById'
import Link from 'next/link'
import { useParams } from 'next/navigation'
import React, { useEffect, useState } from 'react'

const Page = () => {
  const params = useParams<{
    id: string
  }>()

  const { fetchData, data } = useGetSubjectById()
  const { sendData, data: addQuestionData } = useAddQuestion()

  const [title, setTitle] = useState('')
  const [timer, setTimer] = useState(30)

  useEffect(() => {
    fetchData(decodeURIComponent(params.id))
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [addQuestionData])

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
    <div>
      <div>This is QUESTION CHAPTER for SUBJECT {data?.subject?.title}</div>
      <div>
        <input value={timer} onChange={(e: any) => setTimer(parseInt(e.target.value))}></input>
        <input value={title} onChange={(e) => setTitle(e.target.value)}></input>{' '}
        <button onClick={() => addSubject()} className="btn ">
          ADD
        </button>
      </div>

      {data?.subject?.Question?.map((item: any, index: number) => {
        return (
          <div className="my-3" key={index}>
            {item?.title}
            <Link href={`/dashboard/viewQuiz/quizCreation/questionCreation/childQuestionCreation/${item?.id}`}>
              <button className="btn ">VIEW</button>
            </Link>
          </div>
        )
      })}
    </div>
  )
}

export default Page
