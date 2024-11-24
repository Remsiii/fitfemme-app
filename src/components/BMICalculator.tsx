import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { ArrowLeftIcon } from "lucide-react";
import { useNavigate } from "react-router-dom";

interface BMICalculatorProps {
  onBMICalculated: (bmiValue: number) => void;
  onClose: () => void;
  initialBMI?: number;
}

export const BMICalculator = ({ onBMICalculated, onClose, initialBMI }: BMICalculatorProps): JSX.Element => {
  const [weight, setWeight] = useState<string>("");
  const [height, setHeight] = useState<string>("");
  const [age, setAge] = useState<string>("");

  useEffect(() => {
    const savedWeight = localStorage.getItem('lastWeight');
    const savedHeight = localStorage.getItem('lastHeight');
    const savedAge = localStorage.getItem('lastAge');

    if (savedWeight) setWeight(savedWeight);
    if (savedHeight) setHeight(savedHeight);
    if (savedAge) setAge(savedAge);
  }, []);

  const calculateBMI = () => {
    const weightNum = parseFloat(weight);
    const heightNum = parseFloat(height) / 100;
    
    if (weightNum > 0 && heightNum > 0) {
      localStorage.setItem('lastWeight', weight);
      localStorage.setItem('lastHeight', height);
      localStorage.setItem('lastAge', age);

      const bmiValue = weightNum / (heightNum * heightNum);
      const roundedBMI = parseFloat(bmiValue.toFixed(1));
      onBMICalculated(roundedBMI);
      onClose();
    }
  };

  return (
    <Card className="bg-white">
      <CardContent className="p-6 space-y-4">
        <div className="flex justify-between items-center">
          <h2 className="text-xl font-semibold">Calculator IMC</h2>
          <Button variant="ghost" size="sm" onClick={onClose}>×</Button>
        </div>

        <div className="space-y-2">
          <label className="text-sm text-gray-600">Greutate (kg)</label>
          <Input
            type="number"
            placeholder="Introduceți greutatea"
            value={weight}
            onChange={(e) => setWeight(e.target.value)}
            className="w-full"
          />
        </div>

        <div className="space-y-2">
          <label className="text-sm text-gray-600">Înălțime (cm)</label>
          <Input
            type="number"
            placeholder="Introduceți înălțimea"
            value={height}
            onChange={(e) => setHeight(e.target.value)}
            className="w-full"
          />
        </div>

        <div className="space-y-2">
          <label className="text-sm text-gray-600">Vârstă</label>
          <Input
            type="number"
            placeholder="Introduceți vârsta"
            value={age}
            onChange={(e) => setAge(e.target.value)}
            className="w-full"
          />
        </div>

        <Button 
          className="w-full bg-gradient-to-b from-[#92A3FD] to-[#9DCEFF] hover:opacity-90"
          onClick={calculateBMI}
        >
          Calculează IMC
        </Button>
      </CardContent>
    </Card>
  );
}; 