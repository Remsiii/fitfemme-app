import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { supabase } from "@/lib/supabase";
import { useToast } from "@/hooks/use-toast";
import { motion } from "framer-motion";
import { Loader2Icon, EyeIcon, LockIcon, MailCheckIcon } from "lucide-react";
import { Separator } from "@/components/ui/separator";

export const LoginScreen = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isSignUp, setIsSignUp] = useState(false);

  const validateEmail = (email: string) => {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
  };

  const handleAuth = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validierung
    if (!email || !password) {
      toast({
        variant: "destructive",
        title: "Error",
        description: "Please fill in all fields",
      });
      return;
    }

    if (!validateEmail(email)) {
      toast({
        variant: "destructive",
        title: "Error",
        description: "Please enter a valid email address",
      });
      return;
    }

    if (password.length < 8) {
      toast({
        variant: "destructive",
        title: "Error",
        description: "Password must be at least 8 characters long",
      });
      return;
    }

    if (isLoading) return;
    setIsLoading(true);

    try {
      if (isSignUp) {
        // Registrierung
        const { data, error } = await supabase.auth.signUp({
          email,
          password,
          options: {
            data: {
              registered_at: new Date().toISOString()
            }
          }
        });

        if (error) throw error;

        if (data?.user) {
          // Automatische Anmeldung nach Registrierung
          const { error: signInError } = await supabase.auth.signInWithPassword({
            email,
            password,
          });

          if (signInError) throw signInError;

          toast({
            title: "Success",
            description: "Account created and logged in successfully!",
          });
          navigate("/profile");
        }
      } else {
        // Anmeldung
        const { data, error } = await supabase.auth.signInWithPassword({
          email,
          password,
        });

        if (error) throw error;

        if (data.user) {
          toast({
            title: "Success",
            description: "Successfully logged in!",
          });
          navigate("/profile");
        }
      }
    } catch (error: any) {
      let errorMessage = "An unexpected error occurred";
      
      console.error("Authentication Error:", error);

      if (error.message.includes('rate limit')) {
        errorMessage = "Too many attempts. Please wait and try again later.";
      } else if (error.message.includes('Invalid login credentials')) {
        errorMessage = "Invalid email or password";
      } else if (error.message.includes('User already registered')) {
        errorMessage = "This email is already registered";
      } else {
        errorMessage = error.message;
      }

      toast({
        variant: "destructive",
        title: "Error",
        description: errorMessage,
      });
    } finally {
      setIsLoading(false);
    }
  };

  const socialButtons = [
    {
      icon: "https://c.animaapp.com/4seZi3dy/img/google-logo-png-suite-everything-you-need-know-about-google-newe@2x.png",
      alt: "Google",
    },
    {
      icon: "https://c.animaapp.com/4seZi3dy/img/facebook-1.svg",
      alt: "Facebook",
    },
  ];

  return (
    <motion.div
      className="flex justify-center items-center min-h-screen bg-white"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <Card className="w-[375px] border-none shadow-none">
        <div className="p-8 space-y-8">
          {/* Header */}
          <div className="text-center space-y-2">
            <p className="font-text-large-text-regular text-black-color">
              Hey there,
            </p>
            <h1 className="font-title-h4-bold text-black-color text-2xl">
              {isSignUp ? "Create Account" : "Welcome Back"}
            </h1>
          </div>

          {/* Form */}
          <form onSubmit={handleAuth} className="space-y-4">
            <div className="relative">
              <MailCheckIcon className="absolute left-3.5 top-3.5 h-[18px] w-[18px] text-gray-2" />
              <Input
                type="email"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                disabled={isLoading}
                className="pl-12 h-12 bg-border-color border-[#f7f8f8] rounded-[14px]"
              />
            </div>

            <div className="relative">
              <LockIcon className="absolute left-3.5 top-3.5 h-[18px] w-[18px] text-gray-2" />
              <Input
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                disabled={isLoading}
                minLength={8}
                className="pl-12 pr-12 h-12 bg-border-color border-[#f7f8f8] rounded-[14px]"
              />
              <EyeIcon className="absolute right-3.5 top-3.5 h-[18px] w-[18px] text-gray-2 cursor-pointer" />
            </div>

            {!isSignUp && (
              <button type="button" className="text-gray-2 text-center w-full underline font-link-medium text-xs">
                Forgot your password?
              </button>
            )}

            {/* Login/Signup Button */}
            <Button
              type="submit"
              className="w-full h-[60px] rounded-[99px] bg-gradient-to-b from-[#9293FD] to-[#9DCEFF] shadow-blue-shadow"
              disabled={isLoading}
            >
              {isLoading ? (
                <Loader2Icon className="mr-2 h-6 w-6 animate-spin" />
              ) : (
                <MailCheckIcon className="mr-2 h-6 w-6" />
              )}
              <span className="font-bold">{isLoading ? "Loading..." : (isSignUp ? "Sign Up" : "Login")}</span>
            </Button>
          </form>

          {/* Divider */}
          <div className="flex items-center gap-2">
            <Separator className="flex-1" />
            <span className="text-xs text-black-color font-normal">Or</span>
            <Separator className="flex-1" />
          </div>

          {/* Social Login */}
          <div className="flex justify-center gap-5">
            {socialButtons.map((button, index) => (
              <Button
                key={index}
                variant="outline"
                className="w-[50px] h-[50px] rounded-[14px] border-gray-3 border-[0.8px] p-0"
              >
                <img
                  src={button.icon}
                  alt={button.alt}
                  className="w-5 h-5 object-contain"
                />
              </Button>
            ))}
          </div>

          {/* Register/Login Link */}
          <div className="text-center">
            <span className="text-black-color">
              {isSignUp ? "Already have an account? " : "Don't have an account yet? "}
            </span>
            <button
              type="button"
              onClick={() => !isLoading && setIsSignUp(!isSignUp)}
              className="text-black-color underline font-medium"
              disabled={isLoading}
            >
              {isSignUp ? "Login" : "Register"}
            </button>
          </div>
        </div>
      </Card>
    </motion.div>
  );
};
