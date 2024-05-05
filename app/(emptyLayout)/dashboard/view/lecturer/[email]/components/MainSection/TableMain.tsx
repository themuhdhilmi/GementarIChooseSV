'use client'
import React, { useState } from 'react'

import { Badge, Button, Checkbox, Label, Modal, Select, Table, TextInput } from 'flowbite-react'
import { useDeleteLecturerInfo } from '@/app/utilities/storage/lecturer/information/useDeleteLecturerInfo'
import { useUpdateLecturerInfo } from '@/app/utilities/storage/lecturer/information/useUpdateLecturerInfo'
import { useAddLecturerInfoTag } from '@/app/utilities/storage/lecturer/information/useAddLecturerInfoTag'
import { useDeleteLecturerInfoTag } from '../../../../../../../utilities/storage/lecturer/information/useDeleteLecturerInfoTag'

const TableMain = (props: any) => {
  const { sendData } = useDeleteLecturerInfo()
  const { sendData: sendDataUpdateLecturerInfo } = useUpdateLecturerInfo()

  return (
    <div className="overflow-x-auto">
      <Table>
        <Table.Body className="divide-y">
          {props?.data?.map((item: any, index: number) => {
            return (
              <Table.Row key={index} className="bg-white dark:border-gray-700 dark:bg-gray-800">
                <Table.Cell className="whitespace-nowrap w-5 font-medium text-gray-900 dark:text-white">{index + 1}</Table.Cell>
                <Table.Cell className="w-full ">
                  <div className="flex flex-col w-full">
                    <div className="w-full font-bold">{item?.mainText === '' ? 'Empty text' : item?.mainText}</div>
                    {item.subText === null ? '' : <div className="w-full text-xs">{item.subText}</div>}

                    <div className="flex flex-row flex-wrap gap-1 pt-2">
                      {item?.LecturerBiographyInfoTag?.map((item: any, index: any) => {
                        let color = ''

                        if (item?.LecturerBiographyInfoTagColor === 'RED') {
                          color = 'failure'
                        }
                        if (item?.LecturerBiographyInfoTagColor === 'GREEN') {
                          color = 'success'
                        }
                        if (item?.LecturerBiographyInfoTagColor === 'BLUE') {
                          color = 'info'
                        }
                        if (item?.LecturerBiographyInfoTagColor === 'YELLOW') {
                          color = 'warning'
                        }
                        return (
                          <Badge key={index} className={`badge  gap-2`} color={color}>
                            {item?.text}
                          </Badge>
                        )
                      })}
                    </div>
                  </div>
                </Table.Cell>

                {props?.canEdit ? (
                  <Table.Cell className="flex flex-row-reverse">
                    <button
                      onClick={() => {
                        const postData = {
                          lecturerBiographyInfoID: item?.id,
                        }
                        sendData(postData)
                      }}
                      className="font-medium text-cyan-600 hover:underline dark:text-cyan-500"
                    >
                      Delete
                    </button>
                    <ModalEdit data={item} />
                  </Table.Cell>
                ) : (
                  ''
                )}
              </Table.Row>
            )
          })}
        </Table.Body>
      </Table>
    </div>
  )
}

export default TableMain

function ModalEdit(props: any) {
  const [openModal, setOpenModal] = useState(false)
  const { sendData: sendDataUpdateLecturerInfo } = useUpdateLecturerInfo()
  const { sendData: sendDataAddTag } = useAddLecturerInfoTag()
  const { sendData: sendDataDeleteTag } = useDeleteLecturerInfoTag()
  const [mainText, setMainText] = useState(props?.data?.mainText)
  const [subText, setSubText] = useState(props?.data?.subText)
  const [tagText, setTagText] = useState('')
  const [tagColor, setTagColor] = useState('RED')

  return (
    <>
      <button className="font-medium text-cyan-600 hover:underline dark:text-cyan-500 pr-1" onClick={() => setOpenModal(true)}>
        Edit
      </button>
      <Modal show={openModal} onClose={() => setOpenModal(false)}>
        <Modal.Header>Edit Info</Modal.Header>
        <Modal.Body>
          {/* {JSON.stringify(props.data)} */}
          <div className="space-y-6">
            <form className="flex w-full flex-col gap-4">
              <div>
                <div className="mb-2 block">
                  <Label htmlFor="email1" value="Title" />
                </div>
                <TextInput id="email1" value={mainText} type="text" placeholder="" required onChange={(e) => setMainText(e.target.value)} />
              </div>
              <div>
                <div className="mb-2 block">
                  <Label htmlFor="password1" value="Description (OPTIONAL)" />
                </div>
                <TextInput id="password1" value={subText} type="text" onChange={(e) => setSubText(e.target.value)} />
              </div>
              <div className="w-full flex flex-row-reverse">
                <Button
                  onClick={() => {
                    const updateData = {
                      lecturerBiographyInfoID: props?.data?.id,
                      mainText: mainText,
                      subText: subText,
                    }

                    sendDataUpdateLecturerInfo(updateData)
                  }}
                  className="w-fit"
                >
                  Submit
                </Button>
              </div>
            </form>
          </div>

          <div className="space-y-6">
            <div className="flex w-full flex-col gap-4">
              <div className="join">
                <div className="join-item">
                  <div className="mb-2 block">
                    <Label htmlFor="email1" value="Tag Text" />
                  </div>
                  <TextInput id="email1" value={tagText} type="text" placeholder="" required onChange={(e) => setTagText(e.target.value)} />
                </div>

                <div className="join-item">
                  <div className="mb-2 block">
                    <Label htmlFor="countries" value="Color" />
                  </div>
                  <Select id="countries" value={tagColor} onChange={(e) => setTagColor(e.target.value)} required>
                    <option value={'RED'}>RED</option>
                    <option value={'GREEN'}>GREEN</option>
                    <option value={'BLUE'}>BLUE</option>
                    <option value={'YELLOW'}>YELLOW</option>
                  </Select>
                </div>
              </div>

              <div className="w-full min-h-20 border rounded-lg flex flex-row flex-wrap gap-2 p-2">
                {props?.data?.LecturerBiographyInfoTag?.map((item: any, index: number) => {
                  // RED
                  // GREEN
                  // BLUE
                  // YELLOW

                  let color = ''

                  if (item?.LecturerBiographyInfoTagColor === 'RED') {
                    color = 'failure'
                  }
                  if (item?.LecturerBiographyInfoTagColor === 'GREEN') {
                    color = 'success'
                  }
                  if (item?.LecturerBiographyInfoTagColor === 'BLUE') {
                    color = 'info'
                  }
                  if (item?.LecturerBiographyInfoTagColor === 'YELLOW') {
                    color = 'warning'
                  }
                  return (
                    <Badge key={index} className={`badge  gap-2`} color={color}>
                      <button
                        onClick={() => {
                          const sendData = {
                            LecturerBiographyInfoTagID: item?.id,
                          }
                          sendDataDeleteTag(sendData)
                        }}
                      >
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" className="inline-block w-4 h-4 stroke-current">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path>
                        </svg>
                      </button>

                      {item?.text}
                    </Badge>
                  )
                })}
              </div>
              <div className="w-full flex flex-row-reverse">
                <Button
                  onClick={() => {
                    const updateData = {
                      lecturerBiographyInfoID: props?.data?.id,
                      text: tagText,
                      LecturerBiographyInfoTagColor: tagColor,
                    }

                    if (tagText === '') return

                    sendDataAddTag(updateData)
                  }}
                  className="w-fit"
                >
                  Submit
                </Button>
              </div>
            </div>
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button color="gray" onClick={() => setOpenModal(false)}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  )
}
