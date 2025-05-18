
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import ComplaintCard from "@/components/ComplaintCard";
import { useComplaints } from "@/context/ComplaintsContext";
import { Complaint } from "@/types/complaint";
import { Label } from "@/components/ui/label";

const Dashboard = () => {
  const { complaints } = useComplaints();
  const [email, setEmail] = useState("");
  const [savedEmail, setSavedEmail] = useState("");
  const [filteredComplaints, setFilteredComplaints] = useState<Complaint[]>([]);
  const [statusFilter, setStatusFilter] = useState<string>("all");
  const [searchTerm, setSearchTerm] = useState("");
  
  // Check if we have a saved email in localStorage
  useEffect(() => {
    const storedEmail = localStorage.getItem("citizenEmail");
    if (storedEmail) {
      setEmail(storedEmail);
      setSavedEmail(storedEmail);
    }
  }, []);
  
  // Filter complaints whenever filters change
  useEffect(() => {
    if (!savedEmail) return;
    
    let filtered = complaints.filter(
      (complaint) => complaint.citizenEmail.toLowerCase() === savedEmail.toLowerCase()
    );
    
    // Apply status filter if not 'all'
    if (statusFilter !== "all") {
      filtered = filtered.filter((complaint) => complaint.status === statusFilter);
    }
    
    // Apply search term if any
    if (searchTerm) {
      const term = searchTerm.toLowerCase();
      filtered = filtered.filter(
        (complaint) =>
          complaint.title.toLowerCase().includes(term) ||
          complaint.description.toLowerCase().includes(term) ||
          complaint.location.toLowerCase().includes(term) ||
          complaint.category.toLowerCase().includes(term)
      );
    }
    
    // Sort by creation date (newest first)
    filtered.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
    
    setFilteredComplaints(filtered);
  }, [complaints, savedEmail, statusFilter, searchTerm]);
  
  const handleViewComplaints = () => {
    setSavedEmail(email);
    localStorage.setItem("citizenEmail", email);
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      <main className="flex-grow pt-8 pb-16">
        <div className="container mx-auto px-4">
          <h1 className="text-3xl font-bold text-ces-primary mb-2">My Complaints</h1>
          <p className="text-gray-600 mb-8">
            Track the status of your submitted complaints and view responses.
          </p>
          
          {!savedEmail ? (
            <div className="bg-white rounded-lg shadow-sm p-6 max-w-lg mx-auto">
              <h2 className="text-xl font-semibold mb-4">View Your Complaints</h2>
              <p className="text-gray-600 mb-4">
                Enter the email address you used when submitting your complaints.
              </p>
              <div className="space-y-4">
                <div>
                  <Label htmlFor="email">Email Address</Label>
                  <Input
                    id="email"
                    type="email"
                    placeholder="your.email@example.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </div>
                <Button 
                  className="w-full bg-ces-primary hover:bg-ces-secondary"
                  onClick={handleViewComplaints}
                  disabled={!email}
                >
                  View My Complaints
                </Button>
              </div>
            </div>
          ) : (
            <div>
              <div className="flex flex-col md:flex-row items-start md:items-center justify-between mb-6 gap-4">
                <div className="flex-grow w-full md:max-w-md">
                  <Input
                    placeholder="Search complaints..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="bg-white"
                  />
                </div>
                
                <div className="flex gap-4 items-center w-full md:w-auto">
                  <div className="w-full md:w-auto">
                    <Select
                      value={statusFilter}
                      onValueChange={(value) => setStatusFilter(value)}
                    >
                      <SelectTrigger className="w-full md:w-40 bg-white">
                        <SelectValue placeholder="Filter by status" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="all">All Statuses</SelectItem>
                        <SelectItem value="new">New</SelectItem>
                        <SelectItem value="in-progress">In Progress</SelectItem>
                        <SelectItem value="resolved">Resolved</SelectItem>
                        <SelectItem value="closed">Closed</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  
                  <Button asChild variant="default" className="bg-ces-primary hover:bg-ces-secondary whitespace-nowrap">
                    <Link to="/submit">
                      New Complaint
                    </Link>
                  </Button>
                </div>
              </div>
              
              <div>
                <p className="text-sm text-gray-500 mb-4">
                  Viewing complaints for: <span className="font-medium">{savedEmail}</span> 
                  <button 
                    className="text-ces-secondary underline ml-2"
                    onClick={() => {
                      setSavedEmail("");
                      localStorage.removeItem("citizenEmail");
                    }}
                  >
                    Change
                  </button>
                </p>
                
                {filteredComplaints.length === 0 ? (
                  <div className="text-center py-12">
                    <h3 className="text-xl font-semibold mb-2">No complaints found</h3>
                    <p className="text-gray-600 mb-4">
                      {!complaints.length 
                        ? "You haven't submitted any complaints yet."
                        : "No complaints match your current filters."}
                    </p>
                    <Button asChild variant="default" className="bg-ces-primary hover:bg-ces-secondary">
                      <Link to="/submit">
                        Submit a New Complaint
                      </Link>
                    </Button>
                  </div>
                ) : (
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {filteredComplaints.map((complaint) => (
                      <ComplaintCard 
                        key={complaint.id} 
                        complaint={complaint}
                      />
                    ))}
                  </div>
                )}
              </div>
            </div>
          )}
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default Dashboard;
