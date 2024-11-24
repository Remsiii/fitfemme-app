import { motion } from "framer-motion";
import { Button } from "./components/ui/button";
import { Card, CardContent } from "./components/ui/card";
import { useNavigate } from "react-router-dom";

export const WelcomeScreen = (): JSX.Element => {
  const navigate = useNavigate();
  return (
    <main className="bg-white flex justify-center min-h-screen w-full overflow-hidden">
      <motion.div
        className="absolute w-40 h-40 rounded-full bg-gradient-to-r from-[#92A3FD] to-[#9DCDFF] opacity-20 blur-xl"
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
        className="absolute w-32 h-32 rounded-full bg-gradient-to-r from-[#9DCDFF] to-[#92A3FD] opacity-20 blur-xl"
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
      <Card className="bg-white-color/80 backdrop-blur-sm w-[375px] h-[812px] relative border-none">
        <CardContent className="flex flex-col items-center justify-between h-full p-0">
          <div className="flex flex-col items-center justify-center flex-1">
            <motion.div 
              className="flex flex-col items-center gap-5"
              animate={{
                y: [0, -10, 0],
              }}
              transition={{
                duration: 4,
                repeat: Infinity,
                ease: "easeInOut"
              }}
            >
              <motion.div
                className="w-[164px] h-[35px]"
                initial={{ scale: 0, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ duration: 0.8, ease: "easeOut" }}
              >
                <img
                  className="w-full h-full object-contain"
                  alt="Fitfemme x"
                  src="/fitfemme.jpg"
                />
              </motion.div>
              <motion.h1
                className="font-normal text-gray-1 text-lg"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.3 }}
              >
                Everybody Can Train
              </motion.h1>
            </motion.div>
          </div>

          <div className="w-full px-[30px] pb-[30px]">
            <Button className="w-full h-[55px] rounded-[99px] shadow-blue-shadow bg-gradient-to-b from-[#92A3FD] to-[#9DCDFF] hover:opacity-90" onClick={() => navigate("/onboarding1")}>
              Get Started
            </Button>
          </div>
        </CardContent>
      </Card>
    </main>
  );
};
