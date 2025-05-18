
import React, { createContext, useContext, useState, useEffect } from "react";
import { v4 as uuidv4 } from "uuid";
import { User, AuthContextType } from "@/types/auth";
import { toast } from "@/hooks/use-toast";

// Demo users for the MVP
const demoUsers: User[] = [
  {
    id: "admin-1",
    name: "Admin User",
    email: "admin@gov.example",
    role: "admin",
    department: "Public Works"
  },
  {
    id: "citizen-1",
    name: "Jane Citizen",
    email: "jane@example.com",
    role: "citizen"
  }
];

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [isLoading, setIsLoading] = useState(true);
  const [user, setUser] = useState<User | null>(null);
  
  // Initialize auth state from localStorage
  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
    setIsLoading(false);
  }, []);

  // Save user to localStorage when it changes
  useEffect(() => {
    if (user) {
      localStorage.setItem("user", JSON.stringify(user));
    } else {
      localStorage.removeItem("user");
    }
  }, [user]);

  const login = async (email: string, password: string): Promise<User> => {
    setIsLoading(true);
    
    // Simulate API call delay
    await new Promise(resolve => setTimeout(resolve, 800));
    
    try {
      // For demo purposes only - in a real app, use proper authentication
      let foundUser;
      
      // Check against demo users first (admin)
      if (email === "admin@gov.example" && password === "admin123") {
        foundUser = demoUsers.find(u => u.email === email);
      } else if (email === "jane@example.com" && password === "password123") {
        // Check against the demo citizen user
        foundUser = demoUsers.find(u => u.email === email);
      } else {
        // Check against registered users in localStorage
        const registeredUsers = JSON.parse(localStorage.getItem("registeredUsers") || "[]");
        foundUser = registeredUsers.find((u: User) => 
          u.email === email && localStorage.getItem(`user_${u.id}_password`) === password
        );
      }
      
      if (foundUser) {
        setUser(foundUser);
        
        // Remove old admin state properties
        if (foundUser.role === "admin") {
          localStorage.removeItem("adminLoggedIn");
        }
        
        toast({
          title: "Login Successful",
          description: `Welcome back, ${foundUser.name}!`,
        });
        return foundUser;
      } else {
        throw new Error("Invalid email or password");
      }
    } catch (error) {
      toast({
        title: "Login Failed",
        description: error instanceof Error ? error.message : "An unknown error occurred",
        variant: "destructive",
      });
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  const register = async (name: string, email: string, password: string): Promise<User> => {
    setIsLoading(true);
    
    // Simulate API call delay
    await new Promise(resolve => setTimeout(resolve, 800));
    
    try {
      // Check if user already exists
      const registeredUsers = JSON.parse(localStorage.getItem("registeredUsers") || "[]");
      
      if (email === "admin@gov.example" || email === "jane@example.com" || 
          registeredUsers.some((u: User) => u.email === email)) {
        throw new Error("User with this email already exists");
      }
      
      // Create new user
      const newUser: User = {
        id: uuidv4(),
        name,
        email,
        role: "citizen"
      };
      
      // Store in "database"
      const updatedUsers = [...registeredUsers, newUser];
      localStorage.setItem("registeredUsers", JSON.stringify(updatedUsers));
      localStorage.setItem(`user_${newUser.id}_password`, password);
      
      // Log in the user
      setUser(newUser);
      
      toast({
        title: "Registration Successful",
        description: "Your account has been created successfully!",
      });
      
      return newUser;
    } catch (error) {
      toast({
        title: "Registration Failed",
        description: error instanceof Error ? error.message : "An unknown error occurred",
        variant: "destructive",
      });
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  const logout = () => {
    setUser(null);
    toast({
      title: "Logged Out",
      description: "You have been successfully logged out.",
    });
  };

  const updateUser = (data: Partial<User>) => {
    if (!user) return;
    
    const updatedUser = { ...user, ...data };
    setUser(updatedUser);
    
    // Also update in registeredUsers if not an admin
    if (user.role === "citizen") {
      const registeredUsers = JSON.parse(localStorage.getItem("registeredUsers") || "[]");
      const updatedUsers = registeredUsers.map((u: User) => 
        u.id === user.id ? updatedUser : u
      );
      localStorage.setItem("registeredUsers", JSON.stringify(updatedUsers));
    }
    
    toast({
      title: "Profile Updated",
      description: "Your profile information has been updated.",
    });
  };

  return (
    <AuthContext.Provider value={{
      user,
      isAuthenticated: !!user,
      isLoading,
      login,
      register,
      logout,
      updateUser
    }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
