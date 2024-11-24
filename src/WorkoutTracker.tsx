import { useNavigate } from "react-router-dom";
import { Button } from "./components/ui/button";
import { Card, CardContent } from "./components/ui/card";
import { Separator } from "./components/ui/separator";
import { Switch } from "./components/ui/switch";
import { XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Area, AreaChart } from 'recharts';
import { motion } from 'framer-motion';

const dummyChartData = [
  { day: 'Lu', progress: 65, calories: 420 },
  { day: 'Ma', progress: 72, calories: 560 },
  { day: 'Mi', progress: 68, calories: 490 },
  { day: 'Jo', progress: 85, calories: 610 },
  { day: 'Vi', progress: 90, calories: 670 },
  { day: 'Sâ', progress: 82, calories: 580 },
  { day: 'Du', progress: 88, calories: 640 },
];

const CustomTooltip = ({ active, payload, label }: any) => {
  if (active && payload && payload.length) {
    return (
      <motion.div 
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        className="bg-white p-4 rounded-xl shadow-lg border border-gray-100"
      >
        <p className="text-sm font-semibold text-gray-800">{`${label}`}</p>
        <p className="text-sm text-purple-600">
          <span className="font-medium">Progres:</span> {`${payload[0].value}%`}
        </p>
        <p className="text-sm text-blue-500">
          <span className="font-medium">Calorii:</span> {`${payload[1].value} kcal`}
        </p>
      </motion.div>
    );
  }
  return null;
};

const WorkoutProgressChart = () => {
  return (
    <motion.div 
      className="h-[200px] w-full"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8 }}
    >
      <ResponsiveContainer width="100%" height="100%">
        <AreaChart
          data={dummyChartData}
          margin={{ top: 10, right: 10, left: -20, bottom: 0 }}
        >
          <defs>
            <linearGradient id="progressGradient" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#92A3FD" stopOpacity={0.3}/>
              <stop offset="95%" stopColor="#92A3FD" stopOpacity={0}/>
            </linearGradient>
            <linearGradient id="caloriesGradient" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#C58BF2" stopOpacity={0.3}/>
              <stop offset="95%" stopColor="#C58BF2" stopOpacity={0}/>
            </linearGradient>
          </defs>
          
          <CartesianGrid 
            strokeDasharray="3 3" 
            stroke="#eee" 
            vertical={false}
          />
          
          <XAxis 
            dataKey="day" 
            stroke="#92A3FD"
            tick={{ fill: '#92A3FD', fontSize: 12 }}
            axisLine={false}
          />
          
          <YAxis 
            stroke="#92A3FD"
            tick={{ fill: '#92A3FD', fontSize: 12 }}
            axisLine={false}
            tickLine={false}
          />
          
          <Tooltip content={<CustomTooltip />} />
          
          <Area
            type="monotone"
            dataKey="progress"
            stroke="#92A3FD"
            strokeWidth={2}
            fillOpacity={1}
            fill="url(#progressGradient)"
            dot={{ fill: '#92A3FD', strokeWidth: 2, r: 4 }}
            activeDot={{ 
              r: 6, 
              stroke: '#92A3FD',
              strokeWidth: 2,
              fill: '#fff'
            }}
          />
          
          <Area
            type="monotone"
            dataKey="calories"
            stroke="#C58BF2"
            strokeWidth={2}
            fillOpacity={1}
            fill="url(#caloriesGradient)"
            dot={{ fill: '#C58BF2', strokeWidth: 2, r: 4 }}
            activeDot={{ 
              r: 6, 
              stroke: '#C58BF2',
              strokeWidth: 2,
              fill: '#fff'
            }}
          />
        </AreaChart>
      </ResponsiveContainer>
    </motion.div>
  );
};

const workoutData = [
  {
    title: "Antrenament Full Body",
    exercises: 11,
    duration: "32min",
    image: "https://c.animaapp.com/G30bxgdN/img/vector@2x.png",
  },
  {
    title: "Antrenament Picioare",
    exercises: 12,
    duration: "40min",
    image: "https://c.animaapp.com/G30bxgdN/img/vector-1@2x.png",
  },
  {
    title: "Antrenament Abdomen",
    exercises: 14,
    duration: "20min",
    image: "https://c.animaapp.com/G30bxgdN/img/vector-2@2x.png",
  },
];

const upcomingWorkouts = [
  {
    title: "Antrenament Full Body",
    time: "Astăzi, 15:00",
    icon: "https://c.animaapp.com/G30bxgdN/img/vector-3@2x.png",
    active: true,
  },
  {
    title: "Antrenament Partea Superioară",
    time: "5 Iunie, 14:00",
    icon: "https://c.animaapp.com/G30bxgdN/img/vector-4@2x.png",
    active: false,
  },
];

