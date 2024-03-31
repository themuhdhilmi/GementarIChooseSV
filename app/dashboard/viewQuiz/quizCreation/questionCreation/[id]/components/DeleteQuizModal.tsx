
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
        <Modal.Header>Terms of Service</Modal.Header>
        <Modal.Body>
          <div className="space-y-6">
            <p className="text-base leading-relaxed text-gray-500 dark:text-gray-400">
              With less than a month to go before the European Union enacts new consumer privacy laws for its citizens,
              companies around the world are updating their terms of service agreements to comply.
            </p>
            <p className="text-base leading-relaxed text-gray-500 dark:text-gray-400">
              The European Union’s General Data Protection Regulation (G.D.P.R.) goes into effect on May 25 and is meant
              to ensure a common set of data rights in the European Union. It requires organizations to notify users as
              soon as possible of high-risk data breaches that could personally affect them.
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
