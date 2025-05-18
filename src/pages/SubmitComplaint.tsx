
import { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { useComplaints } from "@/context/ComplaintsContext";
import { ComplaintForm } from "@/components/complaints/ComplaintForm";
import { useComplaintSubmission } from "@/hooks/useComplaintSubmission";
import { toast } from "@/hooks/use-toast";

const SubmitComplaint = () => {
  const [searchParams] = useSearchParams();
  const preselectedCategory = searchParams.get("category") || "";
  const { isSubmitting, submitComplaint } = useComplaintSubmission();
  
  // Store categories in local state
  const [categories, setCategories] = useState<string[]>([]);
  
  // Try to get categories from context, but provide fallback
  useEffect(() => {
    try {
      const { categories: contextCategories } = useComplaints();
      if (contextCategories && contextCategories.length > 0) {
        setCategories(contextCategories);
      } else {
        // Fallback categories if context fails
        setCategories(["Roads & Infrastructure", "Water Supply", "Electricity", "Sanitation", "Public Safety", "Other"]);
      }
    } catch (error) {
      console.error("Error accessing complaints context:", error);
      // Use fallback categories
      setCategories(["Roads & Infrastructure", "Water Supply", "Electricity", "Sanitation", "Public Safety", "Other"]);
      
      // Show error toast
      toast({
        title: "System Notice",
        description: "Some features may be limited. Please try refreshing the page.",
        variant: "destructive",
      });
    }
  }, []);

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      <main className="flex-grow py-8 md:py-12 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto bg-white rounded-lg shadow-sm p-6 md:p-8 animate-fade-in">
            <h1 className="text-2xl md:text-3xl font-bold text-ces-primary mb-6">Submit a Complaint</h1>
            
            <ComplaintForm
              preselectedCategory={preselectedCategory}
              categories={categories}
              onSubmit={submitComplaint}
              isSubmitting={isSubmitting}
            />
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default SubmitComplaint;
