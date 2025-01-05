import {
  ArrowRightIcon,
  DropletIcon,
  FlowerIcon,
  FootprintsIcon,
  HeartIcon,
  PlusIcon,
  CalendarIcon,
  CalendarCheck,
  X,
} from "lucide-react";
import { Badge } from "../../components/ui/badge";
import { Card, CardContent } from "../../components/ui/card";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Label } from "../../components/ui/label";
import { Button } from "../../components/ui/button"; // Add missing import
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "../../lib/supabase"; // Make sure this path is correct

// Beispiel: Zykluslänge (hier als Konstante 28 Tage).
const dateNumbers = Array.from({ length: 28 }, (_, i) =>
  String(i + 1).padStart(2, "0")
);

// Beispiel: Funktion zur Phasenberechnung.
const calculatePhases = (startDate: string | number | Date) => {
  const phases = [];
  const follicularPhaseEnd = new Date(startDate);
  follicularPhaseEnd.setDate(follicularPhaseEnd.getDate() + 14);

  phases.push({
    phase: "Follicular",
    startDate: new Date(startDate),
    endDate: follicularPhaseEnd,
  });

  const ovulationDate = new Date(follicularPhaseEnd);
  ovulationDate.setDate(ovulationDate.getDate() + 1);

  phases.push({
    phase: "Ovulation",
    startDate: follicularPhaseEnd,
    endDate: ovulationDate,
  });

  const lutealPhaseEnd = new Date(ovulationDate);
  lutealPhaseEnd.setDate(lutealPhaseEnd.getDate() + 13);

  phases.push({
    phase: "Luteal",
    startDate: ovulationDate,
    endDate: lutealPhaseEnd,
  });

  return phases;
};

// Calculate next period date based on the phases
const calculateNextPeriod = (phases: { phase: string; startDate: Date; endDate: Date }[]) => {
  const lutealPhase = phases.find((phase) => phase.phase === "Luteal");
  if (lutealPhase) {
    const nextPeriodStart = new Date(lutealPhase.endDate);
    nextPeriodStart.setDate(nextPeriodStart.getDate() + 1);
    return nextPeriodStart;
  }
  return null;
};

// Get days in a month
const getDaysInMonth = (date: Date) => {
  return new Date(date.getFullYear(), date.getMonth() + 1, 0).getDate();
};

// Generate dates for current month
const generateMonthDates = (date: Date) => {
  const daysInMonth = getDaysInMonth(date);
  return Array.from({ length: daysInMonth }, (_, i) =>
    String(i + 1).padStart(2, "0")
  );
};

interface PeriodData {
  period_start_date: string;
  period_end_date: string | null;
  cycle_length: number;
  period_length: number;
}

