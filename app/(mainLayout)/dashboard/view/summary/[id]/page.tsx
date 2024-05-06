'use client'
import { useGetsessions } from '@/app/utilities/storage/user/useGetSessions'
import { useParams } from 'next/navigation'
import React, { useEffect, useState } from 'react'

const Page = () => {
  const params = useParams<{ id: any }>()
  const [data, setData] = useState<any>()

  useEffect(() => {
    const getData = async () => {
      const response = await fetch('/api/v1/GLOBAL/sessions/' + params.id, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Cache-Control': 'no-store',
          cache : "no-store"
        },
      })
      const data = await response.json()
      setData(data)
    }

    getData()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <div>
      <div className="bg-slate-300 py-2">
        <p className="text-2xl text-center font-bold">
          SESI {data?.sessionSelected?.number} {data?.sessionSelected?.yearOne}/{data?.sessionSelected?.yearTwo}
        </p>
      </div>

      <div>
        {/* {JSON.stringify(data?.sessionSelected?.StudentInformation)} */}

        {data?.sessionSelected?.StudentInformation?.map((item: any, index: number) => {
          return (
            // <div className="px-6 my-1" key={index}>
            //   <div className=" py-2 w-full bg-slate-100 border border-slate-400 text-center">TEAM {index + 1}</div>
            //   <div className="w-full">s</div>

            //   {/* {JSON.stringify(item)} */}
            // </div>


            <div  key={index}>






            </div>
          )
        })}
      </div>
    </div>
  )
}

export default Page
