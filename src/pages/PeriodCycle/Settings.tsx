import {
    BatteryChargingIcon,
    BellDotIcon,
    Clock10Icon,
    DatabaseBackupIcon,
    FolderArchiveIcon,
    FolderSyncIcon,
    HomeIcon,
    InfoIcon,
    LogOutIcon,
    MoonIcon,
    Settings2Icon,
    SignalHighIcon,
    User2Icon,
    WifiHighIcon,
  } from "lucide-react";
  import React from "react";
  import { Button } from "../../components/ui/button";
  import { Card, CardContent } from "../../components/ui/card";
  
  const menuItems = [
    { label: "Home", icon: HomeIcon, active: true },
    { label: "Profile", icon: User2Icon },
    { label: "Sync", icon: FolderSyncIcon },
    { label: "Settings", icon: Settings2Icon },
    { label: "Log Out", icon: LogOutIcon },
  ];
  
  const settingsItems = [
    { label: "Terms of service", icon: FolderArchiveIcon },
    { label: "Notifications", icon: BellDotIcon },
    { label: "Period settings", icon: Clock10Icon },
    { label: "About", icon: InfoIcon },
    { label: "Access your data", icon: DatabaseBackupIcon },
    { label: "Dark Mode", icon: MoonIcon },
  ];
  
  export const Settings = (): JSX.Element => {
    return (
      <div className="relative w-[430px] h-[932px] bg-[#f6f6f6] rounded-[40px] overflow-hidden">
        {/* Status Bar */}
        <div className="flex w-full h-[78px] items-center justify-between px-[35px] py-4 bg-[#f6f6f6]">
          <div className="flex items-center gap-1.5">
            <span className="font-normal text-[15px]">9:41</span>
          </div>
          <div className="flex items-center gap-1.5">
            <SignalHighIcon className="w-[18px] h-2.5" />
            <WifiHighIcon className="w-4 h-[11.62px]" />
            <BatteryChargingIcon className="w-6 h-3" />
          </div>
        </div>
  
        {/* Header */}
        <header className="flex items-center justify-between px-7 pt-[78px]">
          <div className="flex items-center gap-3.5">
            <h1 className="font-bold text-[#3a276a] text-[22px]">Saturday</h1>
            <span className="font-normal text-black text-xl">
              February 4th, 2023
            </span>
          </div>
          <BellDotIcon className="w-[30px] h-[30px]" />
        </header>
  
        {/* Sidebar Navigation */}
        <div className="absolute w-[124px] h-[678px] top-32 left-0 bg-[#3a276a]">
          <div className="relative h-full">
            {menuItems.map((item, index) => (
              <Button
                key={item.label}
                variant="ghost"
                className={`w-full h-[50px] mt-12 ${
                  item.active
                    ? "bg-[#f6f6f6] text-[#3a276a] rounded-r-none"
                    : "text-white"
                }`}
              >
                <item.icon className="w-5 h-5 mr-2" />
                {item.label}
              </Button>
            ))}
          </div>
        </div>
  
        {/* Settings Content */}
        <div className="flex flex-col gap-10 absolute top-[156px] left-[138px]">
          {settingsItems.map((item, index) => (
            <Card key={index} className="border-[1.5px] border-[#3a276a]">
              <CardContent className="flex items-center gap-2.5 px-10 py-5">
                <item.icon className="w-[30px] h-[30px] text-[#3a276a]" />
                <span className="font-normal text-[#3a276a] text-xl">
                  {item.label}
                </span>
              </CardContent>
            </Card>
          ))}
        </div>
  
        {/* Bottom Navigation */}
        <nav className="absolute w-full h-[126px] bottom-0 left-0 flex justify-around items-center bg-white">
          <HomeIcon className="w-6 h-6" />
          <Clock10Icon className="w-6 h-6" />
          <Settings2Icon className="w-6 h-6" />
        </nav>
      </div>
    );
  };
  