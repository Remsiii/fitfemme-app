import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useToast } from "@/components/ui/use-toast";
import { supabase } from "@/lib/supabase";
import { CheckCircle2 } from "lucide-react";
import { notificationService } from "@/services/NotificationService";

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

export function ActivityScreen() {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [assignedWorkouts, setAssignedWorkouts] = useState<AssignedWorkout[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchAssignedWorkouts();
  }, []);

  const fetchAssignedWorkouts = async () => {
    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) throw new Error("No user found");

      const { data, error } = await supabase
        .from('assigned_workouts')
        .select(`
          *,
          workout:workouts (
            name,
            description
          )
        `)
        .eq('user_id', user.id);
      
      if (error) throw error;
      setAssignedWorkouts(data || []);
    } catch (error) {
      console.error('Error fetching assigned workouts:', error);
    } finally {
      setLoading(false);
    }
  };

  const markWorkoutComplete = async (workoutId: string) => {
    try {
      const workout = assignedWorkouts.find(w => w.id === workoutId);
      if (!workout) return;

      // Aktualisiere den Workout-Status
      const { error: workoutError } = await supabase
        .from('assigned_workouts')
        .update({ completed: true })
        .eq('id', workoutId);

      if (workoutError) throw workoutError;

      // Erstelle eine Benachrichtigung in der Datenbank
      const { error: notificationError } = await supabase
        .from('notifications')
        .insert([
          {
            user_id: (await supabase.auth.getUser()).data.user?.id,
            type: 'workout_completed',
            message: `Glückwunsch! Du hast "${workout.workout.name}" abgeschlossen!`,
            read: false
          }
        ]);

      if (notificationError) throw notificationError;

      // Sende Browser-Benachrichtigung
      await notificationService.sendNotification({
        title: "Workout Abgeschlossen! 🎉",
        body: `Glückwunsch! Du hast "${workout.workout.name}" erfolgreich abgeschlossen!`,
        icon: "/favicon.ico"
      });

      // Zeige eine Toast-Benachrichtigung an
      toast({
        title: "Workout abgeschlossen! ",
        description: `Du hast "${workout.workout.name}" erfolgreich abgeschlossen!`,
        duration: 5000,
      });
      
      // Aktualisiere die Liste der Workouts
      fetchAssignedWorkouts();

      // TODO: Später für mobile Push-Notifications
      // if ('serviceWorker' in navigator && 'PushManager' in window) {
      //   // Implementiere Push-Notifications für mobile
      // }
    } catch (error) {
      console.error('Error marking workout as complete:', error);
      
      toast({
        title: "Fehler",
        description: "Das Workout konnte nicht als abgeschlossen markiert werden.",
        variant: "destructive",
        duration: 5000,
      });
    }
  };

  return (
    <div className="container mx-auto p-4 space-y-4">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Activity</h1>
      </div>

      <Tabs defaultValue="upcoming" className="space-y-4">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="upcoming">Upcoming</TabsTrigger>
          <TabsTrigger value="completed">Completed</TabsTrigger>
        </TabsList>

        <TabsContent value="upcoming" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Upcoming Workouts</CardTitle>
            </CardHeader>
            <CardContent>
              {loading ? (
                <div className="text-center py-4">Loading...</div>
              ) : assignedWorkouts.filter(workout => !workout.completed).length > 0 ? (
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
        </TabsContent>

        <TabsContent value="completed" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Completed Workouts</CardTitle>
            </CardHeader>
            <CardContent>
              {loading ? (
                <div className="text-center py-4">Loading...</div>
              ) : assignedWorkouts.filter(workout => workout.completed).length > 0 ? (
                <div className="space-y-4">
                  {assignedWorkouts
                    .filter(workout => workout.completed)
                    .sort((a, b) => new Date(b.assigned_date).getTime() - new Date(a.assigned_date).getTime())
                    .map((assigned) => (
                      <div key={assigned.id} className="flex items-center justify-between p-4 border rounded-lg">
                        <div>
                          <h3 className="font-medium">{assigned.workout.name}</h3>
                          <p className="text-sm text-gray-500">
                            Abgeschlossen am: {new Date(assigned.assigned_date).toLocaleDateString()}
                          </p>
                        </div>
                        <CheckCircle2 className="h-5 w-5 text-green-500" />
                      </div>
                    ))}
                </div>
              ) : (
                <div className="text-center py-4 text-gray-500">
                  Keine abgeschlossenen Workouts
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
