import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { supabase } from "@/lib/supabase";
import { useToast } from "@/hooks/use-toast";
import { motion } from "framer-motion";
import { Loader2Icon } from "lucide-react";

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

  return (
    <motion.div
      className="min-h-screen bg-white flex items-center justify-center p-4"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <Card className="w-full max-w-md p-6 space-y-6">
        <div className="space-y-2 text-center">
          <h1 className="text-2xl font-bold">Welcome to FitFemme</h1>
          <p className="text-gray-500">
            {isSignUp ? "Create your account" : "Sign in to access your profile"}
          </p>
        </div>

        <form className="space-y-4" onSubmit={handleAuth}>
          <div className="space-y-2">
            <Input
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              disabled={isLoading}
            />
          </div>
          <div className="space-y-2">
            <Input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              disabled={isLoading}
              minLength={8}
            />
            <p className="text-sm text-gray-500">
              {isSignUp && "Password must be at least 8 characters long"}
            </p>
          </div>

          <div className="space-y-4">
            <Button
              type="submit"
              className="w-full bg-gradient-to-b from-[#92A3FD] to-[#9DCEFF] hover:opacity-90 text-white"
              disabled={isLoading}
            >
              {isLoading ? (
                <>
                  <Loader2Icon className="mr-2 h-4 w-4 animate-spin" />
                  Loading...
                </>
              ) : isSignUp ? (
                "Create Account"
              ) : (
                "Sign In"
              )}
            </Button>

            <Button
              type="button"
              variant="ghost"
              className="w-full"
              onClick={() => !isLoading && setIsSignUp(!isSignUp)}
              disabled={isLoading}
            >
              {isSignUp
                ? "Already have an account? Sign In"
                : "Don't have an account? Sign Up"}
            </Button>
          </div>
        </form>
      </Card>
    </motion.div>
  );
};
