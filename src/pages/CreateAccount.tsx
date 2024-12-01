import { EyeIcon, LockIcon, MailCheckIcon, User2Icon } from "lucide-react";
import React from "react";
import { Button } from "../components/ui/button";
import { Card, CardContent } from "../components/ui/card";
import { Checkbox } from "../components/ui/checkbox";
import { Input } from "../components/ui/input";
import { Separator } from "../components/ui/separator";

const socialButtons = [
  {
    icon: "https://c.animaapp.com/9SUAL5Wu/img/google-logo-png-suite-everything-you-need-know-about-google-newe@2x.png",
    alt: "Google",
  },
  {
    icon: "https://c.animaapp.com/9SUAL5Wu/img/facebook-1.svg",
    alt: "Facebook",
  },
];

export const RegisterPage = (): JSX.Element => {
  return (
    <main className="flex justify-center items-center min-h-screen bg-white p-4">
      <Card className="w-full max-w-[375px] border-none shadow-none">
        <CardContent className="space-y-6">
          <header className="text-center space-y-2">
            <p className="font-text-large-text-regular text-black-color">
              Hey there,
            </p>
            <h1 className="font-title-h4-bold text-black-color">
              Create an Account
            </h1>
          </header>

          <div className="space-y-4">
            <div className="space-y-3">
              <Input
                className="h-12 bg-border-color rounded-[14px] border-[#f7f8f8]"
                type="text"
                placeholder="First Name"
                // icon={<User2Icon className="w-[18px] h-[18px] text-gray-2" />}
              />

              <Input
                className="h-12 bg-border-color rounded-[14px] border-[#f7f8f8]"
                type="text"
                placeholder="Last Name"
                // icon={<User2Icon className="w-[18px] h-[18px] text-gray-2" />}
              />

              <Input
                className="h-12 bg-border-color rounded-[14px] border-[#f7f8f8]"
                type="email"
                placeholder="Email"
                // icon={
                //   <MailCheckIcon className="w-[18px] h-[18px] text-gray-2" />
                // }
              />

              <Input
                className="h-12 bg-border-color rounded-[14px] border-[#f7f8f8]"
                type="password"
                placeholder="Password"
                // icon={<LockIcon className="w-[18px] h-[18px] text-gray-2" />}
                // rightIcon={
                //   <EyeIcon className="w-[18px] h-[18px] text-gray-2" />
                // }
              />
            </div>

            <div className="flex items-start gap-2">
              <Checkbox id="terms" className="rounded-[3px] border-gray-2" />
              <label
                htmlFor="terms"
                className="text-[10px] font-normal text-gray-2 leading-[15px]"
              >
                By continuing you accept our{" "}
                <span className="underline">Privacy Policy</span> and{" "}
                <span className="underline">Term of Use</span>
              </label>
            </div>

            <Button className="w-full h-[60px] rounded-[99px] bg-gradient-to-b from-[#92A3FD] to-[#9DCEFF] shadow-blue-shadow font-bold">
              Register
            </Button>

            <div className="flex items-center gap-2">
              <Separator className="flex-1" />
              <span className="text-xs text-black-color">Or</span>
              <Separator className="flex-1" />
            </div>

            <div className="flex justify-center gap-5">
              {socialButtons.map((button, index) => (
                <Button
                  key={index}
                  variant="outline"
                  className="w-[50px] h-[50px] rounded-[14px] border-gray-3 p-0"
                >
                  <img
                    src={button.icon}
                    alt={button.alt}
                    className="w-5 h-5 object-contain"
                  />
                </Button>
              ))}
            </div>

            <p className="text-center text-sm">
              Already have an account?{" "}
              <Button variant="link" className="p-0 font-semibold">
                Login
              </Button>
            </p>
          </div>
        </CardContent>
      </Card>
    </main>
  );
};
