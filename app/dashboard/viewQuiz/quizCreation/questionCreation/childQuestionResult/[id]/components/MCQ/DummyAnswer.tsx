'use client'
import { useUpdateAnswerMCQ } from '@/app/utilities/storage/quiz/MCQ/useUpdateAnswerMCQ'
import { useUpdateDummyAnswerMCQ } from '@/app/utilities/storage/quiz/MCQ/useUpdateDummyAnswerMCQ'
import React, { useState } from 'react'

const DummyAnswer = (props: any) => {
  const { sendData } = useUpdateDummyAnswerMCQ()
  const [canEdit, setCanEdit] = useState(false)
  const [answer, setAnswer] = useState(props.string)

  const editAnswer = () => {
    const postData = {
      answerStringDummyId: props?.id,
      answerString: answer,
    }

    sendData(postData)
    setCanEdit(false)
  }

  return (
    <div className="flex w-full">
      {canEdit ? <input type="text" value={answer} onChange={(e) => setAnswer(e.target.value)} placeholder={props.string} className="input input-bordered w-full" /> : <div className="basis-5/6">{props.string}</div>}
      {canEdit ? (
        <button onClick={() => editAnswer()} className="btn ">
          Confirm
        </button>
      ) : (
        ''
      )}

      <div className="basis-1/6">
        <div className="flex flex-row-reverse w-full gap-1 ">
          <button onClick={() => props.doDeleteAnswer(props?.id)} className="btn btn-xs bg-blue-500 text-white rounded-lg">
            Delete
          </button>
          <button onClick={() => setCanEdit(!canEdit!)} className="btn btn-xs rounded-lg">
            Edit
          </button>
        </div>
      </div>
    </div>
  )
}

export default DummyAnswer
