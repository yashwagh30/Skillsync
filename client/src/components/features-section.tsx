import { useState, useEffect, useRef } from "react";
import { GraduationCap, Briefcase, TrendingUp, FileText } from "lucide-react";

export function FeaturesSection() {
  const [counters, setCounters] = useState([0, 0, 0, 0]);
  const [hasAnimated, setHasAnimated] = useState(false);
  const statsRef = useRef<HTMLDivElement>(null);

  const features = [
    {
      icon: GraduationCap,
      title: "AI-Powered Career Guidance",
      description: "Get personalized career advice and insights powered by advanced AI technology."
    },
    {
      icon: Briefcase,
      title: "Interview Preparation",
      description: "Practice with role-specific questions and get instant feedback to improve your performance."
    },
    {
      icon: TrendingUp,
      title: "Industry Insights",
      description: "Stay ahead with real-time industry trends, salary data, and market analysis."
    },
    {
      icon: FileText,
      title: "Smart Resume Creation",
      description: "Generate ATS-optimized resumes with AI assistance."
    }
  ];

  const stats = [
    { number: "50+", label: "Industries Covered", targetValue: 50, suffix: "+" },
    { number: "1000+", label: "Interview Questions", targetValue: 1000, suffix: "+" },
    { number: "95%", label: "Success Rate", targetValue: 95, suffix: "%" },
    { number: "24/7", label: "AI Support", targetValue: 24, suffix: "/7" }
  ];

  const animateCounter = (index: number, targetValue: number, duration: number = 2000) => {
    const startTime = Date.now();
    const startValue = 0;

    const updateCounter = () => {
      const elapsed = Date.now() - startTime;
      const progress = Math.min(elapsed / duration, 1);
      
      // Easing function for smooth animation
      const easeOutQuart = 1 - Math.pow(1 - progress, 4);
      const currentValue = Math.round(startValue + (targetValue - startValue) * easeOutQuart);

      setCounters(prev => {
        const newCounters = [...prev];
        newCounters[index] = currentValue;
        return newCounters;
      });

      if (progress < 1) {
        requestAnimationFrame(updateCounter);
      }
    };

    requestAnimationFrame(updateCounter);
  };

  useEffect(() => {
    if (!statsRef.current || hasAnimated) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && entry.intersectionRatio > 0.5) {
            setHasAnimated(true);
            // Stagger the animations slightly for better visual effect
            stats.forEach((stat, index) => {
              setTimeout(() => {
                animateCounter(index, stat.targetValue, 2000 + index * 200);
              }, index * 100);
            });
            observer.unobserve(entry.target);
          }
        });
      },
      {
        threshold: 0.5,
        rootMargin: '0px'
      }
    );

    observer.observe(statsRef.current);

    return () => observer.disconnect();
  }, [hasAnimated]);

  const formatStatValue = (value: number, suffix: string) => {
    if (suffix === "/7") {
      return `${value}/7`;
    }
    return `${value}${suffix}`;
  };

  return (
    <section id="features" className="py-16 bg-background">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16 fade-in-up">
          <h2 className="text-3xl sm:text-4xl font-bold text-foreground mb-4">
            Powerful Features For Your Career Growth
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Comprehensive tools designed to accelerate your professional journey
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {features.map((feature, index) => (
            <div key={index} className={`card-gradient rounded-xl p-6 hover:scale-105 transition-transform duration-300 ${
              index % 2 === 0 ? 'slide-in-left' : 'slide-in-right'
            }`}>
              <div className="text-center">
                <div className="w-12 h-12 bg-primary/20 rounded-lg flex items-center justify-center mx-auto mb-4">
                  <feature.icon className="text-primary text-xl" />
                </div>
                <h3 className="text-lg font-semibold text-foreground mb-2">{feature.title}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  {feature.description}
                </p>
              </div>
            </div>
          ))}
        </div>
        
        <div ref={statsRef} className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
          {stats.map((stat, index) => (
            <div key={index} className="scale-in">
              <div className="text-3xl font-bold text-primary mb-2">
                {formatStatValue(counters[index], stat.suffix)}
              </div>
              <div className="text-sm text-muted-foreground">{stat.label}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
