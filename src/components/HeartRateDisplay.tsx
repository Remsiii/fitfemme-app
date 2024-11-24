import { useState, useEffect } from "react";
import { motion } from "framer-motion";

interface HeartRateDisplayProps {
  onHeartRateChange: (rate: number) => void;
}

interface HeartRateDisplayProps {
  onHeartRateChange: (rate: number) => void;
}

export const HeartRateDisplay: React.FC<HeartRateDisplayProps> = ({ onHeartRateChange }) => {
  const [heartRate, setHeartRate] = useState(72);

  const generateRandomHeartRate = () => {
    return Math.floor(Math.random() * (85 - 65) + 65);
  };

  useEffect(() => {
    const interval = setInterval(() => {
      setHeartRate(generateRandomHeartRate());
    }, 10000);

    return () => clearInterval(interval);
  }, []);

  const getHeartRateStatus = (rate: number) => {
    if (rate < 60) return { text: "În repaus", color: "text-blue-500" };
    if (rate < 100) return { text: "Normal", color: "text-green-500" };
    if (rate < 140) return { text: "Activ", color: "text-orange-500" };
    return { text: "Intens", color: "text-red-500" };
  };

  const status = getHeartRateStatus(heartRate);

  return (
    <div className="space-y-2">
      <div className="flex items-center gap-3">
        <motion.div
          className="w-2 h-2 rounded-full bg-red-500"
          animate={{
            scale: [1, 1.2, 1],
            opacity: [1, 0.5, 1],
          }}
          transition={{
            duration: 1,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
        <span className="font-semibold text-lg">{heartRate} BPM</span>
      </div>
      <span className={`text-sm ${status.color}`}>{status.text}</span>
    </div>
  );
}; 