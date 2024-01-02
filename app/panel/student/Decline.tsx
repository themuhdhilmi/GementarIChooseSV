import React from 'react'

const Decline = () => {
  return (
    <div className="hero min-h-14  h-screen pb-7">
    <div className="hero-content text-center">
      <div className="max-w-md">
        <h1 className="text-5xl text-red-600 font-bold">DECLINED</h1>

        <div className="py-6">
        <div className="badge">Your request has been declined</div>
        <div>
        <button className="btn btn-active mt-10">Close this, and update request</button>
        </div>
        
        </div>
      </div>
    </div>
  </div>
  )
}

export default Decline