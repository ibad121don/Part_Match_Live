
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { ShoppingCart, Mail, Lock, Phone, MapPin, Eye, EyeOff } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import { toast } from "@/hooks/use-toast";
import PasswordReset from "@/components/PasswordReset";
import SetNewPassword from "@/components/SetNewPassword";

interface BuyerAuthFormProps {
  isLogin: boolean;
  setIsLogin: (value: boolean) => void;
  showPasswordReset: boolean;
  setShowPasswordReset: (value: boolean) => void;
}

const BuyerAuthForm = ({ isLogin, setIsLogin, showPasswordReset, setShowPasswordReset }: BuyerAuthFormProps) => {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    firstName: '',
    lastName: '',
    phone: '',
    location: ''
  });
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  
  const { signUp, signIn, isPasswordReset } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    
    try {
      if (isLogin) {
        const { error } = await signIn(formData.email, formData.password);
        if (!error) {
          navigate('/buyer-dashboard');
        }
      } else {
        const { error } = await signUp(formData.email, formData.password, {
          first_name: formData.firstName,
          last_name: formData.lastName,
          phone: formData.phone,
          location: formData.location,
          user_type: 'owner'
        });
        if (!error) {
          toast({
            title: "Buyer Account Created!",
            description: "Please check your email to verify your account, then sign in below.",
          });
          setIsLogin(true);
        }
      }
    } finally {
      setLoading(false);
    }
  };

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleBackToLogin = () => {
    setShowPasswordReset(false);
    setIsLogin(true);
  };

  const handlePasswordResetSuccess = () => {
    navigate('/buyer-dashboard');
  };

  return (
    <main className="container mx-auto px-4 sm:px-6 py-6 sm:py-8 max-w-md">
      <Card className="p-6 sm:p-8 bg-gradient-to-br from-white/90 to-blue-50/50 backdrop-blur-sm shadow-2xl border-0">
        {isPasswordReset ? (
          <SetNewPassword 
            onSuccess={handlePasswordResetSuccess}
            borderColor="border-blue-200"
            focusColor="focus:border-blue-400"
            buttonGradient="from-blue-600 to-indigo-700"
            buttonHoverGradient="hover:from-blue-700 hover:to-indigo-800"
          />
        ) : showPasswordReset ? (
          <PasswordReset 
            onBack={handleBackToLogin}
            borderColor="border-blue-200"
            focusColor="focus:border-blue-400"
            buttonGradient="from-blue-600 to-indigo-700"
            buttonHoverGradient="hover:from-blue-700 hover:to-indigo-800"
          />
        ) : (
          <>
            <div className="text-center mb-6 sm:mb-8">
              <div className="bg-gradient-to-br from-blue-500 to-indigo-600 rounded-full p-4 w-fit mx-auto mb-4 sm:mb-6 shadow-lg">
                <ShoppingCart className="h-10 w-10 sm:h-12 sm:w-12 text-white" />
              </div>
              <h2 className="text-xl sm:text-2xl lg:text-3xl font-playfair font-semibold mb-2 sm:mb-3 bg-gradient-to-r from-blue-700 to-indigo-700 bg-clip-text text-transparent">
                {isLogin ? 'Welcome Back Buyer' : 'Join as a Buyer'}
              </h2>
              <p className="text-gray-600 text-sm sm:text-base font-crimson">
                {isLogin 
                  ? 'Sign in to find car parts' 
                  : 'Register to find and purchase car parts'
                }
              </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4 sm:space-y-5">
              {!isLogin && (
                <>
                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <Label htmlFor="firstName" className="text-sm sm:text-base font-inter">First Name *</Label>
                      <Input
                        id="firstName"
                        placeholder="John"
                        value={formData.firstName}
                        onChange={(e) => handleInputChange('firstName', e.target.value)}
                        required
                        className="mt-1 text-base border-blue-200 focus:border-blue-400"
                      />
                    </div>
                    <div>
                      <Label htmlFor="lastName" className="text-sm sm:text-base font-inter">Last Name *</Label>
                      <Input
                        id="lastName"
                        placeholder="Doe"
                        value={formData.lastName}
                        onChange={(e) => handleInputChange('lastName', e.target.value)}
                        required
                        className="mt-1 text-base border-blue-200 focus:border-blue-400"
                      />
                    </div>
                  </div>

                  <div>
                    <Label htmlFor="phone" className="text-sm sm:text-base font-inter">Phone/WhatsApp *</Label>
                    <div className="relative">
                      <Phone className="h-4 w-4 absolute left-3 top-3 text-gray-400" />
                      <Input
                        id="phone"
                        type="tel"
                        placeholder="+233 20 123 4567"
                        value={formData.phone}
                        onChange={(e) => handleInputChange('phone', e.target.value)}
                        required
                        className="mt-1 pl-10 text-base border-blue-200 focus:border-blue-400"
                      />
                    </div>
                  </div>

                  <div>
                    <Label htmlFor="location" className="text-sm sm:text-base font-inter">Location *</Label>
                    <div className="relative">
                      <MapPin className="h-4 w-4 absolute left-3 top-3 text-gray-400" />
                      <Input
                        id="location"
                        placeholder="e.g. Accra, Kumasi"
                        value={formData.location}
                        onChange={(e) => handleInputChange('location', e.target.value)}
                        required
                        className="mt-1 pl-10 text-base border-blue-200 focus:border-blue-400"
                      />
                    </div>
                  </div>
                </>
              )}

              <div>
                <Label htmlFor="email" className="text-sm sm:text-base font-inter">Email *</Label>
                <div className="relative">
                  <Mail className="h-4 w-4 absolute left-3 top-3 text-gray-400" />
                  <Input
                    id="email"
                    type="email"
                    placeholder="your@email.com"
                    value={formData.email}
                    onChange={(e) => handleInputChange('email', e.target.value)}
                    required
                    className="mt-1 pl-10 text-base border-blue-200 focus:border-blue-400"
                  />
                </div>
              </div>

              <div>
                <Label htmlFor="password" className="text-sm sm:text-base font-inter">Password *</Label>
                <div className="relative">
                  <Lock className="h-4 w-4 absolute left-3 top-3 text-gray-400" />
                  <Input
                    id="password"
                    type={showPassword ? "text" : "password"}
                    placeholder="••••••••"
                    value={formData.password}
                    onChange={(e) => handleInputChange('password', e.target.value)}
                    required
                    className="mt-1 pl-10 pr-10 text-base border-blue-200 focus:border-blue-400"
                  />
                  <Button
                    type="button"
                    variant="ghost"
                    size="icon"
                    className="absolute right-1 top-1 h-8 w-8 text-gray-400 hover:text-gray-600"
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                  </Button>
                </div>
              </div>

              <Button 
                type="submit" 
                className="w-full bg-gradient-to-r from-blue-600 to-indigo-700 hover:from-blue-700 hover:to-indigo-800 py-3 sm:py-4 text-base sm:text-lg rounded-xl font-inter font-medium shadow-lg hover:shadow-xl transition-all duration-300"
                disabled={loading}
              >
                {loading ? 'Please wait...' : (isLogin ? 'Sign In as Buyer' : 'Create Buyer Account')}
              </Button>
            </form>

            {isLogin && (
              <div className="text-center mt-4">
                <button
                  type="button"
                  onClick={() => setShowPasswordReset(true)}
                  className="text-blue-600 hover:text-blue-800 hover:underline text-sm font-crimson transition-colors duration-300"
                >
                  Forgot your password?
                </button>
              </div>
            )}

            <div className="text-center mt-2">
              <button
                type="button"
                onClick={() => setIsLogin(!isLogin)}
                className="text-blue-600 hover:text-blue-800 hover:underline text-sm sm:text-base font-crimson transition-colors duration-300"
              >
                {isLogin 
                  ? "Need a buyer account? Register here" 
                  : "Already have an account? Sign in"
                }
              </button>
            </div>
          </>
        )}
      </Card>
    </main>
  );
};

export default BuyerAuthForm;
