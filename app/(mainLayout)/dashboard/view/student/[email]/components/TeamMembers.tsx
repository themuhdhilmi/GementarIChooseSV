'use client'
import HereIsEmpty from '@/app/(mainLayout)/components/HereIsEmpty'
import { useAddStudentMember } from '@/app/utilities/storage/student/useAddStudentMember'
import { useUpdateStudentMember } from '@/app/utilities/storage/student/useUpdateStudentMember'
import React, { useEffect, useState } from 'react'

const TeamMembers = (props: any) => {
  const [editTeamMember, setEditTeamMember] = useState(99)

  const [emailLead, setEmailLead] = useState('')
  const [name, setName] = useState('')
  const [matricNumber, setMatricNumber] = useState('')
  const { sendData: sendAddStudentMember } = useAddStudentMember()
  const { sendData: sendUpdateStudentMember } = useUpdateStudentMember()
  const items = ['Item 1', 'Item 2', 'Item 3', 'Item 4', 'Item 5', 'Item 6', 'Item 7', 'Item 8', 'Item 9', 'Item 10']

  useEffect(() => {
    setEmailLead(props.selectViewUser?.email)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [props.selectViewUser?.email])

  const sendDataMember = (e: any) => {
    if (e === 'None') {
      if (name === 'None' && matricNumber === 'None') {
      } else {
        const postData = {
          emailLead: emailLead,
          name: name,
          matricNumber: matricNumber,
        }
        sendAddStudentMember(postData)
      }
    } else {
      const postData = {
        emailLead: emailLead,
        name: name,
        matricNumber: e,
        newMatricNumber: matricNumber,
      }

      sendUpdateStudentMember(postData)
    }
  }

  return (
    <div className="overflow-x-auto rounded-lg shadow-lg mb-2">
      <div className="badge font-bold w-full rounded-t-lg bg-blue-950 text-white">Team Members</div>
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
              <th>Matric Number</th>
            </tr>
          </thead>
          <tbody>
            {items.map((item: any, index: number) => {
              let quota = props?.selectViewUser?.studentInformation?.memberQuota ?? props?.selectViewUser?.studentInformation?.SessionYear?.globalMemberQuota ?? 0

              if (index - 1 >= props.selectViewUser?.studentInformation?.Member?.length) {
                return null
              }

              if (index >= quota) {
                return null
              }

              if (editTeamMember === index) {
                return (
                  <tr key={index}>
                    {!props.isDesktop ? <th className="w-4">{index + 1}</th> : null}
                    <td>
                      <input
                        value={name}
                        // onClick={}
                        onChange={(e: any) => {
                          setName(e.target.value)
                        }}
                        type="text"
                        placeholder="Hilmi Azmi"
                        className="input input-bordered w-full max-w-xs rounded-lg input-xs"
                      />
                    </td>
                    <td>
                      <input
                        value={matricNumber}
                        // onClick={}
                        onChange={(e: any) => {
                          setMatricNumber(e.target.value)
                        }}
                        type="text"
                        placeholder="01DDT20F1122"
                        className="input input-bordered w-full max-w-xs rounded-lg input-xs"
                      />
                    </td>
                    <td className="flex flex-row-reverse">
                      <button onClick={() => setEditTeamMember(99)} className="btn btn-sm text-white bg-red-700 rounded-lg">
                        Cancel
                      </button>
                      <button
                        onClick={() => {
                          setEditTeamMember(99)
                          sendDataMember(props.selectViewUser?.studentInformation?.Member[index]?.matricNumber ?? 'None')
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
                  <td>{props.selectViewUser?.studentInformation?.Member[index]?.name ?? 'None'}</td>
                  <td>{props.selectViewUser?.studentInformation?.Member[index]?.matricNumber ?? 'None'}</td>
                  {props.canEdit ? (
                    <td className="flex flex-row-reverse">
                      {props?.selectViewUser?.studentInformation?.lecturerAcceptedStudent === 'ACCEPTED' ? (
                        ''
                      ) : (
                        <button
                          onClick={() => {
                            setEditTeamMember(index)
                            setName(props.selectViewUser?.studentInformation?.Member[index]?.name ?? 'None')
                            setMatricNumber(props.selectViewUser?.studentInformation?.Member[index]?.matricNumber ?? 'None')
                          }}
                          className="btn btn-sm text-white bg-blue-950 rounded-lg"
                        >
                          Edit
                        </button>
                      )}
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

export default TeamMembers
