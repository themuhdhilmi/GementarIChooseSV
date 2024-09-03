'use client'
import { useUpdateLecturer } from '@/app/utilities/storage/lecturer/useUpdateLecturer'
import { Select } from 'flowbite-react'
import React, { useState } from 'react'

interface Props {
  supervisorQuota: number | null,
  id : string
}

const SelectSupervisorQuota = (props: Props) => {
  const [quota, setQuota] = useState<number>(props.supervisorQuota ?? 0)
  const { data, sendData, success, loading} = useUpdateLecturer()

  const onSelectedChange = (value : string) => {

    sendData({
      id: props.id,
      name: null,
      email: null,
      password: null,
      track: null,
      supervisorQuota: value === '0' ? null : parseInt(value),
      googleID: null,
      wosID: null,
      scopusID: null,
      expertise: null,
    })

  }

  return (
    <div className="max-w-sm">
      <Select id="countries" onChange={(e) => onSelectedChange(e.target.value)} required>
        <option selected={quota === 0} value={'0'}>Use Global</option>
        <option selected={quota === 1} value={'1'}>1</option>
        <option selected={quota === 2} value={'2'}>2</option>
        <option selected={quota === 3} value={'3'}>3</option>
        <option selected={quota === 4} value={'4'}>4</option>
        <option selected={quota === 5} value={'5'}>5</option>
        <option selected={quota === 6} value={'6'}>6</option>
        <option selected={quota === 7} value={'7'}>7</option>
        <option selected={quota === 8} value={'8'}>8</option>
        <option selected={quota === 9} value={'9'}>9</option>
        <option selected={quota === 10} value={'10'}>10</option>
      </Select>
    </div>
  )
}

export default SelectSupervisorQuota
