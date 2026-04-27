import { useEffect, useRef } from "react";
import "../styles/Accessibility.css";

function AccessibilityPanel({
  className = "",
  highContrast,
  showAccessibility,
  toggleAccessibility,
  toggleHighContrast,
  closeAccessibility = () => {},
  fontScale = 1,
  setFontScale = () => {},
}) {
  const panelRef = useRef(null);

  useEffect(() => {
    const handleClick = (e) => {
      if (
        showAccessibility &&
        panelRef.current &&
        !panelRef.current.contains(e.target)
      ) {
        closeAccessibility();
      }
    };

    document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, [showAccessibility, closeAccessibility]);

  return (
    <div className={`accessibility-panel ${className}`} ref={panelRef}>
      <button
        className="accessibility-toggle"
        onClick={toggleAccessibility}
        aria-expanded={showAccessibility}
        aria-label="Open accessibility settings"
      >
        Aa
      </button>

      {showAccessibility && (
        <div className="accessibility-menu">
          <p className="accessibility-title">Accessibility</p>

          <button
            className={highContrast ? "active-accessibility" : ""}
            onClick={toggleHighContrast}
            aria-pressed={highContrast}
          >
            {highContrast ? "Normal contrast" : "High contrast"}
          </button>

          <div className="accessibility-divider"></div>

          <button
            className={Number(fontScale) === 1 ? "active-accessibility" : ""}
            onClick={() => setFontScale(1)}
          >
            A Normal
          </button>
          <button
            className={Number(fontScale) === 1.15 ? "active-accessibility" : ""}
            onClick={() => setFontScale(1.15)}
          >
            A+ Large
          </button>
          <button
            className={Number(fontScale) === 1.3 ? "active-accessibility" : ""}
            onClick={() => setFontScale(1.3)}
          >
            A++ Larger
          </button>
        </div>
      )}
    </div>
  );
}

export default AccessibilityPanel;
