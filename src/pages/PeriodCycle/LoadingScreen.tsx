import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
    ArrowRightCircleIcon,
    BatteryChargingIcon,
    Navigation2Icon,
    SignalHighIcon,
    WifiHighIcon,
  } from "lucide-react";
  import { Button } from "../../components/ui/button";
  import { Card, CardContent } from "../../components/ui/card";
  import { motion } from "framer-motion";
  
  
  export const Intro = (): JSX.Element => {
    const navigate = useNavigate();
  
    useEffect(() => {
      // Automatische Weiterleitung nach 1,5 Sekunden
      const timer = setTimeout(() => {
        navigate("/period-cycle/start");
      }, 1500);
  
      return () => clearTimeout(timer);
    }, [navigate]);
  
    return (
      <div className="w-full min-h-screen flex items-center justify-center bg-white">
        <Card className="w-full h-screen max-w-[430px] rounded-[40px] overflow-hidden">
          <CardContent className="p-0 h-full relative">
  
            {/* Main Content */}
            <main className="w-full h-[calc(100%-78px)] flex flex-col items-center">
              {/* Logo and Title */}
              <div className="flex flex-col items-center gap-0.5 mt-[85px]">
                <motion.h1 
                  className="text-[50px] text-center"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5 }}
                >
                  <span className="text-[#3a276a]">Cycle</span>
                  <span className="text-[#86d8dc]">Sense</span>
                </motion.h1>
  
                <motion.h2 
                  className="text-3xl text-[#3a276a] text-center w-[253px] px-2.5"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.3, duration: 0.5 }}
                >
                  A Period Tracker &amp; Calendar
                </motion.h2>
              </div>
  
              {/* Main Image with Pulse Animation */}
              <motion.div
                className="mt-[85px] w-[578px] h-[578px] flex items-center justify-center"
                animate={{
                  scale: [1, 1.05, 1],
                }}
                transition={{
                  duration: 1.5,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
              >
                <img
                  className="w-full h-full object-contain"
                  alt="Front illustration"
                  src="https://c.animaapp.com/Ds0QdvUs/img/front-image.png"
                />
              </motion.div>
  
              {/* Bottom Section 
              <div className="absolute bottom-0 w-full h-[126px] bg-[#efefef] rounded-b-[40px] shadow-[0px_-0.5px_250px_#00000040]">
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ delay: 0.5, duration: 0.5 }}
                >
                  <Button
                    variant="default"
                    size="lg"
                    className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[214px] h-20 rounded-full bg-[#3a276a]"
                  >
                    <ArrowRightCircleIcon className="w-6 h-6" />
                  </Button>
                </motion.div>
  
                <img
                  className="absolute bottom-[22px] left-1/2 -translate-x-1/2 w-[170px] h-5"
                  alt="Navigation2Icon dots"
                  src="https://c.animaapp.com/Ds0QdvUs/img/frame-1.svg"
                />
              </div>
              */}
            </main>
          </CardContent>
        </Card>
      </div>
    );
  };
  