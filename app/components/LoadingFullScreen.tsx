import React from 'react'

const LoadingFullScreen = () => {
  return (
    <div className="fixed top-0 left-0 w-full h-full z-50 bg-white">
      <div className="hero min-h-screen">
        <div className="hero-content text-center">
          <span className="loading loading-ring loading-lg text-blue-600"></span>
        </div>
      </div>
    </div>
  )
}

export default LoadingFullScreen
