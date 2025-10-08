import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { Calendar } from './ui/calendar';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from './ui/dialog';
import { Alert, AlertDescription } from './ui/alert';
import { 
  ArrowLeft, Calendar as CalendarIcon, Clock, User, Car, Phone, MapPin, 
  CheckCircle, XCircle, Plus, Search, Activity, Bell,
  UserCheck, UserX, AlertCircle, CheckCircle2, 
  Calendar as CalendarViewIcon, PhoneCall, MessageCircle
} from 'lucide-react';
import { toast } from 'sonner@2.0.3';

interface OptimizedBookingsPageProps {
  onBack: () => void;
}

type BookingStatus = 'pending' | 'confirmed' | 'in-progress' | 'completed' | 'cancelled' | 'no-show';
type ServiceType = 'wof' | 'service' | 'repair' | 'diagnostic' | 'maintenance';
type BookingSource = 'customer' | 'manager' | 'phone' | 'walk-in';
type ViewMode = 'today' | 'week' | 'month';
type ViewType = 'calendar' | 'list' | 'timeline';

interface TimeSlot {
  time: string;
  available: boolean;
  mechanic?: string;
  booking?: Booking;
}

interface Customer {
  id: string;
  name: string;
  phone: string;
  email: string;
  isVip: boolean;
  noShowCount: number;
  lastVisit?: string;
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
  currentWorkload: number;
  maxCapacity: number;
  shift: { start: string; end: string };
  breaks: { start: string; end: string }[];
  isAvailable: boolean;
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
  endTime: string;
  duration: number;
  status: BookingStatus;
  priority: 'low' | 'medium' | 'high' | 'urgent';
  estimatedCost: number;
  actualCost?: number;
  notes: string;
  createdAt: string;
  updatedAt: string;
  assignedMechanicId?: string;
  assignedMechanicName?: string;
  location: string;
  source: BookingSource;
  confirmationSent: boolean;
  reminderSent: boolean;
  arrivalStatus?: 'not-arrived' | 'arrived' | 'no-show';
  arrivalTime?: string;
  cancellationReason?: string;
  rescheduleCount: number;
  customerNotes?: string;
  mechanicNotes?: string;
}

