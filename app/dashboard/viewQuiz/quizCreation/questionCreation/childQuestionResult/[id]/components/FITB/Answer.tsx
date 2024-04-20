'use client'
import { useUpdateAnswerFITB } from '@/app/utilities/storage/quiz/FITB/useUpdateAnswerFITB'
import React, { useState } from 'react'

const Answer = (props : any) => {
  const [arrayAnswer, setArrayAnswer] = useState<any[]>(props?.questionBody[0]?.answer ?? [])
  const [inputString, setInputString] = useState<string>()
  const { sendData } = useUpdateAnswerFITB();

  function parseString(str: string) {
    const parts = str.split(/\[answer\((.*?)\)\]\[score\((.*?)\)\]/)
    const result = []

    for (let i = 1; i < parts.length; i += 3) {
      const answer = parts[i]
      const score = parts[i + 1]
      const textBefore = parts[i - 1]
      const textAfter = parts[i + 2] || ''

      result.push({
        string: answer,
        point: score,
        stringBefore: i === 1 ? textBefore : '',
        stringAfter: textAfter,
      })
    }
    return result
  }

  const onTextChane = (txt: string) => {
    setInputString(txt)
    setArrayAnswer(parseString(txt))
  }

  const updateFITBAnswer = () => {

    const postData = {
      childQuestionId: props?.questionId,
      arrayOfAnswer: arrayAnswer,
    }

    sendData(postData)
  }

  return (
    <div className="w-full">
      {/* {JSON.stringify(props?.questionBody[0]?.answer)} */}
      <div className="flex flex-col w-full ">
        <div className="flex flex-row flex-wrap gap-1 mt-7 p-4 rounded border bg-white">
          {arrayAnswer.map((item : any, index : number) => (
            <>
              <p className=" ">{item?.stringBefore}</p>
              <p className="underline ">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</p>
              <p className=" ">[{item?.point} Score]</p>
              <p className=" ">{item?.stringAfter}</p>
            </>
          ))}
        </div>
        <div className="flex flex-row flex-wrap gap-1 mb-7 p-4 rounded border bg-white">
          {arrayAnswer.map((item : any, index : number) => (
            <>
              <div className="badge badge-outline">
                {item?.string}({item?.point})
              </div>
            </>
          ))}
        </div>
        <div className="w-full ">
          <textarea placeholder="Ahmad love to eat [answer(ice cream)][score(1)]. On the next [answer(day)][score(1)] Ahmad [answer(bougth)][score(2)] the same ice-cream for Amy." value={inputString} onChange={(e) => onTextChane(e.target.value)} className="input input-bordered w-full h-52" />
        </div>
      </div>
      <div className="flex flex-row-reverse w-full">
        <button onClick={() => updateFITBAnswer()} className="btn">Submit</button>
      </div>
    </div>
  )
}

export default Answer
