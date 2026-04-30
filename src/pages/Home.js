import { useState } from "react";
import "../styles/Home.css";
import AccessibilityPanel from "../components/AccessibilityPanel";

function Home({ goToQuiz, goToGuess, goToOutput, ...accessibilityProps }) {
  const [showQr, setShowQR] = useState(false);

  return (
    <div className="screen">
      <div className="card full-card">
        <div className="card-header home-header">
          <AccessibilityPanel {...accessibilityProps} />

          <img
            src="/qr-code.png"
            alt="QR code"
            className="qr-small"
            onClick={() => setShowQR(true)}
          />

          {showQr && (
            <div className="qr-overlay" onClick={() => setShowQR(false)}>
              <img
                src="/qr-code.png"
                alt="QR code large"
                className="qr-large"
                onClick={(e) => e.stopPropagation()}
              />
            </div>
          )}

          <img src="/logo.jpg" alt="SCALE logo" className="logo" />

          <strong className="project-name">SCALE · Cardiff University</strong>

          <h1 className="title">
            Let's explore <span className="highlight">AI together!</span>
          </h1>

          <p className="text">
            Explore how AI can support everyday life and social care through
            three quick activities.
          </p>

          <div className="time-pill">⏱️ 2-3 minutes</div>

          <p className="hint">
            Ready? Tap Start to go in order, or tap an activity below to jump
            ahead.
          </p>
        </div>

        <div className="activity-grid">
          <button className="activity-card" onClick={goToQuiz}>
            <div className="activity-step">1</div>
            <span className="activity-icon">🧠</span>
            <p className="activity-title">AI Quiz</p>
          </button>

          <button className="activity-card" onClick={goToGuess}>
            <div className="activity-step">2</div>
            <span className="activity-icon">🔮</span>
            <p className="activity-title">AI Guess</p>
          </button>

          <button className="activity-card" onClick={goToOutput}>
            <div className="activity-step">3</div>
            <span className="activity-icon">💭</span>
            <p className="activity-title">AI Visuals</p>
          </button>
        </div>

        <div className="card-content">
          <button className="btn" onClick={goToQuiz}>
            Start exploring
          </button>
        </div>
      </div>
    </div>
  );
}

export default Home;
