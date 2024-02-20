import { Button } from 'flowbite-react'
import React from 'react'
import UseSetSession from './UseSetSession'
import SetGlobalMemberQuota from './components/SetGlobalMemberQuota'
import { breakpoints } from '@/app/config/breakpoints'
import { useMediaQuery } from 'usehooks-ts'

const SessionManager = (props: any) => {
  const isMobile = useMediaQuery(`(max-width: ${breakpoints.tablet})`)
  return (
    <div className="justify-center px-4  border rounded-lg  bg-white shadow-lg">
      <div className="overflow-x-auto">
        <div className="flex flex-row py-5">
          <div className="w-1/2 font-medium ">
            <p className="underline decoration-1 ">Session Manager</p>
          </div>
        </div>
        <div className="flex flex-col w-full bg-red-700 min-h-12 text-black rounded-lg shadow-lg p-5">
          <div className="bg-white rounded-lg w-full text-center font-bold flex flex-col py-5">
            <div className="font-normal text-slate-500">Selected</div>
            <div>
              SESI {props?.sessilnSelected?.number} {props?.sessilnSelected?.yearOne}/{props?.sessilnSelected?.yearTwo}
            </div>

            <div className="font-normal text-slate-500 ">Supervisee Quota</div>
            <div>{props?.sessilnSelected?.globalSupervisorQuota}</div>

            <div className="font-normal text-slate-500">Title Quota</div>
            <div>{props?.sessilnSelected?.globalTitleQuota}</div>

            <div className="font-normal text-slate-500">Member Quota</div>
            <div>{props?.sessilnSelected?.globalMemberQuota}</div>
          </div>

          {isMobile ? (
            <div className={`grid grid-rows-1 gap-4 py-1`}>
              <div className="w-full bg-white p-5 rounded-lg">
                <div>Supervisors Global Value</div>
                <SetGlobalMemberQuota function={props?.putSessionsGlobalSupervisorQuota} value={props?.sessilnSelected?.globalSupervisorQuota} name={'Supervisee Quota'} sessionId={props?.sessilnSelected?.id} />
                <div>Students Global Value</div>
                <SetGlobalMemberQuota function={props?.putSessionsGLobalTitleQuota} value={props?.sessilnSelected?.globalTitleQuota} name={'Title Quota'} sessionId={props?.sessilnSelected?.id} />
                <SetGlobalMemberQuota function={props?.putSessionsGlobalMemberQuota} value={props?.sessilnSelected?.globalMemberQuota} name={'Member Quota'} sessionId={props?.sessilnSelected?.id} />
              </div>
            </div>
          ) : (
            <div className={`grid grid-cols-2 gap-4 py-5`}>
              <div className="w-full bg-white p-5 rounded-lg ">
                <div>Supervisors Global Value</div>
                <SetGlobalMemberQuota function={props?.putSessionsGlobalSupervisorQuota} value={props?.sessilnSelected?.globalSupervisorQuota} name={'Supervisee Quota'} sessionId={props?.sessilnSelected?.id} />
              </div>
              <div className="w-full bg-white p-5 rounded-lg">
                <div>Students Global Value</div>
                <SetGlobalMemberQuota function={props?.putSessionsGLobalTitleQuota} value={props?.sessilnSelected?.globalTitleQuota} name={'Title Quota'} sessionId={props?.sessilnSelected?.id} />
                <SetGlobalMemberQuota function={props?.putSessionsGlobalMemberQuota} value={props?.sessilnSelected?.globalMemberQuota} name={'Member Quota'} sessionId={props?.sessilnSelected?.id} />
              </div>
            </div>
          )}
        </div>
        <div className="overflow-x-auto">
          <table className="table">
            {/* head */}
            <thead>
              <tr>
                <th></th>
                <th>Name</th>
              </tr>
            </thead>
            <tbody>
              <tr className="bg-red-700 text-white shadow-lg rounded-lg">
                <th></th>
                <td>
                  SESI {props?.sessilnSelected?.number} {props?.sessilnSelected?.yearOne}/{props?.sessilnSelected?.yearTwo}
                </td>
                <td></td>
                <td>
                  <div className="form-control">
                    <label className="label cursor-pointer">
                      <span className="label-text text-white">Selected</span>
                      {/* <input type="checkbox" className="toggle" /> */}
                    </label>
                  </div>
                </td>
              </tr>
              {props?.sessionList?.map((item: any, index: number) => {
                if (item.isSelected === true) {
                  return (
                    <tr key={index} className="bg-slate-300">
                      <th>{index + 1}</th>
                      <td>
                        SESI {item.number} {item.yearOne}/{item.yearTwo}
                      </td>
                      <td></td>
                      <td>
                        <div className="form-control">
                          <label className="label cursor-pointer">
                            <span className="label-text">Selected</span>
                            {/* <UseSetSession
                            sessionId={item.id}
                            sessionLabel={`SESI ${item.number} ${item.yearOne}/${item.yearTwo}`}
                          /> */}
                          </label>
                        </div>
                      </td>
                    </tr>
                  )
                }

                return (
                  <tr key={index}>
                    <th>{index + 1}</th>
                    <td>
                      SESI {item.number} {item.yearOne}/{item.yearTwo}
                    </td>
                    <td></td>
                    <td>
                      <div className="form-control">
                        <label className="label cursor-pointer">
                          <span className="label-text"></span>
                          <UseSetSession sessionId={item.id} sessionLabel={`SESI ${item.number} ${item.yearOne}/${item.yearTwo}`} />
                        </label>
                      </div>
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

export default SessionManager
