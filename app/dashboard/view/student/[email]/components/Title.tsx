'use client'
import HereIsEmpty from '@/app/components/HereIsEmpty'
import { useAddStudentTitle } from '@/app/utilities/storage/student/useAddStudentTitle'
import React, { useEffect, useState } from 'react'
import { useUpdateStudentTitle } from '../../../../../utilities/storage/student/useUpdateStudentTitle'
import { useUploadStudentPoster } from '@/app/utilities/storage/student/useUploadStudentPoster'
import { toast } from 'react-toastify'
import Link from 'next/link'

const Title = (props: any) => {
  const [editTeamTitle, setEditTeamTitle] = useState(99)
  const [pdfPoster, setPdfPoster] = useState({})
  const [emailLead, setEmailLead] = useState('')
  const [name, setName] = useState('')
  const [matricTitleId, setMatricTitleId] = useState('')
  const { sendData: sendAddStudentTitle } = useAddStudentTitle()
  const { sendData: sendUpdateStudentTitle } = useUpdateStudentTitle()
  const { sendData: sendUploadStudentPoster } = useUploadStudentPoster()
  const items = ['Item 1', 'Item 2', 'Item 3', 'Item 4', 'Item 5', 'Item 6', 'Item 7', 'Item 8', 'Item 9', 'Item 10']

  useEffect(() => {
    setEmailLead(props.selectViewUser?.email)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [props.selectViewUser?.email])

  const sendDataTitle = (e: any) => {
    if (matricTitleId === '') {
      if (e === 'None' && name === 'None') {
        return
      }
      const postData = {
        emailLead: emailLead,
        name: name,
      }
      sendAddStudentTitle(postData)
    } else {
      const postData = {
        emailLead: emailLead,
        name: name,
        projectTitleId: matricTitleId,
      }

      sendUpdateStudentTitle(postData)
    }
  }

  const [file, setFile] = useState<File | null>(null)
  const [titleId, setTitleId] = useState('')

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    if (!file) return

    try {
      sendUploadStudentPoster(file, props?.selectViewUser?.email, titleId)
    } catch (e: any) {
      // Handle errors here
      console.error(e)
    }
  }

  return (
    <div className="overflow-x-auto rounded-lg shadow-lg mb-2">
      <div className="badge font-bold w-full rounded-t-lg bg-blue-950 text-white">Project Title</div>
      {/* {props.selectViewUser?.studentInformation?.ProjectTitle?.length === 0 ? ( */}
      {false ? (
        <div className="py-6">
          <HereIsEmpty />
        </div>
      ) : (
        <table className="table table-zebra">
          <thead>
            <tr>
              <th></th>
              <th>Name</th>
              <th>Poster</th>
            </tr>
          </thead>
          <tbody>
            {items.map((item: any, index: number) => {
              let quota = props?.selectViewUser?.studentInformation?.titleQuota ?? props?.selectViewUser?.studentInformation?.SessionYear?.globalTitleQuota ?? 0

              if (index - 1 >= props.selectViewUser?.studentInformation?.ProjectTitle?.length) {
                return null
              }

              if (index >= quota) {
                return null
              }

              if (editTeamTitle === index) {
                return (
                  <tr key={index}>
                    {!props.isDesktop ? <th className="w-4">{index + 1}</th> : null}
                    <td>
                      {props.selectViewUser?.studentInformation?.ProjectTitle[index]?.name === 'None' ? (
                        <input
                          value={name}
                          onChange={(e: any) => {
                            setName(e.target.value)
                          }}
                          type="text"
                          placeholder="Name"
                          className="input input-bordered w-full max-w-xs rounded-lg input-xs"
                        />
                      ) : (
                        ''
                      )}

                      {props.selectViewUser?.studentInformation?.ProjectTitle[index]?.name !== 'None' ? (
                        <input
                          value={'Waiting for poster upload..'}
                          onChange={(e: any) => {
                            setName('None')
                          }}
                          type="text"
                          placeholder="Name"
                          className="input input-bordered w-full max-w-xs rounded-lg input-xs"
                          disabled
                        />
                      ) : (
                        ''
                      )}
                    </td>
                    <td>
                      <div>
                        <form onSubmit={onSubmit}>
                          <div className="join">
                            <div>
                              <div>
                                <input
                                  className="file-input file-input-ghost w-full max-w-xs rounded-l-lg"
                                  type="file"
                                  name="file"
                                  required
                                  onChange={(e: any) => {
                                    setTitleId(props.selectViewUser?.studentInformation?.ProjectTitle[index]?.id)
                                    setFile(e.target.files?.[0])
                                  }}
                                />
                              </div>
                            </div>
                            <div className="indicator">
                              <input className="btn join-item rounded-r-lg bg-blue-950 text-white" type="submit" value="Upload" />
                            </div>
                          </div>
                        </form>
                      </div>
                    </td>
                    <td className="flex flex-row-reverse">
                      <button onClick={() => setEditTeamTitle(99)} className="btn btn-sm text-white bg-red-700 rounded-lg">
                        Cancel
                      </button>
                      <button
                        onClick={() => {
                          setEditTeamTitle(99)
                          setMatricTitleId(props.selectViewUser?.studentInformation?.ProjectTitle[index]?.id ?? '')
                          sendDataTitle(props.selectViewUser?.studentInformation?.ProjectTitle[index]?.matricTitleId ?? 'None')
                        }}
                        className="btn btn-sm text-white bg-blue-950 rounded-lg mr-1"
                      >
                        Confirm
                      </button>
                    </td>
                  </tr>
                )
              }

              return (
                <tr key={index}>
                  {!props.isDesktop ? <th className="w-4">{index + 1}</th> : null}
                  <td>{props.selectViewUser?.studentInformation?.ProjectTitle[index]?.name ?? 'None'}</td>
                  <td className=" "><div className='flex flex-row-reverse'>{props.selectViewUser?.studentInformation?.ProjectTitle[index] == null ? 'None' : <Link className='btn btn-sm text-white bg-blue-950 rounded-lg' href={'https://storage.ichoosesv.gementar.com/gementar/storage/file/' + props.selectViewUser.studentInformation.ProjectTitle[index].id + '.pdf'}>View Poster</Link>}</div></td>
                  {props.canEdit && props.isMemberCompleted ? (
                    <td className="w-6">
                      <div>
                      {props?.selectViewUser?.studentInformation?.lecturerAcceptedStudent === 'ACCEPTED' ? (
                        ''
                      ) : (
                        <button
                          onClick={() => {
                            setEditTeamTitle(index)
                            setName(props.selectViewUser?.studentInformation?.ProjectTitle[index]?.name ?? 'None')
                            setMatricTitleId(props.selectViewUser?.studentInformation?.ProjectTitle[index]?.id ?? '')
                          }}
                          className="btn btn-sm text-white bg-blue-950 rounded-lg"
                        >
                          Edit
                        </button>
                      )}
                      </div>
                    </td>
                  ) : (
                    ''
                  )}
                </tr>
              )
            })}
          </tbody>
        </table>
      )}
    </div>
  )
}

export default Title
