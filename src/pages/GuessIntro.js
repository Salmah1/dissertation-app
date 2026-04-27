import "../styles/Quiz.css";
import AccessibilityPanel from "../components/AccessibilityPanel";

function GuessIntro({ goToQuiz, ...accessibilityProps }) {
  return (
    <div className="screen">
      <div className="card full-card">
        <div className="card-header">
          <AccessibilityPanel {...accessibilityProps} />

          <span className="progress-pill">Activity 2 of 3</span>
          <div className="card-icon">🔮</div>
          <h2>Can AI read your mind?</h2>
        </div>

        <div className="card-content">
          <p>
            Answer 3 simple "this or that" questions and see what the AI can
            guess about you.
          </p>

          <button className="btn" onClick={goToQuiz}>
            Start
          </button>
        </div>
      </div>
    </div>
  );
}

export default GuessIntro;
