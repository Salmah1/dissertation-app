import "../styles/Quiz.css";
import AccessibilityPanel from "../components/AccessibilityPanel";

function QuizIntro({ goToQuiz, ...accessibilityProps }) {
  return (
    <div className="screen">
      <div className="card full-card">
        <div className="card-header">
          <AccessibilityPanel {...accessibilityProps} />

          <span className="progress-pill">Activity 1 of 3</span>
          <div className="card-icon">🧠</div>
          <h2>Is it AI or just a machine?</h2>
        </div>

        <div className="card-content">
          <p>
            Test your knowledge with 4 quick questions about the technology we
            use every day.
          </p>

          <button className="btn" onClick={goToQuiz}>
            Start
          </button>
        </div>
      </div>
    </div>
  );
}

export default QuizIntro;
