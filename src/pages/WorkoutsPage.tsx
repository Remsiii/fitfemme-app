import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { ArrowLeftIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { supabase } from "@/lib/supabase";
import { useTranslation } from "react-i18next";

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

export function WorkoutsPage() {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const [workouts, setWorkouts] = useState<WorkoutData[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState<string>("all");

  useEffect(() => {
    const fetchWorkouts = async () => {
      try {
        setIsLoading(true);
        let query = supabase.from("workouts").select("*");
        
        if (selectedCategory !== "all") {
          query = query.eq("category", selectedCategory);
        }

        const { data, error } = await query;

        if (error) {
          throw error;
        }

        if (data) {
          setWorkouts(data);
        }
      } catch (error) {
        console.error("Error fetching workouts:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchWorkouts();
  }, [selectedCategory]);

  const categories = ["all", "cardio", "strength", "flexibility", "yoga"];

  return (
    <div className="bg-white min-h-screen p-6">
      <header className="flex items-center mb-6">
        <Button
          variant="ghost"
          size="icon"
          className="mr-2"
          onClick={() => navigate(-1)}
        >
          <ArrowLeftIcon className="h-6 w-6" />
        </Button>
        <h1 className="text-2xl font-semibold">{t("All Workouts")}</h1>
      </header>

      <div className="mb-6 overflow-x-auto">
        <div className="flex space-x-2 pb-2">
          {categories.map((category) => (
            <Button
              key={category}
              variant={selectedCategory === category ? "default" : "outline"}
              className={`${
                selectedCategory === category
                  ? "bg-gradient-to-b from-[#92A3FD] to-[#9DCEFF] text-white"
                  : ""
              } capitalize whitespace-nowrap`}
              onClick={() => setSelectedCategory(category)}
            >
              {t(category)}
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
