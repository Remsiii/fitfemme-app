import { motion } from "framer-motion";
import { User2Icon, Settings2Icon, HeartIcon, BellIcon, ShieldIcon, HelpCircleIcon, PencilIcon, Loader2Icon, LogOutIcon } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";
import { useToast } from "@/hooks/use-toast";

interface UserProfile {
  id?: string;
  name: string;
  age: string;
  weight: string;
  height: string;
  goal: string;
  user_id?: string;
}

export const ProfileScreen = (): JSX.Element => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [profile, setProfile] = useState<UserProfile>({
    name: "",
    age: "",
    weight: "",
    height: "",
    goal: ""
  });

  useEffect(() => {
    checkUser();
  }, []);

  const checkUser = async () => {
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) {
      navigate('/login');
      return;
    }
    loadProfile(user.id);
  };

  const loadProfile = async (userId: string) => {
    try {
      setIsLoading(true);
      
      let { data, error } = await supabase
        .from('profiles')
        .select('*')
        .eq('user_id', userId)
        .single();

      if (error) {
        // Wenn kein Profil gefunden wurde, erstelle ein neues
        const newProfile = {
          user_id: userId,
          name: "New User",
          age: "",
          weight: "",
          height: "",
          goal: "Fitness Enthusiast"
        };
        
        const { data: createdProfile, error: createError } = await supabase
          .from('profiles')
          .insert([newProfile])
          .select()
          .single();

        if (createError) {
          console.error('Error creating profile:', createError);
          toast({
            variant: "destructive",
            title: "Error",
            description: "Could not create profile. Please try again."
          });
          return;
        }

        data = createdProfile;
      }

      if (data) {
        setProfile(data);
      }
    } catch (error) {
      console.error('Error:', error);
      toast({
        variant: "destructive",
        title: "Error",
        description: "An unexpected error occurred. Please try again."
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleProfileUpdate = (field: keyof UserProfile, value: string) => {
    setProfile(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleSaveProfile = async () => {
    try {
      setIsSaving(true);

      const { data: { user } } = await supabase.auth.getUser();
      if (!user) {
        navigate('/login');
        return;
      }

      const { error } = await supabase
        .from('profiles')
        .upsert({
          ...profile,
          user_id: user.id
        })
        .select()
        .single();

      if (error) {
        console.error('Error saving profile:', error);
        toast({
          variant: "destructive",
          title: "Error",
          description: "Could not save profile changes. Please try again."
        });
        return;
      }

      // Show success toast
      toast({
        title: "Success",
        description: "Profile changes saved successfully!",
      });

      // Reload profile to ensure we have the latest data
      await loadProfile(user.id);
    } catch (error) {
      console.error('Error:', error);
      toast({
        variant: "destructive",
        title: "Error",
        description: "An unexpected error occurred. Please try again."
      });
    } finally {
      setIsSaving(false);
    }
  };

  const handleLogout = async () => {
    try {
      const { error } = await supabase.auth.signOut();
      if (error) throw error;
      navigate('/login');
    } catch (error) {
      console.error('Error logging out:', error);
      toast({
        variant: "destructive",
        title: "Error",
        description: "Failed to log out. Please try again."
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
        <h1 className="text-xl font-semibold">Profile</h1>
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
          <div className="space-y-4">
            <Input
              type="text"
              value={profile.name}
              onChange={(e) => handleProfileUpdate('name', e.target.value)}
              className="text-center text-xl font-semibold"
              placeholder="Your Name"
            />
            <Input
              type="text"
              value={profile.goal}
              onChange={(e) => handleProfileUpdate('goal', e.target.value)}
              className="text-center text-gray-500"
              placeholder="Your Goal"
            />
          </div>

          <Card className="p-4 space-y-4">
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
