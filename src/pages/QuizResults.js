import { useState } from "react";
import "../styles/Quiz.css";
import "../styles/Final.css";
import AccessibilityPanel from "../components/AccessibilityPanel";

function QuizResults({
  score,
  total,
  breakdown,
  restartQuiz,
  goNext,
  ...accessibilityProps
}) {
  // Determines result message and icon based on score
  const getResultData = () => {
    if (score === total) {
      return { message: "Excellent understanding of AI", icon: "🏆" };
    }
    if (score >= 3) {
      return {
        message: "Great work - you understand the key ideas",
        icon: "🎉",
      };
    }
    if (score >= 2) {
      return { message: "Good progress - keep exploring", icon: "✨" };
    }
    return {
      message: "You're starting to build your AI knowledge",
      icon: "🌱",
    };
  };

  // Get message and icon
  const { message, icon } = getResultData();

  const [showAnswers, setShowAnswers] = useState(false);

  return (
    <div className="screen">
      <div className="card-container results-container">
        <div className="card-row">
          <div className="card-title">
            <div className="left">🧠 AI Quiz</div>
          </div>
          <div className="progress-pill">Results</div>

          <AccessibilityPanel {...accessibilityProps} />
        </div>

        <div className="info-section final-section final-container">
          <h3>Your quiz score</h3>

          <div className="final-row">
            {/* Star rating based on score */}
            <div className="final-stars">
              {[...Array(total)].map((_, i) => (
                <span key={i} className={i < score ? "filled" : ""}>
                  ⭑
                </span>
              ))}
            </div>
          </div>

          <p className="quiz-score">
            You got <strong>{score} </strong> out of <strong>{total}</strong>{" "}
            correct.
          </p>
        </div>

        <div className="info-section final-container">
          <h3>Question breakdown</h3>

          <div className="breakdown-circles">
            {breakdown.map((item, i) => (
              <div
                key={i}
                className={`breakdown-circle ${item.isCorrect ? "correct" : "incorrect"}`}
              >
                {item.isCorrect ? "✓" : "X"}
              </div>
            ))}
          </div>
        </div>

        <div className="info-section final-container">
          <h3>{message}</h3>

          <div className="row-item">
            <span>{icon}</span>
            <p>
              Every correct answer means you've learned something new about AI,
              that's what matters.{" "}
            </p>
          </div>
        </div>

        <button
          className="text-btn"
          onClick={() => setShowAnswers(!showAnswers)}
        >
          {showAnswers ? "Hide answers" : "See answers"}
        </button>

        {showAnswers && (
          <div className="info-section answers-breakdown">
            <h3>Your answers</h3>

            {breakdown.map((item, i) => (
              <div className="breakdown-row" key={i}>
                <div className="breakdown-title">
                  <span>🧠</span>
                  <strong>Question {i + 1}</strong>
                  <span>{item.isCorrect ? "✓" : "X"}</span>
                </div>

                <p className="breakdown-question">{item.question}</p>

                <p className="breakdown-answer">
                  Your answer: <strong>{item.selectedAnswer}</strong>
                </p>

                {!item.isCorrect && (
                  <p className="breakdown-answer">
                    Correct answer: <strong>{item.correctAnswer}</strong>
                  </p>
                )}
              </div>
            ))}
          </div>
        )}

        <button className="btn" onClick={goNext}>
          Continue
        </button>

        <button className="secondary-btn" onClick={restartQuiz}>
          Replay
        </button>
      </div>
    </div>
  );
}

export default QuizResults;