export const WorkoutTracker = (): JSX.Element => {

  const navigate = useNavigate();


  return (
    <div className="bg-white flex flex-row justify-center w-full">
      <div className="bg-white w-[375px] h-[1175px]">
        <div className="relative h-[1175px]">
          <div className="h-[405px] top-0 [background:linear-gradient(180deg,rgb(146,163,253)_0%,rgb(157,206,255)_100%)] absolute w-[375px] left-0">
            <header className="flex items-center justify-between px-[30px] pt-10">
              <Button
                variant="ghost"
                size="icon"
                className="bg-[#f7f8f8] w-8 h-8"
                onClick={() => navigate("/onboarding2")}
              >
                <div className="w-4 h-4 bg-[url(https://c.animaapp.com/G30bxgdN/img/iconly-light-arrow---left-2.svg)]" />
              </Button>

              <h1 className="font-bold text-white-color text-base">
                Urmărire Antrenament
              </h1>

              <Button
                variant="ghost"
                size="icon"
                className="bg-[#f7f8f8] w-8 h-8"
              >
                <div className="flex gap-1.5">
                  <div className="w-1 h-1 bg-black-color rounded-sm" />
                  <div className="w-1 h-1 bg-black-color rounded-sm" />
                </div>
              </Button>
            </header>

            <Card className="mt-4 mx-[30px] bg-white shadow-card-shadow">
              <CardContent className="p-2.5">
                <div className="text-gray-2 text-[8px]">Vin, 28 Mai</div>
                <div className="flex justify-between items-center">
                  <div className="text-gray-1 text-[10px]">
                    Antrenament Partea Superioară
                  </div>
                  <div className="flex items-center gap-1 text-success text-[8px]">
                    90%
                    <div className="w-2 h-2 bg-[url(https://c.animaapp.com/G30bxgdN/img/iconly-light-arrow---up.svg)]" />
                  </div>
                </div>
                <div className="mt-2 h-[5px] bg-border-color rounded-[5px]">
                  <div className="w-[80%] h-full [background:linear-gradient(180deg,rgb(197,139,242)_0%,rgb(146,163,253)_100%)]" />
                </div>
              </CardContent>
            </Card>

            <div className="px-[30px] mt-4">
              <WorkoutProgressChart />
            </div>
          </div>

          <div className="h-[876px] top-[299px] bg-white rounded-[40px] absolute w-[375px] left-0">
            <Separator className="w-[50px] h-[5px] mx-auto mt-2.5 bg-black-color opacity-10 rounded-[50px]" />

            <div className="px-[30px] mt-10">
              <Card className="[background:linear-gradient(180deg,rgb(146,163,253)_0%,rgb(157,206,255)_100%)] p-5">
                <div className="flex justify-between items-center">
                  <h2 className="text-black-color font-medium text-sm">
                    Program Zilnic de Antrenament
                  </h2>
                  <Button variant="ghost" className="text-white text-xs">
                    Verifică
                  </Button>
                </div>
              </Card>

              <div className="mt-8">
                <div className="flex justify-between items-center mb-4">
                  <h2 className="font-semibold text-black-color text-lg">
                    Antrenament În Curând
                  </h2>
                  <Button variant="link" className="text-gray-2 text-xs">
                    Vezi mai mult
                  </Button>
                </div>

                {upcomingWorkouts.map((workout, index) => (
                  <Card key={index} className="mb-4 shadow-card-shadow">
                    <CardContent className="p-4 flex items-center justify-between">
                      <div className="flex items-center gap-4">
                        <div
                          className={`w-[50px] h-[50px] rounded-[25px] ${workout.active ? "[background:linear-gradient(180deg,rgb(146,163,253)_0%,rgb(157,206,255)_100%)]" : "[background:linear-gradient(180deg,rgb(197,139,242)_0%,rgb(238,164,206)_100%)]"}`}
                        >
                          <img
                            src={workout.icon}
                            alt=""
                            className="w-full h-full object-contain"
                          />
                        </div>
                        <div>
                          <div className="text-black-color text-sm font-medium">
                            {workout.title}
                          </div>
                          <div className="text-gray-2 text-xs">
                            {workout.time}
                          </div>
                        </div>
                      </div>
                      <Switch checked={workout.active} />
                    </CardContent>
                  </Card>
                ))}
              </div>

              <div className="mt-8">
                <h2 className="font-semibold text-black-color text-lg mb-4">
                  Ce Vrei Să Antrenezi
                </h2>
                {workoutData.map((workout, index) => (
                  <Card
                    key={index}
                    className="mb-4 [background:linear-gradient(180deg,rgb(146,163,253)_0%,rgb(157,206,255)_100%)]"
                  >
                    <CardContent className="p-5 flex justify-between items-center">
                      <div>
                        <div className="text-black-color text-sm font-medium">
                          {workout.title}
                        </div>
                        <div className="text-gray-1 text-xs">
                          {workout.exercises} Exercises | {workout.duration}
                        </div>
                        <Button
                          variant="secondary"
                          className="mt-4 bg-white rounded-[50px] text-[10px]"
                        >
                          <span className="bg-gradient-to-b from-[#92A3FD] to-[#9DCEFF] bg-clip-text text-transparent">
                            Vezi mai mult
                          </span>
                        </Button>
                      </div>
                      <div className="relative">
                        <div className="w-[92px] h-[92px] bg-white-color rounded-[46px]" />
                        <img
                          src={workout.image}
                          alt=""
                          className="absolute top-0 right-0 h-[106px]"
                        />
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
