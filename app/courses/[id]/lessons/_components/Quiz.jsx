'use client';
import { useState } from 'react';
import { CheckCircle2, XCircle, RefreshCcw } from 'lucide-react';

export default function Quiz({ questions = [], onComplete }) {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [score, setScore] = useState(0);
  const [showResult, setShowResult] = useState(false);
  const [selectedOption, setSelectedOption] = useState(null);
  const [isCorrect, setIsCorrect] = useState(null);

  const handleAnswer = (optionIndex) => {
    setSelectedOption(optionIndex);
    const correct = optionIndex === questions[currentQuestion].correctAnswer;
    setIsCorrect(correct);

    if (correct) setScore((prev) => prev + 1);

    setTimeout(() => {
      if (currentQuestion + 1 < questions.length) {
        setCurrentQuestion((prev) => prev + 1);
        setSelectedOption(null);
        setIsCorrect(null);
      } else {
        setShowResult(true);
        const finalScore =
          ((score + (correct ? 1 : 0)) / questions.length) * 100;
        if (onComplete) onComplete(finalScore);
      }
    }, 1000);
  };

  const resetQuiz = () => {
    setCurrentQuestion(0);
    setScore(0);
    setShowResult(false);
    setSelectedOption(null);
  };

  if (!questions || questions.length === 0) return null;

  if (showResult) {
    const percentage = (score / questions.length) * 100;
    return (
      <div className="p-8  mx-auto rounded-2xl bg-white shadow-sm text-center w-full max-w-xl ">
        <h2 className="text-2xl font-bold mb-4">Quiz Result</h2>
        <div
          className={`text-5xl font-bold mb-4 ${
            percentage >= 70 ? 'text-green-600' : 'text-red-600'
          }`}
        >
          {Math.round(percentage)}%
        </div>
        <p className="text-slate-600 mb-6">
          {percentage >= 70
            ? 'Congratulations! You passed.'
            : 'You did not pass. Try again!'}
        </p>
        <button
          onClick={resetQuiz}
          className="flex items-center gap-2 mx-auto px-6 py-3 bg-indigo-600 text-white rounded-xl hover:bg-indigo-700 transition"
        >
          <RefreshCcw className="w-5 h-5" /> Retake Quiz
        </button>
      </div>
    );
  }

  return (
    <div className="p-8 border rounded-2xl bg-white shadow-sm w-full max-w-xl">
      <div className="flex justify-between items-center mb-6">
        <span className="text-sm font-medium text-slate-500">
          Question {currentQuestion + 1} of {questions.length}
        </span>
        <div className="h-2 w-32 bg-slate-100 rounded-full overflow-hidden">
          <div
            className="h-full bg-indigo-600 transition-all"
            style={{
              width: `${((currentQuestion + 1) / questions.length) * 100}%`,
            }}
          />
        </div>
      </div>
      <h3 className="text-xl font-bold mb-6">
        {questions[currentQuestion].question}
      </h3>
      <div className="flex flex-col gap-3">
        {questions[currentQuestion].options.map((option, index) => (
          <button
            key={index}
            disabled={selectedOption !== null}
            onClick={() => handleAnswer(index)}
            className={`p-4 text-left rounded-xl border-2 transition-all flex justify-between items-center
              ${
                selectedOption === index
                  ? isCorrect
                    ? 'border-green-500 bg-green-50'
                    : 'border-red-500 bg-red-50'
                  : 'border-slate-100 hover:border-indigo-200 hover:bg-slate-50'
              }
              ${
                selectedOption !== null &&
                index === questions[currentQuestion].correctAnswer
                  ? 'border-green-500 bg-green-50'
                  : ''
              }`}
          >
            <span>{option}</span>
            {selectedOption === index &&
              (isCorrect ? (
                <CheckCircle2 className="text-green-600" />
              ) : (
                <XCircle className="text-red-600" />
              ))}
          </button>
        ))}
      </div>
    </div>
  );
}
