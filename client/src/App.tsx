import { Switch, Route } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { AuthProvider, useAuth } from "@/components/auth-context";
import { Navigation } from "@/components/navigation";

import Home from "@/pages/home";
import Login from "@/pages/login";
import Signup from "@/pages/signup";
import Onboarding from "@/pages/onboarding";
import InterviewQuestions from "@/pages/interview-questions";
import ResumeBuilder from "@/pages/resume-builder";
import Analytics from "@/pages/analytics";
import IndustryInsights from "@/pages/industry-insights";
import FinanceInsights from "@/pages/insight-finanace";
import MarketingInsights from "@/pages/insight-marketing";
import HealthcareInsights from "@/pages/insight-healthcare";
import NotFound from "@/pages/not-found";
import OAuthSuccess from "@/pages/OAuthSuccess";

function Routes() {
  return (
    <Switch>
      <Route path="/" component={Home} />
      <Route path="/login" component={Login} />
      <Route path="/signup" component={Signup} />
      <Route path="/onboarding" component={Onboarding} />
      <Route path="/interview-questions" component={InterviewQuestions} />
      <Route path="/resume-builder" component={ResumeBuilder} />
      <Route path="/analytics" component={Analytics} />
      <Route path="/industry-insights" component={IndustryInsights} />
      <Route path="/insight-finance" component={FinanceInsights} /> {/* 👈 added */}
      <Route path="/insight-marketing" component={MarketingInsights} />
      <Route path="/insight-healthcare" component={HealthcareInsights} />
      <Route path="/oauth-success" component={OAuthSuccess} />
      <Route component={NotFound} />
    </Switch>
  );
}

// Wrapper to handle loading state from Auth
function AppContent() {
  const { isLoading } = useAuth();

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
          <p className="text-lg text-foreground">Loading...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background text-foreground">
      <Navigation />
      <main className="pt-16">
        <Routes />
      </main>
      <Toaster />
    </div>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <AuthProvider>
          <AppContent />
        </AuthProvider>
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;
