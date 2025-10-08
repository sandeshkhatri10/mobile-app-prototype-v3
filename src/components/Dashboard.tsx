import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Avatar, AvatarFallback } from './ui/avatar';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import { Badge } from './ui/badge';
import { Progress } from './ui/progress';
import { 
  Calendar,
  FileText,
  UserPlus,
  Receipt,
  Users,
  Settings,
  LogOut,
  Clock,
  Car,
  AlertTriangle,
  Bell,
  CheckCircle,
  TrendingUp,
  UserCheck,
  Plus,
  BarChart3,
  Activity,
  Star,
  MessageSquare,
  Package,
  CalendarClock,
  Zap,
  Target,
  Award,
  Smartphone,
  Globe,
  Share2
} from 'lucide-react';

interface DashboardProps {
  onServiceSelect: (service: string) => void;
  onLogout: () => void;
  onSettings: () => void;
}

export function Dashboard({ onServiceSelect, onLogout, onSettings }: DashboardProps) {
  const [viewPeriod, setViewPeriod] = useState<'today' | 'weekly' | 'monthly'>('today');
  
  // Core business services
  const coreServices = [
    { 
      id: 'upcoming-bookings', 
      name: 'Bookings', 
      icon: Calendar, 
      gradient: 'gradient-primary',
      count: '12',
      status: 'active',
      description: 'Manage appointments'
    },
    { 
      id: 'quotations', 
      name: 'Quotations', 
      icon: FileText, 
      gradient: 'gradient-success',
      count: '8',
      status: 'pending',
      description: 'Price estimates'
    },
    { 
      id: 'customers', 
      name: 'Customers', 
      icon: Users, 
      gradient: 'gradient-warning',
      count: '156',
      status: 'active',
      description: 'Customer database'
    },
    { 
      id: 'invoices', 
      name: 'Invoices', 
      icon: Receipt, 
      gradient: 'gradient-secondary',
      count: '24',
      status: 'action',
      description: 'Manage billing'
    },
  ];

  // Advanced features
  const advancedFeatures = [
    { 
      id: 'analytics', 
      name: 'Analytics', 
      icon: BarChart3, 
      gradient: 'gradient-secondary',
      count: 'PRO',
      status: 'new',
      description: 'Business insights'
    },
    { 
      id: 'inventory', 
      name: 'Inventory', 
      icon: Package, 
      gradient: 'gradient-primary',
      count: '89',
      status: 'low',
      description: 'Stock management'
    },
    { 
      id: 'staff-schedule', 
      name: 'Staff', 
      icon: CalendarClock, 
      gradient: 'gradient-success',
      count: '5',
      status: 'active',
      description: 'Team scheduling'
    },
    { 
      id: 'customer-portal', 
      name: 'Customer App', 
      icon: Smartphone, 
      gradient: 'gradient-warning',
      count: '🚀',
      status: 'featured',
      description: 'Digital experience'
    },
  ];

  // Enhanced mock data
  const periodData = {
    today: {
      totalBookings: 15,
      pendingBookings: 3,
      completedBookings: 12,
      carServices: 8,
      wofServices: 4
    },
    weekly: {
      totalBookings: 89,
      pendingBookings: 12,
      completedBookings: 77,
      carServices: 52,
      wofServices: 25
    },
    monthly: {
      totalBookings: 342,
      pendingBookings: 23,
      completedBookings: 319,
      carServices: 198,
      wofServices: 89
    }
  };

  const currentData = periodData[viewPeriod];

  const recentActivities = [
    { icon: CheckCircle, text: 'Service completed for ABC123', time: '2 min ago', type: 'success' },
    { icon: Star, text: '5-star review from John Smith', time: '15 min ago', type: 'review' },
    { icon: Calendar, text: 'New booking: WOF for XYZ789', time: '30 min ago', type: 'booking' },
    { icon: MessageSquare, text: 'Customer inquiry via app', time: '1 hour ago', type: 'message' },
  ];

  const upcomingAlerts = [
    { icon: AlertTriangle, text: 'WOF expires for ABC123 - John Smith', urgency: 'high', time: '3 days' },
    { icon: Package, text: 'Low stock: Brake pads', urgency: 'medium', time: 'Now' },
    { icon: Clock, text: 'Staff meeting in 2 hours', urgency: 'low', time: '2 hours' },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 animate-fade-in">
      {/* Enhanced Header with Glassmorphism */}
      <div className="glassmorphism sticky top-0 z-50 border-b border-white/20">
        <div className="flex items-center justify-between p-4">
          <div className="flex items-center space-x-4">
            <div className="relative">
              <Avatar className="h-12 w-12 border-2 border-white/30">
                <AvatarFallback className="gradient-primary text-white font-semibold">
                  CS
                </AvatarFallback>
              </Avatar>
              <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-green-500 rounded-full border-2 border-white animate-pulse-glow"></div>
            </div>
            <div>
              <h1 className="font-semibold">Car Service Pro</h1>
              <p className="text-sm text-muted-foreground">Welcome back, Manager!</p>
            </div>
          </div>
          <div className="flex space-x-2">
            <Button 
              variant="ghost" 
              size="lg" 
              onClick={onSettings}
              className="hover:bg-white/20 transition-all duration-200 hover:scale-105"
            >
              <Settings className="h-6 w-6" />
            </Button>
            <Button 
              variant="ghost" 
              size="lg" 
              onClick={onLogout}
              className="hover:bg-white/20 transition-all duration-200 hover:scale-105"
            >
              <LogOut className="h-6 w-6" />
            </Button>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="p-4 space-y-6">
        {/* Enhanced Overview with Better Design */}
        <Card className="shadow-medium border-0 animate-slide-up">
          <CardHeader className="pb-3">
            <div className="flex items-center justify-between">
              <CardTitle className="flex items-center space-x-2">
                <div className="w-8 h-8 gradient-primary rounded-lg flex items-center justify-center">
                  <Activity className="h-4 w-4 text-white" />
                </div>
                <span>Business Overview</span>
              </CardTitle>
              <Tabs value={viewPeriod} onValueChange={(value) => setViewPeriod(value as any)}>
                <TabsList className="bg-slate-100/50">
                  <TabsTrigger value="today" className="data-[state=active]:bg-white">Today</TabsTrigger>
                  <TabsTrigger value="weekly" className="data-[state=active]:bg-white">Weekly</TabsTrigger>
                  <TabsTrigger value="monthly" className="data-[state=active]:bg-white">Monthly</TabsTrigger>
                </TabsList>
              </Tabs>
            </div>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-3 gap-4 mb-6">
              <div className="text-center p-4 bg-gradient-to-br from-blue-50 to-blue-100 rounded-xl">
                <div className="text-3xl font-bold text-blue-600 mb-1">{currentData.totalBookings}</div>
                <div className="text-sm text-blue-700">Total Bookings</div>
              </div>
              <div className="text-center p-4 bg-gradient-to-br from-orange-50 to-orange-100 rounded-xl">
                <div className="text-3xl font-bold text-orange-600 mb-1">{currentData.pendingBookings}</div>
                <div className="text-sm text-orange-700">Pending</div>
              </div>
              <div className="text-center p-4 bg-gradient-to-br from-green-50 to-green-100 rounded-xl">
                <div className="text-3xl font-bold text-green-600 mb-1">{currentData.completedBookings}</div>
                <div className="text-sm text-green-700">Completed</div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Core Business Functions */}
        <div className="animate-slide-up" style={{ animationDelay: '0.1s' }}>
          <div className="flex items-center justify-between mb-4">
            <h2 className="font-semibold text-lg">Core Business</h2>
            <Badge variant="secondary" className="bg-green-100 text-green-700">
              <CheckCircle className="h-3 w-3 mr-1" />
              Essential Tools
            </Badge>
          </div>
          
          <div className="grid grid-cols-2 gap-4">
            {coreServices.map((service, index) => {
              const IconComponent = service.icon;
              return (
                <Card 
                  key={service.id} 
                  className={`cursor-pointer hover-lift border-0 animate-bounce-in ${
                    service.status === 'action' ? 'animate-pulse-glow' : ''
                  }`}
                  style={{ animationDelay: `${index * 0.1}s` }}
                  onClick={() => onServiceSelect(service.id)}
                >
                  <CardContent className="p-4 text-center space-y-3">
                    <div className={`w-14 h-14 ${service.gradient} rounded-2xl flex items-center justify-center mx-auto shadow-medium relative`}>
                      <IconComponent className="h-7 w-7 text-white" />
                      {service.status === 'new' && (
                        <div className="absolute -top-1 -right-1 w-4 h-4 bg-red-500 rounded-full flex items-center justify-center">
                          <span className="text-white text-xs">!</span>
                        </div>
                      )}
                      {service.status === 'action' && (
                        <div className="absolute -top-1 -right-1 w-4 h-4 bg-blue-500 rounded-full animate-pulse"></div>
                      )}
                    </div>
                    <div>
                      <h3 className="font-medium text-sm">{service.name}</h3>
                      <p className="text-xs text-muted-foreground mb-2">{service.description}</p>
                      <Badge 
                        variant={service.status === 'new' ? 'default' : 'secondary'} 
                        className="text-xs"
                      >
                        {service.count}
                      </Badge>
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>

        {/* Advanced Features */}
        <div className="animate-slide-up" style={{ animationDelay: '0.2s' }}>
          <div className="flex items-center justify-between mb-4">
            <h2 className="font-semibold text-lg">Advanced Features</h2>
            <Badge variant="secondary" className="bg-purple-100 text-purple-700">
              <Zap className="h-3 w-3 mr-1" />
              Pro Tools
            </Badge>
          </div>
          
          <div className="grid grid-cols-2 gap-4">
            {advancedFeatures.map((feature, index) => {
              const IconComponent = feature.icon;
              return (
                <Card 
                  key={feature.id} 
                  className={`cursor-pointer hover-lift border-0 animate-bounce-in ${
                    feature.status === 'featured' ? 'animate-float' : ''
                  }`}
                  style={{ animationDelay: `${(index + 4) * 0.1}s` }}
                  onClick={() => onServiceSelect(feature.id)}
                >
                  <CardContent className="p-4 text-center space-y-3">
                    <div className={`w-14 h-14 ${feature.gradient} rounded-2xl flex items-center justify-center mx-auto shadow-medium relative`}>
                      <IconComponent className="h-7 w-7 text-white" />
                      {feature.status === 'new' && (
                        <div className="absolute -top-1 -right-1 w-4 h-4 bg-red-500 rounded-full flex items-center justify-center">
                          <span className="text-white text-xs">!</span>
                        </div>
                      )}
                      {feature.status === 'featured' && (
                        <div className="absolute -top-1 -right-1 w-4 h-4 bg-yellow-400 rounded-full animate-pulse"></div>
                      )}
                    </div>
                    <div>
                      <h3 className="font-medium text-sm">{feature.name}</h3>
                      <p className="text-xs text-muted-foreground mb-2">{feature.description}</p>
                      <Badge 
                        variant={feature.status === 'new' ? 'default' : 'secondary'} 
                        className="text-xs"
                      >
                        {feature.count}
                      </Badge>
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>

        {/* Real-time Activity Feed */}
        <Card className="shadow-medium border-0 animate-slide-up" style={{ animationDelay: '0.3s' }}>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <div className="w-8 h-8 gradient-success rounded-lg flex items-center justify-center">
                <Activity className="h-4 w-4 text-white" />
              </div>
              <span>Live Activity</span>
              <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            {recentActivities.map((activity, index) => {
              const IconComponent = activity.icon;
              return (
                <div key={index} className="flex items-center space-x-3 p-2 hover:bg-slate-50 rounded-lg transition-colors">
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                    activity.type === 'success' ? 'bg-green-100 text-green-600' :
                    activity.type === 'review' ? 'bg-yellow-100 text-yellow-600' :
                    activity.type === 'booking' ? 'bg-blue-100 text-blue-600' :
                    'bg-purple-100 text-purple-600'
                  }`}>
                    <IconComponent className="h-4 w-4" />
                  </div>
                  <div className="flex-1">
                    <p className="text-sm">{activity.text}</p>
                    <p className="text-xs text-muted-foreground">{activity.time}</p>
                  </div>
                </div>
              );
            })}
          </CardContent>
        </Card>

        {/* Smart Alerts & Recommendations */}
        <Card className="shadow-medium border-0 animate-slide-up" style={{ animationDelay: '0.4s' }}>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <div className="w-8 h-8 gradient-secondary rounded-lg flex items-center justify-center">
                <Target className="h-4 w-4 text-white" />
              </div>
              <span>Smart Alerts</span>
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            {upcomingAlerts.map((alert, index) => {
              const IconComponent = alert.icon;
              return (
                <div key={index} className={`flex items-center space-x-3 p-3 rounded-lg border-l-4 ${
                  alert.urgency === 'high' ? 'bg-red-50 border-red-400' :
                  alert.urgency === 'medium' ? 'bg-orange-50 border-orange-400' :
                  'bg-blue-50 border-blue-400'
                }`}>
                  <IconComponent className={`h-5 w-5 ${
                    alert.urgency === 'high' ? 'text-red-600' :
                    alert.urgency === 'medium' ? 'text-orange-600' :
                    'text-blue-600'
                  }`} />
                  <div className="flex-1">
                    <p className="text-sm font-medium">{alert.text}</p>
                    <p className="text-xs text-muted-foreground">Due in {alert.time}</p>
                  </div>
                  <Button size="sm" variant="ghost">
                    Action
                  </Button>
                </div>
              );
            })}
          </CardContent>
        </Card>

        {/* Achievement Section */}
        <Card className="shadow-medium border-0 animate-slide-up" style={{ animationDelay: '0.5s' }}>
          <CardContent className="p-4">
            <div className="flex items-center space-x-3">
              <div className="w-12 h-12 gradient-warning rounded-full flex items-center justify-center">
                <Award className="h-6 w-6 text-white" />
              </div>
              <div className="flex-1">
                <h4 className="font-medium">Great job this month!</h4>
                <p className="text-sm text-muted-foreground">You've completed {currentData.completedBookings} bookings</p>
                <Progress value={(currentData.completedBookings / currentData.totalBookings) * 100} className="mt-2" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}