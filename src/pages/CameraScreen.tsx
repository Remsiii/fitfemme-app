import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { CameraIcon } from "lucide-react";
import { useNavigate } from "react-router-dom";

export const CameraScreen = (): JSX.Element => {
  const navigate = useNavigate();

  return (
    <motion.div 
      className="bg-white min-h-screen p-6"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <header className="flex items-center justify-between mb-8">
        <h1 className="text-xl font-semibold">Camera</h1>
      </header>

      <div className="flex flex-col items-center justify-center h-[60vh] gap-4">
        <div className="w-16 h-16 rounded-full bg-gradient-to-b from-[#92A3FD] to-[#9DCEFF] flex items-center justify-center">
          <CameraIcon className="w-8 h-8 text-white" />
        </div>
        <p className="text-gray-500">Take progress photos to track your fitness journey</p>
        <Button 
          className="bg-gradient-to-b from-[#92A3FD] to-[#9DCEFF] text-white"
          onClick={() => {/* Implement camera functionality */}}
        >
          Take Photo
        </Button>
      </div>
    </motion.div>
  );
};
