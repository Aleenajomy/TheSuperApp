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
    <div className="timer-widget">
      <div className="timer-left-circle">
        <svg className="timer-svg" viewBox="0 0 200 200">
          <circle
            cx="100"
            cy="100"
            r={radius}
            className="timer-circle-bg"
            strokeWidth="8"
            fill="transparent"
          />
          <circle
            cx="100"
            cy="100"
            r={radius}
            className="timer-circle-progress"
            strokeWidth="8"
            fill="transparent"
            strokeDasharray={circumference}
            strokeDashoffset={strokeDashoffset}
            strokeLinecap="round"
            transform="rotate(-90 100 100)"
          />
        </svg>
        <div className="timer-text-display">
          {formatTimeDigits(secondsLeft)}
        </div>
      </div>

      <div className="timer-right-controls">
        <div className="timer-inputs-selectors">
          <div className="selector-col">
            <span className="selector-label">Hours</span>
            <button
              onClick={() => adjust("hours", "up")}
              disabled={isRunning}
              className="arrow-btn"
            >
              <ChevronUp size={24} />
            </button>
            <span className="selector-value">{String(hours).padStart(2, "0")}</span>
            <button
              onClick={() => adjust("hours", "down")}
              disabled={isRunning}
              className="arrow-btn"
            >
              <ChevronDown size={24} />
            </button>
          </div>

          <div className="selector-colon">:</div>

          <div className="selector-col">
            <span className="selector-label">Minutes</span>
            <button
              onClick={() => adjust("minutes", "up")}
              disabled={isRunning}
              className="arrow-btn"
            >
              <ChevronUp size={24} />
            </button>
            <span className="selector-value">{String(minutes).padStart(2, "0")}</span>
            <button
              onClick={() => adjust("minutes", "down")}
              disabled={isRunning}
              className="arrow-btn"
            >
              <ChevronDown size={24} />
            </button>
          </div>

          <div className="selector-colon">:</div>

          <div className="selector-col">
            <span className="selector-label">Seconds</span>
            <button
              onClick={() => adjust("seconds", "up")}
              disabled={isRunning}
              className="arrow-btn"
            >
              <ChevronUp size={24} />
            </button>
            <span className="selector-value">{String(seconds).padStart(2, "0")}</span>
            <button
              onClick={() => adjust("seconds", "down")}
              disabled={isRunning}
              className="arrow-btn"
            >
              <ChevronDown size={24} />
            </button>
          </div>
        </div>

        <div className="timer-actions-container">
          <button
            onClick={handleStartStop}
            className={`timer-action-btn ${isRunning ? "running" : ""}`}
          >
            {isRunning ? "Pause" : (secondsLeft < totalSeconds && secondsLeft > 0 ? "Resume" : "Start")}
          </button>
          <button
            onClick={handleReset}
            className="timer-reset-btn"
          >
            Reset
          </button>
        </div>
      </div>
    </div>
  );
};

export default TimerWidget;
