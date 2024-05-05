'use client'
import LoadingLeftBottom from '@/app/(mainLayout)/components/LoadingLeftBottom'
import { useDeleteLecturer } from '@/app/utilities/storage/lecturer/useDeleteLecturer'
import { Button, Modal } from 'flowbite-react'
import { useState } from 'react'
import { HiOutlineExclamationCircle } from 'react-icons/hi'
import { RiDeleteBinLine } from 'react-icons/ri'
const UseDeleteLecturer = (props: any) => {
  const [openModal, setOpenModal] = useState(false)
  const { deleteLecturer, loading } = useDeleteLecturer()

  if (loading) {
    return <LoadingLeftBottom />
  }

  const processDeleteLecturer = () => {
    deleteLecturer(props.id)

    setOpenModal(false)
  }
  return (
    <>
      <button onClick={() => setOpenModal(true)} className="btn rounded-lg bg-red-600 hover:bg-red-800 text-white btn-sm">
        <div>
          <RiDeleteBinLine />
        </div>
      </button>

      <Modal show={openModal} size="md" onClose={() => setOpenModal(false)} popup>
        <Modal.Header />
        <Modal.Body>
          <div className="text-center">
            <HiOutlineExclamationCircle className="mx-auto mb-4 h-14 w-14 text-gray-400 dark:text-gray-200" />
            <h3 className="mb-5 text-lg font-normal text-gray-500 dark:text-gray-400">Are you sure you want to delete {props.email}</h3>
            <div className="flex justify-center gap-4">
              <Button color="failure" onClick={() => processDeleteLecturer()}>
                {"Yes, I'm sure"}
              </Button>
              <Button color="gray" onClick={() => setOpenModal(false)}>
                No, cancel
              </Button>
            </div>
          </div>
        </Modal.Body>
      </Modal>
    </>
  )
}

export default UseDeleteLecturer
