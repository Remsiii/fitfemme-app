import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import {SearchIcon } from "lucide-react";
import { Input } from "@/components/ui/input";

export const SearchScreen = (): JSX.Element => {

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
          <h2 className="font-medium">Popular Searches</h2>
          <div className="flex flex-wrap gap-2">
            {["Yoga", "HIIT", "Cardio", "Strength", "Pilates"].map((term) => (
              <Button
                key={term}
                variant="outline"
                size="sm"
                className="rounded-full"
              >
                {term}
              </Button>
            ))}
          </div>
        </div>
      </div>
    </motion.div>
  );
};
