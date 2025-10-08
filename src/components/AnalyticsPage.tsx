import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import { Progress } from './ui/progress';
import { 
  ArrowLeft, 
  BarChart3,
  TrendingUp,
  TrendingDown,
  DollarSign,
  Users,
  Calendar,
  Clock,
  Star,
  Target,
  Award,
  Activity,
  PieChart,
  LineChart,
  Download,
  Filter,
  RefreshCw,
  AlertCircle,
  CheckCircle,
  Eye,
  Heart,
  Zap
} from 'lucide-react';

interface AnalyticsPageProps {
  onBack: () => void;
}

export function AnalyticsPage({ onBack }: AnalyticsPageProps) {
  const [timeRange, setTimeRange] = useState<'week' | 'month' | 'quarter' | 'year'>('month');
  
  const kpis = [
    { 
      title: 'Revenue', 
      value: '$48,750', 
      change: '+12.5%', 
      trend: 'up', 
      icon: DollarSign,
      color: 'text-green-600',
      bg: 'bg-green-50'
    },
    { 
      title: 'Customers', 
      value: '342', 
      change: '+8.2%', 
      trend: 'up', 
      icon: Users,
      color: 'text-blue-600',
      bg: 'bg-blue-50'
    },
    { 
      title: 'Avg. Rating', 
      value: '4.8', 
      change: '+0.3', 
      trend: 'up', 
      icon: Star,
      color: 'text-yellow-600',
      bg: 'bg-yellow-50'
    },
    { 
      title: 'Efficiency', 
      value: '96%', 
      change: '-2.1%', 
      trend: 'down', 
      icon: Target,
      color: 'text-purple-600',
      bg: 'bg-purple-50'
    }
  ];

  const serviceBreakdown = [
    { service: 'Full Service', count: 145, revenue: '$18,250', percentage: 42 },
    { service: 'WOF Inspection', count: 89, revenue: '$8,900', percentage: 26 },
    { service: 'Brake Service', count: 67, revenue: '$13,400', percentage: 20 },
    { service: 'Oil Change', count: 41, revenue: '$2,050', percentage: 12 }
  ];

  const customerInsights = [
    { metric: 'New Customers', value: 34, change: '+15%', icon: Users },
    { metric: 'Repeat Rate', value: '88%', change: '+5%', icon: RefreshCw },
    { metric: 'Avg. Service Value', value: '$142', change: '+7%', icon: DollarSign },
    { metric: 'Customer Lifetime', value: '2.3 years', change: '+12%', icon: Heart }
  ];

  const revenueByMonth = [
    { month: 'Jan', revenue: 42000, bookings: 280 },
    { month: 'Feb', revenue: 38000, bookings: 260 },
    { month: 'Mar', revenue: 45000, bookings: 310 },
    { month: 'Apr', revenue: 48750, bookings: 342 },
  ];

  const topPerformers = [
    { name: 'John Smith (Mechanic)', metric: '98% satisfaction', value: 156, type: 'services' },
    { name: 'Full Service Package', metric: '$18,250 revenue', value: 145, type: 'service' },
    { name: 'Morning Slots (8-12pm)', metric: '95% booking rate', value: 89, type: 'time' }
  ];

  const alerts = [
    { type: 'opportunity', message: 'WOF season approaching - 23% revenue increase expected', icon: TrendingUp },
    { type: 'warning', message: 'Brake pad inventory low - reorder recommended', icon: AlertCircle },
    { type: 'insight', message: 'Customer retention up 12% since app launch', icon: Eye }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50">
      {/* Header */}
      <div className="glassmorphism sticky top-0 z-50 border-b border-white/20">
        <div className="flex items-center justify-between p-4">
          <div className="flex items-center">
            <Button variant="ghost" size="icon" onClick={onBack} className="mr-3 hover:bg-white/20">
              <ArrowLeft className="h-5 w-5" />
            </Button>
            <div className="w-12 h-12 gradient-primary rounded-xl flex items-center justify-center mr-3 shadow-medium">
              <BarChart3 className="h-6 w-6 text-white" />
            </div>
            <div>
              <h1 className="font-semibold text-lg">Business Analytics</h1>
              <p className="text-sm text-muted-foreground">Data-driven insights for growth</p>
            </div>
          </div>
          <div className="flex space-x-2">
            <Button variant="ghost" size="sm" className="hover:bg-white/20">
              <Download className="h-4 w-4 mr-2" />
              Export
            </Button>
            <Button variant="ghost" size="sm" className="hover:bg-white/20">
              <Filter className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="p-4 space-y-6">
        {/* Time Range Selector */}
        <Card className="shadow-medium border-0 animate-fade-in">
          <CardContent className="p-4">
            <Tabs value={timeRange} onValueChange={(value) => setTimeRange(value as any)}>
              <TabsList className="grid w-full grid-cols-4 bg-slate-100/50">
                <TabsTrigger value="week">This Week</TabsTrigger>
                <TabsTrigger value="month">This Month</TabsTrigger>
                <TabsTrigger value="quarter">This Quarter</TabsTrigger>
                <TabsTrigger value="year">This Year</TabsTrigger>
              </TabsList>
            </Tabs>
          </CardContent>
        </Card>

        {/* Key Performance Indicators */}
        <div className="grid grid-cols-2 gap-4 animate-slide-up">
          {kpis.map((kpi, index) => {
            const IconComponent = kpi.icon;
            return (
              <Card key={index} className="shadow-medium border-0">
                <CardContent className="p-4">
                  <div className="flex items-center justify-between mb-3">
                    <div className={`w-10 h-10 ${kpi.bg} rounded-xl flex items-center justify-center`}>
                      <IconComponent className={`h-5 w-5 ${kpi.color}`} />
                    </div>
                    <div className={`flex items-center space-x-1 ${
                      kpi.trend === 'up' ? 'text-green-600' : 'text-red-600'
                    }`}>
                      {kpi.trend === 'up' ? 
                        <TrendingUp className="h-4 w-4" /> : 
                        <TrendingDown className="h-4 w-4" />
                      }
                      <span className="text-sm font-medium">{kpi.change}</span>
                    </div>
                  </div>
                  <div>
                    <div className="text-2xl font-bold mb-1">{kpi.value}</div>
                    <div className="text-sm text-muted-foreground">{kpi.title}</div>
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>

        {/* Revenue Chart Placeholder */}
        <Card className="shadow-medium border-0 animate-slide-up" style={{ animationDelay: '0.1s' }}>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <LineChart className="h-5 w-5" />
              <span>Revenue Trend</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-48 bg-gradient-to-r from-blue-50 to-purple-50 rounded-lg flex items-center justify-center">
              <div className="text-center">
                <BarChart3 className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                <p className="text-gray-500">Interactive revenue chart</p>
                <p className="text-sm text-gray-400">Monthly comparison with trends</p>
              </div>
            </div>
            <div className="grid grid-cols-4 gap-4 mt-4">
              {revenueByMonth.map((month, index) => (
                <div key={index} className="text-center p-2 bg-white/60 rounded-lg">
                  <div className="text-sm font-medium">{month.month}</div>
                  <div className="text-xs text-muted-foreground">${(month.revenue/1000).toFixed(0)}k</div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Service Breakdown */}
        <Card className="shadow-medium border-0 animate-slide-up" style={{ animationDelay: '0.2s' }}>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <PieChart className="h-5 w-5" />
              <span>Service Performance</span>
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {serviceBreakdown.map((service, index) => (
              <div key={index} className="space-y-2">
                <div className="flex items-center justify-between">
                  <div>
                    <h4 className="font-medium text-sm">{service.service}</h4>
                    <p className="text-xs text-muted-foreground">{service.count} services • {service.revenue}</p>
                  </div>
                  <Badge variant="secondary" className="text-xs">
                    {service.percentage}%
                  </Badge>
                </div>
                <Progress value={service.percentage} className="h-2" />
              </div>
            ))}
          </CardContent>
        </Card>

        {/* Customer Insights */}
        <Card className="shadow-medium border-0 animate-slide-up" style={{ animationDelay: '0.3s' }}>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Users className="h-5 w-5" />
              <span>Customer Insights</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 gap-4">
              {customerInsights.map((insight, index) => {
                const IconComponent = insight.icon;
                return (
                  <div key={index} className="p-3 bg-gradient-to-br from-slate-50 to-slate-100 rounded-lg">
                    <div className="flex items-center space-x-2 mb-2">
                      <IconComponent className="h-4 w-4 text-blue-600" />
                      <span className="text-sm font-medium">{insight.metric}</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-lg font-bold">{insight.value}</span>
                      <Badge variant="secondary" className="text-xs bg-green-100 text-green-700">
                        {insight.change}
                      </Badge>
                    </div>
                  </div>
                );
              })}
            </div>
          </CardContent>
        </Card>

        {/* Top Performers */}
        <Card className="shadow-medium border-0 animate-slide-up" style={{ animationDelay: '0.4s' }}>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Award className="h-5 w-5 text-yellow-600" />
              <span>Top Performers</span>
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {topPerformers.map((performer, index) => (
              <div key={index} className="flex items-center space-x-3 p-3 bg-gradient-to-r from-yellow-50 to-orange-50 rounded-lg">
                <div className="w-8 h-8 gradient-warning rounded-full flex items-center justify-center">
                  <span className="text-white font-bold text-sm">{index + 1}</span>
                </div>
                <div className="flex-1">
                  <h4 className="font-medium text-sm">{performer.name}</h4>
                  <p className="text-xs text-muted-foreground">{performer.metric}</p>
                </div>
                <div className="text-right">
                  <div className="font-bold text-sm">{performer.value}</div>
                  <p className="text-xs text-muted-foreground">{performer.type}</p>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>

        {/* Smart Alerts */}
        <Card className="shadow-medium border-0 animate-slide-up" style={{ animationDelay: '0.5s' }}>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Zap className="h-5 w-5" />
              <span>Smart Insights</span>
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            {alerts.map((alert, index) => {
              const AlertIcon = alert.icon;
              return (
                <div key={index} className={`flex items-start space-x-3 p-3 rounded-lg border-l-4 ${
                  alert.type === 'opportunity' ? 'bg-green-50 border-green-400' :
                  alert.type === 'warning' ? 'bg-orange-50 border-orange-400' :
                  'bg-blue-50 border-blue-400'
                }`}>
                  <AlertIcon className={`h-5 w-5 mt-0.5 ${
                    alert.type === 'opportunity' ? 'text-green-600' :
                    alert.type === 'warning' ? 'text-orange-600' :
                    'text-blue-600'
                  }`} />
                  <div className="flex-1">
                    <p className="text-sm">{alert.message}</p>
                  </div>
                  <Button size="sm" variant="ghost" className="text-xs">
                    Action
                  </Button>
                </div>
              );
            })}
          </CardContent>
        </Card>

        {/* Growth Opportunities */}
        <Card className="shadow-large border-0 gradient-primary text-white animate-slide-up" style={{ animationDelay: '0.6s' }}>
          <CardContent className="p-6 text-center space-y-4">
            <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center mx-auto">
              <Target className="h-8 w-8 text-white" />
            </div>
            <div>
              <h3 className="font-bold text-lg">Growth Recommendations</h3>
              <p className="text-white/90 text-sm">Based on your analytics, here are opportunities to increase revenue</p>
            </div>
            <div className="space-y-2 text-left">
              <div className="flex items-center space-x-2">
                <CheckCircle className="h-4 w-4 text-green-300" />
                <span className="text-sm">Launch customer loyalty program (+15% retention)</span>
              </div>
              <div className="flex items-center space-x-2">
                <CheckCircle className="h-4 w-4 text-green-300" />
                <span className="text-sm">Add evening slots (+20% booking capacity)</span>
              </div>
              <div className="flex items-center space-x-2">
                <CheckCircle className="h-4 w-4 text-green-300" />
                <span className="text-sm">Promote premium services (+$85 avg. value)</span>
              </div>
            </div>
            <Button variant="secondary" className="font-medium">
              <Activity className="h-4 w-4 mr-2" />
              View Action Plan
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}