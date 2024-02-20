'use client'
import React from 'react'
import { useGetsessions } from '../utilities/storage/user/useGetSessions'
import { usePutSessions } from '../utilities/storage/user/usePutSessions'
import { useSetSessions } from '../utilities/storage/user/useSetSessions'
import { useUserInformation } from '../utilities/storage/user/useUserInformation'
import { useAddStudent } from '../utilities/storage/student/useAddStudent'
import { useDeleteStudent } from '../utilities/storage/student/useDeleteStudent'
import { useGetStudent } from '../utilities/storage/student/useGetStudent'
import { useGetStudents } from '../utilities/storage/student/useGetStudents'
import { useStudentApplySupervisor } from '../utilities/storage/student/useStudentApplySupervisor'
import { useAddLecturer } from '../utilities/storage/lecturer/useAddLecturer'
import { useDeleteLecturer } from '../utilities/storage/lecturer/useDeleteLecturer'
import { useGetLecturer } from '../utilities/storage/lecturer/useGetLecturer'
import { useGetLecturers } from '../utilities/storage/lecturer/useGetLecturers'
import { useGetLecturersPerSession } from '../utilities/storage/lecturer/useGetLecturersPerSession'
import { useAddStudentMember } from '../utilities/storage/student/useAddStudentMember'
import { useUpdateStudentMember } from '../utilities/storage/student/useUpdateStudentMember'
import { useUpdateStudent } from '../utilities/storage/student/useUpdateStudent'
import { useAddStudentTitle } from '../utilities/storage/student/useAddStudentTitle'
import { useUpdateStudentTitle } from '../utilities/storage/student/useUpdateStudentTitle'

const LoadingLeftBottom = () => {
  const { loading: loading1 } = useGetsessions()
  const { loading: loading2 } = usePutSessions()
  const { loading: loading3 } = useSetSessions()
  const { loading: loading4 } = useUserInformation()
  const { loading: loading5 } = useAddStudent()
  const { loading: loading6 } = useDeleteStudent()
  const { loading: loading7 } = useGetStudent()
  const { loading: loading8 } = useGetStudents()
  const { loading: loading9 } = useStudentApplySupervisor()
  const { loading: loading10 } = useAddLecturer()
  const { loading: loading11 } = useDeleteLecturer()
  const { loading: loading12 } = useGetLecturer()
  const { loading: loading13 } = useGetLecturers()
  const { loading: loading14 } = useGetLecturersPerSession()
  const { loading: loading15 } = useGetsessions()
  const { loading: loading16 } = useGetsessions()
  const { loading: loading17 } = useGetsessions()
  const { loading: loading18 } = useGetsessions()
  const { loading: loading19 } = useGetsessions()
  const { loading: loading20 } = useGetsessions()
  const { loading: loading21 } = useGetsessions()
  const { loading: loading22 } = useGetsessions()
  const { loading: loading23 } = useAddStudentMember()
  const { loading: loading24 } = useUpdateStudentMember()
  const { loading: loading25 } = useUpdateStudent()
  const { loading: loading26 } = useAddStudentTitle()
  const { loading: loading27 } = useUpdateStudentTitle()

  if (loading1 || loading2 || loading3 || loading4 || loading5 || loading6 || loading7 || loading8 || loading9 || loading10 || loading11 || loading12 || loading13 || loading14 || loading15 || loading16 || loading17 || loading18 || loading19 || loading20 || loading21 || loading22 || loading23 || loading24 || loading25 || loading26 || loading27) {
    return (
      <>
        <div
          style={{
            position: 'fixed',
            bottom: 0,
            left: 0,
            zIndex: 10,
          }}
          className="bg-red-800 opacity-35 rounded-lg m-4 p-5"
        >
          <span className="loading loading-ring loading-lg text-white"></span>
        </div>
      </>
    )
  }
}

export default LoadingLeftBottom
