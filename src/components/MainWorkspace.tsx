import { useState } from "react";
import { NavigationBar } from "./NavigationBar";
import { Sidebar } from "./WorkspaceSidebar";
import { DocumentEditor } from "./DocumentEditor";
import { ApprovalPanel } from "./ApprovalPanel";
import { TeamBuilder } from "./TeamBuilder";

interface MainWorkspaceProps {
  initialIdea: string;
  onBackToLanding: () => void;
}

export function MainWorkspace({ initialIdea, onBackToLanding }: MainWorkspaceProps) {
  const [currentView, setCurrentView] = useState<'documents' | 'approval' | 'team'>('documents');
  const [selectedIdea, setSelectedIdea] = useState<string>('project-1');
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);

  // Mock data for demo
  const ideas = [
    {
      id: 'project-1',
      name: 'E-commerce Platform',
      status: 'In Review' as const,
      description: initialIdea,
      documents: ['Proposal', 'SRS', 'Architecture'],
      lastUpdated: '2 hours ago'
    },
    {
      id: 'project-2', 
      name: 'Mobile App Design',
      status: 'Draft' as const,
      description: 'Mobile application for task management',
      documents: ['Proposal'],
      lastUpdated: '1 day ago'
    }
  ];

  const currentIdea = ideas.find(idea => idea.id === selectedIdea) || ideas[0];

  return (
    <div className="h-screen flex flex-col bg-background">
      <NavigationBar 
        onBackToLanding={onBackToLanding}
        currentView={currentView}
        onViewChange={setCurrentView}
        sidebarCollapsed={sidebarCollapsed}
        onToggleSidebar={() => setSidebarCollapsed(!sidebarCollapsed)}
      />
      
      <div className="flex flex-1 overflow-hidden">
        <Sidebar 
          ideas={ideas}
          selectedIdea={selectedIdea}
          onSelectIdea={setSelectedIdea}
          collapsed={sidebarCollapsed}
        />
        
        <main className="flex-1 flex overflow-hidden">
          {currentView === 'documents' && (
            <DocumentEditor idea={currentIdea} />
          )}
          {currentView === 'approval' && (
            <ApprovalPanel ideas={ideas} />
          )}
          {currentView === 'team' && (
            <TeamBuilder />
          )}
        </main>
      </div>
    </div>
  );
}