import React, { useState, useEffect } from 'react';
import { useUpdateAnswerFITB } from '@/app/utilities/storage/quiz/FITB/useUpdateAnswerFITB';

const AnswerFITB = ({ item }: any) => {
  const { sendData } = useUpdateAnswerFITB();
  const [answers, setAnswers] = useState<any[]>([]);
  const [inputSections, setInputSections] = useState<any[]>([]);
  const [isSubmitDisabled, setIsSubmitDisabled] = useState<boolean>(true);

  useEffect(() => {
    // Combine real and dummy answers and shuffle them
    const realAnswers = item?.questionBody[0]?.answer ?? [];
    const dummyAnswers = item?.answerDummy ?? [];
    const combinedAnswers = shuffleArray([...realAnswers, ...dummyAnswers]);
    setAnswers(combinedAnswers);
  }, [item]);

  useEffect(() => {
    // Generate FITB text with placeholders
    setInputSections(generateFITBSections(item?.questionBody[0]?.answer));
  }, [item]);

  useEffect(() => {
    // Check if all sections have dropped answers
    const allSectionsFilled = inputSections.every((section) => section.droppedAnswer !== null);
    setIsSubmitDisabled(!allSectionsFilled);
  }, [inputSections]);

  // Shuffle function
  const shuffleArray = (array: any[]) => {
    const shuffledArray = [...array];
    for (let i = shuffledArray.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [shuffledArray[i], shuffledArray[j]] = [shuffledArray[j], shuffledArray[i]];
    }
    return shuffledArray;
  };

  const generateFITBSections = (answers: any[]) => {
    const sections: any[] = [];
    answers.forEach((answer: any, index: number) => {
      const { stringBefore, stringAfter } = answer;
      const section = {
        id: index,
        beforeText: stringBefore ?? "",
        afterText: stringAfter ?? "",
        droppedAnswer: null
      };
      sections.push(section);
    });
    return sections;
  };

  const updateFITBAnswer = () => {
    let score = 0;
    inputSections.forEach((section) => {
      const correctAnswer = item.questionBody[0].answer[section.id].string;
      if (section.droppedAnswer === correctAnswer) {
        score++;
      }
    });
    console.log("Score:", score);
  };

  const handleDragStart = (event: React.DragEvent<HTMLDivElement>, answer: string) => {
    event.dataTransfer.setData('text/plain', answer);
  };

  const handleDragOver = (event: React.DragEvent<HTMLDivElement>, sectionId: number) => {
    event.preventDefault();
    event.stopPropagation();
  };

  const handleDrop = (event: React.DragEvent<HTMLDivElement>, sectionId: number) => {
    event.preventDefault();
    const droppedAnswer = event.dataTransfer.getData('text/plain');
    const updatedSections = inputSections.map((section) => {
      if (section.id === sectionId) {
        return {
          ...section,
          droppedAnswer: droppedAnswer
        };
      } else {
        return section;
      }
    });
    setInputSections(updatedSections);
  };

  const handleNextButtonClick = () => {
    // Implement your logic for the next button click here
  };

  return (
    <div className="w-full border p-3 ">
      <div className="flex flex-col w-full">
        <div className='flex flex-row py-5'>
          {inputSections.map((section) => (
            <div key={section.id} className="flex flex-row items-center space-x-4">
              <div className="text-lg font-bold">{section.beforeText}</div>
              <div
                className="p-4 border border-gray-300 rounded bg-gray-100 text-gray-900"
                onDragOver={(event) => handleDragOver(event, section.id)}
                onDrop={(event) => handleDrop(event, section.id)}
              >
                {section.droppedAnswer}
              </div>
              <div className="text-lg font-bold">{section.afterText}</div>
            </div>
          ))}
        </div>

        <div className='py-5'>Drag and drop into empty slot</div>
        <div className="flex flex-wrap gap-2 mb-4">
          {answers.map((answer, index) => (
            <div
              key={index}
              className="fitb-answer cursor-pointer bg-blue-500 text-white rounded-lg p-2"
              draggable
              onDragStart={(event) => handleDragStart(event, answer.string)}
            >
              {answer.string}
            </div>
          ))}
        </div>
        <div className="flex justify-end">
          <button
            className="mt-8 w-full py-3 px-4 bg-blue-500 text-white rounded-md font-semibold uppercase tracking-wide disabled:bg-gray-400 disabled:pointer-events-none disabled:cursor-not-allowed"
            onClick={handleNextButtonClick}
            disabled={isSubmitDisabled}
          >
            Next
          </button>
        </div>
      </div>
    </div>
  );
};

export default AnswerFITB;
