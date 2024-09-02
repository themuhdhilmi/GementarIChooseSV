/* eslint-disable @next/next/no-img-element */
import { Avatar } from 'flowbite-react'
import React from 'react'

const LecturerCard = (props: any) => {

  const expertiseArr = props?.item?.expertise?.split(',') ?? []

  return (
    <div className="border rounded-lg shadow-md min-h-40 relative mb-8 flex-initial min-w-80 mx-2 hover:cursor-pointer" onClick={() => window.open('/dashboard/view/lecturer/' + props?.item?.User?.email)}>
      <div className="absolute left-3 -top-4 bg-white">
        <Avatar bordered color="gray" img={props?.item?.User.image === null ? "/images/profile.jpg" :( `https://storage.ichoosesv.gementar.com` + props?.item?.User.image)} size="lg" />
        {/* <figure className="px-10 pt-10">
          <img src={props?.item?.User.image === null ? "/images/profile.jpg" :( `https://storage.ichoosesv.gementar.com` + props?.item?.User.image)} alt="profile" className="rounded-xl" />
        </figure> */}
      </div>
      {props?.item?.SessionYear[0]?.isSelected === true ? (
        <div className="absolute top-0 right-0 ">
          <div className="badge badge-neutral mt-5">Supervisor</div>
        </div>
      ) : (
        ''
      )}

      <div className="bg-red-700 w-full rounded-t-lg min-h-28 flex flex-col-reverse text-white">
        <div className="ml-2">{props?.item?.Track}</div>
        <div className="ml-2">{props?.item?.User?.email}</div>
        <div className="ml-2 font-bold">{props?.item?.User?.name}</div>
        <div className="h-16"></div>
      </div>

      <div>
        <div className="overflow-x-auto">
          <table className="table table-zebra">
            <tbody>
              <tr>
                <th>Expertise</th>
              </tr>
              {expertiseArr?.map((item : any, index : number) => {

                return (<tr key={index}><th className='font-normal'>{item}</th></tr>)
              })}
              
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}

export default LecturerCard
