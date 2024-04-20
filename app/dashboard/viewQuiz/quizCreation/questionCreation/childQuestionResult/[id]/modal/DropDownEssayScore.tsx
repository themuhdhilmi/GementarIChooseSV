'use client'
import { useUpdateQuestionListScore } from '@/app/utilities/storage/quiz/useUpdateQuestionListScore';
import { Button, TextInput } from 'flowbite-react';
import React, { useState } from 'react';

const DropDownEssayScore = (props: any) => {
  const { item } = props;
  const [value, setValue] = useState(0);
  const { sendData } = useUpdateQuestionListScore()

  const onValueChange = (e: any) => {
    let newValue = parseInt(e.target.value);

    if (newValue > item?.totalScore) {
      setValue(item?.totalScore);
    } else if (newValue <= -1) {
      setValue(0);
    } else {
      setValue(newValue);
    }
  };

  const onSubmit = () => {
    const postData = {
        id : item?.id,
        score : value,
        studentAnswerId: props.studentAnswerId
    }

    sendData(postData)
  }

  if(item?.score >= 0)
    {
        return (
            <div className="w-full">
              <TextInput
                value={value}
                disabled={true}
                onChange={onValueChange}
                color={item?.score === -1 ? 'failure' : ''}
                id="small"
                type="number"
                sizing="sm"
                min={0}
                max={item?.totalScore}
              />
            </div>
          );
    }

    else
    {
        return (
            <div className="w-full">
              <TextInput
                value={value}
                onChange={onValueChange}
                color={item?.score === -1 ? 'failure' : ''}
                id="small"
                type="number"
                sizing="sm"
                min={0}
                max={item?.totalScore}
              />
              <div className='w-full flex flex-row-reverse pt-2'>
              <Button onClick={() => onSubmit()}>Submit Score</Button>
              </div>
            </div>
          );
    }


};

export default DropDownEssayScore;
