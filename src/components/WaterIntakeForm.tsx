import { useState } from "react";
import { Button } from "./ui/button";
import { Card, CardContent } from "./ui/card";
import { Input } from "./ui/input";

interface WaterIntakeFormProps {
  onAddWaterIntake: (time: string, amount: number) => void;
  onClose: () => void;
}

export const WaterIntakeForm = ({ onAddWaterIntake, onClose }: WaterIntakeFormProps): JSX.Element => {
  const [amount, setAmount] = useState<string>("");
  const [time, setTime] = useState<string>("");

  const handleSubmit = () => {
    if (amount && time) {
      onAddWaterIntake(time, parseInt(amount));
      onClose();
    }
  };

  return (
    <Card className="bg-white">
      <CardContent className="p-6 space-y-4">
        <h2 className="text-xl font-semibold">Adaugă consum de apă</h2>
        
        <div className="space-y-2">
          <label className="text-sm text-gray-600">Cantitate (ml)</label>
          <Input
            type="number"
            placeholder="Introduceți cantitatea"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            className="w-full"
          />
        </div>

        <div className="space-y-2">
          <label className="text-sm text-gray-600">Ora</label>
          <Input
            type="time"
            value={time}
            onChange={(e) => setTime(e.target.value)}
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
            Adaugă
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}; 