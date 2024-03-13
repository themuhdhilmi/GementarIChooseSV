'use client'
import { Label, Select } from 'flowbite-react'
import React, { useState } from 'react'

const SetScore = (props: any) => {
  return (
    <div className="flex w-full">
      <div className="basis-5/6 ">
        <div className="mb-2 block">
          <Label htmlFor="countries" value="Set your score" />
        </div>
        <input type="number" onChange={(e) => {}} placeholder={props?.label} className="input input-bordered w-full" />
      </div>

      <div className="basis-1/6 flex flex-col-reverse">
        <button className="btn ">Set</button>
      </div>
    </div>
  )
}

export default SetScore
