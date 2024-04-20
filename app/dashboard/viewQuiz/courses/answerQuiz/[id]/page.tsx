'use client'
import { breakpoints } from '@/app/config/breakpoints'
import { useParams, useRouter } from 'next/navigation'
import React, { useEffect } from 'react'
import { useMediaQuery } from 'usehooks-ts'
import { useGetQuestionById } from '@/app/utilities/storage/quiz/useGetQuestionById'
import AnswerMultiChoice from './components/AnswerMultiChoice'
import AnswerFITB from './components/AnswerFITB'
import AnswerEssay from './components/AnswerEssay'
import { useGetStudentAnswer } from '@/app/utilities/storage/quiz/studentAnswer/useGetStudentAnswer'
import { useCreateStudentAnswer } from '@/app/utilities/storage/quiz/studentAnswer/useCreateStudentAnswer'
import { useUpdateStudentAnswer } from '@/app/utilities/storage/quiz/studentAnswer/useUpdateStudentAnswer'
import { isTimeStatus, timeStatus } from '@/app/utilities/storage/quiz/useQuestionTimeInfo'
import { useUserInformation } from '@/app/utilities/storage/user/useUserInformation'
import Countdown from 'react-countdown'

const Page = () => {
  const params = useParams<{
    id: string
  }>()
  const { fetchData, data } = useGetQuestionById()
  const { data: user } = useUserInformation()
  const { sendData: sendDataGetStudentAnswer, data: dataGetStudentAnswer } = useGetStudentAnswer()
  const { sendData: sendCreateStudentAnswer, data: dataCreateStudentAnswer } = useCreateStudentAnswer()
  const { sendData: sendUpdateStudentAnswer, data: dataUpdateStudentAnswer } = useUpdateStudentAnswer()

  const router = useRouter();

  const isDesktop = useMediaQuery(`(max-width: ${breakpoints.desktop})`)

  useEffect(() => {
    fetchData(decodeURIComponent(params.id))
    sendDataGetStudentAnswer(params.id)

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dataCreateStudentAnswer, dataUpdateStudentAnswer])

  const startQuiz = () => {
    const postData = {
      userId: user?.user.id,
      questionId: params.id,
    }

    sendCreateStudentAnswer(postData)
  }

  if (dataGetStudentAnswer.isInteracted === false) {
    return (
      <div className={`${!isDesktop ? 'px-24' : 'px-0'}`}>
        <div className="justify-center px-4  border rounded-lg  bg-white shadow-lg py-5">
          <div className="overflow-x-auto">
            <div className="flex flex-row py-5">
              <div className="w-1/2 font-medium ">
                <p className="underline decoration-1 ">Answer Quiz</p>
              </div>
            </div>
            <div className="hero min-h-screen bg-base-200">
              <div className="hero-content text-center">
                <div className="max-w-md">
                  <h1 className="text-5xl font-bold">Quiz : {data?.subject?.title}</h1>
                  <p className="py-6">{timeStatus(data.subject?.timeStart, data.subject?.timeEnd)}</p>
                  {isTimeStatus(data.subject?.timeStart, data.subject?.timeEnd) === 'ONGOING' ? (
                    <>
                      <button className="btn btn-primary" onClick={() => startQuiz()}>
                        Start
                      </button>
                    </>
                  ) : (
                    ''
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }

  const answerTheQuestion = (childQuestionId : any, score : number, title : string, totalScore : number, essayResult : string) => {

    const postData = {
      addScore : score,
      childQuestionId : childQuestionId,
      userId: user?.user.id,
      questionId: params.id,
      title: title,
      score: score,
      totalScore: totalScore,
      essayResult: essayResult
    }

    sendUpdateStudentAnswer(postData)
    window.location.reload()
  }

  const getUnansweredQuestion = () => {
    for (let index = 0; index < data?.subject?.childQuestion.length; index++) {
      const item = data?.subject?.childQuestion[index]

      const getUserAnsweredList = user?.user?.StudentAnswer?.find((x : any) => x.questionId === params.id);
      const getMatchDoneQuestion = getUserAnsweredList?.doneQuestion?.find((x : any) => x.id === item?.id);

      if(getMatchDoneQuestion != null) continue;


      if (item.questionType === 'MULTI_CHOICE') {
        return (
          <>
            <AnswerMultiChoice item={item} answerTheQuestion={answerTheQuestion} />
          </>
        )
      }

      if (item.questionType === 'FILL_IN_THE_BLANKS') {
        return (
          <>
            <AnswerFITB item={item} answerTheQuestion={answerTheQuestion} />
          </>
        )
      }

      if (item.questionType === 'ESSAY') {
        return (
          <>
            <AnswerEssay item={item} answerTheQuestion={answerTheQuestion} />
          </>
        )
      }
    }


    return (
      <div className='pt-5 w-full text-center'>
        There is no question left to answer, go to courses panel to view your marks after lecturer approval.
      </div>
    )
  }



  const questionTimeline = () => {
    return (
      <div className="flex flex-row w-full justify-center py-5">
        <div className="flex flex-row gap-2">
          {data?.subject?.childQuestion.map((item: any, index: number) => {
            if (item.questionBody.length <= 0) return

            const getUserAnsweredList = user?.user?.StudentAnswer?.find((x : any) => x.questionId === params.id);
            const getMatchDoneQuestion = getUserAnsweredList?.doneQuestion?.find((x : any) => x.id === item?.id);

            if(getMatchDoneQuestion != null) return (
              <div className="p-2 border bg-slate-400" key={index}>
              {index + 1}
            </div>
            );

              return (
                <div className="p-2 border" key={index}>
                  {index + 1}
                </div>
              )
          })}
        </div>
      </div>
    )
  }

  const renderer = ({ days, hours, minutes, seconds, completed } : any) => {
    if (completed) {
      // Render a completed state
      router.push('/dashboard/viewQuiz/courses')
    } else {
      // Render a countdown
      return <span>{days}d {hours}h {minutes}m {seconds}s</span>;
    }
  };

  return (
    <div className={`${!isDesktop ? 'px-24' : 'px-0'}`}>
      <div className="justify-center px-4  border rounded-lg  bg-white shadow-lg py-5">
        <div className="overflow-x-auto">
          <div className="flex flex-row py-5">
            <div className="w-1/2 font-medium ">
              <p className="underline decoration-1 ">Answer Quiz</p>
            </div>
          </div>
          {data?.subject?.timeEnd != null ? <p>Question end at <Countdown date={data?.subject?.timeEnd} renderer={renderer} onComplete={() => {router.push('/dashboard/viewQuiz/courses')}} /></p> : ""}
          {questionTimeline()}
          {getUnansweredQuestion()}
        </div>
      </div>
    </div>
  )
}

export default Page
