/* eslint-disable @next/next/no-img-element */
import React from 'react'

const RightSection = (props: any) => {
  const filterRESEARCH = props?.lecturerData?.lecturer?.LecturerInformation?.LecturerBiographyInfo.filter((item: any) => item.LecturerBiographyInfoType === 'RESEARCH')
  const filterPUBLICATION = props?.lecturerData?.lecturer?.LecturerInformation?.LecturerBiographyInfo.filter((item: any) => item.LecturerBiographyInfoType === 'PROCEEDING' || item.LecturerBiographyInfoType === 'OTHERS' || item.LecturerBiographyInfoType === 'SUPERVISION')

  const totalCount = filterPUBLICATION?.length + filterRESEARCH?.length
  return (
    <div className="stats stats-vertical shadow ">
      <div className="w-full flex justify-center p-2">
        <img src="/images/logo_puo.png" alt="Shoes" className="max-w-32" />
      </div>
      <div className="stat">
        <div className="stat-title">Research</div>
        <div className="stat-value">{filterRESEARCH?.length === 0 ? '0' : filterRESEARCH?.length}</div>
      </div>

      <div className="stat">
        <div className="stat-title">Publication</div>
        <div className="stat-value">{filterPUBLICATION?.length === 0 ? '0' : filterPUBLICATION?.length}</div>
      </div>

      <div className="stat">
        <div className="stat-title">Total</div>
        <div className="stat-value">{totalCount}</div>
      </div>
    </div>
  )
}

export default RightSection
