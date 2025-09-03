import { useState } from "react";
import { ChevronDown } from "lucide-react";
import { Button } from "@/components/ui/button";

export function FAQSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const faqs = [
    {
      question: "What makes SensAI unique as a career development tool?",
      answer: "SensAI combines advanced AI technology with personalized career coaching to provide tailored guidance, interview preparation, and industry insights that adapt to your specific goals and experience level."
    },
    {
      question: "How does SensAI create tailored content?",
      answer: "Our AI analyzes your industry, experience level, career goals, and preferences to generate personalized interview questions, resume suggestions, and career advice that align with your specific objectives."
    },
    {
      question: "How accurate and up-to-date are the industry insights?",
      answer: "Our industry insights are updated in real-time using data from multiple authoritative sources, including job market trends, salary data, and industry reports to ensure accuracy and relevance."
    },
    {
      question: "Is my data secure with SensAI?",
      answer: "Yes, we implement enterprise-grade security measures including data encryption, secure authentication, and privacy controls to protect your personal and professional information."
    },
    {
      question: "How can I track my interview preparation progress?",
      answer: "Our analytics dashboard provides comprehensive progress tracking including practice session history, performance metrics, improvement areas, and personalized recommendations for continued growth."
    },
    {
      question: "Can I edit the AI-generated content?",
      answer: "Absolutely! All AI-generated content including resumes, cover letters, and practice responses can be fully customized and edited to match your personal style and preferences."
    }
  ];

  const toggleFAQ = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section id="faq" className="py-16 bg-secondary/30">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12 fade-in-up">
          <h2 className="text-3xl sm:text-4xl font-bold text-foreground mb-4">
            Frequently Asked Questions
          </h2>
          <p className="text-lg text-muted-foreground">
            Find answers to common questions about our platform
          </p>
        </div>
        
        <div className="max-w-3xl mx-auto space-y-4">
          {faqs.map((faq, index) => (
            <div key={index} className="card-gradient rounded-xl overflow-hidden fade-in-up">
              <Button
                variant="ghost"
                className="w-full px-6 py-4 text-left flex items-center justify-between hover:bg-muted/50 transition-colors h-auto"
                onClick={() => toggleFAQ(index)}
                data-testid={`faq-question-${index}`}
              >
                <span className="font-medium text-foreground pr-4">{faq.question}</span>
                <ChevronDown 
                  className={`text-muted-foreground transition-transform duration-300 flex-shrink-0 ${
                    openIndex === index ? 'rotate-180' : ''
                  }`} 
                />
              </Button>
              {openIndex === index && (
                <div className="px-6 pb-4">
                  <p className="text-muted-foreground leading-relaxed" data-testid={`faq-answer-${index}`}>
                    {faq.answer}
                  </p>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
