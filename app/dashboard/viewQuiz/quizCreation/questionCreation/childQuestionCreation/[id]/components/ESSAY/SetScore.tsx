'use client'
import { useUpdateScoreESSAY } from '@/app/utilities/storage/quiz/ESSAY/useUpdateScoreESSAY'
import { Label } from 'flowbite-react'
import React, { useState } from 'react'

const SetScore = (props: any) => {
  const { sendData } = useUpdateScoreESSAY();
  const [point, setPoint] = useState(props?.point)

  const updateScore = () => {
    const postData = {
      childQuestionId: props?.childQuestionId,
      point:  parseInt(point),
    }
    sendData(postData)
  }

  return (
    <div className="flex w-full">
      <div className="basis-5/6 ">
        <div className="mb-2 block">
          <Label htmlFor="countries" value="Set your score" />
        </div>
        <input value={point} type="number" onChange={(e) => setPoint(e.target.value)} placeholder={props?.label} className="input input-bordered w-full" />
      </div>

      <div className="basis-1/6 flex flex-col-reverse">
        <button onClick={() => updateScore()} className="btn ">Set</button>
      </div>
    </div>
  )
}

export default SetScore
