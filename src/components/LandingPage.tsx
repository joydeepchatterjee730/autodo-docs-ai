import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent } from "@/components/ui/card";
import { ArrowRight, FileText, Users, Download, Sparkles, Zap, Shield } from "lucide-react";

interface LandingPageProps {
  onSubmitIdea: (idea: string) => void;
}

export function LandingPage({ onSubmitIdea }: LandingPageProps) {
  const [projectIdea, setProjectIdea] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async () => {
    if (!projectIdea.trim()) return;
    
    setIsLoading(true);
    // Simulate AI processing
    await new Promise(resolve => setTimeout(resolve, 2000));
    onSubmitIdea(projectIdea);
    setIsLoading(false);
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Navigation */}
      <nav className="border-b bg-card/50 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-gradient-to-br from-primary to-primary-glow rounded-lg flex items-center justify-center">
              <Sparkles className="w-5 h-5 text-primary-foreground" />
            </div>
            <h1 className="text-2xl font-bold bg-gradient-to-r from-primary to-primary-glow bg-clip-text text-transparent">
              AUTO_DOC.AI
            </h1>
          </div>
          <Button variant="outline" size="sm">
            Sign In
          </Button>
        </div>
      </nav>

      {/* Hero Section */}
      <main className="container mx-auto px-4 py-16">
        <div className="max-w-4xl mx-auto text-center space-y-8">
          {/* Hero Content */}
          <div className="space-y-4">
            <h2 className="text-5xl font-bold tracking-tight">
              AI-Powered Documentation
              <span className="block bg-gradient-to-r from-primary to-primary-glow bg-clip-text text-transparent">
                Workspace
              </span>
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Transform your project ideas into comprehensive documentation with intelligent AI assistance, 
              team collaboration, and seamless export capabilities.
            </p>
          </div>

          {/* Main Input Section */}
          <div className="space-y-6">
            <Card className="p-8 shadow-lg border-0 bg-card/50 backdrop-blur">
              <CardContent className="space-y-4 p-0">
                <Textarea
                  placeholder="Describe your project idea in detail... Tell us about your goals, requirements, team structure, and any specific documentation needs you have."
                  className="min-h-32 text-lg border-0 bg-background/50 focus-visible:ring-primary resize-none"
                  value={projectIdea}
                  onChange={(e) => setProjectIdea(e.target.value)}
                />
                <Button 
                  onClick={handleSubmit}
                  disabled={!projectIdea.trim() || isLoading}
                  size="lg"
                  className="w-full h-12 text-lg font-semibold bg-gradient-to-r from-primary to-primary-hover hover:from-primary-hover hover:to-primary shadow-lg"
                >
                  {isLoading ? (
                    <>
                      <Zap className="w-5 h-5 mr-2 animate-spin" />
                      Generating Documentation...
                    </>
                  ) : (
                    <>
                      Generate Documentation
                      <ArrowRight className="w-5 h-5 ml-2" />
                    </>
                  )}
                </Button>
              </CardContent>
            </Card>
          </div>

          {/* Features Overview */}
          <div className="grid md:grid-cols-3 gap-6 pt-16">
            <Card className="text-center p-6 border-0 bg-card/30 backdrop-blur hover:bg-card/50 transition-all duration-300">
              <CardContent className="space-y-3 p-0">
                <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mx-auto">
                  <FileText className="w-6 h-6 text-primary" />
                </div>
                <h3 className="font-semibold text-lg">AI Documentation</h3>
                <p className="text-muted-foreground">
                  Generate comprehensive docs from simple project descriptions using advanced AI
                </p>
              </CardContent>
            </Card>

            <Card className="text-center p-6 border-0 bg-card/30 backdrop-blur hover:bg-card/50 transition-all duration-300">
              <CardContent className="space-y-3 p-0">
                <div className="w-12 h-12 bg-success/10 rounded-lg flex items-center justify-center mx-auto">
                  <Users className="w-6 h-6 text-success" />
                </div>
                <h3 className="font-semibold text-lg">Team Collaboration</h3>
                <p className="text-muted-foreground">
                  Real-time collaboration with approval workflows and task management
                </p>
              </CardContent>
            </Card>

            <Card className="text-center p-6 border-0 bg-card/30 backdrop-blur hover:bg-card/50 transition-all duration-300">
              <CardContent className="space-y-3 p-0">
                <div className="w-12 h-12 bg-warning/10 rounded-lg flex items-center justify-center mx-auto">
                  <Download className="w-6 h-6 text-warning" />
                </div>
                <h3 className="font-semibold text-lg">Export to Drive</h3>
                <p className="text-muted-foreground">
                  Seamlessly export to Google Drive, PDF, or presentation formats
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="border-t mt-24">
        <div className="container mx-auto px-4 py-8">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <div className="flex items-center space-x-2">
              <Shield className="w-5 h-5 text-muted-foreground" />
              <span className="text-sm text-muted-foreground">
                Enterprise-grade security and privacy
              </span>
            </div>
            <div className="text-sm text-muted-foreground">
              © 2024 AUTO_DOC.AI. All rights reserved.
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}