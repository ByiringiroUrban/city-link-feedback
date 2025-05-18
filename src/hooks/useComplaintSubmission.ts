
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useToast } from "@/hooks/use-toast";
import { useComplaints } from "@/context/ComplaintsContext";
import { ComplaintFormData } from "@/components/complaints/ComplaintForm";

export const useComplaintSubmission = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  // Use a try/catch to handle potential context errors
  let addComplaint;
  try {
    const { addComplaint: contextAddComplaint } = useComplaints();
    addComplaint = contextAddComplaint;
  } catch (error) {
    console.error("Failed to access complaints context:", error);
    // We'll handle this in the submitComplaint function
  }
  
  const navigate = useNavigate();
  const { toast } = useToast();

  const submitComplaint = async (formData: ComplaintFormData) => {
    setIsSubmitting(true);
    
    try {
      // Check if we have access to the addComplaint function
      if (!addComplaint) {
        throw new Error("Cannot access complaint submission functionality");
      }
      
      const complaintData = {
        title: formData.title,
        description: formData.description,
        category: formData.category,
        location: formData.location,
        citizenName: formData.citizenName,
        citizenEmail: formData.citizenEmail,
        citizenPhone: formData.citizenPhone,
      };
      
      const newComplaint = addComplaint(complaintData);
      
      toast({
        title: "Complaint Submitted",
        description: "Your complaint has been successfully submitted.",
      });
      
      navigate(`/complaints/${newComplaint.id}`);
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
