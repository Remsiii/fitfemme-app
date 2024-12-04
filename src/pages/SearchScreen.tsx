import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { SearchIcon } from "lucide-react";
import { Input } from "@/components/ui/input";
import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";
import { useNavigate } from "react-router-dom";

interface Workout {
  id: number;
  name: string;
  description: string;
}

export const SearchScreen = (): JSX.Element => {
  const [workouts, setWorkouts] = useState<Workout[]>([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchWorkouts = async () => {
      const { data, error } = await supabase
        .from('workouts')
        .select('*');
      if (error) {
        console.error('Error fetching workouts:', error);
      } else {
        setWorkouts(data);
      }
    };

    fetchWorkouts();
  }, []);

  const handleWorkoutClick = (workout: Workout) => {
    navigate(`/workout-details/${workout.id}`);
  };
  
  return (
    <motion.div 
      className="bg-white min-h-screen p-6"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <header className="flex items-center justify-between mb-8">
        <h1 className="text-xl font-semibold">Search</h1>
      </header>

      <div className="space-y-6">
        <div className="relative">
          <SearchIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
          <Input 
            className="pl-10" 
            placeholder="Search workouts, exercises..."
            type="search"
          />
        </div>

        <div className="space-y-4">
  <h2 className="font-medium">
    Workouts ({workouts.length})
  </h2>
  <div className="flex flex-wrap gap-2">
    {workouts.map((workout) => (
      <div
        key={workout.id}
        className="p-4 bg-gray-100 rounded-lg cursor-pointer flex justify-between items-center"
        onClick={() => handleWorkoutClick(workout)}
      >
        <div>
          <h3 className="font-semibold">{workout.name}</h3>
          <p>{workout.description}</p>
        </div>
        <Button variant="outline" size="sm" className="rounded-full">
          View
        </Button>
      </div>
    ))}
  </div>
</div>

      </div>
    </motion.div>
  );
};
