import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { ArrowLeftIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { supabase } from "@/lib/supabase";
import { useTranslation } from "react-i18next";
import { CheckCircle2 } from "lucide-react";

interface WorkoutData {
  id: number;
  name: string;
  description: string;
  duration?: number;
  calories_burn?: number;
  progress?: number;
  icon?: string;
  difficulty?: string;
  category?: string;
}

interface AssignedWorkout {
  id: string;
  workout_id: number;
  assigned_date: string;
  completed: boolean;
  workout: {
    name: string;
    description: string;
  };
}

export function WorkoutsPage() {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const [workouts, setWorkouts] = useState<WorkoutData[]>([]);
  const [assignedWorkouts, setAssignedWorkouts] = useState<AssignedWorkout[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState<string>("all");

  useEffect(() => {
    const fetchWorkouts = async () => {
      try {
        const { data: workoutsData, error: workoutsError } = await supabase
          .from("workouts")
          .select("*");

        if (workoutsError) throw workoutsError;
        setWorkouts(workoutsData || []);

        // Hole zugewiesene Workouts
        const { data: assignedData, error: assignedError } = await supabase
          .from("assigned_workouts")
          .select(`
            *,
            workout:workouts (*)
          `)
          .eq("user_id", (await supabase.auth.getUser()).data.user?.id)
          .gte("assigned_date", new Date().toISOString().split('T')[0]);

        if (assignedError) throw assignedError;
        setAssignedWorkouts(assignedData || []);

      } catch (error) {
        console.error("Error fetching workouts:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchWorkouts();
  }, []);

  const markWorkoutComplete = async (assignedWorkoutId: string) => {
    try {
      const { error } = await supabase
        .from("assigned_workouts")
        .update({ completed: true })
        .eq("id", assignedWorkoutId);

      if (error) throw error;

      // Aktualisiere die lokale Liste
      setAssignedWorkouts(prev =>
        prev.map(workout =>
          workout.id === assignedWorkoutId
            ? { ...workout, completed: true }
            : workout
        )
      );
    } catch (error) {
      console.error("Error marking workout as complete:", error);
    }
  };

  const categories = ["all", "cardio", "strength", "flexibility", "yoga"];

  return (
    <div className="p-4">
      <header className="flex items-center justify-between mb-6">
        <Button
          variant="ghost"
          size="icon"
          className="bg-[#f7f8f8]"
          onClick={() => navigate("/home")}
        >
          <ArrowLeftIcon className="h-4 w-4" />
        </Button>
        <h1 className="text-xl font-bold">{t("workouts.title")}</h1>
        <div className="w-8" /> {/* Spacer für symmetrisches Layout */}
      </header>

      {/* Zugewiesene Workouts Sektion */}
      {assignedWorkouts.length > 0 && (
        <div className="mb-8">
          <h2 className="text-lg font-semibold mb-4">Zugewiesene Workouts für Heute</h2>
          <div className="space-y-4">
            {assignedWorkouts.map((assigned) => (
              <Card key={assigned.id} className="overflow-hidden">
                <CardContent className="p-4">
                  <div className="flex justify-between items-center">
                    <div>
                      <h3 className="font-medium">{assigned.workout.name}</h3>
                      <p className="text-sm text-gray-500">
                        {new Date(assigned.assigned_date).toLocaleDateString()}
                      </p>
                      {assigned.workout.duration && (
                        <p className="text-sm text-gray-500">
                          Dauer: {assigned.workout.duration} Minuten
                        </p>
                      )}
                    </div>
                    <div>
                      {assigned.completed ? (
                        <span className="text-green-500 px-3 py-1 rounded-full bg-green-50">
                          ✓ Abgeschlossen
                        </span>
                      ) : (
                        <Button
                          onClick={() => markWorkoutComplete(assigned.id)}
                          variant="outline"
                          size="sm"
                        >
                          Als erledigt markieren
                        </Button>
                      )}
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      )}

      <TabsContent value="activity" className="space-y-4">
        <Card>
          <CardHeader>
            <CardTitle>Upcoming Workouts</CardTitle>
          </CardHeader>
          <CardContent>
            {assignedWorkouts.length > 0 ? (
              <div className="space-y-4">
                {assignedWorkouts
                  .filter(workout => !workout.completed)
                  .sort((a, b) => new Date(a.assigned_date).getTime() - new Date(b.assigned_date).getTime())
                  .map((assigned) => (
                    <div key={assigned.id} className="flex items-center justify-between p-4 border rounded-lg">
                      <div>
                        <h3 className="font-medium">{assigned.workout.name}</h3>
                        <p className="text-sm text-gray-500">
                          Datum: {new Date(assigned.assigned_date).toLocaleDateString()}
                        </p>
                      </div>
                      <Button
                        variant="outline"
                        onClick={() => markWorkoutComplete(assigned.id)}
                      >
                        Als erledigt markieren
                      </Button>
                    </div>
                  ))}
              </div>
            ) : (
              <div className="text-center py-4 text-gray-500">
                Keine anstehenden Workouts
              </div>
            )}
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Completed Workouts</CardTitle>
          </CardHeader>
          <CardContent>
            {assignedWorkouts
              .filter(workout => workout.completed)
              .sort((a, b) => new Date(b.assigned_date).getTime() - new Date(a.assigned_date).getTime())
              .map((assigned) => (
                <div key={assigned.id} className="flex items-center justify-between p-4 border rounded-lg mb-4">
                  <div>
                    <h3 className="font-medium">{assigned.workout.name}</h3>
                    <p className="text-sm text-gray-500">
                      Abgeschlossen am: {new Date(assigned.assigned_date).toLocaleDateString()}
                    </p>
                  </div>
                  <CheckCircle2 className="h-5 w-5 text-green-500" />
                </div>
              ))}
          </CardContent>
        </Card>
      </TabsContent>

      {/* Bestehende Workouts Liste */}
      <div className="mb-6 overflow-x-auto">
        <div className="flex space-x-2 pb-2">
          {categories.map((category) => (
            <Button
              key={category}
              onClick={() => setSelectedCategory(category)}
              variant={selectedCategory === category ? "default" : "outline"}
              className={`
                whitespace-nowrap
                ${selectedCategory === category 
                  ? "bg-[#92A3FD] text-white hover:bg-[#92A3FD]/90"
                  : "bg-white text-gray-700 hover:bg-gray-100"
                }
              `}
            >
              {t(`workouts.categories.${category}`)}
            </Button>
          ))}
        </div>
      </div>

      {isLoading ? (
        <div className="flex justify-center items-center h-32">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-[#92A3FD]"></div>
        </div>
      ) : workouts.length > 0 ? (
        <div className="space-y-4">
          {workouts.map((workout) => (
            <Card
              key={workout.id}
              className="bg-white border border-[#F7F8F8] hover:border-[#92A3FD] transition-colors cursor-pointer"
              onClick={() => navigate(`/workout-details/${workout.id}`)}
            >
              <CardContent className="flex items-center p-4">
                <div className="w-[80px] h-[80px] rounded-[20px] bg-[#F7F8F8] flex items-center justify-center mr-4 overflow-hidden">
                  <img
                    src={workout.icon || `/icons/workout-default.png`}
                    alt={workout.name}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="flex-1">
                  <div className="flex justify-between items-start">
                    <div>
                      <h3 className="text-black-color font-medium mb-1">
                        {workout.name}
                      </h3>
                      <div className="flex items-center text-xs text-gray-2 space-x-2">
                        {workout.duration && (
                          <span>{workout.duration} minutes</span>
                        )}
                        {workout.duration && workout.calories_burn && (
                          <span>•</span>
                        )}
                        {workout.calories_burn && (
                          <span>{workout.calories_burn} Calories Burn</span>
                        )}
                      </div>
                    </div>
                    {workout.difficulty && (
                      <span className="text-xs text-[#92A3FD] bg-[#F7F8F8] px-2 py-1 rounded">
                        {workout.difficulty}
                      </span>
                    )}
                  </div>
                  {workout.progress !== undefined && (
                    <Progress value={workout.progress} className="h-1 mt-2" />
                  )}
                  <p className="text-sm text-gray-500 mt-1 line-clamp-2">
                    {workout.description}
                  </p>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      ) : (
        <div className="text-center text-gray-500 mt-8">
          {t("No workouts found")}
        </div>
      )}
    </div>
  );
}
