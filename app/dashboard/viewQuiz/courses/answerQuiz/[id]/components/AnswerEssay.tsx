import React, { useState } from 'react';

const AnswerEssay = ({ item }: any) => {
  const [essayAnswer, setEssayAnswer] = useState<string>('');

  // Check if item is defined before accessing its properties
  const question = item?.label || '';

  const handleInputChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    setEssayAnswer(event.target.value);
  };

  return (
    <div className="w-full border p-3 ">
      <div className="flex flex-col w-full">
        <div className="mb-4">
          <div className="font-bold mb-2">{question}</div>
          <textarea
            className="w-full h-48 border border-gray-300 rounded p-4"
            placeholder="Type your answer here..."
            value={essayAnswer}
            onChange={handleInputChange}
          />
        </div>
        <div className="flex justify-end">
          <button
            className="w-full py-3 px-4 bg-blue-500 text-white rounded-md font-semibold uppercase tracking-wide"
            onClick={() => console.log('Submitted answer:', essayAnswer)}
            disabled={!essayAnswer.trim()}
          >
            Submit
          </button>
        </div>
      </div>
    </div>
  );
};

export default AnswerEssay;
