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
import { AdminRoute } from "./components/AdminRoute";
import { WaterIntake } from "./pages/WaterIntake";
import { PeriodTracker } from "./pages/PeriodTracker";
import { AdminPage } from "./pages/Admin/AdminPage";
import { Intro } from "./pages/PeriodCycle/LoadingScreen";
import { Settings } from "./pages/PeriodCycle/Settings";
import { Tracker } from "./pages/PeriodCycle/Calendar";
import { HomeCycle } from "./pages/PeriodCycle/StartScreen";
import WorkoutPlayer from "./pages/WorkoutPlayer";
import EditWorkout from "./pages/Admin/EditWorkout";
import { WorkoutsPage } from "./pages/WorkoutsPage";
import { PeriodTrackerPage } from "./pages/PeriodTracker/PeriodTrackerPage";
import { WaterIntakePage } from "./pages/WaterIntake/WaterIntakePage";
import { AppleWatchPage } from "./pages/AppleWatch/AppleWatchPage";

function App() {
  return (
    <div className="bg-white flex flex-col min-h-screen w-full max-w-[375px] mx-auto relative">
      <main className="flex-1 overflow-y-auto pb-20">
        <Routes>
          {/* Public Routes */}
          <Route path="/" element={<WelcomeScreen />} />
          <Route path="/login" element={<LoginScreen />} />
          <Route path="/onboarding1" element={<Onboarding1 />} />
          <Route path="/onboarding2" element={<Onboarding2 />} />

          {/* Protected Routes */}
          <Route path="/home" element={<PrivateRoute component={Home} />} />
          <Route path="/workouttracker" element={<PrivateRoute component={WorkoutTracker} />} />
          <Route path="/activity" element={<PrivateRoute component={ActivityScreen} />} />
          <Route path="/search" element={<PrivateRoute component={SearchScreen} />} />
          <Route path="/notification" element={<PrivateRoute component={NotificationScreen} />} />
          <Route path="/notifications" element={<PrivateRoute component={Notification} />} />
          <Route path="/bmi" element={<PrivateRoute component={BMICalculator} />} />
          <Route path="/workout/:id" element={<PrivateRoute component={WorkoutDetails} />} />
          <Route path="/camera" element={<PrivateRoute component={TakePhoto} />} />
          <Route path="/progress" element={<PrivateRoute component={ProgressPhoto} />} />
          <Route path="/compare" element={<PrivateRoute component={CompareResult} />} />
          <Route path="/profile" element={<PrivateRoute component={Profile2} />} />
          <Route path="/edit-profile" element={<PrivateRoute component={EditProfile} />} />
          <Route path="/language" element={<PrivateRoute component={LanguageSettings} />} />
          <Route path="/apple-watch" element={<PrivateRoute component={AppleWatchOverview} />} />
          <Route path="/water-intake" element={<PrivateRoute component={WaterIntake} />} />
          <Route path="/period-tracker" element={<PrivateRoute component={PeriodTracker} />} />
          <Route path="/period-cycle/intro" element={<PrivateRoute component={Intro} />} />
          <Route path="/period-cycle/settings" element={<PrivateRoute component={Settings} />} />
          <Route path="/period-cycle/tracker" element={<PrivateRoute component={Tracker} />} />
          <Route path="/period-cycle/home" element={<PrivateRoute component={HomeCycle} />} />
          <Route path="/workout-player/:id" element={<PrivateRoute component={WorkoutPlayer} />} />
          <Route path="/workouts" element={<PrivateRoute component={WorkoutsPage} />} />
          <Route path="/period-tracker" element={<PrivateRoute component={PeriodTrackerPage} />} />
          <Route path="/water-intake" element={<PrivateRoute component={WaterIntakePage} />} />
          <Route path="/apple-watch" element={<PrivateRoute component={AppleWatchPage} />} />

          {/* Admin Routes */}
          <Route path="/admin" element={<AdminRoute><AdminPage /></AdminRoute>} />
          <Route path="/admin/workout/:id" element={<AdminRoute><EditWorkout /></AdminRoute>} />
        </Routes>
      </main>
      <BottomNavigation />
      <Toaster />
    </div>
  );
}

export default App;
