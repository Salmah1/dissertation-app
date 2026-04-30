import "../styles/Final.css";
import AccessibilityPanel from "../components/AccessibilityPanel";

function Final({
  score,
  total,
  guessFeedback,
  latestOutputIdea,
  latestOutputImage,
  restartApp,
  ...accessibilityProps
}) {
  return (
    <div className="screen">
      <div className="card-container results-container final">
        <div className="card-row">
          <div className="card-title">
            <div className="left">🏆 Complete </div>
          </div>

          <span className="progress-pill">Summary</span>

          <AccessibilityPanel {...accessibilityProps} />
        </div>

        <div className="info-section final-section final-container">
          <h3>Thank you for exploring AI with us!</h3>
          <div className="row-item">
            <span>🤖</span>
            <p>
              You've just taken your first step in understanding how AI works in
              the real world.
            </p>
          </div>
        </div>

        <div className="info-section final-container">
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
        </div>

        <div className="info-section final-container">
          <h3>What we learned today</h3>

          <div className="row-item">
            <span>🧠</span>
            <p>AI is already part of everyday life.</p>
          </div>

          <div className="row-item">
            <span>🔮</span>
            <p>AI can make guesses, but it does not truly know people.</p>
          </div>

          {/* Feedback from AI guess activity */}
          {guessFeedback && (
            <div className="row-item final-feedback">
              <span>{guessFeedback === "yes" ? "👍" : "👎"}</span>
              <p>
                You said the AI's guess was{" "}
                <strong>
                  {guessFeedback === "yes" ? "accurate" : "inaccurate"}
                </strong>
                .
              </p>
            </div>
          )}

          <div className="row-item">
            <span>💭</span>
            <p>AI can create visuals from ideas and prompts.</p>
          </div>
        </div>

        <div className="info-section">
          <h3>About this project</h3>

          <div className="row-item">
            <img className="final-logo" src="/logo.jpg" alt="SCALE logo" />

            <div>
              <strong>SCALE · Cardiff University</strong>
              <p className="final-text">
                Researching how AI can support social care in Wales.
              </p>
            </div>
          </div>
        </div>

        <div className="final-actions">
          {/* Link to SCALE website */}
          <button
            className="secondary-btn"
            onClick={() =>
              window.open("https://www.scaleresearchwales.org/", "_blank")
            }
          >
            Learn more about SCALE
          </button>

          {/* Link to feedback form */}
          <button
            className="btn primary-btn"
            onClick={() =>
              window.open(
                "https://forms.gle/9L4czy9U1x6vM9Mp9",
                "_blank",
                "noopener,noreferrer",
              )
            }
          >
            Share feedback
          </button>

          {/* Restarts app */}
          <button className="text-btn" onClick={restartApp}>
            Replay activity
          </button>
        </div>
      </div>
    </div>
  );
}

export default Final;
