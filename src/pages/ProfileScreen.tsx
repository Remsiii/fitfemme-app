import { motion } from "framer-motion";
import { User2Icon, Settings2Icon, HeartIcon, BellIcon, ShieldIcon, HelpCircleIcon } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { Card } from "@/components/ui/card";

export const ProfileScreen = (): JSX.Element => {
  const navigate = useNavigate();

  const menuItems = [
    { icon: HeartIcon, label: "Your Goals", onClick: () => {} },
    { icon: BellIcon, label: "Notifications", onClick: () => navigate("/notifications") },
    { icon: ShieldIcon, label: "Privacy", onClick: () => {} },
    { icon: Settings2Icon, label: "Settings", onClick: () => {} },
    { icon: HelpCircleIcon, label: "Help", onClick: () => {} },
  ];

  return (
    <motion.div 
      className="bg-white min-h-screen p-6"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <header className="flex items-center justify-between mb-8">
        <h1 className="text-xl font-semibold">Profile</h1>
      </header>

      <div className="flex flex-col items-center mb-8">
        <div className="w-24 h-24 rounded-full bg-gradient-to-b from-[#92A3FD] to-[#9DCEFF] flex items-center justify-center mb-4">
          <User2Icon className="w-12 h-12 text-white" />
        </div>
        <h2 className="text-xl font-semibold">Stefani Wong</h2>
        <p className="text-gray-500">Fitness Enthusiast</p>
      </div>

      <div className="space-y-4">
        {menuItems.map((item, index) => (
          <Card 
            key={index} 
            className="flex items-center p-4 cursor-pointer hover:bg-gray-50"
            onClick={item.onClick}
          >
            <item.icon className="w-5 h-5 text-gray-500 mr-4" />
            <span>{item.label}</span>
          </Card>
        ))}
      </div>
    </motion.div>
  );
};
