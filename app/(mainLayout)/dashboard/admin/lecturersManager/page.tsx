'use client'
import React, { useEffect, useState } from 'react'
import { useGetsessions } from '@/app/utilities/storage/user/useGetSessions'
import { breakpoints } from '@/app/config/breakpoints'
import { useMediaQuery } from 'usehooks-ts'
import LoadingLeftBottom from '@/app/(mainLayout)/components/LoadingLeftBottom'
import UseGetLecturers from './components/UseGetLecturers'
import UseAddLecturer from './components/UseAddLecturer'
import UseGetLecturer from './components/UseGetLecturer'

enum Drawer {
  NONE,
  ADD,
  ADD_BULK,
  VIEW,
}

const Page = () => {
  const isDesktop = useMediaQuery(`(max-width: ${breakpoints.desktop})`)
  const isMobileLandscape = useMediaQuery(`(max-width: ${breakpoints.mobileLandscape})`)
  const { data : sessions, loading, fetchData } = useGetsessions()
  const [selectedSession, setSelectedSession] = useState('')
  const [openDrawer, setOpenDrawer] = useState<Drawer>(Drawer.NONE)
  const [selectViewUser, setSelectViewUser] = useState<any>({})

  useEffect(() => {
    fetchData()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  useEffect(() => {
    setSelectedSession(sessions.sessionSelected?.id)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [sessions])

  const funcOpenAddLecturer = () => {
    setOpenDrawer(Drawer.ADD)
  }

  const funcOpenBulkAddLecturer = () => {
    setOpenDrawer(Drawer.ADD_BULK)
  }

  const funcCloseAll = () => {
    setOpenDrawer(Drawer.NONE)
  }

  const funcViewLecturer = () => {
    setOpenDrawer(Drawer.VIEW)
  }

  if (loading) {
    return <LoadingLeftBottom />
  }

  return (
    <div className={`${!isDesktop ? 'px-24' : 'px-0'}`}>
      {openDrawer === Drawer.NONE ? (
        <div className="grid grid-cols-1 gap-4">
          <div className="col-span-3">
            <UseGetLecturers funcViewLecturer={funcViewLecturer} funcOpenAddLecturer={funcOpenAddLecturer} funcOpenBulkAddLecturer={funcOpenBulkAddLecturer} setSelectViewUser={setSelectViewUser} />
          </div>
        </div>
      ) : (
        ''
      )}

      {openDrawer === Drawer.ADD ? (
        <div className={`grid ${isDesktop ? 'grid-cols-1' : 'grid-cols-4 gap-4'}  `}>
          <div className="col-span-1">
            <UseAddLecturer funcCloseAll={funcCloseAll} />
          </div>

          <div className={`${isDesktop ? '' : 'col-span-3'} `}>
            <UseGetLecturers funcViewLecturer={funcViewLecturer} funcOpenAddLecturer={funcOpenAddLecturer} funcOpenBulkAddLecturer={funcOpenBulkAddLecturer} setSelectViewUser={setSelectViewUser} />
          </div>
        </div>
      ) : (
        ''
      )}

      {openDrawer === Drawer.VIEW ? (
        <div>
          <UseGetLecturer selectViewUser={selectViewUser} funcCloseAll={funcCloseAll} />
        </div>
      ) : (
        ''
      )}

      {openDrawer === Drawer.ADD_BULK ? (
        <div className="grid grid-cols-4 gap-4">
          <div className="col-span-1">
            <UseAddLecturer funcCloseAll={funcCloseAll} />
          </div>

          <div className="col-span-3">
            <UseGetLecturers funcViewLecturer={funcViewLecturer} funcOpenAddLecturer={funcOpenAddLecturer} funcOpenBulkAddLecturer={funcOpenBulkAddLecturer} setSelectViewUser={setSelectViewUser} />
          </div>
        </div>
      ) : (
        ''
      )}
    </div>
  )
}

export default Page
