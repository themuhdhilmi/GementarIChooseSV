'use client'

import { Alert, Button, Card, Modal } from 'flowbite-react'
import { useState } from 'react'
import 'react-datetime/css/react-datetime.css'
import 'react-datetime-picker/dist/DateTimePicker.css'
import 'react-calendar/dist/Calendar.css'
import 'react-clock/dist/Clock.css'
import { HiInformationCircle } from 'react-icons/hi'
import DropDownEssayScore from './DropDownEssayScore'
import { useUpdateIsCheckByLecturerTrue } from '@/app/utilities/storage/quiz/useUpdateIsCheckByLecturerTrue'

export function ViewScorePerAnswer(props: any) {
  const [openModal, setOpenModal] = useState(false)

  const { sendData } = useUpdateIsCheckByLecturerTrue()
  const onConfirmScore = () => {

    const postData = {
      id : props.id
    }
    sendData(postData)

    setOpenModal(false)
  }

  const getCantSubmit = props?.arrayAnswerList?.filter((item: any) => item.score === -1).length

  return (
    <>
      <Button onClick={() => setOpenModal(true)}>View</Button>
      <Modal show={openModal} onClose={() => setOpenModal(false)}>
        <Modal.Header>View Student Answer</Modal.Header>
        <Modal.Body className="pb-72">
          <div className="space-y-6">
            {props?.arrayAnswerList?.map((item: any, index: number) => {
              if (item.essayResult === null) {
                return (
                  <div key={index}>
                    <Card className="w-full">
                      <h5 className="text-md font-bold tracking-tight text-gray-900 dark:text-white">{item?.title}</h5>
                      <p className="text-sm font-normal text-gray-700 dark:text-gray-400">
                        Score : {item?.score}/{item?.totalScore}
                      </p>
                    </Card>
                  </div>
                )
              } else {
                return (
                  <div key={index}>
                    <Card className="w-full">
                      <h5 className="text-md font-bold tracking-tight text-gray-900 dark:text-white">{item?.title}</h5>
                      {item?.score >= 0 ? <p className="text-sm font-normal text-gray-700 dark:text-gray-400">Score : {item?.score}/{item?.totalScore}</p> : <p className="text-sm font-normal text-gray-700 dark:text-gray-400">Total Score : {item?.totalScore}</p>}
                      <p className="font-normal text-gray-700 dark:text-gray-400">{item?.essayResult}</p>
                      <DropDownEssayScore item={item} studentAnswerId={props.id}/>
                    </Card>
                  </div>
                )
              }
            })}
          </div>
        </Modal.Body>
        <Modal.Footer>
          {/* <Button disabled={getCantSubmit > 0 ? true : false} onClick={() => onConfirmScore()}>
            Submit
          </Button> */}
          <Button color="gray" onClick={() => setOpenModal(false)}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  )
}
