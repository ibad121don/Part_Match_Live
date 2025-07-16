
import { Shield, ArrowLeft } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";

interface AdminAuthHeaderProps {
  isPasswordReset: boolean;
  showPasswordReset: boolean;
}

const AdminAuthHeader = ({ isPasswordReset, showPasswordReset }: AdminAuthHeaderProps) => {
  return (
    <header className="p-4 sm:p-6 flex items-center gap-3 bg-gradient-to-r from-white/90 via-purple-50/80 to-white/90 backdrop-blur-lg shadow-lg border-b">
      <Link to="/">
        <Button variant="ghost" size="icon" className="h-8 w-8 sm:h-10 sm:w-10 hover:bg-white/50">
          <ArrowLeft className="h-4 w-4 sm:h-5 sm:w-5" />
        </Button>
      </Link>
      <div className="flex items-center gap-2 sm:gap-3">
        <Link to="/" className="hover:opacity-80 transition-opacity">
          <img 
            src="/lovable-uploads/bcd13b92-5d2a-4796-b9d3-29ff8bed43d9.png" 
            alt="PartMatch Logo" 
            className="h-6 w-auto sm:h-8"
          />
        </Link>
        <h1 className="text-xl sm:text-2xl lg:text-3xl font-playfair font-bold bg-gradient-to-r from-purple-700 to-indigo-700 bg-clip-text text-transparent">
          Admin {isPasswordReset ? 'Password Reset' : showPasswordReset ? 'Password Reset' : 'Sign In'}
        </h1>
      </div>
    </header>
  );
};

export default AdminAuthHeader;
