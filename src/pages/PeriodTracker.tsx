"use client";

import React, { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";
import { useNavigate } from "react-router-dom";
import {
    ArrowLeftCircleIcon,
    MoreHorizontalIcon,
    PlusCircleIcon,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import {
    Dialog,
    DialogTrigger,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogDescription,
    DialogFooter,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";

interface PeriodEntry {
    id: string;
    user_id: string;
    period_start: string | null;
    period_end: string | null;
    period_notes: string | null;
    created_at: string;
}

export const PeriodTracker = (): JSX.Element => {
    const navigate = useNavigate();
    const [user, setUser] = useState<any>(null);
    const [openDialog, setOpenDialog] = useState<boolean>(false);
    const [periodData, setPeriodData] = useState({
        startDate: "",
        endDate: "",
        notes: "",
    });
    const [periodHistory, setPeriodHistory] = useState<PeriodEntry[]>([]);

    useEffect(() => {
        const fetchUser = async () => {
            try {
                const {
                    data: { user },
                    error,
                } = await supabase.auth.getUser();
                if (error) {
                    console.error("Error fetching user:", error);
                    navigate("/login");
                    return;
                }
                if (!user) {
                    navigate("/login");
                    return;
                }
                setUser(user);
            } catch (err) {
                console.error("Unknown error fetching user:", err);
                navigate("/login");
            }
        };
        fetchUser();
    }, [navigate]);

    useEffect(() => {
        const fetchPeriods = async () => {
            if (!user?.id) return;
            const { data, error } = await supabase
                .from("user_activities")
                .select("id, user_id, period_start, period_end, period_notes, created_at")
                .eq("user_id", user.id)
                .not("period_start", "is", null)
                .order("period_start", { ascending: false });
            if (!error && data) {
                setPeriodHistory(data as PeriodEntry[]);
            } else if (error) {
                console.error("Error fetching period data:", error);
            }
        };
        fetchPeriods();
    }, [user]);

    const handleAddPeriod = async () => {
        if (!user?.id) return;
        if (!periodData.startDate) return;

        const { data, error } = await supabase
            .from("user_activities")
            .insert({
                user_id: user.id,
                period_start: periodData.startDate,
                period_end: periodData.endDate || null,
                period_notes: periodData.notes || "",
            })
            .select();

        if (error) {
            console.error("Error inserting period data:", error);
            return;
        }

        if (data) {
            setPeriodHistory((prev) => [data[0], ...prev]);
            setOpenDialog(false);
            setPeriodData({ startDate: "", endDate: "", notes: "" });
        }
    };

    if (!user) {
        return <></>;
    }

    return (
        <div className="bg-white flex justify-center w-full min-h-screen">
            <div className="w-[375px] relative p-8">
                <header className="flex justify-between items-center mb-8">
                    <Button
                        variant="ghost"
                        size="icon"
                        className="bg-[#f7f8f8] rounded-lg"
                        onClick={() => navigate(-1)}
                    >
                        <ArrowLeftCircleIcon className="h-4 w-4" />
                    </Button>
                    <h1 className="font-bold text-base">Period Tracker</h1>
                    <Button
                        variant="ghost"
                        size="icon"
                        className="bg-[#f7f8f8] rounded-lg"
                    >
                        <MoreHorizontalIcon className="h-4 w-4" />
                    </Button>
                </header>

                <Card className="bg-gradient-to-b from-[#92A3FD] to-[#9DCEFF] mb-8">
                    <CardContent className="p-5">
                        <div className="flex justify-between items-center mb-4">
                            <h2 className="font-semibold text-sm text-black-color">Track Period</h2>
                            <Dialog open={openDialog} onOpenChange={setOpenDialog}>
                                <DialogTrigger asChild>
                                    <Button
                                        size="icon"
                                        variant="ghost"
                                        className="h-6 w-6 bg-white rounded-lg"
                                    >
                                        <PlusCircleIcon className="h-3.5 w-3.5" />
                                    </Button>
                                </DialogTrigger>
                                <DialogContent className="p-6 rounded-lg bg-white">
                                    <DialogHeader>
                                        <DialogTitle>Neue Periodendaten</DialogTitle>
                                        <DialogDescription>
                                            Bitte Start- und Enddatum (optional) angeben.
                                        </DialogDescription>
                                    </DialogHeader>
                                    <div className="space-y-4 mt-4">
                                        <div>
                                            <label className="text-sm font-medium text-gray-700">
                                                Startdatum
                                            </label>
                                            <Input
                                                type="date"
                                                value={periodData.startDate}
                                                onChange={(e) =>
                                                    setPeriodData({
                                                        ...periodData,
                                                        startDate: e.target.value,
                                                    })
                                                }
                                            />
                                        </div>
                                        <div>
                                            <label className="text-sm font-medium text-gray-700">
                                                Enddatum
                                            </label>
                                            <Input
                                                type="date"
                                                value={periodData.endDate}
                                                onChange={(e) =>
                                                    setPeriodData({
                                                        ...periodData,
                                                        endDate: e.target.value,
                                                    })
                                                }
                                            />
                                        </div>
                                        <div>
                                            <label className="text-sm font-medium text-gray-700">
                                                Notizen
                                            </label>
                                            <Input
                                                type="text"
                                                value={periodData.notes}
                                                onChange={(e) =>
                                                    setPeriodData({
                                                        ...periodData,
                                                        notes: e.target.value,
                                                    })
                                                }
                                                placeholder="optional"
                                            />
                                        </div>
                                    </div>
                                    <DialogFooter className="mt-6">
                                        <Button
                                            variant="default"
                                            onClick={handleAddPeriod}
                                            className="bg-[#92A3FD] hover:bg-[#9DCEFF] text-white"
                                        >
                                            Speichern
                                        </Button>
                                    </DialogFooter>
                                </DialogContent>
                            </Dialog>
                        </div>

                        <div className="bg-white p-4 rounded-lg">
                            <p className="text-sm font-medium text-[#92A3FD] mb-2">
                                Letztes Startdatum:
                            </p>
                            {periodHistory.length > 0 ? (
                                <p className="text-sm">
                                    {periodHistory[0].period_start}
                                    {periodHistory[0].period_end &&
                                        ` - ${periodHistory[0].period_end}`}
                                </p>
                            ) : (
                                <p className="text-xs text-gray-500">
                                    Noch keine Periodendaten hinzugefügt
                                </p>
                            )}
                        </div>
                    </CardContent>
                </Card>

                <Card className="mb-8">
                    <CardHeader className="flex flex-row items-center justify-between p-5">
                        <h2 className="font-semibold text-base">Deine Historie</h2>
                    </CardHeader>
                    <CardContent className="p-5 space-y-4">
                        {periodHistory.length === 0 && (
                            <div className="text-sm text-gray-500">
                                Keine Einträge vorhanden
                            </div>
                        )}
                        {periodHistory.map((entry) => (
                            <div
                                key={entry.id}
                                className="flex items-center justify-between bg-[#f7f8f8] p-3 rounded-lg"
                            >
                                <div className="flex flex-col text-sm">
                                    <span className="font-medium">
                                        {entry.period_start}
                                        {entry.period_end && ` - ${entry.period_end}`}
                                    </span>
                                    {entry.period_notes && (
                                        <span className="text-xs text-gray-600 mt-1">
                                            Notizen: {entry.period_notes}
                                        </span>
                                    )}
                                </div>
                            </div>
                        ))}
                    </CardContent>
                </Card>
            </div>
        </div>
    );
};
