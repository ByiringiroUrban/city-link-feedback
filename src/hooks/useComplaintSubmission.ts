
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useToast } from "@/hooks/use-toast";
import { ComplaintFormData } from "@/components/complaints/ComplaintForm";
import { v4 as uuidv4 } from 'uuid';

export const useComplaintSubmission = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const navigate = useNavigate();
  const { toast } = useToast();
  
  // Create a complaint object without relying on context
  const createFallbackComplaint = (data: ComplaintFormData) => {
    const now = new Date().toISOString();
    return {
      id: uuidv4(),
      title: data.title,
      description: data.description,
      category: data.category,
      location: data.location,
      citizenName: data.citizenName,
      citizenEmail: data.citizenEmail,
      citizenPhone: data.citizenPhone,
      status: "new" as const,
      createdAt: now,
      updatedAt: now,
    };
  };

  const submitComplaint = async (formData: ComplaintFormData) => {
    setIsSubmitting(true);
    
    try {
      // Try to access the context, with fallback mechanism
      let newComplaint;
      let useContextMethod = true;
      
      try {
        // Dynamically import to avoid context errors
        const { useComplaints } = await import("@/context/ComplaintsContext");
        const { addComplaint } = useComplaints();
        
        if (typeof addComplaint === 'function') {
          const complaintData = {
            title: formData.title,
            description: formData.description,
            category: formData.category,
            location: formData.location,
            citizenName: formData.citizenName,
            citizenEmail: formData.citizenEmail,
            citizenPhone: formData.citizenPhone,
          };
          
          newComplaint = addComplaint(complaintData);
        } else {
          throw new Error("Context method not available");
        }
      } catch (error) {
        console.error("Failed to access complaints context:", error);
        useContextMethod = false;
        
        // Create a fallback complaint
        newComplaint = createFallbackComplaint(formData);
        
        // Store in localStorage as fallback
        const existingComplaints = JSON.parse(localStorage.getItem('complaints') || '[]');
        existingComplaints.push(newComplaint);
        localStorage.setItem('complaints', JSON.stringify(existingComplaints));
      }
      
      toast({
        title: "Complaint Submitted",
        description: "Your complaint has been successfully submitted.",
      });
      
      // Navigate to complaint view or dashboard
      if (useContextMethod && newComplaint?.id) {
        navigate(`/complaints/${newComplaint.id}`);
      } else {
        // If we used fallback, go to dashboard which will show all complaints
        navigate(`/dashboard`);
      }
    } catch (error) {
      console.error("Error submitting complaint:", error);
      toast({
        title: "Submission Failed",
        description: "There was an error submitting your complaint. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return {
    isSubmitting,
    submitComplaint
  };
};
