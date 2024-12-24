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
import {
    Select,
    SelectTrigger,
    SelectValue,
    SelectContent,
    SelectItem,
} from "@/components/ui/select";

const weeklyProgress = [
    { day: "Sun", height: "39px", color: "blue" },
    { day: "Mon", height: "98px", color: "purple" },
    { day: "Tue", height: "64px", color: "blue" },
    { day: "Wed", height: "85px", color: "purple" },
    { day: "Thu", height: "108px", color: "blue" },
    { day: "Fri", height: "39px", color: "purple" },
    { day: "Sat", height: "87px", color: "blue" },
];

const latestActivities = [
    {
        id: 1,
        title: "Drinking 300ml Water",
        time: "About 3 minutes ago",
        gradient: "from-[#92A3FD] to-[#9DCEFF]",
    },
    {
        id: 2,
        title: "Eat Snack (Fitbar)",
        time: "About 10 minutes ago",
        gradient: "from-[#C58BF2] to-[#EEA4CE]",
    },
];

export const WaterIntake = (): JSX.Element => {
    const navigate = useNavigate();
    const [user, setUser] = useState<any>(null);
    const [waterIntake, setWaterIntake] = useState<number>(0);
    const [openDialog, setOpenDialog] = useState<boolean>(false);
    const [selectedAmount, setSelectedAmount] = useState<number>(0);

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
        const fetchUserActivities = async () => {
            if (!user?.id) return;
            const today = new Date().toISOString().split("T")[0];
            const { data, error } = await supabase
                .from("user_activities")
                .select("water_intake_ml")
                .eq("user_id", user.id)
                .eq("activity_date", today);

            if (error) {
                console.error("Error fetching activities:", error);
                return;
            }
            if (data) {
                const total = data.reduce(
                    (acc: number, curr: { water_intake_ml: number }) =>
                        acc + curr.water_intake_ml,
                    0
                );
                setWaterIntake(total);
            }
        };
        fetchUserActivities();
    }, [user]);

    const handleAddWater = async () => {
        if (!user?.id) return;
        const today = new Date().toISOString().split("T")[0];
        const { data, error } = await supabase
            .from("user_activities")
            .insert({
                user_id: user.id,
                water_intake_ml: selectedAmount,
                activity_date: today,
            })
            .select();

        if (error) {
            console.error("Error inserting water intake:", error);
            return;
        }
        if (data) {
            setWaterIntake((prev) => prev + selectedAmount);
            setOpenDialog(false);
            setSelectedAmount(0);
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
                    <h1 className="font-bold text-base">Activity Tracker</h1>
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
                            <h2 className="font-semibold text-sm text-black-color">
                                Today Target
                            </h2>
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
                                        <DialogTitle>Wassermenge hinzufügen</DialogTitle>
                                        <DialogDescription>Milliliter auswählen</DialogDescription>
                                    </DialogHeader>
                                    <div className="space-y-3 mt-4">
                                        <Select
                                            value={selectedAmount.toString()}
                                            onValueChange={(v) => setSelectedAmount(parseInt(v))}
                                        >
                                            <SelectTrigger className="w-full">
                                                <SelectValue placeholder="Auswählen" />
                                            </SelectTrigger>
                                            <SelectContent>
                                                <SelectItem value="100">100 ml</SelectItem>
                                                <SelectItem value="200">200 ml</SelectItem>
                                                <SelectItem value="300">300 ml</SelectItem>
                                                <SelectItem value="400">400 ml</SelectItem>
                                                <SelectItem value="500">500 ml</SelectItem>
                                            </SelectContent>
                                        </Select>
                                    </div>
                                    <DialogFooter className="mt-6">
                                        <Button
                                            variant="default"
                                            onClick={handleAddWater}
                                            className="bg-[#92A3FD] hover:bg-[#9DCEFF] text-white"
                                        >
                                            Hinzufügen
                                        </Button>
                                    </DialogFooter>
                                </DialogContent>
                            </Dialog>
                        </div>
                        <div className="flex gap-4">
                            <Card className="flex-1 bg-white">
                                <CardContent className="p-2.5 flex items-center">
                                    <div>
                                        <p className="text-sm font-medium text-[#92A3FD]">
                                            {waterIntake} ml
                                        </p>
                                        <p className="text-xs text-gray-1">Water Intake</p>
                                    </div>
                                </CardContent>
                            </Card>
                            <Card className="flex-1 bg-white">
                                <CardContent className="p-2.5 flex items-center">
                                    <div>
                                        <p className="text-sm font-medium text-[#92A3FD]">2400</p>
                                        <p className="text-xs text-gray-1">Foot Steps</p>
                                    </div>
                                </CardContent>
                            </Card>
                        </div>
                    </CardContent>
                </Card>

                <Card className="mb-8">
                    <CardHeader className="flex flex-row items-center justify-between p-5">
                        <h2 className="font-semibold text-base">Activity Progress</h2>
                        <Button
                            variant="default"
                            size="sm"
                            className="bg-gradient-to-b from-[#92A3FD] to-[#9DCEFF] text-white rounded-full h-[30px]"
                        >
                            Weekly
                        </Button>
                    </CardHeader>
                    <CardContent className="p-5">
                        <div className="flex justify-between h-[135px]">
                            {weeklyProgress.map((item, index) => (
                                <div key={index} className="flex flex-col items-center">
                                    <div className="w-[22px] h-full bg-[#f7f8f8] rounded-[20px] relative">
                                        <div
                                            className={`absolute bottom-0 w-full rounded-[20px] bg-gradient-to-b ${item.color === "blue"
                                                ? "from-[#92A3FD] to-[#9DCEFF]"
                                                : "from-[#C58BF2] to-[#EEA4CE]"
                                                }`}
                                            style={{ height: item.height }}
                                        />
                                    </div>
                                    <span className="mt-2 text-xs text-gray-1">{item.day}</span>
                                </div>
                            ))}
                        </div>
                    </CardContent>
                </Card>

                <div>
                    <div className="flex justify-between items-center mb-4">
                        <h2 className="font-semibold text-base">Latest Activity</h2>
                        <Button variant="ghost" className="text-xs text-[#aca3a5]">
                            See more
                        </Button>
                    </div>
                    {latestActivities.map((activity) => (
                        <Card key={activity.id} className="mb-4">
                            <CardContent className="p-4 flex items-center">
                                <div
                                    className={`w-[50px] h-[50px] rounded-full bg-gradient-to-b ${activity.gradient} mr-4`}
                                />
                                <div className="flex-1">
                                    <p className="text-sm font-medium">{activity.title}</p>
                                    <p className="text-xs text-gray-2">{activity.time}</p>
                                </div>
                                <Button variant="ghost" size="icon">
                                    <MoreHorizontalIcon className="h-3.5 w-3.5" />
                                </Button>
                            </CardContent>
                        </Card>
                    ))}
                </div>
            </div>
        </div>
    );
};
