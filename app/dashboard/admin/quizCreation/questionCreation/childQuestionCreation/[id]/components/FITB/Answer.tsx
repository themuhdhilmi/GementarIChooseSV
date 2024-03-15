'use client'
import { Label } from 'flowbite-react'
import React, { useState } from 'react'

const Answer = () => {
  const [arrayAnswer, setArrayAnswer] = useState<any[]>([])
  const [inputString, setInputString] = useState<string>()

  function parseString(str : string) {
    const parts = str.split(/\[answer\((.*?)\)\]\[score\((.*?)\)\]/);
    const result = [];
    
    for (let i = 1; i < parts.length; i += 3) {
        const answer = parts[i];
        const score = parts[i + 1];
        const textBefore = parts[i - 1];
        const textAfter = parts[i + 2] || '';
        
        result.push({
            answer: answer,
            score: score,
            text_before: i === 1 ? textBefore : '',
            text_after: textAfter
        });
    }
    return result;
}

  const onTextChane = (txt: string) => {
    setInputString(txt)
    setArrayAnswer(parseString(txt))
  }

  return (
    <div className='w-full'>
      <div className="flex flex-col w-full ">
        
        <div className="flex flex-row flex-wrap gap-1 mt-7 p-4 rounded border">
          {arrayAnswer.map((item, index) => (
            <>
              <p className=" ">{item?.text_before}</p>
              <p className="underline ">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</p>
              <p className=" ">[{item?.score} Score]</p>
              <p className=" ">{item?.text_after}</p>
            </>
          ))}
        </div>

        <div className="flex flex-row flex-wrap gap-1 mb-7 p-4 rounded border">
          {arrayAnswer.map((item, index) => (
            <>
              <div className="badge badge-outline">{item?.answer}({item?.score})</div>
            </>
          ))}
        </div>
        <div className="w-full ">
          <textarea placeholder='Ahmad love to eat [answer(ice cream)][score(1)]. On the next [answer(day)][score(1)] Ahmad [answer(bougth)][score(2)] the same ice-cream for Amy.'  value={inputString} onChange={(e) => onTextChane(e.target.value)} className="input input-bordered w-full h-52" />
        </div>
      </div>

      <div className='flex flex-row-reverse w-full'>
            <button className='btn'>
                Submit
            </button>
      </div>


    </div>
  )
}

export default Answer
