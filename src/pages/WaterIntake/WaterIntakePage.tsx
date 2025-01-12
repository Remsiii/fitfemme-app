import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Droplets, Plus, Minus, ArrowLeft } from "lucide-react";
import { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";

export function WaterIntakePage() {
    const [waterIntake, setWaterIntake] = useState(0);
    const dailyGoal = 2000; // ml
    const progress = (waterIntake / dailyGoal) * 100;
    const navigate = useNavigate();
    const location = useLocation();

    const handleBack = () => {
        const from = location.state?.from || '/';
        navigate(from);
    };

    const addWater = (amount: number) => {
        setWaterIntake(prev => Math.min(dailyGoal, Math.max(0, prev + amount)));
    };

    return (
        <div className="container mx-auto p-4 space-y-6">
            <div className="flex items-center gap-4">
                <button 
                    onClick={handleBack}
                    className="p-2 hover:bg-gray-100 rounded-full transition-colors"
                >
                    <ArrowLeft className="w-6 h-6" />
                </button>
                <h1 className="text-2xl font-bold">Wasseraufnahme</h1>
            </div>

            <div className="grid gap-6 md:grid-cols-2">
                {/* Main Water Tracking Card */}
                <Card className="md:col-span-2">
                    <CardHeader>
                        <CardTitle className="flex items-center gap-2">
                            <Droplets className="w-5 h-5 text-[#92A3FD]" />
                            Tägliche Wasseraufnahme
                        </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-6">
                        <div className="flex justify-center">
                            <div className="text-center">
                                <p className="text-4xl font-bold text-[#92A3FD]">{waterIntake}ml</p>
                                <p className="text-sm text-gray-500">von {dailyGoal}ml</p>
                            </div>
                        </div>

                        <Progress value={progress} className="h-3" />

                        <div className="flex justify-center gap-4">
                            <Button
                                variant="outline"
                                size="icon"
                                onClick={() => addWater(-250)}
                                className="h-12 w-12"
                            >
                                <Minus className="h-6 w-6" />
                            </Button>
                            <Button
                                onClick={() => addWater(250)}
                                className="h-12 w-24 bg-gradient-to-r from-[#92A3FD] to-[#9DCEFF]"
                            >
                                + 250ml
                            </Button>
                        </div>
                    </CardContent>
                </Card>

                {/* Statistics Card */}
                <Card>
                    <CardHeader>
                        <CardTitle>Statistik</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                        <div className="grid gap-4">
                            <div className="p-4 bg-[#92A3FD]/10 rounded-lg">
                                <p className="text-sm text-gray-500">Wochendurchschnitt</p>
                                <p className="text-lg font-semibold">1850ml</p>
                            </div>
                            <div className="p-4 bg-[#92A3FD]/10 rounded-lg">
                                <p className="text-sm text-gray-500">Beste Woche</p>
                                <p className="text-lg font-semibold">2100ml/Tag</p>
                            </div>
                        </div>
                    </CardContent>
                </Card>

                {/* Tips Card */}
                <Card>
                    <CardHeader>
                        <CardTitle>Tipps</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <ul className="space-y-2 text-sm">
                            <li className="flex items-center gap-2">
                                <Droplets className="w-4 h-4 text-[#92A3FD]" />
                                Trinke ein Glas Wasser direkt nach dem Aufwachen
                            </li>
                            <li className="flex items-center gap-2">
                                <Droplets className="w-4 h-4 text-[#92A3FD]" />
                                Stelle eine Wasserflasche auf deinen Schreibtisch
                            </li>
                            <li className="flex items-center gap-2">
                                <Droplets className="w-4 h-4 text-[#92A3FD]" />
                                Setze dir Erinnerungen auf deinem Handy
                            </li>
                        </ul>
                    </CardContent>
                </Card>
            </div>
        </div>
    );
}
