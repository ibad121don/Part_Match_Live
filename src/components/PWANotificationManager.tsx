import { useEffect, useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Bell, Smartphone, X } from 'lucide-react';
import { requestNotificationPermission, showNotification, isPWA } from '@/utils/pwa';
import { useAuth } from '@/contexts/AuthContext';

const PWANotificationManager = () => {
  const [showNotificationPrompt, setShowNotificationPrompt] = useState(false);
  const [notificationsEnabled, setNotificationsEnabled] = useState(false);
  const [showInstallPrompt, setShowInstallPrompt] = useState(false);
  const [deferredPrompt, setDeferredPrompt] = useState<any>(null);
  const { user } = useAuth();

  useEffect(() => {
    // Check notification permission status
    if ('Notification' in window) {
      setNotificationsEnabled(Notification.permission === 'granted');
      
      // Show prompt if user is logged in and notifications not granted
      if (user && Notification.permission === 'default') {
        setTimeout(() => setShowNotificationPrompt(true), 3000);
      }
    }
  }, [user]);

  useEffect(() => {
    // Check if user has previously dismissed the install prompt
    const hasInstalledOrDismissed = localStorage.getItem('pwa-install-dismissed') === 'true';
    
    if (!isPWA() && !hasInstalledOrDismissed) {
      // Listen for the beforeinstallprompt event
      const handleBeforeInstallPrompt = (e: any) => {
        e.preventDefault();
        setDeferredPrompt(e);
        setShowInstallPrompt(true);
      };

      window.addEventListener('beforeinstallprompt', handleBeforeInstallPrompt);
      
      // Show prompt even without beforeinstallprompt for broader compatibility
      if (!deferredPrompt) {
        setTimeout(() => setShowInstallPrompt(true), 2000);
      }

      return () => {
        window.removeEventListener('beforeinstallprompt', handleBeforeInstallPrompt);
      };
    }
  }, [deferredPrompt]);

  // Auto-hide install prompt after 7 seconds
  useEffect(() => {
    if (!isPWA() && showInstallPrompt) {
      const timer = setTimeout(() => {
        setShowInstallPrompt(false);
      }, 7000);
      
      return () => clearTimeout(timer);
    }
  }, [showInstallPrompt]);

  const handleEnableNotifications = async () => {
    const granted = await requestNotificationPermission();
    setNotificationsEnabled(granted);
    setShowNotificationPrompt(false);
    
    if (granted) {
      showNotification('Notifications Enabled!', {
        body: 'You\'ll now receive updates about new car parts and offers.',
        icon: '/app-icon-192.png'
      });
    }
  };

  const testNotification = () => {
    showNotification('Test Notification', {
      body: 'This is a test notification from PartMatch!',
      icon: '/app-icon-192.png'
    });
  };

  const handleInstallApp = async () => {
    if (deferredPrompt) {
      try {
        deferredPrompt.prompt();
        const { outcome } = await deferredPrompt.userChoice;
        console.log(`User response to the install prompt: ${outcome}`);
        
        if (outcome === 'accepted') {
          localStorage.setItem('pwa-install-dismissed', 'true');
        }
      } catch (error) {
        console.warn('Install prompt failed:', error);
      }
      setDeferredPrompt(null);
      setShowInstallPrompt(false);
    } else {
      // Fallback for browsers that don't support the install prompt
      alert('To install this app, use your browser\'s "Add to Home Screen" option from the menu.');
      localStorage.setItem('pwa-install-dismissed', 'true');
      setShowInstallPrompt(false);
    }
  };

  const handleDismissInstall = () => {
    localStorage.setItem('pwa-install-dismissed', 'true');
    setShowInstallPrompt(false);
  };

  if (!showNotificationPrompt && !notificationsEnabled && (!showInstallPrompt || isPWA())) return null;

  return (
    <>
      {/* Notification Permission Prompt */}
      {showNotificationPrompt && (
        <Card className="fixed bottom-4 left-4 right-4 z-50 mx-auto max-w-sm shadow-lg">
          <CardHeader className="pb-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Bell className="h-5 w-5 text-blue-600" />
                <CardTitle className="text-base">Stay Updated</CardTitle>
              </div>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setShowNotificationPrompt(false)}
                className="h-6 w-6 p-0"
              >
                <X className="h-4 w-4" />
              </Button>
            </div>
            <CardDescription className="text-sm">
              Get notified about new car parts that match your interests
            </CardDescription>
          </CardHeader>
          <CardContent className="pt-0">
            <div className="flex gap-2">
              <Button 
                onClick={handleEnableNotifications}
                className="flex-1"
                size="sm"
              >
                <Bell className="h-4 w-4 mr-2" />
                Enable
              </Button>
              <Button 
                variant="outline" 
                onClick={() => setShowNotificationPrompt(false)}
                size="sm"
              >
                Later
              </Button>
            </div>
          </CardContent>
        </Card>
      )}

      {/* PWA Installation Prompt */}
      {!isPWA() && showInstallPrompt && (
        <div className="fixed top-4 right-4 z-40">
          <Card className="w-64 shadow-lg">
            <CardHeader className="pb-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Smartphone className="h-5 w-5 text-green-600" />
                  <CardTitle className="text-sm">Install App</CardTitle>
                </div>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={handleDismissInstall}
                  className="h-6 w-6 p-0"
                >
                  <X className="h-4 w-4" />
                </Button>
              </div>
              <CardDescription className="text-xs">
                Add PartMatch to your home screen for quick access
              </CardDescription>
            </CardHeader>
            <CardContent className="pt-0">
              <div className="flex gap-2">
                <Button 
                  onClick={handleInstallApp}
                  className="flex-1"
                  size="sm"
                >
                  <Smartphone className="h-4 w-4 mr-2" />
                  Install
                </Button>
                <Button 
                  variant="outline" 
                  onClick={handleDismissInstall}
                  size="sm"
                >
                  Later
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      )}

      {/* Debug: Test Notification Button (only in development) */}
      {process.env.NODE_ENV === 'development' && notificationsEnabled && (
        <Button
          onClick={testNotification}
          className="fixed bottom-20 right-4 z-50"
          size="sm"
          variant="outline"
        >
          Test Notification
        </Button>
      )}
    </>
  );
};

export default PWANotificationManager;