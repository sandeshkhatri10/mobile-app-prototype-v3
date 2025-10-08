import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Avatar, AvatarFallback } from './ui/avatar';
import { Badge } from './ui/badge';
import { Progress } from './ui/progress';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Textarea } from './ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { Calendar } from './ui/calendar';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from './ui/dialog';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import { CarManagement } from './CarManagement';
import { CustomerQuotations } from './CustomerQuotations';
import { 
  Calendar as CalendarIcon,
  Car,
  FileText,
  Clock,
  Bell,
  LogOut,
  CheckCircle,
  AlertTriangle,
  Star,
  Receipt,
  History,
  Phone,
  MessageSquare,
  MapPin,
  CreditCard,
  Settings,
  Award,
  Smartphone,
  Edit3,
  Plus,
  Upload,
  Camera,
  Video,
  Download,
  Search,
  Filter,
  Zap,
  Shield,
  Wrench,
  DollarSign,
  User,
  ArrowLeft
} from 'lucide-react';

interface CustomerDashboardProps {
  onLogout: () => void;
}

type Page = 'dashboard' | 'quotations' | 'car-management' | 'book-service' | 'service-history' | 'new-quotation';

interface ServiceHistoryItem {
  id: string;
  service: string;
  date: string;
  car: string;
  amount: string;
  status: 'completed' | 'pending' | 'cancelled';
  technician: string;
  location: string;
  notes?: string;
  invoiceUrl?: string;
  rating?: number;
}

