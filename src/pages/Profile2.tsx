import {
  ActivityIcon,
  ArrowLeftCircleIcon,
  BarChart2Icon,
  BellDotIcon,
  BugIcon,
  CameraIcon,
  Clock10Icon,
  FileTextIcon,
  HelpCircleIcon,
  HomeIcon,
  InfoIcon,
  LogOutIcon,
  Loader2Icon,
  MailCheckIcon,
  MoreVerticalIcon,
  Settings2Icon,
  ShareIcon,
  ShieldAlertIcon,
  User2Icon,
} from "lucide-react";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "../components/ui/avatar";
import { Button } from "../components/ui/button";
import { Card, CardContent } from "../components/ui/card";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "../components/ui/dropdown-menu";
import { Switch } from "../components/ui/switch";
import { supabase } from "@/lib/supabase";
import { useToast } from "@/hooks/use-toast";
import { useTranslation } from 'react-i18next';

interface UserProfile {
  name: string;
  email: string;
  age?: string;
  weight?: string;
  height?: string;
  goal?: string;
}

const statsData = [
  { value: "180cm", label: "Height" },
  { value: "65kg", label: "Weight" },
  { value: "22yo", label: "Age" },
];

const accountItems = [
  {
    icon: <User2Icon className="w-5 h-5 text-gray-1" />,
    label: "Personal Data",
  },
  {
    icon: <FileTextIcon className="w-5 h-5 text-gray-1" />,
    label: "Achievement",
  },
  {
    icon: <Clock10Icon className="w-5 h-5 text-gray-1" />,
    label: "ActivityIcon History",
  },
  {
    icon: <BarChart2Icon className="w-5 h-5 text-gray-1" />,
    label: "Workout Progress",
  },
];

const otherItems = [
  {
    icon: <MailCheckIcon className="w-5 h-5 text-gray-1" />,
    label: "Contact Us",
  },
  {
    icon: <ShieldAlertIcon className="w-5 h-5 text-gray-1" />,
    label: "Privacy Policy",
  },
  {
    icon: <Settings2Icon className="w-5 h-5 text-gray-1" />,
    label: "Settings",
  },
];

