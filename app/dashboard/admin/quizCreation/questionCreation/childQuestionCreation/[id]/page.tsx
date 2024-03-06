'use client'
import { useAddQuestion } from '@/app/utilities/storage/quiz/useAddQuestion'
import { useGetQuestionById } from '@/app/utilities/storage/quiz/useGetQuestionById'
import { useGetSubject } from '@/app/utilities/storage/quiz/useGetSubject'
import { useGetSubjectById } from '@/app/utilities/storage/quiz/useGetSubjectById'
import Link from 'next/link'
import { useParams } from 'next/navigation'
import React, { useEffect, useState } from 'react'
import { ChildQuestionList } from './components/ChildQuestionList'

const Page = () => {
  const params = useParams<{
    id: string
  }>()

  const { fetchData, data } = useGetQuestionById()
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
      {JSON.stringify(data)}


      <ChildQuestionList/>
    </div>
  )
}

export default Page
