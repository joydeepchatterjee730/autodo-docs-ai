import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { 
  ChevronDown, 
  ChevronRight, 
  FileText, 
  ClipboardList, 
  Database, 
  Code, 
  TestTube, 
  File, 
  Presentation, 
  Play, 
  Scale, 
  DollarSign,
  Search,
  Filter,
  Users,
  Circle
} from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";

interface Idea {
  id: string;
  name: string;
  status: 'Draft' | 'In Review' | 'Approved' | 'Partial';
  description: string;
  documents: string[];
  lastUpdated: string;
}

interface WorkspaceSidebarProps {
  ideas: Idea[];
  selectedIdea: string;
  onSelectIdea: (id: string) => void;
  collapsed: boolean;
}

const documentIcons = {
  'Proposal': FileText,
  'SRS': ClipboardList,
  'Architecture': Database,
  'API': Code,
  'Tests': TestTube,
  'Report': File,
  'Slides': Presentation,
  'Demo': Play,
  'IP': Scale,
  'Financial': DollarSign
};

const statusColors = {
  'Draft': 'secondary',
  'In Review': 'default',
  'Approved': 'default', 
  'Partial': 'default'
} as const;

export function Sidebar({ ideas, selectedIdea, onSelectIdea, collapsed }: WorkspaceSidebarProps) {
  const [ideasExpanded, setIdeasExpanded] = useState(true);
  const [teamExpanded, setTeamExpanded] = useState(true);
  const [filter, setFilter] = useState<'All' | 'My Ideas' | 'In Review' | 'Approved'>('All');

  const filteredIdeas = ideas.filter(idea => {
    if (filter === 'All') return true;
    if (filter === 'My Ideas') return true; // Mock: assume all are user's
    return idea.status === filter;
  });

  const teamMembers = [
    { name: 'Alice Chen', role: 'Product Manager', status: 'online', avatar: 'AC' },
    { name: 'Bob Smith', role: 'Developer', status: 'busy', avatar: 'BS' },
    { name: 'Carol Johnson', role: 'Designer', status: 'away', avatar: 'CJ' },
    { name: 'David Liu', role: 'QA Engineer', status: 'online', avatar: 'DL' }
  ];

  if (collapsed) {
    return (
      <div className="w-16 border-r bg-card/30 backdrop-blur p-2 flex flex-col items-center space-y-2">
        {ideas.slice(0, 3).map((idea) => (
          <Button
            key={idea.id}
            variant={selectedIdea === idea.id ? "default" : "ghost"}
            size="sm"
            onClick={() => onSelectIdea(idea.id)}
            className="w-12 h-12 p-0 rounded-lg"
            title={idea.name}
          >
            {idea.name.charAt(0).toUpperCase()}
          </Button>
        ))}
      </div>
    );
  }

  return (
    <div className="w-80 border-r bg-card/30 backdrop-blur flex flex-col">
      {/* Search Header */}
      <div className="p-4 border-b space-y-3">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          <Input placeholder="Search ideas..." className="pl-10 h-9" />
        </div>
        
        <div className="flex space-x-1">
          {(['All', 'My Ideas', 'In Review', 'Approved'] as const).map((filterOption) => (
            <Button
              key={filterOption}
              variant={filter === filterOption ? 'default' : 'outline'}
              size="sm"
              onClick={() => setFilter(filterOption)}
              className="text-xs h-7"
            >
              {filterOption}
            </Button>
          ))}
        </div>
      </div>

      <div className="flex-1 overflow-y-auto">
        {/* Ideas Section */}
        <div className="p-4">
          <Button
            variant="ghost"
            onClick={() => setIdeasExpanded(!ideasExpanded)}
            className="w-full justify-start p-0 h-auto font-semibold text-sm text-foreground"
          >
            {ideasExpanded ? <ChevronDown className="w-4 h-4 mr-2" /> : <ChevronRight className="w-4 h-4 mr-2" />}
            Ideas ({filteredIdeas.length})
          </Button>

          {ideasExpanded && (
            <div className="space-y-2 mt-3">
              {filteredIdeas.map((idea) => (
                <Card 
                  key={idea.id}
                  className={`cursor-pointer transition-all duration-200 hover:shadow-md border ${
                    selectedIdea === idea.id 
                      ? 'border-primary bg-primary/5 shadow-sm' 
                      : 'border-border/50 hover:border-border'
                  }`}
                  onClick={() => onSelectIdea(idea.id)}
                >
                  <CardContent className="p-3">
                    <div className="space-y-2">
                      <div className="flex items-center justify-between">
                        <h4 className="font-medium text-sm truncate">{idea.name}</h4>
                        <Badge 
                          variant={statusColors[idea.status]}
                          className={`text-xs ${
                            idea.status === 'In Review' ? 'bg-warning text-warning-foreground' :
                            idea.status === 'Approved' ? 'bg-success text-success-foreground' :
                            idea.status === 'Partial' ? 'bg-warning text-warning-foreground' : ''
                          }`}
                        >
                          {idea.status}
                        </Badge>
                      </div>
                      
                      <div className="flex flex-wrap gap-1">
                        {idea.documents.map((doc) => {
                          const Icon = documentIcons[doc as keyof typeof documentIcons] || FileText;
                          return (
                            <div key={doc} className="flex items-center space-x-1 bg-muted/50 rounded px-2 py-1">
                              <Icon className="w-3 h-3 text-muted-foreground" />
                              <span className="text-xs text-muted-foreground">{doc}</span>
                            </div>
                          );
                        })}
                      </div>
                      
                      <p className="text-xs text-muted-foreground">
                        Updated {idea.lastUpdated}
                      </p>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </div>

        <Separator className="mx-4" />

        {/* Team Section */}
        <div className="p-4">
          <Button
            variant="ghost"
            onClick={() => setTeamExpanded(!teamExpanded)}
            className="w-full justify-start p-0 h-auto font-semibold text-sm text-foreground"
          >
            {teamExpanded ? <ChevronDown className="w-4 h-4 mr-2" /> : <ChevronRight className="w-4 h-4 mr-2" />}
            Team ({teamMembers.length})
          </Button>

          {teamExpanded && (
            <div className="space-y-2 mt-3">
              {teamMembers.map((member) => (
                <div key={member.name} className="flex items-center space-x-3 p-2 rounded-lg hover:bg-muted/50">
                  <div className="relative">
                    <div className="w-8 h-8 bg-gradient-to-br from-primary to-primary-glow rounded-full flex items-center justify-center text-xs font-medium text-primary-foreground">
                      {member.avatar}
                    </div>
                    <Circle 
                      className={`absolute -bottom-0.5 -right-0.5 w-3 h-3 border-2 border-background rounded-full ${
                        member.status === 'online' ? 'fill-success text-success' :
                        member.status === 'busy' ? 'fill-destructive text-destructive' :
                        'fill-secondary text-secondary'
                      }`}
                    />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="font-medium text-sm truncate">{member.name}</p>
                    <p className="text-xs text-muted-foreground truncate">{member.role}</p>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}