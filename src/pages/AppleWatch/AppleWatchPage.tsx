import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { ArrowLeft, Heart, Activity, Watch } from "lucide-react";
import { useNavigate, useLocation } from "react-router-dom";

export function AppleWatchPage() {
    const navigate = useNavigate();
    const location = useLocation();

    const handleBack = () => {
        const from = location.state?.from || '/';
        navigate(from);
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
                <h1 className="text-2xl font-bold">Apple Watch Übersicht</h1>
            </div>

            <div className="grid gap-6 md:grid-cols-2">
                {/* Heart Rate Card */}
                <Card className="md:col-span-2">
                    <CardHeader>
                        <CardTitle className="flex items-center gap-2">
                            <Heart className="w-5 h-5 text-[#92A3FD]" />
                            Herzfrequenz
                        </CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="flex justify-center items-center h-40">
                            <div className="text-center">
                                <p className="text-5xl font-bold text-[#92A3FD]">72</p>
                                <p className="text-sm text-gray-500">BPM</p>
                            </div>
                        </div>
                    </CardContent>
                </Card>

                {/* Activity Card */}
                <Card>
                    <CardHeader>
                        <CardTitle className="flex items-center gap-2">
                            <Activity className="w-5 h-5 text-[#92A3FD]" />
                            Aktivität
                        </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                        <div className="space-y-2">
                            <div className="flex justify-between text-sm">
                                <span>Bewegung</span>
                                <span>250/300 kcal</span>
                            </div>
                            <Progress value={83} className="h-2" />
                        </div>
                        <div className="space-y-2">
                            <div className="flex justify-between text-sm">
                                <span>Training</span>
                                <span>25/30 min</span>
                            </div>
                            <Progress value={83} className="h-2" />
                        </div>
                        <div className="space-y-2">
                            <div className="flex justify-between text-sm">
                                <span>Stehen</span>
                                <span>10/12 h</span>
                            </div>
                            <Progress value={83} className="h-2" />
                        </div>
                    </CardContent>
                </Card>

                {/* Workout Summary Card */}
                <Card>
                    <CardHeader>
                        <CardTitle className="flex items-center gap-2">
                            <Watch className="w-5 h-5 text-[#92A3FD]" />
                            Trainings heute
                        </CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="space-y-4">
                            <div className="p-4 bg-[#92A3FD]/10 rounded-lg">
                                <p className="text-sm text-gray-500">Morgenspaziergang</p>
                                <p className="font-semibold">30 Minuten • 2.5 km</p>
                            </div>
                            <div className="p-4 bg-[#92A3FD]/10 rounded-lg">
                                <p className="text-sm text-gray-500">Yoga</p>
                                <p className="font-semibold">45 Minuten • 120 kcal</p>
                            </div>
                        </div>
                    </CardContent>
                </Card>
            </div>
        </div>
    );
}
