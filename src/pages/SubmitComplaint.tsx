
import { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { ComplaintForm } from "@/components/complaints/ComplaintForm";
import { useComplaintSubmission } from "@/hooks/useComplaintSubmission";
import { toast } from "@/hooks/use-toast";
import { useAuth } from "@/context/AuthContext";

// Fallback categories in case context fails
const FALLBACK_CATEGORIES = [
  "Roads & Infrastructure", 
  "Water Supply", 
  "Electricity", 
  "Sanitation", 
  "Public Safety", 
  "Other"
];

const SubmitComplaint = () => {
  const [searchParams] = useSearchParams();
  const preselectedCategory = searchParams.get("category") || "";
  const { isSubmitting, submitComplaint } = useComplaintSubmission();
  const { isAuthenticated } = useAuth();
  
  // Store categories in local state
  const [categories, setCategories] = useState<string[]>(FALLBACK_CATEGORIES);
  const [hasContextError, setHasContextError] = useState(false);
  
  // Try to get categories from context, but provide fallback
  useEffect(() => {
    try {
      // Dynamically import to prevent context errors on initial render
      import("@/context/ComplaintsContext").then(({ useComplaints }) => {
        try {
          const { categories: contextCategories } = useComplaints();
          if (contextCategories && contextCategories.length > 0) {
            setCategories(contextCategories);
            setHasContextError(false);
          }
        } catch (error) {
          console.error("Error accessing complaints context:", error);
          setHasContextError(true);
        }
      }).catch(error => {
        console.error("Error importing complaints context:", error);
        setHasContextError(true);
      });
    } catch (error) {
      console.error("Error in complaints context setup:", error);
      setHasContextError(true);
    }
  }, []);

  // Show warning toast only once when context error occurs
  useEffect(() => {
    if (hasContextError) {
      toast({
        title: "System Notice",
        description: "Some features may be limited. Please try refreshing the page.",
        variant: "destructive",
      });
    }
  }, [hasContextError]);

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      <main className="flex-grow py-8 md:py-12 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto bg-white rounded-lg shadow-sm p-6 md:p-8 animate-fade-in">
            <h1 className="text-2xl md:text-3xl font-bold text-ces-primary mb-6">Submit a Complaint</h1>
            
            {hasContextError && (
              <div className="mb-6 p-4 bg-amber-50 border border-amber-200 rounded-md">
                <p className="text-amber-800">
                  Note: Some system features are limited. Your complaint will still be submitted, but you might need to refresh the page if you encounter any issues.
                </p>
              </div>
            )}
            
            <ComplaintForm
              preselectedCategory={preselectedCategory}
              categories={categories}
              onSubmit={submitComplaint}
              isSubmitting={isSubmitting}
            />

            {!isAuthenticated && (
              <div className="mt-6 p-4 bg-blue-50 border border-blue-100 rounded-md">
                <p className="text-blue-800">
                  Tip: <a href="/login" className="underline hover:text-blue-600">Log in</a> or <a href="/register" className="underline hover:text-blue-600">register</a> to track the status of your complaints.
                </p>
              </div>
            )}
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default SubmitComplaint;
