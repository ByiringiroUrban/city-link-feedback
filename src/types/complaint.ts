
export type StatusType = "new" | "in-progress" | "resolved" | "closed" | "assigned" | "pending";

export interface Complaint {
  id: string;
  title: string;
  description: string;
  category: string;
  location: string;
  citizenName: string;
  citizenEmail: string;
  citizenPhone?: string;
  status: StatusType;
  departmentAssigned?: string;
  createdAt: string;
  updatedAt: string;
  assignedTo?: string;
  responses?: Response[];
}

export interface Response {
  id: string;
  text: string;
  createdAt: string;
  isAdmin: boolean;
  userName: string;
}

export interface ComplaintsState {
  complaints: Complaint[];
  categories: string[];
  departments: string[];
}

export interface ComplaintsContextType extends ComplaintsState {
  addComplaint: (complaint: Omit<Complaint, "id" | "status" | "createdAt" | "updatedAt">) => void;
  updateComplaint: (id: string, updates: Partial<Complaint>) => void;
  addResponse: (complaintId: string, response: Omit<Response, "id" | "createdAt">) => void;
  getComplaintById: (id: string) => Complaint | undefined;
  getCitizenComplaints: (email: string) => Complaint[];
}
