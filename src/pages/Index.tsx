
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
        <section className="bg-gradient-to-r from-ces-primary to-ces-secondary py-24 text-white relative overflow-hidden">
          <div className="absolute inset-0 z-0 opacity-30">
            <img 
              src="https://images.unsplash.com/photo-1573590330099-d6c7355ec595?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1469&q=80" 
              alt="City view" 
              className="w-full h-full object-cover"
            />
          </div>
          <div className="container mx-auto px-4 text-center relative z-10">
            <h1 className="text-4xl md:text-5xl font-bold mb-6 animate-fade-in">
              Your Voice Matters
            </h1>
            <p className="text-xl md:text-2xl max-w-2xl mx-auto mb-10 opacity-90 animate-fade-in" style={{animationDelay: "0.2s"}}>
              Easily submit and track complaints about public services in your community.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center animate-fade-in" style={{animationDelay: "0.4s"}}>
              <Button asChild size="lg" className="bg-white text-ces-primary hover:bg-ces-light transition-all duration-300 transform hover:scale-105">
                <Link to="/submit">Report an Issue</Link>
              </Button>
              <Button asChild size="lg" className="bg-ces-accent hover:bg-blue-600 transition-all duration-300 transform hover:scale-105">
                <Link to="/dashboard">Track Your Complaints</Link>
              </Button>
            </div>
          </div>
          <div className="absolute bottom-0 left-0 w-full overflow-hidden">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 120" preserveAspectRatio="none" className="relative block w-full h-12">
              <path d="M0,0V46.29c47.79,22.2,103.59,32.17,158,28,70.36-5.37,136.33-33.31,206.8-37.5C438.64,32.43,512.34,53.67,583,72.05c69.27,18,138.3,24.88,209.4,13.08,36.15-6,69.85-17.84,104.45-29.34C989.49,25,1113-14.29,1200,52.47V0Z" opacity=".25" className="fill-white"></path>
              <path d="M0,0V15.81C13,36.92,27.64,56.86,47.69,72.05,99.41,111.27,165,111,224.58,91.58c31.15-10.15,60.09-26.07,89.67-39.8,40.92-19,84.73-46,130.83-49.67,36.26-2.85,70.9,9.42,98.6,31.56,31.77,25.39,62.32,62,103.63,73,40.44,10.79,81.35-6.69,119.13-24.28s75.16-39,116.92-43.05c59.73-5.85,113.28,22.88,168.9,38.84,30.2,8.66,59,6.17,87.09-7.5,22.43-10.89,48-26.93,60.65-49.24V0Z" opacity=".5" className="fill-white"></path>
              <path d="M0,0V5.63C149.93,59,314.09,71.32,475.83,42.57c43-7.64,84.23-20.12,127.61-26.46,59-8.63,112.48,12.24,165.56,35.4C827.93,77.22,886,95.24,951.2,90c86.53-7,172.46-45.71,248.8-84.81V0Z" className="fill-white"></path>
            </svg>
          </div>
        </section>
        
        {/* Statistics section */}
        <section className="py-16 bg-ces-light">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <Card className="text-center p-6 shadow-md hover:shadow-lg transition-all duration-500 transform hover:scale-105 overflow-hidden group">
                <CardContent className="p-0 pt-4">
                  <div className="text-5xl font-bold text-ces-primary mb-4 transition-all duration-700">{totalComplaints}</div>
                  <p className="text-gray-600 text-lg">Total Complaints</p>
                  <div className="mt-6 opacity-10 group-hover:opacity-30 transition-opacity">
                    <svg xmlns="http://www.w3.org/2000/svg" width="80" height="80" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round" className="mx-auto text-ces-primary"><path d="M9 12h6"></path><path d="M12 9v6"></path><path d="M3 12a9 9 0 1 0 18 0a9 9 0 0 0 -18 0"></path></svg>
                  </div>
                </CardContent>
              </Card>
              <Card className="text-center p-6 shadow-md hover:shadow-lg transition-all duration-500 transform hover:scale-105 overflow-hidden group">
                <CardContent className="p-0 pt-4">
                  <div className="text-5xl font-bold text-ces-secondary mb-4 transition-all duration-700">{activeComplaints}</div>
                  <p className="text-gray-600 text-lg">Active Complaints</p>
                  <div className="mt-6 opacity-10 group-hover:opacity-30 transition-opacity">
                    <svg xmlns="http://www.w3.org/2000/svg" width="80" height="80" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round" className="mx-auto text-ces-secondary"><path d="M12 12m-9 0a9 9 0 1 0 18 0a9 9 0 1 0 -18 0"></path><path d="M12 7v5l2 2"></path></svg>
                  </div>
                </CardContent>
              </Card>
              <Card className="text-center p-6 shadow-md hover:shadow-lg transition-all duration-500 transform hover:scale-105 overflow-hidden group">
                <CardContent className="p-0 pt-4">
                  <div className="text-5xl font-bold text-green-600 mb-4 transition-all duration-700">{resolvedComplaints}</div>
                  <p className="text-gray-600 text-lg">Resolved Issues</p>
                  <div className="mt-6 opacity-10 group-hover:opacity-30 transition-opacity">
                    <svg xmlns="http://www.w3.org/2000/svg" width="80" height="80" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round" className="mx-auto text-green-600"><path d="M5 12l5 5l10 -10"></path><path d="M12 12m-9 0a9 9 0 1 0 18 0a9 9 0 1 0 -18 0"></path></svg>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>
        
        {/* How it works section */}
        <section className="py-20">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold text-center text-ces-primary mb-16">How It Works</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-16">
              <div className="text-center transition-all duration-700 hover:transform hover:translate-y-[-10px]">
                <div className="rounded-full bg-ces-light w-20 h-20 mx-auto mb-6 flex items-center justify-center shadow-md">
                  <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-ces-primary"><path d="M14.5 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7.5L14.5 2z"/><polyline points="14 2 14 8 20 8"/><path d="M12 18v-6"/><path d="m9 15 3 3 3-3"/></svg>
                </div>
                <h3 className="text-2xl font-bold mb-4 text-ces-secondary">Submit</h3>
                <p className="text-gray-600 mb-6">
                  File your complaint using our simple and intuitive submission form.
                </p>
                <div className="mt-4">
                  <Button asChild variant="outline" className="hover:bg-ces-light">
                    <Link to="/submit">Submit Complaint</Link>
                  </Button>
                </div>
              </div>
              
              <div className="text-center transition-all duration-700 hover:transform hover:translate-y-[-10px]">
                <div className="rounded-full bg-ces-light w-20 h-20 mx-auto mb-6 flex items-center justify-center shadow-md">
                  <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-ces-primary"><circle cx="12" cy="12" r="10"/><path d="M16.2 7.8 2 22"/><path d="M21 12c0-4.4-3.6-8-8-8"/></svg>
                </div>
                <h3 className="text-2xl font-bold mb-4 text-ces-secondary">Track</h3>
                <p className="text-gray-600 mb-6">
                  Monitor the status of your complaint in real-time through your dashboard.
                </p>
                <div className="mt-4">
                  <Button asChild variant="outline" className="hover:bg-ces-light">
                    <Link to="/dashboard">View Dashboard</Link>
                  </Button>
                </div>
              </div>
              
              <div className="text-center transition-all duration-700 hover:transform hover:translate-y-[-10px]">
                <div className="rounded-full bg-ces-light w-20 h-20 mx-auto mb-6 flex items-center justify-center shadow-md">
                  <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-ces-primary"><path d="M12 22c5.523 0 10-4.477 10-10S17.523 2 12 2 2 6.477 2 12s4.477 10 10 10z"/><path d="m9 12 2 2 4-4"/></svg>
                </div>
                <h3 className="text-2xl font-bold mb-4 text-ces-secondary">Resolve</h3>
                <p className="text-gray-600 mb-6">
                  Receive updates as your issue is addressed by the appropriate department.
                </p>
                <div className="mt-4">
                  <Button asChild variant="outline" className="hover:bg-ces-light">
                    <Link to="/register">Get Started</Link>
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Categories section */}
        <section className="py-20 bg-gray-50 relative">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold text-center text-ces-primary mb-16">Complaint Categories</h2>
            
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {["Roads & Infrastructure", "Utilities", "Sanitation", "Public Safety", "Parks & Recreation", "Public Transport", "Noise Complaint", "Environmental Concerns"].map((category, index) => (
                <Button
                  key={index}
                  variant="outline"
                  className="h-auto py-8 flex flex-col gap-2 hover:bg-ces-light hover:text-ces-primary transition-all duration-300 transform hover:scale-105 shadow-sm"
                  asChild
                >
                  <Link to={`/submit?category=${category}`}>
                    <div className="mb-3">
                      {/* Different icon for each category */}
                      {index === 0 && <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M10 3a1 1 0 0 1 1 -1h2a1 1 0 0 1 1 1v2h3a1 1 0 0 1 1 1v2a1 1 0 0 1 -1 1h-3v2h3a1 1 0 0 1 1 1v2a1 1 0 0 1 -1 1h-3v2h3a1 1 0 0 1 1 1v2a1 1 0 0 1 -1 1h-3v2a1 1 0 0 1 -1 1h-2a1 1 0 0 1 -1 -1v-2h-3a1 1 0 0 1 -1 -1v-2a1 1 0 0 1 1 -1h3v-2h-3a1 1 0 0 1 -1 -1v-2a1 1 0 0 1 1 -1h3v-2h-3a1 1 0 0 1 -1 -1v-2a1 1 0 0 1 1 -1h3v-2z"></path></svg>}
                      {index === 1 && <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M5 7a4 4 0 1 0 8 0a4 4 0 1 0 -8 0"></path><path d="M3 21v-2a4 4 0 0 1 4 -4h4a4 4 0 0 1 4 4v2"></path><path d="M16 3.13a4 4 0 0 1 0 7.75"></path><path d="M21 21v-2a4 4 0 0 0 -3 -3.85"></path></svg>}
                      {index === 2 && <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M3 7h18"></path><path d="M10 11v6"></path><path d="M14 11v6"></path><path d="M5 7l1 12a2 2 0 0 0 2 2h8a2 2 0 0 0 2 -2l1 -12"></path><path d="M9 7v-3a1 1 0 0 1 1 -1h4a1 1 0 0 1 1 1v3"></path></svg>}
                      {index === 3 && <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="7" cy="17" r="3"></circle><circle cx="17" cy="17" r="3"></circle><path d="M10 17h4"></path><path d="M2 10h20"></path><path d="M12 4v6"></path><path d="M10 7l4 -3"></path><path d="M14 7l-4 -3"></path></svg>}
                      {index === 4 && <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M7 22v-3"></path><path d="M17 22v-3"></path><path d="M7 19h10"></path><path d="M7 3v4h10v-4"></path><path d="M10 7v12"></path><path d="M14 7v12"></path></svg>}
                      {index === 5 && <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M4 17v2"></path><path d="M20 17v2"></path><path d="M7 12l5 5l5 -5"></path><path d="M12 17v-16"></path></svg>}
                      {index === 6 && <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M3 14a1 1 0 0 1 1 -1h2a1 1 0 0 1 1 1v2a1 1 0 0 1 -1 1h-2a1 1 0 0 1 -1 -1v-2z"></path><path d="M17 14a1 1 0 0 1 1 -1h2a1 1 0 0 1 1 1v2a1 1 0 0 1 -1 1h-2a1 1 0 0 1 -1 -1v-2z"></path><path d="M10 6a1 1 0 0 1 1 -1h2a1 1 0 0 1 1 1v2a1 1 0 0 1 -1 1h-2a1 1 0 0 1 -1 -1v-2z"></path><path d="M10 14a1 1 0 0 1 1 -1h2a1 1 0 0 1 1 1v2a1 1 0 0 1 -1 1h-2a1 1 0 0 1 -1 -1v-2z"></path></svg>}
                      {index === 7 && <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M9 15l6 -6"></path><circle cx="9.5" cy="9.5" r=".5" fill="currentColor"></circle><circle cx="14.5" cy="14.5" r=".5" fill="currentColor"></circle><path d="M5 7.2a2.2 2.2 0 0 1 2.2 -2.2h1a2.2 2.2 0 0 0 1.55 -.64l.7 -.7a2.2 2.2 0 0 1 3.12 0l.7 .7a2.2 2.2 0 0 0 1.55 .64h1a2.2 2.2 0 0 1 2.2 2.2v1a2.2 2.2 0 0 0 .64 1.55l.7 .7a2.2 2.2 0 0 1 0 3.12l-.7 .7a2.2 2.2 0 0 0 -.64 1.55v1a2.2 2.2 0 0 1 -2.2 2.2h-1a2.2 2.2 0 0 0 -1.55 .64l-.7 .7a2.2 2.2 0 0 1 -3.12 0l-.7 -.7a2.2 2.2 0 0 0 -1.55 -.64h-1a2.2 2.2 0 0 1 -2.2 -2.2v-1a2.2 2.2 0 0 0 -.64 -1.55l-.7 -.7a2.2 2.2 0 0 1 0 -3.12l.7 -.7a2.2 2.2 0 0 0 .64 -1.55v-1"></path></svg>}
                    </div>
                    <span className="text-lg font-medium">{category}</span>
                  </Link>
                </Button>
              ))}
            </div>
          </div>
          
          <div className="absolute top-0 right-0 w-1/3 h-full opacity-10">
            <img 
              src="https://images.unsplash.com/photo-1606167668584-78701c57f90d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=870&q=80" 
              alt="Abstract pattern" 
              className="w-full h-full object-cover"
            />
          </div>
        </section>
        
        {/* CTA section with image background */}
        <section className="py-24 bg-ces-primary text-white relative">
          <div className="absolute inset-0 z-0 opacity-30">
            <img 
              src="https://images.unsplash.com/photo-1606857521015-7f9fcf423740?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80" 
              alt="City skyline" 
              className="w-full h-full object-cover"
            />
          </div>
          <div className="container mx-auto px-4 text-center relative z-10">
            <h2 className="text-3xl md:text-4xl font-bold mb-6">Ready to report an issue?</h2>
            <p className="text-xl max-w-2xl mx-auto mb-10 opacity-90">
              Your feedback helps us improve public services and infrastructure.
              Together we can build a better community.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button asChild size="lg" className="bg-white text-ces-primary hover:bg-ces-light transition-all duration-300 transform hover:scale-105">
                <Link to="/submit">Submit a Complaint</Link>
              </Button>
              <Button asChild size="lg" variant="outline" className="border-white text-white hover:bg-white/20 transition-all duration-300">
                <Link to="/register">Create an Account</Link>
              </Button>
            </div>
          </div>
        </section>
      </main>
      
      <Footer />
    </div>
  );
};

export default Index;
