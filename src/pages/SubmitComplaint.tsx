
import { useSearchParams } from "react-router-dom";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { useComplaints } from "@/context/ComplaintsContext";
import { ComplaintForm } from "@/components/complaints/ComplaintForm";
import { useComplaintSubmission } from "@/hooks/useComplaintSubmission";

const SubmitComplaint = () => {
  const { categories } = useComplaints();
  const { isSubmitting, submitComplaint } = useComplaintSubmission();
  const [searchParams] = useSearchParams();
  const preselectedCategory = searchParams.get("category") || "";

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
