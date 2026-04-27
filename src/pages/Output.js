import { useState } from "react";
import "../styles/Output.css";
import "../styles/Quiz.css";
import AccessibilityPanel from "../components/AccessibilityPanel";

function Output({ goNext, ...accessibilityProps }) {
  // Output states
  const [step, setStep] = useState("intro"); // Controls which step is shown
  const [userIdea, setUserIdea] = useState(""); // Stores the user's input

  const [generatedImage, setGeneratedImage] = useState(""); // Stores generated image from backend
  const [loading, setLoading] = useState(false); // Tracks whether image is being generated

  const [error, setError] = useState("");

  const isValidIdea = (text) => {
    const trimmed = text.trim();

    const isValidChars = /^[a-zA-Z0-9\s.,'!?+-]+$/;
    if (!isValidChars.test(trimmed)) return false;

    // Must be at least 10 characters
    if (trimmed.length < 10) return false;

    // Must be at least 3 words
    const words = trimmed.split(/\s+/);
    if (words.length < 3) return false;

    return true;
  };

  // Sends the user's userIdea to the backend and displays generated image
  const handleGenerate = async () => {
    if (!isValidIdea(userIdea)) {
      setError(
        "Please type an idea (at least 3 words) or select one of the options above.",
      );
      return;
    }
    // Move to output page
    setStep("output");
    setLoading(true);
    setError("");
    setGeneratedImage("");

    let timeout;

    try {
      timeout = setTimeout(() => {
        setGeneratedImage("/fallback-image.png");
        setLoading(false);
      }, 10000);

      // Send request to backend
      const res = await fetch("http://localhost:3001/output", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ prompt: userIdea }),
      });

      if (!res.ok) {
        throw new Error("Server error");
      }

      // Convert response to JSON
      const data = await res.json();
      clearTimeout(timeout);

      if (!data.image) {
        throw new Error("No image returned");
      }

      // Save returned image to state
      setGeneratedImage(data.image);
    } catch (error) {
      clearTimeout(timeout);
      console.error("Error:", error.message);
      setGeneratedImage("/fallback-image.png");
    }
    setLoading(false);
  };

  // Fills the textarea when the user taps an example userIdea
  const handleIdeaSelect = (selectedIdea) => {
    setUserIdea(selectedIdea);
    setError("");
  };

  return (
    <>
      {/* Intro page */}
      {step === "intro" && (
        <div className="screen">
          <div className="card full-card">
            <div className="card-header">
              <AccessibilityPanel {...accessibilityProps} />

              <span className="progress-pill">Activity 3 of 3</span>
              <div className="card-icon">💭</div>
              <h2>What could social care look like?</h2>
            </div>

            <div className="card-content">
              <p>
                Describe an idea for the future of social care and watch the AI
                bring it to life instantly.
              </p>

              <button className="btn" onClick={() => setStep("input")}>
                Start
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Input page */}
      {step === "input" && (
        <div className="screen">
          <div className="card-container output-card">
            <div className="card-row">
              <div className="card-title">
                <div className="left">💭 AI Visuals</div>
              </div>

              <div className="progress-pill">Create visual</div>

              <AccessibilityPanel {...accessibilityProps} />
            </div>

            {/* <div className="progress-pill">Generate visual</div> */}

            <div className="question-box output-box">
              <span className="question-icon">💭</span>
              <span className="question-text">
                What could AI in social care look like to you?
              </span>
            </div>

            <h3 className="output-title">Need some inspiration? Tap one:</h3>

            {/* Example ideas for user to select */}
            <div className="output-ideas">
              <button
                className="output-idea"
                onClick={() =>
                  handleIdeaSelect(
                    "AI that keeps you company between carer visits",
                  )
                }
              >
                AI that keeps you company between carer visits.
              </button>

              <button
                className="output-idea"
                onClick={() =>
                  handleIdeaSelect(
                    "A robot that helps with paperwork, giving carers more time to support people",
                  )
                }
              >
                A robot that helps with paperwork, giving carers more time to
                support people.
              </button>

              <button
                className="output-idea"
                onClick={() =>
                  handleIdeaSelect(
                    "Smart technology that detects when something isn't right and alerts your carer",
                  )
                }
              >
                Smart technology that detects when something isn't right and
                alerts your carer.
              </button>
            </div>

            <h3 className="output-title">Or type your own idea:</h3>

            <textarea
              className="output-textarea"
              placeholder="Type your idea..."
              value={userIdea}
              onChange={(e) => {
                setUserIdea(e.target.value);
                setError("");
              }}
            />

            {error && (
              <p className="error-text" aria-live="polite">
                {error}
              </p>
            )}

            <button
              className="btn"
              onClick={handleGenerate}
              disabled={loading || !isValidIdea(userIdea)}
            >
              Next
            </button>
          </div>
        </div>
      )}

      {/* Output page */}
      {step === "output" && (
        <div className="screen">
          <div className="card-container results-container">
            <div className="card-row">
              <div className="card-title">
                <div className="left">💭 AI Visuals</div>
              </div>

              <div className="progress-pill">Results</div>

              <AccessibilityPanel {...accessibilityProps} />
            </div>

            <div className="output-container">
              {userIdea && (
                <div className="output-section">
                  <h3>Your idea</h3>
                  <div className="row-item">
                    <span>💭</span>
                    <p>
                      "{userIdea.charAt(0).toUpperCase() + userIdea.slice(1)}"
                    </p>
                  </div>
                </div>
              )}

              {/* Show loading text or image */}
              {loading ? (
                <p className="loading-text" aria-live="polite">
                  AI is creating your visual...
                </p>
              ) : generatedImage ? (
                <img
                  src={generatedImage}
                  className="output-image"
                  alt="AI-generated visual from idea"
                />
              ) : null}
            </div>

            <div className="info-section">
              <h3>Did you know?</h3>

              <div className="row-item">
                <span>💡</span>
                <p>
                  AI images reflect what they were trained on, so futuristic
                  robots appear a lot, even for ideas about care and compassion.
                </p>
              </div>
            </div>

            <button
              className="btn"
              onClick={goNext}
              disabled={loading || !generatedImage}
            >
              Continue
            </button>
          </div>
        </div>
      )}
    </>
  );
}

export default Output;
