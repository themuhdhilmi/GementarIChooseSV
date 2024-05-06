'use client'
import { useGetSessionDetail } from '@/app/utilities/storage/storage/useGetSessionDetail'
import Link from 'next/link'
import { useParams } from 'next/navigation'
import React, { useEffect } from 'react'
import { FaFilePdf } from 'react-icons/fa6'
// app\api\v1\GLOBAL\sessions\[id]

const Page = () => {
  const params = useParams<{
    id: string
  }>()

  const { fetchData, data } = useGetSessionDetail()

  useEffect(() => {
    fetchData(params.id)

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <div>
      <div className="flex flex-row justify-center text-3xl font-bold">
        SESI {data?.sessionSelected?.number} {data?.sessionSelected?.yearOne}/{data?.sessionSelected?.yearTwo}
      </div>
      <div className="flex flex-row justify-center text-1xl font-bold">JTMK Supervisor Selection Report</div>
      <div className="border m-2">
        <div className="overflow-x-auto">
          <table className="table table-zebra">
            {/* head */}
            <thead>
              <tr>
                <th></th>
                <th>Project Title</th>
                <th>Team Members</th>
                <th>Supervisor</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              {data?.sessionSelected?.StudentInformation?.map((item: any, index: number) => {
                return (
                  <tr key={index}>
                    <th className="border border-black">{index + 1}</th>
                    <td className="border border-black">
                      {item?.ProjectTitle?.map((item: any, index: number) => {
                        return (
                          <div className="flex flex-row" key={index}>
                            <div>{item?.name}</div> <div className="grow"></div>{' '}
                            <div className="pl-2">
                              <Link target="_blank" href={'https://storage.server.gementar.com/gementar/storage/file/' + item?.uploadedPoster + '.pdf'}>
                                <FaFilePdf />
                              </Link>
                            </div>
                          </div>
                        )
                      })}
                    </td>
                    <td className="border border-black">
                      <div className="flex flex-row" key={index}>
                        <div>{item?.User?.name}</div> <div className="grow"></div>
                        <div>{item?.matricNumber}</div>
                      </div>

                      {item?.Member?.map((item: any, index: any) => {
                        return (
                          <div className="flex flex-row" key={index}>
                            <div>{item?.name}</div> <div className="grow"></div>
                            <div>{item?.matricNumber}</div>
                          </div>
                        )
                      })}
                    </td>
                    <td className="border border-black">{item?.LecturerInformation?.User?.name}</td>
                    <td className="border border-black">
                      {item?.lecturerAcceptedStudent === 'NONE' ? <div className="badge badge-error gap-2">PROFILE INCOMPLETE</div> : ''}
                      {item?.lecturerAcceptedStudent === 'REQUESTED' ? <div className="badge badge-warning  gap-2">REQUESTED</div> : ''}
                      {item?.lecturerAcceptedStudent === 'ACCEPTED' ? <div className="badge badge-success  gap-2">COMPLETED</div> : ''}
                      {item?.lecturerAcceptedStudent === 'DECLINED' ? <div className="badge badge-error  gap-2">DECLINED BY LECTURER</div> : ''}
                    </td>
                  </tr>
                )
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}

export default Page
