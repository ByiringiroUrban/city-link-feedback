
import React, { createContext, useContext, useState, useEffect } from "react";
import { Complaint, ComplaintsContextType } from "@/types/complaint";
import { initialComplaints, categoryList, departmentList } from "@/constants/complaintData";
import { useComplaintActions } from "./complaintActions";

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

  const {
    addComplaint,
    updateComplaint,
    addResponse,
    getComplaintById,
    getCitizenComplaints
  } = useComplaintActions(complaints, setComplaints);

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
