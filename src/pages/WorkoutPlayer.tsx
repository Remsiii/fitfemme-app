import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { supabase } from "@/lib/supabase";
import { Button } from "../components/ui/button";
import { Progress } from "../components/ui/progress";

interface Exercise {
  id: number;
  name: string;
  duration?: string;
  reps?: string;
  set_number: number;
  image_url: string;
  video_url?: string;
}

const WorkoutPlayer: React.FC = () => {
  const { workoutId } = useParams<{ workoutId: string }>();
  const navigate = useNavigate();
  const [exercisesData, setExercisesData] = useState<Exercise[]>([]);
  const [currentExerciseIndex, setCurrentExerciseIndex] = useState<number>(0);
  const [timeLeft, setTimeLeft] = useState<number>(60);
  const [isPaused, setIsPaused] = useState<boolean>(false);

  useEffect(() => {
    const fetchExercises = async () => {
      const { data, error } = await supabase
        .from('exercises')
        .select('id, name, duration, reps, set_number, image_url, video_url')
        .eq('workout_id', workoutId)
        .order('set_number', { ascending: true });

      if (error) {
        console.error('Error fetching exercises:', error);
        return;
      }

      setExercisesData(data || []);
      if (data && data.length > 0) {
        setTimeLeft(data[0].duration ? parseInt(data[0].duration) : 60);
      }
    };

    fetchExercises();
  }, [workoutId]);

  useEffect(() => {
    let timer: NodeJS.Timeout;
    if (!isPaused && timeLeft > 0) {
      timer = setInterval(() => {
        setTimeLeft((prev) => {
          if (prev <= 1) {
            if (currentExerciseIndex < exercisesData.length - 1) {
              setCurrentExerciseIndex((prev) => prev + 1);
              const nextExercise = exercisesData[currentExerciseIndex + 1];
              setTimeLeft(nextExercise.duration ? parseInt(nextExercise.duration) : 60);
            } else {
              navigate('/home');
            }
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    }
    return () => clearInterval(timer);
  }, [isPaused, timeLeft, currentExerciseIndex, exercisesData, navigate]);

  const currentExercise = exercisesData[currentExerciseIndex];

  const toggleFullscreen = () => {
    const videoElement = document.querySelector('video');
    if (videoElement) {
      if (!document.fullscreenElement) {
        videoElement.requestFullscreen().then(() => {
          if (screen.orientation && screen.orientation.lock) {
            screen.orientation.lock('landscape').catch(err => {
              console.error(`Error locking orientation: ${err.message} (${err.name})`);
            });
          }
        }).catch(err => {
          console.error(`Error attempting to enable full-screen mode: ${err.message} (${err.name})`);
        });
      } else {
        document.exitFullscreen().then(() => {
          if (screen.orientation && screen.orientation.unlock) {
            screen.orientation.unlock();
          }
        });
      }
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-900 text-white">
      {currentExercise && (
        <div className="w-full max-w-lg">
          <h1 className="text-2xl font-bold mb-4">{currentExercise.name}</h1>
          {currentExercise.video_url ? (
            <video
              src={currentExercise.video_url}
              className="w-full rounded-lg mb-4"
              controls={false}  
              autoPlay
            />
          ) : (
            <img
              src={currentExercise.image_url}
              alt={currentExercise.name}
              className="w-full rounded-lg mb-4"
            />
          )}
          <Button
            className="mb-4"
            onClick={toggleFullscreen}
          >
            Toggle Fullscreen
          </Button>
          <div className="flex justify-between items-center mb-4">
            <span>Time Left: {Math.floor(timeLeft / 60)}:{(timeLeft % 60).toString().padStart(2, '0')}</span>
            <Progress value={(timeLeft / (currentExercise.duration ? parseInt(currentExercise.duration) : 60)) * 100} className="w-1/2" />
          </div>
          <div className="flex justify-center gap-4">
            <Button variant="outline" onClick={() => setIsPaused(!isPaused)}>
              {isPaused ? 'Resume' : 'Pause'}
            </Button>
            <Button variant="outline" onClick={() => navigate('/home')}>
              Exit
            </Button>
          </div>
        </div>
      )}
    </div>
  );
};

export default WorkoutPlayer;
