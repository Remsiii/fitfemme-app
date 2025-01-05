import {
  ArrowUpRightFromCircleIcon,
  BatteryChargingIcon,
  BellIcon,
  Clock10Icon,
  HomeIcon,
  PlusCircleIcon,
  Settings2Icon,
  SignalHighIcon,
  WifiHighIcon,
  ArrowLeftIcon,
  ArrowRightIcon,
  CalendarIcon,
} from "lucide-react";
import { Badge } from "../../components/ui/badge";
import { Button } from "../../components/ui/button";
import { Card, CardContent } from "../../components/ui/card";
import { useNavigate } from "react-router-dom";
import { useState, useEffect, TouchEvent } from "react";
import { supabase } from "../../lib/supabase";

const weekDays = [
  { key: "sun", label: "S" },
  { key: "mon", label: "M" },
  { key: "tue", label: "T" },
  { key: "wed", label: "W" },
  { key: "thu", label: "T" },
  { key: "fri", label: "F" },
  { key: "sat", label: "S" },
];

interface DayInfo {
  day: string;
  status: "normal" | "period" | "ovulation" | "selected" | "predicted-period" | "fertile";
  isToday?: boolean;
}

interface PeriodData {
  period_start_date: string;
  period_end_date: string | null;
  cycle_length: number;
  period_length: number;
}

