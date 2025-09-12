import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Textarea } from "@/components/ui/textarea";
import { 
  Plus, 
  Save, 
  Download, 
  MessageSquare, 
  Clock, 
  CheckCircle,
  AlertCircle,
  ChevronDown,
  ChevronRight,
  FileText,
  MoreHorizontal,
  Sparkles
} from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Separator } from "@/components/ui/separator";

interface Idea {
  id: string;
  name: string;
  status: 'Draft' | 'In Review' | 'Approved' | 'Partial';
  description: string;
  documents: string[];
  lastUpdated: string;
}

interface DocumentEditorProps {
  idea: Idea;
}

interface DocumentSection {
  id: string;
  title: string;
  content: string;
  status: 'approved' | 'partial' | 'needs-review';
  comments: number;
}

export function DocumentEditor({ idea }: DocumentEditorProps) {
  const [tocExpanded, setTocExpanded] = useState(true);
  const [activeSection, setActiveSection] = useState<string>('executive-summary');
  const [showAIAssistant, setShowAIAssistant] = useState(true);

  // Mock document sections
  const sections: DocumentSection[] = [
    {
      id: 'executive-summary',
      title: 'Executive Summary',
      content: 'This project aims to develop a comprehensive e-commerce platform that will revolutionize online shopping experiences...',
      status: 'approved',
      comments: 0
    },
    {
      id: 'objectives',
      title: 'Project Objectives',
      content: '1. Create a scalable e-commerce platform\n2. Implement advanced search functionality\n3. Develop mobile-first responsive design...',
      status: 'partial',
      comments: 2
    },
    {
      id: 'requirements',
      title: 'Requirements Specification',
      content: 'Functional Requirements:\n- User registration and authentication\n- Product catalog management\n- Shopping cart functionality...',
      status: 'needs-review',
      comments: 5
    },
    {
      id: 'architecture',
      title: 'System Architecture',
      content: 'The system will follow a microservices architecture pattern with the following components...',
      status: 'needs-review',
      comments: 1
    }
  ];

  const currentSection = sections.find(s => s.id === activeSection) || sections[0];

  const getStatusIcon = (status: DocumentSection['status']) => {
    switch (status) {
      case 'approved':
        return <CheckCircle className="w-4 h-4 text-success" />;
      case 'partial':
        return <AlertCircle className="w-4 h-4 text-warning" />;
      case 'needs-review':
        return <Clock className="w-4 h-4 text-destructive" />;
    }
  };

  const getStatusBadge = (status: DocumentSection['status']) => {
    switch (status) {
      case 'approved':
        return <Badge variant="default" className="bg-success">Approved</Badge>;
      case 'partial':
        return <Badge variant="default" className="bg-warning">Partial</Badge>;
      case 'needs-review':
        return <Badge variant="destructive">Needs Review</Badge>;
    }
  };

  return (
    <div className="flex flex-1 overflow-hidden">
      {/* Table of Contents */}
      <div className="w-64 border-r bg-card/30 backdrop-blur p-4 overflow-y-auto">
        <div className="space-y-4">
          <Button
            variant="ghost"
            onClick={() => setTocExpanded(!tocExpanded)}
            className="w-full justify-start p-0 h-auto font-semibold text-sm"
          >
            {tocExpanded ? <ChevronDown className="w-4 h-4 mr-2" /> : <ChevronRight className="w-4 h-4 mr-2" />}
            Table of Contents
          </Button>

          {tocExpanded && (
            <div className="space-y-1">
              {sections.map((section) => (
                <div
                  key={section.id}
                  className={`flex items-center space-x-2 p-2 rounded-lg cursor-pointer transition-colors ${
                    activeSection === section.id 
                      ? 'bg-primary/10 border border-primary/20' 
                      : 'hover:bg-muted/50'
                  }`}
                  onClick={() => setActiveSection(section.id)}
                >
                  {getStatusIcon(section.status)}
                  <span className="flex-1 text-sm font-medium">{section.title}</span>
                  {section.comments > 0 && (
                    <div className="flex items-center space-x-1">
                      <MessageSquare className="w-3 h-3 text-muted-foreground" />
                      <span className="text-xs text-muted-foreground">{section.comments}</span>
                    </div>
                  )}
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Main Document Editor */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Document Header */}
        <div className="border-b bg-card/50 backdrop-blur p-4">
          <div className="flex items-center justify-between">
            <div className="space-y-1">
              <h1 className="text-2xl font-bold">{idea.name}</h1>
              <div className="flex items-center space-x-4 text-sm text-muted-foreground">
                <span>Last updated {idea.lastUpdated}</span>
                <Separator orientation="vertical" className="h-4" />
                <div className="flex items-center space-x-2">
                  <span>Status:</span>
                  {getStatusBadge(currentSection.status)}
                </div>
              </div>
            </div>
            
            <div className="flex items-center space-x-2">
              <Button variant="outline" size="sm">
                <Save className="w-4 h-4 mr-2" />
                Save
              </Button>
              
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="outline" size="sm">
                    <Download className="w-4 h-4 mr-2" />
                    Export
                    <ChevronDown className="w-4 h-4 ml-2" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuItem>
                    <FileText className="w-4 h-4 mr-2" />
                    IEEE Report
                  </DropdownMenuItem>
                  <DropdownMenuItem>
                    Presentation Slides
                  </DropdownMenuItem>
                  <DropdownMenuItem>
                    Proposal Document
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem>
                    Save to Google Drive
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>

              <Button size="sm" className="bg-gradient-to-r from-primary to-primary-hover">
                Request Approval
              </Button>
            </div>
          </div>
        </div>

        {/* Editor Content */}
        <div className="flex-1 overflow-y-auto p-6">
          <div className="max-w-4xl mx-auto space-y-6">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-4">
                <CardTitle className="flex items-center space-x-2">
                  {getStatusIcon(currentSection.status)}
                  <span>{currentSection.title}</span>
                </CardTitle>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" size="sm">
                      <MoreHorizontal className="w-4 h-4" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    <DropdownMenuItem>
                      Add Comment
                    </DropdownMenuItem>
                    <DropdownMenuItem>
                      View History
                    </DropdownMenuItem>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem>
                      Delete Section
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </CardHeader>
              <CardContent>
                <Textarea
                  value={currentSection.content}
                  onChange={() => {}}
                  className="min-h-96 border-0 p-0 text-base leading-relaxed resize-none focus-visible:ring-0"
                  placeholder="Start writing your content here..."
                />
              </CardContent>
            </Card>

            <Button 
              variant="outline" 
              className="w-full border-dashed border-2 h-12 text-muted-foreground hover:text-foreground hover:border-primary"
            >
              <Plus className="w-4 h-4 mr-2" />
              Add New Section
            </Button>
          </div>
        </div>
      </div>

      {/* AI Assistant Panel */}
      {showAIAssistant && (
        <div className="w-80 border-l bg-card/30 backdrop-blur p-4">
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <Sparkles className="w-5 h-5 text-primary" />
                <h3 className="font-semibold">AI Assistant</h3>
              </div>
              <Button 
                variant="ghost" 
                size="sm"
                onClick={() => setShowAIAssistant(false)}
              >
                ×
              </Button>
            </div>

            <Card className="bg-primary/5 border-primary/20">
              <CardContent className="p-4">
                <div className="space-y-3">
                  <p className="text-sm font-medium">Suggestions for "{currentSection.title}":</p>
                  
                  <div className="space-y-2">
                    <Button variant="ghost" size="sm" className="w-full justify-start h-auto p-2 text-left">
                      <span className="text-xs">Add technical specifications for scalability requirements</span>
                    </Button>
                    <Button variant="ghost" size="sm" className="w-full justify-start h-auto p-2 text-left">
                      <span className="text-xs">Include performance benchmarks and metrics</span>
                    </Button>
                    <Button variant="ghost" size="sm" className="w-full justify-start h-auto p-2 text-left">
                      <span className="text-xs">Add risk assessment and mitigation strategies</span>
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>

            <div className="space-y-2">
              <h4 className="font-medium text-sm">Quick Actions</h4>
              <div className="space-y-1">
                <Button variant="outline" size="sm" className="w-full justify-start">
                  Generate Summary
                </Button>
                <Button variant="outline" size="sm" className="w-full justify-start">
                  Check Grammar
                </Button>
                <Button variant="outline" size="sm" className="w-full justify-start">
                  Improve Clarity
                </Button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}