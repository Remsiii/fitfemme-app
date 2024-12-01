import {
    ActivityIcon,
    ArrowLeftCircleIcon,
    AwardIcon,
    BellDotIcon,
    CameraIcon,
    Clock10Icon,
    HomeIcon,
    LineChartIcon,
    MailCheckIcon,
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
  } from "../components/ui/avatar";
  import { Button } from "../components/ui/button";
  import {
    Card,
    CardContent,
    CardHeader,
    CardTitle,
  } from "../components/ui/card";
  import { Switch } from "../components/ui/switch";
  
  const statsData = [
    { value: "180cm", label: "Height" },
    { value: "65kg", label: "Weight" },
    { value: "22yo", label: "Age" },
  ];
  
  const accountItems = [
    {
      icon: <User2Icon className="w-5 h-5 text-gray-1" />,
      label: "Personal Data",
    },
    { icon: <AwardIcon className="w-5 h-5 text-gray-1" />, label: "Achievement" },
    {
      icon: <Clock10Icon className="w-5 h-5 text-gray-1" />,
      label: "ActivityIcon History",
    },
    {
      icon: <LineChartIcon className="w-5 h-5 text-gray-1" />,
      label: "Workout Progress",
    },
  ];
  
  const otherItems = [
    {
      icon: <MailCheckIcon className="w-5 h-5 text-gray-1" />,
      label: "Contact Us",
    },
    {
      icon: <ShieldAlertIcon className="w-5 h-5 text-gray-1" />,
      label: "Privacy Policy",
    },
    {
      icon: <Settings2Icon className="w-5 h-5 text-gray-1" />,
      label: "Settings",
    },
  ];
  
  export const Profile = (): JSX.Element => {
    return (
      <div className="bg-white flex flex-col min-h-screen w-full max-w-[375px] mx-auto relative">
        <header className="flex items-center justify-between p-5 mt-5">
          <Button variant="ghost" size="icon" className="bg-[#f7f8f8] rounded-lg">
            <ArrowLeftCircleIcon className="w-4 h-4" />
          </Button>
          <h1 className="font-bold text-base">Profile</h1>
          <Button variant="ghost" size="icon" className="bg-[#f7f8f8] rounded-lg">
            <MoreVerticalIcon className="w-4 h-4" />
          </Button>
        </header>
  
        <main className="flex-1 px-[30px]">
          <div className="flex items-center gap-4 mb-5">
            <Avatar className="w-[55px] h-[55px] bg-gradient-to-b from-[#92A3FD] to-[#9DCEFF]">
              <AvatarImage src="https://c.animaapp.com/Brx5lMk5/img/vector@2x.png" />
              <AvatarFallback>SW</AvatarFallback>
            </Avatar>
            <div className="flex-1">
              <h2 className="font-medium text-sm text-black-color">
                Stefani Wong
              </h2>
              <p className="text-xs text-gray-1">Lose a Fat Program</p>
            </div>
            <Button className="bg-gradient-to-b from-[#92A3FD] to-[#9DCEFF] text-white rounded-full">
              Edit
            </Button>
          </div>
  
          <div className="grid grid-cols-3 gap-[15px] mb-5">
            {statsData.map((stat) => (
              <Card key={stat.label} className="shadow-card-shadow">
                <CardContent className="p-3 text-center">
                  <p className="font-medium text-sm bg-gradient-to-b from-[#92A3FD] to-[#9DCEFF] bg-clip-text text-transparent">
                    {stat.value}
                  </p>
                  <p className="text-xs text-gray-1">{stat.label}</p>
                </CardContent>
              </Card>
            ))}
          </div>
  
          <Card className="mb-4 shadow-card-shadow">
            <CardHeader>
              <CardTitle className="text-base font-semibold">Account</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {accountItems.map((item) => (
                <div key={item.label} className="flex items-center gap-3">
                  {item.icon}
                  <span className="flex-1 text-xs text-gray-1">{item.label}</span>
                  <ArrowLeftCircleIcon className="w-4 h-4 rotate-180 text-gray-1" />
                </div>
              ))}
            </CardContent>
          </Card>
  
          <Card className="mb-4 shadow-card-shadow">
            <CardHeader>
              <CardTitle className="text-base font-semibold">
                Notification
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center gap-3">
                <BellDotIcon className="w-5 h-5 text-gray-1" />
                <span className="flex-1 text-xs text-gray-1">
                  Pop-up Notification
                </span>
                <Switch className="bg-gradient-to-b from-[#C58BF2] to-[#EEA4CE]" />
              </div>
            </CardContent>
          </Card>
  
          <Card className="shadow-card-shadow">
            <CardHeader>
              <CardTitle className="text-base font-semibold">Other</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {otherItems.map((item) => (
                <div key={item.label} className="flex items-center gap-3">
                  {item.icon}
                  <span className="flex-1 text-xs text-gray-1">{item.label}</span>
                  <ArrowLeftCircleIcon className="w-4 h-4 rotate-180 text-gray-1" />
                </div>
              ))}
            </CardContent>
          </Card>
        </main>
  
        <div className="fixed bottom-0 w-full max-w-[375px] h-[90px] shadow-card-shadow bg-white">
          <div className="flex items-center justify-around h-full px-[30px]">
            <HomeIcon className="w-6 h-6 text-gray-1" />
            <ActivityIcon className="w-6 h-6 text-gray-1" />
            <Button
              size="lg"
              className="w-[60px] h-[60px] rounded-full bg-gradient-to-b from-[#92A3FD] to-[#9DCEFF] -translate-y-5"
            >
              <SearchCheckIcon className="w-5 h-5 text-white" />
            </Button>
            <CameraIcon className="w-6 h-6 text-gray-1" />
            <User2Icon className="w-6 h-6 text-gray-1" />
          </div>
        </div>
      </div>
    );
  };
  