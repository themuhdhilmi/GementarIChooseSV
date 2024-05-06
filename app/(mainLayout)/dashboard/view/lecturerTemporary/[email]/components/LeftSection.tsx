/* eslint-disable @next/next/no-img-element */
import React from 'react'

const LeftSection = () => {
  return (
    <div className="overflow-x-auto">
    <div className="flex flex-row py-5">
      <div className="w-1/2 font-medium ">{/* <p className="underline decoration-1">Feeds News & Update</p> */}</div>
    </div>
    <div className="card w-96 bg-base-100 shadow-xl">
      <figure className="px-10 pt-10">
        <img src="/images/profile.jpg" alt="Shoes" className="rounded-xl" />
      </figure>
      <div className="card-body items-center text-center">
        <h2 className="card-title">AFIFAH NAILAH BINTI MUHAMAD</h2>
        <p>Head of Department of Gementar Team</p>
        <p>hilmi@gementar.com</p>
        {/* <p>015-4878312</p> */}
        <div className="card-actions">
          <button className="btn">Academic Qualification</button>
        </div>
      </div>
    </div>

    <div className="card w-96 bg-base-100 shadow-xl">
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