
'use client';

import { useDeleteQuestion } from '@/app/utilities/storage/quiz/useDeleteQuestion';
import { Button, Modal } from 'flowbite-react';
import { useState } from 'react';

export function DeleteQuizModal(props : any) {
  const [openModal, setOpenModal] = useState(false);
  const { sendData : deleteQuestion, data : dataDeleteQuestion } = useDeleteQuestion();


  const doDeleteQuestion = (questionId : string) => {
    const postData = {
      questionId: questionId
    }

    setOpenModal(false)
    deleteQuestion(postData)
  }

  return (
    <>
      <Button onClick={() => setOpenModal(true)}>Delete</Button>
      <Modal show={openModal} onClose={() => setOpenModal(false)}>
        <Modal.Header>Delete Quiz</Modal.Header>
        <Modal.Body>
          <div className="space-y-6">
            <p className="text-base leading-relaxed text-gray-500 dark:text-gray-400">
              Confirm delete quiz?
            </p>
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button onClick={() => doDeleteQuestion(props?.questionId)}>I accept</Button>
          <Button color="gray" onClick={() => setOpenModal(false)}>
            Decline
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}
