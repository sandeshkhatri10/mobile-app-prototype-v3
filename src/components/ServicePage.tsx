import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Textarea } from './ui/textarea';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import { QuotationView } from './QuotationView';
import { BookingsPage } from './BookingsPage';
import { AnalyticsPage } from './AnalyticsPage';
import { CustomerPortalPage } from './CustomerPortalPage';
import { NewBookingForm } from './NewBookingForm';
import { 
  ArrowLeft, 
  Calendar,
  FileText,
  UserPlus,
  Receipt,
  Users,
  Clock,
  Phone,
  Mail,
  Plus,
  Search,
  Filter,
  Car,
  Upload,
  Send,
  Image,
  Video,
  Bell,
  AlertTriangle,
  CheckCircle,
  Edit,
  Eye,
  Link,
  UserCheck,
  BarChart3,
  Package,
  CalendarClock,
  Smartphone,
  Star,
  TrendingUp,
  Zap,
  Globe,
  Award,
  MapPin,
  FileImage,
  MessageSquare,
  Camera,
  DollarSign,
  History,
  Pending,
  User
} from 'lucide-react';

interface ServicePageProps {
  service: string;
  onBack: () => void;
}

export function ServicePage({ service, onBack }: ServicePageProps) {
  const [viewingQuotation, setViewingQuotation] = useState<string | null>(null);
  const [editingCustomer, setEditingCustomer] = useState<string | null>(null);
  const [showBookingsPage, setShowBookingsPage] = useState(false);
  const [showAnalyticsPage, setShowAnalyticsPage] = useState(false);
  const [showCustomerPortal, setShowCustomerPortal] = useState(false);
  const [showNewBookingForm, setShowNewBookingForm] = useState(false);
  const [activeTab, setActiveTab] = useState('list');

  const serviceConfig = {
    'upcoming-bookings': {
      name: 'Upcoming Bookings',
      icon: Calendar,
      gradient: 'gradient-primary',
      content: 'bookings'
    },
    'quotations': {
      name: 'Quotations',
      icon: FileText,
      gradient: 'gradient-success',
      content: 'quotations'
    },
    'analytics': {
      name: 'Business Analytics',
      icon: BarChart3,
      gradient: 'gradient-secondary',
      content: 'analytics'
    },
    'create-user': {
      name: 'Create User ID',
      icon: UserPlus,
      gradient: 'gradient-secondary',
      content: 'create-user'
    },
    'create-invoice': {
      name: 'Create Invoice',
      icon: Receipt,
      gradient: 'gradient-warning',
      content: 'create-invoice'
    },
    'customers': {
      name: 'Customers',
      icon: Users,
      gradient: 'gradient-warning',
      content: 'customers'
    },
    'inventory': {
      name: 'Inventory Management',
      icon: Package,
      gradient: 'gradient-primary',
      content: 'inventory'
    },
    'staff-schedule': {
      name: 'Staff Schedule',
      icon: CalendarClock,
      gradient: 'gradient-success',
      content: 'staff-schedule'
    },
    'customer-portal': {
      name: 'Customer Portal',
      icon: Smartphone,
      gradient: 'gradient-warning',
      content: 'customer-portal'
    },
    'upcoming-events': {
      name: 'Upcoming Events',
      icon: Bell,
      gradient: 'gradient-secondary',
      content: 'upcoming-events'
    }
  };

  const config = serviceConfig[service as keyof typeof serviceConfig] || serviceConfig['upcoming-bookings'];
  const IconComponent = config.icon;

  // Route to specialized pages
  if (viewingQuotation) {
    return (
      <QuotationView 
        quotationId={viewingQuotation} 
        onBack={() => setViewingQuotation(null)} 
      />
    );
  }

  if (showBookingsPage) {
    return (
      <BookingsPage 
        onBack={() => setShowBookingsPage(false)} 
      />
    );
  }

  if (showAnalyticsPage) {
    return (
      <AnalyticsPage 
        onBack={() => setShowAnalyticsPage(false)} 
      />
    );
  }

  if (showCustomerPortal) {
    return (
      <CustomerPortalPage 
        onBack={() => setShowCustomerPortal(false)} 
      />
    );
  }

  if (showNewBookingForm) {
    return (
      <NewBookingForm 
        onBack={() => setShowNewBookingForm(false)} 
      />
    );
  }

  // Mock data for different services
  const mockBookings = [
    { 
      id: '1',
      time: '10:00 AM', 
      customer: 'John Smith', 
      phone: '+64 21 123 4567', 
      email: 'john@email.com', 
      carRego: 'ABC123', 
      service: 'Full Service',
      status: 'confirmed',
      date: new Date().toISOString().split('T')[0]
    },
    { 
      id: '2',
      time: '02:00 PM', 
      customer: 'Sarah Jones', 
      phone: '+64 21 234 5678', 
      email: 'sarah@email.com', 
      carRego: 'XYZ789', 
      service: 'WOF Inspection',
      status: 'pending',
      date: new Date(Date.now() + 86400000).toISOString().split('T')[0]
    },
    { 
      id: '3',
      time: '11:30 AM', 
      customer: 'Mike Wilson', 
      phone: '+64 21 345 6789', 
      email: 'mike@email.com', 
      carRego: 'DEF456', 
      service: 'Brake Service',
      status: 'confirmed',
      date: new Date(Date.now() + 172800000).toISOString().split('T')[0]
    },
  ];

  const mockQuotations = [
    {
      id: '1',
      customer: 'John Smith',
      carRego: 'ABC123',
      service: 'Engine Repair',
      amount: '$450',
      status: 'pending',
      date: '2024-01-15',
      hasPhotos: true,
      description: 'Engine making unusual noise, check required'
    },
    {
      id: '2',
      customer: 'Emma Davis',
      carRego: 'XYZ789',
      service: 'Brake Replacement',
      amount: '$320',
      status: 'approved',
      date: '2024-01-14',
      hasPhotos: true,
      description: 'Front brake pads need replacement'
    },
    {
      id: '3',
      customer: 'Robert Brown',
      carRego: 'DEF456',
      service: 'Transmission Service',
      amount: '$850',
      status: 'draft',
      date: '2024-01-13',
      hasPhotos: false,
      description: 'Transmission fluid change and inspection'
    }
  ];

  const mockCustomers = [
    {
      id: '1',
      name: 'John Smith',
      phone: '+64 21 123 4567',
      email: 'john@email.com',
      cars: [
        { rego: 'ABC123', make: 'Toyota', model: 'Camry', year: '2019', wofExpiry: '2024-06-15', lastService: '2024-01-10' },
        { rego: 'XYZ789', make: 'Honda', model: 'Civic', year: '2020', wofExpiry: '2024-08-20', lastService: '2023-11-15' }
      ]
    },
    {
      id: '2',
      name: 'Sarah Jones',
      phone: '+64 21 234 5678',
      email: 'sarah@email.com',
      cars: [
        { rego: 'DEF456', make: 'Mazda', model: 'CX-5', year: '2021', wofExpiry: '2024-05-10', lastService: '2024-01-05' }
      ]
    },
    {
      id: '3',
      name: 'Mike Wilson',
      phone: '+64 21 345 6789',
      email: 'mike@email.com',
      cars: [
        { rego: 'GHI789', make: 'Ford', model: 'Ranger', year: '2018', wofExpiry: '2024-04-25', lastService: '2023-12-20' },
        { rego: 'JKL012', make: 'Subaru', model: 'Outback', year: '2019', wofExpiry: '2024-07-30', lastService: '2024-01-08' },
        { rego: 'MNO345', make: 'Nissan', model: 'Navara', year: '2017', wofExpiry: '2024-03-15', lastService: '2023-10-12' }
      ]
    }
  ];

  const renderContent = () => {
    switch (config.content) {
      case 'bookings':
        return (
          <>
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-semibold">Booking Management</h3>
              <Button size="sm" onClick={() => setShowBookingsPage(true)} className="gradient-primary text-white">
                <Calendar className="h-4 w-4 mr-2" />
                Full Booking System
              </Button>
            </div>

            {/* Quick Actions */}
            <div className="grid grid-cols-2 gap-3 mb-6">
              <Button 
                onClick={() => setShowNewBookingForm(true)}
                className="h-auto p-4 flex-col space-y-2 gradient-primary text-white"
              >
                <Plus className="h-6 w-6" />
                <span className="text-sm">New Booking</span>
              </Button>
              <Button 
                variant="outline" 
                className="h-auto p-4 flex-col space-y-2"
                onClick={() => setShowBookingsPage(true)}
              >
                <Calendar className="h-6 w-6" />
                <span className="text-sm">Calendar View</span>
              </Button>
            </div>

            {/* Today's Bookings */}
            <Card className="shadow-medium border-0 mb-4">
              <CardHeader>
                <CardTitle className="text-base">Today's Bookings</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {mockBookings.filter(booking => booking.date === new Date().toISOString().split('T')[0]).map((booking) => (
                    <div key={booking.id} className="flex items-center justify-between p-3 bg-slate-50 rounded-lg">
                      <div className="flex items-center space-x-3">
                        <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                          <Car className="h-5 w-5 text-blue-600" />
                        </div>
                        <div>
                          <h4 className="font-medium text-sm">{booking.customer}</h4>
                          <p className="text-xs text-muted-foreground">{booking.carRego} • {booking.service}</p>
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="font-medium text-sm">{booking.time}</div>
                        <Badge variant={booking.status === 'confirmed' ? 'default' : 'secondary'}>
                          {booking.status}
                        </Badge>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Future Bookings */}
            <Card className="shadow-medium border-0">
              <CardHeader>
                <CardTitle className="text-base">Upcoming Bookings</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {mockBookings.filter(booking => booking.date > new Date().toISOString().split('T')[0]).map((booking) => (
                    <div key={booking.id} className="flex items-center justify-between p-3 bg-slate-50 rounded-lg">
                      <div className="flex items-center space-x-3">
                        <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center">
                          <Calendar className="h-5 w-5 text-green-600" />
                        </div>
                        <div>
                          <h4 className="font-medium text-sm">{booking.customer}</h4>
                          <p className="text-xs text-muted-foreground">{booking.carRego} • {booking.service}</p>
                          <p className="text-xs text-muted-foreground">{booking.date} at {booking.time}</p>
                        </div>
                      </div>
                      <Badge variant={booking.status === 'confirmed' ? 'default' : 'secondary'}>
                        {booking.status}
                      </Badge>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </>
        );

      case 'quotations':
        return (
          <>
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-semibold">Quotation Management</h3>
              <Button size="sm" className="gradient-success text-white">
                <Plus className="h-4 w-4 mr-2" />
                New Quotation
              </Button>
            </div>

            <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
              <TabsList className="grid w-full grid-cols-3 bg-slate-100/50">
                <TabsTrigger value="list" className="data-[state=active]:bg-white">All Quotes</TabsTrigger>
                <TabsTrigger value="pending" className="data-[state=active]:bg-white">Pending</TabsTrigger>
                <TabsTrigger value="history" className="data-[state=active]:bg-white">History</TabsTrigger>
              </TabsList>
              
              <TabsContent value="list" className="space-y-4 mt-4">
                <div className="space-y-3">
                  {mockQuotations.map((quote) => (
                    <Card key={quote.id} className="shadow-soft border-0 cursor-pointer hover:shadow-medium transition-shadow">
                      <CardContent className="p-4">
                        <div className="flex items-start justify-between">
                          <div className="flex items-start space-x-3">
                            <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${
                              quote.status === 'pending' ? 'bg-orange-100' :
                              quote.status === 'approved' ? 'bg-green-100' :
                              'bg-gray-100'
                            }`}>
                              <FileText className={`h-5 w-5 ${
                                quote.status === 'pending' ? 'text-orange-600' :
                                quote.status === 'approved' ? 'text-green-600' :
                                'text-gray-600'
                              }`} />
                            </div>
                            <div className="flex-1">
                              <div className="flex items-center space-x-2">
                                <h4 className="font-medium text-sm">{quote.customer}</h4>
                                {quote.hasPhotos && (
                                  <div className="flex space-x-1">
                                    <Camera className="h-3 w-3 text-blue-500" />
                                    <span className="text-xs text-blue-500">Photos</span>
                                  </div>
                                )}
                              </div>
                              <p className="text-xs text-muted-foreground">{quote.carRego} • {quote.service}</p>
                              <p className="text-xs text-muted-foreground mt-1">{quote.description}</p>
                              <p className="text-xs text-muted-foreground">Date: {quote.date}</p>
                            </div>
                          </div>
                          <div className="text-right">
                            <div className="font-medium text-sm">{quote.amount}</div>
                            <Badge variant={
                              quote.status === 'pending' ? 'secondary' :
                              quote.status === 'approved' ? 'default' :
                              'outline'
                            }>
                              {quote.status}
                            </Badge>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </TabsContent>

              <TabsContent value="pending" className="space-y-4 mt-4">
                <div className="space-y-3">
                  {mockQuotations.filter(q => q.status === 'pending').map((quote) => (
                    <Card key={quote.id} className="shadow-soft border-0 border-l-4 border-orange-400">
                      <CardContent className="p-4">
                        <div className="flex items-center justify-between">
                          <div>
                            <h4 className="font-medium text-sm">{quote.customer}</h4>
                            <p className="text-xs text-muted-foreground">{quote.service} - {quote.amount}</p>
                          </div>
                          <div className="flex space-x-2">
                            <Button size="sm" variant="outline">
                              <Eye className="h-3 w-3 mr-1" />
                              View
                            </Button>
                            <Button size="sm" className="bg-green-600 text-white">
                              <CheckCircle className="h-3 w-3 mr-1" />
                              Approve
                            </Button>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </TabsContent>

              <TabsContent value="history" className="space-y-4 mt-4">
                <div className="space-y-3">
                  {mockQuotations.filter(q => q.status === 'approved').map((quote) => (
                    <Card key={quote.id} className="shadow-soft border-0">
                      <CardContent className="p-4">
                        <div className="flex items-center justify-between">
                          <div>
                            <h4 className="font-medium text-sm">{quote.customer}</h4>
                            <p className="text-xs text-muted-foreground">{quote.service} - {quote.amount}</p>
                            <p className="text-xs text-green-600">Approved on {quote.date}</p>
                          </div>
                          <Button size="sm" variant="outline">
                            <Eye className="h-3 w-3 mr-1" />
                            View
                          </Button>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </TabsContent>
            </Tabs>

            {/* Customer Quotation Requests */}
            <Card className="shadow-medium border-0 mt-6">
              <CardHeader>
                <CardTitle className="flex items-center space-x-2 text-base">
                  <MessageSquare className="h-5 w-5" />
                  <span>Customer Quotation Requests</span>
                  <Badge variant="secondary">2 new</Badge>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="p-3 bg-blue-50 rounded-lg border border-blue-200">
                  <div className="flex items-start space-x-3">
                    <div className="w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center">
                      <Camera className="h-4 w-4 text-blue-600" />
                    </div>
                    <div className="flex-1">
                      <h4 className="font-medium text-sm">Mike Johnson - GHI789</h4>
                      <p className="text-xs text-muted-foreground mb-2">"My car is making a weird noise when I brake"</p>
                      <div className="flex items-center space-x-2">
                        <Badge variant="secondary" className="text-xs">
                          <Image className="h-3 w-3 mr-1" />
                          2 Photos
                        </Badge>
                        <Badge variant="secondary" className="text-xs">
                          <Video className="h-3 w-3 mr-1" />
                          1 Video
                        </Badge>
                      </div>
                    </div>
                    <Button size="sm" className="gradient-primary text-white">
                      Create Quote
                    </Button>
                  </div>
                </div>

                <div className="p-3 bg-orange-50 rounded-lg border border-orange-200">
                  <div className="flex items-start space-x-3">
                    <div className="w-8 h-8 bg-orange-100 rounded-lg flex items-center justify-center">
                      <FileImage className="h-4 w-4 text-orange-600" />
                    </div>
                    <div className="flex-1">
                      <h4 className="font-medium text-sm">Emma Davis - JKL012</h4>
                      <p className="text-xs text-muted-foreground mb-2">"Need WOF inspection urgently"</p>
                      <Badge variant="secondary" className="text-xs">
                        <Image className="h-3 w-3 mr-1" />
                        1 Photo
                      </Badge>
                    </div>
                    <Button size="sm" className="gradient-success text-white">
                      Create Quote
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </>
        );

      case 'customers':
        return (
          <>
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-semibold">Customer Management</h3>
              <Button size="sm" className="gradient-warning text-white">
                <Plus className="h-4 w-4 mr-2" />
                New Customer
              </Button>
            </div>

            <div className="space-y-4">
              {mockCustomers.map((customer) => (
                <Card key={customer.id} className="shadow-medium border-0">
                  <CardContent className="p-4">
                    <div className="flex items-start justify-between mb-3">
                      <div className="flex items-center space-x-3">
                        <div className="w-12 h-12 gradient-primary rounded-full flex items-center justify-center">
                          <span className="text-white font-medium">{customer.name.split(' ').map(n => n[0]).join('')}</span>
                        </div>
                        <div>
                          <h4 className="font-medium">{customer.name}</h4>
                          <p className="text-sm text-muted-foreground">{customer.phone}</p>
                          <p className="text-xs text-muted-foreground">{customer.email}</p>
                        </div>
                      </div>
                      <Badge variant="secondary">
                        {customer.cars.length} car{customer.cars.length !== 1 ? 's' : ''}
                      </Badge>
                    </div>

                    {/* Customer's Cars */}
                    <div className="space-y-2">
                      <h5 className="text-sm font-medium text-muted-foreground">Vehicles</h5>
                      {customer.cars.map((car, index) => {
                        const wofExpiry = new Date(car.wofExpiry);
                        const today = new Date();
                        const daysUntilExpiry = Math.ceil((wofExpiry.getTime() - today.getTime()) / (1000 * 60 * 60 * 24));
                        const isExpiringSoon = daysUntilExpiry <= 30;
                        
                        return (
                          <div key={index} className={`p-3 rounded-lg border ${
                            isExpiringSoon ? 'bg-red-50 border-red-200' : 'bg-slate-50 border-slate-200'
                          }`}>
                            <div className="flex items-center justify-between">
                              <div>
                                <div className="flex items-center space-x-2">
                                  <span className="font-medium text-sm">{car.rego}</span>
                                  <span className="text-sm text-muted-foreground">•</span>
                                  <span className="text-sm">{car.make} {car.model} ({car.year})</span>
                                </div>
                                <div className="flex items-center space-x-4 mt-1">
                                  <div>
                                    <span className="text-xs text-muted-foreground">WOF: </span>
                                    <span className={`text-xs ${isExpiringSoon ? 'text-red-600 font-medium' : 'text-muted-foreground'}`}>
                                      {car.wofExpiry}
                                    </span>
                                  </div>
                                  <div>
                                    <span className="text-xs text-muted-foreground">Last Service: </span>
                                    <span className="text-xs text-muted-foreground">{car.lastService}</span>
                                  </div>
                                </div>
                              </div>
                              {isExpiringSoon && (
                                <Badge variant="destructive" className="text-xs">
                                  <AlertTriangle className="h-3 w-3 mr-1" />
                                  Expires in {daysUntilExpiry} days
                                </Badge>
                              )}
                            </div>
                          </div>
                        );
                      })}
                    </div>

                    {/* Quick Actions */}
                    <div className="flex space-x-2 mt-4">
                      <Button size="sm" variant="outline">
                        <Calendar className="h-3 w-3 mr-1" />
                        Book Service
                      </Button>
                      <Button size="sm" variant="outline">
                        <FileText className="h-3 w-3 mr-1" />
                        Create Quote
                      </Button>
                      <Button size="sm" variant="outline">
                        <Car className="h-3 w-3 mr-1" />
                        Add Vehicle
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </>
        );

      // Keep existing cases for other services...
      case 'analytics':
        return (
          <>
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-semibold">Analytics Overview</h3>
              <Button size="sm" onClick={() => setShowAnalyticsPage(true)} className="gradient-primary text-white">
                <BarChart3 className="h-4 w-4 mr-2" />
                Full Analytics
              </Button>
            </div>

            <div className="space-y-4">
              {/* Quick Stats */}
              <div className="grid grid-cols-2 gap-4">
                <Card className="shadow-medium border-0">
                  <CardContent className="p-4 text-center">
                    <div className="w-12 h-12 gradient-success rounded-xl flex items-center justify-center mx-auto mb-3">
                      <TrendingUp className="h-6 w-6 text-white" />
                    </div>
                    <div className="text-2xl font-bold text-green-600 mb-1">+12.5%</div>
                    <div className="text-sm text-muted-foreground">Revenue Growth</div>
                  </CardContent>
                </Card>
                
                <Card className="shadow-medium border-0">
                  <CardContent className="p-4 text-center">
                    <div className="w-12 h-12 gradient-warning rounded-xl flex items-center justify-center mx-auto mb-3">
                      <Star className="h-6 w-6 text-white" />
                    </div>
                    <div className="text-2xl font-bold text-yellow-600 mb-1">4.8</div>
                    <div className="text-sm text-muted-foreground">Avg Rating</div>
                  </CardContent>
                </Card>
              </div>

              {/* Feature Preview */}
              <Card className="shadow-medium border-0">
                <CardHeader>
                  <CardTitle className="text-base">What's Inside Full Analytics</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  {[
                    { icon: TrendingUp, text: 'Revenue trends & forecasting' },
                    { icon: Users, text: 'Customer behavior insights' },
                    { icon: Star, text: 'Service performance metrics' },
                    { icon: Award, text: 'Growth recommendations' }
                  ].map((feature, index) => {
                    const FeatureIcon = feature.icon;
                    return (
                      <div key={index} className="flex items-center space-x-3">
                        <FeatureIcon className="h-4 w-4 text-blue-600" />
                        <span className="text-sm">{feature.text}</span>
                      </div>
                    );
                  })}
                </CardContent>
              </Card>
            </div>
          </>
        );

      case 'customer-portal':
        return (
          <>
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-semibold">Customer Portal Setup</h3>
              <Button size="sm" onClick={() => setShowCustomerPortal(true)} className="gradient-secondary text-white">
                <Globe className="h-4 w-4 mr-2" />
                Launch Portal
              </Button>
            </div>

            <div className="space-y-4">
              {/* Portal Status */}
              <Card className="shadow-medium border-0 gradient-primary text-white">
                <CardContent className="p-4 text-center">
                  <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-3">
                    <Zap className="h-8 w-8 text-white" />
                  </div>
                  <h4 className="font-semibold mb-2">Transform Customer Experience</h4>
                  <p className="text-white/90 text-sm mb-4">Give customers 24/7 access to bookings, progress updates, and digital records</p>
                  <Badge variant="secondary" className="mb-2">
                    🚀 Ready to Launch
                  </Badge>
                </CardContent>
              </Card>

              {/* Quick Benefits */}
              <div className="grid grid-cols-2 gap-3">
                {[
                  { icon: Calendar, title: '24/7 Booking', desc: 'Online scheduling' },
                  { icon: Camera, title: 'Live Updates', desc: 'Photo progress' },
                  { icon: Star, title: 'Reviews', desc: 'Customer feedback' },
                  { icon: Award, title: 'Loyalty', desc: 'Reward program' }
                ].map((benefit, index) => {
                  const BenefitIcon = benefit.icon;
                  return (
                    <Card key={index} className="shadow-soft border-0">
                      <CardContent className="p-3 text-center">
                        <BenefitIcon className="h-6 w-6 text-blue-600 mx-auto mb-2" />
                        <h5 className="font-medium text-sm">{benefit.title}</h5>
                        <p className="text-xs text-muted-foreground">{benefit.desc}</p>
                      </CardContent>
                    </Card>
                  );
                })}
              </div>
            </div>
          </>
        );

      case 'inventory':
        return (
          <>
            <h3 className="font-semibold mb-4">Inventory Management</h3>
            
            <div className="space-y-4">
              {/* Inventory Alerts */}
              <Card className="shadow-medium border-0">
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2 text-base">
                    <AlertTriangle className="h-5 w-5 text-orange-600" />
                    <span>Low Stock Alerts</span>
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  {[
                    { item: 'Brake Pads', current: 5, minimum: 10, urgency: 'high' },
                    { item: 'Engine Oil (5L)', current: 8, minimum: 15, urgency: 'medium' },
                    { item: 'Air Filters', current: 12, minimum: 20, urgency: 'low' }
                  ].map((item, index) => (
                    <div key={index} className={`flex items-center justify-between p-3 rounded-lg border-l-4 ${
                      item.urgency === 'high' ? 'bg-red-50 border-red-400' :
                      item.urgency === 'medium' ? 'bg-orange-50 border-orange-400' :
                      'bg-yellow-50 border-yellow-400'
                    }`}>
                      <div>
                        <h4 className="font-medium text-sm">{item.item}</h4>
                        <p className="text-xs text-muted-foreground">Current: {item.current} | Min: {item.minimum}</p>
                      </div>
                      <Button size="sm" variant="outline">
                        Reorder
                      </Button>
                    </div>
                  ))}
                </CardContent>
              </Card>

              {/* Quick Actions */}
              <div className="grid grid-cols-2 gap-3">
                <Button variant="outline" className="h-auto p-4 flex-col space-y-2">
                  <Plus className="h-6 w-6" />
                  <span className="text-sm">Add Item</span>
                </Button>
                <Button variant="outline" className="h-auto p-4 flex-col space-y-2">
                  <Search className="h-6 w-6" />
                  <span className="text-sm">Search Stock</span>
                </Button>
              </div>
            </div>
          </>
        );

      case 'staff-schedule':
        return (
          <>
            <h3 className="font-semibold mb-4">Staff Schedule</h3>
            
            <div className="space-y-4">
              {/* Today's Schedule */}
              <Card className="shadow-medium border-0">
                <CardHeader>
                  <CardTitle className="text-base">Today's Schedule</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  {[
                    { name: 'John Smith', shift: '8:00 AM - 5:00 PM', status: 'active', jobs: 4 },
                    { name: 'Mike Johnson', shift: '9:00 AM - 6:00 PM', status: 'active', jobs: 3 },
                    { name: 'Sarah Williams', shift: '12:00 PM - 9:00 PM', status: 'scheduled', jobs: 2 }
                  ].map((staff, index) => (
                    <div key={index} className="flex items-center justify-between p-3 bg-slate-50 rounded-lg">
                      <div className="flex items-center space-x-3">
                        <div className="w-10 h-10 gradient-primary rounded-full flex items-center justify-center">
                          <span className="text-white text-sm font-medium">{staff.name.split(' ').map(n => n[0]).join('')}</span>
                        </div>
                        <div>
                          <h4 className="font-medium text-sm">{staff.name}</h4>
                          <p className="text-xs text-muted-foreground">{staff.shift}</p>
                        </div>
                      </div>
                      <div className="text-right">
                        <Badge variant={staff.status === 'active' ? 'default' : 'secondary'}>
                          {staff.status}
                        </Badge>
                        <p className="text-xs text-muted-foreground mt-1">{staff.jobs} jobs</p>
                      </div>
                    </div>
                  ))}
                </CardContent>
              </Card>

              {/* Quick Actions */}
              <div className="grid grid-cols-2 gap-3">
                <Button variant="outline" className="h-auto p-4 flex-col space-y-2">
                  <CalendarClock className="h-6 w-6" />
                  <span className="text-sm">Edit Schedule</span>
                </Button>
                <Button variant="outline" className="h-auto p-4 flex-col space-y-2">
                  <Users className="h-6 w-6" />
                  <span className="text-sm">Manage Staff</span>
                </Button>
              </div>
            </div>
          </>
        );

      // Keep other existing cases...
      default:
        return <div>Service content not found</div>;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 animate-fade-in">
      {/* Enhanced Header */}
      <div className="glassmorphism sticky top-0 z-50 border-b border-white/20">
        <div className="flex items-center p-4">
          <Button 
            variant="ghost" 
            size="icon" 
            onClick={onBack} 
            className="mr-3 hover:bg-white/20 transition-all duration-200 hover:scale-105"
          >
            <ArrowLeft className="h-5 w-5" />
          </Button>
          <div className={`w-12 h-12 ${config.gradient} rounded-xl flex items-center justify-center mr-3 shadow-medium`}>
            <IconComponent className="h-6 w-6 text-white" />
          </div>
          <div>
            <h1 className="font-semibold text-lg">{config.name}</h1>
            <p className="text-sm text-muted-foreground">Manage your {config.name.toLowerCase()}</p>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="p-4 space-y-6 animate-slide-up">
        {renderContent()}
      </div>
    </div>
  );
}