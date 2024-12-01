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
          <Route path="/workout-tracker" element={<WorkoutTracker />} />
          <Route path="/notifications" element={<Notification />} />
          <Route path="/bmi-calculator" element={<BMICalculator onBMICalculated={() => {}} onClose={() => {}} />} />
          <Route path="/activity" element={<ActivityScreen />} />
          <Route path="/camera" element={<CameraScreen />} />
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
