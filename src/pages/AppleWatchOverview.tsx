import React from 'react';
import { Card, CardContent } from "../components/ui/card";
import { Button } from "../components/ui/button";
import { 
  HeartIcon, 
  BedIcon, 
  FlameIcon, 
  FootprintsIcon, 
  ActivityIcon,
  TimerIcon,
  CalendarIcon,
  BatteryIcon
} from "lucide-react";
import { useTranslation } from 'react-i18next';

const AppleWatchOverview = () => {
  const { t } = useTranslation();
  
  const appleWatchData = {
    sleep: 7,
    calories: 500,
    heartRate: 72,
    steps: 10000,
    activityLevel: 'Moderate',
    standHours: 10,
    exerciseMinutes: 45,
    batteryLevel: 85
  };

  const renderMetricCard = (icon: React.ReactNode, title: string, value: string | number, unit: string) => (
    <Card className="mb-4">
      <CardContent className="flex items-center p-4">
        <div className="w-10 h-10 rounded-full bg-gradient-to-b from-[#92A3FD] to-[#9DCEFF] flex items-center justify-center text-white mr-4">
          {icon}
        </div>
        <div className="flex-1">
          <h3 className="text-gray-600 text-sm">{title}</h3>
          <p className="text-black font-semibold text-lg">
            {value} {unit}
          </p>
        </div>
      </CardContent>
    </Card>
  );

  return (
    <div className="bg-white p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Apple Watch</h1>
        <div className="flex items-center">
          <BatteryIcon className="mr-2" />
          <span>{appleWatchData.batteryLevel}%</span>
        </div>
      </div>

      <div className="space-y-4">
        {renderMetricCard(
          <HeartIcon className="w-6 h-6" />,
          t('Heart Rate'),
          appleWatchData.heartRate,
          'BPM'
        )}

        {renderMetricCard(
          <BedIcon className="w-6 h-6" />,
          t('Sleep'),
          appleWatchData.sleep,
          'hours'
        )}

        {renderMetricCard(
          <FlameIcon className="w-6 h-6" />,
          t('Calories'),
          appleWatchData.calories,
          'kcal'
        )}

        {renderMetricCard(
          <FootprintsIcon className="w-6 h-6" />,
          t('Steps'),
          appleWatchData.steps,
          'steps'
        )}

        {renderMetricCard(
          <ActivityIcon className="w-6 h-6" />,
          t('Activity Level'),
          appleWatchData.activityLevel,
          ''
        )}

        {renderMetricCard(
          <TimerIcon className="w-6 h-6" />,
          t('Exercise Time'),
          appleWatchData.exerciseMinutes,
          'min'
        )}

        {renderMetricCard(
          <CalendarIcon className="w-6 h-6" />,
          t('Stand Hours'),
          appleWatchData.standHours,
          'hours'
        )}
      </div>
    </div>
  );
};

export default AppleWatchOverview;