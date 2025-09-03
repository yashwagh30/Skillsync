import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { Progress } from "@/components/ui/progress";
import { CheckCircle, Lightbulb, Mic, X } from "lucide-react";
import { useLocation } from "wouter";

export default function InterviewQuestions() {
  const [currentAnswer, setCurrentAnswer] = useState("");
  const [currentCategory, setCurrentCategory] = useState("behavioral");
  const [, setLocation] = useLocation();

  const categories = [
    { id: "behavioral", name: "Behavioral", active: true },
    { id: "technical", name: "Technical", active: false },
    { id: "leadership", name: "Leadership", active: false },
    { id: "problem-solving", name: "Problem Solving", active: false },
  ];

  const currentQuestion = "Tell me about a challenging project you worked on and how you overcame the obstacles.";

  const feedback = [
    {
      type: "positive",
      icon: CheckCircle,
      message: "Good use of specific examples and quantifiable results",
    },
    {
      type: "suggestion",
      icon: Lightbulb,
      message: "Consider adding more details about your problem-solving process",
    },
  ];

  return (
    <div className="gradient-bg min-h-screen pt-24 pb-16">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          <div className="flex items-center justify-between mb-8">
            <div>
              <h1 className="text-3xl font-bold text-foreground mb-2">Interview Questions</h1>
              <p className="text-muted-foreground">Practice with AI-powered interview questions tailored to your industry</p>
            </div>
            <Button 
              variant="ghost" 
              onClick={() => setLocation("/")}
              data-testid="button-close"
            >
              <X className="h-5 w-5" />
            </Button>
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-2 space-y-6">
              <Card className="card-gradient">
                <CardHeader>
                  <CardTitle className="text-lg text-foreground">Current Question</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="bg-muted/30 rounded-lg p-4">
                    <p className="text-foreground">{currentQuestion}</p>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-foreground mb-2">Your Answer</label>
                    <Textarea
                      value={currentAnswer}
                      onChange={(e) => setCurrentAnswer(e.target.value)}
                      className="h-32 bg-input border-border text-foreground placeholder-muted-foreground resize-none"
                      placeholder="Type your answer here..."
                      data-testid="textarea-answer"
                    />
                  </div>
                  
                  <div className="flex gap-3">
                    <Button className="btn-primary" data-testid="button-record">
                      <Mic className="h-4 w-4 mr-2" />
                      Record Answer
                    </Button>
                    <Button variant="secondary" data-testid="button-next">
                      Next Question
                    </Button>
                  </div>
                </CardContent>
              </Card>
              
              <Card className="card-gradient">
                <CardHeader>
                  <CardTitle className="text-lg text-foreground">AI Feedback</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {feedback.map((item, index) => (
                      <div key={index} className="flex items-start gap-3">
                        <item.icon 
                          className={`mt-1 h-4 w-4 ${
                            item.type === 'positive' ? 'text-green-500' : 'text-yellow-500'
                          }`} 
                        />
                        <p className="text-muted-foreground text-sm">{item.message}</p>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
            
            <div className="space-y-6">
              <Card className="card-gradient">
                <CardHeader>
                  <CardTitle className="text-lg text-foreground">Progress</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Questions Completed</span>
                    <span className="text-foreground font-medium">8/20</span>
                  </div>
                  <Progress value={40} className="w-full" />
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Average Score</span>
                    <span className="text-foreground font-medium">8.2/10</span>
                  </div>
                </CardContent>
              </Card>
              
              <Card className="card-gradient">
                <CardHeader>
                  <CardTitle className="text-lg text-foreground">Question Categories</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2">
                    {categories.map((category) => (
                      <Button
                        key={category.id}
                        variant={category.active ? "default" : "ghost"}
                        className={`w-full justify-start ${
                          category.active 
                            ? "bg-primary/10 text-primary" 
                            : "text-muted-foreground hover:bg-muted/50"
                        }`}
                        onClick={() => setCurrentCategory(category.id)}
                        data-testid={`category-${category.id}`}
                      >
                        {category.name}
                      </Button>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
