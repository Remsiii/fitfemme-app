import { ArrowRightCircleIcon } from "lucide-react";
import { Button } from "./components/ui/button";
import { CardContent } from "./components/ui/card";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";

export const Onboarding1 = (): JSX.Element => {
    const navigate = useNavigate();
    
  return (
    <main className="bg-white flex justify-center items-center w-screen h-screen overflow-hidden">
      <motion.div
        className="absolute w-40 h-40 rounded-full bg-gradient-to-r from-[#9293FD] to-[#9DCEFF] opacity-20 blur-xl"
        animate={{
          scale: [1, 1.2, 1],
          x: [0, 100, 0],
          y: [0, -50, 0],
        }}
        transition={{
          duration: 8,
          repeat: Infinity,
          ease: "easeInOut"
        }}
        style={{ top: "20%", left: "20%" }}
      />
      <motion.div
        className="absolute w-32 h-32 rounded-full bg-gradient-to-r from-[#9DCEFF] to-[#9293FD] opacity-20 blur-xl"
        animate={{
          scale: [1, 1.3, 1],
          x: [0, -70, 0],
          y: [0, 60, 0],
        }}
        transition={{
          duration: 7,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 1
        }}
        style={{ bottom: "30%", right: "20%" }}
      />

      <div className="relative w-full h-full max-w-[375px] max-h-[812px] flex flex-col bg-white/80 backdrop-blur-sm shadow-md">
        <motion.img
          className="w-full h-[50%] object-cover"
          alt="Fitness tracking illustration"
          src="https://c.animaapp.com/Wl5tz89S/img/frame.svg"
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        />

        <CardContent className="flex-1 px-5 py-4 flex flex-col justify-between">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
          >
            <motion.h1 
              className="font-bold text-xl text-black text-center"
              animate={{
                y: [0, -5, 0],
              }}
              transition={{
                duration: 4,
                repeat: Infinity,
                ease: "easeInOut"
              }}
            >
              Track Your Goal
            </motion.h1>
            <motion.p 
              className="mt-6 text-center text-gray-500 text-sm"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.5 }}
            >
              Don't worry if you have trouble determining your goals. We can
              help you determine and track them.
            </motion.p>
          </motion.div>
          <motion.div
            className="flex justify-between items-center"
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.7 }}
          >
            <Button
              className="w-[60px] h-[60px] rounded-full bg-gradient-to-b from-[#9293FD] to-[#9DCEFF] flex items-center justify-center"
              variant="default"
              onClick={() => navigate("/")}
            >
              <ArrowRightCircleIcon className="h-5 w-5 text-white rotate-180" />
            </Button>
            
            <Button
              className="w-[60px] h-[60px] rounded-full bg-gradient-to-b from-[#9293FD] to-[#9DCEFF] flex items-center justify-center"
              variant="default"
              onClick={() => navigate("/onboarding2")}
            >
              <ArrowRightCircleIcon className="h-5 w-5 text-white" />
            </Button>
          </motion.div>
        </CardContent>
      </div>
    </main>
  );
};
