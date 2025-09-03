import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { TrendingUp, Clock, Target, Trophy, Mic, FileText, BarChart3, X } from "lucide-react";
import { useLocation } from "wouter";

export default function Analytics() {
  const [, setLocation] = useLocation();

  const stats = [
    { icon: TrendingUp, title: "Interview Success Rate", value: "85%", color: "text-green-500" },
    { icon: Clock, title: "Hours Practiced", value: "24", color: "text-blue-500" },
    { icon: Target, title: "Questions Answered", value: "127", color: "text-purple-500" },
    { icon: Trophy, title: "Average Score", value: "8.4", color: "text-yellow-500" },
  ];

  const skills = [
    { name: "Technical Skills", percentage: 85 },
    { name: "Communication", percentage: 78 },
    { name: "Leadership", percentage: 72 },
    { name: "Problem Solving", percentage: 91 },
  ];

  const activities = [
    {
      icon: Mic,
      title: "Completed Interview Practice",
      description: "Behavioral questions - Score: 8.5/10",
      time: "2 hours ago",
    },
    {
      icon: FileText,
      title: "Updated Resume",
      description: "Added new work experience",
      time: "1 day ago",
    },
    {
      icon: BarChart3,
      title: "Viewed Industry Insights",
      description: "Technology sector analysis",
      time: "3 days ago",
    },
  ];

  return (
    <div className="gradient-bg min-h-screen pt-24 pb-16">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          <div className="flex items-center justify-between mb-8">
            <div>
              <h1 className="text-3xl font-bold text-foreground mb-2">Analytics Dashboard</h1>
              <p className="text-muted-foreground">Track your career development progress and insights</p>
            </div>
            <Button 
              variant="ghost" 
              onClick={() => setLocation("/")}
              data-testid="button-close"
            >
              <X className="h-5 w-5" />
            </Button>
          </div>
          
          {/* Stats Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            {stats.map((stat, index) => (
              <Card key={index} className="card-gradient text-center">
                <CardContent className="p-6">
                  <div className="w-12 h-12 bg-primary/20 rounded-lg flex items-center justify-center mx-auto mb-3">
                    <stat.icon className={`text-xl ${stat.color}`} />
                  </div>
                  <div className="text-2xl font-bold text-foreground mb-1">{stat.value}</div>
                  <div className="text-sm text-muted-foreground">{stat.title}</div>
                </CardContent>
              </Card>
            ))}
          </div>
          
          {/* Charts Section */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
            <Card className="card-gradient">
              <CardHeader>
                <CardTitle className="text-lg text-foreground">Progress Over Time</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="h-64 bg-muted/20 rounded-lg flex items-center justify-center">
                  <p className="text-muted-foreground">Progress Chart Placeholder</p>
                </div>
              </CardContent>
            </Card>
            
            <Card className="card-gradient">
              <CardHeader>
                <CardTitle className="text-lg text-foreground">Skills Assessment</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {skills.map((skill, index) => (
                    <div key={index}>
                      <div className="flex justify-between text-sm mb-1">
                        <span className="text-foreground">{skill.name}</span>
                        <span className="text-muted-foreground">{skill.percentage}%</span>
                      </div>
                      <Progress value={skill.percentage} className="w-full" />
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
          
          {/* Recent Activity */}
          <Card className="card-gradient">
            <CardHeader>
              <CardTitle className="text-lg text-foreground">Recent Activity</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {activities.map((activity, index) => (
                  <div key={index} className="flex items-center gap-4 p-3 bg-muted/20 rounded-lg">
                    <div className="w-8 h-8 bg-primary/20 rounded-full flex items-center justify-center">
                      <activity.icon className="text-primary text-sm" />
                    </div>
                    <div className="flex-1">
                      <p className="text-foreground font-medium">{activity.title}</p>
                      <p className="text-sm text-muted-foreground">{activity.description}</p>
                    </div>
                    <span className="text-sm text-muted-foreground">{activity.time}</span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
