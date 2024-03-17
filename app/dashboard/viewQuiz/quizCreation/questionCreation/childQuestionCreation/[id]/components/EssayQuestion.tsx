'use client'
import { useUpdateChildQuestion } from '@/app/utilities/storage/quiz/useUpdateChildQuestion'
import React, { useState } from 'react'
import SetScore from './ESSAY/SetScore'

const EssayQuestion = (props: any) => {
  const [canEditLabel, setCanEditLabel] = useState(false)

  const [label, setLabel] = useState(props?.label)
  const { sendData } = useUpdateChildQuestion()

  const doEditLabel = () => {
    const postData = {
      childQuestionId: props?.questionId,
      label: label,
    }

    sendData(postData)
    setCanEditLabel(false)
  }
  return (
    <div className="flex flex-col gap-2">
      <div className="bg-slate-50 p-3">
        <div className="flex flex-row w-full">
          <div className="flex-none">Label</div>
          <div className="flex flex-row-reverse w-full">
            <button onClick={() => setCanEditLabel(!canEditLabel)} className="btn btn-xs rounded-lg">
              Edit
            </button>
          </div>
        </div>

        {canEditLabel ? (
          <div className="flex flex-row my-2">
            <div className="flex w-full">
              <input type="text" value={label} onChange={(e) => setLabel(e.target.value)} placeholder={props?.label} className="input input-bordered w-full" />
            </div>
            <div className="flex-none w-32">
              <button onClick={doEditLabel} className="btn w-full">
                Confirm
              </button>
            </div>
          </div>
        ) : (
          <div className="flex flex-row my-2">
            <div className="flex w-full">{props?.label}</div>
          </div>
        )}
      </div>

      <div className="bg-slate-50 p-3">
        <div className="flex flex-row w-full ">
          <div className="flex-none">Score</div>
          <div className="flex flex-row-reverse w-full">
            <button className="btn btn-xs rounded-lg" onClick={() => {}}>
              Add
            </button>
          </div>
        </div>
        <div className="flex w-full">
          <SetScore childQuestionId={props?.item?.id} point={props?.totalPoints}/>
        </div>
      </div>

    </div>  
  )
}

export default EssayQuestion
