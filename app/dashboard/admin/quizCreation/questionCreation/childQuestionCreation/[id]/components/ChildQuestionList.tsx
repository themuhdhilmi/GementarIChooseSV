'use client'
import { Accordion } from 'flowbite-react'
import MultiChoiceQuestion from './MultiChoiceQuestion'
import { useDeleteChildQuestion } from '@/app/utilities/storage/quiz/useDeleteChildQuestion'
import { useSortChildQuestion } from '@/app/utilities/storage/quiz/useSortChildQuestion'
import EssayQuestion from './EssayQuestion'
import FillInTheBlank from './FillInTheBlank'

export function ChildQuestionList(props: any) {
  const { sendData } = useDeleteChildQuestion()
  const { sendData: sendDataSort } = useSortChildQuestion()

  const deleteChildQuestion = (id: any) => {
    const postData = {
      childQuestionId: id,
    }

    sendData(postData)
  }

  const sortChildQuestion = (id: string, isGoingUp: boolean, questionId: string) => {
    const postData = {
      questionId: questionId,
      childQuestionId: id,
      isGoingUp: isGoingUp,
    }

    sendDataSort(postData)
  }

  return (
    <div className="bg-white">
      <Accordion alwaysOpen>
        {props?.childQuestion?.map((item: any, index: number) => {
          const totalPoints = item?.questionBody.reduce((acc: any, currentValue: any) => {
            const pointsFromAnswers = currentValue.answer.reduce((subAcc: any, answer: any) => subAcc + answer.point, 0)
            return acc + pointsFromAnswers
          }, 0)

          return (
            <Accordion.Panel key={index}>
              <Accordion.Title>
                {index + 1} {item?.label ?? 'Empty label'} [{item?.questionType}]  [Total Score : {totalPoints}]
              </Accordion.Title>
              <Accordion.Content>
                {item?.questionType === "MULTI_CHOICE" ? <MultiChoiceQuestion questionId={item?.id} label={item?.label ?? 'Empty label'} questionBody={item?.questionBody} answerDummy={item?.answerDummy} /> : ''}
                {item?.questionType === "ESSAY" ? <EssayQuestion totalPoints={totalPoints} questionId={item?.id} label={item?.label ?? 'Empty label'} item={item} questionBody={item?.questionBody} /> : ''}
                {item?.questionType === "FILL_IN_THE_BLANKS" ? <FillInTheBlank totalPoints={totalPoints} questionId={item?.id} label={item?.label ?? 'Empty label'} item={item} questionBody={item?.questionBody} answerDummy={item?.answerDummy} /> : ''}
                <div className="flex flex-row-reverse py-3 px-3 gap-1">
                  <div>
                    <button
                      onClick={() => {
                        deleteChildQuestion(item?.id)
                      }}
                      className="btn btn-xs bg-blue-500 text-white rounded-lg"
                    >
                      Delete
                    </button>
                  </div>
                  <div>
                    <button onClick={() => sortChildQuestion(item?.id, true, props?.questionId)} className="btn btn-xs rounded-lg">
                      UP
                    </button>
                  </div>
                  <div>
                    <button onClick={() => sortChildQuestion(item?.id, false, props?.questionId)} className="btn btn-xs rounded-lg">
                      DOWN
                    </button>
                  </div>
                </div>
              </Accordion.Content>
            </Accordion.Panel>
          )
        })}
      </Accordion>
    </div>
  )
}
