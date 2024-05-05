'use client'
import { Tabs } from 'flowbite-react'
import React from 'react'
import TableMain from './MainSection/TableMain'
import { useAddLecturerInfo } from '@/app/utilities/storage/lecturer/information/useAddLecturerInfo'
import { FaPencilRuler } from 'react-icons/fa'
const MainSection = (props: any) => {
  const { sendData } = useAddLecturerInfo()

  const filterRESEARCH = props?.lecturerData?.lecturer?.LecturerInformation?.LecturerBiographyInfo.filter((item: any) => item.LecturerBiographyInfoType === 'RESEARCH')
  const filterARTICLE = props?.lecturerData?.lecturer?.LecturerInformation?.LecturerBiographyInfo.filter((item: any) => item.LecturerBiographyInfoType === 'ARTICLE')
  const filterCONSULTATION = props?.lecturerData?.lecturer?.LecturerInformation?.LecturerBiographyInfo.filter((item: any) => item.LecturerBiographyInfoType === 'CONSULTATION')
  const filterAWARD_RECOGNITION = props?.lecturerData?.lecturer?.LecturerInformation?.LecturerBiographyInfo.filter((item: any) => item.LecturerBiographyInfoType === 'AWARD_RECOGNITION')
  const filterPROCEEDING = props?.lecturerData?.lecturer?.LecturerInformation?.LecturerBiographyInfo.filter((item: any) => item.LecturerBiographyInfoType === 'PROCEEDING')
  const filterOTHERS = props?.lecturerData?.lecturer?.LecturerInformation?.LecturerBiographyInfo.filter((item: any) => item.LecturerBiographyInfoType === 'OTHERS')
  const filterSUPERVISION = props?.lecturerData?.lecturer?.LecturerInformation?.LecturerBiographyInfo.filter((item: any) => item.LecturerBiographyInfoType === 'SUPERVISION')

  const addButton = (type: string) => {

    if(!props?.canEdit) return

    return (
      <div className="flex flex-row-reverse">
        <button
          className="btn"
          onClick={() => {
            const postData = {
              email: props?.lecturerData?.lecturer?.email,
              lecturerBiographyInfoType: type,
            }

            sendData(postData)
          }}
        >
          ADD NEW
        </button>
      </div>
    )
  }
  return (
    <div>
      <div className="px-3">
        <div className="text-2xl font-bold">Biography</div>
        <div style={{ overflowWrap: 'break-word' }}>
          {props?.lecturerData?.lecturer?.name} is a {props?.lecturerData?.lecturer?.LecturerInformation?.Track} lectuer from Department of Information Technology and Communication , Politeknik Ungku Omar (PUO), Jalan Raja Musa Mahadi, 31400 Ipoh, Perak.
        </div>
      </div>

      <div className="bg-red-700 mr-5 text-red-700">-</div>

      <div className="p-3">
        <Tabs aria-label="Default tabs" style="default">
          <Tabs.Item active title="Research">
            {addButton('RESEARCH')}
            <TableMain canEdit={props?.canEdit} data={filterRESEARCH} />
            {filterRESEARCH?.length === 0 ? (
              <div className="w-full flex flex-row justify-center gap-1">
                <FaPencilRuler /> <p className="font-bold">No Data Available</p>
              </div>
            ) : (
              ''
            )}
          </Tabs.Item>
          <Tabs.Item title="Article">
            {addButton('ARTICLE')}
            <TableMain  canEdit={props?.canEdit} data={filterARTICLE} />
            {filterARTICLE?.length === 0 ? (
              <div className="w-full flex flex-row justify-center gap-1">
                <FaPencilRuler /> <p className="font-bold">No Data Available</p>
              </div>
            ) : (
              ''
            )}
          </Tabs.Item>
          <Tabs.Item title="Consultation">
            {addButton('CONSULTATION')}
            <TableMain  canEdit={props?.canEdit} data={filterCONSULTATION} />
            {filterCONSULTATION?.length === 0 ? (
              <div className="w-full flex flex-row justify-center gap-1">
                <FaPencilRuler /> <p className="font-bold">No Data Available</p>
              </div>
            ) : (
              ''
            )}
          </Tabs.Item>
          <Tabs.Item title="Award/Recognition">
            {addButton('AWARD_RECOGNITION')}
            <TableMain  canEdit={props?.canEdit} data={filterAWARD_RECOGNITION} />
            {filterAWARD_RECOGNITION?.length === 0 ? (
              <div className="w-full flex flex-row justify-center gap-1">
                <FaPencilRuler /> <p className="font-bold">No Data Available</p>
              </div>
            ) : (
              ''
            )}
          </Tabs.Item>
          <Tabs.Item title="Publication">
            <Tabs aria-label="Default tabs" style="default">
              <Tabs.Item active title="Proceeding">
                {addButton('PROCEEDING')}
                <TableMain  canEdit={props?.canEdit} data={filterPROCEEDING} />
                {filterPROCEEDING?.length === 0 ? (
                  <div className="w-full flex flex-row justify-center gap-1">
                    <FaPencilRuler /> <p className="font-bold">No Data Available</p>
                  </div>
                ) : (
                  ''
                )}
              </Tabs.Item>
              <Tabs.Item title="Others">
                {addButton('OTHERS')}
                <TableMain  canEdit={props?.canEdit} data={filterOTHERS} />
                {filterOTHERS?.length === 0 ? (
                  <div className="w-full flex flex-row justify-center gap-1">
                    <FaPencilRuler /> <p className="font-bold">No Data Available</p>
                  </div>
                ) : (
                  ''
                )}
              </Tabs.Item>
              <Tabs.Item title="Supervision">
                {addButton('SUPERVISION')}
                <TableMain  canEdit={props?.canEdit} data={filterSUPERVISION} />
                {filterSUPERVISION?.length === 0 ? (
                  <div className="w-full flex flex-row justify-center gap-1">
                    <FaPencilRuler /> <p className="font-bold">No Data Available</p>
                  </div>
                ) : (
                  ''
                )}
              </Tabs.Item>
            </Tabs>
          </Tabs.Item>
        </Tabs>
      </div>
    </div>
  )
}

export default MainSection
