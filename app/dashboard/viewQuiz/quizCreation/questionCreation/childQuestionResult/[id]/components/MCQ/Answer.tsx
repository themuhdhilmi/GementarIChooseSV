'use client'
import { useUpdateAnswerMCQ } from '@/app/utilities/storage/quiz/MCQ/useUpdateAnswerMCQ'
import React, { useState } from 'react'

const Answer = (props: any) => {
  const { sendData } = useUpdateAnswerMCQ()
  const [canEdit, setCanEdit] = useState(false)
  const [answer, setAnswer] = useState(props.string)
  const [point, setPoint] = useState(props.point)

  const editAnswer = () => {
    const postData = {
      answerStringId: props?.id,
      answerString: answer,
      point: parseInt(point),
    }

    sendData(postData)
    setCanEdit(false)
  }

  return (
    <div className="flex w-full">
      {canEdit ? <input type="text" value={answer} onChange={(e) => setAnswer(e.target.value)} placeholder={props.string} className="input input-bordered w-full" /> : <div className="basis-4/6">{props.string}</div>}
      {canEdit ? <input type="number" value={point} onChange={(e) => setPoint(e.target.value)} placeholder={props.point} className="input input-bordered w-full" /> : <div className="basis-1/6">[{props.point}] Score</div>}
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

export default Answer
