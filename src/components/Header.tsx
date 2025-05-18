
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";

const Header = () => {
  return (
    <header className="bg-ces-primary text-white shadow-md">
      <div className="container mx-auto flex items-center justify-between py-4">
        <Link to="/" className="flex items-center gap-2">
          <svg 
            xmlns="http://www.w3.org/2000/svg" 
            viewBox="0 0 24 24" 
            fill="none" 
            stroke="currentColor" 
            strokeWidth="2" 
            strokeLinecap="round" 
            strokeLinejoin="round" 
            className="h-8 w-8"
          >
            <path d="M18 3a3 3 0 0 0-3 3v12a3 3 0 0 0 3 3 3 3 0 0 0 3-3 3 3 0 0 0-3-3H6a3 3 0 0 0-3 3 3 3 0 0 0 3 3 3 3 0 0 0 3-3V6a3 3 0 0 0-3-3 3 3 0 0 0-3 3 3 3 0 0 0 3 3h12a3 3 0 0 0 3-3 3 3 0 0 0-3-3z"></path>
          </svg>
          <h1 className="text-xl font-bold">Citizen Engagement System</h1>
        </Link>
        <nav className="hidden md:flex items-center gap-6">
          <Link to="/" className="hover:text-ces-light transition-colors">Home</Link>
          <Link to="/dashboard" className="hover:text-ces-light transition-colors">My Complaints</Link>
          <Link to="/submit" className="hover:text-ces-light transition-colors">Submit Complaint</Link>
        </nav>
        <div className="flex items-center gap-4">
          <Button asChild variant="outline" className="bg-white text-ces-primary hover:bg-ces-light">
            <Link to="/admin">Admin Login</Link>
          </Button>
          <Button asChild variant="default" className="bg-ces-accent hover:bg-ces-secondary">
            <Link to="/submit">Report Issue</Link>
          </Button>
          <Button variant="ghost" className="md:hidden text-white" aria-label="Menu">
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-menu"><line x1="4" x2="20" y1="12" y2="12"/><line x1="4" x2="20" y1="6" y2="6"/><line x1="4" x2="20" y1="18" y2="18"/></svg>
          </Button>
        </div>
      </div>
    </header>
  );
};

export default Header;
