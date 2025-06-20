import React, { useEffect, useState } from "react";

const MCQChallege = ({ challenge, showExplanation = false }) => {
  const [selectedOption, setSelectedOption] = useState(null);
  const [isShowExplanation, setIsShowExplanation] = useState(showExplanation);
  useEffect(() => {
    console.log(challenge);
  });

  const parseOptions = (opt) => {
    if (typeof opt === "string") {
      try {
        const parsedOnce = JSON.parse(opt);
        return typeof parsedOnce === "string"
          ? JSON.parse(parsedOnce)
          : parsedOnce;
      } catch (e) {
        console.error("Failed to parse options:", e);
        return [];
      }
    }
    return opt;
  };

  const options = parseOptions(challenge?.options);

  // const options =
  //   typeof challenge?.options === "string"
  //     ? JSON.parse(challenge?.options)
  //     : challenge?.options;

  const handleOptionSelect = (index) => {
    if (selectedOption !== null) return;

    setSelectedOption(index);
    setIsShowExplanation(true);
  };

  const getOptionClass = (index) => {
    if (selectedOption === null) return "option";

    if (index === challenge?.correct_answer_id) {
      return "option correct";
    }
    if (selectedOption === index && index !== challenge?.correct_answer_id) {
      return "option incorrect";
    }

    return "option";
  };
  return (
    <>
      <div className="challenge-display">
        <p>
          <strong>Difficulty</strong>: {challenge?.difficulty}
        </p>
        <p className="challenge-title">{challenge?.title}</p>
        <div className="options">
          {options?.map((option, index) => (
            <div
              className={getOptionClass(index)}
              key={index}
              onClick={() => handleOptionSelect(index)}
            >
              {option}
            </div>
          ))}
        </div>

        {isShowExplanation && selectedOption !== null && (
          <div className="explanation">
            <h4>Explanation</h4>
            <p>{challenge?.explanation}</p>
          </div>
        )}
      </div>
    </>
  );
};

export default MCQChallege;
