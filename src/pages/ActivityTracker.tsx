import {
    ArrowLeftCircleIcon,
    BoltIcon,
    GlassWaterIcon,
    MoreHorizontalIcon,
    PlusCircleIcon,
  } from "lucide-react";
  import React from "react";
  import { Button } from "../components/ui/button";
  import { Card, CardContent } from "../components/ui/card";
  
  // Data for weekly activity
  const weeklyData = [
    {
      day: "Sun",
      height: "39px",
      color: "bg-gradient-to-b from-[#92A3FD] to-[#9DCEFF]",
    },
    {
      day: "Mon",
      height: "98px",
      color: "bg-gradient-to-b from-[#C58BF2] to-[#EEA4CE]",
    },
    {
      day: "Tue",
      height: "64px",
      color: "bg-gradient-to-b from-[#92A3FD] to-[#9DCEFF]",
    },
    {
      day: "Wed",
      height: "85px",
      color: "bg-gradient-to-b from-[#C58BF2] to-[#EEA4CE]",
    },
    {
      day: "Thu",
      height: "108px",
      color: "bg-gradient-to-b from-[#92A3FD] to-[#9DCEFF]",
    },
    {
      day: "Fri",
      height: "39px",
      color: "bg-gradient-to-b from-[#C58BF2] to-[#EEA4CE]",
    },
    {
      day: "Sat",
      height: "87px",
      color: "bg-gradient-to-b from-[#92A3FD] to-[#9DCEFF]",
    },
  ];
  
  // Data for latest activities
  const latestActivities = [
    {
      title: "Drinking 300ml Water",
      time: "About 3 minutes ago",
      gradient: "from-[#92A3FD] to-[#9DCEFF]",
    },
    {
      title: "Eat Snack (Fitbar)",
      time: "About 10 minutes ago",
      gradient: "from-[#C58BF2] to-[#EEA4CE]",
    },
  ];
  
  export const ActivityTracker = (): JSX.Element => {
    return (
      <div className="bg-white flex justify-center w-full">
        <div className="bg-white w-[375px] h-[812px] relative">
          <header className="flex justify-between items-center px-[30px] pt-10">
            <Button
              variant="ghost"
              size="icon"
              className="w-8 h-8 bg-[#f7f8f8] rounded-lg"
            >
              <ArrowLeftCircleIcon className="h-4 w-4" />
            </Button>
  
            <h1 className="font-bold text-base">Activity Tracker</h1>
  
            <Button
              variant="ghost"
              size="icon"
              className="w-8 h-8 bg-[#f7f8f8] rounded-lg"
            >
              <MoreHorizontalIcon className="h-4 w-4" />
            </Button>
          </header>
  
          <Card className="mx-[30px] mt-6 bg-gradient-to-b from-[#92A3FD] to-[#9DCEFF] border-none">
            <CardContent className="p-5">
              <div className="flex justify-between items-center mb-4">
                <h2 className="font-semibold text-sm text-black">Today Target</h2>
                <Button
                  size="icon"
                  className="w-6 h-6 bg-white/20 hover:bg-white/30 rounded-lg"
                >
                  <PlusCircleIcon className="h-3.5 w-3.5" />
                </Button>
              </div>
  
              <div className="flex gap-5">
                <Card className="flex-1 bg-white">
                  <CardContent className="flex items-center p-2.5">
                    <GlassWaterIcon className="h-[25px] w-[25px] mr-2" />
                    <div>
                      <p className="text-sm font-medium bg-gradient-to-b from-[#92A3FD] to-[#9DCEFF] bg-clip-text text-transparent">
                        8L
                      </p>
                      <p className="text-xs text-gray-1">Water Intake</p>
                    </div>
                  </CardContent>
                </Card>
  
                <Card className="flex-1 bg-white">
                  <CardContent className="flex items-center p-2.5">
                    <BoltIcon className="h-[26px] w-[26px] mr-2" />
                    <div>
                      <p className="text-sm font-medium bg-gradient-to-b from-[#92A3FD] to-[#9DCEFF] bg-clip-text text-transparent">
                        2400
                      </p>
                      <p className="text-xs text-gray-1">Foot Steps</p>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </CardContent>
          </Card>
  
          <div className="mx-[30px] mt-8">
            <div className="flex justify-between items-center mb-4">
              <h2 className="font-semibold text-base">Activity Progress</h2>
              <Button
                size="sm"
                className="h-[30px] bg-gradient-to-b from-[#92A3FD] to-[#9DCEFF] text-white text-[10px]"
              >
                Weekly
                <ArrowLeftCircleIcon className="h-3 w-3 ml-1 rotate-[-90deg]" />
              </Button>
            </div>
  
            <Card className="p-5">
              <CardContent className="flex justify-between h-[135px]">
                {weeklyData.map((item, index) => (
                  <div key={index} className="flex flex-col items-center">
                    <div className="w-[22px] h-full bg-[#f7f8f8] rounded-[20px] relative">
                      <div
                        className={`absolute bottom-0 w-full ${item.color} rounded-[20px]`}
                        style={{ height: item.height }}
                      />
                    </div>
                    <span className="mt-2 text-xs text-gray-1">{item.day}</span>
                  </div>
                ))}
              </CardContent>
            </Card>
          </div>
  
          <div className="mx-[30px] mt-8">
            <div className="flex justify-between items-center mb-4">
              <h2 className="font-semibold text-base">Latest Activity</h2>
              <Button
                variant="ghost"
                className="text-[#aca3a5] text-xs h-auto p-0"
              >
                See more
              </Button>
            </div>
  
            {latestActivities.map((activity, index) => (
              <Card key={index} className="mb-4">
                <CardContent className="flex items-center p-[15px]">
                  <div
                    className={`w-[50px] h-[50px] rounded-full bg-gradient-to-b ${activity.gradient} mr-[8px]`}
                  />
                  <div className="flex-1">
                    <p className="text-sm font-medium">{activity.title}</p>
                    <p className="text-xs text-gray-2">{activity.time}</p>
                  </div>
                  <Button variant="ghost" size="icon" className="h-auto p-0">
                    <MoreHorizontalIcon className="h-3.5 w-3.5" />
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>
    );
  };
  