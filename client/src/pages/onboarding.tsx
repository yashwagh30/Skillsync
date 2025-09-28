import { useState } from "react";
import { useLocation } from "wouter";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { useAuth } from "@/components/auth-context";
import { updateOnboarding } from "@/lib/auth";
import { useToast } from "@/hooks/use-toast";
import { Factory, TrendingUp, Megaphone, Heart, Star } from "lucide-react";

export default function Onboarding() {
  const [currentStep, setCurrentStep] = useState(1);
  const [selectedIndustry, setSelectedIndustry] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const { user, token, login } = useAuth();
  const [, setLocation] = useLocation();
  const { toast } = useToast();

  const industries = [
    { id: "technology", name: "Technology", icon: Factory, description: "Software development, AI, cybersecurity" },
    { id: "finance", name: "Finance", icon: TrendingUp, description: "Banking, investment, fintech" },
    { id: "healthcare", name: "Healthcare", icon: Heart, description: "Medical, pharmaceutical, biotech" },
    { id: "marketing", name: "Marketing", icon: Megaphone, description: "Digital marketing, advertising, PR" },
  ];

  const experienceLevels = [
    { id: "entry", name: "Entry Level (0-2 years)", description: "Recent graduate or changing careers" },
    { id: "mid", name: "Mid Level (3-7 years)", description: "Experienced professional looking to advance" },
    { id: "senior", name: "Senior Level (8+ years)", description: "Leadership roles and executive positions" },
  ];

  const handleIndustrySelect = (industry: string) => {
    setSelectedIndustry(industry);
    setCurrentStep(2);
  };

  const handleExperienceSelect = async (experience: string) => {
    if (!token) return;
    setIsLoading(true);

    try {
      const response = await updateOnboarding(selectedIndustry, experience, token);
      login(response.user, token);

      toast({
        title: "Setup complete!",
        description: "Your personalized dashboard is ready.",
      });

      // ✅ Redirect based on industry
      if (selectedIndustry === "technology") {
        setLocation("/industry-insights");
      } else if (selectedIndustry === "finance") {
        setLocation("/insight-finance");
      } else if (selectedIndustry === "marketing"){
        setLocation("/insight-marketing")
      } else if (selectedIndustry === "healtcare"){
        setLocation("/insight-healthcare")
      } else {
        setLocation("/"); // fallback for healthcare, marketing, etc.
      }
    } catch (error: any) {
      toast({
        title: "Error",
        description: error.message || "Failed to complete onboarding",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleSkip = () => {
    setLocation("/");
  };

  if (!user) {
    setLocation("/login");
    return null;
  }

  return (
    <div className="gradient-bg min-h-screen pt-24">
      {currentStep === 1 && (
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-2xl mx-auto text-center">
            <div className="mb-8">
              <div className="w-16 h-16 bg-primary/20 rounded-full flex items-center justify-center mx-auto mb-4">
                <Factory className="text-primary text-2xl" />
              </div>
              <h1 className="text-3xl font-bold text-foreground mb-4">What's your industry?</h1>
              <p className="text-muted-foreground">Help us personalize your career guidance</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
              {industries.map((industry) => (
                <Card
                  key={industry.id}
                  className="card-gradient cursor-pointer hover:bg-primary/10 transition-colors"
                  onClick={() => handleIndustrySelect(industry.id)}
                  data-testid={`industry-${industry.id}`}
                >
                  <CardContent className="p-6 text-left">
                    <industry.icon className="text-primary text-xl mb-3" />
                    <h3 className="font-semibold text-foreground mb-2">{industry.name}</h3>
                    <p className="text-sm text-muted-foreground">{industry.description}</p>
                  </CardContent>
                </Card>
              ))}
            </div>

            <Button variant="ghost" onClick={handleSkip} data-testid="button-skip">
              Skip for now
            </Button>
          </div>
        </div>
      )}

      {currentStep === 2 && (
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-2xl mx-auto text-center">
            <div className="mb-8">
              <div className="w-16 h-16 bg-primary/20 rounded-full flex items-center justify-center mx-auto mb-4">
                <Star className="text-primary text-2xl" />
              </div>
              <h1 className="text-3xl font-bold text-foreground mb-4">What's your experience level?</h1>
              <p className="text-muted-foreground">We'll tailor our guidance to your career stage</p>
            </div>

            <div className="space-y-4 mb-8">
              {experienceLevels.map((level) => (
                <Card
                  key={level.id}
                  className="card-gradient cursor-pointer hover:bg-primary/10 transition-colors"
                  onClick={() => handleExperienceSelect(level.id)}
                  data-testid={`experience-${level.id}`}
                >
                  <CardContent className="p-6 text-left">
                    <h3 className="font-semibold text-foreground mb-2">{level.name}</h3>
                    <p className="text-sm text-muted-foreground">{level.description}</p>
                  </CardContent>
                </Card>
              ))}
            </div>

            <div className="flex justify-between">
              <Button variant="ghost" onClick={() => setCurrentStep(1)} data-testid="button-back">
                Back
              </Button>
              <Button variant="ghost" onClick={handleSkip} disabled={isLoading} data-testid="button-skip">
                Skip for now
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
