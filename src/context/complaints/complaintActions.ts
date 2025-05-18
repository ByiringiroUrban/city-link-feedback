
import { v4 as uuidv4 } from "uuid";
import { Complaint, Response } from "@/types/complaint";
import { toast } from "@/hooks/use-toast";

export const useComplaintActions = (
  complaints: Complaint[], 
  setComplaints: React.Dispatch<React.SetStateAction<Complaint[]>>
) => {
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

  return {
    addComplaint,
    updateComplaint,
    addResponse,
    getComplaintById,
    getCitizenComplaints
  };
};
