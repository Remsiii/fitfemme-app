import {
    ActivityIcon,
    ArrowUp01Icon,
    BellDotIcon,
    CameraIcon,
    ChevronDownCircleIcon,
    ChevronRightCircleIcon,
    HomeIcon,
    SearchCheckIcon,
    User2Icon,
    Settings2Icon,
  } from "lucide-react";
  import { Badge } from "./components/ui/badge";
  import { Button } from "./components/ui/button";
  import { Card, CardContent } from "./components/ui/card";
  import { Progress } from "./components/ui/progress";
  import { ScrollArea } from "./components/ui/scroll-area";
  import { useNavigate } from "react-router-dom";
  import { motion } from "framer-motion";
  import { ArrowLeftIcon } from "lucide-react";
  import { useState } from "react";
  import { BMICalculator } from "./components/BMICalculator";
  import { WaterIntakeForm } from "./components/WaterIntakeForm";
  import { HeartRateDisplay } from "./components/HeartRateDisplay";
  import { WaterSettings } from "./components/WaterSettings";
  
  interface WaterIntake {
    time: string;
    amount: number;
    timestamp: number; // for sorting
  }
  
  const workoutData = [
    {
      title: "Fullbody Workout",
      duration: "20minutes",
      calories: "180 Calories Burn",
      progress: 30,
      icon: "vector.png",
    },
    {
      title: "Lowerbody Workout",
      duration: "30minutes",
      calories: "200 Calories Burn",
      progress: 55,
      icon: "vector-2.png",
    },
    {
      title: "Ab Workout",
      duration: "20minutes",
      calories: "180 Calories Burn",
      progress: 30,
      icon: "vector-1.png",
    },
  ];
  

  
  interface BMIHistory {
    value: number;
    date: string;
    category: string;
  }
  
  export const Home = (): JSX.Element => {
    const [showBMICalculator, setShowBMICalculator] = useState(false);
    const [currentBMI, setCurrentBMI] = useState<number | null>(() => {
      const savedBMI = localStorage.getItem('currentBMI');
      return savedBMI ? parseFloat(savedBMI) : null;
    });
    const [waterIntakes, setWaterIntakes] = useState<WaterIntake[]>([]);
    const [showWaterIntakeForm, setShowWaterIntakeForm] = useState(false);
    const [totalWaterIntake, setTotalWaterIntake] = useState(0);
    const [waterGoal, setWaterGoal] = useState<number>(3000);
    const [showWaterSettings, setShowWaterSettings] = useState(false);
    const [currentHeartRate, setCurrentHeartRate] = useState(72);
    const [bmiHistory, setBMIHistory] = useState<BMIHistory[]>(() => {
      const savedHistory = localStorage.getItem('bmiHistory');
      return savedHistory ? JSON.parse(savedHistory) : [];
    });

    const renderBMIHistory = () => {
      if (bmiHistory.length === 0) return null;
      
      return (
        <div className="mt-4 space-y-2">
          <h4 className="text-sm font-medium">Istoric IMC</h4>
          {bmiHistory.slice(-3).reverse().map((entry, index) => (
            <div key={index} className="text-xs">
              {new Date(entry.date).toLocaleDateString()}: {entry.value.toFixed(1)} - {entry.category}
            </div>
          ))}
        </div>
      );
    };

    const handleBMICalculated = (bmiValue: number) => {
      const newBMI: BMIHistory = {
        value: bmiValue,
        date: new Date().toISOString(),
        category: getBMICategory(bmiValue)
      };

      const updatedHistory = [...bmiHistory, newBMI];
      setBMIHistory(updatedHistory);
      setCurrentBMI(bmiValue);
      
      localStorage.setItem('currentBMI', bmiValue.toString());
      localStorage.setItem('bmiHistory', JSON.stringify(updatedHistory));
    };

    const getBMICategory = (bmi: number) => {
      if (bmi < 18.5) return "Subponderal";
      if (bmi < 24.9) return "Greutate normală";
      if (bmi < 29.9) return "Supraponderal";
      return "Obezitate";
    };

    const handleAddWaterIntake = (time: string, amount: number) => {
      const newIntake = {
        time,
        amount,
        timestamp: Date.now()
      };
      
      const updatedIntakes = [...waterIntakes, newIntake].sort((a, b) => {
        const timeA = new Date(`2000/01/01 ${a.time}`).getTime();
        const timeB = new Date(`2000/01/01 ${b.time}`).getTime();
        return timeA - timeB;
      });
      
      setWaterIntakes(updatedIntakes);
      setTotalWaterIntake(prev => prev + amount);
    };

    const handleUpdateWaterGoal = (newGoal: number) => {
      setWaterGoal(newGoal);
    };

    const handleHeartRateChange = (rate: number) => {
      setCurrentHeartRate(rate);
    };

    const navigate = useNavigate();
    return (
      <div className="bg-white flex flex-row justify-center w-full">
        <div className="bg-white w-[375px] h-[1527px] relative">
          <header className="flex justify-between items-center px-8 pt-10">
            <div className="flex flex-col">
              <span className="text-gray-2 text-sm">Welcome Back,</span>
              <span className="text-black-color text-xl font-semibold">
                Stefani Wong
              </span>
            </div>
            <Button 
              variant="outline" 
              size="icon" 
              className="w-10 h-10 relative"
              onClick={() => navigate('/notifications')}
            >
              <BellDotIcon className="w-4 h-4" />
              <Badge className="absolute -top-1 -right-1 w-2 h-2 p-0 bg-danger" />
            </Button>
          </header>
  
          <Card className="mx-8 mt-8 bg-gradient-to-b from-[#92A3FD] to-[#9DCEFF] border-none text-white">
            <CardContent className="p-6">
              <div className="flex justify-between items-center">
                <div className="space-y-2">
                  <h3 className="font-semibold">IMC (Indice de Masă Corporală)</h3>
                  {currentBMI !== null ? (
                    <p className="text-sm">
                      Ai {getBMICategory(currentBMI).toLowerCase()}
                    </p>
                  ) : (
                    <p className="text-sm">Calculează-ți IMC-ul</p>
                  )}
                  <Button
                    className="bg-gradient-to-b from-[#C58BF2] to-[#EEA4CE] hover:opacity-90"
                    size="sm"
                    onClick={() => setShowBMICalculator(true)}
                  >
                    {currentBMI !== null ? "Recalculează" : "Calculează acum"}
                  </Button>
                </div>
                <div className="relative w-[106px] h-[106px]">
                  <div className="absolute inset-0 bg-white rounded-full shadow-lg flex items-center justify-center">
                    <span className="text-black font-semibold">
                      {currentBMI !== null ? currentBMI.toFixed(1) : "--"}
                    </span>
                  </div>
                </div>
              </div>
              {renderBMIHistory()}
            </CardContent>
          </Card>
  
          <Card className="mx-8 mt-6 bg-gradient-to-b from-[#92A3FD] to-[#9DCEFF] border-none">
            <CardContent className="flex justify-between items-center p-4">
              <span className="text-black font-medium">Today Target</span>
              <Button
                variant="ghost"
                className="text-white hover:text-white hover:bg-white/20"
              >
                Check
              </Button>
            </CardContent>
          </Card>
  
          <div className="px-8 mt-6">
            <h2 className="text-black-color font-semibold mb-4">
              ActivityIcon Status
            </h2>
  
            <Card className="bg-gradient-to-b from-[#92A3FD] to-[#9DCEFF] border-none text-white mb-6">
              <CardContent className="p-6">
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <h4 className="font-medium text-black-color mb-2">Ritm Cardiac</h4>
                    <HeartRateDisplay onHeartRateChange={handleHeartRateChange} />
                  </div>
                  <div className="w-[50px] h-[50px] rounded-[25px] bg-gradient-to-b from-[#92A3FD] to-[#9DCEFF] flex items-center justify-center">
                    <svg
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M12 20.25L3.75 12C-.75 7.5-.75 3 3.75 3S12 7.5 12 7.5 16.5 3 21 3s4.5 4.5 0 9l-9 8.25z"
                        fill="#fff"
                      />
                    </svg>
                  </div>
                </div>
                <div className="space-y-2">
                  <div className="flex justify-between text-xs text-gray-2">
                    <span>0</span>
                    <span>60</span>
                    <span>120</span>
                    <span>180</span>
                    <span>200</span>
                  </div>
                  <div className="h-1 bg-[#F7F8F8] rounded-full overflow-hidden">
                    <motion.div
                      className="h-full bg-gradient-to-r from-[#92A3FD] to-[#9DCEFF]"
                      initial={{ width: "0%" }}
                      animate={{ width: `${(currentHeartRate / 200) * 100}%` }}
                      transition={{ duration: 0.5 }}
                    />
                  </div>
                </div>
              </CardContent>
            </Card>
  
            <div className="grid grid-cols-2 gap-4">
              <Card className="shadow-card-shadow">
                <CardContent className="p-5">
                  <div className="flex justify-between items-start mb-4">
                    <div>
                      <div className="flex items-center gap-2">
                        <h4 className="font-medium text-black-color">Consum de apă</h4>
                        <Button
                          variant="ghost"
                          size="sm"
                          className="p-1 h-auto"
                          onClick={() => setShowWaterSettings(true)}
                        >
                          <Settings2Icon className="w-4 h-4 text-gray-500" />
                        </Button>
                      </div>
                      <p className="text-[#92A3FD] font-semibold">
                        {(totalWaterIntake / 1000).toFixed(1)} / {(waterGoal / 1000).toFixed(1)} Litri
                      </p>
                    </div>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => setShowWaterIntakeForm(true)}
                      className="text-[#92A3FD]"
                    >
                      + Adaugă
                    </Button>
                  </div>
                  
                  <div className="relative mt-4">
                    <div className="absolute left-0 w-5 h-full bg-[#F7F8F8] rounded-full">
                      <motion.div 
                        className="w-full bg-gradient-to-b from-[#C58BF2] to-[#92A3FD] rounded-full absolute bottom-0"
                        initial={{ height: "0%" }}
                        animate={{ 
                          height: `${Math.min((totalWaterIntake / waterGoal) * 100, 100)}%`
                        }}
                        transition={{ duration: 0.5 }}
                      />
                    </div>
                    <ScrollArea className="h-[200px] pl-8">
                      {waterIntakes.map((intake, index) => (
                        <motion.div 
                          key={intake.timestamp}
                          initial={{ opacity: 0, x: -10 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: index * 0.1 }}
                          className="mb-4"
                        >
                          <p className="text-xs text-gray-2">{intake.time}</p>
                          <p className="text-xs font-medium bg-gradient-to-b from-[#C58BF2] to-[#EEA4CE] bg-clip-text text-transparent">
                            {intake.amount}ml
                          </p>
                        </motion.div>
                      ))}
                      {waterIntakes.length === 0 && (
                        <p className="text-sm text-gray-400 text-center mt-4">
                          Nu ai înregistrat încă niciun consum de apă astăzi
                        </p>
                      )}
                    </ScrollArea>
                  </div>
                </CardContent>
              </Card>
  
              <div className="space-y-4">
                <Card className="shadow-card-shadow">
                  <CardContent className="p-5">
                    <h4 className="font-medium text-black-color mb-1">Sleep</h4>
                    <p className="text-black">
                      <span className="text-sm">8</span>
                      <span className="text-xs">h </span>
                      <span className="text-sm">20</span>
                      <span className="text-xs">m</span>
                    </p>
                    <img
                      src="https://c.animaapp.com/58ZjE0wf/img/sleep-graph@2x.png"
                      alt="Sleep graph"
                      className="mt-4"
                    />
                  </CardContent>
                </Card>
  
                <Card className="shadow-card-shadow">
                  <CardContent className="p-5">
                    <h4 className="font-medium text-black-color mb-1">
                      Calories
                    </h4>
                    <p className="text-[#92A3FD] font-semibold">760 kCal</p>
                    <div className="relative mt-4 flex justify-center">
                      <div className="w-[66px] h-[66px] rounded-full border-4 border-[#F7F8F8]">
                        <div className="w-full h-full rounded-full border-4 border-[#92A3FD] border-l-transparent rotate-[220deg]" />
                        <div className="absolute inset-0 flex items-center justify-center">
                          <div className="bg-gradient-to-b from-[#92A3FD] to-[#9DCEFF] rounded-full w-12 h-12 flex items-center justify-center">
                            <span className="text-white text-xs">
                              230kCal left
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
  
          <div className="px-8 mt-8">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-black-color font-semibold">Workout Progress</h2>
              <Button
                variant="default"
                size="sm"
                className="bg-gradient-to-b from-[#92A3FD] to-[#9DCEFF]"
              >
                Weekly
                <ChevronDownCircleIcon className="ml-2 h-4 w-4" />
              </Button>
            </div>
  
            <Card className="relative">
              <CardContent className="p-6">
                {/* Graph implementation */}
                <img
                  src="https://c.animaapp.com/58ZjE0wf/img/line-graph@2x.png"
                  alt="Workout progress graph"
                  className="w-full"
                />
  
                <Card className="absolute top-0 left-1/2 -translate-x-1/2 shadow-card-shadow">
                  <CardContent className="p-2.5 space-y-2">
                    <p className="text-xs text-gray-2">Fri, 28 May</p>
                    <p className="text-sm text-gray-1">Upperbody Workout</p>
                    <div className="flex items-center gap-1">
                      <span className="text-xs text-success">90%</span>
                      <ArrowUp01Icon className="w-4 h-4 text-success" />
                    </div>
                    <Progress value={90} className="h-1 bg-border-color" />
                  </CardContent>
                </Card>
              </CardContent>
            </Card>
          </div>
  
          <div className="px-8 mt-8">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-black-color font-semibold">Latest Workout</h2>
              <Button variant="link" className="text-gray-2">
                See more
              </Button>
            </div>
  
            <div className="space-y-4">
              {workoutData.map((workout, index) => (
                <Card key={index} className="shadow-card-shadow">
                  <CardContent className="p-4 flex items-center">
                    <div className="w-[50px] h-[50px] rounded-[25px] bg-gradient-to-b from-[#92A3FD] to-[#9DCEFF] mr-4" />
                    <div className="flex-1">
                      <h4 className="font-medium text-black-color">
                        {workout.title}
                      </h4>
                      <p className="text-xs text-gray-2">
                        {workout.calories} | {workout.duration}
                      </p>
                      <Progress
                        value={workout.progress}
                        className="h-2.5 mt-2 bg-[#F7F8F8]"
                      />
                    </div>
                    <Button variant="ghost" size="icon" className="ml-4">
                      <ChevronRightCircleIcon className="h-4 w-4" />
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
  
          <div className="fixed bottom-0 left-0 right-0 h-[90px] bg-white shadow-card-shadow">
            <div className="flex justify-around items-center h-full px-8">
              <Button variant="ghost" size="icon">
                <HomeIcon className="h-6 w-6" />
              </Button>
              <Button variant="ghost" size="icon">
                <ActivityIcon className="h-6 w-6" />
              </Button>
              <Button className="w-[60px] h-[60px] rounded-full bg-gradient-to-b from-[#92A3FD] to-[#9DCEFF]">
                <SearchCheckIcon className="h-5 w-5 text-white" />
              </Button>
              <Button variant="ghost" size="icon">
                <CameraIcon className="h-6 w-6" />
              </Button>
              <Button variant="ghost" size="icon">
                <User2Icon className="h-6 w-6" />
              </Button>
            </div>
          </div>
  
          {/* BMI Calculator Modal */}
          {showBMICalculator && (
            <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                className="w-full max-w-[375px]"
              >
                <BMICalculator
                  onBMICalculated={handleBMICalculated}
                  onClose={() => setShowBMICalculator(false)}
                  initialBMI={currentBMI || undefined}
                />
              </motion.div>
            </div>
          )}
  
          {/* Water Intake Form Modal */}
          {showWaterIntakeForm && (
            <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                className="w-full max-w-[375px]"
              >
                <WaterIntakeForm
                  onAddWaterIntake={handleAddWaterIntake}
                  onClose={() => setShowWaterIntakeForm(false)}
                />
              </motion.div>
            </div>
          )}
  
          {/* Water Settings Modal */}
          {showWaterSettings && (
            <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                className="w-full max-w-[375px]"
              >
                <WaterSettings
                  currentGoal={waterGoal}
                  onUpdateGoal={handleUpdateWaterGoal}
                  onClose={() => setShowWaterSettings(false)}
                />
              </motion.div>
            </div>
          )}
        </div>
      </div>
    );
  };
  
  export const NotificationScreen = (): JSX.Element => {
    const navigate = useNavigate();
  
    const notifications = [
      {
        title: "Antrenament Nou Disponibil",
        message: "Un nou antrenament de yoga a fost adăugat",
        time: "Acum 3 min",
        isNew: true,
      },
      {
        title: "Obiectiv Atins!",
        message: "Felicitări! Ți-ai atins obiectivul zilnic de pași",
        time: "Acum 2 ore",
        isNew: true,
      },
      {
        title: "Reminder Antrenament",
        message: "Nu uita de antrenamentul tău programat pentru astăzi",
        time: "Acum 5 ore",
        isNew: false,
      },
    ];
  
    return (
      <motion.div 
        className="bg-white min-h-screen p-6"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
      >
        <header className="flex items-center justify-between mb-8">
          <Button
            variant="ghost"
            size="icon"
            onClick={() => navigate(-1)}
            className="hover:bg-gray-100"
          >
            <ArrowLeftIcon className="h-6 w-6" />
          </Button>
          <h1 className="text-xl font-semibold">Notificări</h1>
          <div className="w-10" /> {/* Spacer for alignment */}
        </header>
  
        <div className="space-y-4">
          {notifications.map((notification, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className={`p-4 rounded-xl shadow-sm border ${
                notification.isNew ? 'bg-blue-50 border-blue-100' : 'bg-white border-gray-100'
              }`}
            >
              <div className="flex justify-between items-start">
                <div>
                  <h3 className="font-semibold text-gray-900">{notification.title}</h3>
                  <p className="text-sm text-gray-600 mt-1">{notification.message}</p>
                </div>
                {notification.isNew && (
                  <div className="h-2 w-2 rounded-full bg-blue-500" />
                )}
              </div>
              <p className="text-xs text-gray-400 mt-2">{notification.time}</p>
            </motion.div>
          ))}
        </div>
      </motion.div>
    );
  };
  