import { useState } from "react";
import { Button } from "./ui/button";
import { Card, CardContent } from "./ui/card";
import { Input } from "./ui/input";

interface WaterSettingsProps {
  currentGoal: number;
  onUpdateGoal: (goal: number) => void;
  onClose: () => void;
}

interface WaterSettingsProps {
  currentGoal: number;
  onUpdateGoal: (goal: number) => void;
  onClose: () => void;
}

export const WaterSettings = ({ currentGoal, onUpdateGoal, onClose }: WaterSettingsProps) => {
  const [goal, setGoal] = useState<string>((currentGoal / 1000).toString());

  const handleSubmit = () => {
    const goalInMl = parseFloat(goal) * 1000;
    if (goalInMl > 0) {
      onUpdateGoal(goalInMl);
      onClose();
    }
  };

  return (
    <Card className="bg-white">
      <CardContent className="p-6 space-y-4">
        <h2 className="text-xl font-semibold">Setări consum apă</h2>
        
        <div className="space-y-2">
          <label className="text-sm text-gray-600">Obiectiv zilnic (litri)</label>
          <Input
            type="number"
            step="0.1"
            placeholder="Introduceți cantitatea în litri"
            value={goal}
            onChange={(e) => setGoal(e.target.value)}
            className="w-full"
          />
        </div>

        <div className="flex gap-2">
          <Button
            variant="outline"
            onClick={onClose}
            className="flex-1"
          >
            Anulează
          </Button>
          <Button
            onClick={handleSubmit}
            className="flex-1 bg-gradient-to-b from-[#92A3FD] to-[#9DCEFF] hover:opacity-90"
          >
            Salvează
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}; 