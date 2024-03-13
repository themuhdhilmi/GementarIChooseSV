'use client'
import { breakpoints } from '@/app/config/breakpoints'
import { useGetsessions } from '@/app/utilities/storage/user/useGetSessions'
import React, { useEffect } from 'react'
import { useMediaQuery } from 'usehooks-ts'
import SessionManager from './components/SessionManager'
import { useSetSessions } from '@/app/utilities/storage/user/useSetSessions'
import { usePutSessions } from '@/app/utilities/storage/user/usePutSessions'

const Page = () => {
  const isDesktop = useMediaQuery(`(max-width: ${breakpoints.desktop})`)
  const { loading, fetchData, data: sessions } = useGetsessions()
  const { data: setSessionsData, loading: setLoading } = useSetSessions()
  const { data: putSessionsData, putSessionsGlobalMemberQuota, putSessionsGLobalTitleQuota, putSessionsGlobalSupervisorQuota, putSessionsGlobalFinalPresentationDate, loading: putLoading } = usePutSessions()

  useEffect(() => {
    fetchData()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  useEffect(() => {
    fetchData()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [setSessionsData, putSessionsData, putLoading])

  // if (loading) {
  //   return <LoadingLeftBottom />;
  // }

  return (
    <div className={`${!isDesktop ? 'px-24' : 'px-0'}`}>
      <div>
        <div>
          <SessionManager
            sessionList={sessions.sessionsList}
            sessilnSelected={sessions.sessionSelected}
            putSessionsGlobalMemberQuota={putSessionsGlobalMemberQuota}
            putSessionsGlobalFinalPresentationDate={putSessionsGlobalFinalPresentationDate}
            putSessionsGLobalTitleQuota={putSessionsGLobalTitleQuota}
            putSessionsGlobalSupervisorQuota={putSessionsGlobalSupervisorQuota}
          />
        </div>
      </div>
    </div>
  )
}

export default Page
