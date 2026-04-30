import { useEffect, useState } from "react";
import Home from "./pages/Home";
import QuizIntro from "./pages/QuizIntro";
import Quiz from "./pages/Quiz";
import QuizResults from "./pages/QuizResults";
import GuessIntro from "./pages/GuessIntro";
import Guess from "./pages/Guess";
import GuessResults from "./pages/GuessResults";
import Output from "./pages/Output";
import Final from "./pages/Final";
import "./styles/Global.css";
import "./styles/HighContrast.css";

function App() {
  const [page, setPage] = useState("home");
  const [score, setScore] = useState(0);
  const [answers, setAnswers] = useState([]);
  const [guessFeedback, setGuessFeedback] = useState(null);

  const [highContrast, setHighContrast] = useState(false);
  const [showAccessibility, setShowAccessibility] = useState(false);
  const [fontScale, setFontScale] = useState(1.3);

  const [quizBreakdown, setQuizBreakdown] = useState([]);

  const [completedSections, setCompletedSections] = useState({
    quiz: false,
    guess: false,
    output: false,
  });

  const [latestOutputIdea, setLatestOutputIdea] = useState("");
  const [latestOutputImage, setLatestOutputImage] = useState("");

  const allSectionsComplete =
    completedSections.quiz &&
    completedSections.guess &&
    completedSections.output;

  const goToNextIncompleteSection = (updatedCompleted) => {
    if (!updatedCompleted.quiz) {
      setPage("quizIntro");
    } else if (!updatedCompleted.guess) {
      setPage("guessIntro");
    } else if (!updatedCompleted.output) {
      setPage("output");
    } else {
      setPage("final");
    }
  };

  const accessibilityProps = {
    highContrast,
    showAccessibility,
    fontScale,
    setFontScale,
    toggleHighContrast: () => setHighContrast(!highContrast),
    toggleAccessibility: () => setShowAccessibility(!showAccessibility),
    closeAccessibility: () => setShowAccessibility(false),
  };

  useEffect(() => {
    document.documentElement.style.setProperty(
      "--font-scale",
      `${16 * fontScale}px`,
    );
  }, [fontScale]);

  return (
    <div className={highContrast ? "high-contrast" : ""}>
      <div className="app-layout">
        {/* Home */}
        {page === "home" && (
          <Home
            goToQuiz={() => setPage("quizIntro")}
            goToGuess={() => setPage("guessIntro")}
            goToOutput={() => setPage("output")}
            {...accessibilityProps}
          />
        )}

        {/* Quiz Intro */}
        {page === "quizIntro" && (
          <QuizIntro goToQuiz={() => setPage("quiz")} {...accessibilityProps} />
        )}

        {/* Quiz */}
        {page === "quiz" && (
          <Quiz
            goToResults={(finalScore, breakdown) => {
              setScore(finalScore);
              setQuizBreakdown(breakdown);
              setPage("quizResults");
            }}
            {...accessibilityProps}
          />
        )}

        {/* Quiz Results */}
        {page === "quizResults" && (
          <QuizResults
            score={score}
            total={4}
            breakdown={quizBreakdown}
            restartQuiz={() => setPage("quiz")}
            goNext={() => {
              // Mark quiz section as complete
              const updatedCompleted = { ...completedSections, quiz: true };
              setCompletedSections(updatedCompleted);

              // Automatically route use to the next incomplete section
              goToNextIncompleteSection(updatedCompleted);
            }}
            {...accessibilityProps}
          />
        )}

        {/* Guess Intro */}
        {page === "guessIntro" && (
          <GuessIntro
            goToQuiz={() => setPage("guess")}
            {...accessibilityProps}
          />
        )}

        {/* Guess */}
        {page === "guess" && (
          <Guess
            goToResults={(answers) => {
              setAnswers(answers);
              setPage("guessResults");
            }}
            {...accessibilityProps}
          />
        )}

        {/* Guess Results */}
        {page === "guessResults" && (
          <GuessResults
            answers={answers}
            setGuessFeedback={setGuessFeedback}
            restartGuess={() => setPage("guess")}
            goNext={() => {
              // Mark quiz section as complete
              const updatedCompleted = { ...completedSections, guess: true };
              setCompletedSections(updatedCompleted);
              // Automatically route use to the next incomplete section
              goToNextIncompleteSection(updatedCompleted);
            }}
            {...accessibilityProps}
          />
        )}

        {/* Output */}
        {page === "output" && (
          <Output
            restartOutput={() => setPage("output")}
            goNext={() => {
              // Mark quiz section as complete
              const updatedCompleted = { ...completedSections, output: true };
              setCompletedSections(updatedCompleted);
              // Automatically route use to the next incomplete section
              goToNextIncompleteSection(updatedCompleted);
            }}
            // Store the idea and image so they can be shown on final page
            setLatestOutputIdea={setLatestOutputIdea}
            setLatestOutputImage={setLatestOutputImage}
            {...accessibilityProps}
          />
        )}

        {/* Final */}
        {page === "final" && allSectionsComplete && (
          <Final
            score={score}
            total={4}
            guessFeedback={guessFeedback}
            latestOutputIdea={latestOutputIdea}
            latestOutputImage={latestOutputImage}
            restartApp={() => {
              // Reset all application states to initial values
              setScore(0);
              setAnswers([]);
              setGuessFeedback(null);
              setQuizBreakdown([]);

              // Clear stored output data
              setLatestOutputIdea("");
              setLatestOutputImage("");

              // Reset section completion tracking
              setCompletedSections({
                quiz: false,
                guess: false,
                output: false,
              });

              // Go back to home screen
              setPage("home");
            }}
            {...accessibilityProps}
          />
        )}

        {/* Footer */}
        <footer className="footer">
          <p className="footer-main">
            🔒 No personal data is collected or stored
          </p>

          <p className="footer-sub">
            {" "}
            Educational AI prototype · AI responses may be inaccurate
          </p>

          <div className="footer-links">
            <a
              href="https://scaleresearchwales.org"
              target="_blank"
              rel="noreferrer"
            >
              Website{" "}
            </a>
            <span>·</span>
            <a
              href="https://uk.linkedin.com/company/scale-research-wales"
              target="_blank"
              rel="noreferrer"
            >
              {" "}
              LinkedIn{" "}
            </a>
            <span>·</span>
            <a href="mailto:scale@cardiff.ac.uk"> Email</a>
          </div>

          <p className="footer-copy">© 2026 Cardiff University</p>
        </footer>
      </div>
    </div>
  );
}

export default App;
