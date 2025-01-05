"use client";

import React, { useEffect, useState } from "react";
import { supabaseAdmin } from "@/lib/supabaseAdmin";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardHeader, CardContent } from "@/components/ui/card";
import {
    Dialog,
    DialogTrigger,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogDescription,
    DialogFooter,
} from "@/components/ui/dialog";

import { Loader2Icon, PlusCircleIcon } from "lucide-react";

interface AdminWorkout {
    id: number;
    name: string;
    type: string;
    duration: number;
    difficulty: string;
    description: string | null;
    exercises_count: number;
    calories_burned: number;
    schedule_time: string | null;
}

interface AdminUser {
    id: string;
    email?: string;
    // Hier kannst du weitere Felder ergänzen, z. B. subscription_status, is_active, usw.
}

interface Exercise {
    id: number;
    name: string;
    duration?: string;
    reps?: string;
    image_url?: string;
    video_url?: string;
    set_number: number;
}

interface Workout {
    id: number;
    name: string;
    description: string;
    duration: number;
    difficulty: string;
    calories_burn: number;
    exercises: Exercise[];
}

export const AdminPage = () => {
    const navigate = useNavigate();
    const [isLoading, setIsLoading] = useState(true);
    const [users, setUsers] = useState<AdminUser[]>([]);
    const [workouts, setWorkouts] = useState<Workout[]>([]);
    const [openWorkoutDialog, setOpenWorkoutDialog] = useState(false);
    const [selectedWorkout, setSelectedWorkout] = useState<Workout | null>(null);
    const [isAddingExercise, setIsAddingExercise] = useState(false);
    const [newWorkout, setNewWorkout] = useState({
        name: "",
        type: "",
        duration: 0,
        difficulty: "",
        description: "",
        exercises_count: 0,
        calories_burned: 0,
        schedule_time: "",
    });

    const [newExercise, setNewExercise] = useState<Partial<Exercise>>({
        name: "",
        duration: "",
        reps: "",
        image_url: "",
        video_url: "",
        set_number: 1,
    });

    useEffect(() => {
        const checkAdmin = async () => {
            await supabaseAdmin.auth.updateUser({
                data: { is_super_admin: true }
            });

            // Falls du eine Admin-Prüfung hast, z. B. user.role === "admin"
            // oder user-Id checkst, kannst du das hier tun.
            const {
                data: { user },
            } = await supabaseAdmin.auth.getUser();

            if (!user) {
                // Falls kein User eingeloggt -> redirect
                navigate("/login");
                return;
            }

            // Hier könntest du das Admin-Recht prüfen, z. B. user.user_metadata?.is_admin
            // if (!user.user_metadata?.is_admin) {
            //   navigate("/");
            //   return;
            // }

            setIsLoading(false);
        };

        checkAdmin();
    }, [navigate]);

    useEffect(() => {
        if (!isLoading) {
            fetchUsers();
            fetchWorkouts();
        }
    }, [isLoading]);

    const fetchUsers = async () => {
        try {
            // auth.users ansprechen (System-Tabelle)
            // Wenn du bestimmte Filter hast (z. B. Abo), kannst du das anpassen
            // In Supabase kann man die auth.users nicht direkt mit RLS abfragen,
            // evtl. brauchst du einen Service-Role Key oder Policies.
            // Example: 
            const { data, error } = await supabaseAdmin.auth.admin.listUsers();
            if (error) {
                console.error("Error fetching users:", error);
                return;
            }
            if (data?.users) {
                // data.users ist ein Array
                const userList = data.users.map((u) => ({
                    id: u.id,
                    email: u.email,
                }));
                setUsers(userList);
            }
        } catch (err) {
            console.error("Unknown error fetching users:", err);
        }
    };

    const fetchWorkouts = async () => {
        try {
            const { data, error } = await supabaseAdmin
                .from("workouts")
                .select(`
                    *,
                    exercises (*)
                `);

            if (error) {
                console.error("Error fetching workouts:", error);
                return;
            }

            setWorkouts(data || []);
        } catch (err) {
            console.error("Unknown error fetching workouts:", err);
        }
    };

    const handleAddWorkout = async () => {
        try {
            const { error } = await supabaseAdmin.from("workouts").insert({
                name: newWorkout.name,
                type: newWorkout.type,
                duration: newWorkout.duration,
                difficulty: newWorkout.difficulty,
                description: newWorkout.description || null,
                exercises_count: newWorkout.exercises_count,
                calories_burned: newWorkout.calories_burned,
                schedule_time: newWorkout.schedule_time || null,
            });

            if (error) {
                console.error("Error inserting workout:", error);
                return;
            }

            // Workout erfolgreich angelegt -> Liste neu laden und Dialog schließen
            await fetchWorkouts();
            setOpenWorkoutDialog(false);
            setNewWorkout({
                name: "",
                type: "",
                duration: 0,
                difficulty: "",
                description: "",
                exercises_count: 0,
                calories_burned: 0,
                schedule_time: "",
            });
        } catch (err) {
            console.error("Unknown error inserting workout:", err);
        }
    };

    const handleAddExercise = async () => {
        if (!selectedWorkout) return;

        try {
            const { data, error } = await supabaseAdmin
                .from("exercises")
                .insert([
                    {
                        ...newExercise,
                        workout_id: selectedWorkout.id,
                    },
                ])
                .select();

            if (error) throw error;

            // Exercise erfolgreich angelegt -> Liste neu laden und Dialog schließen
            await fetchWorkouts();
            setIsAddingExercise(false);
            setNewExercise({
                name: "",
                duration: "",
                reps: "",
                image_url: "",
                video_url: "",
                set_number: 1,
            });
        } catch (error) {
            console.error("Error adding exercise:", error);
        }
    };

    const handleUpdateExercise = async (exercise: Exercise) => {
        try {
            const { error } = await supabaseAdmin
                .from("exercises")
                .update({
                    name: exercise.name,
                    duration: exercise.duration,
                    reps: exercise.reps,
                    image_url: exercise.image_url,
                    video_url: exercise.video_url,
                    set_number: exercise.set_number,
                })
                .eq("id", exercise.id);

            if (error) throw error;

            // Exercise erfolgreich aktualisiert -> Liste neu laden
            await fetchWorkouts();
        } catch (error) {
            console.error("Error updating exercise:", error);
        }
    };

    const handleDeleteExercise = async (exerciseId: number) => {
        try {
            const { error } = await supabaseAdmin
                .from("exercises")
                .delete()
                .eq("id", exerciseId);

            if (error) throw error;

            // Exercise erfolgreich gelöscht -> Liste neu laden
            await fetchWorkouts();
        } catch (error) {
            console.error("Error deleting exercise:", error);
        }
    };

    const handleFileUpload = async (file: File, exerciseId: number, type: 'video' | 'image') => {
        try {
            const fileExt = file.name.split('.').pop();
            const fileName = `${type}-${exerciseId}.${fileExt}`;
            const filePath = `exercises/${type}s/${fileName}`;

            const { error: uploadError } = await supabaseAdmin.storage
                .from('workout-media')
                .upload(filePath, file);

            if (uploadError) throw uploadError;

            const { data: { publicUrl } } = supabaseAdmin.storage
                .from('workout-media')
                .getPublicUrl(filePath);

            const updateField = type === 'video' ? 'video_url' : 'image_url';
            const { error: updateError } = await supabaseAdmin
                .from('exercises')
                .update({ [updateField]: publicUrl })
                .eq('id', exerciseId);

            if (updateError) throw updateError;

            // Exercise erfolgreich aktualisiert -> Liste neu laden
            await fetchWorkouts();
        } catch (error) {
            console.error(`Error uploading ${type}:`, error);
        }
    };

    if (isLoading) {
        return (
            <div className="flex items-center justify-center min-h-screen">
                <Loader2Icon className="w-6 h-6 animate-spin" />
            </div>
        );
    }

    return (
        <div className="bg-white min-h-screen p-6 pb-32">
            <h1 className="text-xl font-semibold mb-4">Admin Dashboard</h1>

            {/* Users Section */}
            <Card className="mb-8">
                <CardHeader className="p-4">
                    <h2 className="text-base font-semibold">Users</h2>
                </CardHeader>
                <CardContent className="p-4 space-y-2">
                    {users.length === 0 && <p className="text-sm text-gray-500">No users found.</p>}
                    {users.map((user) => (
                        <div key={user.id} className="flex justify-between items-center text-sm">
                            <span>{user.email}</span>
                            <span className="text-xs text-gray-400">{user.id}</span>
                        </div>
                    ))}
                </CardContent>
            </Card>

            {/* Workouts Section */}
            <Card className="mb-8">
                <CardHeader className="p-4 flex items-center justify-between">
                    <h2 className="text-base font-semibold">Workouts</h2>
                    <Dialog open={openWorkoutDialog} onOpenChange={setOpenWorkoutDialog}>
                        <DialogTrigger asChild>
                            <Button size="sm" className="flex items-center gap-2 bg-gradient-to-b from-[#92A3FD] to-[#9DCEFF] text-white">
                                <PlusCircleIcon className="w-4 h-4" />
                                <span>Add Workout</span>
                            </Button>
                        </DialogTrigger>
                        <DialogContent className="p-6 rounded-lg bg-white w-[350px]">
                            <DialogHeader>
                                <DialogTitle>Neues Workout anlegen</DialogTitle>
                                <DialogDescription>
                                    Fülle die folgenden Felder aus:
                                </DialogDescription>
                            </DialogHeader>

                            <div className="flex flex-col gap-2 mt-4">
                                <label className="text-sm font-medium text-gray-700">Name</label>
                                <Input
                                    type="text"
                                    value={newWorkout.name}
                                    onChange={(e) => setNewWorkout({ ...newWorkout, name: e.target.value })}
                                />

                                <label className="text-sm font-medium text-gray-700">Type</label>
                                <Input
                                    type="text"
                                    value={newWorkout.type}
                                    onChange={(e) => setNewWorkout({ ...newWorkout, type: e.target.value })}
                                />

                                <label className="text-sm font-medium text-gray-700">Difficulty</label>
                                <Input
                                    type="text"
                                    value={newWorkout.difficulty}
                                    onChange={(e) =>
                                        setNewWorkout({ ...newWorkout, difficulty: e.target.value })
                                    }
                                />

                                <label className="text-sm font-medium text-gray-700">Duration (min)</label>
                                <Input
                                    type="number"
                                    value={newWorkout.duration}
                                    onChange={(e) =>
                                        setNewWorkout({ ...newWorkout, duration: parseInt(e.target.value) })
                                    }
                                />

                                <label className="text-sm font-medium text-gray-700">Description</label>
                                <Input
                                    type="text"
                                    value={newWorkout.description}
                                    onChange={(e) =>
                                        setNewWorkout({ ...newWorkout, description: e.target.value })
                                    }
                                />

                                <label className="text-sm font-medium text-gray-700">Exercises Count</label>
                                <Input
                                    type="number"
                                    value={newWorkout.exercises_count}
                                    onChange={(e) =>
                                        setNewWorkout({
                                            ...newWorkout,
                                            exercises_count: parseInt(e.target.value),
                                        })
                                    }
                                />

                                <label className="text-sm font-medium text-gray-700">Calories Burned</label>
                                <Input
                                    type="number"
                                    value={newWorkout.calories_burned}
                                    onChange={(e) =>
                                        setNewWorkout({
                                            ...newWorkout,
                                            calories_burned: parseInt(e.target.value),
                                        })
                                    }
                                />

                                <label className="text-sm font-medium text-gray-700">Schedule Time</label>
                                <Input
                                    type="datetime-local"
                                    value={newWorkout.schedule_time}
                                    onChange={(e) =>
                                        setNewWorkout({ ...newWorkout, schedule_time: e.target.value })
                                    }
                                />
                            </div>

                            <DialogFooter className="mt-6">
                                <Button
                                    variant="default"
                                    onClick={handleAddWorkout}
                                    className="bg-[#92A3FD] hover:bg-[#9DCEFF] text-white w-full"
                                >
                                    Speichern
                                </Button>
                            </DialogFooter>
                        </DialogContent>
                    </Dialog>
                </CardHeader>

                <CardContent className="p-4 space-y-2">
                    {workouts.length === 0 && (
                        <p className="text-sm text-gray-500">No workouts found.</p>
                    )}
                    {workouts.map((workout) => (
                        <div key={workout.id} className="flex items-center justify-between text-sm">
                            <div>
                                <p className="font-medium">{workout.name}</p>
                                <p className="text-xs text-gray-400">
                                    {workout.type} | {workout.difficulty} | {workout.duration} min
                                </p>
                            </div>
                            <span className="text-xs text-gray-400">ID: {workout.id}</span>
                        </div>
                    ))}
                </CardContent>
            </Card>

            {/* Exercises Section */}
            <Card className="mb-8">
                <CardHeader className="p-4">
                    <h2 className="text-base font-semibold">Exercises</h2>
                </CardHeader>
                <CardContent className="p-4 space-y-2">
                    {workouts.length === 0 && (
                        <p className="text-sm text-gray-500">No exercises found.</p>
                    )}
                    {workouts.map((workout) => (
                        <div key={workout.id} className="mb-8">
                            <h3 className="text-lg font-bold mb-4">{workout.name}</h3>
                            {workout.exercises?.map((exercise) => (
                                <Card key={exercise.id} className="mb-4">
                                    <CardContent className="pt-6">
                                        <div className="grid gap-4">
                                            <div className="grid grid-cols-2 gap-4">
                                                <div>
                                                    <label
                                                        className="text-sm font-medium text-gray-700"
                                                        htmlFor={`name-${exercise.id}`}
                                                    >
                                                        Name
                                                    </label>
                                                    <Input
                                                        id={`name-${exercise.id}`}
                                                        value={exercise.name}
                                                        onChange={(e) =>
                                                            handleUpdateExercise({
                                                                ...exercise,
                                                                name: e.target.value,
                                                            })
                                                        }
                                                    />
                                                </div>
                                                <div>
                                                    <label
                                                        className="text-sm font-medium text-gray-700"
                                                        htmlFor={`duration-${exercise.id}`}
                                                    >
                                                        Duration (seconds)
                                                    </label>
                                                    <Input
                                                        id={`duration-${exercise.id}`}
                                                        value={exercise.duration}
                                                        onChange={(e) =>
                                                            handleUpdateExercise({
                                                                ...exercise,
                                                                duration: e.target.value,
                                                            })
                                                        }
                                                    />
                                                </div>
                                            </div>

                                            <div className="grid grid-cols-2 gap-4">
                                                <div>
                                                    <label
                                                        className="text-sm font-medium text-gray-700"
                                                        htmlFor={`video-${exercise.id}`}
                                                    >
                                                        Upload Video
                                                    </label>
                                                    <Input
                                                        id={`video-${exercise.id}`}
                                                        type="file"
                                                        accept="video/*"
                                                        onChange={(e) => {
                                                            const file = e.target.files?.[0];
                                                            if (file) {
                                                                handleFileUpload(file, exercise.id, 'video');
                                                            }
                                                        }}
                                                    />
                                                </div>
                                                <div>
                                                    <label
                                                        className="text-sm font-medium text-gray-700"
                                                        htmlFor={`image-${exercise.id}`}
                                                    >
                                                        Upload Image
                                                    </label>
                                                    <Input
                                                        id={`image-${exercise.id}`}
                                                        type="file"
                                                        accept="image/*"
                                                        onChange={(e) => {
                                                            const file = e.target.files?.[0];
                                                            if (file) {
                                                                handleFileUpload(file, exercise.id, 'image');
                                                            }
                                                        }}
                                                    />
                                                </div>
                                            </div>

                                            {exercise.video_url && (
                                                <div>
                                                    <label>Current Video</label>
                                                    <video
                                                        src={exercise.video_url}
                                                        controls
                                                        className="w-full max-h-48 object-cover rounded-lg"
                                                    />
                                                </div>
                                            )}

                                            {exercise.image_url && (
                                                <div>
                                                    <label>Current Image</label>
                                                    <img
                                                        src={exercise.image_url}
                                                        alt={exercise.name}
                                                        className="w-full max-h-48 object-cover rounded-lg"
                                                    />
                                                </div>
                                            )}

                                            <Button
                                                variant="destructive"
                                                onClick={() => handleDeleteExercise(exercise.id)}
                                            >
                                                Delete Exercise
                                            </Button>
                                        </div>
                                    </CardContent>
                                </Card>
                            ))}
                        </div>
                    ))}
                </CardContent>
            </Card>

            {/* Add Exercise Dialog */}
            <Dialog open={isAddingExercise} onOpenChange={setIsAddingExercise}>
                <DialogContent>
                    <DialogHeader>
                        <DialogTitle>Add Exercise</DialogTitle>
                        <DialogDescription>
                            Add a new exercise to {selectedWorkout?.name}
                        </DialogDescription>
                    </DialogHeader>

                    <div className="grid gap-4 py-4">
                        <div>
                            <label className="text-sm font-medium text-gray-700" htmlFor="name">
                                Name
                            </label>
                            <Input
                                id="name"
                                value={newExercise.name}
                                onChange={(e) =>
                                    setNewExercise({ ...newExercise, name: e.target.value })
                                }
                            />
                        </div>
                        <div className="grid grid-cols-2 gap-4">
                            <div>
                                <label
                                    className="text-sm font-medium text-gray-700"
                                    htmlFor="duration"
                                >
                                    Duration (seconds)
                                </label>
                                <Input
                                    id="duration"
                                    value={newExercise.duration}
                                    onChange={(e) =>
                                        setNewExercise({ ...newExercise, duration: e.target.value })
                                    }
                                />
                            </div>
                            <div>
                                <label className="text-sm font-medium text-gray-700" htmlFor="reps">
                                    Reps
                                </label>
                                <Input
                                    id="reps"
                                    value={newExercise.reps}
                                    onChange={(e) =>
                                        setNewExercise({ ...newExercise, reps: e.target.value })
                                    }
                                />
                            </div>
                        </div>
                        <div>
                            <label className="text-sm font-medium text-gray-700" htmlFor="set">
                                Set Number
                            </label>
                            <Input
                                id="set"
                                type="number"
                                value={newExercise.set_number}
                                onChange={(e) =>
                                    setNewExercise({
                                        ...newExercise,
                                        set_number: parseInt(e.target.value),
                                    })
                                }
                            />
                        </div>
                        <div>
                            <label className="text-sm font-medium text-gray-700" htmlFor="video">
                                Video URL
                            </label>
                            <Input
                                id="video"
                                value={newExercise.video_url}
                                onChange={(e) =>
                                    setNewExercise({ ...newExercise, video_url: e.target.value })
                                }
                            />
                        </div>
                    </div>

                    <DialogFooter>
                        <Button
                            variant="outline"
                            onClick={() => setIsAddingExercise(false)}
                        >
                            Cancel
                        </Button>
                        <Button onClick={handleAddExercise}>Add Exercise</Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>
        </div>
    );
};
