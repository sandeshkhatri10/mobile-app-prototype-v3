import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Textarea } from './ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { Calendar } from './ui/calendar';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from './ui/dialog';
import { 
  ArrowLeft,
  Calendar as CalendarIcon,
  Clock,
  User,
  Car,
  Phone,
  MapPin,
  AlertTriangle,
  CheckCircle,
  XCircle,
  Edit,
  Plus,
  Search,
  Filter,
  MoreVertical,
  RefreshCw,
  FileText,
  DollarSign,
  MessageSquare,
  Star,
  Wrench,
  Zap,
  Shield,
  Activity,
  Send,
  Bell,
  Users,
  BarChart3,
  TrendingUp,
  Mail,
  Smartphone,
  Calendar as CalendarViewIcon,
  Grid3X3,
  List
} from 'lucide-react';

interface BookingsPageProps {
  onBack: () => void;
}

type BookingStatus = 'pending' | 'confirmed' | 'in-progress' | 'completed' | 'cancelled';
type ServiceType = 'wof' | 'service' | 'repair' | 'diagnostic' | 'maintenance';
type ViewMode = 'daily' | 'weekly' | 'monthly';

interface Customer {
  id: string;
  name: string;
  phone: string;
  email: string;
  vehicles: Vehicle[];
}

interface Vehicle {
  id: string;
  rego: string;
  make: string;
  model: string;
  year: number;
  customerId: string;
}

interface Mechanic {
  id: string;
  name: string;
  specialties: string[];
  currentWorkload: number; // number of active jobs
  maxCapacity: number;
  shift: string;
}

interface Booking {
  id: string;
  customerId: string;
  customerName: string;
  customerPhone: string;
  customerEmail: string;
  vehicleId: string;
  vehicleRego: string;
  vehicleMake: string;
  vehicleModel: string;
  vehicleYear: number;
  serviceType: ServiceType;
  serviceName: string;
  scheduledDate: string;
  scheduledTime: string;
  duration: number; // in minutes
  status: BookingStatus;
  priority: 'low' | 'medium' | 'high';
  estimatedCost: number;
  actualCost?: number;
  notes: string;
  createdAt: string;
  updatedAt: string;
  assignedMechanicId?: string;
  assignedMechanicName?: string;
  location: string;
  startTime?: string;
  endTime?: string;
  cancellationReason?: string;
}

