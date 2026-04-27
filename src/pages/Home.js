import "../styles/Home.css";
import AccessibilityPanel from "../components/AccessibilityPanel";

function Home({ goToQuiz, ...accessibilityProps }) {
  return (
    <div className="screen">
      <div className="card full-card">
        {/* Logo image */}
        <div className="card-header home-header">
          <AccessibilityPanel {...accessibilityProps} />

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
        </div>

        {/* <p className="hint">Ready? Scan the QR code or tap Start to begin</p> */}

        <div className="activity-grid">
          <div className="activity-card">
            <div className="activity-step">1</div>
            <span className="activity-icon">🧠</span>
            <p className="activity-title">AI Quiz</p>
          </div>

          <div className="activity-card">
            <div className="activity-step">2</div>
            <span className="activity-icon">🔮</span>
            <p className="activity-title">AI Guess</p>
          </div>

          <div className="activity-card">
            <div className="activity-step">3</div>
            <span className="activity-icon">💭</span>
            <p className="activity-title">AI Visuals</p>
          </div>
        </div>

        <div className="card-content">
          <button className="btn" onClick={goToQuiz}>
            Start exploring
          </button>

          <p className="footer">🔒 No personal data is collected or stored.</p>
        </div>
      </div>
    </div>
  );
}

export default Home;
