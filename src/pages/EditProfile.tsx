import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/lib/supabase";
import { Button } from "../components/ui/button";
import { Input } from "../components/ui/input";
import { Label } from "../components/ui/label";
import { useToast } from "@/hooks/use-toast";
import { AvatarSelector } from "@/components/AvatarSelector";

interface UserProfile {
  name: string;
  email: string;
  avatar_url?: string;
  age?: string;
  weight?: string;
  height?: string;
  goal?: string;
}

export const EditProfile = () => {
  const navigate = useNavigate();
  const { toast } = useToast();

  const [profile, setProfile] = useState<UserProfile>({
    name: "",
    email: "",
    avatar_url: "",
    age: "",
    weight: "",
    height: "",
    goal: "",
  });
  const [isSaving, setIsSaving] = useState(false);
  const [showAvatarSelector, setShowAvatarSelector] = useState(false);

  useEffect(() => {
    const fetchUserProfile = async () => {
      try {
        // Authentifizierten Benutzer abrufen
        const { data: authUser, error: authError } = await supabase.auth.getUser();

        if (authError || !authUser?.user) {
          throw new Error("User is not authenticated");
        }

        const userId = authUser.user.id;

        // Profildaten aus der Tabelle abrufen
        const { data, error: dbError } = await supabase
          .from("users")
          .select("full_name, email, profile_picture_url, age, weight, height, goal")
          .eq("id", userId)
          .maybeSingle();

        if (dbError) throw dbError;

        if (data) {
          // Profilzustand aktualisieren, wenn Daten existieren
          setProfile({
            name: data.full_name || "",
            email: data.email || "",
            avatar_url: data.profile_picture_url || "",
            age: data.age || "",
            weight: data.weight || "",
            height: data.height || "",
            goal: data.goal || "",
          });
        } else {
          // Falls keine Daten existieren, nur die E-Mail setzen
          setProfile((prev) => ({
            ...prev,
            email: authUser.user.email || "",
          }));
        }
      } catch (error) {
        console.error("Error fetching user profile:", error);
        toast({
          variant: "destructive",
          title: "Error",
          description: "Could not load profile. Please try again.",
        });
      }
    };

    fetchUserProfile();
  }, []);

  const handleSave = async () => {
    try {
      setIsSaving(true);

      const { data: authUser, error: authError } = await supabase.auth.getUser();

      if (authError || !authUser?.user) {
        throw new Error("User is not authenticated");
      }

      const userId = authUser.user.id;

      // Benutzer in der Tabelle speichern oder aktualisieren
      const { error: dbError } = await supabase
        .from("users")
        .upsert({
          id: userId,
          full_name: profile.name,
          email: profile.email,
          profile_picture_url: profile.avatar_url || "",
          age: profile.age || null,
          weight: profile.weight || null,
          height: profile.height || null,
          goal: profile.goal || null,
          updated_at: new Date().toISOString(),
          password_hash: "",
        });

      if (dbError) throw dbError;

      toast({
        title: "Success",
        description: "Profile saved successfully.",
      });

      navigate("/profile");
    } catch (error) {
      console.error("Error saving profile:", error);
      toast({
        variant: "destructive",
        title: "Error",
        description: "Failed to save profile. Please try again.",
      });
    } finally {
      setIsSaving(false);
    }
  };

  const handleAvatarChange = (url: string) => {
    setProfile((prev) => ({ ...prev, avatar_url: url }));
  };

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
          Back
        </Button>
        <span className="font-bold text-base">Edit Profile</span>
        <div className="w-8" /> {/* Spacer for alignment */}
      </header>

      {/* Main Content */}
      <main className="flex-1 px-8 pb-20 overflow-y-auto">
        <div className="space-y-6">
          <div className="flex flex-col items-center gap-6">
            <div className="w-24 h-24">
              <img src={profile.avatar_url} alt="Avatar" className="w-full h-full rounded-full object-cover" />
            </div>
            <Button 
              variant="outline" 
              size="sm"
              onClick={() => setShowAvatarSelector(true)}
            >
              Change Photo
            </Button>
          </div>

          <AvatarSelector
            open={showAvatarSelector}
            onOpenChange={setShowAvatarSelector}
            onAvatarChange={handleAvatarChange}
          />

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
            <Input id="email" value={profile.email} disabled className="bg-gray-50" />
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

          <Button
            className="w-full mb-6"
            onClick={handleSave}
            disabled={isSaving}
          >
            {isSaving ? "Saving..." : "Save Changes"}
          </Button>
        </div>
      </main>
    </div>
  );
};
