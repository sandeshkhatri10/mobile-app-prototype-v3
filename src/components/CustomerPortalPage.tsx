import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import { Progress } from './ui/progress';
import { 
  ArrowLeft, 
  Smartphone,
  Globe,
  Calendar,
  Car,
  Star,
  Bell,
  CreditCard,
  Camera,
  MapPin,
  Clock,
  CheckCircle,
  Gift,
  Share2,
  Download,
  QrCode,
  Heart,
  MessageSquare,
  Shield,
  Zap,
  Trophy,
  Users,
  Play,
  Eye,
  Settings,
  Mail,
  Phone
} from 'lucide-react';

interface CustomerPortalPageProps {
  onBack: () => void;
}

export function CustomerPortalPage({ onBack }: CustomerPortalPageProps) {
  const [activeTab, setActiveTab] = useState('overview');
  
  const portalFeatures = [
    {
      category: 'Booking & Scheduling',
      icon: Calendar,
      features: [
        { name: '24/7 Online Booking', description: 'Customers can book services anytime', status: 'ready' },
        { name: 'Real-time Availability', description: 'Live calendar with available slots', status: 'ready' },
        { name: 'Service Reminders', description: 'Automated WOF & service notifications', status: 'ready' },
        { name: 'Booking Modifications', description: 'Easy reschedule and cancellation', status: 'ready' }
      ]
    },
    {
      category: 'Service Tracking',
      icon: Car,
      features: [
        { name: 'Live Progress Updates', description: 'Real-time job status with photos', status: 'ready' },
        { name: 'Digital Service Records', description: 'Complete service history', status: 'ready' },
        { name: 'Photo/Video Updates', description: 'Visual progress documentation', status: 'ready' },
        { name: 'Completion Notifications', description: 'SMS & email alerts when ready', status: 'ready' }
      ]
    },
    {
      category: 'Customer Experience',
      icon: Star,
      features: [
        { name: 'Review & Rating System', description: 'Easy feedback collection', status: 'ready' },
        { name: 'Loyalty Rewards Program', description: 'Points for every service', status: 'pro' },
        { name: 'Referral System', description: 'Rewards for bringing friends', status: 'pro' },
        { name: 'Customer Support Chat', description: 'Direct messaging with mechanics', status: 'ready' }
      ]
    },
    {
      category: 'Payment & Records',
      icon: CreditCard,
      features: [
        { name: 'Secure Online Payments', description: 'Multiple payment options', status: 'ready' },
        { name: 'Digital Invoices', description: 'Paperless billing system', status: 'ready' },
        { name: 'Expense Tracking', description: 'Vehicle maintenance costs', status: 'pro' },
        { name: 'Warranty Management', description: 'Digital warranty records', status: 'ready' }
      ]
    }
  ];

  const mockCustomerData = {
    totalCustomers: 156,
    activeUsers: 89,
    averageRating: 4.8,
    completionRate: 96,
    monthlyBookings: 234,
    customerRetention: 92
  };

  const customerJourney = [
    { step: 'Discovery', description: 'Customer finds your business', icon: Globe, status: 'completed' },
    { step: 'Booking', description: 'Easy online appointment scheduling', icon: Calendar, status: 'completed' },
    { step: 'Check-in', description: 'QR code check-in process', icon: QrCode, status: 'completed' },
    { step: 'Service', description: 'Real-time updates with photos', icon: Camera, status: 'active' },
    { step: 'Payment', description: 'Secure contactless payment', icon: CreditCard, status: 'pending' },
    { step: 'Follow-up', description: 'Automated satisfaction survey', icon: MessageSquare, status: 'pending' },
    { step: 'Retention', description: 'Loyalty rewards & reminders', icon: Gift, status: 'pending' }
  ];

  const testimonials = [
    { name: 'Sarah Johnson', rating: 5, text: 'Love getting real-time updates with photos of my car!', avatar: 'SJ' },
    { name: 'Mike Chen', rating: 5, text: 'So convenient to book online and track everything in the app.', avatar: 'MC' },
    { name: 'Emma Davis', rating: 5, text: 'The loyalty program is amazing - already earned a free service!', avatar: 'ED' }
  ];

  const competitiveAdvantages = [
    { title: 'Real-time Transparency', description: 'Live updates with photos beat traditional SMS updates', icon: Eye },
    { title: 'Seamless Experience', description: 'One app for everything - booking to payment', icon: Smartphone },
    { title: 'Trust Building', description: 'Visual progress builds customer confidence', icon: Shield },
    { title: 'Customer Retention', description: 'Loyalty program increases repeat business by 40%', icon: Heart }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-pink-50 to-orange-50">
      {/* Header */}
      <div className="glassmorphism sticky top-0 z-50 border-b border-white/20">
        <div className="flex items-center p-4">
          <Button variant="ghost" size="icon" onClick={onBack} className="mr-3 hover:bg-white/20">
            <ArrowLeft className="h-5 w-5" />
          </Button>
          <div className="w-12 h-12 gradient-secondary rounded-xl flex items-center justify-center mr-3 shadow-medium">
            <Globe className="h-6 w-6 text-white" />
          </div>
          <div>
            <h1 className="font-semibold text-lg">Customer Portal</h1>
            <p className="text-sm text-muted-foreground">Transform your customer experience</p>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="p-4 space-y-6">
        {/* Hero Section */}
        <Card className="shadow-large border-0 gradient-secondary text-white animate-fade-in">
          <CardContent className="p-6 text-center space-y-4">
            <div className="w-20 h-20 bg-white/20 rounded-full flex items-center justify-center mx-auto">
              <Zap className="h-10 w-10 text-white" />
            </div>
            <div>
              <h2 className="font-bold text-xl mb-2">Launch Your Customer App</h2>
              <p className="text-white/90">Give customers 24/7 access, real-time updates, and build loyalty that drives repeat business</p>
            </div>
            <div className="flex space-x-2 justify-center">
              <Button variant="secondary" className="font-medium">
                <Play className="h-4 w-4 mr-2" />
                Watch Demo
              </Button>
              <Button variant="ghost" className="text-white hover:bg-white/20">
                <Settings className="h-4 w-4 mr-2" />
                Setup Now
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Key Metrics */}
        <div className="grid grid-cols-2 gap-4 animate-slide-up">
          <Card className="shadow-medium border-0">
            <CardContent className="p-4 text-center">
              <div className="w-12 h-12 gradient-success rounded-xl flex items-center justify-center mx-auto mb-3">
                <Users className="h-6 w-6 text-white" />
              </div>
              <div className="text-2xl font-bold text-green-600 mb-1">{mockCustomerData.activeUsers}</div>
              <div className="text-sm text-muted-foreground">Active App Users</div>
              <Badge variant="secondary" className="text-xs mt-2 bg-green-100 text-green-700">
                +15% this month
              </Badge>
            </CardContent>
          </Card>
          
          <Card className="shadow-medium border-0">
            <CardContent className="p-4 text-center">
              <div className="w-12 h-12 gradient-warning rounded-xl flex items-center justify-center mx-auto mb-3">
                <Star className="h-6 w-6 text-white" />
              </div>
              <div className="text-2xl font-bold text-yellow-600 mb-1">{mockCustomerData.averageRating}</div>
              <div className="text-sm text-muted-foreground">Average Rating</div>
              <div className="flex justify-center mt-2">
                {[1,2,3,4,5].map(i => (
                  <Star key={i} className="h-3 w-3 fill-yellow-400 text-yellow-400" />
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Feature Categories */}
        <div className="animate-slide-up" style={{ animationDelay: '0.1s' }}>
          <h3 className="font-semibold text-lg mb-4">Portal Features</h3>
          <div className="space-y-4">
            {portalFeatures.map((category, categoryIndex) => {
              const CategoryIcon = category.icon;
              return (
                <Card key={categoryIndex} className="shadow-medium border-0">
                  <CardHeader className="pb-3">
                    <CardTitle className="flex items-center space-x-2 text-base">
                      <div className="w-8 h-8 gradient-primary rounded-lg flex items-center justify-center">
                        <CategoryIcon className="h-4 w-4 text-white" />
                      </div>
                      <span>{category.category}</span>
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    {category.features.map((feature, featureIndex) => (
                      <div key={featureIndex} className="flex items-start space-x-3 p-2 rounded-lg hover:bg-slate-50">
                        <div className="w-6 h-6 rounded-full bg-green-100 flex items-center justify-center mt-0.5">
                          <CheckCircle className="h-3 w-3 text-green-600" />
                        </div>
                        <div className="flex-1">
                          <div className="flex items-center space-x-2">
                            <h4 className="text-sm font-medium">{feature.name}</h4>
                            <Badge 
                              variant={feature.status === 'pro' ? 'default' : 'secondary'}
                              className="text-xs"
                            >
                              {feature.status === 'pro' ? 'PRO' : 'READY'}
                            </Badge>
                          </div>
                          <p className="text-xs text-muted-foreground">{feature.description}</p>
                        </div>
                      </div>
                    ))}
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>

        {/* Customer Journey */}
        <Card className="shadow-medium border-0 animate-slide-up" style={{ animationDelay: '0.2s' }}>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <MapPin className="h-5 w-5" />
              <span>Customer Journey</span>
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {customerJourney.map((step, index) => {
              const StepIcon = step.icon;
              return (
                <div key={index} className="flex items-center space-x-4">
                  <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
                    step.status === 'completed' ? 'bg-green-100 text-green-600' :
                    step.status === 'active' ? 'bg-blue-100 text-blue-600' :
                    'bg-gray-100 text-gray-400'
                  }`}>
                    <StepIcon className="h-5 w-5" />
                  </div>
                  <div className="flex-1">
                    <h4 className="font-medium text-sm">{step.step}</h4>
                    <p className="text-xs text-muted-foreground">{step.description}</p>
                  </div>
                  <div className={`w-3 h-3 rounded-full ${
                    step.status === 'completed' ? 'bg-green-500' :
                    step.status === 'active' ? 'bg-blue-500 animate-pulse' :
                    'bg-gray-300'
                  }`}></div>
                </div>
              );
            })}
          </CardContent>
        </Card>

        {/* Competitive Advantages */}
        <Card className="shadow-medium border-0 animate-slide-up" style={{ animationDelay: '0.3s' }}>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Trophy className="h-5 w-5 text-yellow-600" />
              <span>Why Choose Our Portal?</span>
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {competitiveAdvantages.map((advantage, index) => {
              const AdvIcon = advantage.icon;
              return (
                <div key={index} className="flex items-start space-x-3 p-3 bg-gradient-to-r from-blue-50 to-purple-50 rounded-lg">
                  <div className="w-8 h-8 gradient-primary rounded-lg flex items-center justify-center">
                    <AdvIcon className="h-4 w-4 text-white" />
                  </div>
                  <div>
                    <h4 className="font-medium text-sm">{advantage.title}</h4>
                    <p className="text-xs text-muted-foreground">{advantage.description}</p>
                  </div>
                </div>
              );
            })}
          </CardContent>
        </Card>

        {/* Customer Testimonials */}
        <Card className="shadow-medium border-0 animate-slide-up" style={{ animationDelay: '0.4s' }}>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <MessageSquare className="h-5 w-5" />
              <span>What Customers Say</span>
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {testimonials.map((testimonial, index) => (
              <div key={index} className="p-4 bg-gradient-to-r from-yellow-50 to-orange-50 rounded-lg">
                <div className="flex items-start space-x-3">
                  <div className="w-10 h-10 gradient-warning rounded-full flex items-center justify-center">
                    <span className="text-white text-sm font-medium">{testimonial.avatar}</span>
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center space-x-2 mb-2">
                      <h4 className="font-medium text-sm">{testimonial.name}</h4>
                      <div className="flex">
                        {[1,2,3,4,5].map(i => (
                          <Star key={i} className="h-3 w-3 fill-yellow-400 text-yellow-400" />
                        ))}
                      </div>
                    </div>
                    <p className="text-sm text-gray-700">"{testimonial.text}"</p>
                  </div>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>

        {/* Setup CTA */}
        <Card className="shadow-large border-0 gradient-primary text-white animate-slide-up" style={{ animationDelay: '0.5s' }}>
          <CardContent className="p-6 text-center space-y-4">
            <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center mx-auto">
              <Smartphone className="h-8 w-8 text-white" />
            </div>
            <div>
              <h3 className="font-bold text-lg">Ready to Launch?</h3>
              <p className="text-white/90 text-sm">Set up your customer portal in under 10 minutes</p>
            </div>
            <div className="space-y-3">
              <Button variant="secondary" className="w-full font-medium">
                <QrCode className="h-4 w-4 mr-2" />
                Generate Customer QR Code
              </Button>
              <div className="flex space-x-2">
                <Button variant="ghost" size="sm" className="flex-1 text-white hover:bg-white/20">
                  <Mail className="h-4 w-4 mr-2" />
                  Email Setup
                </Button>
                <Button variant="ghost" size="sm" className="flex-1 text-white hover:bg-white/20">
                  <Phone className="h-4 w-4 mr-2" />
                  SMS Setup
                </Button>
              </div>
            </div>
            <div className="text-center">
              <p className="text-xs text-white/80">30-day free trial • No setup fees • Cancel anytime</p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}