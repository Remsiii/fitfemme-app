import { motion } from "framer-motion";

export const ActivityScreen = (): JSX.Element => {

  return (
    <motion.div 
      className="bg-white min-h-screen p-6"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <header className="flex items-center justify-between mb-8">
        <h1 className="text-xl font-semibold">Activity</h1>
      </header>

      {/* Add your activity content here */}
      <div className="text-center text-gray-500 mt-10">
        Activity tracking coming soon...
      </div>
    </motion.div>
  );
};
