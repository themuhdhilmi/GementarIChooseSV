import React from 'react'
import { ToastContainer } from 'react-toastify'

const ToastSuccess = () => {
  return (
    <div>
      {' '}
      <ToastContainer position="top-right" autoClose={5000} hideProgressBar={false} newestOnTop={false} closeOnClick rtl={false} pauseOnFocusLoss draggable pauseOnHover theme="light" />
      {/* Same as */}
      <ToastContainer />
    </div>
  )
}

export default ToastSuccess
