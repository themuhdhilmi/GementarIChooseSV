'use client'
import { breakpoints } from '@/app/config/breakpoints'
import React, { useEffect, useState } from 'react'
import { useMediaQuery } from 'usehooks-ts'
import TeamMembers from './TeamMembers'
import Title from './Title'
import SideInfo from './SideInfo'
import Supervisor from './Supervisor'
import EditQuota from './EditQuota'
import ResetPassword from './ResetPassword'

const UseGetStudent = (props: any) => {
  const isDesktop = useMediaQuery(`(max-width: ${breakpoints.desktop})`)
  const isMobile = useMediaQuery(`(max-width: ${breakpoints.mobile})`)
  const [editQuota, setEditQuota] = useState(false)
  const [resetPassword, setResetPassword] = useState(false)

  const studentProgress = {
    memberQuota: props?.selectViewUser?.studentInformation?.memberQuota ?? props?.selectViewUser?.studentInformation?.SessionYear?.globalMemberQuota ?? 0,
    titleQuota: props?.selectViewUser?.studentInformation?.titleQuota ?? props?.selectViewUser?.studentInformation?.SessionYear?.globalTitleQuota ?? 0,
    currentMemberQuota: props?.selectViewUser?.studentInformation?.Member.length,
    currentTitleQuota: props?.selectViewUser?.studentInformation?.ProjectTitle.length,
    isMemberCompleted: (props?.selectViewUser?.studentInformation?.memberQuota ?? props?.selectViewUser?.studentInformation?.SessionYear?.globalMemberQuota ?? 0) <= props?.selectViewUser?.studentInformation?.Member.length,
    isTitleCompleted: (props?.selectViewUser?.studentInformation?.titleQuota ?? props?.selectViewUser?.studentInformation?.SessionYear?.globalTitleQuota ?? 0) <= props?.selectViewUser?.studentInformation?.ProjectTitle.length,
    supervisorStatus: props.selectViewUser?.studentInformation?.lecturerAcceptedStudent,
  }

  return (
    <div className="mb-5 ">
      <div className="stats shadow"></div>
      <div className="justify-center px-4 pb-10  border rounded-lg  bg-white shadow-lg">
        <div className="overflow-x-auto">
          <div className="flex flex-row py-5">
            <div className="w-1/2 font-medium ">
              <p className="underline decoration-1">Students Info</p>
            </div>
            <div className="flex gap-2 py-1 flex-row-reverse w-1/2">
              <button onClick={props.funcCloseAll} className="btn btn-sm bg-red-600 rounded-lg hover:bg-red-800 text-white">
                CLOSE
              </button>
              {props.canEditAdmin ? (
                <button onClick={() => setResetPassword(!resetPassword)} className={`btn btn-sm  rounded-lg text-white ${resetPassword ? 'bg-red-700' : 'bg-blue-950'} `}>
                  Reset Password
                </button>
              ) : (
                ''
              )}
              {props.canEditAdmin ? (
                <button onClick={() => setEditQuota(!editQuota)} className={`btn btn-sm  rounded-lg text-white ${editQuota ? 'bg-red-700' : 'bg-blue-950'} `}>
                  Edit Quota
                </button>
              ) : (
                ''
              )}
            </div>
          </div>
          <div className={`flex ${!isDesktop ? 'flex-row' : 'flex-col'} flex-wrap `}>
            <SideInfo
              isMemberCompleted={studentProgress.isMemberCompleted}
              isTitleCompleted={studentProgress.isTitleCompleted}
              isSupervisorAccepted={studentProgress.supervisorStatus === 'ACCEPTED'}
              isSupervisorDeclined={studentProgress.supervisorStatus === 'DECLINED'}
              isSupervisorRequested={studentProgress.supervisorStatus === 'REQUESTED'}
              selectViewUser={props.selectViewUser}
              isDesktop={isDesktop}
              canEdit={props.canEdit}
            />
            <div className={`${!isDesktop ? 'w-3/4 ' : 'w-full '}  px-4 `}>
              {/* <ul className="steps w-full">
                {studentProgress.isMemberCompleted ? (
                  <li data-content="✓" className="step step-neutral">
                    Team Member
                  </li>
                ) : (
                  <li data-content="✕" className="step step-secondary">
                    Team Member
                  </li>
                )}
                {studentProgress.isTitleCompleted ? (
                  <li data-content="✓" className="step step-neutral">
                    Project Title
                  </li>
                ) : (
                  <li data-content="✕" className="step step-secondary">
                    Project Title
                  </li>
                )}
                {isDesktop ? (
                  ''
                ) : studentProgress.supervisorStatus === 'REQUESTED' || studentProgress.supervisorStatus === 'DECLINED' || studentProgress.supervisorStatus === 'ACCEPTED' ? (
                  <li data-content="✓" className="step step-neutral">
                    Waiting for approval
                  </li>
                ) : (
                  <li data-content="✕" className="step step-secondary">
                    Waiting for approval
                  </li>
                )}
                {isDesktop ? (
                  ''
                ) : studentProgress.supervisorStatus === 'DECLINED' || studentProgress.supervisorStatus === 'ACCEPTED' ? (
                  <li data-content="✕" className="step step-neutral">
                    Rejected
                  </li>
                ) : (
                  <li data-content="✕" className="step step-secondary">
                    Rejected
                  </li>
                )}
                {studentProgress.supervisorStatus === 'ACCEPTED' ? (
                  <li data-content="✓" className="step step-neutral">
                    Accepted
                  </li>
                ) : (
                  <li data-content="✕" className="step step-secondary">
                    Accepted
                  </li>
                )}
              </ul> */}

              {editQuota ? <EditQuota selectViewUser={props.selectViewUser} isDesktop={isDesktop} canEdit={props.canEdit} /> : ''}

              {resetPassword ? <ResetPassword selectViewUser={props.selectViewUser} isDesktop={isDesktop} canEdit={props.canEdit} /> : ''}

              <TeamMembers selectViewUser={props.selectViewUser} isDesktop={isDesktop} canEdit={props.canEdit} />
              <Title isMemberCompleted={studentProgress.isMemberCompleted} selectViewUser={props.selectViewUser} isDesktop={isDesktop} canEdit={props.canEdit} />
              <Supervisor isTitleCompleted={studentProgress.isTitleCompleted} isMemberCompleted={studentProgress.isMemberCompleted} selectViewUser={props.selectViewUser} isDesktop={isDesktop} canEdit={props.canEdit} />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default UseGetStudent
