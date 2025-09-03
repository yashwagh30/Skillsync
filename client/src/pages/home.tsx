import { useEffect } from "react";
import { HeroSection } from "@/components/hero-section";
import { FeaturesSection } from "@/components/features-section";
import { FAQSection } from "@/components/faq-section";
import { Link } from "wouter";
import { Button } from "@/components/ui/button";

export default function Home() {
  useEffect(() => {
    const observerOptions = {
      threshold: 0.1,
      rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('animate');
        }
      });
    }, observerOptions);

    // Observe all animated elements
    const animatedElements = document.querySelectorAll('.fade-in-up, .slide-in-left, .slide-in-right, .scale-in');
    animatedElements.forEach((el) => observer.observe(el));

    return () => observer.disconnect();
  }, []);

  return (
    <div className="gradient-bg min-h-screen">
      <HeroSection />
      <FeaturesSection />
      <FAQSection />
      
      {/* CTA Section */}
      <section className="py-16 bg-background">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl sm:text-4xl font-bold text-foreground mb-4 fade-in-up">
            Ready to Accelerate Your Career?
          </h2>
          <p className="text-lg text-muted-foreground mb-8 max-w-2xl mx-auto fade-in-up">
            Join thousands of professionals who have advanced their careers with SkillSync
          </p>
          <div className="fade-in-up">
            <Link href="/signup">
              <Button className="btn-primary btn-bounce px-8 py-3 rounded-lg font-semibold" data-testid="button-start-journey">
                Start Your Journey Today
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
