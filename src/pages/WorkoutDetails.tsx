import React, { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";
import {
  ArrowLeftCircleIcon,
  ArrowRightCircleIcon,
  CalendarArrowDownIcon,
  HeartCrackIcon,
  MoreVerticalIcon,
  RefreshCwIcon,
} from "lucide-react";
import { Button } from "../components/ui/button";
import { Card, CardContent } from "../components/ui/card";
import { ScrollArea } from "../components/ui/scroll-area";
import { useLocation, useNavigate } from "react-router-dom";
import { useParams } from "react-router-dom";

export const WorkoutDetails = (): JSX.Element => {
  const { workoutId } = useParams<{ workoutId: string }>();
  const location = useLocation();
  const navigate = useNavigate();
  const [workoutDetails, setWorkoutDetails] = useState<Workout | null>(null);
  const [equipmentData, setEquipmentData] = useState<Equipment[]>([]);
  const [exercisesData, setExercisesData] = useState<Exercise[]>([]);
  const [countdown, setCountdown] = useState<number | null>(null);
  const [currentExerciseIndex, setCurrentExerciseIndex] = useState<number>(0);
  const [timeLeft, setTimeLeft] = useState<number>(60);
  const [isWorkoutStarted, setIsWorkoutStarted] = useState<boolean>(false);
  const [isPaused, setIsPaused] = useState<boolean>(false);

  type Equipment = {
    name: string;
    image_url: string;
  };

  type Exercise = {
    set_number: number;
    name: string;
    duration?: string;
    reps?: string;
    image_url: string;
  };

  type Workout = {
    id: number;
    name: string;
    type: string;
    duration: number;
    difficulty: string;
    description: string;
    exercises_count: number;
    calories_burned: number;
    schedule_time: string;
    workout_equipment: { equipment: Equipment }[];
    exercises: Exercise[];
  };

  useEffect(() => {
    const fetchWorkoutDetails = async () => {
      const { data: workout, error } = await supabase
        .from("workouts")
        .select(
          `
          *,
          workout_equipment (
            equipment (
              name, image_url
            )
          ),
          exercises (
            set_number, name, duration, reps, image_url
          )
        `
        )
        .eq("id", workoutId)
        .single();

      if (error) {
        console.error(error);
      } else {
        setWorkoutDetails(workout);
        setEquipmentData(
          workout.workout_equipment.map((item: any) => item.equipment)
        );
        setExercisesData(workout.exercises);
      }
    };

    fetchWorkoutDetails();
  }, [workoutId]);

  const startWorkout = async () => {
    console.log('Start Workout button clicked');
    if (exercisesData.length === 0) {
      console.warn('No exercises available to start');
      return;
    }
    
    try {
      console.log('Inserting workout start record into database');
      // Get current user ID
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) {
        console.error('User not authenticated');
        return;
      }
      // Record workout start in database
      const { error } = await supabase
        .from('workout_history')
        .insert([
          {
            user_id: user.id,  // Include user_id for RLS
            workout_id: workoutId,
            start_time: new Date().toISOString(),
            status: 'in_progress'
          }
        ]);

      if (error) {
        console.error('Error inserting workout start record:', error);
        throw error;
      }

      console.log('Starting countdown');
      // Start countdown
      setCountdown(3);
      const countdownInterval = setInterval(() => {
        setCountdown((prevCountdown) => {
          if (prevCountdown === 1) {
            clearInterval(countdownInterval);
            console.log('Countdown complete, navigating to WorkoutPlayer');
            navigate(`/workout-player/${workoutId}`);
            return null;
          }
          return prevCountdown! - 1;
        });
      }, 1000);
    } catch (error) {
      console.error('Error starting workout:', error);
    }
  };

  if (!workoutDetails) return <div>Loading...</div>;

  return (
    <div className="bg-white min-h-screen">
      <div className="max-w-md mx-auto relative">
        {/* Hero Section */}
        <div className="relative h-[418px] bg-gradient-to-b from-[#92A3FD] to-[#9DCEFF]">
          <header className="flex justify-between items-center p-10">
            <Button
              variant="secondary"
              size="icon"
              className="rounded-lg"
              onClick={() => navigate("/search")}
            >
              <ArrowLeftCircleIcon className="h-4 w-4" />
            </Button>
            <h1 className="text-white font-bold">{workoutDetails.name}</h1>
            <Button variant="secondary" size="icon" className="rounded-lg">
              <MoreVerticalIcon className="h-4 w-4" />
            </Button>
          </header>

          <div className="relative w-[316px] h-[415px] mx-auto">
            <div className="absolute w-72 h-72 top-[60px] left-3 bg-white/30 rounded-full" />
            <img
              className="absolute w-full h-full"
              alt="Workout illustration"
              src="https://c.animaapp.com/ceVJjsdt/img/men-vector@2x.png"
            />
          </div>
        </div>

        {/* Main Content Card */}
        <Card className="relative -mt-16 rounded-t-[40px] border-none">
          <CardContent className="p-8">
            <div className="flex justify-between items-start mb-6">
              <div>
                <h2 className="font-bold text-base mb-2">{workoutDetails.name}</h2>
                <p className="text-gray-1 text-xs">
                  {workoutDetails.exercises_count} Exercises |{" "}
                  {workoutDetails.duration} mins |{" "}
                  {workoutDetails.calories_burned} Calories Burn
                </p>
              </div>
              <Button
                variant="outline"
                size="icon"
                className="rounded-lg shadow-card-shadow"
              >
                <HeartCrackIcon className="h-4 w-4" />
              </Button>
            </div>

            <div className="space-y-4 mb-8">
              <Button className="w-full justify-between h-[50px] bg-gradient-to-b from-[#92A3FD] to-[#9DCEFF]">
                <div className="flex items-center gap-3">
                  <CalendarArrowDownIcon className="h-5 w-5" />
                  <span>Schedule Workout</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-xs">
                    {new Date(workoutDetails.schedule_time).toLocaleString()}
                  </span>
                  <ArrowRightCircleIcon className="h-4 w-4" />
                </div>
              </Button>

              <Button className="w-full justify-between h-[50px] bg-gradient-to-b from-[#C58BF2] to-[#EEA4CE]">
                <div className="flex items-center gap-3">
                  <RefreshCwIcon className="h-5 w-5" />
                  <span>Difficulty</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-xs">{workoutDetails.difficulty}</span>
                  <ArrowRightCircleIcon className="h-4 w-4" />
                </div>
              </Button>
            </div>

            {/* Equipment Section */}
            <div className="mb-8">
              <div className="flex justify-between items-center mb-4">
                <h3 className="font-semibold text-base">You'll Need</h3>
                <span className="text-gray-2 text-xs">
                  {equipmentData.length} Items
                </span>
              </div>
              <ScrollArea className="w-full">
                <div className="flex gap-4">
                  {equipmentData.map((item, index) => (
                    <Card key={index} className="flex-shrink-0 w-[130px]">
                      <CardContent className="p-4 flex flex-col items-center">
                        <img
                          src={item.image_url}
                          alt={item.name}
                          className="h-16 mb-2"
                        />
                        <p className="text-xs">{item.name}</p>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </ScrollArea>
            </div>

            {/* Exercises Section */}
            <div>
              <div className="flex justify-between items-center mb-4">
                <h3 className="font-semibold text-base">Exercises</h3>
                <span className="text-gray-2 text-xs">Sets</span>
              </div>

              <div className="space-y-6">
                {[...new Set(exercisesData.map((e) => e.set_number))].map(
                  (setNumber) => (
                    <div key={setNumber}>
                      <h4 className="text-xs font-medium mb-4">
                        Set {setNumber}
                      </h4>
                      {exercisesData
                        .filter((e) => e.set_number === setNumber)
                        .map((exercise, index) => (
                          <div
                            key={index}
                            className="flex items-center gap-4 mb-4"
                          >
                            <img
                              src={exercise.image_url}
                              alt={exercise.name}
                              className="w-[60px] h-[60px] rounded-xl object-cover"
                            />
                            <div>
                              <p className="font-medium text-sm">
                                {exercise.name}
                              </p>
                              <p className="text-gray-1 text-xs">
                                {exercise.duration || exercise.reps}
                              </p>
                            </div>
                            <ArrowRightCircleIcon className="h-6 w-6 ml-auto" />
                          </div>
                        ))}
                    </div>
                  )
                )}
              </div>
            </div>

            {/* Start Workout Button */}
            <Button
              className="w-full mt-8 h-[50px] bg-gradient-to-b from-[#92A3FD] to-[#9DCEFF] rounded-full font-bold shadow-blue-shadow"
              onClick={startWorkout}
            >
              Start Workout
            </Button>
          </CardContent>
        </Card>
      </div>

      {/* Countdown Display */}
      {countdown !== null && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-80 z-50">
          <h1 className="text-white text-6xl font-bold">{countdown}</h1>
        </div>
      )}
    </div>
  );
};
