
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import StatusBadge from "./StatusBadge";
import { formatDistanceToNow } from "date-fns";
import { Complaint } from "@/types/complaint";

interface ComplaintCardProps {
  complaint: Complaint;
  isAdminView?: boolean;
}

const ComplaintCard = ({ complaint, isAdminView = false }: ComplaintCardProps) => {
  const {
    id,
    title,
    category,
    description,
    location,
    status,
    createdAt,
    departmentAssigned
  } = complaint;

  const formattedDate = formatDistanceToNow(new Date(createdAt), { addSuffix: true });

  return (
    <Card className="overflow-hidden transition-all hover:shadow-md">
      <CardHeader className="pb-2">
        <div className="flex justify-between items-start">
          <div>
            <CardTitle className="text-lg font-semibold text-ces-primary line-clamp-1">
              {title}
            </CardTitle>
            <CardDescription className="text-sm flex items-center mt-1 gap-2">
              <span>{formattedDate}</span>
              <span>•</span>
              <span>ID: {id.slice(0, 8)}</span>
            </CardDescription>
          </div>
          <StatusBadge status={status} />
        </div>
      </CardHeader>
      <CardContent className="pb-4">
        <div className="flex items-center gap-2 mb-2">
          <Badge variant="outline" className="text-xs bg-ces-light">
            {category}
          </Badge>
          {departmentAssigned && (
            <Badge variant="outline" className="text-xs">
              {departmentAssigned}
            </Badge>
          )}
        </div>
        
        <p className="text-gray-600 mb-3 text-sm line-clamp-2">{description}</p>
        
        <div className="flex items-center justify-between mt-3">
          <div className="flex items-center text-sm text-gray-500">
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="mr-1"><path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z"/><circle cx="12" cy="10" r="3"/></svg>
            <span className="line-clamp-1">{location}</span>
          </div>
          
          <Button asChild variant="outline" size="sm" className="text-ces-secondary border-ces-secondary hover:bg-ces-light">
            <Link to={`/complaints/${id}`}>
              {isAdminView ? "Respond" : "View Details"}
            </Link>
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default ComplaintCard;
