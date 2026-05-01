import { useState, useEffect } from "react";
import quizQuestions from "../data/quizQuestions";
import "../styles/Quiz.css";
import AccessibilityPanel from "../components/AccessibilityPanel";

// Randomly shuffles answer options
function shuffleOptions(array) {
  const newArray = [...array];
  for (let i = newArray.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [newArray[i], newArray[j]] = [newArray[j], newArray[i]];
  }
  return newArray;
}

function Quiz({ goToResults, ...accessibilityProps }) {
  // Quiz states
  const [currentQuestion, setCurrentQuestion] = useState(0); // Tracks current question index
  const [selected, setSelected] = useState(null); // Stores selected answer
  const [showAnswer, setShowAnswer] = useState(false); // Controls when answer and feedback is shown
  const [score, setScore] = useState(0); // Tracks total correct answers
  const [shuffledOptions, setShuffledOptions] = useState([]); // Stores shuffled options for current question
  const [answerBreakdown, setAnswerBreakdown] = useState([]);

  // Randomise questions once (one fairness question is always shown)
  const [randomQuestions] = useState(() => {
    const fairnessOptions = quizQuestions.filter(
      (q) => q.id === 9 || q.id === 10,
    );

    const fairnessQuestion =
      fairnessOptions[Math.floor(Math.random() * fairnessOptions.length)];

    const otherQuestions = quizQuestions.filter(
      (q) => q.id !== fairnessQuestion.id,
    );

    const shuffled = [...otherQuestions]
      .sort(() => 0.5 - Math.random())
      .slice(0, 3);

    return [fairnessQuestion, ...shuffled];
  });

  const question = randomQuestions[currentQuestion];

  // Shuffle options whenever question changes
  useEffect(() => {
    setShuffledOptions(shuffleOptions(question.options));
  }, [question]);

  // Takes page back to the top after each question
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [currentQuestion]);

  // Save selected option
  const handleSelect = (option) => {
    setSelected(option);
  };

  // Show correct answer and feedback
  const handleCheck = () => {
    setShowAnswer(true);
  };

  // Move to next question or results
  const handleNext = () => {
    const isCorrect = selected === question.correctAnswer;
    const updatedScore = isCorrect ? score + 1 : score;

    const answerRecord = {
      question: question.question,
      selectedAnswer: selected,
      correctAnswer: question.correctAnswer,
      isCorrect,
    };

    const updatedBreakdown = [...answerBreakdown, answerRecord];

    if (isCorrect) {
      setScore(updatedScore);
    }

    setAnswerBreakdown(updatedBreakdown);

    if (currentQuestion + 1 < randomQuestions.length) {
      // Reset for next question
      setCurrentQuestion(currentQuestion + 1);
      setSelected(null);
      setShowAnswer(false);
    } else {
      // Send final score to results page
      goToResults(updatedScore, updatedBreakdown);
    }
  };

  return (
    <div className="screen">
      <div className="card-container">
        <div className="card-row">
          <div className="card-title">
            <div className="left">🧠 AI Quiz</div>
            <div className="score">⭐️ {score} correct</div>
          </div>

          <div className="progress-pill">
            Question {currentQuestion + 1} of {randomQuestions.length}
          </div>

          <AccessibilityPanel {...accessibilityProps} />
        </div>

        <div className="progress-bar">
          <div
            className="progress-fill"
            style={{
              width: `${((currentQuestion + 1) / randomQuestions.length) * 100}%`,
            }}
          ></div>
        </div>

        <div className="question-box">
          <span className="question-icon">{question.questionIcon}</span>
          <span className="question-text">{question.question}</span>
        </div>

        <div className="options">
          {shuffledOptions.map((opt, i) => (
            <button
              key={i}
              disabled={showAnswer} // Disable after answer is shown
              aria-pressed={selected === opt}
              className={`option 
                    ${selected === opt ? "selected" : ""}
                    ${showAnswer && opt === question.correctAnswer ? "correct" : ""}
                    ${showAnswer && selected === opt && opt !== question.correctAnswer ? "incorrect" : ""}
                `}
              onClick={() => handleSelect(opt)}
            >
              {/* A, B, C, D option labels */}
              <span className="option-label">
                {String.fromCharCode(65 + i)}
              </span>

              <span className="option-text">{opt}</span>

              <span className="option-icon">
                {showAnswer && opt === question.correctAnswer && "✓"}
                {showAnswer &&
                  selected === opt &&
                  opt !== question.correctAnswer &&
                  "X"}
              </span>
            </button>
          ))}
        </div>

        {/* Feedback */}
        {showAnswer && (
          <div
            className={`feedback-box ${
              selected === question.correctAnswer
                ? "correct-box"
                : "incorrect-box"
            }`}
          >
            <h3>
              {selected === question.correctAnswer
                ? "That's right!"
                : "Not quite, but great to think about!"}
            </h3>

            <div className="row-item">
              <span>{selected === question.correctAnswer ? "🎉" : "💡"}</span>
              <p>{question.explanation}</p>
            </div>
          </div>
        )}

        {!showAnswer ? (
          <button
            className="btn"
            onClick={handleCheck}
            disabled={!selected} // Disabled until option is selected
          >
            Show answer
          </button>
        ) : (
          <button className="btn" onClick={handleNext}>
            Next
          </button>
        )}
      </div>
    </div>
  );
}

export default Quiz;
