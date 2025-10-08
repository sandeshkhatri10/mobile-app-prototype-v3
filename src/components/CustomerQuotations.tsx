import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { Textarea } from './ui/textarea';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from './ui/dialog';
import { 
  ArrowLeft,
  FileText,
  Clock,
  DollarSign,
  Car,
  MessageCircle,
  Send,
  CheckCircle,
  AlertTriangle,
  RefreshCw,
  Plus,
  Image,
  Video
} from 'lucide-react';

interface Quotation {
  id: string;
  carRego: string;
  carMake: string;
  service: string;
  description: string;
  amount?: string;
  status: 'pending' | 'approved' | 'rejected' | 'in-progress';
  createdDate: string;
  estimatedDate?: string;
  lastMessage?: string;
  messageCount: number;
}

interface CustomerQuotationsProps {
  onBack: () => void;
}

export function CustomerQuotations({ onBack }: CustomerQuotationsProps) {
  const [selectedQuotation, setSelectedQuotation] = useState<Quotation | null>(null);
  const [replyMessage, setReplyMessage] = useState('');
  const [isCreatingQuote, setIsCreatingQuote] = useState(false);
  const [newQuote, setNewQuote] = useState({
    carRego: '',
    service: '',
    description: ''
  });

  // Mock quotations data
  const [quotations] = useState<Quotation[]>([
    {
      id: 'QT-001',
      carRego: 'ABC123',
      carMake: 'Toyota Camry 2020',
      service: 'Engine Diagnostics',
      description: 'Strange noise when starting the car, sounds like it could be timing belt related.',
      amount: '$1,250',
      status: 'approved',
      createdDate: '2024-01-20',
      estimatedDate: '2024-02-05',
      lastMessage: 'Quote approved! Please book an appointment.',
      messageCount: 5
    },
    {
      id: 'QT-002',
      carRego: 'XYZ789',
      carMake: 'Honda Civic 2018',
      service: 'Brake Service',
      description: 'Brakes feel spongy and making grinding noise when stopping.',
      status: 'pending',
      createdDate: '2024-01-25',
      lastMessage: 'We need to inspect the brake pads. Can you bring the car in?',
      messageCount: 3
    },
    {
      id: 'QT-003',
      carRego: 'ABC123',
      carMake: 'Toyota Camry 2020',
      service: 'AC Repair',
      description: 'Air conditioning not working properly, only blowing warm air.',
      amount: '$450',
      status: 'in-progress',
      createdDate: '2024-01-28',
      estimatedDate: '2024-02-10',
      lastMessage: 'Found the issue - compressor needs replacement.',
      messageCount: 7
    }
  ]);

  const getStatusInfo = (status: string) => {
    switch (status) {
      case 'approved':
        return { icon: CheckCircle, color: 'text-green-600', bg: 'bg-green-50', label: 'Approved' };
      case 'rejected':
        return { icon: AlertTriangle, color: 'text-red-600', bg: 'bg-red-50', label: 'Rejected' };
      case 'in-progress':
        return { icon: RefreshCw, color: 'text-blue-600', bg: 'bg-blue-50', label: 'In Progress' };
      default:
        return { icon: Clock, color: 'text-orange-600', bg: 'bg-orange-50', label: 'Pending' };
    }
  };

  const handleCreateQuote = () => {
    if (newQuote.carRego && newQuote.service && newQuote.description) {
      // In a real app, this would submit to the backend
      alert('Quote request submitted successfully!');
      setNewQuote({ carRego: '', service: '', description: '' });
      setIsCreatingQuote(false);
    }
  };

  const handleSendMessage = () => {
    if (replyMessage.trim()) {
      // In a real app, this would send the message
      alert('Message sent successfully!');
      setReplyMessage('');
    }
  };

  const carOptions = ['ABC123 - Toyota Camry 2020', 'XYZ789 - Honda Civic 2018'];
  const serviceOptions = [
    'WOF Inspection',
    'Engine Diagnostics',
    'Brake Service',
    'Oil Change',
    'Transmission Service',
    'AC Repair',
    'Suspension Check',
    'Battery Replacement',
    'Tyre Rotation',
    'Other'
  ];

  if (selectedQuotation) {
    const statusInfo = getStatusInfo(selectedQuotation.status);
    const StatusIcon = statusInfo.icon;

    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 animate-fade-in">
        {/* Header */}
        <div className="glassmorphism sticky top-0 z-50 border-b border-white/20">
          <div className="flex items-center justify-between p-4">
            <div className="flex items-center space-x-4">
              <Button variant="ghost" size="icon" onClick={() => setSelectedQuotation(null)}>
                <ArrowLeft className="h-5 w-5" />
              </Button>
              <div>
                <h1 className="font-semibold">Quotation {selectedQuotation.id}</h1>
                <p className="text-sm text-muted-foreground">{selectedQuotation.carMake}</p>
              </div>
            </div>
            <Badge variant="secondary" className={`${statusInfo.bg} ${statusInfo.color} border-0`}>
              <StatusIcon className="h-3 w-3 mr-1" />
              {statusInfo.label}
            </Badge>
          </div>
        </div>

        <div className="p-4 space-y-6">
          {/* Quote Details */}
          <Card className="shadow-medium border-0">
            <CardHeader>
              <CardTitle>Quote Details</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 gap-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <Car className="h-4 w-4 text-muted-foreground" />
                    <span className="font-medium">{selectedQuotation.carRego}</span>
                  </div>
                  <span className="text-sm text-muted-foreground">{selectedQuotation.carMake}</span>
                </div>
                
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <FileText className="h-4 w-4 text-muted-foreground" />
                    <span className="font-medium">Service</span>
                  </div>
                  <span className="text-sm text-muted-foreground">{selectedQuotation.service}</span>
                </div>

                {selectedQuotation.amount && (
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <DollarSign className="h-4 w-4 text-muted-foreground" />
                      <span className="font-medium">Quote Amount</span>
                    </div>
                    <span className="font-semibold text-lg">{selectedQuotation.amount}</span>
                  </div>
                )}

                {selectedQuotation.estimatedDate && (
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <Clock className="h-4 w-4 text-muted-foreground" />
                      <span className="font-medium">Estimated Completion</span>
                    </div>
                    <span className="text-sm text-muted-foreground">
                      {new Date(selectedQuotation.estimatedDate).toLocaleDateString()}
                    </span>
                  </div>
                )}
              </div>

              <div>
                <h4 className="font-medium mb-2">Description</h4>
                <p className="text-sm text-muted-foreground bg-gray-50 p-3 rounded-lg">
                  {selectedQuotation.description}
                </p>
              </div>
            </CardContent>
          </Card>

          {/* Messages */}
          <Card className="shadow-medium border-0">
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <MessageCircle className="h-5 w-5" />
                <span>Messages</span>
                <Badge variant="secondary">{selectedQuotation.messageCount}</Badge>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="bg-gray-50 p-3 rounded-lg">
                <p className="text-sm">{selectedQuotation.lastMessage}</p>
                <p className="text-xs text-muted-foreground mt-1">
                  {new Date(selectedQuotation.createdDate).toLocaleDateString()}
                </p>
              </div>

              <div className="space-y-3 border-t pt-4">
                <Textarea
                  placeholder="Type your message here..."
                  value={replyMessage}
                  onChange={(e) => setReplyMessage(e.target.value)}
                  rows={3}
                />
                <div className="flex justify-between">
                  <div className="flex space-x-2">
                    <Button variant="outline" size="sm">
                      <Image className="h-4 w-4 mr-1" />
                      Photo
                    </Button>
                    <Button variant="outline" size="sm">
                      <Video className="h-4 w-4 mr-1" />
                      Video
                    </Button>
                  </div>
                  <Button onClick={handleSendMessage} disabled={!replyMessage.trim()}>
                    <Send className="h-4 w-4 mr-2" />
                    Send
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Actions */}
          {selectedQuotation.status === 'approved' && (
            <Card className="shadow-medium border-0">
              <CardContent className="p-4">
                <div className="flex space-x-3">
                  <Button className="flex-1 gradient-primary">
                    Book Appointment
                  </Button>
                  <Button variant="outline" className="flex-1">
                    Download Quote
                  </Button>
                </div>
              </CardContent>
            </Card>
          )}
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 animate-fade-in">
      {/* Header */}
      <div className="glassmorphism sticky top-0 z-50 border-b border-white/20">
        <div className="flex items-center justify-between p-4">
          <div className="flex items-center space-x-4">
            <Button variant="ghost" size="icon" onClick={onBack}>
              <ArrowLeft className="h-5 w-5" />
            </Button>
            <div>
              <h1 className="font-semibold">Your Quotations</h1>
              <p className="text-sm text-muted-foreground">Track your service quotes</p>
            </div>
          </div>
          <Dialog open={isCreatingQuote} onOpenChange={setIsCreatingQuote}>
            <DialogTrigger asChild>
              <Button className="gradient-primary shadow-medium">
                <Plus className="h-4 w-4 mr-2" />
                New Quote
              </Button>
            </DialogTrigger>
            <DialogContent className="w-[95vw] max-w-md mx-auto">
              <DialogHeader>
                <DialogTitle>Request New Quote</DialogTitle>
                <DialogDescription>
                  Tell us about the service you need for your car.
                </DialogDescription>
              </DialogHeader>
              <div className="space-y-4 py-4">
                <div>
                  <label className="text-sm font-medium">Select Car</label>
                  <select 
                    className="w-full mt-1 p-2 border rounded-lg"
                    value={newQuote.carRego}
                    onChange={(e) => setNewQuote({...newQuote, carRego: e.target.value})}
                  >
                    <option value="">Choose your car...</option>
                    {carOptions.map(car => (
                      <option key={car} value={car.split(' - ')[0]}>{car}</option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="text-sm font-medium">Service Type</label>
                  <select 
                    className="w-full mt-1 p-2 border rounded-lg"
                    value={newQuote.service}
                    onChange={(e) => setNewQuote({...newQuote, service: e.target.value})}
                  >
                    <option value="">Select service...</option>
                    {serviceOptions.map(service => (
                      <option key={service} value={service}>{service}</option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="text-sm font-medium">Description</label>
                  <Textarea
                    className="mt-1"
                    placeholder="Describe the issue or service needed..."
                    value={newQuote.description}
                    onChange={(e) => setNewQuote({...newQuote, description: e.target.value})}
                    rows={4}
                  />
                </div>
              </div>
              <div className="flex justify-end space-x-2">
                <Button variant="outline" onClick={() => setIsCreatingQuote(false)}>
                  Cancel
                </Button>
                <Button 
                  onClick={handleCreateQuote} 
                  disabled={!newQuote.carRego || !newQuote.service || !newQuote.description}
                >
                  Submit Request
                </Button>
              </div>
            </DialogContent>
          </Dialog>
        </div>
      </div>

      <div className="p-4 space-y-4">
        {quotations.map((quotation) => {
          const statusInfo = getStatusInfo(quotation.status);
          const StatusIcon = statusInfo.icon;
          
          return (
            <Card 
              key={quotation.id} 
              className="shadow-medium border-0 hover-lift cursor-pointer"
              onClick={() => setSelectedQuotation(quotation)}
            >
              <CardContent className="p-4">
                <div className="flex items-center justify-between mb-3">
                  <div>
                    <h3 className="font-semibold">{quotation.id}</h3>
                    <p className="text-sm text-muted-foreground">
                      {quotation.carRego} • {quotation.service}
                    </p>
                  </div>
                  <Badge variant="secondary" className={`${statusInfo.bg} ${statusInfo.color} border-0`}>
                    <StatusIcon className="h-3 w-3 mr-1" />
                    {statusInfo.label}
                  </Badge>
                </div>

                <p className="text-sm text-muted-foreground mb-3 line-clamp-2">
                  {quotation.description}
                </p>

                <div className="flex items-center justify-between text-sm">
                  <div className="flex items-center space-x-4">
                    {quotation.amount && (
                      <span className="font-semibold text-lg">{quotation.amount}</span>
                    )}
                    <div className="flex items-center space-x-1 text-muted-foreground">
                      <MessageCircle className="h-4 w-4" />
                      <span>{quotation.messageCount}</span>
                    </div>
                  </div>
                  <span className="text-muted-foreground">
                    {new Date(quotation.createdDate).toLocaleDateString()}
                  </span>
                </div>
              </CardContent>
            </Card>
          );
        })}

        {quotations.length === 0 && (
          <Card className="shadow-medium border-0">
            <CardContent className="p-8 text-center">
              <FileText className="h-16 w-16 mx-auto mb-4 text-muted-foreground opacity-50" />
              <h3 className="font-medium mb-2">No quotations yet</h3>
              <p className="text-sm text-muted-foreground mb-4">
                Request your first quote to get started with our services.
              </p>
              <Button onClick={() => setIsCreatingQuote(true)} className="gradient-primary">
                <Plus className="h-4 w-4 mr-2" />
                Request First Quote
              </Button>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
}