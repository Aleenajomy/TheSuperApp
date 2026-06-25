import React, { useState, useEffect, useRef } from "react";
import { ChevronUp, ChevronDown, Play, Pause, RotateCcw } from "lucide-react";

const TimerWidget = () => {
  const [hours, setHours] = useState(0);
  const [minutes, setMinutes] = useState(0);
  const [seconds, setSeconds] = useState(0);

  const [totalSeconds, setTotalSeconds] = useState(0);
  const [secondsLeft, setSecondsLeft] = useState(0);
  const [isRunning, setIsRunning] = useState(false);

  const timerRef = useRef(null);

  // Play alarm sound using Web Audio API (no external assets needed)
  const playAlarm = () => {
    try {
      const audioCtx = new (window.AudioContext || window.webkitAudioContext)();
      const oscillator = audioCtx.createOscillator();
      const gainNode = audioCtx.createGain();

      oscillator.connect(gainNode);
      gainNode.connect(audioCtx.destination);

      oscillator.type = "sine";
      oscillator.frequency.setValueAtTime(600, audioCtx.currentTime); // Pitch
      gainNode.gain.setValueAtTime(0.5, audioCtx.currentTime);

      oscillator.start();
      // Triple beep
      gainNode.gain.setValueAtTime(0.5, audioCtx.currentTime);
      gainNode.gain.setValueAtTime(0, audioCtx.currentTime + 0.2);
      gainNode.gain.setValueAtTime(0.5, audioCtx.currentTime + 0.4);
      gainNode.gain.setValueAtTime(0, audioCtx.currentTime + 0.6);
      gainNode.gain.setValueAtTime(0.5, audioCtx.currentTime + 0.8);
      gainNode.gain.exponentialRampToValueAtTime(0.001, audioCtx.currentTime + 1.2);
      
      oscillator.stop(audioCtx.currentTime + 1.2);
    } catch (e) {
      console.warn("Could not play synthesized audio alarm:", e);
    }
  };

  // Up/down handlers
  const adjust = (type, direction) => {
    if (isRunning) return;

    if (type === "hours") {
      setHours((prev) => {
        const val = direction === "up" ? prev + 1 : prev - 1;
        return val < 0 ? 99 : val > 99 ? 0 : val;
      });
    } else if (type === "minutes") {
      setMinutes((prev) => {
        const val = direction === "up" ? prev + 1 : prev - 1;
        return val < 0 ? 59 : val > 59 ? 0 : val;
      });
    } else if (type === "seconds") {
      setSeconds((prev) => {
        const val = direction === "up" ? prev + 1 : prev - 1;
        return val < 0 ? 59 : val > 59 ? 0 : val;
      });
    }
  };

  // Timer countdown interval
  useEffect(() => {
    let interval = null;
    if (isRunning && secondsLeft > 0) {
      interval = setInterval(() => {
        setSecondsLeft((prev) => prev - 1);
      }, 1000);
    }
    return () => {
      if (interval) clearInterval(interval);
    };
  }, [isRunning, secondsLeft > 0]);

  // Timer expiration trigger
  useEffect(() => {
    if (isRunning && secondsLeft === 0) {
      setIsRunning(false);
      playAlarm();
      setTimeout(() => {
        alert("Timer finished!");
      }, 50);
    }
  }, [secondsLeft, isRunning]);

  // Sync inputs to total only when user adjusts input values
  useEffect(() => {
    const calculated = hours * 3600 + minutes * 60 + seconds;
    setTotalSeconds(calculated);
    setSecondsLeft(calculated);
  }, [hours, minutes, seconds]);

  const handleStartStop = () => {
    if (totalSeconds === 0) return;
    setIsRunning(!isRunning);
  };

  const handleReset = () => {
    setIsRunning(false);
    setSecondsLeft(totalSeconds);
  };

  // Render format
  const formatTimeDigits = (totalSecs) => {
    const hrs = Math.floor(totalSecs / 3600);
    const mins = Math.floor((totalSecs % 3600) / 60);
    const secs = totalSecs % 60;
    return `${String(hrs).padStart(2, "0")}:${String(mins).padStart(2, "0")}:${String(secs).padStart(2, "0")}`;
  };

  // Circular progress dimensions
  // r = 85, C = 2 * pi * 85 = 534
  const radius = 85;
  const circumference = 2 * Math.PI * radius;
  const progressPercent = totalSeconds > 0 ? secondsLeft / totalSeconds : 0;
  const strokeDashoffset = circumference - progressPercent * circumference;

  return (
    <div className="timer-widget d-flex flex-column flex-sm-row align-items-center justify-content-around gap-4 p-4 h-100">
      <div className="timer-left-circle position-relative d-flex align-items-center justify-content-center flex-shrink-0" style={{ width: "160px", height: "160px" }}>
        <svg className="timer-svg w-100 h-100" viewBox="0 0 200 200">
          <circle
            cx="100"
            cy="100"
            r={radius}
            className="timer-circle-bg"
            stroke="#121528"
            strokeWidth="8"
            fill="transparent"
          />
          <circle
            cx="100"
            cy="100"
            r={radius}
            className="timer-circle-progress"
            stroke="#FF5E7E"
            strokeWidth="8"
            fill="transparent"
            strokeDasharray={circumference}
            strokeDashoffset={strokeDashoffset}
            strokeLinecap="round"
            transform="rotate(-90 100 100)"
            style={{ transition: "stroke-dashoffset 0.1s linear" }}
          />
        </svg>
        <div className="timer-text-display position-absolute fs-4 fw-medium text-white">
          {formatTimeDigits(secondsLeft)}
        </div>
      </div>

      <div className="timer-right-controls d-flex flex-column align-items-center gap-3 flex-grow-1">
        <div className="timer-inputs-selectors d-flex align-items-center justify-content-center gap-3 w-100">
          <div className="selector-col d-flex flex-column align-items-center" style={{ width: "60px" }}>
            <span className="selector-label small text-secondary text-uppercase mb-1" style={{ letterSpacing: "0.5px" }}>Hours</span>
            <button
              onClick={() => adjust("hours", "up")}
              disabled={isRunning}
              className="btn btn-link p-0 text-secondary border-0 shadow-none"
              style={{ color: "#7F8C8D" }}
            >
              <ChevronUp size={20} />
            </button>
            <span className="selector-value fs-3 fw-bold text-white my-1">{String(hours).padStart(2, "0")}</span>
            <button
              onClick={() => adjust("hours", "down")}
              disabled={isRunning}
              className="btn btn-link p-0 text-secondary border-0 shadow-none"
              style={{ color: "#7F8C8D" }}
            >
              <ChevronDown size={20} />
            </button>
          </div>

          <div className="selector-colon fs-3 fw-bold text-white mb-2">:</div>

          <div className="selector-col d-flex flex-column align-items-center" style={{ width: "60px" }}>
            <span className="selector-label small text-secondary text-uppercase mb-1" style={{ letterSpacing: "0.5px" }}>Minutes</span>
            <button
              onClick={() => adjust("minutes", "up")}
              disabled={isRunning}
              className="btn btn-link p-0 text-secondary border-0 shadow-none"
              style={{ color: "#7F8C8D" }}
            >
              <ChevronUp size={20} />
            </button>
            <span className="selector-value fs-3 fw-bold text-white my-1">{String(minutes).padStart(2, "0")}</span>
            <button
              onClick={() => adjust("minutes", "down")}
              disabled={isRunning}
              className="btn btn-link p-0 text-secondary border-0 shadow-none"
              style={{ color: "#7F8C8D" }}
            >
              <ChevronDown size={20} />
            </button>
          </div>

          <div className="selector-colon fs-3 fw-bold text-white mb-2">:</div>

          <div className="selector-col d-flex flex-column align-items-center" style={{ width: "60px" }}>
            <span className="selector-label small text-secondary text-uppercase mb-1" style={{ letterSpacing: "0.5px" }}>Seconds</span>
            <button
              onClick={() => adjust("seconds", "up")}
              disabled={isRunning}
              className="btn btn-link p-0 text-secondary border-0 shadow-none"
              style={{ color: "#7F8C8D" }}
            >
              <ChevronUp size={20} />
            </button>
            <span className="selector-value fs-3 fw-bold text-white my-1">{String(seconds).padStart(2, "0")}</span>
            <button
              onClick={() => adjust("seconds", "down")}
              disabled={isRunning}
              className="btn btn-link p-0 text-secondary border-0 shadow-none"
              style={{ color: "#7F8C8D" }}
            >
              <ChevronDown size={20} />
            </button>
          </div>
        </div>

        <div className="timer-actions-container d-flex justify-content-center align-items-center gap-3 w-100" style={{ maxWidth: "280px" }}>
          <button
            onClick={handleStartStop}
            className="btn btn-danger btn-lg rounded-pill px-4 fw-bold flex-grow-1 text-white border-0"
            style={{ backgroundColor: "#FF5E7E" }}
          >
            {isRunning ? "Pause" : (secondsLeft < totalSeconds && secondsLeft > 0 ? "Resume" : "Start")}
          </button>
          <button
            onClick={handleReset}
            className="btn btn-outline-secondary btn-lg text-white rounded-pill px-4 fw-bold flex-grow-1 border-2"
            style={{ borderColor: "#7F8C8D" }}
          >
            Reset
          </button>
        </div>
      </div>
    </div>
  );
};

export default TimerWidget;
