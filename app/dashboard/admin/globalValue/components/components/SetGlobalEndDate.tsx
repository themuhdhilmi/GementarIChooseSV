'use client'
import { Datepicker } from 'flowbite-react'
import React, { useState } from 'react'

const SetGlobalEndDate = (props: any) => {
  return (
    <div className="w-full text-black">
      <label className="form-control w-full ">
        <div className="label">
          <span className="label-text text-black">{props.name}</span>
        </div>
        <div className="join w-full">
          {/* <Datepicker onSelectedDateChanged={( date : any) => setDate(date)} className='w-full'/> */}
          <Datepicker onSelectedDateChanged={(date: any) => props.function(props.sessionId, date)} className="w-full" />
        </div>
      </label>
    </div>
  )
}

// props.function(props.sessionId, parseInt(value))

export default SetGlobalEndDate
