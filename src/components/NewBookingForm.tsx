import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { Textarea } from './ui/textarea';
import { Badge } from './ui/badge';
import { 
  ArrowLeft,
  Calendar,
  Clock,
  Phone,
  Car,
  CheckCircle,
  User,
  FileText,
  Save,
  Send
} from 'lucide-react';

interface NewBookingFormProps {
  onBack: () => void;
  onBookingCreated?: (booking: any) => void;
}

export function NewBookingForm({ onBack, onBookingCreated }: NewBookingFormProps) {
  const [formData, setFormData] = useState({
    customerName: '',
    phone: '',
    carRego: '',
    date: '',
    time: '',
    serviceType: '',
    notes: ''
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);

  const serviceTypes = [
    { value: 'full-service', label: 'Full Service', duration: '2-3 hours' },
    { value: 'wof-inspection', label: 'WOF Inspection', duration: '1 hour' },
    { value: 'oil-change', label: 'Oil Change', duration: '30 mins' },
    { value: 'brake-service', label: 'Brake Service', duration: '1-2 hours' },
    { value: 'tyre-service', label: 'Tyre Service', duration: '45 mins' },
    { value: 'engine-diagnostic', label: 'Engine Diagnostic', duration: '1 hour' },
    { value: 'other', label: 'Other', duration: 'TBD' }
  ];

  const timeSlots = [
    '08:00', '08:30', '09:00', '09:30', '10:00', '10:30',
    '11:00', '11:30', '12:00', '12:30', '13:00', '13:30',
    '14:00', '14:30', '15:00', '15:30', '16:00', '16:30',
    '17:00', '17:30'
  ];

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleSubmit = async () => {
    if (!formData.customerName || !formData.phone || !formData.carRego || !formData.date || !formData.time || !formData.serviceType) {
      alert('Please fill in all required fields');
      return;
    }

    setIsSubmitting(true);

    // Simulate API call
    setTimeout(() => {
      const newBooking = {
        id: Date.now().toString(),
        ...formData,
        status: 'confirmed',
        createdAt: new Date().toISOString()
      };

      setIsSubmitting(false);
      setShowSuccess(true);
      
      if (onBookingCreated) {
        onBookingCreated(newBooking);
      }

      // Auto-redirect after success
      setTimeout(() => {
        onBack();
      }, 2000);
    }, 1500);
  };

  const selectedService = serviceTypes.find(s => s.value === formData.serviceType);

  if (showSuccess) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-green-50 via-emerald-50 to-teal-50 flex items-center justify-center p-4">
        <Card className="shadow-large border-0 w-full max-w-md animate-bounce-in">
          <CardContent className="p-8 text-center space-y-6">
            <div className="w-20 h-20 gradient-success rounded-full flex items-center justify-center mx-auto">
              <CheckCircle className="h-10 w-10 text-white" />
            </div>
            <div>
              <h2 className="font-bold text-xl text-green-700 mb-2">Booking Created!</h2>
              <p className="text-green-600">Your booking has been successfully created and confirmed.</p>
            </div>
            <div className="text-left space-y-2 bg-green-50 p-4 rounded-lg">
              <div className="flex justify-between">
                <span className="text-sm font-medium">Customer:</span>
                <span className="text-sm">{formData.customerName}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm font-medium">Date & Time:</span>
                <span className="text-sm">{formData.date} at {formData.time}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm font-medium">Service:</span>
                <span className="text-sm">{selectedService?.label}</span>
              </div>
            </div>
            <Button onClick={onBack} className="w-full">
              Back to Bookings
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50">
      {/* Header */}
      <div className="glassmorphism sticky top-0 z-50 border-b border-white/20">
        <div className="flex items-center p-4">
          <Button variant="ghost" size="icon" onClick={onBack} className="mr-3 hover:bg-white/20">
            <ArrowLeft className="h-5 w-5" />
          </Button>
          <div className="w-12 h-12 gradient-primary rounded-xl flex items-center justify-center mr-3 shadow-medium">
            <Calendar className="h-6 w-6 text-white" />
          </div>
          <div>
            <h1 className="font-semibold text-lg">New Booking</h1>
            <p className="text-sm text-muted-foreground">Create a quick booking</p>
          </div>
        </div>
      </div>

      {/* Form */}
      <div className="p-4 space-y-6">
        <Card className="shadow-medium border-0 animate-fade-in">
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <User className="h-5 w-5" />
              <span>Customer Information</span>
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <Label htmlFor="customerName">Customer Name *</Label>
              <Input
                id="customerName"
                placeholder="John Smith"
                value={formData.customerName}
                onChange={(e) => handleInputChange('customerName', e.target.value)}
                className="mt-1"
              />
            </div>

            <div>
              <Label htmlFor="phone">Phone Number *</Label>
              <Input
                id="phone"
                type="tel"
                placeholder="+64 21 123 4567"
                value={formData.phone}
                onChange={(e) => handleInputChange('phone', e.target.value)}
                className="mt-1"
              />
            </div>

            <div>
              <Label htmlFor="carRego">Car Registration *</Label>
              <Input
                id="carRego"
                placeholder="ABC123"
                value={formData.carRego}
                onChange={(e) => handleInputChange('carRego', e.target.value.toUpperCase())}
                className="mt-1"
              />
            </div>
          </CardContent>
        </Card>

        <Card className="shadow-medium border-0 animate-slide-up" style={{ animationDelay: '0.1s' }}>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Calendar className="h-5 w-5" />
              <span>Booking Details</span>
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <Label htmlFor="date">Date *</Label>
              <Input
                id="date"
                type="date"
                value={formData.date}
                onChange={(e) => handleInputChange('date', e.target.value)}
                className="mt-1"
                min={new Date().toISOString().split('T')[0]}
              />
            </div>

            <div>
              <Label htmlFor="time">Time *</Label>
              <Select value={formData.time} onValueChange={(value) => handleInputChange('time', value)}>
                <SelectTrigger className="mt-1">
                  <SelectValue placeholder="Select time slot" />
                </SelectTrigger>
                <SelectContent>
                  {timeSlots.map(time => (
                    <SelectItem key={time} value={time}>
                      {time}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div>
              <Label htmlFor="serviceType">Service Type *</Label>
              <Select value={formData.serviceType} onValueChange={(value) => handleInputChange('serviceType', value)}>
                <SelectTrigger className="mt-1">
                  <SelectValue placeholder="Select service" />
                </SelectTrigger>
                <SelectContent>
                  {serviceTypes.map(service => (
                    <SelectItem key={service.value} value={service.value}>
                      <div className="flex items-center justify-between w-full">
                        <span>{service.label}</span>
                        <Badge variant="secondary" className="ml-2 text-xs">
                          {service.duration}
                        </Badge>
                      </div>
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            {selectedService && (
              <div className="p-3 bg-blue-50 rounded-lg border border-blue-200">
                <div className="flex items-center space-x-2">
                  <Clock className="h-4 w-4 text-blue-600" />
                  <span className="text-sm text-blue-700">
                    Estimated duration: {selectedService.duration}
                  </span>
                </div>
              </div>
            )}

            <div>
              <Label htmlFor="notes">Additional Notes</Label>
              <Textarea
                id="notes"
                placeholder="Any specific requirements or issues..."
                value={formData.notes}
                onChange={(e) => handleInputChange('notes', e.target.value)}
                className="mt-1"
                rows={3}
              />
            </div>
          </CardContent>
        </Card>

        {/* Action Buttons */}
        <div className="space-y-3 animate-slide-up" style={{ animationDelay: '0.2s' }}>
          <Button 
            onClick={handleSubmit}
            disabled={isSubmitting || !formData.customerName || !formData.phone || !formData.carRego || !formData.date || !formData.time || !formData.serviceType}
            className="w-full gradient-primary text-white"
          >
            {isSubmitting ? (
              <>
                <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin mr-2"></div>
                Creating Booking...
              </>
            ) : (
              <>
                <CheckCircle className="h-4 w-4 mr-2" />
                Create Booking
              </>
            )}
          </Button>

          <div className="grid grid-cols-2 gap-3">
            <Button variant="outline" onClick={onBack}>
              Cancel
            </Button>
            <Button variant="outline">
              <Save className="h-4 w-4 mr-2" />
              Save Draft
            </Button>
          </div>
        </div>

        {/* Required Fields Notice */}
        <div className="text-center">
          <p className="text-xs text-muted-foreground">
            * Required fields. All bookings require phone verification.
          </p>
        </div>
      </div>
    </div>
  );
}