export function OptimizedBookingsPage({ onBack }: OptimizedBookingsPageProps) {
  const [viewMode, setViewMode] = useState<ViewMode>('today');
  const [viewType, setViewType] = useState<ViewType>('calendar');
  const [selectedDate, setSelectedDate] = useState<Date>(new Date());
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedFilters, setSelectedFilters] = useState({
    status: 'all',
    source: 'all',
    mechanic: 'all',
    priority: 'all'
  });
  const [showNewBookingDialog, setShowNewBookingDialog] = useState(false);
  const [selectedBooking, setSelectedBooking] = useState<Booking | null>(null);
  const [showBookingDetails, setShowBookingDetails] = useState(false);
  const [showAvailabilityView, setShowAvailabilityView] = useState(false);
  const [showNewBookingDialog, setShowNewBookingDialog] = useState(false);

  // Mock data with enhanced structure
  const [customers] = useState<Customer[]>([
    {
      id: '1',
      name: 'John Smith',
      phone: '+64 21 123 4567',
      email: 'john@email.com',
      isVip: true,
      noShowCount: 0,
      lastVisit: '2024-02-15',
      vehicles: [
        { id: '1', rego: 'ABC123', make: 'Toyota', model: 'Camry', year: 2020, customerId: '1' }
      ]
    },
    {
      id: '2',
      name: 'Sarah Wilson',
      phone: '+64 21 234 5678',
      email: 'sarah@email.com',
      isVip: false,
      noShowCount: 1,
      lastVisit: '2024-02-18',
      vehicles: [
        { id: '2', rego: 'XYZ789', make: 'Honda', model: 'Civic', year: 2018, customerId: '2' }
      ]
    }
  ]);

  const [mechanics] = useState<Mechanic[]>([
    {
      id: 'MECH001',
      name: 'Mike Johnson',
      specialties: ['Engine Repair', 'Electrical', 'Brake Systems'],
      currentWorkload: 3,
      maxCapacity: 5,
      shift: { start: '08:00', end: '17:00' },
      breaks: [{ start: '12:00', end: '13:00' }],
      isAvailable: true
    },
    {
      id: 'MECH002',
      name: 'Dave Smith',
      specialties: ['WOF Inspections', 'General Service', 'Suspension'],
      currentWorkload: 2,
      maxCapacity: 4,
      shift: { start: '09:00', end: '18:00' },
      breaks: [{ start: '12:30', end: '13:30' }],
      isAvailable: true
    }
  ]);

  // Enhanced bookings with source tracking and better status management
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
      endTime: '09:30',
      duration: 30,
      status: 'confirmed',
      priority: 'high',
      estimatedCost: 65,
      notes: 'Customer mentioned brake noise',
      createdAt: '2024-02-20T08:30:00',
      updatedAt: '2024-02-20T08:30:00',
      assignedMechanicId: 'MECH002',
      assignedMechanicName: 'Dave Smith',
      location: 'Bay 1',
      source: 'customer',
      confirmationSent: true,
      reminderSent: false,
      arrivalStatus: 'not-arrived',
      rescheduleCount: 0
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
      endTime: '12:00',
      duration: 90,
      status: 'in-progress',
      priority: 'medium',
      estimatedCost: 320,
      actualCost: 295,
      notes: 'Regular customer, prefers early morning slots',
      createdAt: '2024-02-18T14:15:00',
      updatedAt: '2024-02-21T10:35:00',
      assignedMechanicId: 'MECH001',
      assignedMechanicName: 'Mike Johnson',
      location: 'Bay 2',
      source: 'manager',
      confirmationSent: true,
      reminderSent: true,
      arrivalStatus: 'arrived',
      arrivalTime: '10:25',
      rescheduleCount: 0
    },
    {
      id: '3',
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
      scheduledDate: new Date(Date.now() - 86400000).toISOString().split('T')[0], // Yesterday
      scheduledTime: '14:00',
      endTime: '15:00',
      duration: 60,
      status: 'no-show',
      priority: 'medium',
      estimatedCost: 150,
      notes: 'Engine warning light on - Customer did not arrive',
      createdAt: '2024-02-20T09:00:00',
      updatedAt: '2024-02-21T14:15:00',
      location: 'Bay 3',
      source: 'phone',
      confirmationSent: true,
      reminderSent: true,
      arrivalStatus: 'no-show',
      rescheduleCount: 1
    }
  ]);

  // Generate available time slots for selected date
  const generateTimeSlots = (date: Date): TimeSlot[] => {
    const slots: TimeSlot[] = [];
    const startHour = 8; // 8 AM
    const endHour = 18; // 6 PM
    const slotDuration = 30; // 30 minutes

    for (let hour = startHour; hour < endHour; hour++) {
      for (let minutes = 0; minutes < 60; minutes += slotDuration) {
        const time = `${hour.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}`;
        const dateStr = date.toISOString().split('T')[0];
        
        // Check if slot is booked
        const existingBooking = bookings.find(
          b => b.scheduledDate === dateStr && 
               b.scheduledTime <= time && 
               b.endTime > time &&
               b.status !== 'cancelled' &&
               b.status !== 'no-show'
        );

        // Check mechanic availability
        const availableMechanic = mechanics.find(m => {
          const mechTime = parseInt(time.replace(':', ''));
          const startTime = parseInt(m.shift.start.replace(':', ''));
          const endTime = parseInt(m.shift.end.replace(':', ''));
          
          // Check if within shift hours and not on break
          const isInShift = mechTime >= startTime && mechTime < endTime;
          const isOnBreak = m.breaks.some(b => {
            const breakStart = parseInt(b.start.replace(':', ''));
            const breakEnd = parseInt(b.end.replace(':', ''));
            return mechTime >= breakStart && mechTime < breakEnd;
          });
          
          return isInShift && !isOnBreak && m.isAvailable;
        });

        slots.push({
          time,
          available: !existingBooking && !!availableMechanic,
          mechanic: availableMechanic?.name,
          booking: existingBooking
        });
      }
    }

    return slots;
  };

  const getStatusIcon = (status: BookingStatus) => {
    switch (status) {
      case 'pending': return <Clock className="h-4 w-4" />;
      case 'confirmed': return <CheckCircle className="h-4 w-4" />;
      case 'in-progress': return <Activity className="h-4 w-4" />;
      case 'completed': return <CheckCircle2 className="h-4 w-4" />;
      case 'cancelled': return <XCircle className="h-4 w-4" />;
      case 'no-show': return <UserX className="h-4 w-4" />;
    }
  };

  const getStatusColor = (status: BookingStatus) => {
    switch (status) {
      case 'pending': return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 'confirmed': return 'bg-blue-100 text-blue-800 border-blue-200';
      case 'in-progress': return 'bg-green-100 text-green-800 border-green-200';
      case 'completed': return 'bg-emerald-100 text-emerald-800 border-emerald-200';
      case 'cancelled': return 'bg-red-100 text-red-800 border-red-200';
      case 'no-show': return 'bg-orange-100 text-orange-800 border-orange-200';
    }
  };

  const getSourceIcon = (source: BookingSource) => {
    switch (source) {
      case 'customer': return <Smartphone className="h-4 w-4" />;
      case 'manager': return <User className="h-4 w-4" />;
      case 'phone': return <Phone className="h-4 w-4" />;
      case 'walk-in': return <UserCheck className="h-4 w-4" />;
    }
  };

  const getSourceColor = (source: BookingSource) => {
    switch (source) {
      case 'customer': return 'bg-blue-100 text-blue-800';
      case 'manager': return 'bg-purple-100 text-purple-800';
      case 'phone': return 'bg-green-100 text-green-800';
      case 'walk-in': return 'bg-orange-100 text-orange-800';
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'urgent': return 'bg-red-600';
      case 'high': return 'bg-red-500';
      case 'medium': return 'bg-orange-500';
      case 'low': return 'bg-green-500';
      default: return 'bg-gray-500';
    }
  };

  const updateBookingStatus = (bookingId: string, newStatus: BookingStatus, reason?: string) => {
    setBookings(prev => prev.map(booking => 
      booking.id === bookingId 
        ? { 
            ...booking, 
            status: newStatus, 
            updatedAt: new Date().toISOString(),
            ...(reason && { cancellationReason: reason }),
            ...(newStatus === 'no-show' && { arrivalStatus: 'no-show' as const })
          }
        : booking
    ));
    
    toast.success(`Booking ${newStatus.replace('-', ' ')}`);
  };

  const markArrival = (bookingId: string, arrived: boolean) => {
    const arrivalTime = new Date().toISOString();
    setBookings(prev => prev.map(booking => 
      booking.id === bookingId 
        ? { 
            ...booking, 
            arrivalStatus: arrived ? 'arrived' : 'no-show',
            arrivalTime: arrived ? arrivalTime : undefined,
            status: arrived ? 'in-progress' : 'no-show',
            updatedAt: arrivalTime
          }
        : booking
    ));
    
    toast.success(arrived ? 'Customer marked as arrived' : 'Customer marked as no-show');
  };

  const sendReminder = (bookingId: string) => {
    setBookings(prev => prev.map(booking => 
      booking.id === bookingId 
        ? { ...booking, reminderSent: true, updatedAt: new Date().toISOString() }
        : booking
    ));
    
    toast.success('Reminder sent successfully');
  };

  const filteredBookings = bookings.filter(booking => {
    const matchesSearch = booking.customerName.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         booking.vehicleRego.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         booking.serviceName.toLowerCase().includes(searchQuery.toLowerCase());
    
    const matchesStatus = selectedFilters.status === 'all' || booking.status === selectedFilters.status;
    const matchesSource = selectedFilters.source === 'all' || booking.source === selectedFilters.source;
    const matchesMechanic = selectedFilters.mechanic === 'all' || booking.assignedMechanicId === selectedFilters.mechanic;
    const matchesPriority = selectedFilters.priority === 'all' || booking.priority === selectedFilters.priority;
    
    // Date filtering
    const bookingDate = new Date(booking.scheduledDate);
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    
    let matchesDate = false;
    if (viewMode === 'today') {
      matchesDate = booking.scheduledDate === today.toISOString().split('T')[0];
    } else if (viewMode === 'week') {
      const weekStart = new Date(today);
      weekStart.setDate(today.getDate() - today.getDay());
      const weekEnd = new Date(weekStart);
      weekEnd.setDate(weekStart.getDate() + 7);
      matchesDate = bookingDate >= weekStart && bookingDate < weekEnd;
    } else { // month
      matchesDate = bookingDate.getMonth() === today.getMonth() && 
                   bookingDate.getFullYear() === today.getFullYear();
    }
    
    return matchesSearch && matchesStatus && matchesSource && matchesMechanic && matchesPriority && matchesDate;
  });

  const todayStats = {
    total: filteredBookings.length,
    pending: filteredBookings.filter(b => b.status === 'pending').length,
    confirmed: filteredBookings.filter(b => b.status === 'confirmed').length,
    inProgress: filteredBookings.filter(b => b.status === 'in-progress').length,
    completed: filteredBookings.filter(b => b.status === 'completed').length,
    noShows: filteredBookings.filter(b => b.status === 'no-show').length,
    customerCreated: filteredBookings.filter(b => b.source === 'customer').length,
    revenue: filteredBookings.filter(b => b.actualCost).reduce((sum, b) => sum + (b.actualCost || 0), 0)
  };

  const upcomingToday = filteredBookings
    .filter(b => b.scheduledDate === new Date().toISOString().split('T')[0] && 
                 ['pending', 'confirmed'].includes(b.status))
    .sort((a, b) => a.scheduledTime.localeCompare(b.scheduledTime));

  const renderAvailabilityCalendar = () => {
    const timeSlots = generateTimeSlots(selectedDate);
    
    return (
      <Card className="shadow-medium border-0">
        <CardHeader>
          <CardTitle className="flex items-center justify-between">
            <span>Available Time Slots - {selectedDate.toDateString()}</span>
            <div className="flex space-x-2">
              <Badge variant="secondary" className="text-xs">
                <CheckCircle className="h-3 w-3 mr-1" />
                Available
              </Badge>
              <Badge variant="destructive" className="text-xs">
                <XCircle className="h-3 w-3 mr-1" />
                Booked
              </Badge>
            </div>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-6 gap-2">
            {timeSlots.map((slot) => (
              <Button
                key={slot.time}
                variant={slot.available ? "outline" : "secondary"}
                size="sm"
                disabled={!slot.available}
                className={`text-xs ${
                  slot.available 
                    ? 'hover:bg-green-50 hover:border-green-300 hover:text-green-700' 
                    : 'bg-red-50 text-red-400 cursor-not-allowed'
                }`}
                onClick={() => {
                  if (slot.available) {
                    toast.success(`Selected ${slot.time} with ${slot.mechanic}`);
                  }
                }}
              >
                <div className="text-center">
                  <div>{slot.time}</div>
                  {slot.available && slot.mechanic && (
                    <div className="text-xs text-muted-foreground">{slot.mechanic.split(' ')[0]}</div>
                  )}
                  {slot.booking && (
                    <div className="text-xs text-red-600">{slot.booking.customerName}</div>
                  )}
                </div>
              </Button>
            ))}
          </div>
        </CardContent>
      </Card>
    );
  };

  const renderBookingCard = (booking: Booking) => (
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
              <div className={`w-12 h-12 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full flex items-center justify-center shadow-medium`}>
                {getStatusIcon(booking.status)}
                <span className="text-white"></span>
              </div>
              <div className={`absolute -top-1 -right-1 w-4 h-4 ${getPriorityColor(booking.priority)} rounded-full border-2 border-white`}></div>
            </div>
            <div>
              <div className="flex items-center space-x-2">
                <h3 className="font-semibold text-lg">{booking.customerName}</h3>
                <Badge className={`${getSourceColor(booking.source)} text-xs flex items-center space-x-1`}>
                  {getSourceIcon(booking.source)}
                  <span>{booking.source}</span>
                </Badge>
              </div>
              <p className="text-sm text-muted-foreground flex items-center">
                <Car className="h-4 w-4 mr-1" />
                {booking.vehicleRego} - {booking.vehicleMake} {booking.vehicleModel}
              </p>
              <p className="text-xs text-muted-foreground">{booking.serviceName}</p>
            </div>
          </div>
          <div className="text-right space-y-1">
            <Badge className={`${getStatusColor(booking.status)} flex items-center space-x-1`}>
              {getStatusIcon(booking.status)}
              <span className="capitalize">{booking.status.replace('-', ' ')}</span>
            </Badge>
            {booking.arrivalStatus && (
              <Badge variant="outline" className="text-xs">
                {booking.arrivalStatus === 'arrived' ? '✅ Arrived' : 
                 booking.arrivalStatus === 'no-show' ? '❌ No Show' : 
                 '⏳ Waiting'}
              </Badge>
            )}
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4 mb-4">
          <div>
            <p className="text-sm font-medium text-slate-700">Scheduled</p>
            <p className="text-xs text-muted-foreground flex items-center mt-1">
              <Clock className="h-3 w-3 mr-1" />
              {booking.scheduledTime} - {booking.endTime} ({booking.duration}min)
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

        <div className="flex justify-between items-center pt-3 border-t border-slate-100">
          <div className="flex space-x-2">
            {booking.status === 'confirmed' && booking.arrivalStatus !== 'arrived' && (
              <div className="flex space-x-1">
                <Button 
                  size="sm" 
                  onClick={(e) => {
                    e.stopPropagation();
                    markArrival(booking.id, true);
                  }}
                  className="bg-green-500 hover:bg-green-600 text-white"
                >
                  <UserCheck className="h-4 w-4 mr-1" />
                  Arrived
                </Button>
                <Button 
                  size="sm" 
                  variant="outline"
                  onClick={(e) => {
                    e.stopPropagation();
                    markArrival(booking.id, false);
                  }}
                  className="text-orange-600 hover:bg-orange-50"
                >
                  <UserX className="h-4 w-4 mr-1" />
                  No Show
                </Button>
              </div>
            )}
            
            {booking.status === 'pending' && (
              <Button 
                size="sm" 
                onClick={(e) => {
                  e.stopPropagation();
                  updateBookingStatus(booking.id, 'confirmed');
                }}
                className="bg-blue-500 hover:bg-blue-600"
              >
                <CheckCircle className="h-4 w-4 mr-1" />
                Confirm
              </Button>
            )}
          </div>
          
          <div className="flex space-x-1">
            {!booking.reminderSent && ['pending', 'confirmed'].includes(booking.status) && (
              <Button 
                variant="ghost" 
                size="sm"
                onClick={(e) => {
                  e.stopPropagation();
                  sendReminder(booking.id);
                }}
              >
                <Bell className="h-4 w-4" />
              </Button>
            )}
            <Button 
              variant="ghost" 
              size="sm"
              onClick={(e) => {
                e.stopPropagation();
                window.open(`tel:${booking.customerPhone}`, '_self');
              }}
            >
              <PhoneCall className="h-4 w-4" />
            </Button>
            <Button 
              variant="ghost" 
              size="sm"
              onClick={(e) => {
                e.stopPropagation();
                window.open(`sms:${booking.customerPhone}`, '_self');
              }}
            >
              <MessageCircle className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );

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
                Smart Booking Manager
              </h1>
              <p className="text-sm text-muted-foreground">Advanced booking system with real-time tracking</p>
            </div>
          </div>
          
          <div className="flex items-center space-x-2">
            <Button 
              variant="outline" 
              size="sm" 
              onClick={() => setShowAvailabilityView(!showAvailabilityView)}
              className="hover:bg-blue-50"
            >
              <CalendarViewIcon className="h-4 w-4 mr-2" />
              {showAvailabilityView ? 'Hide' : 'Show'} Availability
            </Button>
            
            <Button 
              className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 shadow-lg hover:shadow-xl transition-all duration-200 hover:scale-105"
              onClick={() => setShowNewBookingDialog(true)}
            >
              <Plus className="h-4 w-4 mr-2" />
              New Booking
            </Button>
          </div>
        </div>
      </div>

      <div className="p-4 space-y-6">
        {/* Stats Dashboard */}
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-7 gap-4">
          <Card className="shadow-medium border-0 hover-lift">
            <CardContent className="p-4 text-center">
              <div className="text-2xl font-bold text-blue-600">{todayStats.total}</div>
              <div className="text-sm text-muted-foreground">Total Bookings</div>
            </CardContent>
          </Card>
          
          <Card className="shadow-medium border-0 hover-lift">
            <CardContent className="p-4 text-center">
              <div className="text-2xl font-bold text-yellow-600">{todayStats.pending}</div>
              <div className="text-sm text-muted-foreground">Pending</div>
            </CardContent>
          </Card>
          
          <Card className="shadow-medium border-0 hover-lift">
            <CardContent className="p-4 text-center">
              <div className="text-2xl font-bold text-green-600">{todayStats.confirmed}</div>
              <div className="text-sm text-muted-foreground">Confirmed</div>
            </CardContent>
          </Card>
          
          <Card className="shadow-medium border-0 hover-lift">
            <CardContent className="p-4 text-center">
              <div className="text-2xl font-bold text-orange-600">{todayStats.noShows}</div>
              <div className="text-sm text-muted-foreground">No Shows</div>
            </CardContent>
          </Card>
          
          <Card className="shadow-medium border-0 hover-lift">
            <CardContent className="p-4 text-center">
              <div className="text-2xl font-bold text-purple-600">{todayStats.customerCreated}</div>
              <div className="text-sm text-muted-foreground">Customer Created</div>
            </CardContent>
          </Card>
          
          <Card className="shadow-medium border-0 hover-lift">
            <CardContent className="p-4 text-center">
              <div className="text-2xl font-bold text-emerald-600">{todayStats.completed}</div>
              <div className="text-sm text-muted-foreground">Completed</div>
            </CardContent>
          </Card>
          
          <Card className="shadow-medium border-0 hover-lift">
            <CardContent className="p-4 text-center">
              <div className="text-2xl font-bold text-green-600">${todayStats.revenue}</div>
              <div className="text-sm text-muted-foreground">Revenue</div>
            </CardContent>
          </Card>
        </div>

        {/* Controls */}
        <div className="flex flex-col lg:flex-row gap-4">
          {/* Search and Filters */}
          <Card className="flex-1 shadow-medium border-0">
            <CardContent className="p-4">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-4">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input
                    placeholder="Search bookings..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="pl-10"
                  />
                </div>
                
                <Select value={selectedFilters.status} onValueChange={(value) => 
                  setSelectedFilters(prev => ({ ...prev, status: value }))
                }>
                  <SelectTrigger>
                    <SelectValue placeholder="Status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Status</SelectItem>
                    <SelectItem value="pending">Pending</SelectItem>
                    <SelectItem value="confirmed">Confirmed</SelectItem>
                    <SelectItem value="in-progress">In Progress</SelectItem>
                    <SelectItem value="completed">Completed</SelectItem>
                    <SelectItem value="no-show">No Show</SelectItem>
                    <SelectItem value="cancelled">Cancelled</SelectItem>
                  </SelectContent>
                </Select>
                
                <Select value={selectedFilters.source} onValueChange={(value) => 
                  setSelectedFilters(prev => ({ ...prev, source: value }))
                }>
                  <SelectTrigger>
                    <SelectValue placeholder="Source" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Sources</SelectItem>
                    <SelectItem value="customer">Customer App</SelectItem>
                    <SelectItem value="manager">Manager</SelectItem>
                    <SelectItem value="phone">Phone</SelectItem>
                    <SelectItem value="walk-in">Walk-in</SelectItem>
                  </SelectContent>
                </Select>
                
                <Select value={selectedFilters.mechanic} onValueChange={(value) => 
                  setSelectedFilters(prev => ({ ...prev, mechanic: value }))
                }>
                  <SelectTrigger>
                    <SelectValue placeholder="Mechanic" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Mechanics</SelectItem>
                    {mechanics.map(mechanic => (
                      <SelectItem key={mechanic.id} value={mechanic.id}>
                        {mechanic.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                
                <Tabs value={viewMode} onValueChange={(value) => setViewMode(value as ViewMode)}>
                  <TabsList className="grid w-full grid-cols-3">
                    <TabsTrigger value="today">Today</TabsTrigger>
                    <TabsTrigger value="week">Week</TabsTrigger>
                    <TabsTrigger value="month">Month</TabsTrigger>
                  </TabsList>
                </Tabs>
                
                <div className="flex space-x-2">
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
            </CardContent>
          </Card>
        </div>

        {/* Availability Calendar */}
        {showAvailabilityView && (
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-4">
            <Card className="shadow-medium border-0">
              <CardHeader>
                <CardTitle>Select Date</CardTitle>
              </CardHeader>
              <CardContent>
                <Calendar
                  mode="single"
                  selected={selectedDate}
                  onSelect={(date) => date && setSelectedDate(date)}
                  className="rounded-md border"
                />
              </CardContent>
            </Card>
            
            <div className="lg:col-span-3">
              {renderAvailabilityCalendar()}
            </div>
          </div>
        )}

        {/* Upcoming Today Alert */}
        {upcomingToday.length > 0 && (
          <Alert className="border-blue-200 bg-blue-50">
            <AlertCircle className="h-4 w-4" />
            <AlertDescription>
              <div className="flex items-center justify-between">
                <span>
                  <strong>{upcomingToday.length} appointments</strong> scheduled for today starting at {upcomingToday[0].scheduledTime}
                </span>
                <Button size="sm" variant="outline">
                  View Details
                </Button>
              </div>
            </AlertDescription>
          </Alert>
        )}

        {/* Bookings List */}
        <div className="space-y-4">
          {filteredBookings.length === 0 ? (
            <Card className="shadow-medium border-0">
              <CardContent className="p-8 text-center">
                <CalendarIcon className="h-16 w-16 mx-auto mb-4 text-muted-foreground opacity-50" />
                <h3 className="text-lg font-medium mb-2">No bookings found</h3>
                <p className="text-muted-foreground">
                  {searchQuery ? 'Try adjusting your search query' : 'No bookings found for the selected period'}
                </p>
              </CardContent>
            </Card>
          ) : (
            filteredBookings
              .sort((a, b) => a.scheduledTime.localeCompare(b.scheduledTime))
              .map(renderBookingCard)
          )}
        </div>
      </div>

      {/* New Booking Dialog */}
      <Dialog open={showNewBookingDialog} onOpenChange={setShowNewBookingDialog}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>Create New Booking</DialogTitle>
            <DialogDescription>
              Create a new booking appointment for a customer. All fields marked with * are required.
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <div className="text-center py-8">
              <CalendarIcon className="h-16 w-16 mx-auto mb-4 text-muted-foreground opacity-50" />
              <h3 className="text-lg font-medium mb-2">New Booking Form</h3>
              <p className="text-muted-foreground mb-4">
                This feature will be implemented with the full booking form
              </p>
              <Button onClick={() => setShowNewBookingDialog(false)}>
                Close
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>

      {/* Booking Details Dialog */}
      <Dialog open={showBookingDetails} onOpenChange={setShowBookingDetails}>
        <DialogContent className="max-w-3xl">
          <DialogHeader>
            <DialogTitle>
              {selectedBooking ? `Booking Details - ${selectedBooking.customerName}` : 'Booking Details'}
            </DialogTitle>
            <DialogDescription>
              View and manage booking information, customer details, and service status.
            </DialogDescription>
          </DialogHeader>
          {selectedBooking && (
            <div className="space-y-4 py-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label>Customer</Label>
                  <p className="text-sm">{selectedBooking.customerName}</p>
                  <p className="text-xs text-muted-foreground">{selectedBooking.customerPhone}</p>
                </div>
                <div>
                  <Label>Vehicle</Label>
                  <p className="text-sm">{selectedBooking.vehicleRego} - {selectedBooking.vehicleMake} {selectedBooking.vehicleModel}</p>
                </div>
                <div>
                  <Label>Service</Label>
                  <p className="text-sm">{selectedBooking.serviceName}</p>
                </div>
                <div>
                  <Label>Status</Label>
                  <Badge className={`${getStatusColor(selectedBooking.status)} w-fit`}>
                    {getStatusIcon(selectedBooking.status)}
                    <span className="ml-1 capitalize">{selectedBooking.status.replace('-', ' ')}</span>
                  </Badge>
                </div>
                <div>
                  <Label>Scheduled Time</Label>
                  <p className="text-sm">{selectedBooking.scheduledTime} - {selectedBooking.endTime}</p>
                </div>
                <div>
                  <Label>Cost</Label>
                  <p className="text-sm font-bold text-green-600">
                    ${selectedBooking.actualCost || selectedBooking.estimatedCost}
                  </p>
                </div>
              </div>
              
              {selectedBooking.notes && (
                <div>
                  <Label>Notes</Label>
                  <p className="text-sm bg-slate-50 p-2 rounded">{selectedBooking.notes}</p>
                </div>
              )}
              
              <div className="flex justify-end space-x-2 pt-4">
                <Button variant="outline" onClick={() => setShowBookingDetails(false)}>
                  Close
                </Button>
                <Button>
                  Edit Booking
                </Button>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}