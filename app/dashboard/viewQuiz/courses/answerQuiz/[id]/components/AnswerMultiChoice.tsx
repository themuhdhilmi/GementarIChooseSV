import React, { useState } from 'react';

const AnswerMultiChoice = (props: any) => {
  const { item } = props;

  // Combine and shuffle the actual answers and dummy answers
  const allAnswers = [
    ...item.questionBody[0].answer,
    ...item.answerDummy
  ];

  // Shuffle the answers only once initially
  const [shuffledAllAnswers] = useState(() => allAnswers.sort(() => Math.random() - 0.5));

  // State to keep track of selected answers
  const [selectedAnswers, setSelectedAnswers] = useState<string[]>([]);

  // Function to handle answer selection
  const handleAnswerSelection = (answerId: string) => {
    if (selectedAnswers.includes(answerId)) {
      setSelectedAnswers(selectedAnswers.filter(id => id !== answerId));
    } else {
      // Check if the selected answer is valid (belongs to the correct answers) and not exceeding the maximum number of selections
      if (
        (item.questionBody[0].answer.some((answer: any) => answer.id === answerId) || selectedAnswers.length < item.questionBody[0].answer.length) &&
        selectedAnswers.length < item.questionBody[0].answer.length
      ) {
        setSelectedAnswers([...selectedAnswers, answerId]);
      }
    }
  };

  // Function to handle score calculation and storage
  const handleNextButtonClick = () => {
    const correctAnswers = item.questionBody[0].answer.map((answer: any) => answer.id);
    const score = selectedAnswers.reduce((acc, answerId) => {
      if (correctAnswers.includes(answerId)) {
        return acc + 1;
      }
      return acc;
    }, 0);

    props.answerTheQuestion(item.id, score)
  }

  // Check if the user has selected the required number of options
  const isNextButtonDisabled = selectedAnswers.length !== item.questionBody[0].answer.length;

  return (
    <div className="w-full border p-3 ">
      <div className="">
        <div className="">
          <p className='py-6'>{item?.questionBody[0].string} Choose any of {item.questionBody[0].answer.length} below.</p>
          <div className="space-y-4">
            <div className='flex flex-row gap-1 '>
            {shuffledAllAnswers.map((answer: any) => (
              <button
                key={answer.id}
                className={`w-full py-2 px-4 rounded-md border border-gray-300 hover:border-gray-400 ${selectedAnswers.includes(answer.id) ? 'bg-blue-500 text-white hover:bg-blue-600' : 'bg-white text-gray-800'}`}
                onClick={() => handleAnswerSelection(answer.id)}
                disabled={
                  !(
                    item.questionBody[0].answer.some((answer: any) => answer.id === answer.id) ||
                    selectedAnswers.length < item.questionBody[0].answer.length
                  )
                }
              >
                {answer.string}
              </button>
            ))}
            </div>

          </div>
          <button
            className="mt-8 w-full py-3 px-4 bg-blue-500 text-white rounded-md font-semibold uppercase tracking-wide disabled:bg-gray-400 disabled:pointer-events-none disabled:cursor-not-allowed"
            onClick={handleNextButtonClick}
            disabled={isNextButtonDisabled}
          >
            Next
          </button>
        </div>
      </div>
    </div>
  );
};

export default AnswerMultiChoice;
