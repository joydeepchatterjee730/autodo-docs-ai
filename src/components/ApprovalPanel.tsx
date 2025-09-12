import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Textarea } from "@/components/ui/textarea";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { 
  CheckCircle, 
  XCircle, 
  AlertCircle, 
  Clock, 
  MessageSquare,
  User,
  Calendar
} from "lucide-react";

interface Idea {
  id: string;
  name: string;
  status: 'Draft' | 'In Review' | 'Approved' | 'Partial';
  description: string;
  documents: string[];
  lastUpdated: string;
}

interface ApprovalPanelProps {
  ideas: Idea[];
}

interface ApprovalItem {
  id: string;
  title: string;
  submitter: string;
  dueDate: string;
  priority: 'High' | 'Medium' | 'Low';
  type: 'Document' | 'Section' | 'Project';
  description: string;
  status: 'pending' | 'approved' | 'disapproved';
}

export function ApprovalPanel({ ideas }: ApprovalPanelProps) {
  const [selectedItem, setSelectedItem] = useState<string | null>(null);
  const [reviewComment, setReviewComment] = useState("");

  // Mock approval items
  const approvalItems: ApprovalItem[] = [
    {
      id: '1',
      title: 'E-commerce Platform - Requirements Specification',
      submitter: 'Alice Chen',
      dueDate: '2024-01-15',
      priority: 'High',
      type: 'Document',
      description: 'Complete requirements specification document for the e-commerce platform project.',
      status: 'pending'
    },
    {
      id: '2',
      title: 'Mobile App Design - Architecture Section',
      submitter: 'Bob Smith',
      dueDate: '2024-01-18',
      priority: 'Medium',
      type: 'Section',
      description: 'System architecture design for the mobile application.',
      status: 'approved'
    },
    {
      id: '3',
      title: 'API Documentation - Endpoints',
      submitter: 'Carol Johnson',
      dueDate: '2024-01-12',
      priority: 'High',
      type: 'Document',
      description: 'API endpoint documentation with examples and authentication details.',
      status: 'disapproved'
    }
  ];

  const pendingItems = approvalItems.filter(item => item.status === 'pending');
  const approvedItems = approvalItems.filter(item => item.status === 'approved');
  const disapprovedItems = approvalItems.filter(item => item.status === 'disapproved');

  const handleApproval = (itemId: string, decision: 'approve' | 'partial' | 'disapprove') => {
    console.log(`${decision} item ${itemId} with comment: ${reviewComment}`);
    setReviewComment("");
    setSelectedItem(null);
  };

  const getPriorityColor = (priority: ApprovalItem['priority']) => {
    switch (priority) {
      case 'High': return 'destructive';
      case 'Medium': return 'default';
      case 'Low': return 'secondary';
    }
  };

  const ApprovalColumn = ({ 
    title, 
    items, 
    icon: Icon, 
    bgColor 
  }: { 
    title: string; 
    items: ApprovalItem[]; 
    icon: any; 
    bgColor: string 
  }) => (
    <div className="flex-1 space-y-4">
      <div className={`${bgColor} rounded-lg p-4`}>
        <div className="flex items-center space-x-2 text-white">
          <Icon className="w-5 h-5" />
          <h3 className="font-semibold">{title}</h3>
          <Badge variant="secondary" className="bg-white/20 text-white">
            {items.length}
          </Badge>
        </div>
      </div>

      <div className="space-y-3">
        {items.map((item) => (
          <Card 
            key={item.id}
            className={`cursor-pointer transition-all duration-200 hover:shadow-md ${
              selectedItem === item.id ? 'border-primary shadow-sm' : ''
            }`}
            onClick={() => setSelectedItem(item.id)}
          >
            <CardHeader className="pb-3">
              <div className="flex items-start justify-between">
                <CardTitle className="text-sm font-medium leading-tight">
                  {item.title}
                </CardTitle>
                <Badge variant={getPriorityColor(item.priority)} className={`text-xs ${
                  item.priority === 'Medium' ? 'bg-warning text-warning-foreground' : ''
                }`}>
                  {item.priority}
                </Badge>
              </div>
            </CardHeader>
            <CardContent className="pt-0">
              <div className="space-y-3">
                <p className="text-sm text-muted-foreground line-clamp-2">
                  {item.description}
                </p>
                
                <div className="flex items-center justify-between text-xs text-muted-foreground">
                  <div className="flex items-center space-x-1">
                    <User className="w-3 h-3" />
                    <span>{item.submitter}</span>
                  </div>
                  <div className="flex items-center space-x-1">
                    <Calendar className="w-3 h-3" />
                    <span>{item.dueDate}</span>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );

  return (
    <div className="flex-1 flex flex-col p-6">
      <div className="mb-6">
        <h1 className="text-2xl font-bold mb-2">Approval Workflow</h1>
        <p className="text-muted-foreground">
          Review and approve pending documents and sections from your team members.
        </p>
      </div>

      <div className="flex-1 flex space-x-6 overflow-hidden">
        {/* Three-column layout */}
        <ApprovalColumn
          title="Disapproved"
          items={disapprovedItems}
          icon={XCircle}
          bgColor="bg-destructive"
        />

        <ApprovalColumn
          title="In Review"
          items={pendingItems}
          icon={Clock}
          bgColor="bg-warning"
        />

        <ApprovalColumn
          title="Approved"
          items={approvedItems}
          icon={CheckCircle}
          bgColor="bg-success"
        />
      </div>

      {/* Review Modal */}
      {selectedItem && (
        <div className="fixed inset-0 bg-background/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <Card className="w-full max-w-2xl max-h-[80vh] overflow-y-auto">
            <CardHeader>
              <CardTitle className="flex items-center justify-between">
                <span>Review Item</span>
                <Button 
                  variant="ghost" 
                  size="sm"
                  onClick={() => setSelectedItem(null)}
                >
                  ×
                </Button>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              {(() => {
                const item = approvalItems.find(i => i.id === selectedItem);
                if (!item) return null;

                return (
                  <>
                    <div className="space-y-4">
                      <div>
                        <h3 className="font-semibold text-lg">{item.title}</h3>
                        <div className="flex items-center space-x-4 mt-2 text-sm text-muted-foreground">
                          <div className="flex items-center space-x-1">
                            <User className="w-4 h-4" />
                            <span>{item.submitter}</span>
                          </div>
                          <div className="flex items-center space-x-1">
                            <Calendar className="w-4 h-4" />
                            <span>Due: {item.dueDate}</span>
                          </div>
                          <Badge variant={getPriorityColor(item.priority)} className={
                            item.priority === 'Medium' ? 'bg-warning text-warning-foreground' : ''
                          }>
                            {item.priority} Priority
                          </Badge>
                        </div>
                      </div>

                      <div>
                        <h4 className="font-medium mb-2">Description</h4>
                        <p className="text-muted-foreground">{item.description}</p>
                      </div>

                      <div>
                        <h4 className="font-medium mb-2">Content Preview</h4>
                        <div className="border rounded-lg p-4 bg-muted/30 max-h-40 overflow-y-auto">
                          <p className="text-sm">
                            This is a preview of the content that needs review. 
                            The actual content would be loaded here with proper formatting and structure.
                            Lorem ipsum dolor sit amet, consectetur adipiscing elit...
                          </p>
                        </div>
                      </div>
                    </div>

                    <div className="space-y-4">
                      <div>
                        <h4 className="font-medium mb-2">Review Comments</h4>
                        <Textarea
                          placeholder="Add your review comments here..."
                          value={reviewComment}
                          onChange={(e) => setReviewComment(e.target.value)}
                          className="min-h-24"
                        />
                      </div>

                      <div className="flex justify-end space-x-2">
                        <Button 
                          variant="outline"
                          onClick={() => setSelectedItem(null)}
                        >
                          Cancel
                        </Button>
                        <Button 
                          variant="destructive"
                          onClick={() => handleApproval(item.id, 'disapprove')}
                        >
                          <XCircle className="w-4 h-4 mr-2" />
                          Disapprove
                        </Button>
                        <Button 
                          variant="outline"
                          className="border-warning text-warning hover:bg-warning hover:text-warning-foreground"
                          onClick={() => handleApproval(item.id, 'partial')}
                        >
                          <AlertCircle className="w-4 h-4 mr-2" />
                          Partial Approval
                        </Button>
                        <Button 
                          className="bg-success hover:bg-success-hover"
                          onClick={() => handleApproval(item.id, 'approve')}
                        >
                          <CheckCircle className="w-4 h-4 mr-2" />
                          Approve
                        </Button>
                      </div>
                    </div>
                  </>
                );
              })()}
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  );
}