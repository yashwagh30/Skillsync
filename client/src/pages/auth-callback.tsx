import { useEffect } from "react";
import { useLocation } from "wouter";
import { useAuth } from "@/components/auth-context";
import { useToast } from "@/hooks/use-toast";

export default function AuthCallback() {
  const [, setLocation] = useLocation();
  const { login } = useAuth();
  const { toast } = useToast();

  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const token = urlParams.get('token');
    const error = urlParams.get('error');

    if (error) {
      toast({
        title: "Authentication failed",
        description: "There was an error signing in with Google. Please try again.",
        variant: "destructive",
      });
      setLocation("/login");
      return;
    }

    if (token) {
      // Verify token with backend
      fetch("/api/auth/me", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
        .then(res => res.json())
        .then(data => {
          if (data.user) {
            login(data.user, token);
            toast({
              title: "Welcome!",
              description: "You have been successfully signed in.",
            });
            
            // Redirect based on user onboarding status
            if (data.user.industry && data.user.experienceLevel) {
              setLocation("/");
            } else {
              setLocation("/onboarding");
            }
          } else {
            throw new Error("Invalid token");
          }
        })
        .catch(() => {
          toast({
            title: "Authentication failed",
            description: "There was an error verifying your account. Please try again.",
            variant: "destructive",
          });
          setLocation("/login");
        });
    } else {
      setLocation("/login");
    }
  }, [login, setLocation, toast]);

  return (
    <div className="gradient-bg min-h-screen flex items-center justify-center">
      <div className="text-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
        <p className="text-muted-foreground">Completing sign in...</p>
      </div>
    </div>
  );
}