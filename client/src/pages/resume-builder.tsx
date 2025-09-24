import { useState, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Download, Plus, Wand2, Trash2, Loader2 } from "lucide-react";

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

interface Experience {
  id: string;
  title: string;
  company: string;
  start: string;
  end: string;
  description: string;
}

interface Achievement {
  id: string;
  text: string;
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
    },
  ]);

  const [experience, setExperience] = useState<Experience[]>([
    {
      id: "1",
      title: "",
      company: "",
      start: "",
      end: "",
      description: "",
    },
  ]);

  const [projects, setProjects] = useState<Project[]>([
    {
      id: "1",
      name: "",
      description: "",
      technologies: "",
      link: "",
    },
  ]);

  const [certifications, setCertifications] = useState<Certification[]>([
    {
      id: "1",
      name: "",
      issuer: "",
      year: "",
    },
  ]);

  const [achievements, setAchievements] = useState<Achievement[]>([
    {
      id: "1",
      text: "",
    },
  ]);

  const [isGeneratingPDF, setIsGeneratingPDF] = useState(false);
  const [isGeneratingAI, setIsGeneratingAI] = useState(false);
  const [aiField, setAiField] = useState<string>("");
  const previewRef = useRef<HTMLDivElement>(null);

  // Common degree options
  const degreeOptions = [
    "Bachelor of Science (B.S.)",
    "Bachelor of Arts (B.A.)",
    "Bachelor of Engineering (B.E.)",
    "Bachelor of Technology (B.Tech)",
    "Bachelor of Computer Science (B.C.S.)",
    "Master of Science (M.S.)",
    "Master of Arts (M.A.)",
    "Master of Engineering (M.E.)",
    "Master of Technology (M.Tech)",
    "Master of Computer Applications (M.C.A.)",
    "Master of Business Administration (M.B.A.)",
    "Doctor of Philosophy (Ph.D.)",
    "Associate Degree",
    "Certificate Program",
    "High School Diploma",
    "Other",
  ];

  const [customDegrees, setCustomDegrees] = useState<{ [key: string]: string }>(
    {}
  );

  // AI Enhancement functions (kept simple / simulated)
  const generateAISummary = async () => {
    setIsGeneratingAI(true);
    setAiField("summary");

    await new Promise((resolve) => setTimeout(resolve, 1200));

    const aiSummary = `Dedicated and results-driven software engineer with ${
      education.length > 0 ? "3+" : "2+"
    } years of experience in full-stack development. Proficient in modern web technologies including React, Node.js, and cloud platforms. Proven track record of delivering scalable solutions and improving system performance. Strong collaborative skills with experience in agile development environments.`;

    setSummary(aiSummary);
    setIsGeneratingAI(false);
    setAiField("");
  };

  const enhanceSummary = async () => {
    if (!summary.trim()) {
      alert("Please write some content in the summary field first.");
      return;
    }

    setIsGeneratingAI(true);
    setAiField("summary-enhance");

    await new Promise((resolve) => setTimeout(resolve, 1000));

    const enhancedSummary =
      summary +
      " Demonstrated ability to work effectively in fast-paced environments while maintaining attention to detail and delivering high-quality solutions.";

    setSummary(enhancedSummary);
    setIsGeneratingAI(false);
    setAiField("");
  };

  const enhanceProjectDescription = async (projectId: string) => {
    setIsGeneratingAI(true);
    setAiField(`project-${projectId}`);

    await new Promise((resolve) => setTimeout(resolve, 1200));

    const project = projects.find((p) => p.id === projectId);
    if (project) {
      const enhancedDescription = `Developed and deployed a comprehensive ${
        project.name.toLowerCase() || "web application"
      } using modern technologies including ${
        project.technologies || "React, Node.js, and MongoDB"
      }. Implemented responsive design principles and optimized database queries, resulting in faster load times. Collaborated with a team using agile methodologies.`;

      updateProject(projectId, "description", enhancedDescription);
    }

    setIsGeneratingAI(false);
    setAiField("");
  };

  // Education helpers
  const addEducation = () => {
    const newId = (education.length + 1).toString();
    setEducation([
      ...education,
      { id: newId, degree: "", institution: "", year: "", gpa: "" },
    ]);
  };
  const removeEducation = (id: string) => {
    if (education.length > 1)
      setEducation(education.filter((e) => e.id !== id));
  };
  const updateEducation = (
    id: string,
    field: keyof Education,
    value: string
  ) => {
    setEducation(
      education.map((e) => (e.id === id ? { ...e, [field]: value } : e))
    );
  };

  // Experience helpers
  const addExperience = () => {
    const newId = (experience.length + 1).toString();
    setExperience([
      ...experience,
      {
        id: newId,
        title: "",
        company: "",
        start: "",
        end: "",
        description: "",
      },
    ]);
  };
  const removeExperience = (id: string) => {
    if (experience.length > 1)
      setExperience(experience.filter((ex) => ex.id !== id));
  };
  const updateExperience = (
    id: string,
    field: keyof Experience,
    value: string
  ) => {
    setExperience(
      experience.map((ex) => (ex.id === id ? { ...ex, [field]: value } : ex))
    );
  };

  // Project helpers
  const addProject = () => {
    const newId = (projects.length + 1).toString();
    setProjects([
      ...projects,
      { id: newId, name: "", description: "", technologies: "", link: "" },
    ]);
  };
  const removeProject = (id: string) => {
    if (projects.length > 1) setProjects(projects.filter((p) => p.id !== id));
  };
  const updateProject = (id: string, field: keyof Project, value: string) => {
    setProjects(
      projects.map((p) => (p.id === id ? { ...p, [field]: value } : p))
    );
  };

  // Certification helpers
  const addCertification = () => {
    const newId = (certifications.length + 1).toString();
    setCertifications([
      ...certifications,
      { id: newId, name: "", issuer: "", year: "" },
    ]);
  };
  const removeCertification = (id: string) => {
    if (certifications.length > 1)
      setCertifications(certifications.filter((c) => c.id !== id));
  };
  const updateCertification = (
    id: string,
    field: keyof Certification,
    value: string
  ) => {
    setCertifications(
      certifications.map((c) => (c.id === id ? { ...c, [field]: value } : c))
    );
  };

  // Achievement helpers
  const addAchievement = () => {
    const newId = (achievements.length + 1).toString();
    setAchievements([...achievements, { id: newId, text: "" }]);
  };
  const removeAchievement = (id: string) => {
    if (achievements.length > 1)
      setAchievements(achievements.filter((a) => a.id !== id));
  };
  const updateAchievement = (id: string, value: string) => {
    setAchievements(
      achievements.map((a) => (a.id === id ? { ...a, text: value } : a))
    );
  };

  // PDF download
  const downloadPDF = () => {
    if (!previewRef.current) return;

    setIsGeneratingPDF(true);

    try {
      const printWindow = window.open("", "_blank");
      if (!printWindow) throw new Error("Unable to open print window");

      const resumeContent = previewRef.current.innerHTML;

      printWindow.document.write(`
        <!DOCTYPE html>
        <html>
        <head>
          <title>${personalInfo.fullName || "Resume"}</title>
          <style>
            @page { size: A4; margin: 0.5in; }
            * { margin: 0; padding: 0; box-sizing: border-box; }
            body { font-family: 'Times New Roman', Times, serif; font-size: 11pt; line-height: 1.4; color: #000; background: white; -webkit-print-color-adjust: exact; print-color-adjust: exact; }
            .resume-container { max-width: 8.5in; margin: 0 auto; background: white; padding: 0; }
            .header { text-align: center; padding-bottom: 12pt; margin-bottom: 16pt; }
            .name { font-size: 18pt; font-weight: bold; margin-bottom: 6pt; text-transform: uppercase; letter-spacing: 1pt; }
            .contact-info { font-size: 10pt; margin-bottom: 4pt; }
            .section-header { font-size: 12pt; font-weight: bold; text-transform: uppercase; border-bottom: 1pt solid #000000; padding-bottom: 2pt; margin-top: 14pt; margin-bottom: 8pt; letter-spacing: 0.5pt; }
            .section-content { margin-bottom: 12pt; padding-left: 0; }
            .education-item, .project-item, .cert-item { margin-bottom: 10pt; page-break-inside: avoid; }
            .item-header { display: flex; justify-content: space-between; align-items: flex-start; margin-bottom: 2pt; }
            .item-title { font-weight: bold; font-size: 11pt; }
            .item-subtitle { font-size: 10pt; margin-bottom: 2pt; }
            .item-date { font-size: 10pt; font-weight: normal; }
            .description { text-align: justify; hyphens: auto; margin-top: 4pt; }
            .tech-stack { font-style: italic; font-size: 10pt; margin-bottom: 2pt; }
            .no-print { display: none !important; }
            @media print { body { font-size: 11pt; line-height: 1.3; } .no-print { display: none !important; } }
          </style>
        </head>
        <body>
          <div class="resume-container">
            ${resumeContent}
          </div>
          <script>window.onload=function(){window.print(); setTimeout(()=>window.close(),1000);}</script>
        </body>
        </html>
      `);

      printWindow.document.close();
    } catch (error) {
      console.error("Error generating PDF:", error);
      alert("Error generating PDF. Please try again.");
    } finally {
      setIsGeneratingPDF(false);
    }
  };

  return (
    <div className="min-h-screen bg-[hsl(240,10%,3.9%)] pt-24 pb-16">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center justify-between mb-8">
            <div>
              <h1 className="text-3xl font-bold text-white mb-2">
                Professional Resume Builder
              </h1>
              <p className="text-gray-400">
                Create LaTeX-style, ATS-optimized resumes with AI assistance
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-2 space-y-6">
              {/* Personal Information Card */}
              <Card className="bg-[hsl(240,10%,8%)] border-gray-800">
                <CardHeader>
                  <CardTitle className="text-lg text-white">
                    Personal Information
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="md:col-span-2">
                      <Label htmlFor="fullName" className="text-gray-300">
                        Full Name *
                      </Label>
                      <Input
                        id="fullName"
                        value={personalInfo.fullName}
                        onChange={(e) =>
                          setPersonalInfo({
                            ...personalInfo,
                            fullName: e.target.value,
                          })
                        }
                        className="bg-[hsl(240,10%,3.9%)] border-gray-700 text-white"
                        placeholder="Your Name"
                      />
                    </div>
                    <div>
                      <Label htmlFor="email" className="text-gray-300">
                        Email *
                      </Label>
                      <Input
                        id="email"
                        type="email"
                        value={personalInfo.email}
                        onChange={(e) =>
                          setPersonalInfo({
                            ...personalInfo,
                            email: e.target.value,
                          })
                        }
                        className="bg-[hsl(240,10%,3.9%)] border-gray-700 text-white"
                        placeholder="name@example.com"
                      />
                    </div>
                    <div>
                      <Label htmlFor="phone" className="text-gray-300">
                        Phone *
                      </Label>
                      <Input
                        id="phone"
                        value={personalInfo.phone}
                        onChange={(e) =>
                          setPersonalInfo({
                            ...personalInfo,
                            phone: e.target.value,
                          })
                        }
                        className="bg-[hsl(240,10%,3.9%)] border-gray-700 text-white"
                        placeholder="+91-XXXXXX-XXXXX"
                      />
                    </div>
                    <div>
                      <Label htmlFor="location" className="text-gray-300">
                        Location *
                      </Label>
                      <Input
                        id="location"
                        value={personalInfo.location}
                        onChange={(e) =>
                          setPersonalInfo({
                            ...personalInfo,
                            location: e.target.value,
                          })
                        }
                        className="bg-[hsl(240,10%,3.9%)] border-gray-700 text-white"
                        placeholder="Delhi, India"
                      />
                    </div>
                    <div>
                      <Label htmlFor="linkedin" className="text-gray-300">
                        LinkedIn
                      </Label>
                      <Input
                        id="linkedin"
                        value={personalInfo.linkedin}
                        onChange={(e) =>
                          setPersonalInfo({
                            ...personalInfo,
                            linkedin: e.target.value,
                          })
                        }
                        className="bg-[hsl(240,10%,3.9%)] border-gray-700 text-white"
                        placeholder="linkedin.com/in/your-id"
                      />
                    </div>
                    <div>
                      <Label htmlFor="github" className="text-gray-300">
                        GitHub
                      </Label>
                      <Input
                        id="github"
                        value={personalInfo.github}
                        onChange={(e) =>
                          setPersonalInfo({
                            ...personalInfo,
                            github: e.target.value,
                          })
                        }
                        className="bg-[hsl(240,10%,3.9%)] border-gray-700 text-white"
                        placeholder="github.com/your-id"
                      />
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Professional Summary */}
              <Card className="bg-[hsl(240,10%,8%)] border-gray-800">
                <CardHeader className="flex flex-row items-center justify-between">
                  <CardTitle className="text-lg text-white">
                    Professional Summary
                  </CardTitle>
                  <div className="flex gap-2">
                    <Button
                      variant="outline"
                      size="sm"
                      className="border-[hsl(24,95%,53%)] text-[hsl(24,95%,53%)] hover:bg-[hsl(24,95%,53%)] hover:text-white"
                      onClick={generateAISummary}
                      disabled={isGeneratingAI}
                    >
                      {isGeneratingAI && aiField === "summary" ? (
                        <Loader2 className="h-4 w-4 mr-1 animate-spin" />
                      ) : (
                        <Wand2 className="h-4 w-4 mr-1" />
                      )}
                      AI Generate
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      className="border-green-500 text-green-500 hover:bg-green-500 hover:text-white"
                      onClick={enhanceSummary}
                      disabled={isGeneratingAI || !summary.trim()}
                    >
                      {isGeneratingAI && aiField === "summary-enhance" ? (
                        <Loader2 className="h-4 w-4 mr-1 animate-spin" />
                      ) : (
                        <Wand2 className="h-4 w-4 mr-1" />
                      )}
                      AI Enhance
                    </Button>
                  </div>
                </CardHeader>
                <CardContent>
                  <Textarea
                    value={summary}
                    onChange={(e) => setSummary(e.target.value)}
                    className="h-32 bg-[hsl(240,10%,3.9%)] border-gray-700 text-white resize-none"
                    placeholder="(Optional) Write a compelling professional summary that highlights your key skills, experience, and career objectives..."
                  />
                </CardContent>
              </Card>

              {/* Education (moved before Technical Skills) */}
              <Card className="bg-[hsl(240,10%,8%)] border-gray-800">
                <CardHeader className="flex flex-row items-center justify-between">
                  <CardTitle className="text-lg text-white">
                    Education
                  </CardTitle>
                  <Button
                    variant="outline"
                    size="sm"
                    className="border-[hsl(24,95%,53%)] text-[hsl(24,95%,53%)] hover:bg-[hsl(24,95%,53%)] hover:text-white"
                    onClick={addEducation}
                  >
                    <Plus className="h-4 w-4 mr-1" />
                    Add Education
                  </Button>
                </CardHeader>
                <CardContent className="space-y-4">
                  {education.map((edu) => (
                    <div
                      key={edu.id}
                      className="border border-gray-700 rounded-lg p-4 relative"
                    >
                      {education.length > 1 && (
                        <Button
                          variant="ghost"
                          size="sm"
                          className="absolute top-2 right-2 text-red-400 hover:text-red-300"
                          onClick={() => removeEducation(edu.id)}
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      )}
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                        <div>
                          <Label className="text-gray-300">
                            Degree/Program
                          </Label>
                          <select
                            value={edu.degree}
                            onChange={(e) => {
                              updateEducation(edu.id, "degree", e.target.value);
                              if (e.target.value !== "Other") {
                                setCustomDegrees((prev) => ({
                                  ...prev,
                                  [edu.id]: "",
                                }));
                              }
                            }}
                            className="w-full bg-[hsl(240,10%,3.9%)] border border-gray-700 text-white rounded-md px-3 py-2 text-sm"
                          >
                            <option value="">Select Degree</option>
                            {degreeOptions.map((degree) => (
                              <option key={degree} value={degree}>
                                {degree}
                              </option>
                            ))}
                          </select>
                          {edu.degree === "Other" && (
                            <Input
                              value={customDegrees[edu.id] || ""}
                              onChange={(e) =>
                                setCustomDegrees((prev) => ({
                                  ...prev,
                                  [edu.id]: e.target.value,
                                }))
                              }
                              className="bg-[hsl(240,10%,3.9%)] border-gray-700 text-white mt-2"
                              placeholder="Enter your degree"
                            />
                          )}
                        </div>
                        <div>
                          <Label className="text-gray-300">Institution</Label>
                          <Input
                            value={edu.institution}
                            onChange={(e) =>
                              updateEducation(
                                edu.id,
                                "institution",
                                e.target.value
                              )
                            }
                            className="bg-[hsl(240,10%,3.9%)] border-gray-700 text-white"
                            placeholder="Your University Name"
                          />
                        </div>
                        <div>
                          <Label className="text-gray-300">Year</Label>
                          <Input
                            value={edu.year}
                            onChange={(e) =>
                              updateEducation(edu.id, "year", e.target.value)
                            }
                            className="bg-[hsl(240,10%,3.9%)] border-gray-700 text-white"
                            placeholder="20XX"
                          />
                        </div>
                        <div>
                          <Label className="text-gray-300">
                            GPA (Optional)
                          </Label>
                          <Input
                            value={edu.gpa}
                            onChange={(e) =>
                              updateEducation(edu.id, "gpa", e.target.value)
                            }
                            className="bg-[hsl(240,10%,3.9%)] border-gray-700 text-white"
                            placeholder="/10.0 or /4.0"
                          />
                        </div>
                      </div>
                    </div>
                  ))}
                </CardContent>
              </Card>

              {/* Technical Skills (after Education) */}
              <Card className="bg-[hsl(240,10%,8%)] border-gray-800">
                <CardHeader>
                  <CardTitle className="text-lg text-white">
                    Technical Skills
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <Textarea
                    value={skills}
                    onChange={(e) => setSkills(e.target.value)}
                    className="h-32 bg-[hsl(240,10%,3.9%)] border-gray-700 text-white resize-none"
                    placeholder="List your technical skills, programming languages, frameworks, tools, etc..."
                  />
                </CardContent>
              </Card>

              {/* Experience (NEW) */}
              <Card className="bg-[hsl(240,10%,8%)] border-gray-800">
                <CardHeader className="flex flex-row items-center justify-between">
                  <CardTitle className="text-lg text-white">
                    Experience
                  </CardTitle>
                  <Button
                    variant="outline"
                    size="sm"
                    className="border-[hsl(24,95%,53%)] text-[hsl(24,95%,53%)] hover:bg-[hsl(24,95%,53%)] hover:text-white"
                    onClick={addExperience}
                  >
                    <Plus className="h-4 w-4 mr-1" />
                    Add Experience
                  </Button>
                </CardHeader>
                <CardContent className="space-y-4">
                  {experience.map((ex) => (
                    <div
                      key={ex.id}
                      className="border border-gray-700 rounded-lg p-4 relative"
                    >
                      {experience.length > 1 && (
                        <Button
                          variant="ghost"
                          size="sm"
                          className="absolute top-2 right-2 text-red-400 hover:text-red-300"
                          onClick={() => removeExperience(ex.id)}
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      )}
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                        <div>
                          <Label className="text-gray-300">
                            Job Title / Role
                          </Label>
                          <Input
                            value={ex.title}
                            onChange={(e) =>
                              updateExperience(ex.id, "title", e.target.value)
                            }
                            className="bg-[hsl(240,10%,3.9%)] border-gray-700 text-white"
                            placeholder="Your Role (e.g., Software Engineer)"
                          />
                        </div>
                        <div>
                          <Label className="text-gray-300">Company</Label>
                          <Input
                            value={ex.company}
                            onChange={(e) =>
                              updateExperience(ex.id, "company", e.target.value)
                            }
                            className="bg-[hsl(240,10%,3.9%)] border-gray-700 text-white"
                            placeholder="Company Name"
                          />
                        </div>
                        <div>
                          <Label className="text-gray-300">Start</Label>
                          <Input
                            value={ex.start}
                            onChange={(e) =>
                              updateExperience(ex.id, "start", e.target.value)
                            }
                            className="bg-[hsl(240,10%,3.9%)] border-gray-700 text-white"
                            placeholder="Month 20XX"
                          />
                        </div>
                        <div>
                          <Label className="text-gray-300">
                            End (or Present)
                          </Label>
                          <Input
                            value={ex.end}
                            onChange={(e) =>
                              updateExperience(ex.id, "end", e.target.value)
                            }
                            className="bg-[hsl(240,10%,3.9%)] border-gray-700 text-white"
                            placeholder="Present/Month 20XX"
                          />
                        </div>
                        <div className="md:col-span-2">
                          <Label className="text-gray-300">Description</Label>
                          <Textarea
                            value={ex.description}
                            onChange={(e) =>
                              updateExperience(
                                ex.id,
                                "description",
                                e.target.value
                              )
                            }
                            className="h-24 bg-[hsl(240,10%,3.9%)] border-gray-700 text-white resize-none"
                            placeholder="Describe your responsibilities and achievements..."
                          />
                        </div>
                      </div>
                    </div>
                  ))}
                </CardContent>
              </Card>

              {/* Technical Projects */}
              <Card className="bg-[hsl(240,10%,8%)] border-gray-800">
                <CardHeader className="flex flex-row items-center justify-between">
                  <CardTitle className="text-lg text-white">
                    Technical Projects
                  </CardTitle>
                  <Button
                    variant="outline"
                    size="sm"
                    className="border-[hsl(24,95%,53%)] text-[hsl(24,95%,53%)] hover:bg-[hsl(24,95%,53%)] hover:text-white"
                    onClick={addProject}
                  >
                    <Plus className="h-4 w-4 mr-1" />
                    Add Project
                  </Button>
                </CardHeader>
                <CardContent className="space-y-4">
                  {projects.map((project) => (
                    <div
                      key={project.id}
                      className="border border-gray-700 rounded-lg p-4 relative"
                    >
                      {projects.length > 1 && (
                        <Button
                          variant="ghost"
                          size="sm"
                          className="absolute top-2 right-2 text-red-400 hover:text-red-300"
                          onClick={() => removeProject(project.id)}
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      )}
                      <div className="space-y-3">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                          <div>
                            <Label className="text-gray-300">
                              Project Name
                            </Label>
                            <Input
                              value={project.name}
                              onChange={(e) =>
                                updateProject(
                                  project.id,
                                  "name",
                                  e.target.value
                                )
                              }
                              className="bg-[hsl(240,10%,3.9%)] border-gray-700 text-white"
                              placeholder="Project Title"
                            />
                          </div>
                          <div>
                            <Label className="text-gray-300">
                              Technologies Used
                            </Label>
                            <Input
                              value={project.technologies}
                              onChange={(e) =>
                                updateProject(
                                  project.id,
                                  "technologies",
                                  e.target.value
                                )
                              }
                              className="bg-[hsl(240,10%,3.9%)] border-gray-700 text-white"
                              placeholder="Technologies Used (e.g., React, Node.js)"
                            />
                          </div>
                        </div>
                        <div>
                          <Label className="text-gray-300">
                            Project Link (Optional)
                          </Label>
                          <Input
                            value={project.link}
                            onChange={(e) =>
                              updateProject(project.id, "link", e.target.value)
                            }
                            className="bg-[hsl(240,10%,3.9%)] border-gray-700 text-white"
                            placeholder="https://github.com/username/project"
                          />
                        </div>
                        <div>
                          <div className="flex items-center justify-between">
                            <Label className="text-gray-300">Description</Label>
                            <Button
                              variant="ghost"
                              size="sm"
                              className="text-[hsl(24,95%,53%)] hover:bg-[hsl(24,95%,53%)] hover:text-white text-xs"
                              onClick={() =>
                                enhanceProjectDescription(project.id)
                              }
                              disabled={isGeneratingAI}
                            >
                              {isGeneratingAI &&
                              aiField === `project-${project.id}` ? (
                                <Loader2 className="h-3 w-3 mr-1 animate-spin" />
                              ) : (
                                <Wand2 className="h-3 w-3 mr-1" />
                              )}
                              AI Enhance
                            </Button>
                          </div>
                          <Textarea
                            value={project.description}
                            onChange={(e) =>
                              updateProject(
                                project.id,
                                "description",
                                e.target.value
                              )
                            }
                            className="h-20 bg-[hsl(240,10%,3.9%)] border-gray-700 text-white resize-none"
                            placeholder="Describe your project, your role, key features, and achievements..."
                          />
                        </div>
                      </div>
                    </div>
                  ))}
                </CardContent>
              </Card>

              {/* Certifications */}
              <Card className="bg-[hsl(240,10%,8%)] border-gray-800">
                <CardHeader className="flex flex-row items-center justify-between">
                  <CardTitle className="text-lg text-white">
                    Certifications
                  </CardTitle>
                  <Button
                    variant="outline"
                    size="sm"
                    className="border-[hsl(24,95%,53%)] text-[hsl(24,95%,53%)] hover:bg-[hsl(24,95%,53%)] hover:text-white"
                    onClick={addCertification}
                  >
                    <Plus className="h-4 w-4 mr-1" />
                    Add Certification
                  </Button>
                </CardHeader>
                <CardContent className="space-y-4">
                  {certifications.map((cert) => (
                    <div
                      key={cert.id}
                      className="border border-gray-700 rounded-lg p-4 relative"
                    >
                      {certifications.length > 1 && (
                        <Button
                          variant="ghost"
                          size="sm"
                          className="absolute top-2 right-2 text-red-400 hover:text-red-300"
                          onClick={() => removeCertification(cert.id)}
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      )}
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                        <div>
                          <Label className="text-gray-300">
                            Certification Name
                          </Label>
                          <Input
                            value={cert.name}
                            onChange={(e) =>
                              updateCertification(
                                cert.id,
                                "name",
                                e.target.value
                              )
                            }
                            className="bg-[hsl(240,10%,3.9%)] border-gray-700 text-white"
                            placeholder="(eg: AWS Certified Developer)"
                          />
                        </div>
                        <div>
                          <Label className="text-gray-300">
                            Issuing Organization
                          </Label>
                          <Input
                            value={cert.issuer}
                            onChange={(e) =>
                              updateCertification(
                                cert.id,
                                "issuer",
                                e.target.value
                              )
                            }
                            className="bg-[hsl(240,10%,3.9%)] border-gray-700 text-white"
                            placeholder="Certifying Authority (e.g., AWS)"
                          />
                        </div>
                        <div>
                          <Label className="text-gray-300">Year of completion</Label>
                          <Input
                            value={cert.year}
                            onChange={(e) =>
                              updateCertification(
                                cert.id,
                                "year",
                                e.target.value
                              )
                            }
                            className="bg-[hsl(240,10%,3.9%)] border-gray-700 text-white"
                            placeholder="20XX"
                          />
                        </div>
                      </div>
                    </div>
                  ))}
                </CardContent>
              </Card>

              {/* Achievements (NEW) */}
              <Card className="bg-[hsl(240,10%,8%)] border-gray-800">
                <CardHeader className="flex flex-row items-center justify-between">
                  <CardTitle className="text-lg text-white">
                    Achievements
                  </CardTitle>
                  <Button
                    variant="outline"
                    size="sm"
                    className="border-[hsl(24,95%,53%)] text-[hsl(24,95%,53%)] hover:bg-[hsl(24,95%,53%)] hover:text-white"
                    onClick={addAchievement}
                  >
                    <Plus className="h-4 w-4 mr-1" />
                    Add Achievement
                  </Button>
                </CardHeader>
                <CardContent className="space-y-4">
                  {achievements.map((a) => (
                    <div
                      key={a.id}
                      className="border border-gray-700 rounded-lg p-4 relative"
                    >
                      {achievements.length > 1 && (
                        <Button
                          variant="ghost"
                          size="sm"
                          className="absolute top-2 right-2 text-red-400 hover:text-red-300"
                          onClick={() => removeAchievement(a.id)}
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      )}
                      <div>
                        <Label className="text-gray-300">Achievement</Label>
                        <Input
                          value={a.text}
                          onChange={(e) =>
                            updateAchievement(a.id, e.target.value)
                          }
                          className="bg-[hsl(240,10%,3.9%)] border-gray-700 text-white"
                          placeholder="Won hackathon, Published paper, etc."
                        />
                      </div>
                    </div>
                  ))}
                </CardContent>
              </Card>
            </div>

            {/* Resume Preview - LaTeX Style */}
            <div className="lg:col-span-1">
              <Card className="bg-[hsl(240,10%,8%)] border-gray-800 sticky top-24">
                <CardHeader className="flex flex-row items-center justify-between">
                  <CardTitle className="text-lg text-white">
                    LaTeX Preview
                  </CardTitle>
                  <Button
                    className="bg-[hsl(24,95%,53%)] text-white hover:bg-[hsl(24,95%,48%)]"
                    onClick={downloadPDF}
                    disabled={isGeneratingPDF}
                  >
                    <Download className="h-4 w-4 mr-2" />
                    {isGeneratingPDF ? "Generating..." : "Download PDF"}
                  </Button>
                </CardHeader>
                <CardContent>
                  <div
                    ref={previewRef}
                    className="bg-white rounded-lg shadow-lg min-h-[700px] p-8"
                  >
                    {/* HEADER SECTION */}
                    <div className="header">
                      <div className="name">
                        {personalInfo.fullName || "Your Name"}
                      </div>
                      <div className="contact-info">
                        {(() => {
                          const contacts: any[] = [];
                          if (personalInfo.email)
                            contacts.push(
                              <a
                                key="email"
                                href={`mailto:${personalInfo.email}`}
                                style={{
                                  color: "inherit",
                                  textDecoration: "none",
                                }}
                              >
                                {personalInfo.email}
                              </a>
                            );
                          if (personalInfo.phone)
                            contacts.push(personalInfo.phone);
                          if (personalInfo.location)
                            contacts.push(personalInfo.location);
                          if (personalInfo.linkedin)
                            contacts.push(
                              <a
                                key="linkedin"
                                href={
                                  personalInfo.linkedin.startsWith("http")
                                    ? personalInfo.linkedin
                                    : `https://${personalInfo.linkedin}`
                                }
                                target="_blank"
                                rel="noopener noreferrer"
                                style={{
                                  color: "inherit",
                                  textDecoration: "none",
                                }}
                              >
                                {personalInfo.linkedin}
                              </a>
                            );
                          if (personalInfo.github)
                            contacts.push(
                              <a
                                key="github"
                                href={
                                  personalInfo.github.startsWith("http")
                                    ? personalInfo.github
                                    : `https://${personalInfo.github}`
                                }
                                target="_blank"
                                rel="noopener noreferrer"
                                style={{
                                  color: "inherit",
                                  textDecoration: "none",
                                }}
                              >
                                {personalInfo.github}
                              </a>
                            );
                          return contacts.map((contact, index) => (
                            <span key={index}>
                              {index > 0 && " | "}
                              {contact}
                            </span>
                          ));
                        })()}
                      </div>
                    </div>

                    {/* PROFESSIONAL SUMMARY */}
                    {summary && (
                      <div className="section-content">
                        <div className="section-header">
                          Professional Summary
                        </div>
                        <div
                          className="description"
                          style={{ textAlign: "justify" }}
                        >
                          {summary}
                        </div>
                      </div>
                    )}

                    {/* EDUCATION (moved earlier) */}
                    {education.some((edu) => edu.degree || edu.institution) && (
                      <div className="section-content">
                        <div className="section-header">Education</div>
                        {education.map((edu) => {
                          const displayDegree =
                            edu.degree === "Other"
                              ? customDegrees[edu.id] || ""
                              : edu.degree;
                          return (
                            (displayDegree || edu.institution) && (
                              <div key={edu.id} className="education-item">
                                <div className="item-header">
                                  <div style={{ flex: 1 }}>
                                    <div className="item-title">
                                      {displayDegree}
                                    </div>
                                    <div className="item-subtitle">
                                      {edu.institution}
                                    </div>
                                    {edu.gpa && (
                                      <div
                                        style={{
                                          fontSize: "10pt",
                                          marginTop: "2pt",
                                        }}
                                      >
                                        GPA: {edu.gpa}
                                      </div>
                                    )}
                                  </div>
                                  <div className="item-date">{edu.year}</div>
                                </div>
                              </div>
                            )
                          );
                        })}
                      </div>
                    )}

                    {/* TECHNICAL SKILLS (after Education) */}
                    {skills && (
                      <div className="section-content">
                        <div className="section-header">Technical Skills</div>
                        <div style={{ whiteSpace: "pre-line" }}>{skills}</div>
                      </div>
                    )}

                    {/* EXPERIENCE (NEW) */}
                    {experience.some(
                      (ex) => ex.title || ex.company || ex.description
                    ) && (
                      <div className="section-content">
                        <div className="section-header">Experience</div>
                        {experience.map(
                          (ex) =>
                            (ex.title || ex.company) && (
                              <div key={ex.id} className="project-item">
                                <div style={{ marginBottom: "4pt" }}>
                                  <div className="item-title">
                                    {ex.title}
                                    {ex.company && ` — ${ex.company}`}
                                  </div>
                                  <div className="item-subtitle">
                                    {ex.start}
                                    {ex.start && ex.end
                                      ? ` — ${ex.end}`
                                      : ex.end
                                      ? ` — ${ex.end}`
                                      : ""}
                                  </div>
                                </div>
                                {ex.description && (
                                  <div className="description">
                                    {ex.description}
                                  </div>
                                )}
                              </div>
                            )
                        )}
                      </div>
                    )}

                    {/* PROJECTS */}
                    {projects.some((proj) => proj.name || proj.description) && (
                      <div className="section-content">
                        <div className="section-header">Projects</div>
                        {projects.map(
                          (project) =>
                            (project.name || project.description) && (
                              <div key={project.id} className="project-item">
                                <div style={{ marginBottom: "4pt" }}>
                                  <div className="item-title">
                                    {project.name}
                                  </div>
                                  {project.technologies && (
                                    <div className="tech-stack">
                                      Technologies: {project.technologies}
                                    </div>
                                  )}
                                  {project.link && (
                                    <div
                                      style={{
                                        fontSize: "10pt",
                                        marginBottom: "4pt",
                                      }}
                                    >
                                      Link:{" "}
                                      <a
                                        href={
                                          project.link.startsWith("http")
                                            ? project.link
                                            : `https://${project.link}`
                                        }
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        style={{
                                          color: "#0066cc",
                                          textDecoration: "underline",
                                        }}
                                      >
                                        {project.link}
                                      </a>
                                    </div>
                                  )}
                                </div>
                                {project.description && (
                                  <div className="description">
                                    {project.description}
                                  </div>
                                )}
                              </div>
                            )
                        )}
                      </div>
                    )}

                    {/* CERTIFICATIONS */}
                    {certifications.some(
                      (cert) => cert.name || cert.issuer
                    ) && (
                      <div className="section-content">
                        <div className="section-header">Certifications</div>
                        {certifications.map(
                          (cert) =>
                            (cert.name || cert.issuer) && (
                              <div key={cert.id} className="cert-item">
                                <div className="item-header">
                                  <div style={{ flex: 1 }}>
                                    <div className="item-title">
                                      {cert.name}
                                    </div>
                                    {cert.issuer && (
                                      <div className="item-subtitle">
                                        {cert.issuer}
                                      </div>
                                    )}
                                  </div>
                                  {cert.year && (
                                    <div className="item-date">{cert.year}</div>
                                  )}
                                </div>
                              </div>
                            )
                        )}
                      </div>
                    )}

                    {/* ACHIEVEMENTS (NEW) */}
                    {achievements.some((a) => a.text) && (
                      <div className="section-content">
                        <div className="section-header">Achievements</div>
                        <ul style={{ marginLeft: "18pt" }}>
                          {achievements.map(
                            (a) =>
                              a.text && (
                                <li key={a.id} style={{ marginBottom: "6pt" }}>
                                  {a.text}
                                </li>
                              )
                          )}
                        </ul>
                      </div>
                    )}

                    {/* Empty state */}
                    {!personalInfo.fullName &&
                      !summary &&
                      !skills &&
                      !education.some((edu) => edu.degree || edu.institution) &&
                      !projects.some((proj) => proj.name || proj.description) &&
                      !certifications.some(
                        (cert) => cert.name || cert.issuer
                      ) &&
                      !experience.some((ex) => ex.title || ex.company) &&
                      !achievements.some((a) => a.text) && (
                        <div
                          style={{
                            textAlign: "center",
                            color: "#666",
                            marginTop: "100pt",
                            fontSize: "12pt",
                          }}
                        >
                          Fill out the form to see your professional resume
                          preview
                        </div>
                      )}
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>

      <style>{`
        .header {
          text-align: center;
          padding-bottom: 12pt;
          margin-bottom: 18pt;
        }

        .name {
          font-size: 18pt;
          font-weight: bold;
          margin-bottom: 6pt;
          text-transform: uppercase;
          letter-spacing: 1pt;
          font-family: "Times New Roman", Times, serif;
          color: #000000;
        }

        .contact-info {
          font-size: 10pt;
          margin-bottom: 4pt;
          font-family: "Times New Roman", Times, serif;
          color: #000000;
        }

        .section-header {
          font-size: 12pt;
          font-weight: bold;
          text-transform: uppercase;
          border-bottom: 1pt solid #000000;
          padding-bottom: 2pt;
          margin-top: 16pt;
          margin-bottom: 8pt;
          letter-spacing: 0.5pt;
          font-family: "Times New Roman", Times, serif;
          color: #000000;
        }

        .section-content {
  margin-bottom: 12pt;
  font-family: "Times New Roman", Times, serif;
  color: #000000;
  font-size: 11pt;
  line-height: 1.4;
  padding-bottom: 6pt;
  border-bottom: 0.5pt solid #999; /* 👈 subtle thin line */
}

@media print {
  .section-content {
    border-bottom: 0.5pt solid #999 !important; /* 👈 PDF me bhi visible */
  }
}


        .education-item,
        .project-item,
        .cert-item {
          margin-bottom: 10pt;
          page-break-inside: avoid;
        }

        .item-header {
          display: flex;
          justify-content: space-between;
          align-items: flex-start;
          margin-bottom: 2pt;
        }

        .item-title {
          font-weight: bold;
          font-size: 11pt;
          font-family: "Times New Roman", Times, serif;
          color: #000000;
        }

        .item-subtitle {
          font-size: 10pt;
          margin-bottom: 2pt;
          font-family: "Times New Roman", Times, serif;
          color: #000000;
        }

        .item-date {
          font-size: 10pt;
          font-weight: normal;
          font-family: "Times New Roman", Times, serif;
          color: #000000;
        }

        .description {
          text-align: justify;
          hyphens: auto;
          margin-top: 4pt;
          font-family: "Times New Roman", Times, serif;
          color: #000000;
          font-size: 11pt;
          line-height: 1.4;
        }

        .tech-stack {
          font-style: italic;
          font-size: 10pt;
          margin-bottom: 2pt;
          font-family: "Times New Roman", Times, serif;
          color: #000000;
        }
      `}</style>
    </div>
  );
}
