import {
    ArrowLeftCircleIcon,
    ChevronLeftCircleIcon,
    ChevronRightCircleIcon,
    MoreVerticalIcon,
    PlusCircleIcon,
  } from "lucide-react";
  import React from "react";
  import { Button } from "../components/ui/button";
  import { Card, CardContent } from "../components/ui/card";
  import { ScrollArea } from "../components/ui/scroll-area";
  
  export const WorkoutSchedule = (): JSX.Element => {
    // Time slots data
    const timeSlots = Array.from({ length: 15 }, (_, i) => {
      const hour = i + 6;
      return {
        time: `${hour.toString().padStart(2, "0")}:00`,
        period: hour >= 12 ? "PM" : "AM",
        displayHour:
          hour > 12
            ? (hour - 12).toString().padStart(2, "0")
            : hour.toString().padStart(2, "0"),
      };
    });
  
    // Calendar days data
    const calendarDays = [
      { day: "Tue", date: "11" },
      { day: "Wed", date: "12" },
      { day: "Thus", date: "13" },
      { day: "Fri", date: "14", active: true },
      { day: "Sat", date: "15" },
      { day: "Sun", date: "16" },
    ];
  
    // Workout events data
    const workoutEvents = [
      {
        name: "Ab Workout",
        time: "7:30am",
        className: "bg-gradient-to-b from-[#C58BF2] to-[#EEA4CE]",
      },
      {
        name: "Upperbody Workout",
        time: "9am",
        className: "bg-gradient-to-b from-[#92A3FD] to-[#9DCEFF]",
      },
      {
        name: "Lowerbody Workout",
        time: "3pm",
        className: "bg-[#F7F8F8]",
      },
    ];
  
    return (
      <div className="bg-white flex justify-center w-full min-h-screen">
        <div className="bg-white w-[375px] relative flex flex-col">
          {/* Header */}
          <header className="px-8 py-10 flex items-center justify-between">
            <Button
              variant="ghost"
              size="icon"
              className="bg-[#F7F8F8] rounded-lg"
            >
              <ArrowLeftCircleIcon className="h-4 w-4" />
            </Button>
            <h1 className="font-bold text-base text-black-color">
              Workout Schedule
            </h1>
            <Button
              variant="ghost"
              size="icon"
              className="bg-[#F7F8F8] rounded-lg"
            >
              <MoreVerticalIcon className="h-4 w-4" />
            </Button>
          </header>
  
          {/* Calendar Section */}
          <div className="px-8">
            {/* Month Selector */}
            <div className="flex items-center justify-center gap-13 mb-9">
              <Button variant="ghost" size="icon">
                <ChevronLeftCircleIcon className="h-5 w-5 text-gray-1" />
              </Button>
              <span className="text-gray-2 text-sm">May 2021</span>
              <Button variant="ghost" size="icon">
                <ChevronRightCircleIcon className="h-5 w-5 text-gray-1" />
              </Button>
            </div>
  
            {/* Days */}
            <div className="flex justify-between mb-6">
              {calendarDays.map((item) => (
                <Card
                  key={item.date}
                  className={`w-[60px] h-20 ${item.active ? "bg-gradient-to-b from-[#92A3FD] to-[#9DCEFF]" : "bg-[#F7F8F8]"} rounded-[10px]`}
                >
                  <CardContent className="flex flex-col items-center justify-center h-full p-0 pt-4">
                    <span
                      className={`text-xs ${item.active ? "text-white" : "text-gray-1"}`}
                    >
                      {item.day}
                    </span>
                    <span
                      className={`text-sm font-medium mt-2 ${item.active ? "text-white" : "text-gray-1"}`}
                    >
                      {item.date}
                    </span>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
  
          {/* Schedule Timeline */}
          <ScrollArea className="flex-1 px-8">
            <div className="relative">
              {timeSlots.map((slot, index) => (
                <div key={index} className="flex gap-4 mb-5">
                  <div className="w-[60px] text-xs text-gray-1">
                    <span>{slot.displayHour}:00</span>
                    <span className="ml-2">{slot.period}</span>
                  </div>
                  <div className="flex-1 border-l border-[#F7F8F8]" />
                </div>
              ))}
  
              {/* Workout Event Cards */}
              {workoutEvents.map((event, index) => (
                <Card
                  key={index}
                  className={`absolute left-24 w-[184px] h-[35px] ${event.className} rounded-[50px]`}
                  style={{
                    top: `${event.time.includes("7:30") ? "60px" : event.time.includes("9") ? "120px" : "360px"}`,
                  }}
                >
                  <CardContent className="flex items-center p-4 h-full">
                    <span
                      className={`text-xs ${event.className.includes("F7F8F8") ? "text-gray-1" : "text-white"}`}
                    >
                      {event.name}, {event.time}
                    </span>
                  </CardContent>
                </Card>
              ))}
            </div>
          </ScrollArea>
  
          {/* Floating Action Button */}
          <Button
            className="absolute bottom-8 right-8 w-[60px] h-[60px] rounded-full bg-gradient-to-b from-[#C58BF2] to-[#EEA4CE] shadow-purple-shadow"
            size="icon"
          >
            <PlusCircleIcon className="h-7 w-7 text-white" />
          </Button>
        </div>
      </div>
    );
  };
  