export const Tracker = (): JSX.Element => {
  const navigate = useNavigate();
  const [currentDate] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState<Date>(new Date());
  const [calendarDays, setCalendarDays] = useState<DayInfo[]>([]);
  const [periodData, setPeriodData] = useState<PeriodData | null>(null);
  const [touchStart, setTouchStart] = useState<number | null>(null);
  const [nextPeriodDate, setNextPeriodDate] = useState<Date | null>(null);

  // Handle touch events for swipe
  const handleTouchStart = (e: TouchEvent) => {
    setTouchStart(e.touches[0].clientX);
  };

  const handleTouchEnd = (e: TouchEvent) => {
    if (!touchStart) return;

    const touchEnd = e.changedTouches[0].clientX;
    const diff = touchStart - touchEnd;

    // Swipe threshold of 50px
    if (Math.abs(diff) > 50) {
      if (diff > 0) {
        // Swipe left - next month
        handleNextMonth();
      } else {
        // Swipe right - previous month
        handlePrevMonth();
      }
    }

    setTouchStart(null);
  };

  const handlePrevMonth = () => {
    setSelectedDate(new Date(selectedDate.getFullYear(), selectedDate.getMonth() - 1, 1));
  };

  const handleNextMonth = () => {
    setSelectedDate(new Date(selectedDate.getFullYear(), selectedDate.getMonth() + 1, 1));
  };

  useEffect(() => {
    const fetchPeriodData = async () => {
      try {
        const { data: { user } } = await supabase.auth.getUser();
        if (!user) {
          console.log('No user found');
          return;
        }

        const { data, error } = await supabase
          .from('period_tracking')
          .select('*')
          .eq('user_id', user.id)
          .order('period_start_date', { ascending: false })
          .limit(1);

        if (error) {
          console.error('Error fetching period data:', error);
          return;
        }

        if (data && data.length > 0) {
          setPeriodData(data[0]);
        }
      } catch (error) {
        console.error('Error in fetchPeriodData:', error);
      }
    };

    fetchPeriodData();
  }, []);

  useEffect(() => {
    if (periodData) {
      const lastPeriodDate = new Date(periodData.period_start_date);
      const cycleLength = periodData.cycle_length || 28;
      
      // Calculate next period date
      const nextPeriod = new Date(lastPeriodDate);
      nextPeriod.setDate(nextPeriod.getDate() + cycleLength);
      
      setNextPeriodDate(nextPeriod);
    }
  }, [periodData]);

  useEffect(() => {
    const daysInMonth = new Date(
      selectedDate.getFullYear(),
      selectedDate.getMonth() + 1,
      0
    ).getDate();

    const days: DayInfo[] = [];

    if (periodData) {
      const periodStart = new Date(periodData.period_start_date);
      const cycleLength = periodData.cycle_length || 28;
      const periodLength = periodData.period_length || 5;

      // Calculate multiple cycles
      const cycles = [];
      let currentCycleStart = new Date(periodStart);
      
      // Calculate 3 cycles (previous, current, and next)
      for (let i = -1; i <= 1; i++) {
        const cycleStart = new Date(currentCycleStart);
        cycleStart.setDate(cycleStart.getDate() + (cycleLength * i));
        
        const cycleEnd = new Date(cycleStart);
        cycleEnd.setDate(cycleStart.getDate() + cycleLength - 1);
        
        const ovulationDate = new Date(cycleStart);
        ovulationDate.setDate(cycleStart.getDate() + Math.floor(cycleLength / 2) - 14);
        
        const fertileStart = new Date(ovulationDate);
        fertileStart.setDate(ovulationDate.getDate() - 5);
        
        const fertileEnd = new Date(ovulationDate);
        fertileEnd.setDate(ovulationDate.getDate() + 2);
        
        cycles.push({
          periodStart: cycleStart,
          periodEnd: new Date(cycleStart.getTime() + periodLength * 24 * 60 * 60 * 1000),
          ovulationDate,
          fertileStart,
          fertileEnd
        });
      }

      for (let i = 1; i <= daysInMonth; i++) {
        const day = String(i).padStart(2, "0");
        const currentDayDate = new Date(selectedDate.getFullYear(), selectedDate.getMonth(), i);
        
        let status: DayInfo["status"] = "normal";

        // Check each cycle for the current day's status
        cycles.forEach(cycle => {
          // Check period days
          if (currentDayDate >= cycle.periodStart && currentDayDate <= cycle.periodEnd) {
            status = currentDayDate >= periodStart ? "period" : "predicted-period";
          }
          
          // Check ovulation day
          if (currentDayDate.toDateString() === cycle.ovulationDate.toDateString()) {
            status = "ovulation";
          }
          
          // Check fertile days
          if (currentDayDate >= cycle.fertileStart && currentDayDate <= cycle.fertileEnd) {
            if (status !== "ovulation") {
              status = "fertile";
            }
          }
        });

        const isToday = currentDayDate.toDateString() === new Date().toDateString();
        days.push({ day, status, isToday });
      }
    }

    setCalendarDays(days);
  }, [selectedDate, periodData]);

  const getStatusColor = (status: string, isToday: boolean = false) => {
    const baseStyles = "w-10 h-10 rounded-full flex items-center justify-center";
    switch (status) {
      case "period":
        return `${baseStyles} bg-red-200 text-red-800`;
      case "ovulation":
        return `${baseStyles} bg-purple-200 text-purple-800`;
      case "predicted-period":
        return `${baseStyles} bg-pink-100 text-pink-800`;
      case "fertile":
        return `${baseStyles} bg-purple-100 text-purple-600`;
      default:
        return `${baseStyles} ${isToday ? "bg-[#86d8dc] text-white" : ""}`;
    }
  };

  return (
    <div className="w-full min-h-screen flex items-center justify-center bg-white">
      <div className="w-full h-screen max-w-[430px] bg-[#f6f6f6] rounded-[40px] overflow-hidden relative">
        {/* Header */}
        <header className="flex items-center justify-between px-7 mt-4">
          <div className="flex items-center gap-3.5">
            <Button
              variant="ghost"
              onClick={() => navigate(-1)}
              className="p-0 hover:bg-transparent"
            >
              <ArrowLeftIcon className="w-6 h-6 text-[#3a276a]" />
            </Button>
            <h1 className="text-xl font-semibold text-[#3a276a]">Calendar</h1>
          </div>
        </header>

        {/* Next Period Prediction */}
        {nextPeriodDate && (
          <div className="px-7 mt-6">
            <Card className="bg-gradient-to-r from-pink-100 to-purple-100 border-none">
              <CardContent className="p-4">
                <div className="flex items-center gap-3">
                  <CalendarIcon className="w-5 h-5 text-purple-600" />
                  <div>
                    <p className="text-sm text-purple-800">Next Period Expected</p>
                    <p className="font-semibold text-purple-900">
                      {nextPeriodDate.toLocaleDateString("en-US", {
                        month: "long",
                        day: "numeric",
                      })}
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        )}

        {/* Calendar */}
        <div 
          className="px-7 mt-6"
          onTouchStart={handleTouchStart}
          onTouchEnd={handleTouchEnd}
        >
          {/* Month Navigation */}
          <div className="flex items-center justify-between mb-6">
            <button onClick={handlePrevMonth}>
              <ArrowLeftIcon className="w-5 h-5 text-[#3a276a]" />
            </button>
            <h2 className="text-lg font-semibold text-[#3a276a]">
              {selectedDate.toLocaleDateString("en-US", {
                month: "long",
                year: "numeric",
              })}
            </h2>
            <button onClick={handleNextMonth}>
              <ArrowRightIcon className="w-5 h-5 text-[#3a276a]" />
            </button>
          </div>

          {/* Week Days */}
          <div className="grid grid-cols-7 gap-1 mb-2">
            {weekDays.map((day) => (
              <div
                key={day.key}
                className="text-center text-sm font-medium text-gray-500"
              >
                {day.label}
              </div>
            ))}
          </div>

          {/* Calendar Days */}
          <div className="grid grid-cols-7 gap-1">
            {calendarDays.map(({ day, status, isToday }, index) => (
              <div
                key={index}
                className={getStatusColor(status, isToday)}
              >
                {parseInt(day)}
              </div>
            ))}
          </div>

          {/* Legend */}
          <div className="mt-6 flex flex-wrap gap-4">
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full bg-red-200" />
              <span className="text-sm text-gray-600">Period</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full bg-purple-200" />
              <span className="text-sm text-gray-600">Ovulation</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full bg-purple-100" />
              <span className="text-sm text-gray-600">Fertile Window</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full bg-pink-100" />
              <span className="text-sm text-gray-600">Predicted Period</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};