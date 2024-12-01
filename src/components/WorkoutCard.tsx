import React from 'react';
import { motion } from 'framer-motion';
import { Workout } from '@/types/Workout';
import { 
  Dumbbell, 
  Clock, 
  Target, 
  Star 
} from 'lucide-react';

interface WorkoutCardProps {
  workout: Workout;
  onSelect?: (workout: Workout) => void;
}

export const WorkoutCard: React.FC<WorkoutCardProps> = ({ workout, onSelect }) => {
  return (
    <motion.div 
      className="bg-white rounded-lg shadow-md p-4 mb-4 flex items-center space-x-4 cursor-pointer hover:bg-gray-50 transition-colors"
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      onClick={() => onSelect && onSelect(workout)}
    >
      <div className="flex-shrink-0 bg-blue-100 rounded-full p-3">
        <Dumbbell className="text-blue-600 w-6 h-6" />
      </div>
      <div className="flex-grow">
        <h3 className="text-lg font-semibold text-gray-800">{workout.name}</h3>
        <div className="flex items-center space-x-2 text-gray-600 text-sm mt-1">
          <div className="flex items-center space-x-1">
            <Clock className="w-4 h-4" />
            <span>{workout.duration} mins</span>
          </div>
          <div className="flex items-center space-x-1">
            <Target className="w-4 h-4" />
            <span>{workout.type}</span>
          </div>
          <div className="flex items-center space-x-1">
            <Star className="w-4 h-4" />
            <span>{workout.difficulty}</span>
          </div>
        </div>
      </div>
    </motion.div>
  );
};
