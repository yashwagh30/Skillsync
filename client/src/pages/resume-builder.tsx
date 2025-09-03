import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Download, Plus, Wand2, X } from "lucide-react";
import { useLocation } from "wouter";

export default function ResumeBuilder() {
  const [personalInfo, setPersonalInfo] = useState({
    fullName: "John Doe",
    email: "john@example.com",
    phone: "+1 (555) 123-4567",
    location: "San Francisco, CA",
  });

  const [summary, setSummary] = useState(
    "Experienced software engineer with 5+ years developing scalable web applications..."
  );

  const [, setLocation] = useLocation();

  return (
    <div className="gradient-bg min-h-screen pt-24 pb-16">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          <div className="flex items-center justify-between mb-8">
            <div>
              <h1 className="text-3xl font-bold text-foreground mb-2">Resume Builder</h1>
              <p className="text-muted-foreground">Create ATS-optimized resumes with AI assistance</p>
            </div>
            <Button 
              variant="ghost" 
              onClick={() => setLocation("/")}
              data-testid="button-close"
            >
              <X className="h-5 w-5" />
            </Button>
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Resume Editor */}
            <div className="space-y-6">
              <Card className="card-gradient">
                <CardHeader>
                  <CardTitle className="text-lg text-foreground">Personal Information</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="fullName">Full Name</Label>
                      <Input
                        id="fullName"
                        value={personalInfo.fullName}
                        onChange={(e) => setPersonalInfo({...personalInfo, fullName: e.target.value})}
                        className="bg-input border-border"
                        data-testid="input-full-name"
                      />
                    </div>
                    <div>
                      <Label htmlFor="email">Email</Label>
                      <Input
                        id="email"
                        type="email"
                        value={personalInfo.email}
                        onChange={(e) => setPersonalInfo({...personalInfo, email: e.target.value})}
                        className="bg-input border-border"
                        data-testid="input-email"
                      />
                    </div>
                    <div>
                      <Label htmlFor="phone">Phone</Label>
                      <Input
                        id="phone"
                        value={personalInfo.phone}
                        onChange={(e) => setPersonalInfo({...personalInfo, phone: e.target.value})}
                        className="bg-input border-border"
                        data-testid="input-phone"
                      />
                    </div>
                    <div>
                      <Label htmlFor="location">Location</Label>
                      <Input
                        id="location"
                        value={personalInfo.location}
                        onChange={(e) => setPersonalInfo({...personalInfo, location: e.target.value})}
                        className="bg-input border-border"
                        data-testid="input-location"
                      />
                    </div>
                  </div>
                </CardContent>
              </Card>
              
              <Card className="card-gradient">
                <CardHeader className="flex flex-row items-center justify-between">
                  <CardTitle className="text-lg text-foreground">Professional Summary</CardTitle>
                  <Button variant="ghost" size="sm" className="text-primary hover:text-primary/80" data-testid="button-ai-generate">
                    <Wand2 className="h-4 w-4 mr-1" />
                    AI Generate
                  </Button>
                </CardHeader>
                <CardContent>
                  <Textarea
                    value={summary}
                    onChange={(e) => setSummary(e.target.value)}
                    className="h-24 bg-input border-border text-foreground resize-none"
                    placeholder="Enter your professional summary..."
                    data-testid="textarea-summary"
                  />
                </CardContent>
              </Card>
              
              <Card className="card-gradient">
                <CardHeader className="flex flex-row items-center justify-between">
                  <CardTitle className="text-lg text-foreground">Work Experience</CardTitle>
                  <Button variant="ghost" size="sm" className="text-primary hover:text-primary/80" data-testid="button-add-experience">
                    <Plus className="h-4 w-4 mr-1" />
                    Add Experience
                  </Button>
                </CardHeader>
                <CardContent>
                  <div className="border border-border rounded-lg p-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mb-3">
                      <Input
                        placeholder="Job Title"
                        defaultValue="Senior Software Engineer"
                        className="bg-input border-border"
                        data-testid="input-job-title"
                      />
                      <Input
                        placeholder="Company"
                        defaultValue="Tech Corp"
                        className="bg-input border-border"
                        data-testid="input-company"
                      />
                      <Input
                        placeholder="Start Date"
                        defaultValue="Jan 2020"
                        className="bg-input border-border"
                        data-testid="input-start-date"
                      />
                      <Input
                        placeholder="End Date"
                        defaultValue="Present"
                        className="bg-input border-border"
                        data-testid="input-end-date"
                      />
                    </div>
                    <Textarea
                      className="h-20 bg-input border-border text-foreground resize-none"
                      placeholder="Job description..."
                      defaultValue="• Led development of microservices architecture..."
                      data-testid="textarea-job-description"
                    />
                  </div>
                </CardContent>
              </Card>
            </div>
            
            {/* Resume Preview */}
            <Card className="card-gradient">
              <CardHeader className="flex flex-row items-center justify-between">
                <CardTitle className="text-lg text-foreground">Preview</CardTitle>
                <Button className="btn-primary" data-testid="button-download">
                  <Download className="h-4 w-4 mr-2" />
                  Download PDF
                </Button>
              </CardHeader>
              <CardContent>
                <div className="bg-white text-black p-6 rounded-lg min-h-[600px]">
                  <div className="text-center mb-4">
                    <h1 className="text-2xl font-bold">{personalInfo.fullName}</h1>
                    <p className="text-gray-600">Senior Software Engineer</p>
                    <p className="text-sm text-gray-500">
                      {personalInfo.email} • {personalInfo.phone} • {personalInfo.location}
                    </p>
                  </div>
                  
                  <div className="mb-4">
                    <h2 className="text-lg font-semibold border-b border-gray-300 mb-2">Professional Summary</h2>
                    <p className="text-sm text-gray-700">{summary}</p>
                  </div>
                  
                  <div className="mb-4">
                    <h2 className="text-lg font-semibold border-b border-gray-300 mb-2">Work Experience</h2>
                    <div className="mb-3">
                      <div className="flex justify-between items-start">
                        <div>
                          <h3 className="font-semibold">Senior Software Engineer</h3>
                          <p className="text-sm text-gray-600">Tech Corp</p>
                        </div>
                        <span className="text-sm text-gray-500">Jan 2020 - Present</span>
                      </div>
                      <ul className="text-sm text-gray-700 mt-2 list-disc list-inside">
                        <li>Led development of microservices architecture</li>
                        <li>Improved system performance by 40%</li>
                      </ul>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