const PeriodInputDialog = ({
  isOpen,
  onClose,
  lastPeriod,
  onSave,
}: {
  isOpen: boolean;
  onClose: () => void;
  lastPeriod: Date | null;
  onSave: (date: Date, isNewPeriod: boolean) => void;
}) => {
  const [selectedDate, setSelectedDate] = useState<Date>(new Date());
  const [isNewPeriod, setIsNewPeriod] = useState(true);
  const [isDatePickerOpen, setIsDatePickerOpen] = useState(false);

  useEffect(() => {
    if (isOpen) {
      setSelectedDate(new Date());
      setIsNewPeriod(true);
      setIsDatePickerOpen(false);
    }
  }, [isOpen]);

  const handleDateClick = () => {
    setIsDatePickerOpen(true);
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="bg-[#3a276a] text-white p-8 rounded-[30px] border-none max-w-[430px] shadow-xl">
        <DialogTitle className="sr-only">Track Your Period</DialogTitle>
        <div className="absolute right-4 top-4">
          <button
            onClick={onClose}
            className="rounded-full p-1.5 bg-[#4a377a] hover:bg-[#5a477a] transition-colors"
          >
            <X className="h-4 w-4 text-gray-300" />
          </button>
        </div>

        <div className="mb-8 text-center">
          <div className="mb-3">
            <div className="bg-[#4a377a] inline-block p-3 rounded-full mb-4">
              <CalendarCheck className="h-8 w-8 text-[#86d8dc]" />
            </div>
            <h2 className="text-2xl font-semibold mb-2">
              Track Your Period
            </h2>
            <p className="text-gray-300 text-sm">
              Keep track of your cycle to get better predictions
            </p>
          </div>

          {lastPeriod && (
            <div className="mt-6 bg-[#4a377a] p-4 rounded-2xl">
              <p className="text-sm text-gray-300 mb-2">Last period started on</p>
              <Badge className="bg-[#86d8dc] text-[#3a276a] text-lg px-4 py-2">
                {lastPeriod.toLocaleDateString("en-US", {
                  month: "long",
                  day: "numeric",
                  year: "numeric",
                })}
              </Badge>
            </div>
          )}
        </div>

        <div className="space-y-6">
          <div className="space-y-4">
            <div className="flex gap-2 mb-4">
              <Button
                variant="ghost"
                onClick={() => setIsNewPeriod(true)}
                className={`flex-1 ${
                  isNewPeriod
                    ? "bg-[#86d8dc] text-[#3a276a] hover:bg-[#76c8cc]"
                    : "text-white hover:bg-[#4a377a] border border-[#4a377a]"
                }`}
              >
                New Period
              </Button>
              <Button
                variant="ghost"
                onClick={() => setIsNewPeriod(false)}
                className={`flex-1 ${
                  !isNewPeriod
                    ? "bg-[#86d8dc] text-[#3a276a] hover:bg-[#76c8cc]"
                    : "text-white hover:bg-[#4a377a] border border-[#4a377a]"
                }`}
              >
                Update Last
              </Button>
            </div>

            <Label className="text-white text-sm">
              {isNewPeriod ? "When did your period start?" : "Update last period start date"}
            </Label>
            <div className="relative">
              <div
                onClick={handleDateClick}
                className="w-full px-4 py-3 rounded-xl bg-[#4a377a] text-white border border-[#5a477a] focus:border-[#86d8dc] hover:border-[#86d8dc] cursor-pointer transition-colors flex items-center justify-between"
              >
                <span>
                  {selectedDate.toLocaleDateString("en-US", {
                    month: "long",
                    day: "numeric",
                    year: "numeric",
                  })}
                </span>
                <CalendarIcon className="h-5 w-5 text-[#86d8dc]" />
              </div>
              {isDatePickerOpen && (
                <div className="absolute top-full left-0 w-full mt-2 bg-[#4a377a] rounded-xl p-4 border border-[#5a477a] shadow-lg z-50">
                  <input
                    type="date"
                    className="w-full px-4 py-3 rounded-xl bg-white text-[#3a276a] border border-[#5a477a] focus:border-[#86d8dc] focus:outline-none"
                    value={selectedDate.toISOString().split('T')[0]}
                    onChange={(e) => {
                      setSelectedDate(new Date(e.target.value));
                      setIsDatePickerOpen(false);
                    }}
                    max={new Date().toISOString().split('T')[0]}
                  />
                </div>
              )}
            </div>
          </div>

          <div className="flex gap-3 mt-8">
            <Button
              variant="ghost"
              onClick={onClose}
              className="flex-1 text-white hover:bg-[#4a377a] border border-[#4a377a]"
            >
              Cancel
            </Button>
            <Button
              onClick={() => {
                onSave(selectedDate, isNewPeriod);
                onClose();
              }}
              className="flex-1 bg-[#86d8dc] text-[#3a276a] hover:bg-[#76c8cc] border-none"
            >
              Save
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export const HomeCycle = () => {
  const navigate = useNavigate();
  const [currentDate] = useState(new Date());
  const [periodData, setPeriodData] = useState<PeriodData | null>(null);
  const [nextPeriodDate, setNextPeriodDate] = useState<Date | null>(null);
  const [showPeriodInput, setShowPeriodInput] = useState(false);

  // Calculate next period whenever periodData changes
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

  // Fetch period data
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

  const cards = [
    {
      title: "Period Prediction",
      subtitle: "Next Period",
      date: nextPeriodDate
        ? nextPeriodDate.toLocaleDateString("en-US", {
            month: "long",
            day: "numeric",
          })
        : "Not calculated",
      description: periodData 
        ? `${Math.max(0, Math.ceil((nextPeriodDate?.getTime() || 0 - new Date().getTime()) / (1000 * 60 * 60 * 24)))} days until next period`
        : "Add your period to get predictions",
      icon: (
        <div className="bg-[#eef8f9] p-3 rounded-2xl">
          <HeartIcon className="w-8 h-8 text-[#86d8dc]" />
        </div>
      ),
      status: (
        <Button
          onClick={() => navigate("/period-cycle/calendar")}
          className="w-full bg-[#86d8dc] text-[#3a276a] hover:bg-[#76c8cc] rounded-[18px] h-[45px] text-base flex items-center justify-center gap-2"
        >
          <CalendarIcon className="w-5 h-5" />
          View Calendar
        </Button>
      ),
    },
    {
      title: "Add Period",
      subtitle: "Track your cycle",
      date: periodData 
        ? new Date(periodData.period_start_date).toLocaleDateString("en-US", {
            month: "long",
            day: "numeric",
          })
        : "No periods recorded",
      description: "Keep your cycle up to date",
      icon: (
        <div className="bg-[#eef8f9] p-3 rounded-2xl">
          <PlusIcon className="w-8 h-8 text-[#86d8dc]" />
        </div>
      ),
      status: periodData ? "Update Period" : "Add First Period",
      onClick: () => setShowPeriodInput(true),
    },
  ];

  return (
    <div className="w-full min-h-screen flex items-center justify-center bg-white">
      <div className="w-full h-screen max-w-[430px] bg-[#f6f6f6] rounded-[40px] overflow-hidden relative">
        {/* Header */}
        <header className="flex items-center justify-between px-7 mt-4">
          <div className="flex items-center gap-3.5">
            <h1 className="font-bold text-[22px] text-[#3a276a]">
              {currentDate.toLocaleDateString("en-US", { weekday: "long" })}
            </h1>
            <span className="text-xl">
              {currentDate.toLocaleDateString("en-US", {
                day: "numeric",
                month: "long",
                year: "numeric",
              })}
            </span>
          </div>
          <div className="flex items-center gap-2">
            <button
              className="text-[#3a276a] cursor-pointer"
              onClick={() => navigate(-1)}
            >
              ←
            </button>
            <button
              className="text-[#3a276a] cursor-pointer"
              onClick={() => navigate(1)}
            >
              →
            </button>
            <PlusIcon
              className="w-[30px] h-[30px] cursor-pointer"
              onClick={() => setShowPeriodInput(true)}
            />
          </div>
        </header>

        <PeriodInputDialog
          isOpen={showPeriodInput}
          onClose={() => setShowPeriodInput(false)}
          lastPeriod={periodData ? new Date(periodData.period_start_date) : null}
          onSave={async (date, isNewPeriod) => {
            try {
              const { data: { user } } = await supabase.auth.getUser();
              if (!user) {
                console.error('No user found');
                return;
              }

              const periodData = {
                user_id: user.id,
                period_start_date: date.toISOString(),
                period_length: 5,
                cycle_length: 28,
              };

              if (isNewPeriod) {
                // Insert new period
                const { error } = await supabase
                  .from('period_tracking')
                  .insert(periodData);

                if (error) {
                  console.error('Error saving new period data:', error);
                  return;
                }
              } else {
                // Update last period
                const { error } = await supabase
                  .from('period_tracking')
                  .update(periodData)
                  .eq('user_id', user.id)
                  .order('period_start_date', { ascending: false })
                  .limit(1);

                if (error) {
                  console.error('Error updating last period:', error);
                  return;
                }
              }

              // Refresh the period data
              const { data, error } = await supabase
                .from('period_tracking')
                .select('*')
                .eq('user_id', user.id)
                .order('period_start_date', { ascending: false })
                .limit(1);

              if (error) {
                console.error('Error fetching updated period data:', error);
                return;
              }

              if (data && data.length > 0) {
                setPeriodData(data[0]);
              }
            } catch (error) {
              console.error('Error saving period:', error);
            }
          }}
        />

        {/* Datum-Scroll */}
        <div className="mt-6 bg-[#3a276a] w-full">
          <div className="flex items-center justify-between px-4 py-2">
            <button
              className="text-white cursor-pointer"
              onClick={() => navigate(-1)}
            >
              ←
            </button>
            <span className="text-white">
              {currentDate.toLocaleDateString('en-US', { month: 'long', year: 'numeric' })}
            </span>
            <button
              className="text-white cursor-pointer"
              onClick={() => navigate(1)}
            >
              →
            </button>
          </div>
          <div className="w-full overflow-x-auto scrollbar-thin scrollbar-thumb-white scrollbar-track-transparent">
            <div
              className="flex items-center px-5 py-2.5 gap-5 min-w-max"
              style={{
                overflowX: 'auto',
                WebkitOverflowScrolling: 'touch',
                scrollBehavior: 'smooth'
              }}
            >
              {generateMonthDates(currentDate).map((num) => (
                <span
                  key={num}
                  className={`text-xl ${num === String(currentDate.getDate()).padStart(2, "0")
                    ? "bg-white rounded-[18px] w-9 h-9 flex items-center justify-center"
                    : "text-white"
                    } cursor-pointer flex-shrink-0`}
                >
                  {num}
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* Legende */}
        <div className="flex gap-6 mt-4 px-6 justify-center">
          <div className="flex items-center gap-2">
            <Badge
              variant="secondary"
              className="w-2.5 h-2.5 rounded-full bg-[#3a276a]"
            />
            <span className="text-[15px] font-medium">Current Date</span>
          </div>
          <div className="flex items-center gap-2">
            <Badge
              variant="secondary"
              className="w-2.5 h-2.5 rounded-full bg-[#c8f0f0]"
            />
            <span className="text-[15px] font-medium">Period Duration</span>
          </div>
        </div>

        {/* Karten */}
        <div className="mt-4">
          <div className="flex flex-col gap-4 px-4">
            {cards.map((card, index) => (
              <div
                key={index}
                className="w-full bg-neutral-50 border-[1.5px] border-black shadow-[0px_2px_9px_#00000030] rounded-[20px] cursor-pointer"
                onClick={() => {
                  if (card.onClick) {
                    card.onClick();
                  }
                }}
              >
                <div className="flex justify-between p-4">
                  <div className="flex flex-col gap-4">
                    <div className="flex flex-col">
                      <div className="flex items-center gap-2">
                        <span className="text-xl">{card.title}</span>
                      </div>
                      {card.date && (
                        <span className="text-[15px] bg-gradient-to-b from-[#feac5e] via-[#c779d0] to-[#4bc0c8] bg-clip-text text-transparent">
                          {card.date}
                        </span>
                      )}
                    </div>
                    <span className="text-[15px] text-[#3a276a]">
                      {card.description}
                    </span>
                  </div>
                  <div className="flex flex-col items-center gap-2">
                    {card.icon}
                    <span className="text-[15px] text-[#86d8dc]">
                      {card.status}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};