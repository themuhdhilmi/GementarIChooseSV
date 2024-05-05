'use client'

import { useUpdatePassword } from '@/app/utilities/storage/user/useUpdatePassword'
import { useUserInformation } from '@/app/utilities/storage/user/useUserInformation'
import { Button, Checkbox, Label, Modal, TextInput } from 'flowbite-react'
import { useEffect, useState } from 'react'

export function OneTimePassword() {
  const { data, role } = useUserInformation()
  const [openModal, setOpenModal] = useState(false)
  const [password, setPassword] = useState('')
  const { sendData, data: updatePasswordData } = useUpdatePassword()

  function onCloseModal() {
    setOpenModal(false)
  }

  const changePassword = () => {
    const postData = {
      id: data?.user?.id,
      password: password,
    }
    sendData(postData)
  }

  useEffect(() => {
    if (data?.user?.hasChangeOneTimePassword === false) {
      if (role === 'ADMIN') {
        return
      }

      setOpenModal(true)
    } else {
      setOpenModal(false)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data, updatePasswordData])

  return (
    <>
      <Modal id={'modalPassword'} show={openModal} size="md" data-backdrop="static" popup>
        <Modal.Body className="pt-9">
          <div className="space-y-6">
            <h3 className="text-xl font-medium text-gray-900 dark:text-white">Change Your Password</h3>
            <div>
              <div className="mb-2 block">
                <Label htmlFor="password" value="Your password" />
              </div>
              <TextInput id="password" value={password} onChange={(e) => setPassword(e.target.value)} type="password" required />
            </div>

            <div className="w-full">
              <Button onClick={changePassword}>Confirm Change Password</Button>
            </div>
          </div>
        </Modal.Body>
      </Modal>
    </>
  )
}
