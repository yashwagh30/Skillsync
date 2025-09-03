import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { useAuth } from "./auth-context";

export function HeroSection() {
  const { user } = useAuth();

  return (
    <section className="relative pt-24 pb-16 overflow-hidden">
      <div className="hero-gradient absolute inset-0"></div>
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative">
        <div className="text-center max-w-4xl mx-auto">
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold leading-tight mb-6 fade-in-up">
            <span className="text-gradient">Your AI Career Coach for</span><br />
            <span className="text-foreground">Professional Success</span>
          </h1>
          <p className="text-lg sm:text-xl text-muted-foreground mb-8 leading-relaxed max-w-2xl mx-auto fade-in-up">
            Advance your career with personalized guidance, interview prep, and AI-powered tools for job success.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center fade-in-up">
            {user ? (
              user.industry && user.experienceLevel ? (
                <Link href="/interview-questions">
                  <Button className="btn-primary px-8 py-3 rounded-lg font-semibold" data-testid="button-start-practice">
                    Start Practicing
                  </Button>
                </Link>
              ) : (
                <Link href="/onboarding">
                  <Button className="btn-primary px-8 py-3 rounded-lg font-semibold" data-testid="button-complete-setup">
                    Complete Setup
                  </Button>
                </Link>
              )
            ) : (
              <Link href="/signup">
                <Button className="btn-primary px-8 py-3 rounded-lg font-semibold" data-testid="button-get-started">
                  Get Started
                </Button>
              </Link>
            )}
            <Button 
              variant="outline" 
              className="px-8 py-3 rounded-lg font-semibold border-border text-foreground hover:bg-muted"
              data-testid="button-watch-demo"
            >
              Watch Demo
            </Button>
          </div>
        </div>
        
        <div className="mt-16 relative scale-in">
          <img 
            src="https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=800&h=500" 
            alt="Professional woman using AI career tools" 
            className="rounded-2xl shadow-2xl mx-auto w-full max-w-4xl"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-background/50 to-transparent rounded-2xl"></div>
        </div>
      </div>
    </section>
  );
}
