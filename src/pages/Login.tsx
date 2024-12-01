import { EyeIcon, LockIcon, MailCheckIcon } from "lucide-react";
import React from "react";
import { Button } from "../components/ui/button";
import { Card, CardContent } from "../components/ui/card";
import { Input } from "../components/ui/input";
import { Separator } from "../components/ui/separator";

export const LoginPage = (): JSX.Element => {
  const socialButtons = [
    {
      icon: "https://c.animaapp.com/4seZi3dy/img/google-logo-png-suite-everything-you-need-know-about-google-newe@2x.png",
      alt: "Google",
    },
    {
      icon: "https://c.animaapp.com/4seZi3dy/img/facebook-1.svg",
      alt: "Facebook",
    },
  ];

  return (
    <div className="flex justify-center items-center min-h-screen bg-white">
      <Card className="w-[375px] border-none shadow-none">
        <CardContent className="p-8 space-y-8">
          {/* Header */}
          <div className="text-center space-y-2">
            <p className="font-text-large-text-regular text-black-color">
              Hey there,
            </p>
            <h1 className="font-title-h4-bold text-black-color text-2xl">
              Welcome Back
            </h1>
          </div>

          {/* Form */}
          <div className="space-y-4">
            <div className="relative">
              <MailCheckIcon className="absolute left-3.5 top-3.5 h-[18px] w-[18px] text-gray-2" />
              <Input
                type="email"
                placeholder="Email"
                className="pl-12 h-12 bg-border-color border-[#f7f8f8] rounded-[14px]"
              />
            </div>

            <div className="relative">
              <LockIcon className="absolute left-3.5 top-3.5 h-[18px] w-[18px] text-gray-2" />
              <Input
                type="password"
                placeholder="Password"
                className="pl-12 pr-12 h-12 bg-border-color border-[#f7f8f8] rounded-[14px]"
              />
              <EyeIcon className="absolute right-3.5 top-3.5 h-[18px] w-[18px] text-gray-2 cursor-pointer" />
            </div>

            <button className="text-gray-2 text-center w-full underline font-link-medium text-xs">
              Forgot your password?
            </button>
          </div>

          {/* Login Button */}
          <Button className="w-full h-[60px] rounded-[99px] bg-gradient-to-b from-[#9293FD] to-[#9DCEFF] shadow-blue-shadow">
            <MailCheckIcon className="mr-2 h-6 w-6" />
            <span className="font-bold">Login</span>
          </Button>

          {/* Divider */}
          <div className="flex items-center gap-2">
            <Separator className="flex-1" />
            <span className="text-xs text-black-color font-normal">Or</span>
            <Separator className="flex-1" />
          </div>

          {/* Social Login */}
          <div className="flex justify-center gap-5">
            {socialButtons.map((button, index) => (
              <Button
                key={index}
                variant="outline"
                className="w-[50px] h-[50px] rounded-[14px] border-gray-3 border-[0.8px] p-0"
              >
                <img
                  src={button.icon}
                  alt={button.alt}
                  className="w-5 h-5 object-contain"
                />
              </Button>
            ))}
          </div>

          {/* Register Link */}
          <div className="text-center">
            <span className="text-black-color">
              Don't have an account yet?{" "}
            </span>
            <button className="text-black-color underline font-medium">
              Register
            </button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
