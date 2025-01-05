import { useNavigate } from "react-router-dom";
import {
  ArrowLeftIcon,
  HeartIcon,
  FlameIcon,
  FootprintsIcon,
  BedIcon,
  TimerIcon,
  AppleIcon,
  ActivityIcon,
  MoonIcon,
  ArrowUpIcon,
} from "lucide-react";
import { Button } from "../components/ui/button";
import { Card, CardContent } from "../components/ui/card";
import { Progress } from "../components/ui/progress";
import { useState, useEffect } from "react";

interface HealthMetric {
  icon: JSX.Element;
  title: string;
  value: string;
  unit: string;
  progress: number;
  color: string;
}

export default function AppleWatchOverview(): JSX.Element {
  const navigate = useNavigate();
  const [scrolled, setScrolled] = useState(false);

  // Mock data for health metrics
  const healthMetrics: HealthMetric[] = [
    {
      icon: <ActivityIcon className="w-6 h-6" />,
      title: "Move",
      value: "423",
      unit: "cal",
      progress: 70,
      color: "from-red-400 to-red-600",
    },
    {
      icon: <TimerIcon className="w-6 h-6" />,
      title: "Exercise",
      value: "32",
      unit: "min",
      progress: 85,
      color: "from-green-400 to-green-600",
    },
    {
      icon: <ArrowUpIcon className="w-6 h-6" />,
      title: "Stand",
      value: "10",
      unit: "hr",
      progress: 90,
      color: "from-blue-400 to-blue-600",
    },
  ];

  const additionalMetrics: HealthMetric[] = [
    {
      icon: <HeartIcon className="w-6 h-6 text-red-500" />,
      title: "Heart Rate",
      value: "72",
      unit: "bpm",
      progress: 65,
      color: "from-red-400 to-red-600",
    },
    {
      icon: <FootprintsIcon className="w-6 h-6 text-purple-500" />,
      title: "Steps",
      value: "8,432",
      unit: "steps",
      progress: 75,
      color: "from-purple-400 to-purple-600",
    },
    {
      icon: <FlameIcon className="w-6 h-6 text-orange-500" />,
      title: "Calories",
      value: "1,245",
      unit: "kcal",
      progress: 80,
      color: "from-orange-400 to-orange-600",
    },
    {
      icon: <BedIcon className="w-6 h-6 text-indigo-500" />,
      title: "Sleep",
      value: "7.5",
      unit: "hrs",
      progress: 85,
      color: "from-indigo-400 to-indigo-600",
    },
  ];

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div className="min-h-screen bg-black text-white">
      {/* Header */}
      <header
        className={`sticky top-0 z-50 transition-all duration-300 ${scrolled ? "bg-black/80 backdrop-blur-lg" : "bg-transparent"
          }`}
      >
        <div className="flex items-center justify-between px-7 py-4">
          <Button
            variant="ghost"
            onClick={() => navigate(-1)}
            className="p-0 hover:bg-transparent"
          >
            <ArrowLeftIcon className="w-6 h-6 text-white" />
          </Button>
          <div className="flex items-center gap-2">
            <AppleIcon className="w-6 h-6 text-white" />
            <span className="text-lg font-semibold">Watch</span>
          </div>
          <div className="w-6" /> {/* Spacer for alignment */}
        </div>
      </header>

      <main className="px-7 pb-20 pt-6">
        {/* Activity Rings Section */}
        <section className="mb-12">
          <h2 className="text-2xl font-semibold mb-6">Activity</h2>
          <div className="grid grid-cols-3 gap-4">
            {healthMetrics.map((metric, index) => (
              <Card
                key={index}
                className="bg-white/10 border-0 backdrop-blur-lg"
              >
                <CardContent className="p-4">
                  <div className="flex flex-col items-center gap-2">
                    <div className={`bg-gradient-to-r ${metric.color} p-3 rounded-full`}>
                      {metric.icon}
                    </div>
                    <div className="text-center">
                      <p className="text-sm text-gray-300">{metric.title}</p>
                      <p className="text-xl font-bold">
                        {metric.value}
                        <span className="text-sm font-normal text-gray-400 ml-1">
                          {metric.unit}
                        </span>
                      </p>
                    </div>
                    <Progress value={metric.progress} className="h-1.5" />
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        {/* Health Metrics Section */}
        <section>
          <h2 className="text-2xl font-semibold mb-6">Health Metrics</h2>
          <div className="grid grid-cols-2 gap-4">
            {additionalMetrics.map((metric, index) => (
              <Card
                key={index}
                className="bg-white/10 border-0 backdrop-blur-lg"
              >
                <CardContent className="p-4">
                  <div className="flex items-start gap-4">
                    <div className="bg-white/10 p-2 rounded-full">
                      {metric.icon}
                    </div>
                    <div>
                      <p className="text-sm text-gray-300">{metric.title}</p>
                      <p className="text-xl font-bold">
                        {metric.value}
                        <span className="text-sm font-normal text-gray-400 ml-1">
                          {metric.unit}
                        </span>
                      </p>
                      <Progress
                        value={metric.progress}
                        className="h-1.5 mt-2"
                      />
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>
      </main>
    </div>
  );
}