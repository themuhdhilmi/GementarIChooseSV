'use client'

import { Button, Modal } from 'flowbite-react'
import { useState } from 'react'
import Datetime from 'react-datetime'
import 'react-datetime/css/react-datetime.css'
import DateTimePicker from 'react-datetime-picker'
import 'react-datetime-picker/dist/DateTimePicker.css'
import 'react-calendar/dist/Calendar.css'
import 'react-clock/dist/Clock.css'
import { useUpdateQuestion } from '@/app/utilities/storage/quiz/useUpdateQuestion'

export function ChangeDateModal(props: any) {
  const [openModal, setOpenModal] = useState(false)
  const { sendData } = useUpdateQuestion()

  const [value, onChange] = useState<any>(new Date(props.timeStart))
  const [valueEnd, onChangeEnd] = useState<any>(new Date(props.timeEnd))

  const changeTime = () => {

    const postData = {
      questionId: props.questionId,
      timeStart: value,
      timeEnd: valueEnd,
    }

    sendData(postData)

    setOpenModal(false)
  }

  return (
    <>
      <Button onClick={() => setOpenModal(true)}>Set Time</Button>
      <Modal show={openModal} onClose={() => setOpenModal(false)}>
        <Modal.Header>Edit Time</Modal.Header>
        <Modal.Body className="pb-72">
          <div className="space-y-6">
            <div>Start Date Time</div>
            <div>
              <DateTimePicker onChange={onChange} value={value} />
            </div>
            <div>End Date Time</div>

            <div>
              <DateTimePicker onChange={onChangeEnd} value={valueEnd} />
            </div>
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button onClick={() => changeTime()}>Submit</Button>
          <Button color="gray" onClick={() => setOpenModal(false)}>
            Decline
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  )
}
