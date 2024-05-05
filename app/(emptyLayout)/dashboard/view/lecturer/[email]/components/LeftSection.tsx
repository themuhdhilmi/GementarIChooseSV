/* eslint-disable @next/next/no-img-element */
import React from 'react'

const LeftSection = (props : any) => {

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
        <p>015-4878312</p>
        <div className="card-actions">
          <button className="btn">Academic Qualification</button>
        </div>
      </div>
    </div>

    <div className="card w-80 bg-base-100 shadow-xl">
      <div className="card-body items-center text-center">
        <h2 className="card-title">EXPERTISE</h2>
        <p>Game Development</p>
        <p>Web Development</p>
        <p>Software Development</p>
      </div>
    </div>
  </div>
  )
}

export default LeftSection