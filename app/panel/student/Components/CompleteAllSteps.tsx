import React from 'react'
import { FaLock } from 'react-icons/fa'

const CompleteAllSteps = () => {
  return (
    <div className="stats align-middle shadow w-full justify-center flex h-10">
    <div className="flex p-2 space-x-2">
      <div>
        <FaLock />
      </div>
      <div>Complete previous steps</div>
    </div>
  </div>
  )
}

export default CompleteAllSteps
