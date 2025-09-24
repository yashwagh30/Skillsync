import { useEffect } from "react";
import { useLocation } from "wouter";
import { useAuth } from "@/components/auth-context";
import { useToast } from "@/hooks/use-toast";

export default function OAuthSuccess() {
  const [, setLocation] = useLocation();
  const { login } = useAuth();
  const { toast } = useToast();

  useEffect(() => {
    const handleOAuthSuccess = async () => {
      try {
        const params = new URLSearchParams(window.location.search);
        const token = params.get("token");

        if (!token) {
          throw new Error("No authentication token received");
        }

        localStorage.setItem("token", token);

        const response = await fetch("http://localhost:5008/api/auth/me", {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        });

        if (!response.ok) {
          throw new Error(`Server responded with ${response.status}`);
        }

        const data = await response.json();

        if (!data.user) {
          throw new Error("No user data received from server");
        }

        login(data.user, token);

        toast({
          title: "Welcome!",
          description: "Successfully logged in with Google.",
        });

        if (data.user.industry && data.user.experienceLevel) {
          setLocation("/");
        } else {
          setLocation("/onboarding");
        }
      } catch (error: any) {
        console.error("🔐 OAuthSuccess - Error:", error);

        localStorage.removeItem("token");

        toast({
          title: "Login Failed",
          description: error.message || "Failed to complete login. Please try again.",
          variant: "destructive",
        });

        setLocation("/login");
      }
    };

    handleOAuthSuccess();
  }, [setLocation, login, toast]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-background">
      <div className="text-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
        <p className="text-lg text-foreground">Completing your login...</p>
        <p className="text-sm text-muted-foreground mt-2">
          Please wait while we authenticate your account
        </p>
      </div>
    </div>
  );
}
