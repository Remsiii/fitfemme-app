import React from "react";
import { Routes, Route } from "react-router-dom";
import { Onboarding1 } from "./Onboarding1";
import { Onboarding2 } from "./Onboarding2";
import { WorkoutTracker } from "./WorkoutTracker";
import { WelcomeScreen } from "./WelcomeScreen";
import { Home } from "./HomeScreen";
import { Notification } from "./Notification";
import { BMICalculator } from './components/BMICalculator';

const App: React.FC = () => {
  return (
    <Routes>
      <Route path="/" element={<WelcomeScreen />} />
      <Route path="/onboarding1" element={<Onboarding1 />} />
      <Route path="/onboarding2" element={<Onboarding2 />} />
      <Route path="/home" element={<Home />} />
      <Route path="/workout-tracker" element={<WorkoutTracker />} />
      <Route path="/notifications" element={<Notification />} />
      <Route path="/bmi-calculator" element={<BMICalculator onBMICalculated={() => {}} onClose={() => {}} />} />
    </Routes>
  );
};

export default App;
