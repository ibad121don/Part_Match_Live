
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Shield, ShoppingCart, Store, ArrowLeft } from "lucide-react";
import { Link } from "react-router-dom";

const AuthTypeSelector = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-accent/20 font-inter">
      <header className="p-4 sm:p-6 flex items-center gap-3 bg-background/95 backdrop-blur-lg shadow-lg border-b border-border">
        <Link to="/">
          <Button variant="ghost" size="icon" className="h-8 w-8 sm:h-10 sm:w-10 hover:bg-accent/50">
            <ArrowLeft className="h-4 w-4 sm:h-5 sm:w-5" />
          </Button>
        </Link>
        <div className="flex items-center gap-2 sm:gap-3">
          <img 
            src="/lovable-uploads/bcd13b92-5d2a-4796-b9d3-29ff8bed43d9.png" 
            alt="PartMatch Logo" 
            className="h-6 w-auto sm:h-8 bg-card dark:bg-white rounded-sm p-1 border"
          />
          <h1 className="page-subheader text-xl sm:text-2xl lg:text-3xl text-foreground">
            Choose Your Account Type
          </h1>
        </div>
      </header>

      <main className="container mx-auto px-4 sm:px-6 py-8 sm:py-12 max-w-4xl">
        <div className="text-center mb-8 sm:mb-12">
          <h2 className="page-header text-2xl sm:text-3xl lg:text-4xl mb-4 text-foreground">
            How would you like to join?
          </h2>
          <p className="section-subtitle text-lg sm:text-xl max-w-2xl mx-auto">
            Select the type of account that best describes your role in our car parts marketplace
          </p>
        </div>

        <div className="grid sm:grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8 max-w-4xl mx-auto">
          <Link to="/buyer-auth" className="block group">
            <Card className="p-6 sm:p-8 text-center bg-gradient-to-br from-card to-accent/10 hover:from-card hover:to-accent/20 transition-all duration-300 group-hover:shadow-xl group-hover:scale-105 border-2 border-primary/20 group-hover:border-primary/40">
              <div className="bg-gradient-to-br from-blue-500 to-indigo-600 rounded-full p-4 w-fit mx-auto mb-6 shadow-lg group-hover:shadow-xl transition-shadow duration-300">
                <ShoppingCart className="h-10 w-10 sm:h-12 sm:w-12 text-white" />
              </div>
              <h3 className="section-title text-xl sm:text-2xl mb-3 text-blue-800">
                Buyer
              </h3>
              <p className="card-description text-sm sm:text-base mb-6">
                Find and purchase car parts from verified sellers
              </p>
              <div className="bg-primary/10 rounded-lg p-4 text-sm text-primary font-medium mb-6">
                ✓ Browse available parts<br/>
                ✓ Request specific parts<br/>
                ✓ Connect with sellers<br/>
                ✓ Secure payments
              </div>
              <Button className="w-full bg-gradient-to-r from-blue-600 to-indigo-700 hover:from-blue-700 hover:to-indigo-800 text-white ui-button-text py-3 px-4 rounded-lg shadow-lg hover:shadow-xl transition-all duration-300 text-sm leading-tight">
                Sign In / Register as Buyer
              </Button>
            </Card>
          </Link>

          <Link to="/seller-auth" className="block group">
            <Card className="p-6 sm:p-8 text-center bg-gradient-to-br from-card to-destructive/10 hover:from-card hover:to-destructive/20 transition-all duration-300 group-hover:shadow-xl group-hover:scale-105 border-2 border-destructive/20 group-hover:border-destructive/40">
              <div className="bg-gradient-to-br from-orange-500 to-red-600 rounded-full p-4 w-fit mx-auto mb-6 shadow-lg group-hover:shadow-xl transition-shadow duration-300">
                <Store className="h-10 w-10 sm:h-12 sm:w-12 text-white" />
              </div>
              <h3 className="section-title text-xl sm:text-2xl mb-3 text-foreground">
                Seller
              </h3>
              <p className="card-description text-sm sm:text-base mb-6">
                Sell and supply car parts to buyers
              </p>
              <div className="bg-destructive/10 rounded-lg p-4 text-sm text-destructive font-medium mb-6">
                ✓ List your inventory<br/>
                ✓ Respond to requests<br/>
                ✓ Manage offers<br/>
                ✓ Grow your business
              </div>
              <Button className="w-full bg-gradient-to-r from-orange-600 to-red-700 hover:from-orange-700 hover:to-red-800 text-white ui-button-text py-3 px-4 rounded-lg shadow-lg hover:shadow-xl transition-all duration-300 text-sm leading-tight">
                Sign In / Register as Seller
              </Button>
            </Card>
          </Link>
        </div>

        <div className="text-center mt-8 sm:mt-12">
          <p className="body-text-small text-sm sm:text-base">
            Already have an account? Use the specific login page for your account type above.
          </p>
        </div>
      </main>
    </div>
  );
};

export default AuthTypeSelector;
