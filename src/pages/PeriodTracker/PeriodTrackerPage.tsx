import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useState } from "react";
import { Calendar as CalendarIcon, Droplets, ArrowLeft } from "lucide-react";
import { useNavigate, useLocation } from "react-router-dom";
import { Calendar } from '@natscale/react-calendar';
import dayjs from 'dayjs';
import 'dayjs/locale/de';
import '@natscale/react-calendar/dist/main.css';
import './PeriodTracker.css';

// Set German locale
dayjs.locale('de');

export function PeriodTrackerPage() {
    const [date, setDate] = useState<Date>(new Date());
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
                <h1 className="text-2xl font-bold">Zyklus Tracker</h1>
            </div>

            <div className="grid gap-6 md:grid-cols-2">
                {/* Calendar Card */}
                <Card className="bg-white shadow-lg border-none">
                    <CardHeader>
                        <CardTitle className="flex items-center gap-2">
                            <CalendarIcon className="w-5 h-5 text-[#92A3FD]" />
                            Kalender
                        </CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="calendar-container">
                            <Calendar 
                                value={date}
                                onChange={setDate}
                                className="period-calendar"
                            />
                        </div>
                    </CardContent>
                </Card>

                {/* Cycle Information Card */}
                <Card className="bg-white shadow-lg border-none">
                    <CardHeader>
                        <CardTitle className="flex items-center gap-2">
                            <Droplets className="w-5 h-5 text-[#92A3FD]" />
                            Zyklusinfo
                        </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                        <div className="grid gap-4">
                            <div className="p-4 bg-[#92A3FD]/10 rounded-lg">
                                <p className="text-sm text-gray-500">Ausgewähltes Datum</p>
                                <p className="text-lg font-semibold">
                                    {dayjs(date).format('DD. MMMM YYYY')}
                                </p>
                            </div>
                            <div className="p-4 bg-[#92A3FD]/10 rounded-lg">
                                <p className="text-sm text-gray-500">Nächste Periode</p>
                                <p className="text-lg font-semibold">In 14 Tagen</p>
                            </div>
                            <div className="p-4 bg-[#92A3FD]/10 rounded-lg">
                                <p className="text-sm text-gray-500">Zykluslänge</p>
                                <p className="text-lg font-semibold">28 Tage</p>
                            </div>
                            <div className="p-4 bg-[#92A3FD]/10 rounded-lg">
                                <p className="text-sm text-gray-500">Aktuelle Phase</p>
                                <p className="text-lg font-semibold">Follikelphase</p>
                            </div>
                        </div>
                    </CardContent>
                </Card>
            </div>
        </div>
    );
}
