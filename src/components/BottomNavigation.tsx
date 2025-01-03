import { HomeIcon, ActivityIcon, CameraIcon, SearchIcon, User2Icon } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { Button } from "./ui/button";

export const BottomNavigation = () => {
  const navigate = useNavigate();

  const tabs = [
    { icon: HomeIcon, label: "Home", path: "/home" },
    { icon: ActivityIcon, label: "Activity", path: "/activity" },
    { icon: SearchIcon, label: "Search", path: "/search" },
    { icon: CameraIcon, label: "Camera", path: "/camera" },
    { icon: User2Icon, label: "Profile", path: "/profile" },
  ];

  return (
    <div className="fixed bottom-0 w-full bg-white shadow-md z-10">
      <div className="flex justify-around items-center h-16">
        {tabs.map((tab, index) => {
          const isMiddleButton = index === 2;

          if (isMiddleButton) {
            return (
              <Button 
                key={tab.path}
                className="w-[60px] h-[60px] rounded-full bg-gradient-to-b from-[#92A3FD] to-[#9DCEFF]"
                onClick={() => navigate(tab.path)}
              >
                <tab.icon className="h-5 w-5 text-white" />
              </Button>
            );
          }

          return (
            <Button
              key={tab.path}
              variant="ghost"
              size="icon"
              onClick={() => navigate(tab.path)}
            >
              <tab.icon className="w-6 h-6" />
            </Button>
          );
        })}
      </div>
    </div>
  );
};
