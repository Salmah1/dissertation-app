import { useState } from "react";
import guessQuestions from "../data/guessQuestions";
import "../styles/Quiz.css";
import AccessibilityPanel from "../components/AccessibilityPanel";

function Guess({ goToResults, ...accessibilityProps }) {
  // Guess states
  const [currentQuestion, setCurrentQuestion] = useState(0); // Tracks current question index
  const [selected, setSelected] = useState(null); // Stores selected answer
  const [answers, setAnswers] = useState([]);
  const question = guessQuestions[currentQuestion];

  // Move to next question OR results
  const handleNext = () => {
    const answerRecord = {
      question: question.question,
      selectedAnswer: selected,
    };

    const newAnswers = [...answers, answerRecord];

    setAnswers(newAnswers);

    if (currentQuestion + 1 < guessQuestions.length) {
      // Reset for next question
      setCurrentQuestion(currentQuestion + 1);
      setSelected(null);
    } else {
      // Send all answers to AI guess results page
      goToResults(newAnswers);
    }
  };

  return (
    <div className="screen">
      <div className="card-container">
        <div className="card-row">
          <div className="card-title">
            <div className="left">🔮 AI Guess</div>
          </div>

          <div className="progress-pill">
            Question {currentQuestion + 1} of {guessQuestions.length}
          </div>

          <AccessibilityPanel {...accessibilityProps} />
        </div>

        <div className="progress-bar">
          <div
            className="progress-fill"
            style={{
              width: `${((currentQuestion + 1) / guessQuestions.length) * 100}%`,
            }}
          ></div>
        </div>

        <div className="question-box">
          <span className="question-icon">{question.questionIcon}</span>
          <span className="question-text">{question.question}</span>
        </div>

        <div className="options">
          {question.options.map((opt, i) => (
            <button
              key={i}
              aria-pressed={selected === opt}
              className={`option ${selected === opt ? "selected" : ""}`}
              onClick={() => setSelected(opt)}
            >
              {/* A, B, C, D option labels */}
              <span className="option-label">
                {String.fromCharCode(65 + i)}
              </span>

              <span className="option-text">{opt}</span>
            </button>
          ))}
        </div>

        <button className="btn" onClick={handleNext} disabled={!selected}>
          Next
        </button>
      </div>
    </div>
  );
}

export default Guess;
