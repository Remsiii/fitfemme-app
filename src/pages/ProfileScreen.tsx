import { motion } from "framer-motion";
import { User2Icon, Loader2Icon, LogOutIcon } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";
import { useToast } from "@/hooks/use-toast";

interface UserProfile {
  name: string;
  email: string;
  age?: string;
  weight?: string;
  height?: string;
  goal?: string;
}

export const ProfileScreen = (): JSX.Element => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [user, setUser] = useState<any>(null);
  const [profile, setProfile] = useState<UserProfile>({
    name: "",
    email: "",
    age: "",
    weight: "",
    height: "",
    goal: ""
  });

  useEffect(() => {
    const fetchUserProfile = async () => {
      try {
        const { data: { user } } = await supabase.auth.getUser();
        
        if (!user) {
          navigate('/login');
          return;
        }

        setUser(user);
        
        // Populate profile from user metadata
        setProfile({
          name: user.user_metadata?.name || user.email?.split('@')[0] || "New User",
          email: user.email || "",
          age: user.user_metadata?.age || "",
          weight: user.user_metadata?.weight || "",
          height: user.user_metadata?.height || "",
          goal: user.user_metadata?.goal || "Fitness Enthusiast"
        });
      } catch (error) {
        console.error("Error fetching profile:", error);
        toast({
          variant: "destructive",
          title: "Error",
          description: "Could not load profile. Please try again."
        });
      } finally {
        setIsLoading(false);
      }
    };

    fetchUserProfile();
  }, []);

  const handleProfileUpdate = (field: keyof UserProfile, value: string) => {
    setProfile(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleSaveProfile = async () => {
    if (!user) return;

    try {
      setIsSaving(true);

      // Update Supabase user metadata
      const { error } = await supabase.auth.updateUser({
        data: { 
          name: profile.name,
          age: profile.age,
          weight: profile.weight,
          height: profile.height,
          goal: profile.goal
        }
      });

      if (error) {
        throw error;
      }

      toast({
        title: "Profile Updated",
        description: "Your profile has been successfully updated!"
      });
    } catch (error) {
      console.error("Profile update error:", error);
      toast({
        variant: "destructive",
        title: "Update Failed",
        description: "Could not update profile. Please try again."
      });
    } finally {
      setIsSaving(false);
    }
  };

  const handleUpdateEmail = async () => {
    const newEmail = prompt("Enter new email address:");
    if (newEmail) {
      try {
        const { error } = await supabase.auth.updateUser({ email: newEmail });
        if (error) throw error;
        
        toast({
          title: "Email Updated",
          description: "Please check your new email to confirm the change."
        });
      } catch (error) {
        toast({
          variant: "destructive",
          title: "Email Update Failed",
          description: error instanceof Error ? error.message : "Unknown error"
        });
      }
    }
  };

  const handleLogout = async () => {
    try {
      const { error } = await supabase.auth.signOut();
      if (error) throw error;
      navigate('/login');
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Logout Failed",
        description: "An error occurred while logging out."
      });
    }
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <Loader2Icon className="w-8 h-8 animate-spin" />
      </div>
    );
  }

  return (
    <motion.div 
      className="bg-white min-h-screen p-6 pb-32"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <header className="flex items-center justify-between mb-8">
        <h1 className="text-xl font-semibold">Profile Settings</h1>
        <Button
          variant="ghost"
          size="icon"
          onClick={handleLogout}
          className="text-gray-500 hover:text-gray-700"
        >
          <LogOutIcon className="w-5 h-5" />
        </Button>
      </header>

      <div className="flex flex-col items-center mb-8">
        <div className="w-24 h-24 rounded-full bg-gradient-to-b from-[#92A3FD] to-[#9DCEFF] flex items-center justify-center mb-4">
          <User2Icon className="w-12 h-12 text-white" />
        </div>
        
        <div className="w-full max-w-md space-y-4">
          <Card className="p-4 space-y-4">
            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-700">Name</label>
              <Input
                type="text"
                value={profile.name}
                onChange={(e) => handleProfileUpdate('name', e.target.value)}
                placeholder="Enter your name"
              />
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-700">Email</label>
              <div className="flex items-center space-x-2">
                <Input
                  type="email"
                  value={profile.email}
                  readOnly
                  className="flex-grow"
                />
                <Button 
                  variant="outline" 
                  size="sm"
                  onClick={handleUpdateEmail}
                >
                  Update
                </Button>
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-700">Fitness Goal</label>
              <Input
                type="text"
                value={profile.goal}
                onChange={(e) => handleProfileUpdate('goal', e.target.value)}
                placeholder="Enter your fitness goal"
              />
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-700">Age</label>
              <Input
                type="number"
                value={profile.age}
                onChange={(e) => handleProfileUpdate('age', e.target.value)}
                placeholder="Enter your age"
              />
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-700">Weight (kg)</label>
              <Input
                type="number"
                value={profile.weight}
                onChange={(e) => handleProfileUpdate('weight', e.target.value)}
                placeholder="Enter your weight"
              />
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-700">Height (cm)</label>
              <Input
                type="number"
                value={profile.height}
                onChange={(e) => handleProfileUpdate('height', e.target.value)}
                placeholder="Enter your height"
              />
            </div>

            <Button 
              className="w-full bg-gradient-to-b from-[#92A3FD] to-[#9DCEFF] hover:opacity-90 text-white"
              onClick={handleSaveProfile}
              disabled={isSaving}
            >
              {isSaving ? (
                <>
                  <Loader2Icon className="mr-2 h-4 w-4 animate-spin" />
                  Saving...
                </>
              ) : (
                'Save Changes'
              )}
            </Button>
          </Card>
        </div>
      </div>
    </motion.div>
  );
};
