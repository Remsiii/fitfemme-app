import { ArrowLeftCircleIcon, Loader2Icon } from "lucide-react";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "../components/ui/button";
import { Input } from "../components/ui/input";
import { Label } from "../components/ui/label";
import { supabase } from "@/lib/supabase";
import { useToast } from "@/hooks/use-toast";
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "../components/ui/avatar";
import { AvatarSelector } from "@/components/AvatarSelector";

interface UserProfile {
  name: string;
  email: string;
  age?: string;
  weight?: string;
  height?: string;
  goal?: string;
  avatar_url?: string;
}

export const EditProfile = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [showAvatarSelector, setShowAvatarSelector] = useState(false);
  const [profile, setProfile] = useState<UserProfile>({
    name: "",
    email: "",
    age: "",
    weight: "",
    height: "",
    goal: "",
    avatar_url: "",
  });

  useEffect(() => {
    const fetchUserProfile = async () => {
      try {
        const { data: { user } } = await supabase.auth.getUser();

        if (!user) {
          navigate("/login");
          return;
        }

        setProfile({
          name: user.user_metadata?.name || user.email?.split("@")[0] || "",
          email: user.email || "",
          age: user.user_metadata?.age || "",
          weight: user.user_metadata?.weight || "",
          height: user.user_metadata?.height || "",
          goal: user.user_metadata?.goal || "",
          avatar_url: user.user_metadata?.avatar_url || "",
        });
      } catch (error) {
        console.error("Error fetching profile:", error);
        toast({
          variant: "destructive",
          title: "Error",
          description: "Could not load profile. Please try again.",
        });
      } finally {
        setIsLoading(false);
      }
    };

    fetchUserProfile();
  }, []);

  const handleSave = async () => {
    try {
      setIsSaving(true);
      const { error } = await supabase.auth.updateUser({
        data: {
          name: profile.name,
          age: profile.age,
          weight: profile.weight,
          height: profile.height,
          goal: profile.goal,
          avatar_url: profile.avatar_url,
        },
      });

      if (error) throw error;

      toast({
        title: "Success",
        description: "Profile updated successfully",
      });
      navigate("/profile");
    } catch (error) {
      console.error("Error updating profile:", error);
      toast({
        variant: "destructive",
        title: "Error",
        description: "Failed to update profile. Please try again.",
      });
    } finally {
      setIsSaving(false);
    }
  };

  const handleAvatarChange = (url: string) => {
    setProfile(prev => ({ ...prev, avatar_url: url }));
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <Loader2Icon className="w-8 h-8 animate-spin" />
      </div>
    );
  }

  return (
    <div className="bg-white flex flex-col min-h-screen w-full max-w-[375px] mx-auto relative">
      {/* Header */}
      <header className="flex items-center justify-between px-8 py-6 sticky top-0 bg-white z-10">
        <Button
          variant="ghost"
          size="icon"
          className="bg-[#f7f8f8] rounded-lg"
          onClick={() => navigate(-1)}
        >
          <ArrowLeftCircleIcon className="w-4 h-4" />
        </Button>
        <span className="font-bold text-base">Edit Profile</span>
        <div className="w-8" /> {/* Spacer for alignment */}
      </header>

      {/* Main Content with Padding Bottom for Navigation */}
      <main className="flex-1 px-8 pb-20 overflow-y-auto">
        <div className="flex flex-col px-8 gap-8">
          <div className="flex flex-col items-center gap-6">
            <Avatar className="w-24 h-24">
              <AvatarImage src={profile.avatar_url} />
              <AvatarFallback>{profile.name?.charAt(0)}</AvatarFallback>
            </Avatar>
            <Button 
              variant="outline" 
              size="sm"
              onClick={() => setShowAvatarSelector(true)}
            >
              Change Photo
            </Button>
          </div>

          <div className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="name">Name</Label>
              <Input
                id="name"
                value={profile.name}
                onChange={(e) => setProfile({ ...profile, name: e.target.value })}
                placeholder="Enter your name"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                value={profile.email}
                disabled
                className="bg-gray-50"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="age">Age</Label>
              <Input
                id="age"
                value={profile.age}
                onChange={(e) => setProfile({ ...profile, age: e.target.value })}
                placeholder="Enter your age"
                type="number"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="height">Height (cm)</Label>
              <Input
                id="height"
                value={profile.height}
                onChange={(e) => setProfile({ ...profile, height: e.target.value })}
                placeholder="Enter your height"
                type="number"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="weight">Weight (kg)</Label>
              <Input
                id="weight"
                value={profile.weight}
                onChange={(e) => setProfile({ ...profile, weight: e.target.value })}
                placeholder="Enter your weight"
                type="number"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="goal">Fitness Goal</Label>
              <Input
                id="goal"
                value={profile.goal}
                onChange={(e) => setProfile({ ...profile, goal: e.target.value })}
                placeholder="Enter your fitness goal"
              />
            </div>
          </div>

          <Button
            className="w-full mb-6"
            onClick={handleSave}
            disabled={isSaving}
          >
            {isSaving ? (
              <Loader2Icon className="w-4 h-4 mr-2 animate-spin" />
            ) : null}
            Save Changes
          </Button>
        </div>

        <AvatarSelector
          open={showAvatarSelector}
          onOpenChange={setShowAvatarSelector}
          onAvatarChange={handleAvatarChange}
        />
      </main>
    </div>
  );
};
