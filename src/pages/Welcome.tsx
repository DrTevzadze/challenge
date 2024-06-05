import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

function Welcome() {
  const navigate = useNavigate();
  const [isVisible, setIsVisible] = useState(true);
  const [showH1, setShowH1] = useState(false);
  const [showH2, setShowH2] = useState(false);

  useEffect(() => {
    const h1Timer = setTimeout(() => {
      setShowH1(true);
    }, 100);

    const h2Timer = setTimeout(() => {
      setShowH2(true);
    }, 1000);

    const fadeOutTimer = setTimeout(() => {
      setIsVisible(false);
    }, 3000);

    const navigationTimer = setTimeout(() => {
      navigate("/home");
    }, 4000);

    return () => {
      clearTimeout(h1Timer);
      clearTimeout(h2Timer);
      clearTimeout(fadeOutTimer);
      clearTimeout(navigationTimer);
    };
  }, [navigate]);

  return (
    <div
      className={`flex flex-col items-center justify-center h-screen bg-blue-500 transition-opacity duration-1000 ${
        isVisible ? "opacity-100" : "opacity-0"
      }`}
    >
      <div className="flex flex-col items-center">
        <h1
          className={`text-5xl text-white mb-4 transition-all duration-1000 transform ${
            showH1 ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-full"
          }`}
        >
          Welcome to the Settlement App!
        </h1>
        <h2
          className={`text-3xl text-white mb-4 transition-all duration-1000 transform ${
            showH2 ? "opacity-100 translate-x-0" : "opacity-0 translate-x-full"
          }`}
        >
          I hope you will enjoy the final result.
        </h2>
      </div>
    </div>
  );
}

export default Welcome;
