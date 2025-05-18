
import { Navigate } from "react-router-dom";
import { useAuth } from "@/context/AuthContext";

const AdminRoute = ({ children }: { children: React.ReactNode }) => {
  const { user, isAuthenticated, isLoading } = useAuth();

  if (isLoading) {
    return <div className="min-h-screen flex items-center justify-center">
      <div className="animate-pulse flex flex-col items-center">
        <div className="rounded-full bg-ces-light w-16 h-16 mx-auto mb-6 flex items-center justify-center">
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="animate-spin text-ces-primary"><path d="M21 12a9 9 0 1 1-6.219-8.56"/></svg>
        </div>
        <h3 className="text-xl font-bold text-ces-primary">Loading...</h3>
      </div>
    </div>;
  }

  if (!isAuthenticated || user?.role !== "admin") {
    return <Navigate to="/admin" replace />;
  }

  return <>{children}</>;
};

export default AdminRoute;
