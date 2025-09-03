import { useState, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Download, Plus, Wand2, X, Trash2 } from "lucide-react";
import { useLocation } from "wouter";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";

interface PersonalInfo {
  fullName: string;
  email: string;
  phone: string;
  location: string;
  linkedin: string;
  github: string;
}

interface Education {
  id: string;
  degree: string;
  institution: string;
  year: string;
  gpa?: string;
}

interface Project {
  id: string;
  name: string;
  description: string;
  technologies: string;
  link?: string;
}

interface Certification {
  id: string;
  name: string;
  issuer: string;
  year: string;
}

export default function ResumeBuilder() {
  const [personalInfo, setPersonalInfo] = useState<PersonalInfo>({
    fullName: "",
    email: "",
    phone: "",
    location: "",
    linkedin: "",
    github: "",
  });

  const [summary, setSummary] = useState("");
  const [skills, setSkills] = useState("");
  
  const [education, setEducation] = useState<Education[]>([
    {
      id: "1",
      degree: "",
      institution: "",
      year: "",
      gpa: "",
    }
  ]);

  const [projects, setProjects] = useState<Project[]>([
    {
      id: "1",
      name: "",
      description: "",
      technologies: "",
      link: "",
    }
  ]);

  const [certifications, setCertifications] = useState<Certification[]>([
    {
      id: "1",
      name: "",
      issuer: "",
      year: "",
    }
  ]);

  const [isGeneratingPDF, setIsGeneratingPDF] = useState(false);
  const previewRef = useRef<HTMLDivElement>(null);
  const [, setLocation] = useLocation();

  const addEducation = () => {
    const newId = (education.length + 1).toString();
    setEducation([...education, {
      id: newId,
      degree: "",
      institution: "",
      year: "",
      gpa: "",
    }]);
  };

  const removeEducation = (id: string) => {
    if (education.length > 1) {
      setEducation(education.filter(edu => edu.id !== id));
    }
  };

  const updateEducation = (id: string, field: keyof Education, value: string) => {
    setEducation(education.map(edu => 
      edu.id === id ? { ...edu, [field]: value } : edu
    ));
  };

  const addProject = () => {
    const newId = (projects.length + 1).toString();
    setProjects([...projects, {
      id: newId,
      name: "",
      description: "",
      technologies: "",
      link: "",
    }]);
  };

  const removeProject = (id: string) => {
    if (projects.length > 1) {
      setProjects(projects.filter(proj => proj.id !== id));
    }
  };

  const updateProject = (id: string, field: keyof Project, value: string) => {
    setProjects(projects.map(proj => 
      proj.id === id ? { ...proj, [field]: value } : proj
    ));
  };

  const addCertification = () => {
    const newId = (certifications.length + 1).toString();
    setCertifications([...certifications, {
      id: newId,
      name: "",
      issuer: "",
      year: "",
    }]);
  };

  const removeCertification = (id: string) => {
    if (certifications.length > 1) {
      setCertifications(certifications.filter(cert => cert.id !== id));
    }
  };

  const updateCertification = (id: string, field: keyof Certification, value: string) => {
    setCertifications(certifications.map(cert => 
      cert.id === id ? { ...cert, [field]: value } : cert
    ));
  };

  const downloadPDF = async () => {
    if (!previewRef.current) return;

    setIsGeneratingPDF(true);
    try {
      const canvas = await html2canvas(previewRef.current, {
        scale: 2,
        backgroundColor: '#ffffff',
        useCORS: true,
        allowTaint: true,
      });

      const imgData = canvas.toDataURL('image/png');
      const pdf = new jsPDF({
        orientation: 'portrait',
        unit: 'mm',
        format: 'a4',
      });

      const imgWidth = 210;
      const pageHeight = 297;
      const imgHeight = (canvas.height * imgWidth) / canvas.width;
      let heightLeft = imgHeight;

      let position = 0;

      pdf.addImage(imgData, 'PNG', 0, position, imgWidth, imgHeight);
      heightLeft -= pageHeight;

      while (heightLeft >= 0) {
        position = heightLeft - imgHeight;
        pdf.addPage();
        pdf.addImage(imgData, 'PNG', 0, position, imgWidth, imgHeight);
        heightLeft -= pageHeight;
      }

      const fileName = personalInfo.fullName ? 
        `${personalInfo.fullName.replace(/\s+/g, '_')}_Resume.pdf` : 
        'Resume.pdf';
      
      pdf.save(fileName);
    } catch (error) {
      console.error('Error generating PDF:', error);
    } finally {
      setIsGeneratingPDF(false);
    }
  };

  return (
    <div className="gradient-bg min-h-screen pt-24 pb-16">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center justify-between mb-8">
            <div>
              <h1 className="text-3xl font-bold text-foreground mb-2">Resume Builder</h1>
              <p className="text-muted-foreground">Create ATS-optimized resumes with comprehensive sections</p>
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
            {/* Resume Editor */}
            <div className="lg:col-span-2 space-y-6">
              {/* Personal Information */}
              <Card className="card-gradient">
                <CardHeader>
                  <CardTitle className="text-lg text-foreground">Personal Information</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="md:col-span-2">
                      <Label htmlFor="fullName">Full Name *</Label>
                      <Input
                        id="fullName"
                        value={personalInfo.fullName}
                        onChange={(e) => setPersonalInfo({...personalInfo, fullName: e.target.value})}
                        className="bg-input border-border"
                        placeholder="John Doe"
                        data-testid="input-full-name"
                      />
                    </div>
                    <div>
                      <Label htmlFor="email">Email *</Label>
                      <Input
                        id="email"
                        type="email"
                        value={personalInfo.email}
                        onChange={(e) => setPersonalInfo({...personalInfo, email: e.target.value})}
                        className="bg-input border-border"
                        placeholder="john@example.com"
                        data-testid="input-email"
                      />
                    </div>
                    <div>
                      <Label htmlFor="phone">Phone *</Label>
                      <Input
                        id="phone"
                        value={personalInfo.phone}
                        onChange={(e) => setPersonalInfo({...personalInfo, phone: e.target.value})}
                        className="bg-input border-border"
                        placeholder="+1 (555) 123-4567"
                        data-testid="input-phone"
                      />
                    </div>
                    <div>
                      <Label htmlFor="location">Location *</Label>
                      <Input
                        id="location"
                        value={personalInfo.location}
                        onChange={(e) => setPersonalInfo({...personalInfo, location: e.target.value})}
                        className="bg-input border-border"
                        placeholder="San Francisco, CA"
                        data-testid="input-location"
                      />
                    </div>
                    <div>
                      <Label htmlFor="linkedin">LinkedIn</Label>
                      <Input
                        id="linkedin"
                        value={personalInfo.linkedin}
                        onChange={(e) => setPersonalInfo({...personalInfo, linkedin: e.target.value})}
                        className="bg-input border-border"
                        placeholder="linkedin.com/in/johndoe"
                        data-testid="input-linkedin"
                      />
                    </div>
                    <div>
                      <Label htmlFor="github">GitHub</Label>
                      <Input
                        id="github"
                        value={personalInfo.github}
                        onChange={(e) => setPersonalInfo({...personalInfo, github: e.target.value})}
                        className="bg-input border-border"
                        placeholder="github.com/johndoe"
                        data-testid="input-github"
                      />
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Professional Summary */}
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
                    className="h-32 bg-input border-border text-foreground resize-none"
                    placeholder="Write a compelling professional summary that highlights your key skills, experience, and career objectives..."
                    data-testid="textarea-summary"
                  />
                </CardContent>
              </Card>

              {/* Education */}
              <Card className="card-gradient">
                <CardHeader className="flex flex-row items-center justify-between">
                  <CardTitle className="text-lg text-foreground">Education</CardTitle>
                  <Button 
                    variant="ghost" 
                    size="sm" 
                    className="text-primary hover:text-primary/80" 
                    onClick={addEducation}
                    data-testid="button-add-education"
                  >
                    <Plus className="h-4 w-4 mr-1" />
                    Add Education
                  </Button>
                </CardHeader>
                <CardContent className="space-y-4">
                  {education.map((edu, index) => (
                    <div key={edu.id} className="border border-border rounded-lg p-4 relative">
                      {education.length > 1 && (
                        <Button
                          variant="ghost"
                          size="sm"
                          className="absolute top-2 right-2 text-destructive hover:text-destructive/80"
                          onClick={() => removeEducation(edu.id)}
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      )}
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                        <div>
                          <Label>Degree/Program</Label>
                          <Input
                            value={edu.degree}
                            onChange={(e) => updateEducation(edu.id, 'degree', e.target.value)}
                            className="bg-input border-border"
                            placeholder="Bachelor of Science in Computer Science"
                          />
                        </div>
                        <div>
                          <Label>Institution</Label>
                          <Input
                            value={edu.institution}
                            onChange={(e) => updateEducation(edu.id, 'institution', e.target.value)}
                            className="bg-input border-border"
                            placeholder="University of California"
                          />
                        </div>
                        <div>
                          <Label>Year</Label>
                          <Input
                            value={edu.year}
                            onChange={(e) => updateEducation(edu.id, 'year', e.target.value)}
                            className="bg-input border-border"
                            placeholder="2024"
                          />
                        </div>
                        <div>
                          <Label>GPA (Optional)</Label>
                          <Input
                            value={edu.gpa}
                            onChange={(e) => updateEducation(edu.id, 'gpa', e.target.value)}
                            className="bg-input border-border"
                            placeholder="3.8/4.0"
                          />
                        </div>
                      </div>
                    </div>
                  ))}
                </CardContent>
              </Card>

              {/* Technical Skills */}
              <Card className="card-gradient">
                <CardHeader>
                  <CardTitle className="text-lg text-foreground">Technical Skills</CardTitle>
                </CardHeader>
                <CardContent>
                  <Textarea
                    value={skills}
                    onChange={(e) => setSkills(e.target.value)}
                    className="h-32 bg-input border-border text-foreground resize-none"
                    placeholder="List your technical skills, programming languages, frameworks, tools, etc. Separate with commas or bullet points..."
                    data-testid="textarea-skills"
                  />
                </CardContent>
              </Card>

              {/* Technical Projects */}
              <Card className="card-gradient">
                <CardHeader className="flex flex-row items-center justify-between">
                  <CardTitle className="text-lg text-foreground">Technical Projects</CardTitle>
                  <Button 
                    variant="ghost" 
                    size="sm" 
                    className="text-primary hover:text-primary/80" 
                    onClick={addProject}
                    data-testid="button-add-project"
                  >
                    <Plus className="h-4 w-4 mr-1" />
                    Add Project
                  </Button>
                </CardHeader>
                <CardContent className="space-y-4">
                  {projects.map((project, index) => (
                    <div key={project.id} className="border border-border rounded-lg p-4 relative">
                      {projects.length > 1 && (
                        <Button
                          variant="ghost"
                          size="sm"
                          className="absolute top-2 right-2 text-destructive hover:text-destructive/80"
                          onClick={() => removeProject(project.id)}
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      )}
                      <div className="space-y-3">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                          <div>
                            <Label>Project Name</Label>
                            <Input
                              value={project.name}
                              onChange={(e) => updateProject(project.id, 'name', e.target.value)}
                              className="bg-input border-border"
                              placeholder="E-commerce Platform"
                            />
                          </div>
                          <div>
                            <Label>Technologies Used</Label>
                            <Input
                              value={project.technologies}
                              onChange={(e) => updateProject(project.id, 'technologies', e.target.value)}
                              className="bg-input border-border"
                              placeholder="React, Node.js, MongoDB"
                            />
                          </div>
                        </div>
                        <div>
                          <Label>Project Link (Optional)</Label>
                          <Input
                            value={project.link}
                            onChange={(e) => updateProject(project.id, 'link', e.target.value)}
                            className="bg-input border-border"
                            placeholder="https://github.com/username/project"
                          />
                        </div>
                        <div>
                          <Label>Description</Label>
                          <Textarea
                            value={project.description}
                            onChange={(e) => updateProject(project.id, 'description', e.target.value)}
                            className="h-20 bg-input border-border text-foreground resize-none"
                            placeholder="Describe your project, your role, key features, and achievements..."
                          />
                        </div>
                      </div>
                    </div>
                  ))}
                </CardContent>
              </Card>

              {/* Certifications */}
              <Card className="card-gradient">
                <CardHeader className="flex flex-row items-center justify-between">
                  <CardTitle className="text-lg text-foreground">Certifications</CardTitle>
                  <Button 
                    variant="ghost" 
                    size="sm" 
                    className="text-primary hover:text-primary/80" 
                    onClick={addCertification}
                    data-testid="button-add-certification"
                  >
                    <Plus className="h-4 w-4 mr-1" />
                    Add Certification
                  </Button>
                </CardHeader>
                <CardContent className="space-y-4">
                  {certifications.map((cert, index) => (
                    <div key={cert.id} className="border border-border rounded-lg p-4 relative">
                      {certifications.length > 1 && (
                        <Button
                          variant="ghost"
                          size="sm"
                          className="absolute top-2 right-2 text-destructive hover:text-destructive/80"
                          onClick={() => removeCertification(cert.id)}
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      )}
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                        <div>
                          <Label>Certification Name</Label>
                          <Input
                            value={cert.name}
                            onChange={(e) => updateCertification(cert.id, 'name', e.target.value)}
                            className="bg-input border-border"
                            placeholder="AWS Certified Developer"
                          />
                        </div>
                        <div>
                          <Label>Issuing Organization</Label>
                          <Input
                            value={cert.issuer}
                            onChange={(e) => updateCertification(cert.id, 'issuer', e.target.value)}
                            className="bg-input border-border"
                            placeholder="Amazon Web Services"
                          />
                        </div>
                        <div>
                          <Label>Year</Label>
                          <Input
                            value={cert.year}
                            onChange={(e) => updateCertification(cert.id, 'year', e.target.value)}
                            className="bg-input border-border"
                            placeholder="2024"
                          />
                        </div>
                      </div>
                    </div>
                  ))}
                </CardContent>
              </Card>
            </div>
            
            {/* Resume Preview */}
            <div className="lg:col-span-1">
              <Card className="card-gradient sticky top-24">
                <CardHeader className="flex flex-row items-center justify-between">
                  <CardTitle className="text-lg text-foreground">Preview</CardTitle>
                  <Button 
                    className="btn-primary" 
                    onClick={downloadPDF}
                    disabled={isGeneratingPDF}
                    data-testid="button-download"
                  >
                    <Download className="h-4 w-4 mr-2" />
                    {isGeneratingPDF ? "Generating..." : "Download PDF"}
                  </Button>
                </CardHeader>
                <CardContent>
                  <div ref={previewRef} className="bg-white text-black p-6 rounded-lg min-h-[600px] text-sm">
                    {/* Header */}
                    <div className="text-center mb-4 border-b border-gray-300 pb-4">
                      <h1 className="text-2xl font-bold text-gray-900">
                        {personalInfo.fullName || "Your Name"}
                      </h1>
                      <div className="text-sm text-gray-600 mt-2">
                        {personalInfo.email && <span>{personalInfo.email}</span>}
                        {personalInfo.phone && personalInfo.email && <span> • </span>}
                        {personalInfo.phone && <span>{personalInfo.phone}</span>}
                        {personalInfo.location && (personalInfo.email || personalInfo.phone) && <span> • </span>}
                        {personalInfo.location && <span>{personalInfo.location}</span>}
                      </div>
                      {(personalInfo.linkedin || personalInfo.github) && (
                        <div className="text-sm text-gray-600 mt-1">
                          {personalInfo.linkedin && <span>{personalInfo.linkedin}</span>}
                          {personalInfo.github && personalInfo.linkedin && <span> • </span>}
                          {personalInfo.github && <span>{personalInfo.github}</span>}
                        </div>
                      )}
                    </div>

                    {/* Professional Summary */}
                    {summary && (
                      <div className="mb-4">
                        <h2 className="text-lg font-semibold border-b border-gray-300 mb-2 text-gray-900">Professional Summary</h2>
                        <p className="text-sm text-gray-700 leading-relaxed">{summary}</p>
                      </div>
                    )}

                    {/* Technical Skills */}
                    {skills && (
                      <div className="mb-4">
                        <h2 className="text-lg font-semibold border-b border-gray-300 mb-2 text-gray-900">Technical Skills</h2>
                        <p className="text-sm text-gray-700 leading-relaxed">{skills}</p>
                      </div>
                    )}

                    {/* Education */}
                    {education.some(edu => edu.degree || edu.institution) && (
                      <div className="mb-4">
                        <h2 className="text-lg font-semibold border-b border-gray-300 mb-2 text-gray-900">Education</h2>
                        {education.map((edu, index) => (
                          (edu.degree || edu.institution) && (
                            <div key={edu.id} className="mb-3">
                              <div className="flex justify-between items-start">
                                <div>
                                  <h3 className="font-semibold text-gray-900">{edu.degree}</h3>
                                  <p className="text-sm text-gray-600">{edu.institution}</p>
                                </div>
                                <div className="text-right text-sm text-gray-600">
                                  <span>{edu.year}</span>
                                  {edu.gpa && <div>GPA: {edu.gpa}</div>}
                                </div>
                              </div>
                            </div>
                          )
                        ))}
                      </div>
                    )}

                    {/* Technical Projects */}
                    {projects.some(proj => proj.name || proj.description) && (
                      <div className="mb-4">
                        <h2 className="text-lg font-semibold border-b border-gray-300 mb-2 text-gray-900">Technical Projects</h2>
                        {projects.map((project, index) => (
                          (project.name || project.description) && (
                            <div key={project.id} className="mb-3">
                              <div className="flex justify-between items-start mb-1">
                                <h3 className="font-semibold text-gray-900">{project.name}</h3>
                                {project.technologies && (
                                  <span className="text-sm text-gray-600">{project.technologies}</span>
                                )}
                              </div>
                              {project.link && (
                                <p className="text-sm text-blue-600 mb-1">{project.link}</p>
                              )}
                              {project.description && (
                                <p className="text-sm text-gray-700 leading-relaxed">{project.description}</p>
                              )}
                            </div>
                          )
                        ))}
                      </div>
                    )}

                    {/* Certifications */}
                    {certifications.some(cert => cert.name || cert.issuer) && (
                      <div className="mb-4">
                        <h2 className="text-lg font-semibold border-b border-gray-300 mb-2 text-gray-900">Certifications</h2>
                        {certifications.map((cert, index) => (
                          (cert.name || cert.issuer) && (
                            <div key={cert.id} className="mb-2">
                              <div className="flex justify-between items-center">
                                <div>
                                  <span className="font-semibold text-gray-900">{cert.name}</span>
                                  {cert.issuer && <span className="text-sm text-gray-600"> - {cert.issuer}</span>}
                                </div>
                                {cert.year && <span className="text-sm text-gray-600">{cert.year}</span>}
                              </div>
                            </div>
                          )
                        ))}
                      </div>
                    )}
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