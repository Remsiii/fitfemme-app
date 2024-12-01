import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { supabase } from '@/lib/supabase';
import { Workout } from '@/types/Workout';
import { WorkoutCard } from '@/components/WorkoutCard';
import { Input } from '@/components/ui/input';
import { Search, PlusCircle, Filter } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { 
  Dialog, 
  DialogContent, 
  DialogHeader, 
  DialogTitle, 
  DialogTrigger 
} from '../components/ui/dialog';
import { Label } from '@/components/ui/label';
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from '@/components/ui/select';

export const SearchWorkoutsPage = (): JSX.Element => {
  const [workouts, setWorkouts] = useState<Workout[]>([]);
  const [filteredWorkouts, setFilteredWorkouts] = useState<Workout[]>([]);
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [filters, setFilters] = useState({
    type: '',
    difficulty: '',
    muscleGroup: ''
  });
  const [user, setUser] = useState<any>(null);

  useEffect(() => {
    const fetchWorkouts = async () => {
      try {
        const { data: { user } } = await supabase.auth.getUser();
        
        if (!user) return;
        setUser(user);

        const { data: workoutsData, error } = await supabase
          .from('workouts')
          .select('*')
          .eq('userId', user.id)
          .order('createdAt', { ascending: false });

        if (error) throw error;

        setWorkouts(workoutsData || []);
        setFilteredWorkouts(workoutsData || []);
      } catch (error) {
        console.error('Error fetching workouts:', error);
      }
    };

    fetchWorkouts();
  }, []);

  useEffect(() => {
    let result = workouts;

    // Search filter
    if (searchQuery) {
      result = result.filter(workout => 
        workout.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        workout.type.toLowerCase().includes(searchQuery.toLowerCase()) ||
        workout.muscleGroups.some(group => 
          group.toLowerCase().includes(searchQuery.toLowerCase())
        )
      );
    }

    // Type filter
    if (filters.type) {
      result = result.filter(workout => 
        workout.type.toLowerCase() === filters.type.toLowerCase()
      );
    }

    // Difficulty filter
    if (filters.difficulty) {
      result = result.filter(workout => 
        workout.difficulty.toLowerCase() === filters.difficulty.toLowerCase()
      );
    }

    // Muscle Group filter
    if (filters.muscleGroup) {
      result = result.filter(workout => 
        workout.muscleGroups.some(group => 
          group.toLowerCase().includes(filters.muscleGroup.toLowerCase())
        )
      );
    }

    setFilteredWorkouts(result);
  }, [searchQuery, filters, workouts]);

  const handleAddWorkout = async () => {
    const newWorkout: Workout = {
      name: "New Workout",
      type: "Mixed",
      duration: 45,
      difficulty: "Intermediate",
      muscleGroups: ["Full Body"],
      description: "A new workout routine",
      userId: user.id
    };

    try {
      const { data, error } = await supabase
        .from('workouts')
        .insert([newWorkout])
        .select()
        .single();

      if (error) throw error;

      setWorkouts(prev => [data, ...prev]);
    } catch (error) {
      console.error('Error adding workout:', error);
    }
  };

  const WorkoutFilterDialog = () => (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline" size="icon">
          <Filter className="w-5 h-5" />
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Filter Workouts</DialogTitle>
        </DialogHeader>
        <div className="space-y-4">
          <div>
            <Label>Workout Type</Label>
            <Select 
              value={filters.type} 
              onValueChange={(value) => setFilters(prev => ({ ...prev, type: value }))}
            >
              <SelectTrigger>
                <SelectValue placeholder="Select Type" />
              </SelectTrigger>
              <SelectContent>
                {['Strength', 'Cardio', 'Flexibility', 'Mixed'].map(type => (
                  <SelectItem key={type} value={type}>{type}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <div>
            <Label>Difficulty</Label>
            <Select 
              value={filters.difficulty} 
              onValueChange={(value) => setFilters(prev => ({ ...prev, difficulty: value }))}
            >
              <SelectTrigger>
                <SelectValue placeholder="Select Difficulty" />
              </SelectTrigger>
              <SelectContent>
                {['Beginner', 'Intermediate', 'Advanced'].map(diff => (
                  <SelectItem key={diff} value={diff}>{diff}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <div>
            <Label>Muscle Group</Label>
            <Select 
              value={filters.muscleGroup} 
              onValueChange={(value) => setFilters(prev => ({ ...prev, muscleGroup: value }))}
            >
              <SelectTrigger>
                <SelectValue placeholder="Select Muscle Group" />
              </SelectTrigger>
              <SelectContent>
                {['Full Body', 'Upper Body', 'Lower Body', 'Core'].map(group => (
                  <SelectItem key={group} value={group}>{group}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );

  return (
    <motion.div 
      className="bg-white min-h-screen p-6"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Workout Library</h1>
        <Button 
          variant="ghost" 
          size="icon" 
          onClick={handleAddWorkout}
        >
          <PlusCircle className="w-6 h-6 text-blue-600" />
        </Button>
      </div>

      <div className="flex space-x-2 mb-4">
        <div className="relative flex-grow">
          <Input 
            type="text" 
            placeholder="Search workouts..." 
            className="pl-10"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
        </div>
        <WorkoutFilterDialog />
      </div>

      <motion.div 
        className="space-y-4"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        {filteredWorkouts.length === 0 ? (
          <div className="text-center text-gray-500 py-4">
            No workouts found
          </div>
        ) : (
          filteredWorkouts.map(workout => (
            <WorkoutCard 
              key={workout.id} 
              workout={workout} 
            />
          ))
        )}
      </motion.div>
    </motion.div>
  );
};
