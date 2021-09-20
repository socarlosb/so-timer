import React, { useEffect, useRef, useState } from "react";
import "./App.css";

function App() {
  const defaultSeconds = useRef(600);
  const [seconds, setSeconds] = useState(defaultSeconds.current);
  const [pause, setPause] = useState(true);
  const favicon = document.querySelector("#favicon") as HTMLAnchorElement;

  const updateSeconds = (e: number) => {
    defaultSeconds.current = e;
    return setSeconds(defaultSeconds.current);
  };

  const handleCountdown = () => {
    if (seconds < 1) {
      setSeconds(defaultSeconds.current);
      favicon.href = "favicon-blue.ico";
      return;
    }
    favicon.href = "favicon-green.ico";
    setSeconds((prev) => prev - 1);
  };

  useEffect(() => {
    if (pause) return;

    document.title = `time left: ${parseNumbers(seconds)}`;
    let timer = setTimeout(handleCountdown, 1000);
    return () => clearTimeout(timer);
  }, [seconds, pause]);

  const handleCounter = () => {
    if (!pause) {
      setPause(true);
      document.title = `time paused: ${parseNumbers(seconds)}`;
      favicon.href = "favicon-yellow.ico";
      return;
    }
    setPause(false);
  };

  const restartCounter = () => {
    document.title = `start the timer!`;
    favicon.href = "favicon-blue.ico";
    setPause(true);
    setSeconds(defaultSeconds.current);
  };

  const parseNumbers = (num: number) => {
    return num < 10 ? `0${num}` : num;
  };

  return (
    <section className="container">
      <input
        disabled={!pause ? true : false}
        className="time-minutes"
        type="number"
        min="1"
        max="60"
        value={parseNumbers(seconds)}
        onInput={(e) => updateSeconds(Number(e.currentTarget.value))}
      ></input>
      <article className="actions">
        <button className="actions-play" onClick={handleCounter}>
          {pause ? "start" : "pause"}
        </button>
        <button className="actions-restart" onClick={restartCounter}>
          restart
        </button>
      </article>
    </section>
  );
}

export default App;
