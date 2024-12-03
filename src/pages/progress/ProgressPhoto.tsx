import {
    ActivityIcon,
    ArrowLeftCircleIcon,
    CameraIcon,
    HomeIcon,
    MoreVerticalIcon,
    SearchCheckIcon,
    User2Icon,
    XCircleIcon,
  } from "lucide-react";
  import React from "react";
  import { Alert, AlertDescription } from "../../components/ui/alert";
  import { Button } from "../../components/ui/button";
  import { Card, CardContent } from "../../components/ui/card";
  import { ScrollArea } from "../../components/ui/scroll-area";
  
  const galleryData = {
    "2 June": [
      "https://c.animaapp.com/VzvfuAlg/img/rectangle-5834@2x.png",
      "https://c.animaapp.com/VzvfuAlg/img/rectangle-5836@2x.png",
      "https://c.animaapp.com/VzvfuAlg/img/rectangle-5835@2x.png",
      "https://c.animaapp.com/VzvfuAlg/img/rectangle-5837@2x.png",
    ],
    "5 May": [
      "https://c.animaapp.com/VzvfuAlg/img/rectangle-5838@2x.png",
      "https://c.animaapp.com/VzvfuAlg/img/rectangle-5841@2x.png",
      "https://c.animaapp.com/VzvfuAlg/img/rectangle-5839@2x.png",
      "https://c.animaapp.com/VzvfuAlg/img/rectangle-5840@2x.png",
    ],
  };
  
  export const ProgressPhoto = (): JSX.Element => {
    return (
      <div className="bg-white flex justify-center w-full min-h-screen">
        <div className="w-[375px] relative flex flex-col">
          <header className="flex items-center justify-between px-8 py-10">
            <Button
              variant="ghost"
              size="icon"
              className="bg-[#f7f8f8] rounded-lg"
            >
              <ArrowLeftCircleIcon className="h-4 w-4" />
            </Button>
  
            <h1 className="font-bold text-base">Progress Photo</h1>
  
            <Button
              variant="ghost"
              size="icon"
              className="bg-[#f7f8f8] rounded-lg"
            >
              <MoreVerticalIcon className="h-4 w-4" />
            </Button>
          </header>
  
          <Alert className="mx-8 bg-red-50 border-0">
            <div className="flex items-center gap-5">
              <div className="w-[60px] h-[60px] bg-white rounded-full flex items-center justify-center">
                <img
                  src="https://c.animaapp.com/VzvfuAlg/img/vector@2x.png"
                  alt="Calendar"
                  className="w-[34px] h-[38px]"
                />
              </div>
              <div className="flex-1">
                <p className="text-red-500 opacity-80 text-xs">Reminder!</p>
                <AlertDescription className="text-black font-medium text-sm">
                  Next Photos Fall On July 08
                </AlertDescription>
              </div>
            </div>
            <Button
              variant="ghost"
              size="icon"
              className="absolute top-3 right-3"
            >
              <XCircleIcon className="h-4 w-4" />
            </Button>
          </Alert>
  
          <Card className="mx-8 mt-5 bg-gradient-to-b from-[#92A3FD] to-[#9DCEFF] border-0">
            <CardContent className="flex items-center justify-between p-6">
              <div className="space-y-6">
                <img
                  src="https://c.animaapp.com/VzvfuAlg/img/track-your-progress-each-month-with-photo@2x.png"
                  alt="Track your progress"
                  className="h-[27px]"
                />
                <Button className="bg-gradient-to-b from-[#92A3FD] to-[#9DCEFF] text-white rounded-full">
                  Learn More
                </Button>
              </div>
              <img
                src="https://c.animaapp.com/VzvfuAlg/img/frame.svg"
                alt="Calendar illustration"
                className="w-[116px] h-[76px]"
              />
            </CardContent>
          </Card>
  
          <Card className="mx-8 mt-5 bg-gradient-to-b from-[#92A3FD] to-[#9DCEFF] border-0">
            <CardContent className="flex items-center justify-between p-4">
              <span className="text-sm font-medium text-black">
                Compare my Photo
              </span>
              <Button className="bg-gradient-to-b from-[#92A3FD] to-[#9DCEFF] text-white rounded-full">
                Compare
              </Button>
            </CardContent>
          </Card>
  
          <div className="px-8 mt-8">
            <div className="flex items-center justify-between mb-4">
              <h2 className="font-semibold text-base">Gallery</h2>
              <Button variant="ghost" className="text-gray-2 text-xs">
                See more
              </Button>
            </div>
  
            <ScrollArea className="w-full">
              {Object.entries(galleryData).map(([date, photos]) => (
                <div key={date} className="mb-6">
                  <p className="text-gray-1 text-xs mb-4">{date}</p>
                  <div className="grid grid-cols-4 gap-2">
                    {photos.map((photo, index) => (
                      <div key={index} className="relative">
                        <img
                          src={photo}
                          alt={`Gallery photo ${index + 1}`}
                          className="w-[100px] h-[100px] object-cover rounded-lg"
                        />
                        {date === "5 May" && index === 2 && (
                          <Button
                            size="icon"
                            className="absolute bottom-0 right-0 w-[60px] h-[60px] rounded-full bg-gradient-to-b from-[#C58BF2] to-[#EEA4CE]"
                          >
                            <CameraIcon className="h-5 w-5 text-white" />
                          </Button>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </ScrollArea>
          </div>
        </div>
      </div>
    );
  };
  