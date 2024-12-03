import {
    ActivityIcon,
    ArrowLeftCircleIcon,
    BarChart2Icon,
    BellDotIcon,
    CameraIcon,
    Clock10Icon,
    FileTextIcon,
    HomeIcon,
    MessageSquareCodeIcon,
    MoreVerticalIcon,
    SearchCheckIcon,
    Settings2Icon,
    ShieldAlertIcon,
    User2Icon,
  } from "lucide-react";
  import {
    Avatar,
    AvatarFallback,
    AvatarImage,
  } from "@/components/ui/avatar";
  import { Button } from "@/components/ui/button";
  import {
    Card,
    CardContent,
    CardHeader,
    CardTitle,
  } from "@/components/ui/card";
  import { Switch } from "@/components/ui/switch";
  
  export const Profile = (): JSX.Element => {
    const statsData = [
      { value: "180cm", label: "Height" },
      { value: "65kg", label: "Weight" },
      { value: "22yo", label: "Age" },
    ];
  
    const accountItems = [
      { icon: <User2Icon className="w-5 h-5" />, label: "Personal Data" },
      { icon: <FileTextIcon className="w-5 h-5" />, label: "Achievement" },
      {
        icon: <Clock10Icon className="w-5 h-5" />,
        label: "ActivityIcon History",
      },
      { icon: <BarChart2Icon className="w-5 h-5" />, label: "Workout Progress" },
    ];
  
    const otherItems = [
      {
        icon: <MessageSquareCodeIcon className="w-5 h-5" />,
        label: "Contact Us",
      },
      { icon: <ShieldAlertIcon className="w-5 h-5" />, label: "Privacy Policy" },
      { icon: <Settings2Icon className="w-5 h-5" />, label: "Settings" },
    ];
  
    return (
      <div className="bg-white flex justify-center w-full">
        <div className="w-[375px] min-h-screen relative flex flex-col">
          <header className="flex items-center justify-between px-8 py-10">
            <Button
              variant="ghost"
              size="icon"
              className="bg-[#f7f8f8] rounded-lg"
            >
              <ArrowLeftCircleIcon className="w-4 h-4" />
            </Button>
            <span className="font-bold">Profile</span>
            <Button
              variant="ghost"
              size="icon"
              className="bg-[#f7f8f8] rounded-lg"
            >
              <MoreVerticalIcon className="w-4 h-4" />
            </Button>
          </header>
  
          <div className="px-8 space-y-4">
            <div className="flex items-center gap-4">
              <Avatar className="w-14 h-14 bg-gradient-to-b from-[#92A3FD] to-[#9DCEFF]">
                <AvatarImage src="https://c.animaapp.com/dbSCljxy/img/vector@2x.png" />
                <AvatarFallback>SW</AvatarFallback>
              </Avatar>
              <div className="flex-1">
                <h3 className="font-medium text-sm">Stefani Wong</h3>
                <p className="text-xs text-gray-1">Lose a Fat Program</p>
              </div>
              <Button className="bg-gradient-to-b from-[#92A3FD] to-[#9DCEFF] text-white rounded-full">
                Edit
              </Button>
            </div>
  
            <div className="grid grid-cols-3 gap-4">
              {statsData.map((stat) => (
                <Card key={stat.label} className="shadow-card-shadow">
                  <CardContent className="p-4 text-center">
                    <p className="text-transparent bg-clip-text bg-gradient-to-b from-[#92A3FD] to-[#9DCEFF] font-medium">
                      {stat.value}
                    </p>
                    <p className="text-xs text-gray-1">{stat.label}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
  
            <Card className="shadow-card-shadow">
              <CardHeader>
                <CardTitle className="text-base">Account</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {accountItems.map((item) => (
                  <div key={item.label} className="flex items-center gap-3">
                    {item.icon}
                    <span className="text-xs text-gray-1 flex-1">
                      {item.label}
                    </span>
                    <ArrowLeftCircleIcon className="w-4 h-4 rotate-180" />
                  </div>
                ))}
              </CardContent>
            </Card>
  
            <Card className="shadow-card-shadow">
              <CardHeader>
                <CardTitle className="text-base">Notification</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex items-center gap-3">
                  <BellDotIcon className="w-5 h-5" />
                  <span className="text-xs text-gray-1 flex-1">
                    Pop-up Notification
                  </span>
                  <Switch className="bg-gradient-to-b from-[#C58BF2] to-[#EEA4CE]" />
                </div>
              </CardContent>
            </Card>
  
            <Card className="shadow-card-shadow">
              <CardHeader>
                <CardTitle className="text-base">Other</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {otherItems.map((item) => (
                  <div key={item.label} className="flex items-center gap-3">
                    {item.icon}
                    <span className="text-xs text-gray-1 flex-1">
                      {item.label}
                    </span>
                    <ArrowLeftCircleIcon className="w-4 h-4 rotate-180" />
                  </div>
                ))}
              </CardContent>
            </Card>
          </div>
  
        </div>
      </div>
    );
  };
  