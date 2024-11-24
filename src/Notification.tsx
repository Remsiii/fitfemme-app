import { ArrowLeftCircleIcon, MoreVerticalIcon } from "lucide-react";
import { Avatar } from "./components/ui/avatar";
import { Button } from "./components/ui/button";
import { Card, CardContent } from "./components/ui/card";
import { Separator } from "./components/ui/separator";
import { useNavigate } from "react-router-dom";

const notifications = [
  {
    id: 1,
    title: "Hey, it's time for lunch",
    time: "About 1 minutes ago",
    avatarBg: "bg-gradient-to-b from-[#92A3FD] to-[#9DCEFF]",
  },
  {
    id: 2,
    title: "Don't miss your lowerbody workout",
    time: "About 3 hours ago",
    avatarBg: "bg-gradient-to-b from-[#C58BF2] to-[#EEA4CE]",
  },
  {
    id: 3,
    title: "Hey, let's add some meals for your b..",
    time: "About 3 hours ago",
    avatarBg: "bg-gradient-to-b from-[#92A3FD] to-[#9DCEFF]",
  },
  {
    id: 4,
    title: "Congratulations, You have finished A..",
    time: "29 May",
    avatarBg: "bg-gradient-to-b from-[#92A3FD] to-[#9DCEFF]",
  },
  {
    id: 5,
    title: "Hey, it's time for lunch",
    time: "8 April",
    avatarBg: "bg-gradient-to-b from-[#92A3FD] to-[#9DCEFF]",
  },
  {
    id: 6,
    title: "Ups, You have missed your Lowerbo...",
    time: "3 April",
    avatarBg: "bg-gradient-to-b from-[#C58BF2] to-[#EEA4CE]",
  },
];

export const Notification = (): JSX.Element => {
  const navigate = useNavigate();
  return (
    <div className="bg-white flex justify-center w-full min-h-screen">
      <div className="bg-white w-[375px] flex flex-col">
        <header className="flex items-center justify-between px-8 pt-10 pb-6">
          <Button
            variant="ghost"
            size="icon"
            className="w-8 h-8 bg-[#f7f8f8] rounded-lg"
            onClick={() => navigate('/home')}
          >
            <ArrowLeftCircleIcon className="h-4 w-4" />
          </Button>

          <h1 className="font-bold text-base text-black-color">Notification</h1>

          <Button
            variant="ghost"
            size="icon"
            className="w-8 h-8 bg-[#f7f8f8] rounded-lg"
          >
            <MoreVerticalIcon className="h-4 w-4" />
          </Button>
        </header>

        <Card className="mx-8 border-none shadow-none">
          <CardContent className="p-0 space-y-4">
            {notifications.map((notification, index) => (
              <div key={notification.id}>
                <div className="flex items-center gap-3 py-2">
                  <Avatar className={`w-10 h-10 ${notification.avatarBg}`} />

                  <div className="flex-1">
                    <p className="text-xs font-medium text-black-color">
                      {notification.title}
                    </p>
                    <p className="text-[10px] text-gray-1">
                      {notification.time}
                    </p>
                  </div>

                  <Button variant="ghost" size="icon" className="h-8 w-8">
                    <MoreVerticalIcon className="h-3.5 w-3.5" />
                  </Button>
                </div>

                {index < notifications.length - 1 && (
                  <Separator className="my-2" />
                )}
              </div>
            ))}
          </CardContent>
        </Card>
      </div>
    </div>
  );
};
