
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Link } from "react-router-dom";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { useComplaints } from "@/context/ComplaintsContext";

const Index = () => {
  const { complaints } = useComplaints();
  
  // Calculate some statistics
  const totalComplaints = complaints.length;
  const resolvedComplaints = complaints.filter(c => c.status === "resolved" || c.status === "closed").length;
  const activeComplaints = totalComplaints - resolvedComplaints;
  
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      <main className="flex-grow">
        {/* Hero section */}
        <section className="bg-gradient-to-r from-ces-primary to-ces-secondary py-20 text-white">
          <div className="container mx-auto px-4 text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-4 animate-fade-in">
              Your Voice Matters
            </h1>
            <p className="text-xl md:text-2xl max-w-2xl mx-auto mb-8 opacity-90">
              Easily submit and track complaints about public services in your community.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button asChild size="lg" className="bg-white text-ces-primary hover:bg-ces-light">
                <Link to="/submit">Report an Issue</Link>
              </Button>
              <Button asChild size="lg" className="bg-ces-accent hover:bg-blue-600">
                <Link to="/dashboard">Track Your Complaints</Link>
              </Button>
            </div>
          </div>
        </section>
        
        {/* Statistics section */}
        <section className="py-12 bg-ces-light">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <Card className="text-center p-6 shadow-sm hover:shadow-md transition-shadow">
                <CardContent className="p-0 pt-4">
                  <div className="text-4xl font-bold text-ces-primary mb-2">{totalComplaints}</div>
                  <p className="text-gray-600">Total Complaints</p>
                </CardContent>
              </Card>
              <Card className="text-center p-6 shadow-sm hover:shadow-md transition-shadow">
                <CardContent className="p-0 pt-4">
                  <div className="text-4xl font-bold text-ces-secondary mb-2">{activeComplaints}</div>
                  <p className="text-gray-600">Active Complaints</p>
                </CardContent>
              </Card>
              <Card className="text-center p-6 shadow-sm hover:shadow-md transition-shadow">
                <CardContent className="p-0 pt-4">
                  <div className="text-4xl font-bold text-green-600 mb-2">{resolvedComplaints}</div>
                  <p className="text-gray-600">Resolved Issues</p>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>
        
        {/* How it works section */}
        <section className="py-16">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold text-center text-ces-primary mb-12">How It Works</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
              <div className="text-center">
                <div className="rounded-full bg-ces-light w-16 h-16 mx-auto mb-6 flex items-center justify-center">
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-ces-primary"><path d="M14.5 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7.5L14.5 2z"/><polyline points="14 2 14 8 20 8"/><path d="M12 18v-6"/><path d="m9 15 3 3 3-3"/></svg>
                </div>
                <h3 className="text-xl font-bold mb-3 text-ces-secondary">Submit</h3>
                <p className="text-gray-600">
                  File your complaint using our simple and intuitive submission form.
                </p>
              </div>
              
              <div className="text-center">
                <div className="rounded-full bg-ces-light w-16 h-16 mx-auto mb-6 flex items-center justify-center">
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-ces-primary"><circle cx="12" cy="12" r="10"/><path d="M16.2 7.8 2 22"/><path d="M21 12c0-4.4-3.6-8-8-8"/></svg>
                </div>
                <h3 className="text-xl font-bold mb-3 text-ces-secondary">Track</h3>
                <p className="text-gray-600">
                  Monitor the status of your complaint in real-time through your dashboard.
                </p>
              </div>
              
              <div className="text-center">
                <div className="rounded-full bg-ces-light w-16 h-16 mx-auto mb-6 flex items-center justify-center">
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-ces-primary"><path d="M12 22c5.523 0 10-4.477 10-10S17.523 2 12 2 2 6.477 2 12s4.477 10 10 10z"/><path d="m9 12 2 2 4-4"/></svg>
                </div>
                <h3 className="text-xl font-bold mb-3 text-ces-secondary">Resolve</h3>
                <p className="text-gray-600">
                  Receive updates as your issue is addressed by the appropriate department.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Categories section */}
        <section className="py-16 bg-gray-50">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold text-center text-ces-primary mb-12">Complaint Categories</h2>
            
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {["Roads & Infrastructure", "Utilities", "Sanitation", "Public Safety", "Parks & Recreation", "Public Transport", "Noise Complaint", "Environmental Concerns"].map((category, index) => (
                <Button
                  key={index}
                  variant="outline"
                  className="h-auto py-6 flex flex-col gap-2 hover:bg-ces-light hover:text-ces-primary transition-colors"
                  asChild
                >
                  <Link to={`/submit?category=${category}`}>
                    <span className="text-lg font-medium">{category}</span>
                  </Link>
                </Button>
              ))}
            </div>
          </div>
        </section>
        
        {/* CTA section */}
        <section className="py-16 bg-ces-primary text-white">
          <div className="container mx-auto px-4 text-center">
            <h2 className="text-3xl font-bold mb-4">Ready to report an issue?</h2>
            <p className="text-xl max-w-2xl mx-auto mb-8 opacity-90">
              Your feedback helps us improve public services and infrastructure.
            </p>
            <Button asChild size="lg" className="bg-white text-ces-primary hover:bg-ces-light">
              <Link to="/submit">Submit a Complaint</Link>
            </Button>
          </div>
        </section>
      </main>
      
      <Footer />
    </div>
  );
};

export default Index;
