import React, { useState, useEffect } from 'react';
import { Play, Pause, RotateCcw, Coffee, Brain } from 'lucide-react';

type TimerMode = 'work' | 'break';

export function Timer() {
  const [timeLeft, setTimeLeft] = useState(25 * 60); // 25 minutes in seconds
  const [isRunning, setIsRunning] = useState(false);
  const [mode, setMode] = useState<TimerMode>('work');
  const [cycles, setCycles] = useState(0);

  const workTime = 25 * 60;
  const breakTime = 5 * 60;

  useEffect(() => {
    let interval: number | undefined;

    if (isRunning && timeLeft > 0) {
      interval = window.setInterval(() => {
        setTimeLeft((time) => time - 1);
      }, 1000);
    } else if (timeLeft === 0) {
      handleTimerComplete();
    }

    return () => clearInterval(interval);
  }, [isRunning, timeLeft]);

  const handleTimerComplete = () => {
    if (mode === 'work') {
      setMode('break');
      setTimeLeft(breakTime);
      setCycles(c => c + 1);
      new Audio('https://assets.mixkit.co/active_storage/sfx/2869/2869-preview.mp3').play();
    } else {
      setMode('work');
      setTimeLeft(workTime);
      new Audio('https://assets.mixkit.co/active_storage/sfx/2869/2869-preview.mp3').play();
    }
  };

  const toggleTimer = () => {
    setIsRunning(!isRunning);
  };

  const resetTimer = () => {
    setIsRunning(false);
    setMode('work');
    setTimeLeft(workTime);
    setCycles(0);
  };

  const formatTime = (seconds: number): string => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const progress = mode === 'work' 
    ? ((workTime - timeLeft) / workTime) * 100
    : ((breakTime - timeLeft) / breakTime) * 100;

  return (
    <div className="flex flex-col items-center justify-center space-y-8 p-8 bg-white rounded-2xl shadow-xl max-w-md w-full">
      <div className="relative w-64 h-64">
        <svg className="transform -rotate-90 w-64 h-64">
          <circle
            cx="128"
            cy="128"
            r="120"
            className="stroke-gray-200"
            strokeWidth="8"
            fill="none"
          />
          <circle
            cx="128"
            cy="128"
            r="120"
            className={`${mode === 'work' ? 'stroke-blue-500' : 'stroke-green-500'} transition-all duration-1000`}
            strokeWidth="8"
            fill="none"
            strokeDasharray={2 * Math.PI * 120}
            strokeDashoffset={2 * Math.PI * 120 * (1 - progress / 100)}
          />
        </svg>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-center">
          <div className="text-5xl font-bold text-gray-800">
            {formatTime(timeLeft)}
          </div>
          <div className="text-lg font-medium text-gray-600 mt-2">
            {mode === 'work' ? 'Focus Time' : 'Break Time'}
          </div>
        </div>
      </div>

      <div className="flex items-center space-x-6">
        <button
          onClick={toggleTimer}
          className={`p-4 rounded-full ${
            isRunning ? 'bg-red-100 text-red-600' : 'bg-blue-100 text-blue-600'
          } hover:opacity-80 transition-opacity`}
        >
          {isRunning ? <Pause size={24} /> : <Play size={24} />}
        </button>
        <button
          onClick={resetTimer}
          className="p-4 rounded-full bg-gray-100 text-gray-600 hover:opacity-80 transition-opacity"
        >
          <RotateCcw size={24} />
        </button>
      </div>

      <div className="flex items-center space-x-4">
        <div className="flex items-center space-x-2">
          <Brain className="text-blue-500" size={20} />
          <span className="text-gray-600">Focus Sessions: {cycles}</span>
        </div>
        <div className="flex items-center space-x-2">
          <Coffee className="text-green-500" size={20} />
          <span className="text-gray-600">Breaks: {cycles}</span>
        </div>
      </div>
    </div>
  );
}