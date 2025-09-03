import { HeroSection } from "@/components/hero-section";
import { FeaturesSection } from "@/components/features-section";
import { FAQSection } from "@/components/faq-section";
import { Link } from "wouter";
import { Button } from "@/components/ui/button";

export default function Home() {
  return (
    <div className="gradient-bg min-h-screen">
      <HeroSection />
      <FeaturesSection />
      <FAQSection />
      
      {/* CTA Section */}
      <section className="py-16 bg-background">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl sm:text-4xl font-bold text-foreground mb-4">
            Ready to Accelerate Your Career?
          </h2>
          <p className="text-lg text-muted-foreground mb-8 max-w-2xl mx-auto">
            Join thousands of professionals who have advanced their careers with SensAI
          </p>
          <Link href="/signup">
            <Button className="btn-primary px-8 py-3 rounded-lg font-semibold" data-testid="button-start-journey">
              Start Your Journey Today
            </Button>
          </Link>
        </div>
      </section>
    </div>
  );
}
