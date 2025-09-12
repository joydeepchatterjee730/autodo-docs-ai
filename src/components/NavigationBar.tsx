import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { 
  Sparkles, 
  Search, 
  Plus, 
  Bell, 
  User, 
  FileText, 
  CheckSquare, 
  Users,
  Menu,
  ArrowLeft
} from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Badge } from "@/components/ui/badge";

interface NavigationBarProps {
  onBackToLanding: () => void;
  currentView: 'documents' | 'approval' | 'team';
  onViewChange: (view: 'documents' | 'approval' | 'team') => void;
  sidebarCollapsed: boolean;
  onToggleSidebar: () => void;
}

export function NavigationBar({ 
  onBackToLanding, 
  currentView, 
  onViewChange,
  sidebarCollapsed,
  onToggleSidebar
}: NavigationBarProps) {
  return (
    <nav className="border-b bg-card/50 backdrop-blur supports-[backdrop-filter]:bg-background/60 px-4 py-3">
      <div className="flex items-center justify-between">
        {/* Left Section */}
        <div className="flex items-center space-x-4">
          <Button 
            variant="ghost" 
            size="sm"
            onClick={onToggleSidebar}
            className="lg:hidden"
          >
            <Menu className="w-4 h-4" />
          </Button>
          
          <Button 
            variant="ghost" 
            size="sm"
            onClick={onBackToLanding}
            className="hidden lg:flex items-center space-x-2"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Back</span>
          </Button>

          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-gradient-to-br from-primary to-primary-glow rounded-lg flex items-center justify-center">
              <Sparkles className="w-5 h-5 text-primary-foreground" />
            </div>
            <h1 className="text-xl font-bold bg-gradient-to-r from-primary to-primary-glow bg-clip-text text-transparent">
              AUTO_DOC.AI
            </h1>
          </div>
        </div>

        {/* Center Section - Search */}
        <div className="hidden md:flex flex-1 max-w-md mx-8">
          <div className="relative w-full">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <Input 
              placeholder="Search documents, ideas, or team members..." 
              className="pl-10 bg-background/50"
            />
          </div>
        </div>

        {/* Right Section */}
        <div className="flex items-center space-x-2">
          {/* View Toggle */}
          <div className="hidden lg:flex items-center space-x-1 bg-muted/50 rounded-lg p-1">
            <Button
              variant={currentView === 'documents' ? 'default' : 'ghost'}
              size="sm"
              onClick={() => onViewChange('documents')}
              className="h-8"
            >
              <FileText className="w-4 h-4 mr-2" />
              Documents
            </Button>
            <Button
              variant={currentView === 'approval' ? 'default' : 'ghost'}
              size="sm"
              onClick={() => onViewChange('approval')}
              className="h-8 relative"
            >
              <CheckSquare className="w-4 h-4 mr-2" />
              Approval
              <Badge variant="destructive" className="absolute -top-1 -right-1 w-2 h-2 p-0">
                <span className="sr-only">3 pending approvals</span>
              </Badge>
            </Button>
            <Button
              variant={currentView === 'team' ? 'default' : 'ghost'}
              size="sm"
              onClick={() => onViewChange('team')}
              className="h-8"
            >
              <Users className="w-4 h-4 mr-2" />
              Team
            </Button>
          </div>

          <Button size="sm" className="bg-gradient-to-r from-primary to-primary-hover">
            <Plus className="w-4 h-4 mr-2" />
            <span className="hidden sm:inline">Create New Idea</span>
          </Button>

          <Button variant="ghost" size="sm" className="relative">
            <Bell className="w-4 h-4" />
            <Badge variant="destructive" className="absolute -top-1 -right-1 w-2 h-2 p-0">
              <span className="sr-only">5 notifications</span>
            </Badge>
          </Button>

          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="sm" className="w-8 h-8 rounded-full p-0">
                <div className="w-8 h-8 bg-gradient-to-br from-primary to-primary-glow rounded-full flex items-center justify-center">
                  <User className="w-4 h-4 text-primary-foreground" />
                </div>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-56">
              <DropdownMenuItem>
                <User className="w-4 h-4 mr-2" />
                Profile Settings
              </DropdownMenuItem>
              <DropdownMenuItem>
                Team Management
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem>
                Help & Support
              </DropdownMenuItem>
              <DropdownMenuItem>
                Sign Out
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </nav>
  );
}