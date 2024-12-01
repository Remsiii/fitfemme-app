import {
    ArrowRightCircleIcon,
    CalendarArrowDownIcon,
    MoveVerticalIcon,
    Scale3DIcon,
    User2Icon,
  } from "lucide-react";
  import React from "react";
  import { Button } from "../components/ui/button";
  import { Card, CardContent } from "../components/ui/card";
  import { Input } from "../components/ui/input";
  import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
  } from "../components/ui/select";
  
  // Form field data
  const formFields = [
    {
      id: "gender",
      placeholder: "Choose Gender",
      icon: <User2Icon className="h-[18px] w-[18px] text-gray-2" />,
      type: "select",
      options: ["Male", "Female", "Other"],
    },
    {
      id: "dob",
      placeholder: "Date of Birth",
      icon: <CalendarArrowDownIcon className="h-[18px] w-[18px] text-gray-2" />,
      type: "input",
    },
    {
      id: "weight",
      placeholder: "Your Weight",
      icon: <Scale3DIcon className="h-[18px] w-[18px] text-gray-2" />,
      type: "input",
      unit: "KG",
    },
    {
      id: "height",
      placeholder: "Your Height",
      icon: <MoveVerticalIcon className="h-[18px] w-[18px] text-gray-2" />,
      type: "input",
      unit: "CM",
    },
  ];
  
  export const RegisterPage = (): JSX.Element => {
    return (
      <div className="flex justify-center bg-white w-full min-h-screen">
        <Card className="w-[395px] border-none shadow-none">
          <CardContent className="p-0">
            {/* Header Image */}
            <div className="relative h-[350px] mb-8">
              <img
                className="absolute w-[349px] h-[263px] top-20 left-3.5"
                alt="Vector"
                src="https://c.animaapp.com/aANfvrOI/img/vector.svg"
              />
              <img
                className="absolute w-full h-full top-0 left-0"
                alt="Registration illustration"
                src="https://c.animaapp.com/aANfvrOI/img/mask-group@2x.png"
              />
            </div>
  
            {/* Title Section */}
            <div className="text-center mb-8">
              <h1 className="font-title-h4-bold text-black-color text-[20px] leading-[30px] mb-2">
                Let's complete your profile
              </h1>
              <p className="font-text-small-text-regular text-gray-1 text-[12px] leading-[18px]">
                It will help us to know more about you!
              </p>
            </div>
  
            {/* Form Fields */}
            <div className="space-y-4 px-8">
              {formFields.map((field) => (
                <div key={field.id} className="flex gap-3">
                  <div
                    className={`flex-1 ${field.type === "select" ? "" : "relative"}`}
                  >
                    {field.type === "select" ? (
                      <Select>
                        <SelectTrigger className="w-full h-12 bg-border-color rounded-[14px] border-none">
                          <div className="flex items-center gap-2">
                            {field.icon}
                            <SelectValue placeholder={field.placeholder} />
                          </div>
                        </SelectTrigger>
                        <SelectContent>
                          {field.options?.map((option) => (
                            <SelectItem key={option} value={option.toLowerCase()}>
                              {option}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    ) : (
                      <div className="relative">
                        <div className="absolute left-4 top-1/2 -translate-y-1/2">
                          {field.icon}
                        </div>
                        <Input
                          className="h-12 pl-12 bg-border-color rounded-[14px] border-none"
                          placeholder={field.placeholder}
                        />
                      </div>
                    )}
                  </div>
                  {field.unit && (
                    <div className="w-12 h-12 flex items-center justify-center rounded-[14px] bg-gradient-to-b from-[#C58BF2] to-[#EEA4CE] text-white font-text-small-text-medium">
                      {field.unit}
                    </div>
                  )}
                </div>
              ))}
            </div>
  
            {/* Next Button */}
            <div className="px-8 mt-8">
              <Button className="w-full h-[60px] rounded-[99px] bg-gradient-to-b from-[#92A3FD] to-[#9DCEFF] shadow-blue-shadow border-none">
                <span className="text-white font-bold mr-2">Next</span>
                <ArrowRightCircleIcon className="h-5 w-5 text-white" />
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  };
  