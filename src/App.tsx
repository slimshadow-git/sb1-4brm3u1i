import React from 'react';
import { Timer } from './components/Timer';

function App() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-50 flex flex-col items-center justify-center p-4">
      <h1 className="text-4xl font-bold text-gray-800 mb-8">Pomodoro Timer</h1>
      <Timer />
      <p className="mt-8 text-gray-600 text-center max-w-md">
        Use the Pomodoro Technique to break your work into focused 25-minute sessions, 
        followed by 5-minute breaks to stay productive and refreshed.
      </p>
    </div>
  );
}

export default App;