'use client'
import { useAddSubject } from '@/app/utilities/storage/quiz/useAddSubject'
import { useGetSubject } from '@/app/utilities/storage/quiz/useGetSubject'
import Link from 'next/link'
import React, { useEffect, useState } from 'react'

const Page = () => {
  const { fetchData: fetchDataGetSubject, data: dataGetSubject } = useGetSubject()
  const { sendData: sendDataAddSubject, data: dataAddSubject } = useAddSubject()

  const [titleSubject, setTitleSubject] = useState('')

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
    <div>
      <div>
      This is SUBJECT LIST
      </div>
      <div>
        <input value={titleSubject} onChange={(e) => setTitleSubject(e.target.value)}></input> <button  onClick={() => addSubject()} className="btn ">ADD</button>
      </div>
      {dataGetSubject?.subject?.map((item: any, index: number) => {
        return <div className='my-3' key={index}>{item.title}

        <Link href={`/dashboard/admin/quizCreation/questionCreation/${item?.id}`}><button className="btn ">VIEW</button></Link>
        </div>
      })}
    </div>
  )
}

export default Page
