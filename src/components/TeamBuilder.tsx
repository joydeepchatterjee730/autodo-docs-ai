import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { 
  Users, 
  Plus, 
  Shuffle, 
  Clock,
  CheckCircle,
  AlertTriangle,
  GripVertical
} from "lucide-react";

interface TeamMember {
  id: string;
  name: string;
  role: string;
  skills: string[];
  workload: number;
  maxCapacity: number;
  avatar: string;
  status: 'available' | 'busy' | 'away';
}

interface Task {
  id: string;
  title: string;
  type: 'Document' | 'Review' | 'Research' | 'Design';
  estimatedHours: number;
  priority: 'High' | 'Medium' | 'Low';
  assignedTo?: string;
  status: 'pending' | 'in-progress' | 'completed';
}

export function TeamBuilder() {
  const [selectedMember, setSelectedMember] = useState<string | null>(null);
  
  // Mock team members data
  const teamMembers: TeamMember[] = [
    {
      id: '1',
      name: 'Alice Chen',
      role: 'Product Manager',
      skills: ['Strategy', 'Requirements', 'Stakeholder Management'],
      workload: 32,
      maxCapacity: 40,
      avatar: 'AC',
      status: 'available'
    },
    {
      id: '2',
      name: 'Bob Smith',
      role: 'Senior Developer',
      skills: ['React', 'Node.js', 'System Design'],
      workload: 38,
      maxCapacity: 40,
      avatar: 'BS',
      status: 'busy'
    },
    {
      id: '3',
      name: 'Carol Johnson',
      role: 'UX Designer',
      skills: ['UI Design', 'User Research', 'Prototyping'],
      workload: 20,
      maxCapacity: 40,
      avatar: 'CJ',
      status: 'available'
    },
    {
      id: '4',
      name: 'David Liu',
      role: 'QA Engineer',
      skills: ['Testing', 'Automation', 'Quality Assurance'],
      workload: 15,
      maxCapacity: 40,
      avatar: 'DL',
      status: 'available'
    }
  ];

  // Mock tasks extracted from documents
  const tasks: Task[] = [
    {
      id: '1',
      title: 'Review Requirements Specification',
      type: 'Review',
      estimatedHours: 4,
      priority: 'High',
      assignedTo: '1',
      status: 'in-progress'
    },
    {
      id: '2',
      title: 'Create API Documentation',
      type: 'Document',
      estimatedHours: 8,
      priority: 'High',
      status: 'pending'
    },
    {
      id: '3',
      title: 'Design System Architecture',
      type: 'Design',
      estimatedHours: 12,
      priority: 'Medium',
      assignedTo: '2',
      status: 'in-progress'
    },
    {
      id: '4',
      title: 'Test Case Documentation',
      type: 'Document',
      estimatedHours: 6,
      priority: 'Medium',
      status: 'pending'
    },
    {
      id: '5',
      title: 'User Research Analysis',
      type: 'Research',
      estimatedHours: 10,
      priority: 'Low',
      assignedTo: '3',
      status: 'completed'
    }
  ];

  const getWorkloadColor = (workload: number, maxCapacity: number) => {
    const percentage = (workload / maxCapacity) * 100;
    if (percentage >= 90) return 'bg-destructive';
    if (percentage >= 70) return 'bg-warning';
    return 'bg-success';
  };

  const getStatusIcon = (status: TeamMember['status']) => {
    switch (status) {
      case 'available':
        return <CheckCircle className="w-4 h-4 text-success" />;
      case 'busy':
        return <AlertTriangle className="w-4 h-4 text-warning" />;
      case 'away':
        return <Clock className="w-4 h-4 text-muted-foreground" />;
    }
  };

  const getPriorityColor = (priority: Task['priority']) => {
    switch (priority) {
      case 'High': return 'bg-destructive';
      case 'Medium': return 'bg-warning';
      case 'Low': return 'bg-secondary';
    }
  };

  return (
    <div className="flex-1 flex flex-col p-6">
      <div className="mb-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold mb-2">Team Builder</h1>
            <p className="text-muted-foreground">
              Manage team workload and assign tasks automatically or manually.
            </p>
          </div>
          <div className="flex space-x-2">
            <Button variant="outline">
              <Plus className="w-4 h-4 mr-2" />
              Add Member
            </Button>
            <Button className="bg-gradient-to-r from-primary to-primary-hover">
              <Shuffle className="w-4 h-4 mr-2" />
              Auto-Assign Tasks
            </Button>
          </div>
        </div>
      </div>

      <div className="flex-1 grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Team Roster */}
        <div className="space-y-4">
          <div className="flex items-center space-x-2">
            <Users className="w-5 h-5 text-primary" />
            <h2 className="text-lg font-semibold">Team Roster</h2>
          </div>

          <div className="space-y-3">
            {teamMembers.map((member) => (
              <Card 
                key={member.id}
                className={`cursor-pointer transition-all duration-200 hover:shadow-md ${
                  selectedMember === member.id ? 'border-primary shadow-sm' : ''
                }`}
                onClick={() => setSelectedMember(member.id)}
              >
                <CardContent className="p-4">
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-3">
                        <Avatar>
                          <AvatarFallback className="bg-gradient-to-br from-primary to-primary-glow text-primary-foreground">
                            {member.avatar}
                          </AvatarFallback>
                        </Avatar>
                        <div>
                          <h3 className="font-medium">{member.name}</h3>
                          <p className="text-sm text-muted-foreground">{member.role}</p>
                        </div>
                      </div>
                      {getStatusIcon(member.status)}
                    </div>

                    <div className="space-y-2">
                      <div className="flex items-center justify-between text-sm">
                        <span className="text-muted-foreground">Workload</span>
                        <span className="font-medium">
                          {member.workload}h / {member.maxCapacity}h
                        </span>
                      </div>
                      <Progress 
                        value={(member.workload / member.maxCapacity) * 100} 
                        className="h-2"
                      />
                    </div>

                    <div className="flex flex-wrap gap-1">
                      {member.skills.map((skill) => (
                        <Badge key={skill} variant="secondary" className="text-xs">
                          {skill}
                        </Badge>
                      ))}
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Task Assignment */}
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-semibold">Task List</h2>
            <Badge variant="outline" className="text-xs">
              {tasks.filter(t => t.status === 'pending').length} unassigned
            </Badge>
          </div>

          <div className="space-y-3">
            {tasks.map((task) => (
              <Card key={task.id} className="hover:shadow-md transition-all duration-200">
                <CardContent className="p-4">
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-2">
                        <GripVertical className="w-4 h-4 text-muted-foreground cursor-grab" />
                        <h3 className="font-medium">{task.title}</h3>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Badge 
                          className={`text-xs text-white ${getPriorityColor(task.priority)}`}
                        >
                          {task.priority}
                        </Badge>
                        <Badge variant="outline" className="text-xs">
                          {task.type}
                        </Badge>
                      </div>
                    </div>

                    <div className="flex items-center justify-between text-sm text-muted-foreground">
                      <span>{task.estimatedHours}h estimated</span>
                      <div className="flex items-center space-x-2">
                        {task.assignedTo ? (
                          <>
                            <span>Assigned to:</span>
                            <div className="flex items-center space-x-1">
                              <Avatar className="w-6 h-6">
                                <AvatarFallback className="text-xs bg-primary/10">
                                  {teamMembers.find(m => m.id === task.assignedTo)?.avatar}
                                </AvatarFallback>
                              </Avatar>
                              <span className="font-medium text-foreground">
                                {teamMembers.find(m => m.id === task.assignedTo)?.name}
                              </span>
                            </div>
                          </>
                        ) : (
                          <Button size="sm" variant="outline" className="h-6 text-xs">
                            Assign
                          </Button>
                        )}
                      </div>
                    </div>

                    {task.status !== 'pending' && (
                      <div className="flex items-center space-x-2">
                        {task.status === 'completed' ? (
                          <CheckCircle className="w-4 h-4 text-success" />
                        ) : (
                          <Clock className="w-4 h-4 text-warning" />
                        )}
                        <span className="text-sm capitalize text-muted-foreground">
                          {task.status.replace('-', ' ')}
                        </span>
                      </div>
                    )}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>

      {/* Workload Balance Visualization */}
      <div className="mt-6">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Users className="w-5 h-5" />
              <span>Team Workload Balance</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              {teamMembers.map((member) => (
                <div key={member.id} className="space-y-2">
                  <div className="flex items-center space-x-2">
                    <Avatar className="w-8 h-8">
                      <AvatarFallback className="bg-gradient-to-br from-primary to-primary-glow text-primary-foreground text-xs">
                        {member.avatar}
                      </AvatarFallback>
                    </Avatar>
                    <div className="flex-1 min-w-0">
                      <p className="font-medium text-sm truncate">{member.name}</p>
                      <p className="text-xs text-muted-foreground">
                        {Math.round((member.workload / member.maxCapacity) * 100)}% capacity
                      </p>
                    </div>
                  </div>
                  <Progress 
                    value={(member.workload / member.maxCapacity) * 100}
                    className={`h-2 ${getWorkloadColor(member.workload, member.maxCapacity)}`}
                  />
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}