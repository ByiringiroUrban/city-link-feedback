
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

type StatusType = "new" | "in-progress" | "resolved" | "closed" | "assigned" | "pending";

const statusConfig: Record<StatusType, { label: string; className: string }> = {
  "new": { 
    label: "New", 
    className: "bg-blue-100 text-blue-800 hover:bg-blue-100" 
  },
  "in-progress": { 
    label: "In Progress", 
    className: "bg-yellow-100 text-yellow-800 hover:bg-yellow-100" 
  },
  "resolved": { 
    label: "Resolved", 
    className: "bg-green-100 text-green-800 hover:bg-green-100" 
  },
  "closed": { 
    label: "Closed", 
    className: "bg-gray-100 text-gray-800 hover:bg-gray-100" 
  },
  "assigned": { 
    label: "Assigned", 
    className: "bg-purple-100 text-purple-800 hover:bg-purple-100" 
  },
  "pending": { 
    label: "Pending", 
    className: "bg-orange-100 text-orange-800 hover:bg-orange-100" 
  }
};

interface StatusBadgeProps {
  status: StatusType;
  className?: string;
}

const StatusBadge = ({ status, className }: StatusBadgeProps) => {
  const { label, className: badgeClass } = statusConfig[status] || statusConfig.new;
  
  return (
    <Badge className={cn(badgeClass, className)}>
      {label}
    </Badge>
  );
};

export default StatusBadge;
