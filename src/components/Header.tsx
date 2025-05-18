
import { Link } from "react-router-dom";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { useAuth } from "@/context/AuthContext";
import { cn } from "@/lib/utils";

const Header = () => {
  const { user, isAuthenticated, logout } = useAuth();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  
  // Function to handle admin access using Konami code
  const [konamiIndex, setKonamiIndex] = useState(0);
  const konamiCode = [38, 38, 40, 40, 37, 39, 37, 39, 66, 65]; // up up down down left right left right B A
  
  const checkKonamiCode = (e: KeyboardEvent) => {
    if (e.keyCode === konamiCode[konamiIndex]) {
      const nextIndex = konamiIndex + 1;
      setKonamiIndex(nextIndex);
      
      if (nextIndex === konamiCode.length) {
        window.location.href = '/admin';
        setKonamiIndex(0);
      }
    } else {
      setKonamiIndex(0);
    }
  };
  
  // Set up event listener for Konami code
  useState(() => {
    window.addEventListener('keydown', checkKonamiCode);
    return () => {
      window.removeEventListener('keydown', checkKonamiCode);
    };
  });

  return (
    <header className="bg-ces-primary text-white shadow-md sticky top-0 z-50 animate-fade-in">
      <div className="container mx-auto flex items-center justify-between py-4 px-4">
        <Link to="/" className="flex items-center gap-2 transition-transform hover:scale-105 duration-300">
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
          <h1 className="text-xl font-bold">Citizen Engagement</h1>
        </Link>
        
        <nav className={cn(
          "md:flex items-center gap-6 absolute md:static inset-x-0 top-full bg-ces-primary md:bg-transparent py-4 md:py-0 px-4 md:px-0 shadow-md md:shadow-none transition-all duration-300 ease-in-out",
          mobileMenuOpen ? "flex flex-col" : "hidden"
        )}>
          <Link to="/" className="hover:text-ces-light transition-colors py-2 md:py-0">Home</Link>
          <Link to="/dashboard" className="hover:text-ces-light transition-colors py-2 md:py-0">My Complaints</Link>
          <Link to="/submit" className="hover:text-ces-light transition-colors py-2 md:py-0">Submit Complaint</Link>
        </nav>
        
        <div className="flex items-center gap-4">
          {isAuthenticated ? (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="relative h-10 w-10 rounded-full">
                  <Avatar className="h-10 w-10 border-2 border-ces-accent">
                    <AvatarFallback className="bg-ces-accent text-white">
                      {user?.name.charAt(0)}
                    </AvatarFallback>
                  </Avatar>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-56">
                <DropdownMenuItem className="font-medium">
                  <div className="flex flex-col">
                    <span>{user?.name}</span>
                    <span className="text-xs text-gray-500">{user?.email}</span>
                  </div>
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <Link to="/dashboard" className="flex w-full">My Complaints</Link>
                </DropdownMenuItem>
                {user?.role === "admin" && (
                  <DropdownMenuItem>
                    <Link to="/admin/dashboard" className="flex w-full">Admin Dashboard</Link>
                  </DropdownMenuItem>
                )}
                <DropdownMenuItem onClick={logout}>
                  Log out
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          ) : (
            <>
              <Button asChild variant="ghost" className="hidden md:flex text-white hover:bg-ces-secondary">
                <Link to="/login">Log In</Link>
              </Button>
              <Button asChild variant="default" className="hidden md:flex bg-ces-accent hover:bg-ces-secondary">
                <Link to="/register">Register</Link>
              </Button>
            </>
          )}
          <Button asChild variant="default" className="bg-ces-accent hover:bg-ces-secondary hidden md:flex">
            <Link to="/submit">Report Issue</Link>
          </Button>
          <Button 
            variant="ghost" 
            className="md:hidden text-white"
            aria-label="Menu"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-menu"><line x1="4" x2="20" y1="12" y2="12"/><line x1="4" x2="20" y1="6" y2="6"/><line x1="4" x2="20" y1="18" y2="18"/></svg>
          </Button>
        </div>
      </div>
      
      {/* Mobile menu links (shown when menu is open) */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-ces-primary border-t border-ces-secondary py-2 px-4 shadow-md">
          {!isAuthenticated && (
            <div className="flex flex-col gap-2 mb-4 mt-2">
              <Button asChild variant="outline" className="w-full border-white text-white hover:bg-ces-secondary">
                <Link to="/login">Log In</Link>
              </Button>
              <Button asChild variant="default" className="w-full bg-ces-accent hover:bg-ces-secondary">
                <Link to="/register">Register</Link>
              </Button>
            </div>
          )}
          <Button asChild variant="default" className="w-full bg-ces-accent hover:bg-ces-secondary mb-2">
            <Link to="/submit">Report Issue</Link>
          </Button>
        </div>
      )}
    </header>
  );
};

export default Header;
