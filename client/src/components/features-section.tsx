import { GraduationCap, Briefcase, TrendingUp, FileText } from "lucide-react";

export function FeaturesSection() {
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
    { number: "50+", label: "Industries Covered" },
    { number: "1000+", label: "Interview Questions" },
    { number: "95%", label: "Success Rate" },
    { number: "24/7", label: "AI Support" }
  ];

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
        
        <div className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
          {stats.map((stat, index) => (
            <div key={index} className="scale-in">
              <div className="text-3xl font-bold text-primary mb-2">{stat.number}</div>
              <div className="text-sm text-muted-foreground">{stat.label}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