export const Profile2 = (): JSX.Element => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const { t, i18n } = useTranslation();
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [user, setUser] = useState<any>(null);
  const [profile, setProfile] = useState<UserProfile>({
    name: "",
    email: "",
    age: "",
    weight: "",
    height: "",
    goal: "",
  });

  useEffect(() => {
    const fetchUserProfile = async () => {
      try {
        // Authentifizierten Benutzer abrufen
        const { data: authUser, error: authError } = await supabase.auth.getUser();
  
        if (authError || !authUser?.user) {
          navigate("/login");
          throw new Error("User is not authenticated");
        }
  
        const userId = authUser.user.id;
  
        // Profildaten aus der `users`-Tabelle abrufen
        const { data: profileData, error: dbError } = await supabase
          .from("users")
          .select("full_name, email, profile_picture_url, age, weight, height, goal")
          .eq("id", userId)
          .single();
  
        if (dbError) {
          throw dbError;
        }
  
        // Benutzerprofil setzen
        setProfile({
          name: profileData.full_name || "New User",
          email: profileData.email || "",
          avatar_url: profileData.profile_picture_url || "",
          age: profileData.age || "N/A",
          weight: profileData.weight || "N/A",
          height: profileData.height || "N/A",
          goal: profileData.goal || "No specific goal",
        });
  
        // Stats aktualisieren
        statsData[0].value = profileData.height ? `${profileData.height}cm` : "N/A";
        statsData[1].value = profileData.weight ? `${profileData.weight}kg` : "N/A";
        statsData[2].value = profileData.age ? `${profileData.age}yo` : "N/A";
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
  

  const handleSaveProfile = async () => {
    if (!user) return;

    try {
      setIsSaving(true);
      const { error } = await supabase.auth.updateUser({
        data: {
          name: profile.name,
          age: profile.age,
          weight: profile.weight,
          height: profile.height,
          goal: profile.goal,
        },
      });

      if (error) throw error;

      toast({
        title: "Profile Updated",
        description: "Your profile has been successfully updated!",
      });
    } catch (error) {
      console.error("Profile update error:", error);
      toast({
        variant: "destructive",
        title: "Update Failed",
        description: "Could not update profile. Please try again.",
      });
    } finally {
      setIsSaving(false);
    }
  };

  const handleLogout = async () => {
    try {
      const { error } = await supabase.auth.signOut();
      if (error) throw error;
      navigate("/login");
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Logout Failed",
        description: "An error occurred while logging out.",
      });
    }
  };

  const handleLanguageChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    i18n.changeLanguage(event.target.value);
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
      <header className="flex items-center justify-between px-8 py-6 sticky top-0 bg-white z-10">
        <span className="font-bold text-base">{t('Profile')}</span>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" size="icon" className="bg-[#f7f8f8] rounded-lg">
              <MoreVerticalIcon className="w-4 h-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent className="w-56">
            <DropdownMenuLabel>Options</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem onClick={() => window.open('mailto:support@fitfemme.com?subject=Report%20a%20Bug')}>
              <BugIcon className="mr-2 h-4 w-4" />
              <span>{t('Report a Bug')}</span>
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => navigate('/help')}>
              <HelpCircleIcon className="mr-2 h-4 w-4" />
              <span>{t('Help Center')}</span>
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem onClick={() => navigate('/about')}>
              <InfoIcon className="mr-2 h-4 w-4" />
              <span>{t('About FitFemme')}</span>
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => {
              if (navigator.share) {
                navigator.share({
                  title: 'FitFemme App',
                  text: 'Check out FitFemme - Your personal fitness companion!',
                  url: window.location.origin,
                });
              }
            }}>
              <ShareIcon className="mr-2 h-4 w-4" />
              <span>{t('Share App')}</span>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </header>

      <main className="flex-1 px-8 pb-20 overflow-y-auto">
        <div className="flex flex-col px-8">
          <div className="flex flex-col items-center">
          <Avatar className="w-24 h-24">
            {profile.avatar_url && (
              <AvatarImage src={profile.avatar_url} />
            )}
            <AvatarFallback>{profile.name?.charAt(0)}</AvatarFallback>
          </Avatar>
          <div className="mt-4 text-center">
            <h5 className="font-semibold text-xl">{profile.name}</h5>
            <p className="text-gray-500 text-sm">{profile.email}</p>
          </div>
          <Button
            variant="outline"
            className="mt-4"
            onClick={() => navigate("/profile/edit")}
          >
            Edit Profile
          </Button>

          </div>
        </div>

        <div className="grid grid-cols-3 gap-4 mt-8">
  {statsData.map((stat, index) => (
    <Card key={index}>
      <CardContent className="flex flex-col items-center justify-center p-4">
        <span className="font-semibold text-lg">{stat.value}</span>
        <span className="text-sm text-gray-500">{stat.label}</span>
      </CardContent>
    </Card>
  ))}
</div>


        <div className="mt-8 space-y-6">
          <div className="space-y-4">
            <h3 className="font-semibold text-lg">{t('Account')}</h3>
            {accountItems.map((item, index) => (
              <div
                key={index}
                className="flex items-center justify-between p-4 bg-[#f7f8f8] rounded-xl"
              >
                <div className="flex items-center gap-4">
                  {item.icon}
                  <span className="text-sm font-medium">{item.label}</span>
                </div>
                <Button variant="ghost" size="icon">
                  <ArrowLeftCircleIcon className="w-4 h-4 rotate-180" />
                </Button>
              </div>
            ))}
          </div>

          <div className="space-y-4">
            <h3 className="font-semibold text-lg">{t('Other')}</h3>
            {otherItems.map((item, index) => (
              <div
                key={index}
                className="flex items-center justify-between p-4 bg-[#f7f8f8] rounded-xl"
                onClick={() => item.label === "Settings" ? navigate('/language-settings') : null}
              >
                <div className="flex items-center gap-4">
                  {item.icon}
                  <span className="text-sm font-medium">{item.label}</span>
                </div>
                {item.label === "Contact Us" ? (
                  <Switch />
                ) : (
                  <Button variant="ghost" size="icon">
                    <ArrowLeftCircleIcon className="w-4 h-4 rotate-180" />
                  </Button>
                )}
              </div>
            ))}
          </div>

          <Button
            variant="ghost"
            className="w-full text-red-500 hover:text-red-600 hover:bg-red-50 mb-10"
            onClick={handleLogout}
          >
            <LogOutIcon className="w-4 h-4 mr-2" />
            {t('Logout')}
          </Button>
        </div>
      </main>
    </div>
  );
};