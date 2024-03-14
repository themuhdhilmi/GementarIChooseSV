'use client'
import { useAddAnswerMCQ } from '@/app/utilities/storage/quiz/MCQ/useAddAnswerMCQ'
import { useAddDummyAnswerMCQ } from '@/app/utilities/storage/quiz/MCQ/useAddDummyAnswerMCQ'
import { useDeleteAnswerMCQ } from '@/app/utilities/storage/quiz/MCQ/useDeleteAnswerMCQ'
import { useUpdateChildQuestion } from '@/app/utilities/storage/quiz/useUpdateChildQuestion'
import { useUpdateChildQuestionBodyMCQ } from '@/app/utilities/storage/quiz/MCQ/useUpdateChildQuestionBodyMCQ'
import React, { useEffect, useState } from 'react'
import Answer from './MCQ/Answer'
import { useDeleteDummyAnswerMCQ } from '@/app/utilities/storage/quiz/MCQ/useDeleteDummyAnswerMCQ'
import DummyAnswer from './MCQ/DummyAnswer'

const MultiChoiceQuestion = (props: any) => {
  const [canEditLabel, setCanEditLabel] = useState(false)
  const [canEditQuestion, setCanEditQuestion] = useState(false)
  const [label, setLabel] = useState(props?.label)
  const [question, setQuestion] = useState(props?.questionBody[0]?.string)
  const { sendData } = useUpdateChildQuestion()
  const { sendData: sendDataMCQQuestion } = useUpdateChildQuestionBodyMCQ()
  const { sendData: sendAddAnswerMCQ } = useAddAnswerMCQ()
  const { sendData: sendDeleteAnswerMCQ } = useDeleteAnswerMCQ()
  const { sendData: sendAddDummyAnswerMCQ } = useAddDummyAnswerMCQ()
  const { sendData: sendDeleteDummyAnswerMCQ } = useDeleteDummyAnswerMCQ()

  const doEditLabel = () => {
    const postData = {
      childQuestionId: props?.questionId,
      label: label,
    }

    sendData(postData)
    setCanEditLabel(false)
  }

  const doEditQuestion = () => {
    const postData = {
      childQuestionId: props?.questionId,
      questionString: question,
    }

    sendDataMCQQuestion(postData)
    setCanEditQuestion(false)
  }

  const doAddDummyAnswer = () => {
    const postData = {
      childQuestionId: props?.questionId,
    }

    sendAddDummyAnswerMCQ(postData)
  }

  const doAddAnswer = () => {
    const postData = {
      childQuestionId: props?.questionBody[0]?.id,
    }

    sendAddAnswerMCQ(postData)
  }

  const doDeleteAnswer = (id: string) => {
    const postData = {
      answerStringId: id,
    }

    sendDeleteAnswerMCQ(postData)
  }

  const doDeleteDummyAnswer = (id: string) => {
    const postData = {
      answerStringDummyId: id,
    }

    sendDeleteDummyAnswerMCQ(postData)
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
        <div className="flex flex-row w-full">
          <div className="flex-none">Question</div>
          <div className="flex flex-row-reverse w-full">
            <button onClick={() => setCanEditQuestion(!canEditQuestion)} className="btn btn-xs rounded-lg">
              Edit
            </button>
          </div>
        </div>
        {canEditQuestion ? (
          <div className="flex flex-row my-2">
            <div className="flex w-full">
              <input type="text" value={question} onChange={(e) => setQuestion(e.target.value)} placeholder={props?.questionBody[0]?.string} className="input input-bordered w-full" />
            </div>
            <div className="flex-none w-32">
              <button onClick={doEditQuestion} className="btn w-full">
                Confirm
              </button>
            </div>
          </div>
        ) : (
          <div className="flex flex-row my-2">
            <div className="flex w-full">{props?.questionBody[0]?.string}</div>
          </div>
        )}
      </div>
      <div className="bg-slate-50 p-3">
        <div className="flex flex-row w-full">
          <div className="flex-none">Answer</div>
          <div className="flex flex-row-reverse w-full">
            <button onClick={() => doAddAnswer()} className="btn btn-xs rounded-lg">
              Add
            </button>
          </div>
        </div>
        {props?.questionBody?.map((item: any, index: number) => {
          return (
            <div key={index}>
              <div className="flex flex-row w-full py-1">
                <div className="w-full">
                  {item?.answer?.map((item: any, index: number) => {
                    return (
                      <div key={index} className="flex w-full">
                        <Answer string={item?.string} point={item?.point} doDeleteAnswer={doDeleteAnswer} id={item?.id} />
                      </div>
                    )
                  })}
                </div>
              </div>
            </div>
          )
        })}
      </div>
      <div className="bg-slate-50 p-3">
        <div className="flex flex-row w-full ">
          <div className="flex-none">Dummy Answer</div>
          <div className="flex flex-row-reverse w-full">
            <button className="btn btn-xs rounded-lg" onClick={() => doAddDummyAnswer()}>
              Add
            </button>
          </div>
        </div>
        {props?.answerDummy?.map((item: any, index: number) => {


          return (
            <div key={index} className="flex w-full">
              <DummyAnswer string={item?.string} point={item?.point} doDeleteAnswer={doDeleteDummyAnswer} id={item?.id} />
            </div>
          )
        })}
      </div>
      {/* <div className="bg-slate-50 p-3">
        <div>Total Score [{props?.questionBody[0]?.answer.reduce((acc: any, currentValue: any) => acc + currentValue.point, 0)}]</div>
      </div> */}
    </div>
  )
}

export default MultiChoiceQuestion
