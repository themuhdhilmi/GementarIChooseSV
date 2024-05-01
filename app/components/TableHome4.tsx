'use client'
import { Table } from 'flowbite-react'
import React from 'react'
import { timeStatus } from '../utilities/storage/quiz/useQuestionTimeInfo'

const TableHome4 = (props: any) => {
  return (
    <div className="overflow-x-auto">
      <Table>
        <Table.Head>
          <Table.HeadCell>Unconfirmed Student Submission</Table.HeadCell>
          <Table.HeadCell>Question</Table.HeadCell>
          <Table.HeadCell>Status</Table.HeadCell>
        </Table.Head>
        <Table.Body className="divide-y">
        <Table.Row className="bg-white dark:border-gray-700 dark:bg-gray-800">
        {props?.data?.answerListIncomplete?.length === 0 ? <Table.Cell className="whitespace-nowrap font-medium text-gray-900 dark:text-white">No data</Table.Cell> : ""}
        {props?.data?.answerListIncomplete?.length === 0 ? <Table.Cell>No data</Table.Cell> : ""}
        {props?.data?.answerListIncomplete?.length === 0 ? <Table.Cell>No data</Table.Cell> : ""}
        </Table.Row>
          {props?.data?.answerListIncomplete?.map((item: any, index: number) => {
            return (
              <Table.Row key={index} className="bg-white dark:border-gray-700 dark:bg-gray-800">
                <Table.Cell className="whitespace-nowrap font-medium text-gray-900 dark:text-white">{item.user.name}</Table.Cell>
                <Table.Cell>{item.question.title}</Table.Cell>
                <Table.Cell>
                  <a href={`/dashboard/viewQuiz/quizCreation/questionCreation/childQuestionResult/${item.questionId}`} className="font-medium text-cyan-600 hover:underline dark:text-cyan-500">
                    Manage Submission
                  </a>
                </Table.Cell>
              </Table.Row>
            )
          })}
        </Table.Body>
      </Table>
    </div>
  )
}

export default TableHome4
