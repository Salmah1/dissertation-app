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
  const [fontScale, setFontScale] = useState(1);

  const [quizBreakdown, setQuizBreakdown] = useState([]);

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
      {/* Home */}
      {page === "home" && (
        <Home goToQuiz={() => setPage("quizIntro")} {...accessibilityProps} />
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
          goNext={() => setPage("guessIntro")}
          {...accessibilityProps}
        />
      )}

      {/* Guess Intro */}
      {page === "guessIntro" && (
        <GuessIntro goToQuiz={() => setPage("guess")} {...accessibilityProps} />
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
          goNext={() => setPage("output")}
          {...accessibilityProps}
        />
      )}

      {/* Output */}
      {page === "output" && (
        <Output goNext={() => setPage("final")} {...accessibilityProps} />
      )}

      {/* Final */}
      {page === "final" && (
        <Final
          score={score}
          total={4}
          guessFeedback={guessFeedback}
          restartApp={() => {
            setScore(0);
            setAnswers([]);
            setGuessFeedback(null);
            setPage("home");
          }}
          {...accessibilityProps}
        />
      )}
    </div>
  );
}

export default App;
