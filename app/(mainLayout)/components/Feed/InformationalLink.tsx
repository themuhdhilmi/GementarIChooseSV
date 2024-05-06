'use client'
import React from 'react'

const InformationalLink = () => {
  return (
    <div>
      <div className="bg-red-700 rounded-lg shadow-lg p-5 flex flex-col gap-2">
        <p className="text-white">Informational Link</p>
        <button className="btn btn-sm bg-white w-full rounded-lg hover:bg-red-900 hover:text-white" onClick={() => window.open('https://sites.google.com/view/unit-of-project-coordination/future-students/fyp-title-directory?authuser=1', '_blank')}>
          Project&apos;s Title Directory
        </button>
        <button className="btn btn-sm bg-white w-full rounded-lg hover:bg-red-900 hover:text-white" onClick={() => window.open('/dashboard/view/lecturerDirectory', '_blank')}>
          Staff Directory (JTMK)
        </button>
        <button className="btn btn-sm bg-white w-full rounded-lg hover:bg-red-900 hover:text-white" onClick={() => window.open('someLink', '_blank')}>
          Gementar Team Academy
        </button>
      </div>
    </div>
  )
}

export default InformationalLink
