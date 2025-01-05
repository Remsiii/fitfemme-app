import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Home } from "./HomeScreen";
import { ActivityScreen } from "./pages/ActivityScreen";
import { SearchScreen } from "./pages/SearchScreen";
import { LoginScreen } from "./pages/LoginScreen";
import { NotificationScreen } from "./HomeScreen";
import { BottomNavigation } from "./components/BottomNavigation";
import { Onboarding1 } from "./pages/startingScreen/Onboarding1";
import { Onboarding2 } from "./pages/startingScreen/Onboarding2";
import { WorkoutTracker } from "./WorkoutTracker";
import { WelcomeScreen } from "./WelcomeScreen";
import { Notification } from "./pages/Notification";
import { BMICalculator } from './components/BMICalculator';
import { Toaster } from "@/components/ui/toaster";
import { WorkoutDetails } from "./pages/WorkoutDetails";
import { TakePhoto } from "./pages/progress/TakePhoto";
import { ProgressPhoto } from "./pages/progress/ProgressPhoto";
import { CompareResult } from "./pages/progress/CompareResult2";
import { Profile2 } from "./pages/Profile2";
import { EditProfile } from "./pages/EditProfile";
import LanguageSettings from './pages/LanguageSettings';
import AppleWatchOverview from "./pages/AppleWatchOverview";
import PrivateRoute from "./components/PrivateRoute";
import { WaterIntake } from "./pages/WaterIntake";
import { PeriodTracker } from "./pages/PeriodTracker";
import { AdminPage } from "./pages/Admin/AdminPage";
import { Intro } from "./pages/PeriodCycle/LoadingScreen";
import { Settings } from "./pages/PeriodCycle/Settings";
import { Tracker } from "./pages/PeriodCycle/Calendar";
import { HomeCycle } from "./pages/PeriodCycle/StartScreen";
import WorkoutPlayer from "./pages/WorkoutPlayer";

function App() {
  return (
    <div className="bg-white flex flex-col min-h-screen w-full max-w-[375px] mx-auto relative">
      <main className="flex-1 overflow-y-auto pb-20">
        <Routes>
          {/* Öffentliche Routen */}
          <Route path="/" element={<WelcomeScreen />} />
          <Route path="/login" element={<LoginScreen />} />
          <Route path="/onboarding1" element={<Onboarding1 />} />
          <Route path="/onboarding2" element={<Onboarding2 />} />

          {/* Geschützte Routen */}
          <Route path="/home" element={<PrivateRoute component={Home} />} />
          <Route path="/workouttracker" element={<PrivateRoute component={WorkoutTracker} />} />
          <Route path="/notifications" element={<PrivateRoute component={Notification} />} />
          <Route path="/bmi-calculator" element={<PrivateRoute component={BMICalculator} />} />
          <Route path="/activity" element={<PrivateRoute component={ActivityScreen} />} />
          <Route path="/camera" element={<PrivateRoute component={TakePhoto} />} />
          <Route path="/progressPhoto" element={<PrivateRoute component={ProgressPhoto} />} />
          <Route path="/workout-tracker" element={<PrivateRoute component={WorkoutDetails} />} />
          <Route path="/compareResult" element={<PrivateRoute component={CompareResult} />} />
          <Route path="/search" element={<PrivateRoute component={SearchScreen} />} />
          <Route path="/profile" element={<PrivateRoute component={Profile2} />} />
          <Route path="/profile/edit" element={<PrivateRoute component={EditProfile} />} />
          <Route path="/waterIntake" element={<PrivateRoute component={WaterIntake} />} />
          <Route path="/periodTracker" element={<PrivateRoute component={PeriodTracker} />} />
          <Route path="/notification-screen" element={<PrivateRoute component={NotificationScreen} />} />
          <Route path="/workout-details/:workoutId" element={<PrivateRoute component={WorkoutDetails} />} />
          <Route path="/language-settings" element={<PrivateRoute component={LanguageSettings} />} />
          <Route path="/apple-watch-overview" element={<PrivateRoute component={AppleWatchOverview} />} />
          <Route path="/period-cycle" element={<PrivateRoute component={Intro} />} />
          <Route path="/period-cycle/settings" element={<PrivateRoute component={Settings} />} />
          <Route path="/period-cycle/start" element={<PrivateRoute component={HomeCycle} />} />
          <Route path="/period-cycle/calendar" element={<PrivateRoute component={Tracker} />} />
          <Route path="/workout-player/:workoutId" element={<WorkoutPlayer />} />
          {/* Admin */}
          <Route path="/adminPage" element={<PrivateRoute component={AdminPage} />} />
        </Routes>
      </main>
      <BottomNavigation />
      <Toaster />
    </div>
  );
}

export default App;
