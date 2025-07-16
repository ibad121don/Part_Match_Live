import { Button } from "@/components/ui/button";
import { ArrowLeft, LogOut, Home, Bell, X, User } from "lucide-react";
import { useNavigate, Link } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { useTranslation } from "react-i18next";
import NotificationBell from "./NotificationBell";
interface PageHeaderProps {
  title: string;
  subtitle?: string;
  showBackButton?: boolean;
  backTo?: string;
  showSignOut?: boolean;
  showHomeButton?: boolean;
  children?: React.ReactNode;
}
const PageHeader = ({
  title,
  subtitle,
  showBackButton = false,
  backTo,
  showSignOut = false,
  showHomeButton = false,
  children
}: PageHeaderProps) => {
  const navigate = useNavigate();
  const { t } = useTranslation();
  const {
    signOut,
    user
  } = useAuth();
  const getInitials = (email: string) => {
    return email.charAt(0).toUpperCase();
  };
  const handleNotificationClick = () => {
    // TODO: Implement notification panel
    console.log('Opening notifications...');
  };
  const handleProfileClick = () => {
    navigate('/dashboard');
  };
  const handleBack = () => {
    if (backTo) {
      navigate(backTo);
    } else {
      navigate(-1);
    }
  };
  const handleSignOut = async () => {
    try {
      await signOut();
      navigate('/buyer-auth');
    } catch (error) {
      console.error('Error signing out:', error);
    }
  };
  const handleHome = () => {
    console.log('PageHeader: Home button clicked, navigating to /');
    window.location.href = '/';
  };
  return <header className="p-4 sm:p-6 flex items-center gap-3 bg-gradient-to-r from-white/90 via-blue-50/80 to-white/90 backdrop-blur-lg shadow-lg border-b">
      {showBackButton && <Button variant="ghost" size="icon" onClick={handleBack} className="h-8 w-8 sm:h-10 sm:w-10 hover:bg-white/50 flex-shrink-0">
          <ArrowLeft className="h-4 w-4 sm:h-5 sm:w-5" />
        </Button>}
      
      {/* Logo and Ghana */}
      <Link to="/" className="flex items-center gap-2 sm:gap-3 flex-shrink-0 hover:opacity-80 transition-opacity">
        <img src="/lovable-uploads/bcd13b92-5d2a-4796-b9d3-29ff8bed43d9.png" alt="PartMatch Logo" className="h-10 w-auto sm:h-12 bg-white rounded-sm p-1 object-fill" />
        <span className="text-lg sm:text-xl font-bold text-gray-700">
      </span>
      </Link>
      
      <div className="flex flex-col min-w-0 flex-1">
        <h1 className="page-header text-xl sm:text-2xl lg:text-3xl bg-gradient-to-r from-blue-700 to-indigo-700 bg-clip-text text-transparent truncate">
          {t('welcomeToPartMatch')}
        </h1>
        {subtitle && <p className="section-subtitle text-sm truncate">{subtitle}</p>}
      </div>
      
      <div className="flex items-center gap-2">
        {/* Notification Bell */}
        <NotificationBell />

        {/* Profile Icon */}
        {user && <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="relative h-8 w-8 rounded-full">
                <Avatar className="h-8 w-8">
                  <AvatarFallback className="bg-primary text-primary-foreground">
                    {getInitials(user.email || 'U')}
                  </AvatarFallback>
                </Avatar>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-56" align="end" forceMount>
              <DropdownMenuItem onClick={handleProfileClick}>
                <User className="mr-2 h-4 w-4" />
                <span>{t('dashboard')}</span>
              </DropdownMenuItem>
              <DropdownMenuItem onClick={handleSignOut}>
                <LogOut className="mr-2 h-4 w-4" />
                <span>{t('signOut')}</span>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>}
        
        {showHomeButton && <Button variant="ghost" size="sm" onClick={handleHome} className="text-gray-700 hover:text-blue-700 hover:bg-blue-50/50 transition-all duration-300">
            <Home className="h-4 w-4 mr-2" />
            <span className="hidden sm:inline">{t('home')}</span>
          </Button>}
        {showSignOut && <Button variant="ghost" size="sm" onClick={handleSignOut} className="text-gray-700 hover:text-red-700 hover:bg-red-50/50 transition-all duration-300 p-2">
            <X className="h-5 w-5" />
          </Button>}
        {children}
      </div>
    </header>;
};
export default PageHeader;