'use client'
import { Table } from 'flowbite-react'
import React from 'react'
import { timeStatus } from '../utilities/storage/quiz/useQuestionTimeInfo'

const TableHome1 = (props: any) => {
  return (
    <div className="overflow-x-auto">
      <Table>
        <Table.Head>
          <Table.HeadCell>Future Quiz</Table.HeadCell>
          <Table.HeadCell>Status</Table.HeadCell>
          {/* <Table.HeadCell>Participants</Table.HeadCell> */}
        </Table.Head>
        <Table.Body className="divide-y">
        <Table.Row className="bg-white dark:border-gray-700 dark:bg-gray-800">
        {props?.data?.questionOnTheWay?.length === 0 ? <Table.Cell className="whitespace-nowrap font-medium text-gray-900 dark:text-white">No data</Table.Cell> : ""}
        {props?.data?.questionOnTheWay?.length === 0 ? <Table.Cell>No data</Table.Cell> : ""}
        </Table.Row>
          {props?.data?.questionOnTheWay?.map((item: any, index: number) => {
            return (
              <Table.Row key={index} className="bg-white dark:border-gray-700 dark:bg-gray-800">
                <Table.Cell className="whitespace-nowrap font-medium text-gray-900 dark:text-white">{item.title}</Table.Cell>
                <Table.Cell>{timeStatus(item.timeStart,item.timeEnd )}</Table.Cell>
                {/* <Table.Cell>{item.StudentAnswer.length}</Table.Cell> */}
              </Table.Row>
            )
          })}
        </Table.Body>
      </Table>
    </div>
  )
}

export default TableHome1
