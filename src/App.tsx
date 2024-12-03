import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Home } from "./HomeScreen";
import { ActivityScreen } from "./pages/ActivityScreen";
import { CameraScreen } from "./pages/CameraScreen";
import { SearchScreen } from "./pages/SearchScreen";
import { ProfileScreen } from "./pages/ProfileScreen";
import { LoginScreen } from "./pages/LoginScreen";
import { NotificationScreen } from "./HomeScreen";
import { BottomNavigation } from "./components/BottomNavigation";
import { Onboarding1 } from "./Onboarding1";
import { Onboarding2 } from "./Onboarding2";
import { WorkoutTracker } from "./WorkoutTracker";
import { WelcomeScreen } from "./WelcomeScreen";
import { Notification } from "./Notification";
import { BMICalculator } from './components/BMICalculator';
import { Toaster } from "@/components/ui/toaster";
import { WorkoutDetails } from "./pages/WorkoutDetails";
import { TakePhoto } from "./pages/WorkoutSchedule";
import { ProgressPhoto } from "./pages/progress/ProgressPhoto";
import { CompareResult } from "./pages/progress/CompareResult2";

function App() {
  return (
    <>
      <div > {/* Add padding to account for bottom navigation */}
        <Routes>
          <Route path="/" element={<WelcomeScreen />} />
          <Route path="/login" element={<LoginScreen />} />
          <Route path="/onboarding1" element={<Onboarding1 />} />
          <Route path="/onboarding2" element={<Onboarding2 />} />
          <Route path="/home" element={<Home />} />
          <Route path="/workouttracker" element={<WorkoutTracker />} />
          <Route path="/notifications" element={<Notification />} />
          <Route path="/bmi-calculator" element={<BMICalculator onBMICalculated={() => {}} onClose={() => {}} />} />
          <Route path="/activity" element={<ActivityScreen />} />
          <Route path="/camera" element={<TakePhoto />} />
          <Route path="/progressPhoto" element={<ProgressPhoto />} />
          <Route path="/workout-tracker" element={<WorkoutDetails />} />
          <Route path="/compareResult" element={<CompareResult />} />
          <Route path="/search" element={<SearchScreen />} />
          <Route path="/profile" element={<ProfileScreen />} />
          <Route path="/notification-screen" element={<NotificationScreen />} />
          <Route path="/workout-details" element={<WorkoutDetails />} />
        </Routes>
        <BottomNavigation />
      </div>
      <Toaster />
    </>
  );
}

export default App;
