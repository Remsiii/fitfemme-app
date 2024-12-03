import {
  ArrowLeftCircleIcon,
  ArrowRightCircleIcon,
  CalendarArrowDownIcon,
  HeartCrackIcon,
  MoreVerticalIcon,
  RefreshCwIcon,
} from "lucide-react";
import React from "react";
import { Button } from "../components/ui/button";
import { Card, CardContent } from "../components/ui/card";
import { ScrollArea } from "../components/ui/scroll-area";
import { useLocation, useNavigate } from "react-router-dom";

const equipmentData = [
  { name: "Barbell", image: "https://c.animaapp.com/ceVJjsdt/img/barbel.svg" },
  {
    name: "Skipping Rope",
    image: "https://c.animaapp.com/ceVJjsdt/img/skipping-rope.svg",
  },
  {
    name: "Bottle 1 Liters",
    image: "https://c.animaapp.com/ceVJjsdt/img/water-bottle.svg",
  },
];

const exercisesSet1 = [
  {
    name: "Warm Up",
    duration: "05:00",
    image: "https://c.animaapp.com/ceVJjsdt/img/rectangle-5736-3@2x.png",
  },
  {
    name: "Jumping Jack",
    reps: "12x",
    image: "https://c.animaapp.com/ceVJjsdt/img/rectangle-5736-4@2x.png",
  },
  {
    name: "Skipping",
    reps: "15x",
    image: "https://c.animaapp.com/ceVJjsdt/img/rectangle-5736-5@2x.png",
  },
  {
    name: "Squats",
    reps: "20x",
    image: "https://c.animaapp.com/ceVJjsdt/img/rectangle-5742-1@2x.png",
  },
  {
    name: "Arm Raises",
    duration: "00:53",
    image: "https://c.animaapp.com/ceVJjsdt/img/rectangle-5736-6@2x.png",
  },
  {
    name: "Rest and Drink",
    duration: "02:00",
    image: "https://c.animaapp.com/ceVJjsdt/img/rectangle-5736-7@2x.png",
  },
];

const exercisesSet2 = [
  {
    name: "Incline Push-Ups",
    reps: "12x",
    image: "https://c.animaapp.com/ceVJjsdt/img/rectangle-5736@2x.png",
  },
  {
    name: "Push-Ups",
    reps: "15x",
    image: "https://c.animaapp.com/ceVJjsdt/img/rectangle-5736-1@2x.png",
  },
  {
    name: "Skipping",
    reps: "15x",
    image: "https://c.animaapp.com/ceVJjsdt/img/rectangle-5736-5@2x.png",
  },
  {
    name: "Cobra Stretch",
    reps: "20x",
    image: "https://c.animaapp.com/ceVJjsdt/img/rectangle-5742@2x.png",
  },
];

export const WorkoutDetails = (): JSX.Element => {
  const location = useLocation();
  const navigate = useNavigate();
  const workoutTitle = location.state?.workoutTitle || "Fullbody Workout";

  return (
    <div className="bg-white min-h-screen">
      <div className="max-w-md mx-auto relative">
        {/* Hero Section */}
        <div className="relative h-[418px] bg-gradient-to-b from-[#92A3FD] to-[#9DCEFF]">
          <header className="flex justify-between items-center p-10">
            <Button variant="secondary" size="icon" className="rounded-lg" onClick={() => navigate('/search')}>
              <ArrowLeftCircleIcon className="h-4 w-4" />
            </Button>
            <h1 className="text-white font-bold">{workoutTitle}</h1>
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
                <h2 className="font-bold text-base mb-2">Fullbody Workout</h2>
                <p className="text-gray-1 text-xs">
                  11 Exercises | 32mins | 320 Calories Burn
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
                  <span className="text-xs">5/27, 09:00 AM</span>
                  <ArrowRightCircleIcon className="h-4 w-4" />
                </div>
              </Button>

              <Button className="w-full justify-between h-[50px] bg-gradient-to-b from-[#C58BF2] to-[#EEA4CE]">
                <div className="flex items-center gap-3">
                  <RefreshCwIcon className="h-5 w-5" />
                  <span>Difficulty</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-xs">Beginner</span>
                  <ArrowRightCircleIcon className="h-4 w-4" />
                </div>
              </Button>
            </div>

            {/* Equipment Section */}
            <div className="mb-8">
              <div className="flex justify-between items-center mb-4">
                <h3 className="font-semibold text-base">You'll Need</h3>
                <span className="text-gray-2 text-xs">5 Items</span>
              </div>
              <ScrollArea className="w-full">
                <div className="flex gap-4">
                  {equipmentData.map((item, index) => (
                    <Card key={index} className="flex-shrink-0 w-[130px]">
                      <CardContent className="p-4 flex flex-col items-center">
                        <img
                          src={item.image}
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
                <span className="text-gray-2 text-xs">3 Sets</span>
              </div>

              <div className="space-y-6">
                <div>
                  <h4 className="text-xs font-medium mb-4">Set 1</h4>
                  {exercisesSet1.map((exercise, index) => (
                    <div key={index} className="flex items-center gap-4 mb-4">
                      <img
                        src={exercise.image}
                        alt={exercise.name}
                        className="w-[60px] h-[60px] rounded-xl object-cover"
                      />
                      <div>
                        <p className="font-medium text-sm">{exercise.name}</p>
                        <p className="text-gray-1 text-xs">
                          {exercise.duration || exercise.reps}
                        </p>
                      </div>
                      <ArrowRightCircleIcon className="h-6 w-6 ml-auto" />
                    </div>
                  ))}
                </div>

                <div>
                  <h4 className="text-xs font-medium mb-4">Set 2</h4>
                  {exercisesSet2.map((exercise, index) => (
                    <div key={index} className="flex items-center gap-4 mb-4">
                      <img
                        src={exercise.image}
                        alt={exercise.name}
                        className="w-[60px] h-[60px] rounded-xl object-cover"
                      />
                      <div>
                        <p className="font-medium text-sm">{exercise.name}</p>
                        <p className="text-gray-1 text-xs">{exercise.reps}</p>
                      </div>
                      <ArrowRightCircleIcon className="h-6 w-6 ml-auto" />
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Start Workout Button */}
            <Button className="w-full mt-8 h-[50px] bg-gradient-to-b from-[#92A3FD] to-[#9DCEFF] rounded-full font-bold shadow-blue-shadow">
              Start Workout
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};