export function BookingsPage({ onBack }: BookingsPageProps) {
  const [viewMode, setViewMode] = useState<ViewMode>('daily');
  const [selectedDate, setSelectedDate] = useState<Date>(new Date());
  const [searchQuery, setSearchQuery] = useState('');
  const [showNewBookingDialog, setShowNewBookingDialog] = useState(false);
  const [showNewCustomerDialog, setShowNewCustomerDialog] = useState(false);
  const [selectedBooking, setSelectedBooking] = useState<Booking | null>(null);
  const [showBookingDetails, setShowBookingDetails] = useState(false);
  const [viewType, setViewType] = useState<'list' | 'calendar'>('list');

  // Mock data
  const [customers, setCustomers] = useState<Customer[]>([
    {
      id: '1',
      name: 'John Smith',
      phone: '+64 21 123 4567',
      email: 'john@email.com',
      vehicles: [
        { id: '1', rego: 'ABC123', make: 'Toyota', model: 'Camry', year: 2020, customerId: '1' }
      ]
    },
    {
      id: '2',
      name: 'Sarah Wilson',
      phone: '+64 21 234 5678',
      email: 'sarah@email.com',
      vehicles: [
        { id: '2', rego: 'XYZ789', make: 'Honda', model: 'Civic', year: 2018, customerId: '2' }
      ]
    }
  ]);

  const [mechanics, setMechanics] = useState<Mechanic[]>([
    {
      id: 'MECH001',
      name: 'Mike Johnson',
      specialties: ['Engine Repair', 'Electrical', 'Brake Systems'],
      currentWorkload: 3,
      maxCapacity: 5,
      shift: '8:00 AM - 5:00 PM'
    },
    {
      id: 'MECH002',
      name: 'Dave Smith',
      specialties: ['WOF Inspections', 'General Service', 'Suspension'],
      currentWorkload: 2,
      maxCapacity: 4,
      shift: '9:00 AM - 6:00 PM'
    },
    {
      id: 'MECH003',
      name: 'Tom Wilson',
      specialties: ['Transmission', 'Engine Rebuild', 'Diagnostics'],
      currentWorkload: 1,
      maxCapacity: 3,
      shift: '7:00 AM - 4:00 PM'
    }
  ]);

  // Enhanced mock bookings data
  const [bookings, setBookings] = useState<Booking[]>([
    {
      id: '1',
      customerId: '1',
      customerName: 'John Smith',
      customerPhone: '+64 21 123 4567',
      customerEmail: 'john@email.com',
      vehicleId: '1',
      vehicleRego: 'ABC123',
      vehicleMake: 'Toyota',
      vehicleModel: 'Camry',
      vehicleYear: 2020,
      serviceType: 'wof',
      serviceName: 'WOF Inspection',
      scheduledDate: new Date().toISOString().split('T')[0],
      scheduledTime: '09:00',
      duration: 30,
      status: 'confirmed',
      priority: 'high',
      estimatedCost: 65,
      notes: 'Customer mentioned brake noise',
      createdAt: '2024-02-20',
      updatedAt: '2024-02-20',
      assignedMechanicId: 'MECH002',
      assignedMechanicName: 'Dave Smith',
      location: 'Bay 1'
    },
    {
      id: '2',
      customerId: '2',
      customerName: 'Sarah Wilson',
      customerPhone: '+64 21 234 5678',
      customerEmail: 'sarah@email.com',
      vehicleId: '2',
      vehicleRego: 'XYZ789',
      vehicleMake: 'Honda',
      vehicleModel: 'Civic',
      vehicleYear: 2018,
      serviceType: 'service',
      serviceName: 'Full Service',
      scheduledDate: new Date().toISOString().split('T')[0],
      scheduledTime: '10:30',
      duration: 90,
      status: 'in-progress',
      priority: 'medium',
      estimatedCost: 320,
      actualCost: 295,
      notes: 'Regular customer, prefers early morning slots',
      createdAt: '2024-02-18',
      updatedAt: '2024-02-21',
      assignedMechanicId: 'MECH001',
      assignedMechanicName: 'Mike Johnson',
      location: 'Bay 2',
      startTime: '10:35'
    },
    {
      id: '3',
      customerId: '1',
      customerName: 'John Smith',
      customerPhone: '+64 21 123 4567',
      customerEmail: 'john@email.com',
      vehicleId: '1',
      vehicleRego: 'ABC123',
      vehicleMake: 'Toyota',
      vehicleModel: 'Camry',
      vehicleYear: 2020,
      serviceType: 'repair',
      serviceName: 'Brake Repair',
      scheduledDate: new Date().toISOString().split('T')[0],
      scheduledTime: '14:00',
      duration: 120,
      status: 'pending',
      priority: 'high',
      estimatedCost: 450,
      notes: 'Urgent brake repair needed',
      createdAt: '2024-02-21',
      updatedAt: '2024-02-21',
      location: 'TBD'
    },
    {
      id: '4',
      customerId: '2',
      customerName: 'Sarah Wilson',
      customerPhone: '+64 21 234 5678',
      customerEmail: 'sarah@email.com',
      vehicleId: '2',
      vehicleRego: 'XYZ789',
      vehicleMake: 'Honda',
      vehicleModel: 'Civic',
      vehicleYear: 2018,
      serviceType: 'service',
      serviceName: 'Oil Change',
      scheduledDate: new Date(Date.now() - 86400000).toISOString().split('T')[0], // Yesterday
      scheduledTime: '08:00',
      duration: 45,
      status: 'completed',
      priority: 'low',
      estimatedCost: 85,
      actualCost: 85,
      notes: 'Standard oil change completed',
      createdAt: '2024-02-19',
      updatedAt: '2024-02-20',
      assignedMechanicId: 'MECH003',
      assignedMechanicName: 'Tom Wilson',
      location: 'Bay 3',
      startTime: '08:05',
      endTime: '08:50'
    },
    {
      id: '5',
      customerId: '1',
      customerName: 'Mike Thompson',
      customerPhone: '+64 21 987 6543',
      customerEmail: 'mike@email.com',
      vehicleId: '3',
      vehicleRego: 'DEF456',
      vehicleMake: 'Ford',
      vehicleModel: 'Ranger',
      vehicleYear: 2019,
      serviceType: 'diagnostic',
      serviceName: 'Engine Diagnostic',
      scheduledDate: new Date().toISOString().split('T')[0],
      scheduledTime: '11:30',
      duration: 60,
      status: 'pending',
      priority: 'medium',
      estimatedCost: 150,
      notes: 'Engine warning light on',
      createdAt: '2024-02-21',
      updatedAt: '2024-02-21',
      location: 'TBD'
    },
    {
      id: '6',
      customerId: '2',
      customerName: 'Lisa Brown',
      customerPhone: '+64 21 555 1234',
      customerEmail: 'lisa@email.com',
      vehicleId: '4',
      vehicleRego: 'GHI789',
      vehicleMake: 'Mazda',
      vehicleModel: 'CX-5',
      vehicleYear: 2021,
      serviceType: 'maintenance',
      serviceName: 'Tire Rotation',
      scheduledDate: new Date(Date.now() - 86400000).toISOString().split('T')[0], // Yesterday
      scheduledTime: '15:30',
      duration: 30,
      status: 'completed',
      priority: 'low',
      estimatedCost: 60,
      actualCost: 60,
      notes: 'Tire rotation and pressure check',
      createdAt: '2024-02-19',
      updatedAt: '2024-02-20',
      assignedMechanicId: 'MECH002',
      assignedMechanicName: 'Dave Smith',
      location: 'Bay 1',
      startTime: '15:35',
      endTime: '16:00'
    }
  ]);

  // New booking form state
  const [newBookingData, setNewBookingData] = useState({
    customerId: '',
    vehicleId: '',
    serviceType: '',
    serviceName: '',
    scheduledDate: '',
    scheduledTime: '',
    duration: 60,
    priority: 'medium',
    notes: '',
    assignedMechanicId: '',
    estimatedCost: 0
  });

  const getStatusIcon = (status: BookingStatus) => {
    switch (status) {
      case 'pending': return <Clock className="h-4 w-4" />;
      case 'confirmed': return <CheckCircle className="h-4 w-4" />;
      case 'in-progress': return <Activity className="h-4 w-4" />;
      case 'completed': return <CheckCircle className="h-4 w-4" />;
      case 'cancelled': return <XCircle className="h-4 w-4" />;
    }
  };

  const getStatusColor = (status: BookingStatus) => {
    switch (status) {
      case 'pending': return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 'confirmed': return 'bg-blue-100 text-blue-800 border-blue-200';
      case 'in-progress': return 'bg-green-100 text-green-800 border-green-200';
      case 'completed': return 'bg-emerald-100 text-emerald-800 border-emerald-200';
      case 'cancelled': return 'bg-red-100 text-red-800 border-red-200';
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high': return 'bg-red-500';
      case 'medium': return 'bg-orange-500';
      case 'low': return 'bg-green-500';
      default: return 'bg-gray-500';
    }
  };

  const getServiceIcon = (type: ServiceType) => {
    switch (type) {
      case 'wof': return <Shield className="h-4 w-4" />;
      case 'service': return <Wrench className="h-4 w-4" />;
      case 'repair': return <AlertTriangle className="h-4 w-4" />;
      case 'diagnostic': return <Zap className="h-4 w-4" />;
      case 'maintenance': return <RefreshCw className="h-4 w-4" />;
    }
  };

  const updateBookingStatus = (bookingId: string, newStatus: BookingStatus, reason?: string) => {
    setBookings(prev => prev.map(booking => 
      booking.id === bookingId 
        ? { 
            ...booking, 
            status: newStatus, 
            updatedAt: new Date().toISOString().split('T')[0],
            ...(reason && { cancellationReason: reason })
          }
        : booking
    ));
  };

  const assignMechanic = (bookingId: string, mechanicId: string) => {
    const mechanic = mechanics.find(m => m.id === mechanicId);
    setBookings(prev => prev.map(booking => 
      booking.id === bookingId 
        ? { 
            ...booking, 
            assignedMechanicId: mechanicId,
            assignedMechanicName: mechanic?.name || '',
            updatedAt: new Date().toISOString().split('T')[0]
          }
        : booking
    ));
  };

  const sendNotification = (bookingId: string, type: 'confirmation' | 'reminder' | 'completion') => {
    // Mock notification sending
    alert(`${type.charAt(0).toUpperCase() + type.slice(1)} notification sent successfully!`);
  };

  const filteredBookings = bookings.filter(booking => {
    const matchesSearch = booking.customerName.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         booking.vehicleRego.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         booking.serviceName.toLowerCase().includes(searchQuery.toLowerCase());
    
    // Date filtering based on view mode
    const bookingDate = new Date(booking.scheduledDate);
    const selectedDateObj = selectedDate;
    
    let matchesDate = false;
    if (viewMode === 'daily') {
      matchesDate = booking.scheduledDate === selectedDateObj.toISOString().split('T')[0];
    } else if (viewMode === 'weekly') {
      const weekStart = new Date(selectedDateObj);
      weekStart.setDate(selectedDateObj.getDate() - selectedDateObj.getDay());
      const weekEnd = new Date(weekStart);
      weekEnd.setDate(weekStart.getDate() + 6);
      matchesDate = bookingDate >= weekStart && bookingDate <= weekEnd;
    } else { // monthly
      matchesDate = bookingDate.getMonth() === selectedDateObj.getMonth() && 
                   bookingDate.getFullYear() === selectedDateObj.getFullYear();
    }
    
    return matchesSearch && matchesDate;
  });

  const todayStats = {
    total: filteredBookings.length,
    pending: filteredBookings.filter(b => b.status === 'pending').length,
    confirmed: filteredBookings.filter(b => b.status === 'confirmed').length,
    inProgress: filteredBookings.filter(b => b.status === 'in-progress').length,
    completed: filteredBookings.filter(b => b.status === 'completed').length,
    cancelled: filteredBookings.filter(b => b.status === 'cancelled').length,
    revenue: filteredBookings.filter(b => b.actualCost).reduce((sum, b) => sum + (b.actualCost || 0), 0)
  };

  const createNewBooking = () => {
    const newBooking: Booking = {
      id: (bookings.length + 1).toString(),
      ...newBookingData,
      customerName: customers.find(c => c.id === newBookingData.customerId)?.name || '',
      customerPhone: customers.find(c => c.id === newBookingData.customerId)?.phone || '',
      customerEmail: customers.find(c => c.id === newBookingData.customerId)?.email || '',
      vehicleRego: customers.find(c => c.id === newBookingData.customerId)?.vehicles.find(v => v.id === newBookingData.vehicleId)?.rego || '',
      vehicleMake: customers.find(c => c.id === newBookingData.customerId)?.vehicles.find(v => v.id === newBookingData.vehicleId)?.make || '',
      vehicleModel: customers.find(c => c.id === newBookingData.customerId)?.vehicles.find(v => v.id === newBookingData.vehicleId)?.model || '',
      vehicleYear: customers.find(c => c.id === newBookingData.customerId)?.vehicles.find(v => v.id === newBookingData.vehicleId)?.year || 0,
      status: 'pending',
      createdAt: new Date().toISOString().split('T')[0],
      updatedAt: new Date().toISOString().split('T')[0],
      assignedMechanicName: mechanics.find(m => m.id === newBookingData.assignedMechanicId)?.name || '',
      location: 'TBD'
    } as Booking;

    setBookings(prev => [...prev, newBooking]);
    setShowNewBookingDialog(false);
    
    // Reset form
    setNewBookingData({
      customerId: '',
      vehicleId: '',
      serviceType: '',
      serviceName: '',
      scheduledDate: '',
      scheduledTime: '',
      duration: 60,
      priority: 'medium',
      notes: '',
      assignedMechanicId: '',
      estimatedCost: 0
    });
  };

  const renderBookingsList = (bookingsToRender: Booking[]) => {
    if (bookingsToRender.length === 0) {
      return (
        <Card className="shadow-medium border-0">
          <CardContent className="p-8 text-center">
            <CalendarIcon className="h-16 w-16 mx-auto mb-4 text-muted-foreground opacity-50" />
            <h3 className="text-lg font-medium mb-2">No bookings found</h3>
            <p className="text-muted-foreground">
              {searchQuery 
                ? 'Try adjusting your search query'
                : 'No bookings found for the selected period'
              }
            </p>
          </CardContent>
        </Card>
      );
    }

    return (
      <div className="space-y-4">
        {bookingsToRender
          .sort((a, b) => a.scheduledTime.localeCompare(b.scheduledTime))
          .map((booking) => (
            <Card 
              key={booking.id} 
              className="shadow-medium border-0 hover-lift cursor-pointer animate-bounce-in bg-white/80 backdrop-blur-sm"
              onClick={() => {
                setSelectedBooking(booking);
                setShowBookingDetails(true);
              }}
            >
              <CardContent className="p-4">
                <div className="flex items-start justify-between mb-3">
                  <div className="flex items-center space-x-3">
                    <div className="relative">
                      <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full flex items-center justify-center shadow-medium">
                        {getServiceIcon(booking.serviceType)}
                        <span className="text-white"></span>
                      </div>
                      <div className={`absolute -top-1 -right-1 w-4 h-4 ${getPriorityColor(booking.priority)} rounded-full border-2 border-white`}></div>
                    </div>
                    <div>
                      <h3 className="font-semibold text-lg">{booking.customerName}</h3>
                      <p className="text-sm text-muted-foreground flex items-center">
                        <Car className="h-4 w-4 mr-1" />
                        {booking.vehicleRego} - {booking.vehicleMake} {booking.vehicleModel}
                      </p>
                      <p className="text-xs text-muted-foreground">{booking.serviceName}</p>
                    </div>
                  </div>
                  <Badge className={`${getStatusColor(booking.status)} flex items-center space-x-1`}>
                    {getStatusIcon(booking.status)}
                    <span className="capitalize">{booking.status.replace('-', ' ')}</span>
                  </Badge>
                </div>

                <div className="grid grid-cols-2 gap-4 mb-4">
                  <div>
                    <p className="text-sm font-medium text-slate-700">Scheduled</p>
                    <p className="text-xs text-muted-foreground flex items-center mt-1">
                      <Clock className="h-3 w-3 mr-1" />
                      {booking.scheduledTime} ({booking.duration}min)
                    </p>
                  </div>
                  <div className="text-right">
                    <p className="text-lg font-bold text-green-600">
                      ${booking.actualCost || booking.estimatedCost}
                    </p>
                    <p className="text-xs text-muted-foreground">
                      {booking.actualCost ? 'Final' : 'Estimated'}
                    </p>
                  </div>
                </div>

                {booking.assignedMechanicName && (
                  <div className="flex items-center justify-between text-sm mb-3">
                    <div className="flex items-center space-x-2 text-muted-foreground">
                      <User className="h-4 w-4" />
                      <span>{booking.assignedMechanicName}</span>
                    </div>
                    <div className="flex items-center space-x-2 text-muted-foreground">
                      <MapPin className="h-4 w-4" />
                      <span>{booking.location}</span>
                    </div>
                  </div>
                )}

                {booking.notes && (
                  <div className="mb-3 p-2 bg-slate-50 rounded-lg">
                    <p className="text-xs text-slate-600">
                      <MessageSquare className="h-3 w-3 inline mr-1" />
                      {booking.notes}
                    </p>
                  </div>
                )}

                <div className="flex justify-between items-center pt-3 border-t border-slate-100">
                  <div className="flex space-x-2">
                    <Button size="sm" variant="outline" onClick={(e) => {
                      e.stopPropagation();
                      // Edit booking functionality
                    }}>
                      <Edit className="h-4 w-4 mr-1" />
                      Edit
                    </Button>
                    
                    {booking.status === 'pending' && (
                      <Button 
                        size="sm" 
                        onClick={(e) => {
                          e.stopPropagation();
                          updateBookingStatus(booking.id, 'confirmed');
                        }}
                        className="bg-blue-500 hover:bg-blue-600"
                      >
                        Confirm
                      </Button>
                    )}
                    
                    {(booking.status === 'pending' || booking.status === 'confirmed') && (
                      <Button 
                        size="sm" 
                        variant="outline"
                        onClick={(e) => {
                          e.stopPropagation();
                          const reason = prompt('Cancellation reason:');
                          if (reason) updateBookingStatus(booking.id, 'cancelled', reason);
                        }}
                        className="text-red-600 hover:bg-red-50"
                      >
                        Cancel
                      </Button>
                    )}
                  </div>
                  
                  <div className="flex space-x-1">
                    <Button 
                      variant="ghost" 
                      size="sm"
                      onClick={(e) => {
                        e.stopPropagation();
                        sendNotification(booking.id, 'confirmation');
                      }}
                    >
                      <Send className="h-4 w-4" />
                    </Button>
                    <Button 
                      variant="ghost" 
                      size="sm"
                      onClick={(e) => {
                        e.stopPropagation();
                        alert(`Calling ${booking.customerPhone}`);
                      }}
                    >
                      <Phone className="h-4 w-4" />
                    </Button>
                    <Button variant="ghost" size="sm">
                      <FileText className="h-4 w-4" />
                    </Button>
                    <Button variant="ghost" size="sm">
                      <MoreVertical className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50">
      {/* Enhanced Header */}
      <div className="glassmorphism sticky top-0 z-50 border-b border-white/20">
        <div className="flex items-center justify-between p-4">
          <div className="flex items-center space-x-4">
            <Button 
              variant="ghost" 
              size="lg" 
              onClick={onBack}
              className="hover:bg-white/20 transition-all duration-200 hover:scale-105"
            >
              <ArrowLeft className="h-6 w-6" />
            </Button>
            <div>
              <h1 className="text-xl font-bold bg-gradient-to-r from-slate-800 to-slate-600 bg-clip-text text-transparent">
                Manager Booking System
              </h1>
              <p className="text-sm text-muted-foreground">Comprehensive booking management & scheduling</p>
            </div>
          </div>
          <div className="flex items-center space-x-2">
            <Button variant="outline" size="sm" className="hover:bg-blue-50">
              <BarChart3 className="h-4 w-4 mr-2" />
              Reports
            </Button>
            <Dialog open={showNewBookingDialog} onOpenChange={setShowNewBookingDialog}>
              <DialogTrigger asChild>
                <Button className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 shadow-lg hover:shadow-xl transition-all duration-200 hover:scale-105">
                  <Plus className="h-4 w-4 mr-2" />
                  New Booking
                </Button>
              </DialogTrigger>
              <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
                <DialogHeader>
                  <DialogTitle>Create New Booking</DialogTitle>
                </DialogHeader>
                <div className="grid gap-6 py-4">
                  {/* Customer Selection */}
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label>Customer</Label>
                      <div className="flex space-x-2">
                        <Select 
                          value={newBookingData.customerId} 
                          onValueChange={(value) => setNewBookingData(prev => ({ ...prev, customerId: value, vehicleId: '' }))}
                        >
                          <SelectTrigger className="flex-1">
                            <SelectValue placeholder="Select customer" />
                          </SelectTrigger>
                          <SelectContent>
                            {customers.map(customer => (
                              <SelectItem key={customer.id} value={customer.id}>
                                {customer.name} • {customer.phone}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                        <Button 
                          variant="outline" 
                          onClick={() => setShowNewCustomerDialog(true)}
                          className="px-3"
                        >
                          <Plus className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                    
                    <div className="space-y-2">
                      <Label>Vehicle</Label>
                      <Select 
                        value={newBookingData.vehicleId} 
                        onValueChange={(value) => setNewBookingData(prev => ({ ...prev, vehicleId: value }))}
                        disabled={!newBookingData.customerId}
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Select vehicle" />
                        </SelectTrigger>
                        <SelectContent>
                          {customers.find(c => c.id === newBookingData.customerId)?.vehicles.map(vehicle => (
                            <SelectItem key={vehicle.id} value={vehicle.id}>
                              {vehicle.rego} - {vehicle.make} {vehicle.model} ({vehicle.year})
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                  </div>

                  {/* Service Details */}
                  <div className="grid grid-cols-3 gap-4">
                    <div className="space-y-2">
                      <Label>Service Type</Label>
                      <Select 
                        value={newBookingData.serviceType} 
                        onValueChange={(value) => setNewBookingData(prev => ({ ...prev, serviceType: value }))}
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Select service" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="wof">WOF Inspection</SelectItem>
                          <SelectItem value="service">Full Service</SelectItem>
                          <SelectItem value="repair">Repair</SelectItem>
                          <SelectItem value="diagnostic">Diagnostic</SelectItem>
                          <SelectItem value="maintenance">Maintenance</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    
                    <div className="space-y-2">
                      <Label>Service Name</Label>
                      <Input 
                        placeholder="e.g., Brake Repair"
                        value={newBookingData.serviceName}
                        onChange={(e) => setNewBookingData(prev => ({ ...prev, serviceName: e.target.value }))}
                      />
                    </div>
                    
                    <div className="space-y-2">
                      <Label>Priority</Label>
                      <Select 
                        value={newBookingData.priority} 
                        onValueChange={(value) => setNewBookingData(prev => ({ ...prev, priority: value }))}
                      >
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="low">Low</SelectItem>
                          <SelectItem value="medium">Medium</SelectItem>
                          <SelectItem value="high">High</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>

                  {/* Scheduling */}
                  <div className="grid grid-cols-3 gap-4">
                    <div className="space-y-2">
                      <Label>Date</Label>
                      <Input 
                        type="date" 
                        value={newBookingData.scheduledDate}
                        onChange={(e) => setNewBookingData(prev => ({ ...prev, scheduledDate: e.target.value }))}
                      />
                    </div>
                    
                    <div className="space-y-2">
                      <Label>Time</Label>
                      <Input 
                        type="time" 
                        value={newBookingData.scheduledTime}
                        onChange={(e) => setNewBookingData(prev => ({ ...prev, scheduledTime: e.target.value }))}
                      />
                    </div>
                    
                    <div className="space-y-2">
                      <Label>Duration (minutes)</Label>
                      <Input 
                        type="number" 
                        value={newBookingData.duration}
                        onChange={(e) => setNewBookingData(prev => ({ ...prev, duration: parseInt(e.target.value) }))}
                      />
                    </div>
                  </div>

                  {/* Assignment & Cost */}
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label>Assign Mechanic (Optional)</Label>
                      <Select 
                        value={newBookingData.assignedMechanicId} 
                        onValueChange={(value) => setNewBookingData(prev => ({ ...prev, assignedMechanicId: value }))}
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Select mechanic" />
                        </SelectTrigger>
                        <SelectContent>
                          {mechanics.map(mechanic => (
                            <SelectItem key={mechanic.id} value={mechanic.id}>
                              {mechanic.name} ({mechanic.currentWorkload}/{mechanic.maxCapacity} jobs)
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                    
                    <div className="space-y-2">
                      <Label>Estimated Cost ($)</Label>
                      <Input 
                        type="number" 
                        value={newBookingData.estimatedCost}
                        onChange={(e) => setNewBookingData(prev => ({ ...prev, estimatedCost: parseFloat(e.target.value) }))}
                      />
                    </div>
                  </div>

                  {/* Notes */}
                  <div className="space-y-2">
                    <Label>Notes</Label>
                    <Textarea 
                      placeholder="Additional notes or customer requests..."
                      value={newBookingData.notes}
                      onChange={(e) => setNewBookingData(prev => ({ ...prev, notes: e.target.value }))}
                    />
                  </div>

                  <div className="flex justify-end space-x-2 pt-4 border-t">
                    <Button variant="outline" onClick={() => setShowNewBookingDialog(false)}>
                      Cancel
                    </Button>
                    <Button onClick={createNewBooking} className="bg-blue-600 hover:bg-blue-700">
                      Create Booking
                    </Button>
                  </div>
                </div>
              </DialogContent>
            </Dialog>
          </div>
        </div>
      </div>

      <div className="p-4 space-y-6">

        {/* Enhanced Filters and Controls */}
        <Card className="shadow-medium border-0 animate-slide-up" style={{ animationDelay: '0.1s' }}>
          <CardContent className="p-4 space-y-4">
            {/* View Mode Selection */}
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-4">
                <Tabs value={viewMode} onValueChange={(value) => setViewMode(value as ViewMode)}>
                  <TabsList className="bg-slate-100/50">
                    <TabsTrigger value="daily" className="data-[state=active]:bg-white">Daily</TabsTrigger>
                    <TabsTrigger value="weekly" className="data-[state=active]:bg-white">Weekly</TabsTrigger>
                    <TabsTrigger value="monthly" className="data-[state=active]:bg-white">Monthly</TabsTrigger>
                  </TabsList>
                </Tabs>
              </div>
              
              <div className="flex items-center space-x-2">
                <Button 
                  variant={viewType === 'list' ? 'default' : 'outline'} 
                  size="sm"
                  onClick={() => setViewType('list')}
                >
                  <List className="h-4 w-4" />
                </Button>
                <Button 
                  variant={viewType === 'calendar' ? 'default' : 'outline'} 
                  size="sm"
                  onClick={() => setViewType('calendar')}
                >
                  <Grid3X3 className="h-4 w-4" />
                </Button>
              </div>
            </div>

            {/* Search Only */}
            <div className="max-w-md">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search bookings..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10"
                />
              </div>
            </div>
            
            <div className="flex items-center justify-between pt-2 border-t border-slate-100">
              <div className="flex items-center space-x-2">
                <CalendarIcon className="h-4 w-4 text-muted-foreground" />
                <span className="text-sm font-medium">
                  {selectedDate.toLocaleDateString('en-NZ', { 
                    weekday: 'long', 
                    year: 'numeric', 
                    month: 'long', 
                    day: 'numeric' 
                  })}
                </span>
              </div>
              <div className="flex items-center space-x-2">
                <Button variant="outline" size="sm">
                  <CalendarViewIcon className="h-4 w-4 mr-2" />
                  Pick Date
                </Button>
                <Button variant="outline" size="sm">
                  <Users className="h-4 w-4 mr-2" />
                  Mechanic Workload
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Status-Based Booking Sections */}
        <Tabs defaultValue="all" className="space-y-4 animate-slide-up" style={{ animationDelay: '0.2s' }}>
          <div className="overflow-x-auto">
            <TabsList className="inline-flex h-10 items-center justify-center rounded-md bg-white/70 backdrop-blur-sm p-1 text-muted-foreground min-w-full md:w-full">
              <TabsTrigger value="all" className="data-[state=active]:bg-blue-100 whitespace-nowrap px-3 py-1.5 text-sm">
                All ({filteredBookings.length})
              </TabsTrigger>
              <TabsTrigger value="pending" className="data-[state=active]:bg-yellow-100 whitespace-nowrap px-3 py-1.5 text-sm">
                Pending ({filteredBookings.filter(b => b.status === 'pending').length})
              </TabsTrigger>
              <TabsTrigger value="confirmed" className="data-[state=active]:bg-blue-100 whitespace-nowrap px-3 py-1.5 text-sm">
                Confirmed ({filteredBookings.filter(b => b.status === 'confirmed').length})
              </TabsTrigger>
              <TabsTrigger value="in-progress" className="data-[state=active]:bg-green-100 whitespace-nowrap px-3 py-1.5 text-sm">
                In Progress ({filteredBookings.filter(b => b.status === 'in-progress').length})
              </TabsTrigger>
              <TabsTrigger value="completed" className="data-[state=active]:bg-emerald-100 whitespace-nowrap px-3 py-1.5 text-sm">
                Completed ({filteredBookings.filter(b => b.status === 'completed').length})
              </TabsTrigger>
              <TabsTrigger value="cancelled" className="data-[state=active]:bg-red-100 whitespace-nowrap px-3 py-1.5 text-sm">
                Cancelled ({filteredBookings.filter(b => b.status === 'cancelled').length})
              </TabsTrigger>
            </TabsList>
          </div>

          {/* All Bookings */}
          <TabsContent value="all" className="space-y-4">
            <Card className="shadow-medium border-0 bg-gradient-to-r from-blue-50 to-indigo-50">
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="text-lg font-semibold text-slate-800">All Bookings Overview</h3>
                    <p className="text-sm text-slate-600">Complete view of today's schedule and activities</p>
                  </div>
                  <div className="flex space-x-4 text-sm">
                    <div className="text-center">
                      <div className="text-xl font-bold text-blue-600">${todayStats.revenue}</div>
                      <div className="text-slate-600">Revenue</div>
                    </div>
                    <div className="text-center">
                      <div className="text-xl font-bold text-slate-700">{mechanics.filter(m => m.currentWorkload > 0).length}</div>
                      <div className="text-slate-600">Active Mechanics</div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
            {renderBookingsList(filteredBookings)}
          </TabsContent>

          {/* Pending Bookings */}
          <TabsContent value="pending" className="space-y-4">
            <Card className="shadow-medium border-0 bg-gradient-to-r from-yellow-50 to-orange-50">
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="text-lg font-semibold text-slate-800">Pending Confirmations</h3>
                    <p className="text-sm text-slate-600">Bookings awaiting confirmation and mechanic assignment</p>
                  </div>
                  <div className="flex space-x-2">
                    <Button size="sm" variant="outline" className="bg-yellow-100 border-yellow-200">
                      <CheckCircle className="h-4 w-4 mr-2" />
                      Confirm All
                    </Button>
                    <Button size="sm" variant="outline" className="bg-blue-100 border-blue-200">
                      <User className="h-4 w-4 mr-2" />
                      Auto-Assign
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
            {renderBookingsList(filteredBookings.filter(b => b.status === 'pending'))}
          </TabsContent>

          {/* Confirmed Bookings */}
          <TabsContent value="confirmed" className="space-y-4">
            <Card className="shadow-medium border-0 bg-gradient-to-r from-blue-50 to-purple-50">
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="text-lg font-semibold text-slate-800">Confirmed & Ready</h3>
                    <p className="text-sm text-slate-600">Scheduled bookings ready to begin work</p>
                  </div>
                  <div className="flex space-x-2">
                    <Button size="sm" variant="outline" className="bg-blue-100 border-blue-200">
                      <Bell className="h-4 w-4 mr-2" />
                      Send Reminders
                    </Button>
                    <Button size="sm" variant="outline" className="bg-green-100 border-green-200">
                      <Activity className="h-4 w-4 mr-2" />
                      Start Next
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
            {renderBookingsList(filteredBookings.filter(b => b.status === 'confirmed'))}
          </TabsContent>

          {/* In Progress Bookings */}
          <TabsContent value="in-progress" className="space-y-4">
            <Card className="shadow-medium border-0 bg-gradient-to-r from-green-50 to-teal-50">
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="text-lg font-semibold text-slate-800">Currently Active</h3>
                    <p className="text-sm text-slate-600">Work in progress across all service bays</p>
                  </div>
                  <div className="flex space-x-4 text-sm">
                    <div className="text-center">
                      <div className="text-xl font-bold text-green-600">{filteredBookings.filter(b => b.status === 'in-progress').length}</div>
                      <div className="text-slate-600">Active Jobs</div>
                    </div>
                    <div className="text-center">
                      <div className="text-xl font-bold text-blue-600">{filteredBookings.filter(b => b.status === 'in-progress' && b.startTime).reduce((total, b) => {
                        if (!b.startTime) return total;
                        const startTime = new Date(`${b.scheduledDate}T${b.startTime}`);
                        const now = new Date();
                        const elapsed = Math.floor((now.getTime() - startTime.getTime()) / (1000 * 60));
                        return total + elapsed;
                      }, 0)}</div>
                      <div className="text-slate-600">Total Minutes</div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
            {renderBookingsList(filteredBookings.filter(b => b.status === 'in-progress'))}
          </TabsContent>

          {/* Completed Bookings */}
          <TabsContent value="completed" className="space-y-4">
            <Card className="shadow-medium border-0 bg-gradient-to-r from-emerald-50 to-green-50">
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="text-lg font-semibold text-slate-800">Completed Today</h3>
                    <p className="text-sm text-slate-600">Successfully finished services and customer satisfaction</p>
                  </div>
                  <div className="flex space-x-4 text-sm">
                    <div className="text-center">
                      <div className="text-xl font-bold text-emerald-600">${filteredBookings.filter(b => b.status === 'completed').reduce((sum, b) => sum + (b.actualCost || 0), 0)}</div>
                      <div className="text-slate-600">Revenue</div>
                    </div>
                    <div className="text-center">
                      <div className="text-xl font-bold text-yellow-600">
                        {filteredBookings.filter(b => b.status === 'completed').length > 0 ? '4.8' : '0'}
                      </div>
                      <div className="text-slate-600">Avg Rating</div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
            {renderBookingsList(filteredBookings.filter(b => b.status === 'completed'))}
          </TabsContent>

          {/* Cancelled Bookings */}
          <TabsContent value="cancelled" className="space-y-4">
            <Card className="shadow-medium border-0 bg-gradient-to-r from-red-50 to-pink-50">
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="text-lg font-semibold text-slate-800">Cancelled Bookings</h3>
                    <p className="text-sm text-slate-600">Cancelled appointments and rescheduling opportunities</p>
                  </div>
                  <div className="flex space-x-2">
                    <Button size="sm" variant="outline" className="bg-blue-100 border-blue-200">
                      <RefreshCw className="h-4 w-4 mr-2" />
                      Reschedule
                    </Button>
                    <Button size="sm" variant="outline" className="bg-green-100 border-green-200">
                      <Phone className="h-4 w-4 mr-2" />
                      Follow Up
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
            {renderBookingsList(filteredBookings.filter(b => b.status === 'cancelled'))}
          </TabsContent>
        </Tabs>
      </div>

      {/* Booking Details Dialog */}
      <Dialog open={showBookingDetails} onOpenChange={setShowBookingDetails}>
        <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>Booking Details</DialogTitle>
            <DialogDescription>
              View and manage complete booking information including customer, vehicle, service details, and assignment.
            </DialogDescription>
          </DialogHeader>
          {selectedBooking && (
            <div className="space-y-6 py-4">
              {/* Customer & Vehicle Info */}
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <h4 className="font-medium mb-2">Customer Information</h4>
                  <div className="space-y-1 text-sm">
                    <p><strong>Name:</strong> {selectedBooking.customerName}</p>
                    <p><strong>Phone:</strong> {selectedBooking.customerPhone}</p>
                    <p><strong>Email:</strong> {selectedBooking.customerEmail}</p>
                  </div>
                </div>
                <div>
                  <h4 className="font-medium mb-2">Vehicle Information</h4>
                  <div className="space-y-1 text-sm">
                    <p><strong>Registration:</strong> {selectedBooking.vehicleRego}</p>
                    <p><strong>Vehicle:</strong> {selectedBooking.vehicleMake} {selectedBooking.vehicleModel}</p>
                    <p><strong>Year:</strong> {selectedBooking.vehicleYear}</p>
                  </div>
                </div>
              </div>

              {/* Service & Schedule */}
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <h4 className="font-medium mb-2">Service Details</h4>
                  <div className="space-y-1 text-sm">
                    <p><strong>Service:</strong> {selectedBooking.serviceName}</p>
                    <p><strong>Type:</strong> {selectedBooking.serviceType.toUpperCase()}</p>
                    <p><strong>Priority:</strong> {selectedBooking.priority}</p>
                  </div>
                </div>
                <div>
                  <h4 className="font-medium mb-2">Schedule</h4>
                  <div className="space-y-1 text-sm">
                    <p><strong>Date:</strong> {selectedBooking.scheduledDate}</p>
                    <p><strong>Time:</strong> {selectedBooking.scheduledTime}</p>
                    <p><strong>Duration:</strong> {selectedBooking.duration} minutes</p>
                  </div>
                </div>
              </div>

              {/* Assignment & Status */}
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <h4 className="font-medium mb-2">Assignment</h4>
                  <div className="space-y-2">
                    <Select 
                      value={selectedBooking.assignedMechanicId || ''} 
                      onValueChange={(value) => assignMechanic(selectedBooking.id, value)}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Assign mechanic" />
                      </SelectTrigger>
                      <SelectContent>
                        {mechanics.map(mechanic => (
                          <SelectItem key={mechanic.id} value={mechanic.id}>
                            {mechanic.name} ({mechanic.currentWorkload}/{mechanic.maxCapacity})
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                <div>
                  <h4 className="font-medium mb-2">Status</h4>
                  <Badge className={`${getStatusColor(selectedBooking.status)} text-sm px-3 py-1`}>
                    {selectedBooking.status.replace('-', ' ')}
                  </Badge>
                </div>
              </div>

              {/* Notes */}
              {selectedBooking.notes && (
                <div>
                  <h4 className="font-medium mb-2">Notes</h4>
                  <div className="p-3 bg-slate-50 rounded-lg text-sm">
                    {selectedBooking.notes}
                  </div>
                </div>
              )}

              {/* Actions */}
              <div className="flex justify-between items-center pt-4 border-t">
                <div className="flex space-x-2">
                  <Button 
                    variant="outline" 
                    onClick={() => sendNotification(selectedBooking.id, 'confirmation')}
                  >
                    <Mail className="h-4 w-4 mr-2" />
                    Send Confirmation
                  </Button>
                  <Button 
                    variant="outline"
                    onClick={() => sendNotification(selectedBooking.id, 'reminder')}
                  >
                    <Bell className="h-4 w-4 mr-2" />
                    Send Reminder
                  </Button>
                </div>
                <Button onClick={() => setShowBookingDetails(false)}>
                  Close
                </Button>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}