import {
    ArrowLeftCircleIcon,
    MoreHorizontalIcon,
    Share2Icon,
  } from "lucide-react";
  import React from "react";
  import { Button } from "../../components/ui/button";
  import { Card, CardContent } from "../../components/ui/card";
  import { Progress } from "../../components/ui/progress";
  import { Tabs, TabsList, TabsTrigger } from "../../components/ui/tabs";
  
  const progressData = [
    { label: "Lose Weight", mayValue: 33, juneValue: 67 },
    { label: "Height Increase", mayValue: 88, juneValue: 12 },
    { label: "Muscle Mass Increase", mayValue: 57, juneValue: 43 },
    { label: "Abs", mayValue: 89, juneValue: 11 },
  ];
  
  const monthLabels = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul"];
  
  export const CompareResult = (): JSX.Element => {
    return (
      <div className="flex justify-center w-full bg-white">
        <div className="w-[375px] min-h-screen relative bg-white">
          <header className="flex items-center justify-between px-8 pt-10 pb-4">
            <Button
              variant="outline"
              size="icon"
              className="w-8 h-8 bg-[#f7f8f8] border-0"
            >
              <ArrowLeftCircleIcon className="h-4 w-4" />
            </Button>
  
            <h1 className="font-bold text-base text-black-color">Result</h1>
  
            <div className="flex gap-2">
              <Button
                variant="outline"
                size="icon"
                className="w-8 h-8 bg-[#f7f8f8] border-0"
              >
                <Share2Icon className="h-3.5 w-3.5" />
              </Button>
              <Button
                variant="outline"
                size="icon"
                className="w-8 h-8 bg-[#f7f8f8] border-0"
              >
                <MoreHorizontalIcon className="h-4 w-4" />
              </Button>
            </div>
          </header>
  
          <div className="px-8">
            <Tabs defaultValue="statistic" className="w-full">
              <TabsList className="w-full h-[60px] bg-border-color rounded-[99px]">
                <TabsTrigger
                  value="photo"
                  className="w-1/2 h-10 data-[state=inactive]:bg-transparent data-[state=active]:bg-gradient-to-b from-[#92A3FD] to-[#9DCEFF] data-[state=active]:text-white"
                >
                  Photo
                </TabsTrigger>
                <TabsTrigger
                  value="statistic"
                  className="w-1/2 h-10 data-[state=inactive]:bg-transparent data-[state=active]:bg-gradient-to-b from-[#92A3FD] to-[#9DCEFF] data-[state=active]:text-white"
                >
                  Statistic
                </TabsTrigger>
              </TabsList>
            </Tabs>
  
            <Card className="mt-8 border-0 shadow-none">
              <CardContent className="p-0">
                <div className="relative h-[172px] mb-8">
                  {/* Chart would go here - using placeholder for demo */}
                  <div className="absolute top-3 left-1/2 -translate-x-1/2 bg-white rounded-lg shadow-card-shadow px-2.5 py-2.5">
                    <p className="text-success text-[10px]">62% increase ↑</p>
                  </div>
                </div>
  
                <div className="flex justify-between mb-4">
                  <span className="font-semibold text-gray-1">May</span>
                  <span className="font-semibold text-gray-1">June</span>
                </div>
  
                <div className="space-y-6">
                  {progressData.map((item, index) => (
                    <div key={index} className="space-y-2">
                      <p className="text-center text-sm text-black-color">
                        {item.label}
                      </p>
                      <div className="flex items-center gap-2">
                        <span className="text-xs text-gray-1 w-8">
                          {item.mayValue}%
                        </span>
                        <Progress
                          value={item.juneValue}
                          className="h-2.5 bg-danger/30"
                        //   indicatorClassName="bg-gradient-to-b from-[#92A3FD] to-[#9DCEFF]"
                        />
                        <span className="text-xs text-gray-1 w-8">
                          {item.juneValue}%
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
  
            <Button className="w-full mt-8 mb-8 h-[60px] bg-gradient-to-b from-[#92A3FD] to-[#9DCEFF] rounded-[99px] shadow-blue-shadow">
              <span className="font-bold text-white">Back to Home</span>
            </Button>
          </div>
        </div>
      </div>
    );
  };
  