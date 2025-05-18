
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import ComplaintCard from "@/components/ComplaintCard";
import { useComplaints } from "@/context/ComplaintsContext";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Card, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { useToast } from "@/hooks/use-toast";
import { Complaint } from "@/types/complaint";

const AdminDashboard = () => {
  const navigate = useNavigate();
  const { complaints, categories, departments } = useComplaints();
  const { toast } = useToast();
  
  const [isAdmin, setIsAdmin] = useState(false);
  const [adminName, setAdminName] = useState("");
  const [adminDepartment, setAdminDepartment] = useState("");
  
  const [statusFilter, setStatusFilter] = useState<string>("all");
  const [categoryFilter, setCategoryFilter] = useState<string>("all");
  const [departmentFilter, setDepartmentFilter] = useState<string>("all");
  const [searchTerm, setSearchTerm] = useState("");
  
  const [filteredComplaints, setFilteredComplaints] = useState<Complaint[]>(complaints);
  
  // Check admin authentication
  useEffect(() => {
    const adminLoggedIn = localStorage.getItem("adminLoggedIn");
    
    if (adminLoggedIn !== "true") {
      toast({
        title: "Authentication Required",
        description: "Please log in to access the admin dashboard.",
      });
      navigate("/admin");
      return;
    }
    
    setIsAdmin(true);
    setAdminName(localStorage.getItem("adminName") || "Admin User");
    setAdminDepartment(localStorage.getItem("adminDepartment") || "");
  }, [navigate, toast]);
  
  // Filter complaints
  useEffect(() => {
    if (!complaints) return;
    
    let filtered = [...complaints];
    
    // Apply status filter
    if (statusFilter !== "all") {
      filtered = filtered.filter((complaint) => complaint.status === statusFilter);
    }
    
    // Apply category filter
    if (categoryFilter !== "all") {
      filtered = filtered.filter((complaint) => complaint.category === categoryFilter);
    }
    
    // Apply department filter
    if (departmentFilter !== "all") {
      filtered = filtered.filter((complaint) => complaint.departmentAssigned === departmentFilter);
    }
    
    // Apply search term
    if (searchTerm) {
      const term = searchTerm.toLowerCase();
      filtered = filtered.filter(
        (complaint) =>
          complaint.title.toLowerCase().includes(term) ||
          complaint.description.toLowerCase().includes(term) ||
          complaint.location.toLowerCase().includes(term) ||
          complaint.citizenName.toLowerCase().includes(term) ||
          complaint.citizenEmail.toLowerCase().includes(term) ||
          (complaint.category && complaint.category.toLowerCase().includes(term))
      );
    }
    
    // Sort by creation date (newest first)
    filtered.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
    
    setFilteredComplaints(filtered);
  }, [complaints, statusFilter, categoryFilter, departmentFilter, searchTerm]);
  
  // Compute statistics
  const totalComplaints = complaints.length;
  const newComplaints = complaints.filter(c => c.status === "new").length;
  const inProgressComplaints = complaints.filter(c => c.status === "in-progress").length;
  const resolvedComplaints = complaints.filter(c => c.status === "resolved").length;
  
  const handleLogout = () => {
    localStorage.removeItem("adminLoggedIn");
    localStorage.removeItem("adminName");
    localStorage.removeItem("adminDepartment");
    navigate("/admin");
  };
  
  if (!isAdmin) {
    return (
      <div className="min-h-screen flex flex-col">
        <Header />
        <main className="flex-grow container mx-auto px-4 py-12">
          <div className="text-center">
            <h1 className="text-2xl font-bold mb-4">Loading...</h1>
          </div>
        </main>
        <Footer />
      </div>
    );
  }
  
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      <main className="flex-grow pt-8 pb-16">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
            <div>
              <h1 className="text-3xl font-bold text-ces-primary">Admin Dashboard</h1>
              <p className="text-gray-600">
                Welcome, {adminName} {adminDepartment ? `(${adminDepartment})` : ""}
              </p>
            </div>
            
            <Button variant="outline" onClick={handleLogout}>
              Logout
            </Button>
          </div>
          
          {/* Statistics cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
            <Card className="bg-white">
              <CardContent className="p-6">
                <h3 className="text-gray-500 mb-2">Total Complaints</h3>
                <p className="text-4xl font-bold">{totalComplaints}</p>
              </CardContent>
            </Card>
            
            <Card className="bg-white">
              <CardContent className="p-6">
                <h3 className="text-gray-500 mb-2">New</h3>
                <p className="text-4xl font-bold text-blue-600">{newComplaints}</p>
              </CardContent>
            </Card>
            
            <Card className="bg-white">
              <CardContent className="p-6">
                <h3 className="text-gray-500 mb-2">In Progress</h3>
                <p className="text-4xl font-bold text-yellow-600">{inProgressComplaints}</p>
              </CardContent>
            </Card>
            
            <Card className="bg-white">
              <CardContent className="p-6">
                <h3 className="text-gray-500 mb-2">Resolved</h3>
                <p className="text-4xl font-bold text-green-600">{resolvedComplaints}</p>
              </CardContent>
            </Card>
          </div>
          
          {/* Filter controls */}
          <div className="bg-white p-6 rounded-lg shadow-sm mb-6">
            <h2 className="text-xl font-semibold mb-4">Filter Complaints</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              <div>
                <Input
                  placeholder="Search complaints..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
              
              <Select
                value={statusFilter}
                onValueChange={(value) => setStatusFilter(value)}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Filter by status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Statuses</SelectItem>
                  <SelectItem value="new">New</SelectItem>
                  <SelectItem value="assigned">Assigned</SelectItem>
                  <SelectItem value="in-progress">In Progress</SelectItem>
                  <SelectItem value="resolved">Resolved</SelectItem>
                  <SelectItem value="closed">Closed</SelectItem>
                </SelectContent>
              </Select>
              
              <Select
                value={categoryFilter}
                onValueChange={(value) => setCategoryFilter(value)}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Filter by category" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Categories</SelectItem>
                  {categories.map((category) => (
                    <SelectItem key={category} value={category}>
                      {category}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              
              <Select
                value={departmentFilter}
                onValueChange={(value) => setDepartmentFilter(value)}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Filter by department" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Departments</SelectItem>
                  {departments.map((department) => (
                    <SelectItem key={department} value={department}>
                      {department}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>
          
          {/* Complaints list */}
          <h2 className="text-xl font-semibold mb-4">Complaints ({filteredComplaints.length})</h2>
          
          {filteredComplaints.length === 0 ? (
            <div className="text-center py-12 bg-white rounded-lg">
              <h3 className="text-lg font-semibold mb-2">No complaints found</h3>
              <p className="text-gray-600">Try adjusting your filters.</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredComplaints.map((complaint) => (
                <ComplaintCard 
                  key={complaint.id} 
                  complaint={complaint}
                  isAdminView={true}
                />
              ))}
            </div>
          )}
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default AdminDashboard;