export function CustomerDashboard({ onLogout }: CustomerDashboardProps) {
  const [activeNotifications] = useState(3);
  const [currentPage, setCurrentPage] = useState<Page>('dashboard');
  const [selectedDate, setSelectedDate] = useState<Date>(new Date());
  const [selectedTimeSlot, setSelectedTimeSlot] = useState<string>('');
  const [uploadedFiles, setUploadedFiles] = useState<File[]>([]);
  
  // Mock customer data with enhanced service history
  const [customerData, setCustomerData] = useState({
    name: 'John Smith',
    phone: '+64 21 123 4567',
    email: 'john.smith@email.com',
    memberSince: '2020-03-15',
    loyaltyPoints: 480,
    totalSpent: 2450,
    cars: [
      { 
        id: 1, 
        rego: 'ABC123', 
        make: 'Toyota', 
        model: 'Camry', 
        year: 2020,
        wofExpiry: '2024-03-15',
        regoExpiry: '2024-06-20',
        lastService: '2024-01-15',
        mileage: 45000
      },
      { 
        id: 2, 
        rego: 'XYZ789', 
        make: 'Honda', 
        model: 'Civic', 
        year: 2018,
        wofExpiry: '2024-05-10',
        regoExpiry: '2024-08-15',
        lastService: '2023-12-05',
        mileage: 78000
      }
    ],
    upcomingBookings: [
      {
        id: 1,
        service: 'WOF Inspection',
        date: '2024-02-28',
        time: '10:00 AM',
        car: 'ABC123 - Toyota Camry',
        status: 'confirmed',
        estimatedCost: 65,
        technician: 'Mike Johnson',
        location: 'Bay 1'
      },
      {
        id: 2,
        service: 'Full Service',
        date: '2024-03-05',
        time: '2:00 PM',
        car: 'XYZ789 - Honda Civic',
        status: 'pending',
        estimatedCost: 320,
        technician: 'Dave Smith',
        location: 'Bay 2'
      }
    ]
  });

  const [serviceHistory, setServiceHistory] = useState<ServiceHistoryItem[]>([
    {
      id: '1',
      service: 'Full Service',
      date: '2024-01-15',
      car: 'ABC123 - Toyota Camry',
      amount: '$295.00',
      status: 'completed',
      technician: 'Mike Johnson',
      location: 'Bay 1',
      notes: 'Oil changed, filters replaced, brakes checked',
      rating: 5
    },
    {
      id: '2',
      service: 'WOF Inspection',
      date: '2023-12-20',
      car: 'XYZ789 - Honda Civic',
      amount: '$65.00',
      status: 'completed',
      technician: 'Dave Smith',
      location: 'Bay 2',
      notes: 'Passed WOF inspection, minor headlight adjustment',
      rating: 5
    },
    {
      id: '3',
      service: 'Brake Repair',
      date: '2023-11-08',
      car: 'ABC123 - Toyota Camry',
      amount: '$180.00',
      status: 'completed',
      technician: 'Tom Wilson',
      location: 'Bay 3',
      notes: 'Front brake pads replaced, rotors machined',
      rating: 4
    }
  ]);

  const timeSlots = [
    '8:00 AM', '8:30 AM', '9:00 AM', '9:30 AM', '10:00 AM', '10:30 AM',
    '11:00 AM', '11:30 AM', '1:00 PM', '1:30 PM', '2:00 PM', '2:30 PM',
    '3:00 PM', '3:30 PM', '4:00 PM', '4:30 PM'
  ];

  const serviceTypes = [
    { id: 'wof', name: 'WOF Inspection', price: 65, duration: '30 min', icon: Shield },
    { id: 'service', name: 'Full Service', price: 320, duration: '90 min', icon: Wrench },
    { id: 'oil-change', name: 'Oil Change', price: 89, duration: '45 min', icon: Zap },
    { id: 'brake-check', name: 'Brake Check', price: 120, duration: '60 min', icon: Car },
    { id: 'diagnostic', name: 'Diagnostic', price: 95, duration: '60 min', icon: Settings }
  ];

  const handleCarsUpdate = (updatedCars: any[]) => {
    setCustomerData(prev => ({
      ...prev,
      cars: updatedCars
    }));
  };

  const handleFileUpload = (files: FileList | null) => {
    if (files) {
      const newFiles = Array.from(files);
      setUploadedFiles(prev => [...prev, ...newFiles]);
    }
  };

  const removeFile = (index: number) => {
    setUploadedFiles(prev => prev.filter((_, i) => i !== index));
  };

  const getExpiryStatus = (expiryDate: string) => {
    const today = new Date();
    const expiry = new Date(expiryDate);
    const daysUntilExpiry = Math.ceil((expiry.getTime() - today.getTime()) / (1000 * 3600 * 24));
    
    if (daysUntilExpiry < 0) return { status: 'expired', color: 'text-red-600', bg: 'bg-red-50' };
    if (daysUntilExpiry <= 30) return { status: 'warning', color: 'text-orange-600', bg: 'bg-orange-50' };
    return { status: 'good', color: 'text-green-600', bg: 'bg-green-50' };
  };

  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }, (_, i) => (
      <Star 
        key={i} 
        className={`h-4 w-4 ${i < rating ? 'text-yellow-400 fill-current' : 'text-gray-300'}`} 
      />
    ));
  };

  // Handle different pages
  if (currentPage === 'quotations') {
    return <CustomerQuotations onBack={() => setCurrentPage('dashboard')} />;
  }

  if (currentPage === 'car-management') {
    return (
      <CarManagement 
        onBack={() => setCurrentPage('dashboard')} 
        cars={customerData.cars}
        onCarsUpdate={handleCarsUpdate}
      />
    );
  }

  // New Booking Page
  if (currentPage === 'book-service') {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
        <div className="glassmorphism sticky top-0 z-50 border-b border-white/20">
          <div className="flex items-center justify-between p-4">
            <div className="flex items-center space-x-4">
              <Button 
                variant="ghost" 
                size="lg" 
                onClick={() => setCurrentPage('dashboard')}
                className="hover:bg-white/20 transition-all duration-200"
              >
                <ArrowLeft className="h-6 w-6 text-white" />
              </Button>
              <div>
                <h1 className="text-xl font-bold text-white">Book Service</h1>
                <p className="text-sm text-white/80">Schedule your next appointment</p>
              </div>
            </div>
          </div>
        </div>

        <div className="p-4 space-y-6">
          {/* Service Selection */}
          <Card className="shadow-2xl border-0 bg-white/95 backdrop-blur-xl animate-slide-up">
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Wrench className="h-5 w-5 text-blue-600" />
                <span>Select Service</span>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {serviceTypes.map((service) => (
                <div key={service.id} className="p-4 border rounded-lg hover:bg-blue-50 cursor-pointer transition-all duration-200 hover:shadow-md">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                        <service.icon className="h-5 w-5 text-blue-600" />
                      </div>
                      <div>
                        <h3 className="font-medium">{service.name}</h3>
                        <p className="text-sm text-muted-foreground">{service.duration}</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="font-bold text-lg">${service.price}</p>
                    </div>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>

          {/* Car Selection */}
          <Card className="shadow-2xl border-0 bg-white/95 backdrop-blur-xl animate-slide-up" style={{ animationDelay: '0.1s' }}>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Car className="h-5 w-5 text-blue-600" />
                <span>Select Vehicle</span>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              {customerData.cars.map((car) => (
                <div key={car.id} className="p-4 border rounded-lg hover:bg-blue-50 cursor-pointer transition-all duration-200">
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="font-medium">{car.rego}</h3>
                      <p className="text-sm text-muted-foreground">{car.year} {car.make} {car.model}</p>
                    </div>
                    <Badge variant="outline">{car.mileage.toLocaleString()} km</Badge>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>

          {/* Calendar Date Selection */}
          <Card className="shadow-2xl border-0 bg-white/95 backdrop-blur-xl animate-slide-up" style={{ animationDelay: '0.2s' }}>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <CalendarIcon className="h-5 w-5 text-blue-600" />
                <span>Select Date</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <Calendar
                mode="single"
                selected={selectedDate}
                onSelect={(date) => date && setSelectedDate(date)}
                disabled={(date) => date < new Date() || date.getDay() === 0} // Disable past dates and Sundays
                className="rounded-md border w-full"
              />
            </CardContent>
          </Card>

          {/* Time Slot Selection */}
          <Card className="shadow-2xl border-0 bg-white/95 backdrop-blur-xl animate-slide-up" style={{ animationDelay: '0.3s' }}>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Clock className="h-5 w-5 text-blue-600" />
                <span>Select Time</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-3 gap-3">
                {timeSlots.map((slot) => (
                  <Button
                    key={slot}
                    variant={selectedTimeSlot === slot ? "default" : "outline"}
                    onClick={() => setSelectedTimeSlot(slot)}
                    className="h-12"
                  >
                    {slot}
                  </Button>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Additional Notes */}
          <Card className="shadow-2xl border-0 bg-white/95 backdrop-blur-xl animate-slide-up" style={{ animationDelay: '0.4s' }}>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <MessageSquare className="h-5 w-5 text-blue-600" />
                <span>Additional Notes</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <Textarea placeholder="Any specific concerns or requests..." className="h-20" />
            </CardContent>
          </Card>

          {/* Confirm Booking */}
          <Button 
            className="w-full h-14 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 shadow-xl text-lg font-semibold"
            onClick={() => {
              alert('Booking confirmed! You will receive a confirmation email shortly.');
              setCurrentPage('dashboard');
            }}
          >
            Confirm Booking
          </Button>
        </div>
      </div>
    );
  }

  // New Quotation Request Page
  if (currentPage === 'new-quotation') {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
        <div className="glassmorphism sticky top-0 z-50 border-b border-white/20">
          <div className="flex items-center justify-between p-4">
            <div className="flex items-center space-x-4">
              <Button 
                variant="ghost" 
                size="lg" 
                onClick={() => setCurrentPage('dashboard')}
                className="hover:bg-white/20 transition-all duration-200"
              >
                <ArrowLeft className="h-6 w-6 text-white" />
              </Button>
              <div>
                <h1 className="text-xl font-bold text-white">Request Quotation</h1>
                <p className="text-sm text-white/80">Get an estimate for your service</p>
              </div>
            </div>
          </div>
        </div>

        <div className="p-4 space-y-6">
          {/* Basic Information */}
          <Card className="shadow-2xl border-0 bg-white/95 backdrop-blur-xl animate-slide-up">
            <CardHeader>
              <CardTitle>Service Details</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label>Service Type</Label>
                <Select>
                  <SelectTrigger>
                    <SelectValue placeholder="Select service type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="repair">Repair</SelectItem>
                    <SelectItem value="maintenance">Maintenance</SelectItem>
                    <SelectItem value="diagnostic">Diagnostic</SelectItem>
                    <SelectItem value="other">Other</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              <div className="space-y-2">
                <Label>Vehicle</Label>
                <Select>
                  <SelectTrigger>
                    <SelectValue placeholder="Select your vehicle" />
                  </SelectTrigger>
                  <SelectContent>
                    {customerData.cars.map((car) => (
                      <SelectItem key={car.id} value={car.id.toString()}>
                        {car.rego} - {car.year} {car.make} {car.model}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label>Description</Label>
                <Textarea 
                  placeholder="Describe the issue or service needed..." 
                  className="h-24"
                />
              </div>
            </CardContent>
          </Card>

          {/* Media Upload */}
          <Card className="shadow-2xl border-0 bg-white/95 backdrop-blur-xl animate-slide-up" style={{ animationDelay: '0.1s' }}>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Camera className="h-5 w-5 text-blue-600" />
                <span>Upload Photos & Videos</span>
              </CardTitle>
              <p className="text-sm text-muted-foreground">
                Help us understand the issue better with photos or videos
              </p>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center hover:border-blue-400 transition-colors">
                <input
                  type="file"
                  multiple
                  accept="image/*,video/*"
                  onChange={(e) => handleFileUpload(e.target.files)}
                  className="hidden"
                  id="file-upload"
                />
                <label htmlFor="file-upload" className="cursor-pointer">
                  <Upload className="h-8 w-8 mx-auto mb-2 text-gray-400" />
                  <p className="text-sm text-gray-600 mb-1">
                    Click to upload or drag and drop
                  </p>
                  <p className="text-xs text-gray-500">
                    PNG, JPG, MP4 up to 10MB each
                  </p>
                </label>
              </div>

              {/* Uploaded Files Preview */}
              {uploadedFiles.length > 0 && (
                <div className="space-y-2">
                  <h4 className="font-medium">Uploaded Files:</h4>
                  <div className="grid grid-cols-2 gap-2">
                    {uploadedFiles.map((file, index) => (
                      <div key={index} className="flex items-center justify-between p-2 bg-gray-50 rounded-lg">
                        <div className="flex items-center space-x-2">
                          {file.type.startsWith('image/') ? (
                            <Camera className="h-4 w-4 text-blue-500" />
                          ) : (
                            <Video className="h-4 w-4 text-purple-500" />
                          )}
                          <span className="text-sm truncate">{file.name}</span>
                        </div>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => removeFile(index)}
                          className="h-6 w-6 p-0"
                        >
                          ×
                        </Button>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              <div className="grid grid-cols-2 gap-4">
                <Button variant="outline" className="h-12">
                  <Camera className="h-4 w-4 mr-2" />
                  Take Photo
                </Button>
                <Button variant="outline" className="h-12">
                  <Video className="h-4 w-4 mr-2" />
                  Record Video
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Contact Preferences */}
          <Card className="shadow-2xl border-0 bg-white/95 backdrop-blur-xl animate-slide-up" style={{ animationDelay: '0.2s' }}>
            <CardHeader>
              <CardTitle>Contact Preferences</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label>Preferred contact method</Label>
                <Select>
                  <SelectTrigger>
                    <SelectValue placeholder="Select contact method" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="phone">Phone Call</SelectItem>
                    <SelectItem value="sms">SMS</SelectItem>
                    <SelectItem value="email">Email</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              <div className="space-y-2">
                <Label>Best time to contact</Label>
                <Select>
                  <SelectTrigger>
                    <SelectValue placeholder="Select time preference" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="morning">Morning (8AM - 12PM)</SelectItem>
                    <SelectItem value="afternoon">Afternoon (12PM - 5PM)</SelectItem>
                    <SelectItem value="evening">Evening (5PM - 8PM)</SelectItem>
                    <SelectItem value="anytime">Anytime</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </CardContent>
          </Card>

          {/* Submit Quotation Request */}
          <Button 
            className="w-full h-14 bg-gradient-to-r from-green-600 to-blue-600 hover:from-green-700 hover:to-blue-700 shadow-xl text-lg font-semibold"
            onClick={() => {
              alert('Quotation request submitted! We will contact you within 24 hours.');
              setCurrentPage('dashboard');
            }}
          >
            Submit Quotation Request
          </Button>
        </div>
      </div>
    );
  }

  // Service History Page
  if (currentPage === 'service-history') {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50">
        <div className="glassmorphism sticky top-0 z-50 border-b border-white/20">
          <div className="flex items-center justify-between p-4">
            <div className="flex items-center space-x-4">
              <Button 
                variant="ghost" 
                size="lg" 
                onClick={() => setCurrentPage('dashboard')}
                className="hover:bg-white/20 transition-all duration-200"
              >
                <ArrowLeft className="h-6 w-6" />
              </Button>
              <div>
                <h1 className="text-xl font-bold">Service History</h1>
                <p className="text-sm text-muted-foreground">Your complete service record</p>
              </div>
            </div>
            <Button variant="outline" size="sm">
              <Download className="h-4 w-4 mr-2" />
              Export
            </Button>
          </div>
        </div>

        <div className="p-4 space-y-6">
          {/* Statistics */}
          <div className="grid grid-cols-2 gap-4">
            <Card className="shadow-medium border-0 bg-gradient-to-br from-blue-50 to-blue-100">
              <CardContent className="p-4 text-center">
                <div className="text-2xl font-bold text-blue-600 mb-1">{serviceHistory.length}</div>
                <div className="text-sm text-blue-700">Total Services</div>
              </CardContent>
            </Card>
            <Card className="shadow-medium border-0 bg-gradient-to-br from-green-50 to-green-100">
              <CardContent className="p-4 text-center">
                <div className="text-2xl font-bold text-green-600 mb-1">${customerData.totalSpent}</div>
                <div className="text-sm text-green-700">Total Spent</div>
              </CardContent>
            </Card>
          </div>

          {/* Service History List */}
          <div className="space-y-4">
            {serviceHistory.map((service) => (
              <Card key={service.id} className="shadow-medium border-0 hover-lift animate-slide-up">
                <CardContent className="p-4">
                  <div className="flex items-start justify-between mb-3">
                    <div className="flex items-center space-x-3">
                      <div className="w-12 h-12 bg-gradient-to-r from-green-500 to-blue-500 rounded-full flex items-center justify-center shadow-medium">
                        <CheckCircle className="h-6 w-6 text-white" />
                      </div>
                      <div>
                        <h3 className="font-semibold">{service.service}</h3>
                        <p className="text-sm text-muted-foreground">{service.car}</p>
                      </div>
                    </div>
                    <Badge className="bg-green-100 text-green-800">
                      {service.status}
                    </Badge>
                  </div>

                  <div className="grid grid-cols-2 gap-4 mb-4">
                    <div>
                      <div className="flex items-center space-x-2 text-sm text-muted-foreground mb-1">
                        <CalendarIcon className="h-4 w-4" />
                        <span>{service.date}</span>
                      </div>
                      <div className="flex items-center space-x-2 text-sm text-muted-foreground">
                        <User className="h-4 w-4" />
                        <span>{service.technician}</span>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="text-lg font-bold text-green-600">{service.amount}</p>
                      <div className="flex items-center justify-end space-x-1 mt-1">
                        {service.rating && renderStars(service.rating)}
                      </div>
                    </div>
                  </div>

                  {service.notes && (
                    <div className="p-3 bg-slate-50 rounded-lg mb-3">
                      <p className="text-sm text-slate-600">{service.notes}</p>
                    </div>
                  )}

                  <div className="flex justify-between items-center pt-3 border-t border-slate-100">
                    <div className="flex space-x-2">
                      <Button size="sm" variant="outline">
                        <Receipt className="h-4 w-4 mr-2" />
                        Invoice
                      </Button>
                      <Button size="sm" variant="outline">
                        <MessageSquare className="h-4 w-4 mr-2" />
                        Review
                      </Button>
                    </div>
                    <div className="flex items-center space-x-2 text-sm text-muted-foreground">
                      <MapPin className="h-4 w-4" />
                      <span>{service.location}</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>
    );
  }

  // Main Dashboard
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 animate-fade-in">
      {/* Enhanced Header */}
      <div className="glassmorphism sticky top-0 z-50 border-b border-white/20">
        <div className="flex items-center justify-between p-4">
          <div className="flex items-center space-x-4">
            <div className="relative">
              <Avatar className="h-12 w-12 border-2 border-white/30 shadow-lg">
                <AvatarFallback className="gradient-primary text-white font-semibold">
                  {customerData.name.split(' ').map(n => n[0]).join('')}
                </AvatarFallback>
              </Avatar>
              <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-green-500 rounded-full border-2 border-white animate-pulse"></div>
            </div>
            <div>
              <h1 className="font-bold text-lg">Welcome back, {customerData.name.split(' ')[0]}!</h1>
              <p className="text-sm text-muted-foreground">Your cars are in expert hands</p>
            </div>
          </div>
          <div className="flex items-center space-x-2">
            <div className="relative">
              <Button 
                variant="ghost" 
                size="lg" 
                className="hover:bg-white/20 transition-all duration-200 hover:scale-105"
              >
                <Bell className="h-6 w-6" />
              </Button>
              {activeNotifications > 0 && (
                <div className="absolute -top-1 -right-1 w-5 h-5 bg-red-500 rounded-full flex items-center justify-center animate-pulse">
                  <span className="text-white text-xs">{activeNotifications}</span>
                </div>
              )}
            </div>
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

      <div className="p-4 space-y-6">
        {/* Enhanced Quick Actions */}
        <div className="animate-slide-up">
          <h2 className="font-bold text-xl mb-4 bg-gradient-to-r from-slate-800 to-slate-600 bg-clip-text text-transparent">
            Quick Actions
          </h2>
          <div className="grid grid-cols-2 gap-4">
            <Card 
              className="cursor-pointer hover-lift border-0 animate-bounce-in group shadow-xl bg-gradient-to-br from-blue-50 to-blue-100 border border-blue-200/50"
              onClick={() => setCurrentPage('book-service')}
            >
              <CardContent className="p-4 text-center space-y-3">
                <div className="w-14 h-14 bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl flex items-center justify-center mx-auto shadow-2xl group-hover:animate-wiggle">
                  <CalendarIcon className="h-7 w-7 text-white" />
                </div>
                <div>
                  <h3 className="font-semibold">Book Service</h3>
                  <p className="text-xs text-muted-foreground">Schedule appointment</p>
                </div>
              </CardContent>
            </Card>

            <Card 
              className="cursor-pointer hover-lift border-0 animate-bounce-in group shadow-xl bg-gradient-to-br from-green-50 to-green-100 border border-green-200/50"
              style={{ animationDelay: '0.1s' }}
              onClick={() => setCurrentPage('new-quotation')}
            >
              <CardContent className="p-4 text-center space-y-3">
                <div className="w-14 h-14 bg-gradient-to-r from-green-600 to-blue-600 rounded-2xl flex items-center justify-center mx-auto shadow-2xl group-hover:animate-wiggle">
                  <FileText className="h-7 w-7 text-white" />
                </div>
                <div>
                  <h3 className="font-semibold">Get Quote</h3>
                  <p className="text-xs text-muted-foreground">Request estimate</p>
                </div>
              </CardContent>
            </Card>

            <Card 
              className="cursor-pointer hover-lift border-0 animate-bounce-in group shadow-xl bg-gradient-to-br from-orange-50 to-orange-100 border border-orange-200/50"
              style={{ animationDelay: '0.2s' }}
              onClick={() => setCurrentPage('service-history')}
            >
              <CardContent className="p-4 text-center space-y-3">
                <div className="w-14 h-14 bg-gradient-to-r from-orange-600 to-red-600 rounded-2xl flex items-center justify-center mx-auto shadow-2xl group-hover:animate-wiggle">
                  <History className="h-7 w-7 text-white" />
                </div>
                <div>
                  <h3 className="font-semibold">Service History</h3>
                  <p className="text-xs text-muted-foreground">View past services</p>
                </div>
              </CardContent>
            </Card>

            <Card 
              className="cursor-pointer hover-lift border-0 animate-bounce-in group shadow-xl bg-gradient-to-br from-purple-50 to-purple-100 border border-purple-200/50"
              style={{ animationDelay: '0.3s' }}
              onClick={() => alert('Contact options coming soon!')}
            >
              <CardContent className="p-4 text-center space-y-3">
                <div className="w-14 h-14 bg-gradient-to-r from-purple-600 to-pink-600 rounded-2xl flex items-center justify-center mx-auto shadow-2xl group-hover:animate-wiggle">
                  <Phone className="h-7 w-7 text-white" />
                </div>
                <div>
                  <h3 className="font-semibold">Contact Us</h3>
                  <p className="text-xs text-muted-foreground">Get in touch</p>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Enhanced Your Cars Section */}
        <Card className="shadow-2xl border-0 animate-slide-up bg-white/80 backdrop-blur-sm" style={{ animationDelay: '0.2s' }}>
          <CardHeader>
            <CardTitle className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <div className="w-10 h-10 gradient-primary rounded-xl flex items-center justify-center shadow-lg">
                  <Car className="h-5 w-5 text-white" />
                </div>
                <span className="text-xl">Your Vehicles</span>
              </div>
              <Button 
                size="sm" 
                variant="outline"
                onClick={() => setCurrentPage('car-management')}
                className="hover:bg-blue-50 shadow-sm"
              >
                <Edit3 className="h-4 w-4 mr-1" />
                Manage
              </Button>
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {customerData.cars.map((car) => {
              const wofStatus = getExpiryStatus(car.wofExpiry);
              const regoStatus = getExpiryStatus(car.regoExpiry);
              
              return (
                <div key={car.id} className="p-4 bg-gradient-to-r from-white to-slate-50 rounded-xl shadow-medium border border-slate-100 hover:shadow-lg transition-all duration-200">
                  <div className="flex items-center justify-between mb-3">
                    <div>
                      <h4 className="font-bold text-lg">{car.rego}</h4>
                      <p className="text-muted-foreground">{car.year} {car.make} {car.model}</p>
                      <p className="text-xs text-muted-foreground">{car.mileage.toLocaleString()} km</p>
                    </div>
                    <Button size="sm" variant="outline" className="hover:bg-blue-50">
                      View Details
                    </Button>
                  </div>
                  
                  <div className="grid grid-cols-2 gap-3">
                    <div className={`p-3 rounded-lg ${wofStatus.bg} border`}>
                      <div className="flex items-center space-x-2 mb-1">
                        <Shield className={`h-4 w-4 ${wofStatus.color}`} />
                        <span className="text-sm font-semibold">WOF</span>
                      </div>
                      <p className={`text-sm ${wofStatus.color}`}>{car.wofExpiry}</p>
                    </div>
                    
                    <div className={`p-3 rounded-lg ${regoStatus.bg} border`}>
                      <div className="flex items-center space-x-2 mb-1">
                        <Car className={`h-4 w-4 ${regoStatus.color}`} />
                        <span className="text-sm font-semibold">Rego</span>
                      </div>
                      <p className={`text-sm ${regoStatus.color}`}>{car.regoExpiry}</p>
                    </div>
                  </div>
                </div>
              );
            })}
          </CardContent>
        </Card>

        {/* Enhanced Upcoming Bookings */}
        <Card className="shadow-2xl border-0 animate-slide-up bg-white/80 backdrop-blur-sm" style={{ animationDelay: '0.3s' }}>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <div className="w-10 h-10 gradient-success rounded-xl flex items-center justify-center shadow-lg">
                <CalendarIcon className="h-5 w-5 text-white" />
              </div>
              <span className="text-xl">Upcoming Bookings</span>
              <Badge variant="secondary" className="bg-blue-100 text-blue-700">
                {customerData.upcomingBookings.length}
              </Badge>
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {customerData.upcomingBookings.length > 0 ? (
              customerData.upcomingBookings.map((booking) => (
                <div key={booking.id} className="p-4 bg-gradient-to-r from-white to-blue-50 rounded-xl shadow-medium border border-blue-100">
                  <div className="flex items-center justify-between mb-3">
                    <h4 className="font-bold text-lg">{booking.service}</h4>
                    <Badge variant={booking.status === 'confirmed' ? 'default' : 'secondary'} className="shadow-sm">
                      {booking.status}
                    </Badge>
                  </div>
                  <div className="space-y-2 text-sm text-muted-foreground">
                    <div className="flex items-center space-x-2">
                      <Clock className="h-4 w-4" />
                      <span>{booking.date} at {booking.time}</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Car className="h-4 w-4" />
                      <span>{booking.car}</span>
                    </div>
                    {booking.technician && (
                      <div className="flex items-center space-x-2">
                        <User className="h-4 w-4" />
                        <span>{booking.technician} • {booking.location}</span>
                      </div>
                    )}
                  </div>
                  <div className="flex justify-between items-center mt-4 pt-3 border-t border-slate-100">
                    <p className="font-bold text-green-600">${booking.estimatedCost}</p>
                    <div className="flex space-x-2">
                      <Button size="sm" variant="outline">Reschedule</Button>
                      <Button size="sm" variant="outline">Cancel</Button>
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <div className="text-center py-8 text-muted-foreground">
                <CalendarIcon className="h-16 w-16 mx-auto mb-4 opacity-50" />
                <h3 className="text-lg font-medium mb-2">No upcoming bookings</h3>
                <p className="mb-4">Ready to schedule your next service?</p>
                <Button onClick={() => setCurrentPage('book-service')} className="shadow-lg">
                  Book Service Now
                </Button>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Enhanced Loyalty Program */}
        <Card className="shadow-2xl border-0 animate-slide-up bg-gradient-to-br from-purple-50 to-pink-50 border border-purple-200/50" style={{ animationDelay: '0.5s' }}>
          <CardContent className="p-6">
            <div className="flex items-center space-x-4">
              <div className="w-16 h-16 gradient-secondary rounded-2xl flex items-center justify-center shadow-2xl">
                <Award className="h-8 w-8 text-white" />
              </div>
              <div className="flex-1">
                <h4 className="font-bold text-xl mb-1">Loyalty Rewards</h4>
                <p className="text-muted-foreground mb-2">You have {customerData.loyaltyPoints} points</p>
                <Progress value={(customerData.loyaltyPoints / 1000) * 100} className="h-3 mb-2" />
                <p className="text-sm text-muted-foreground">
                  {1000 - customerData.loyaltyPoints} more points for your next reward!
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}