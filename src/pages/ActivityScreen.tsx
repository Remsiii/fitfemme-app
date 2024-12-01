import { ArrowLeftCircleIcon, MoreVerticalIcon } from "lucide-react";
import React from "react";
import { Button } from "../components/ui/button";
import { Card, CardContent } from "../components/ui/card";
import { Switch } from "../components/ui/switch";

// Data structures for workouts
const upcomingWorkouts = [
  {
    title: "Fullbody Workout",
    time: "Today, 03:00pm",
    isActive: true,
  },
  {
    title: "Upperbody Workout",
    time: "June 05, 02:00pm",
    isActive: false,
  },
];

const trainingOptions = [
  {
    title: "Fullbody Workout",
    exercises: 11,
    duration: "32mins",
    image: "https://c.animaapp.com/wtnFEHRF/img/vector@2x.png",
  },
  {
    title: "Lowebody Workout",
    exercises: 12,
    duration: "40mins",
    image: "https://c.animaapp.com/wtnFEHRF/img/vector-1@2x.png",
  },
  {
    title: "AB Workout",
    exercises: 14,
    duration: "20mins",
    image: "https://c.animaapp.com/wtnFEHRF/img/vector-2@2x.png",
  },
];

export const ActivityScreen = (): JSX.Element => {
  return (
    <div className="bg-white flex flex-col items-center w-full min-h-screen">
      <div className="w-[375px] relative">
        {/* Gradient Background */}
        <div className="h-[405px] bg-gradient-to-b from-[#9293FD] to-[#9DCEFF]">
          {/* Header */}
          <header className="flex justify-between items-center px-8 pt-10">
            <Button
              variant="outline"
              size="icon"
              className="bg-[#f7f8f8] h-8 w-8"
            >
              <ArrowLeftCircleIcon className="h-4 w-4" />
            </Button>

            <h1 className="text-white font-bold">Workout Tracker</h1>

            <Button
              variant="outline"
              size="icon"
              className="bg-[#f7f8f8] h-8 w-8"
            >
              <MoreVerticalIcon className="h-4 w-4" />
            </Button>
          </header>

          {/* Progress Graph Card */}
          <Card className="mx-8 mt-4 bg-white shadow-card-shadow">
            <CardContent className="p-2.5">
              <div className="text-xs text-gray-2">Fri, 28 May</div>
              <div className="text-sm text-gray-1">Upperbody Workout</div>
              <div className="flex items-center gap-1">
                <span className="text-xs text-success">90%</span>
                <div className="w-[110px] h-[5px] bg-border-color rounded-[5px]">
                  <div className="w-[87px] h-[5px] bg-gradient-to-b from-[#C58BF2] to-[#92A3FD]" />
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Main Content */}
        <div className="bg-white rounded-t-[40px] -mt-[106px] min-h-screen px-8">
          {/* Daily Schedule */}
          <Card className="bg-gradient-to-b from-[#92A3FD] to-[#9DCEFF] mb-8">
            <CardContent className="flex justify-between items-center p-4">
              <span className="text-black-color font-medium">
                Daily Workout Schedule
              </span>
              <Button
                size="sm"
                variant="secondary"
                className="bg-white/20 text-white"
              >
                Check
              </Button>
            </CardContent>
          </Card>

          {/* Upcoming Workouts */}
          <div className="mb-8">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-black-color font-semibold text-lg">
                Upcoming Workout
              </h2>
              <Button variant="link" className="text-gray-2 text-xs">
                See more
              </Button>
            </div>

            {upcomingWorkouts.map((workout, index) => (
              <Card key={index} className="mb-4 bg-white shadow-card-shadow">
                <CardContent className="flex justify-between items-center p-4">
                  <div className="flex gap-4 items-center">
                    <div className="w-[50px] h-[50px] rounded-full bg-gradient-to-b from-[#92A3FD] to-[#9DCEFF]" />
                    <div>
                      <div className="text-sm font-medium">{workout.title}</div>
                      <div className="text-xs text-gray-2">{workout.time}</div>
                    </div>
                  </div>
                  <Switch checked={workout.isActive} />
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Training Options */}
          <div>
            <h2 className="text-black-color font-semibold text-lg mb-4">
              What Do You Want to Train
            </h2>

            {trainingOptions.map((option, index) => (
              <Card
                key={index}
                className="mb-4 bg-gradient-to-b from-[#92A3FD] to-[#9DCEFF] rounded-[20px]"
              >
                <CardContent className="p-5 flex justify-between">
                  <div>
                    <h3 className="text-black-color font-medium text-sm mb-1">
                      {option.title}
                    </h3>
                    <p className="text-gray-1 text-xs">
                      {option.exercises} Exercises | {option.duration}
                    </p>
                    <Button
                      variant="secondary"
                      size="sm"
                      className="mt-4 bg-white text-transparent bg-clip-text bg-gradient-to-b from-[#92A3FD] to-[#9DCEFF]"
                    >
                      View more
                    </Button>
                  </div>
                  <div className="relative">
                    <div className="w-[92px] h-[92px] bg-white rounded-full" />
                    <img
                      src={option.image}
                      alt={option.title}
                      className="absolute top-0 right-0 h-[90px] object-contain"
                    />
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
