
import { useState } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import { formatDistanceToNow, format } from "date-fns";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import StatusBadge from "@/components/StatusBadge";
import { useComplaints } from "@/context/ComplaintsContext";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { useToast } from "@/hooks/use-toast";

const ViewComplaint = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { getComplaintById, addResponse } = useComplaints();
  const { toast } = useToast();
  const [newResponse, setNewResponse] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  const complaint = id ? getComplaintById(id) : undefined;
  
  if (!complaint) {
    return (
      <div className="min-h-screen flex flex-col">
        <Header />
        <main className="flex-grow container mx-auto px-4 py-12">
          <div className="text-center">
            <h1 className="text-2xl font-bold text-red-600 mb-4">Complaint Not Found</h1>
            <p className="text-gray-600 mb-6">
              The complaint you're looking for doesn't exist or has been removed.
            </p>
            <Button asChild variant="default" className="bg-ces-primary hover:bg-ces-secondary">
              <Link to="/dashboard">Return to Dashboard</Link>
            </Button>
          </div>
        </main>
        <Footer />
      </div>
    );
  }
  
  const {
    title,
    category,
    description,
    location,
    status,
    citizenName,
    citizenEmail,
    citizenPhone,
    createdAt,
    updatedAt,
    departmentAssigned,
    responses = []
  } = complaint;
  
  const formattedCreatedDate = format(new Date(createdAt), "PPPp");
  const timeAgo = formatDistanceToNow(new Date(createdAt), { addSuffix: true });
  
  const handleSubmitResponse = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newResponse.trim()) return;
    
    setIsSubmitting(true);
    
    try {
      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, 800));
      
      addResponse(id!, {
        text: newResponse,
        isAdmin: false,
        userName: citizenName
      });
      
      setNewResponse("");
      
      toast({
        title: "Response Added",
        description: "Your response has been added to the complaint."
      });
    } catch (error) {
      toast({
        title: "Error Adding Response",
        description: "There was a problem adding your response. Please try again.",
        variant: "destructive"
      });
    } finally {
      setIsSubmitting(false);
    }
  };
  
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      <main className="flex-grow pt-8 pb-16">
        <div className="container max-w-4xl mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 gap-4">
            <div>
              <div className="flex items-center gap-2 text-gray-500 text-sm mb-2">
                <Link to="/dashboard" className="hover:text-ces-primary flex items-center">
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="mr-1"><path d="m15 18-6-6 6-6"/></svg>
                  Back to Dashboard
                </Link>
                <span>•</span>
                <span>Complaint #{id?.slice(0, 8)}</span>
              </div>
              
              <h1 className="text-2xl md:text-3xl font-bold text-ces-primary">{title}</h1>
            </div>
            
            <StatusBadge status={status} className="text-sm px-3 py-1" />
          </div>
          
          <Card className="mb-8">
            <CardContent className="p-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                <div>
                  <h2 className="text-sm font-medium text-gray-500 mb-1">Category</h2>
                  <p className="font-medium">{category}</p>
                </div>
                
                <div>
                  <h2 className="text-sm font-medium text-gray-500 mb-1">Location</h2>
                  <p>{location}</p>
                </div>
                
                <div>
                  <h2 className="text-sm font-medium text-gray-500 mb-1">Submitted By</h2>
                  <p>{citizenName}</p>
                </div>
                
                <div>
                  <h2 className="text-sm font-medium text-gray-500 mb-1">Date Submitted</h2>
                  <p>{formattedCreatedDate} <span className="text-gray-500 text-sm">({timeAgo})</span></p>
                </div>
                
                {departmentAssigned && (
                  <div>
                    <h2 className="text-sm font-medium text-gray-500 mb-1">Department Assigned</h2>
                    <Badge variant="outline" className="bg-ces-light font-normal">
                      {departmentAssigned}
                    </Badge>
                  </div>
                )}
              </div>
              
              <div>
                <h2 className="text-sm font-medium text-gray-500 mb-2">Description</h2>
                <p className="whitespace-pre-line">{description}</p>
              </div>
            </CardContent>
          </Card>
          
          <div className="mb-8">
            <h2 className="text-xl font-semibold mb-4">Updates & Responses</h2>
            
            {responses.length === 0 ? (
              <div className="text-center py-8 bg-gray-50 rounded-lg">
                <p className="text-gray-600">No responses yet.</p>
              </div>
            ) : (
              <div className="space-y-4">
                {responses.map((response) => {
                  const isPrimary = response.isAdmin;
                  const responseDate = format(new Date(response.createdAt), "PPPp");
                  
                  return (
                    <div 
                      key={response.id}
                      className={`p-4 rounded-lg ${
                        isPrimary ? "bg-ces-light border border-ces-accent/30" : "bg-gray-50"
                      }`}
                    >
                      <div className="flex justify-between items-start mb-2">
                        <div className="flex items-center gap-2">
                          <span className={`font-medium ${isPrimary ? "text-ces-primary" : ""}`}>
                            {response.userName}
                          </span>
                          {isPrimary && (
                            <Badge className="bg-ces-primary text-xs">Official Response</Badge>
                          )}
                        </div>
                        <span className="text-sm text-gray-500">
                          {formatDistanceToNow(new Date(response.createdAt), { addSuffix: true })}
                        </span>
                      </div>
                      <p className="whitespace-pre-line">{response.text}</p>
                      <p className="text-xs text-gray-500 mt-2">{responseDate}</p>
                    </div>
                  );
                })}
              </div>
            )}
          </div>
          
          <div className="bg-white rounded-lg shadow-sm p-6 mb-8">
            <h2 className="text-xl font-semibold mb-4">Add Response</h2>
            <form onSubmit={handleSubmitResponse}>
              <div className="mb-4">
                <Textarea
                  placeholder="Add additional information or respond to questions..."
                  className="min-h-[120px]"
                  value={newResponse}
                  onChange={(e) => setNewResponse(e.target.value)}
                  required
                />
              </div>
              <div className="flex justify-end">
                <Button
                  type="submit"
                  className="bg-ces-primary hover:bg-ces-secondary"
                  disabled={isSubmitting || !newResponse.trim()}
                >
                  {isSubmitting ? "Submitting..." : "Submit Response"}
                </Button>
              </div>
            </form>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default ViewComplaint;
