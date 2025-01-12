import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useState, useEffect } from "react";
import { ArrowLeft, Plus, Scale, TrendingDown, TrendingUp, CalendarDays } from "lucide-react";
import { useNavigate, useLocation } from "react-router-dom";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { supabase } from "@/lib/supabase";
import dayjs from 'dayjs';
import 'dayjs/locale/de';

// Set German locale
dayjs.locale('de');

interface WeightEntry {
    id: string;
    weight: number;
    date: string;
    note?: string;
    user_id: string;
}

export function WeightTrackerPage() {
    const [entries, setEntries] = useState<WeightEntry[]>([]);
    const [newWeight, setNewWeight] = useState('');
    const [note, setNote] = useState('');
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();
    const location = useLocation();

    const handleBack = () => {
        const from = location.state?.from || '/';
        navigate(from);
    };

    useEffect(() => {
        fetchWeightEntries();
    }, []);

    const fetchWeightEntries = async () => {
        try {
            // Get current user
            const { data: { user } } = await supabase.auth.getUser();
            if (!user) throw new Error('Not authenticated');

            const { data, error } = await supabase
                .from('weight_entries')
                .select('*')
                .eq('user_id', user.id)
                .order('date', { ascending: true });

            if (error) throw error;
            setEntries(data || []);
        } catch (error) {
            console.error('Error fetching weight entries:', error);
        }
    };

    const addWeightEntry = async () => {
        if (!newWeight) return;

        setLoading(true);
        try {
            // Get current user
            const { data: { user } } = await supabase.auth.getUser();
            if (!user) throw new Error('Not authenticated');

            const { error } = await supabase
                .from('weight_entries')
                .insert([
                    {
                        user_id: user.id,
                        weight: parseFloat(newWeight),
                        note: note || null,
                    }
                ]);

            if (error) throw error;

            setNewWeight('');
            setNote('');
            fetchWeightEntries();
        } catch (error) {
            console.error('Error adding weight entry:', error);
        } finally {
            setLoading(false);
        }
    };

    const getWeightChange = () => {
        if (entries.length < 2) return null;
        const firstWeight = entries[0].weight;
        const lastWeight = entries[entries.length - 1].weight;
        return (lastWeight - firstWeight).toFixed(1);
    };

    const weightChange = getWeightChange();
    const chartData = entries.map(entry => ({
        date: dayjs(entry.date).format('DD.MM'),
        weight: entry.weight
    }));

    return (
        <div className="container mx-auto p-4 space-y-6">
            <div className="flex items-center gap-4">
                <button 
                    onClick={handleBack}
                    className="p-2 hover:bg-gray-100 rounded-full transition-colors"
                >
                    <ArrowLeft className="w-6 h-6" />
                </button>
                <h1 className="text-2xl font-bold">Gewichtstracker</h1>
            </div>

            <div className="grid gap-6 md:grid-cols-2">
                {/* Weight Input Card */}
                <Card className="bg-white shadow-lg border-none">
                    <CardHeader>
                        <CardTitle className="flex items-center gap-2">
                            <Scale className="w-5 h-5 text-[#92A3FD]" />
                            Gewicht eintragen
                        </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                        <div className="flex gap-4">
                            <div className="flex-1">
                                <Input
                                    type="number"
                                    placeholder="Gewicht in kg"
                                    value={newWeight}
                                    onChange={(e) => setNewWeight(e.target.value)}
                                    className="text-lg"
                                    step="0.1"
                                />
                            </div>
                            <Button
                                onClick={addWeightEntry}
                                disabled={loading || !newWeight}
                                className="bg-gradient-to-r from-[#92A3FD] to-[#9DCEFF] hover:opacity-90"
                            >
                                <Plus className="w-5 h-5" />
                            </Button>
                        </div>
                        <Input
                            placeholder="Notiz (optional)"
                            value={note}
                            onChange={(e) => setNote(e.target.value)}
                        />
                    </CardContent>
                </Card>

                {/* Stats Card */}
                <Card className="bg-white shadow-lg border-none">
                    <CardHeader>
                        <CardTitle className="flex items-center gap-2">
                            {weightChange && parseFloat(weightChange) < 0 ? (
                                <TrendingDown className="w-5 h-5 text-green-500" />
                            ) : (
                                <TrendingUp className="w-5 h-5 text-[#92A3FD]" />
                            )}
                            Statistik
                        </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                        <div className="grid gap-4">
                            {entries.length > 0 && (
                                <div className="p-4 bg-[#92A3FD]/10 rounded-lg">
                                    <p className="text-sm text-gray-500">Aktuelles Gewicht</p>
                                    <p className="text-2xl font-bold text-[#92A3FD]">
                                        {entries[entries.length - 1].weight} kg
                                    </p>
                                </div>
                            )}
                            {weightChange && (
                                <div className="p-4 bg-[#92A3FD]/10 rounded-lg">
                                    <p className="text-sm text-gray-500">Gesamte Veränderung</p>
                                    <p className={`text-2xl font-bold ${parseFloat(weightChange) < 0 ? 'text-green-500' : 'text-[#92A3FD]'}`}>
                                        {weightChange} kg
                                    </p>
                                </div>
                            )}
                            {entries.length > 0 && (
                                <div className="p-4 bg-[#92A3FD]/10 rounded-lg">
                                    <p className="text-sm text-gray-500">Erster Eintrag</p>
                                    <p className="text-lg font-semibold">
                                        {dayjs(entries[0].date).format('DD. MMMM YYYY')}
                                    </p>
                                </div>
                            )}
                        </div>
                    </CardContent>
                </Card>

                {/* Graph Card */}
                <Card className="md:col-span-2 bg-white shadow-lg border-none">
                    <CardHeader>
                        <CardTitle className="flex items-center gap-2">
                            <CalendarDays className="w-5 h-5 text-[#92A3FD]" />
                            Gewichtsverlauf
                        </CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="h-[300px] w-full">
                            <ResponsiveContainer width="100%" height="100%">
                                <LineChart data={chartData} margin={{ top: 5, right: 20, bottom: 5, left: 0 }}>
                                    <CartesianGrid strokeDasharray="3 3" stroke="#E5E7EB" />
                                    <XAxis 
                                        dataKey="date" 
                                        stroke="#6B7280"
                                        tick={{ fontSize: 12 }}
                                    />
                                    <YAxis 
                                        stroke="#6B7280"
                                        tick={{ fontSize: 12 }}
                                        domain={['dataMin - 1', 'dataMax + 1']}
                                    />
                                    <Tooltip 
                                        contentStyle={{ 
                                            backgroundColor: 'white',
                                            border: 'none',
                                            borderRadius: '0.5rem',
                                            boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)'
                                        }}
                                        formatter={(value: number) => [`${value} kg`, 'Gewicht']}
                                        labelFormatter={(label) => `Datum: ${label}`}
                                    />
                                    <Line 
                                        type="monotone" 
                                        dataKey="weight" 
                                        stroke="#92A3FD"
                                        strokeWidth={2}
                                        dot={{ fill: '#92A3FD', strokeWidth: 2 }}
                                        activeDot={{ r: 6, fill: '#92A3FD' }}
                                    />
                                </LineChart>
                            </ResponsiveContainer>
                        </div>
                    </CardContent>
                </Card>

                {/* Recent Entries Card */}
                <Card className="md:col-span-2 bg-white shadow-lg border-none">
                    <CardHeader>
                        <CardTitle className="flex items-center gap-2">
                            <CalendarDays className="w-5 h-5 text-[#92A3FD]" />
                            Letzte Einträge
                        </CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="space-y-4">
                            {entries.slice().reverse().slice(0, 5).map((entry) => (
                                <div 
                                    key={entry.id}
                                    className="p-4 bg-[#92A3FD]/5 rounded-lg hover:bg-[#92A3FD]/10 transition-colors"
                                >
                                    <div className="flex justify-between items-center">
                                        <div>
                                            <p className="font-semibold">{entry.weight} kg</p>
                                            <p className="text-sm text-gray-500">
                                                {dayjs(entry.date).format('DD. MMMM YYYY')}
                                            </p>
                                        </div>
                                        {entry.note && (
                                            <p className="text-sm text-gray-600 max-w-[50%] text-right">
                                                {entry.note}
                                            </p>
                                        )}
                                    </div>
                                </div>
                            ))}
                        </div>
                    </CardContent>
                </Card>
            </div>
        </div>
    );
}
