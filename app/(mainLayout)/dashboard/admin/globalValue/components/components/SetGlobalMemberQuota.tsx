'use client'
import React, { useEffect, useState } from 'react'

const SetGlobalMemberQuota = (props: any) => {
  const [value, setValue] = useState('0')

  useEffect(() => {
    setValue(props.value)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [props.value])

  const setValueSet = (e: any) => {
    setValue(e.target.value)
  }
  return (
    <div className="w-full text-black">
      <label className="form-control w-full ">
        <div className="label">
          <span className="label-text text-black">{props.name}</span>
        </div>
        <div className="join w-full">
          <input type="number" className="input w-full rounded-l-lg input-bordered join-item text-black" value={value} onChange={(e) => setValueSet(e)} />
          <button onClick={() => props.function(props.sessionId, parseInt(value))} className="btn join-item rounded-r-lg">
            {/* {console.log(props.sessionId + " " + parseInt(value))} */}
            Set Value
          </button>
        </div>
      </label>
    </div>
  )
}

export default SetGlobalMemberQuota
