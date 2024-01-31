import React from 'react'

const LoadingLeftBottom = () => {
  return (
    <>
    <div className="absolute bottom-0 left-0 z-10 bg-white opacity-75 rounded-lg m-4 p-5">
      <span className="loading loading-ring loading-lg text-red-600"></span>
    </div>
  </>
  )
}

export default LoadingLeftBottom
