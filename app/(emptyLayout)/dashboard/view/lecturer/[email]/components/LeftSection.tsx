/* eslint-disable @next/next/no-img-element */
import React from 'react'

const LeftSection = (props: any) => {
  const expertiseArr = props?.lecturerData?.lecturer?.LecturerInformation?.expertise?.split(',') ?? []

  return (
    <div className="overflow-x-auto ">
      <div className="card w-80 bg-base-100 shadow-xl">
        <figure className="px-10 pt-10">
          <img src="/images/profile.jpg" alt="Shoes" className="rounded-xl" />
        </figure>
        <div className="card-body items-center text-center">
          <h2 className="card-title">{props?.lecturerData?.lecturer?.name}</h2>
          <p>{props?.lecturerData?.lecturer?.email}</p>
          <p>{props?.lecturerData?.lecturer?.LecturerInformation?.Track}</p>
          {(props?.lecturerData?.lecturer?.LecturerInformation?.scopusID ?? null) === null ? (
            ''
          ) : (
            <div className="card-actions">
              <button onClick={() => window.open(props?.lecturerData?.lecturer?.LecturerInformation?.scopusID, '_blank')} className="btn">
                Scopus ID
              </button>
            </div>
          )}

          {(props?.lecturerData?.lecturer?.LecturerInformation?.googleID ?? null) === null ? (
            ''
          ) : (
            <div className="card-actions">
              <button onClick={() => window.open(props?.lecturerData?.lecturer?.LecturerInformation?.googleID, '_blank')} className="btn">
                Google Scholar
              </button>
            </div>
          )}

          {(props?.lecturerData?.lecturer?.LecturerInformation?.wosID ?? null) === null ? (
            ''
          ) : (
            <div className="card-actions">
              <button onClick={() => window.open(props?.lecturerData?.lecturer?.LecturerInformation?.wosID, '_blank')} className="btn">
                Wos ID
              </button>
            </div>
          )}
        </div>
      </div>

      <div className="card w-80 bg-base-100 shadow-xl">
        <div className="card-body items-center text-center">
          <h2 className="card-title">EXPERTISE</h2>
          {expertiseArr?.map((item: any, index: number) => {
            return <div key={index}>{item}</div>
          })}
        </div>
      </div>
    </div>
  )
}

export default LeftSection
