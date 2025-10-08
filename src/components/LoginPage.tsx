import { useState } from 'react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import { UserRound, Shield, Hammer, Wrench, CheckCircle, Lock, Zap, Settings, Eye, EyeOff } from 'lucide-react';
import tradeProLogo from 'figma:asset/7582947e0c64a137d2ca36a7a91d99e64eaef18f.png';

interface LoginPageProps {
  onLogin: (userType: 'customer' | 'manager' | 'mechanic') => void;
}

export function LoginPage({ onLogin }: LoginPageProps) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showForgotPassword, setShowForgotPassword] = useState(false);
  const [resetEmail, setResetEmail] = useState('');
  const [loginType, setLoginType] = useState<'customer' | 'manager' | 'mechanic'>('customer');
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (email && password) {
      setIsLoading(true);
      // Simulate loading
      await new Promise(resolve => setTimeout(resolve, 1500));
      setIsLoading(false);
      onLogin(loginType);
    }
  };

  const handleForgotPassword = (e: React.FormEvent) => {
    e.preventDefault();
    alert(`Password reset link sent to ${resetEmail}`);
    setShowForgotPassword(false);
    setResetEmail('');
  };

  if (showForgotPassword) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 flex items-center justify-center p-4">
        {/* Animated background */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-blue-500/20 rounded-full blur-3xl animate-pulse"></div>
          <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-purple-500/20 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }}></div>
          <div className="absolute top-1/2 left-1/2 w-32 h-32 bg-pink-500/20 rounded-full blur-2xl animate-pulse" style={{ animationDelay: '2s' }}></div>
        </div>

        <Card className="w-full max-w-md relative z-10 shadow-2xl border-0 bg-white/95 backdrop-blur-xl animate-slide-up">
          <CardHeader className="text-center space-y-4 pb-6">
            <div className="w-20 h-20 mx-auto flex items-center justify-center animate-bounce-in">
              <img 
                src={tradeProLogo} 
                alt="TradePro Logo" 
                className="w-full h-full object-contain"
              />
            </div>
            <div>
              <CardTitle className="text-2xl bg-gradient-to-r from-slate-800 to-slate-600 bg-clip-text text-transparent">Reset Password</CardTitle>
              <p className="text-slate-600 mt-2">Enter your email to receive a reset link</p>
            </div>
          </CardHeader>
          <CardContent className="space-y-6">
            <form onSubmit={handleForgotPassword} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="resetEmail" className="text-slate-700">Email Address</Label>
                <Input
                  id="resetEmail"
                  type="email"
                  placeholder="Enter your email"
                  value={resetEmail}
                  onChange={(e) => setResetEmail(e.target.value)}
                  required
                  className="h-12 bg-white/80 border-slate-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 transition-all duration-200"
                />
              </div>
              <Button type="submit" className="w-full h-12 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 shadow-lg hover:shadow-xl transition-all duration-200 hover:scale-[1.02]">
                Send Reset Link
              </Button>
              <Button 
                type="button" 
                variant="outline" 
                className="w-full h-12 border-slate-200 hover:bg-slate-50"
                onClick={() => setShowForgotPassword(false)}
              >
                Back to Login
              </Button>
            </form>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 flex items-center justify-center p-4 relative overflow-hidden">
      {/* Premium animated background */}
      <div className="absolute inset-0">
        <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-blue-500/20 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-purple-500/20 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }}></div>
        <div className="absolute top-1/2 left-1/2 w-32 h-32 bg-pink-500/20 rounded-full blur-2xl animate-pulse" style={{ animationDelay: '2s' }}></div>
        <div className="absolute bottom-1/3 left-1/3 w-48 h-48 bg-cyan-500/20 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '0.5s' }}></div>
      </div>
      
      <Card className="w-full max-w-md relative z-10 shadow-2xl border-0 bg-white/95 backdrop-blur-xl animate-bounce-in">
        <CardHeader className="text-center space-y-6 pb-4">
          {/* TradePro Logo */}
          <div className="relative">
            <div className="w-24 h-24 mx-auto flex items-center justify-center">
              <img 
                src={tradeProLogo} 
                alt="TradePro Logo" 
                className="w-full h-full object-contain animate-bounce-in"
              />
            </div>
            {/* Status indicator */}
            <div className="absolute -bottom-2 -right-2 w-8 h-8 bg-green-500 rounded-full flex items-center justify-center shadow-lg animate-pulse">
              <CheckCircle className="h-4 w-4 text-white" />
            </div>
          </div>

          <div className="space-y-3">
            {/* Decorative line */}
            <div className="w-20 h-1 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 rounded-full mx-auto animate-pulse"></div>
            
            {/* Fixed title visibility */}
            <div className="space-y-2">
              <CardTitle className="text-3xl font-bold bg-gradient-to-r from-slate-800 via-slate-700 to-slate-800 bg-clip-text text-transparent">
                TradePro Manager
              </CardTitle>
              <p className="text-slate-600 font-medium">Your trusted service management partner</p>
            </div>
          </div>
          
          {/* Enhanced benefits showcase */}
          <div className="grid grid-cols-3 gap-3 mt-6">
            <div className="text-center p-3 bg-gradient-to-br from-green-50 to-green-100 rounded-xl shadow-sm hover:shadow-md transition-all duration-200 hover:-translate-y-1">
              <CheckCircle className="h-5 w-5 text-green-600 mx-auto mb-2" />
              <span className="text-xs font-semibold text-green-700">Reliable</span>
            </div>
            <div className="text-center p-3 bg-gradient-to-br from-blue-50 to-blue-100 rounded-xl shadow-sm hover:shadow-md transition-all duration-200 hover:-translate-y-1">
              <Lock className="h-5 w-5 text-blue-600 mx-auto mb-2" />
              <span className="text-xs font-semibold text-blue-700">Secure</span>
            </div>
            <div className="text-center p-3 bg-gradient-to-br from-purple-50 to-purple-100 rounded-xl shadow-sm hover:shadow-md transition-all duration-200 hover:-translate-y-1">
              <Wrench className="h-5 w-5 text-purple-600 mx-auto mb-2" />
              <span className="text-xs font-semibold text-purple-700">Expert</span>
            </div>
          </div>
        </CardHeader>
        
        <CardContent className="space-y-6">
          {/* Enhanced tabs */}
          <Tabs value={loginType} onValueChange={(value) => setLoginType(value as 'customer' | 'manager' | 'mechanic')} className="mb-6">
            <TabsList className="grid w-full grid-cols-3 bg-slate-100/80 p-1 rounded-xl">
              <TabsTrigger 
                value="customer" 
                className="data-[state=active]:bg-white data-[state=active]:shadow-sm rounded-lg transition-all duration-200 text-xs"
              >
                <UserRound className="h-3 w-3 mr-1" />
                Customer
              </TabsTrigger>
              <TabsTrigger 
                value="mechanic" 
                className="data-[state=active]:bg-white data-[state=active]:shadow-sm rounded-lg transition-all duration-200 text-xs"
              >
                <Wrench className="h-3 w-3 mr-1" />
                Mechanic
              </TabsTrigger>
              <TabsTrigger 
                value="manager" 
                className="data-[state=active]:bg-white data-[state=active]:shadow-sm rounded-lg transition-all duration-200 text-xs"
              >
                <Shield className="h-3 w-3 mr-1" />
                Manager
              </TabsTrigger>
            </TabsList>
          </Tabs>

          <form onSubmit={handleSubmit} className="space-y-5">
            <div className="space-y-2">
              <Label htmlFor="email" className="text-slate-700 font-medium">
                {loginType === 'customer' ? 'Phone or Email' : 
                 loginType === 'mechanic' ? 'Mechanic ID or Email' : 'Manager Email'}
              </Label>
              <Input
                id="email"
                type={loginType === 'customer' ? 'text' : 'email'}
                placeholder={loginType === 'customer' ? 'Enter phone or email' : 
                           loginType === 'mechanic' ? 'Enter mechanic ID or email' : 'Enter manager email'}
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="h-12 bg-white/80 border-slate-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 transition-all duration-200"
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="password" className="text-slate-700 font-medium">Password</Label>
              <div className="relative">
                <Input
                  id="password"
                  type={showPassword ? 'text' : 'password'}
                  placeholder="Enter your password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  className="h-12 bg-white/80 border-slate-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 transition-all duration-200 pr-12"
                />
                <Button
                  type="button"
                  variant="ghost"
                  size="sm"
                  className="absolute right-0 top-0 h-12 px-3 hover:bg-transparent"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? <EyeOff className="h-4 w-4 text-slate-500" /> : <Eye className="h-4 w-4 text-slate-500" />}
                </Button>
              </div>
            </div>
            
            {loginType === 'customer' && (
              <div className="bg-gradient-to-br from-blue-50 to-indigo-50 border border-blue-200/50 rounded-xl p-4 text-sm">
                <p className="text-blue-800 font-semibold mb-2 flex items-center">
                  <span className="text-lg mr-2">🎉</span>
                  Customer Benefits:
                </p>
                <ul className="text-blue-700 text-xs space-y-1.5">
                  <li className="flex items-center"><span className="w-1 h-1 bg-blue-500 rounded-full mr-2"></span>Track your service bookings in real-time</li>
                  <li className="flex items-center"><span className="w-1 h-1 bg-blue-500 rounded-full mr-2"></span>Receive important service reminders</li>
                  <li className="flex items-center"><span className="w-1 h-1 bg-blue-500 rounded-full mr-2"></span>View service history & digital receipts</li>
                </ul>
              </div>
            )}
            
            {loginType === 'mechanic' && (
              <div className="bg-gradient-to-br from-green-50 to-emerald-50 border border-green-200/50 rounded-xl p-4 text-sm">
                <p className="text-green-800 font-semibold mb-2 flex items-center">
                  <span className="text-lg mr-2">🔧</span>
                  Mechanic Tools:
                </p>
                <ul className="text-green-700 text-xs space-y-1.5">
                  <li className="flex items-center"><span className="w-1 h-1 bg-green-500 rounded-full mr-2"></span>View your assigned jobs and schedule</li>
                  <li className="flex items-center"><span className="w-1 h-1 bg-green-500 rounded-full mr-2"></span>Track time and manage job progress</li>
                  <li className="flex items-center"><span className="w-1 h-1 bg-green-500 rounded-full mr-2"></span>Upload photos & videos for documentation</li>
                </ul>
              </div>
            )}
            
            <Button 
              type="submit" 
              disabled={isLoading}
              className="w-full h-12 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 shadow-xl hover:shadow-2xl transition-all duration-200 hover:scale-[1.02] font-semibold text-white"
            >
              {isLoading ? (
                <div className="flex items-center space-x-2">
                  <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                  <span>Signing In...</span>
                </div>
              ) : (
                <>
                  {loginType === 'customer' ? '🚀 Access My Account' : 
                   loginType === 'mechanic' ? '🔧 Mechanic Portal' : '🔒 Manager Login'}
                </>
              )}
            </Button>
          </form>
          
          <div className="text-center space-y-3">
            <Button 
              variant="link" 
              onClick={() => setShowForgotPassword(true)}
              className="text-sm text-slate-600 hover:text-blue-600 transition-colors"
            >
              Forgot your password?
            </Button>
            
            {loginType === 'customer' && (
              <div className="text-xs text-slate-500 bg-slate-50 rounded-lg p-3">
                Don't have an account? Contact us to get started with our premium service management platform!
              </div>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}