
'use client';

import { useDeleteSubject } from '@/app/utilities/storage/quiz/useDeleteSubject';
import { Button, Modal } from 'flowbite-react';
import { useRouter } from 'next/navigation';
import { useState } from 'react';

export function DeleteSubjectModal(props : any) {
  const [openModal, setOpenModal] = useState(false);
  const { sendData : deleteQuestion } = useDeleteSubject();
  const router = useRouter()


  const doDeleteQuestion = () => {
    const postData = {
        subjectId: props.subjectId
    }

    setOpenModal(false)
    deleteQuestion(postData)
    router.push('/dashboard/viewQuiz/quizCreation')
  }

  return (
    <>
      <button className='btn' onClick={() => setOpenModal(true)}>Delete Subject</button>
      <Modal show={openModal} onClose={() => setOpenModal(false)}>
        <Modal.Header>Delete Subject</Modal.Header>
        <Modal.Body>
          <div className="space-y-6">
            <p className="text-base leading-relaxed text-gray-500 dark:text-gray-400">
              Confirm Delete Subject?
            </p>
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button onClick={() => doDeleteQuestion()}>I accept</Button>
          <Button color="gray" onClick={() => setOpenModal(false)}>
            Decline
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}
