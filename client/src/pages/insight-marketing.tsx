import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { TrendingUp, DollarSign, Users, Briefcase, X } from "lucide-react";
import { useLocation } from "wouter";

export default function MarketingInsights() {
  const [, setLocation] = useLocation();

  const trends = [
    {
      title: "Digital Transformation",
      category: "Technology",
      growth: "+40%",
      description: "Brands are shifting budgets toward digital-first marketing strategies.",
    },
    {
      title: "Content Marketing Growth",
      category: "Engagement",
      growth: "+25%",
      description: "Content creation and storytelling continue to dominate brand strategies.",
    },
    {
      title: "AI-Powered Campaigns",
      category: "Innovation",
      growth: "+35%",
      description: "AI tools are automating personalization and customer segmentation.",
    },
  ];

  const salaryData = [
    { role: "Digital Marketing Manager", min: 75000, max: 140000, median: 95000 },
    { role: "SEO Specialist", min: 60000, max: 110000, median: 80000 },
    { role: "Content Strategist", min: 65000, max: 120000, median: 85000 },
    { role: "Social Media Manager", min: 55000, max: 100000, median: 72000 },
  ];

  const topSkills = [
    "SEO", "Google Analytics", "Content Strategy", "Social Media Marketing",
    "PPC Advertising", "Copywriting", "CRM Tools", "Email Marketing"
  ];

  return (
    <div className="gradient-bg min-h-screen pt-24 pb-16">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          <div className="flex items-center justify-between mb-8">
            <div>
              <h1 className="text-3xl font-bold text-foreground mb-2">Marketing Insights</h1>
              <p className="text-muted-foreground">Explore trends shaping the future of marketing and advertising</p>
            </div>
            <Button 
              variant="ghost" 
              onClick={() => setLocation("/")}
              data-testid="button-close"
            >
              <X className="h-5 w-5" />
            </Button>
          </div>

          {/* Key Metrics */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            <Card className="card-gradient text-center">
              <CardContent className="p-6">
                <div className="w-12 h-12 bg-primary/20 rounded-lg flex items-center justify-center mx-auto mb-3">
                  <TrendingUp className="text-primary text-xl" />
                </div>
                <div className="text-2xl font-bold text-foreground mb-1">+15%</div>
                <div className="text-sm text-muted-foreground">Marketing Industry Growth</div>
              </CardContent>
            </Card>

            <Card className="card-gradient text-center">
              <CardContent className="p-6">
                <div className="w-12 h-12 bg-primary/20 rounded-lg flex items-center justify-center mx-auto mb-3">
                  <DollarSign className="text-primary text-xl" />
                </div>
                <div className="text-2xl font-bold text-foreground mb-1">$85K</div>
                <div className="text-sm text-muted-foreground">Average Salary</div>
              </CardContent>
            </Card>

            <Card className="card-gradient text-center">
              <CardContent className="p-6">
                <div className="w-12 h-12 bg-primary/20 rounded-lg flex items-center justify-center mx-auto mb-3">
                  <Users className="text-primary text-xl" />
                </div>
                <div className="text-2xl font-bold text-foreground mb-1">1.2M</div>
                <div className="text-sm text-muted-foreground">Active Jobs</div>
              </CardContent>
            </Card>

            <Card className="card-gradient text-center">
              <CardContent className="p-6">
                <div className="w-12 h-12 bg-primary/20 rounded-lg flex items-center justify-center mx-auto mb-3">
                  <Briefcase className="text-primary text-xl" />
                </div>
                <div className="text-2xl font-bold text-foreground mb-1">55%</div>
                <div className="text-sm text-muted-foreground">Remote Positions</div>
              </CardContent>
            </Card>
          </div>

          {/* Market Trends */}
          <Card className="card-gradient mb-8">
            <CardHeader>
              <CardTitle className="text-lg text-foreground">Market Trends</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {trends.map((trend, index) => (
                  <div key={index} className="p-4 bg-muted/20 rounded-lg">
                    <div className="flex items-start justify-between mb-2">
                      <Badge variant="secondary" className="mb-2">{trend.category}</Badge>
                      <span className="text-green-500 font-semibold">{trend.growth}</span>
                    </div>
                    <h3 className="font-semibold text-foreground mb-2">{trend.title}</h3>
                    <p className="text-sm text-muted-foreground">{trend.description}</p>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Salary Data */}
          <Card className="card-gradient mb-8">
            <CardHeader>
              <CardTitle className="text-lg text-foreground">Salary Insights</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {salaryData.map((role, index) => (
                  <div key={index} className="flex items-center justify-between p-4 bg-muted/20 rounded-lg">
                    <div>
                      <h3 className="font-semibold text-foreground">{role.role}</h3>
                      <p className="text-sm text-muted-foreground">
                        ${role.min.toLocaleString()} - ${role.max.toLocaleString()}
                      </p>
                    </div>
                    <div className="text-right">
                      <div className="text-lg font-bold text-primary">
                        ${role.median.toLocaleString()}
                      </div>
                      <div className="text-sm text-muted-foreground">Median</div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Top Skills */}
          <Card className="card-gradient">
            <CardHeader>
              <CardTitle className="text-lg text-foreground">In-Demand Skills</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex flex-wrap gap-2">
                {topSkills.map((skill, index) => (
                  <Badge key={index} variant="outline" className="border-primary text-primary">
                    {skill}
                  </Badge>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
