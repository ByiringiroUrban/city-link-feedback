
import React, { createContext, useContext, useState, useEffect } from "react";
import { v4 as uuidv4 } from "uuid";
import { Complaint, ComplaintsContextType, Response } from "@/types/complaint";
import { toast } from "@/hooks/use-toast";

// Sample initial data
const initialComplaints: Complaint[] = [
  {
    id: "c1",
    title: "Pothole on Main Street",
    description: "Large pothole causing traffic delays and potential vehicle damage at intersection of Main St and 5th Ave.",
    category: "Roads & Infrastructure",
    location: "Main Street & 5th Avenue",
    citizenName: "Jane Smith",
    citizenEmail: "jane@example.com",
    status: "in-progress",
    departmentAssigned: "Public Works",
    createdAt: new Date(Date.now() - 864000000).toISOString(),
    updatedAt: new Date(Date.now() - 432000000).toISOString(),
    responses: [
      {
        id: "r1",
        text: "Thank you for reporting. We've dispatched a crew to assess the damage.",
        createdAt: new Date(Date.now() - 600000000).toISOString(),
        isAdmin: true,
        userName: "Public Works Dept"
      }
    ]
  },
  {
    id: "c2",
    title: "Street Light Outage",
    description: "Multiple street lights are not working on Park Avenue, creating safety concerns for pedestrians at night.",
    category: "Utilities",
    location: "Park Avenue between 10th and 12th St",
    citizenName: "John Doe",
    citizenEmail: "john@example.com",
    status: "new",
    createdAt: new Date(Date.now() - 172800000).toISOString(),
    updatedAt: new Date(Date.now() - 172800000).toISOString(),
  },
  {
    id: "c3",
    title: "Overflowing Trash Cans",
    description: "Trash cans at Central Park haven't been emptied for several days and are now overflowing, attracting pests.",
    category: "Sanitation",
    location: "Central Park, South Entrance",
    citizenName: "Sarah Johnson",
    citizenEmail: "sarah@example.com",
    status: "resolved",
    departmentAssigned: "Waste Management",
    createdAt: new Date(Date.now() - 1080000000).toISOString(),
    updatedAt: new Date(Date.now() - 345600000).toISOString(),
    responses: [
      {
        id: "r2",
        text: "Our team has been notified and will address this issue within 24 hours.",
        createdAt: new Date(Date.now() - 950000000).toISOString(),
        isAdmin: true,
        userName: "Waste Management Dept"
      },
      {
        id: "r3",
        text: "The trash cans have been emptied and the area has been cleaned. We've also increased collection frequency for this location.",
        createdAt: new Date(Date.now() - 345600000).toISOString(),
        isAdmin: true,
        userName: "Waste Management Dept"
      }
    ]
  }
];

// Categories
const categoryList = [
  "Roads & Infrastructure",
  "Utilities",
  "Sanitation",
  "Public Safety",
  "Parks & Recreation",
  "Public Transport",
  "Noise Complaint",
  "Building & Zoning",
  "Environmental Concerns",
  "Animal Control",
  "Other"
];

// Departments
const departmentList = [
  "Public Works",
  "Waste Management",
  "Transportation Department",
  "Parks Department",
  "Public Safety",
  "Utility Services",
  "Health Department",
  "Environmental Protection",
  "Building & Zoning",
  "Social Services"
];

const ComplaintsContext = createContext<ComplaintsContextType | undefined>(undefined);

export const ComplaintsProvider = ({ children }: { children: React.ReactNode }) => {
  const [complaints, setComplaints] = useState<Complaint[]>(() => {
    const savedComplaints = localStorage.getItem("complaints");
    return savedComplaints ? JSON.parse(savedComplaints) : initialComplaints;
  });

  // Save to localStorage whenever complaints change
  useEffect(() => {
    localStorage.setItem("complaints", JSON.stringify(complaints));
  }, [complaints]);

  const addComplaint = (complaintData: Omit<Complaint, "id" | "status" | "createdAt" | "updatedAt">) => {
    const now = new Date().toISOString();
    const newComplaint: Complaint = {
      ...complaintData,
      id: uuidv4(),
      status: "new",
      createdAt: now,
      updatedAt: now,
    };

    setComplaints((prevComplaints) => [...prevComplaints, newComplaint]);
    
    // Show a toast notification when complaint is added
    toast({
      title: "Complaint Registered",
      description: "Your complaint has been successfully recorded in our system."
    });
    
    return newComplaint;
  };

  const updateComplaint = (id: string, updates: Partial<Complaint>) => {
    setComplaints((prevComplaints) => 
      prevComplaints.map((complaint) => 
        complaint.id === id 
          ? { 
              ...complaint, 
              ...updates, 
              updatedAt: new Date().toISOString() 
            } 
          : complaint
      )
    );
    return getComplaintById(id);
  };

  const addResponse = (complaintId: string, responseData: Omit<Response, "id" | "createdAt">) => {
    const newResponse: Response = {
      ...responseData,
      id: uuidv4(),
      createdAt: new Date().toISOString(),
    };

    setComplaints((prevComplaints) => 
      prevComplaints.map((complaint) => 
        complaint.id === complaintId 
          ? { 
              ...complaint, 
              responses: [...(complaint.responses || []), newResponse],
              updatedAt: new Date().toISOString(),
              // If an admin is responding, update the status to in-progress if it's new
              status: responseData.isAdmin && complaint.status === "new" ? "in-progress" : complaint.status
            } 
          : complaint
      )
    );
    
    return newResponse;
  };

  const getComplaintById = (id: string) => {
    return complaints.find(complaint => complaint.id === id);
  };

  const getCitizenComplaints = (email: string) => {
    return complaints.filter(complaint => complaint.citizenEmail.toLowerCase() === email.toLowerCase());
  };

  const value = {
    complaints,
    categories: categoryList,
    departments: departmentList,
    addComplaint,
    updateComplaint,
    addResponse,
    getComplaintById,
    getCitizenComplaints,
  };

  return (
    <ComplaintsContext.Provider value={value}>
      {children}
    </ComplaintsContext.Provider>
  );
};

export const useComplaints = () => {
  const context = useContext(ComplaintsContext);
  if (!context) {
    throw new Error("useComplaints must be used within a ComplaintsProvider");
  }
  return context;
};
