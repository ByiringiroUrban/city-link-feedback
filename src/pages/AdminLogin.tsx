
import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useNavigate, Link } from "react-router-dom";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { useToast } from "@/hooks/use-toast";
import { useAuth } from "@/context/AuthContext";

const formSchema = z.object({
  email: z.string().email("Please enter a valid government email address"),
  password: z.string().min(6, "Password must be at least 6 characters"),
});

const AdminLogin = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const { login } = useAuth();
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    setIsSubmitting(true);
    
    try {
      // Check specifically for admin credentials
      if (values.email === "admin@gov.example" && values.password === "admin123") {
        const user = await login(values.email, values.password);
        
        if (user.role === "admin") {
          toast({
            title: "Admin Login Successful",
            description: "Welcome to the admin dashboard.",
          });
          
          navigate("/admin/dashboard");
        } else {
          toast({
            title: "Access Denied",
            description: "Your account does not have admin privileges.",
            variant: "destructive",
          });
        }
      } else {
        toast({
          title: "Admin Login Failed",
          description: "Invalid admin credentials. (Hint: Use admin@gov.example / admin123)",
          variant: "destructive",
        });
      }
    } catch (error) {
      toast({
        title: "Login Error",
        description: "An unexpected error occurred. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      <main className="flex-grow py-12">
        <div className="max-w-md mx-auto px-4">
          <div className="text-center mb-8 animate-fade-in">
            <h1 className="text-2xl font-bold text-ces-primary mb-2">Government Admin Portal</h1>
            <p className="text-gray-600">
              Login to manage and respond to citizen complaints.
            </p>
          </div>
          
          <div className="bg-white rounded-lg shadow-sm p-8 animate-fade-in" style={{animationDelay: "0.2s"}}>
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Email</FormLabel>
                      <FormControl>
                        <Input 
                          placeholder="your.name@gov.example" 
                          type="email" 
                          {...field} 
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <FormField
                  control={form.control}
                  name="password"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Password</FormLabel>
                      <FormControl>
                        <Input 
                          placeholder="Enter your password" 
                          type="password" 
                          {...field} 
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <Button
                  type="submit"
                  className="w-full bg-ces-primary hover:bg-ces-secondary transition-all duration-300"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? "Logging in..." : "Log In"}
                </Button>
              </form>
            </Form>
            
            <div className="mt-4 text-center text-sm text-gray-500">
              <p>For demo purposes: Use <strong>admin@gov.example</strong> and password <strong>admin123</strong></p>
            </div>
          </div>
          
          <div className="mt-6 text-center">
            <Link to="/" className="text-ces-secondary hover:underline">
              Return to Citizen Portal
            </Link>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default AdminLogin;
