import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Textarea } from './ui/textarea';
import { Badge } from './ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { Separator } from './ui/separator';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from './ui/dialog';
import { 
  ArrowLeft,
  Plus,
  Receipt,
  Search,
  Filter,
  Download,
  Send,
  Eye,
  Edit,
  Trash2,
  Calendar,
  User,
  Car,
  DollarSign,
  CheckCircle,
  Clock,
  AlertCircle,
  FileText,
  Printer
} from 'lucide-react';

interface InvoicePageProps {
  onBack: () => void;
}

export function InvoicePage({ onBack }: InvoicePageProps) {
  const [activeTab, setActiveTab] = useState<'all' | 'draft' | 'sent' | 'paid' | 'overdue'>('all');
  const [selectedBooking, setSelectedBooking] = useState<any>(null);
  const [showCreateInvoice, setShowCreateInvoice] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');

  // Mock data for completed bookings that can be invoiced
  const completedBookings = [
    {
      id: 'BK001',
      customerName: 'John Smith',
      customerEmail: 'john@email.com',
      customerPhone: '+64 21 123 4567',
      carRego: 'ABC123',
      carDetails: '2020 Toyota Camry',
      serviceDate: '2024-02-20',
      services: [
        { name: 'Full Service', price: 180, quantity: 1 },
        { name: 'Oil Change', price: 60, quantity: 1 },
        { name: 'Brake Inspection', price: 40, quantity: 1 }
      ],
      parts: [
        { name: 'Engine Oil 5W-30', price: 45, quantity: 1 },
        { name: 'Oil Filter', price: 25, quantity: 1 }
      ],
      notes: 'All services completed successfully. Next service due in 6 months.',
      invoiceStatus: null // Not invoiced yet
    },
    {
      id: 'BK002',
      customerName: 'Sarah Wilson',
      customerEmail: 'sarah@email.com',
      customerPhone: '+64 21 987 6543',
      carRego: 'XYZ789',
      carDetails: '2018 Honda Civic',
      serviceDate: '2024-02-18',
      services: [
        { name: 'WOF Inspection', price: 65, quantity: 1 },
        { name: 'Tire Rotation', price: 30, quantity: 1 }
      ],
      parts: [],
      notes: 'WOF passed. Tires rotated for even wear.',
      invoiceStatus: null
    }
  ];

  // Mock existing invoices
  const existingInvoices = [
    {
      id: 'INV001',
      number: 'INV-2024-001',
      bookingId: 'BK003',
      customerName: 'Mike Johnson',
      carRego: 'DEF456',
      amount: 285.50,
      status: 'paid',
      dueDate: '2024-02-15',
      paidDate: '2024-02-14',
      createdDate: '2024-02-01'
    },
    {
      id: 'INV002',
      number: 'INV-2024-002',
      bookingId: 'BK004',
      customerName: 'Lisa Brown',
      carRego: 'GHI789',
      amount: 150.00,
      status: 'sent',
      dueDate: '2024-03-01',
      paidDate: null,
      createdDate: '2024-02-15'
    },
    {
      id: 'INV003',
      number: 'INV-2024-003',
      bookingId: 'BK005',
      customerName: 'David Lee',
      carRego: 'JKL012',
      amount: 320.75,
      status: 'overdue',
      dueDate: '2024-02-10',
      paidDate: null,
      createdDate: '2024-01-25'
    }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'paid': return 'bg-green-100 text-green-700';
      case 'sent': return 'bg-blue-100 text-blue-700';
      case 'draft': return 'bg-gray-100 text-gray-700';
      case 'overdue': return 'bg-red-100 text-red-700';
      default: return 'bg-gray-100 text-gray-700';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'paid': return <CheckCircle className="h-4 w-4" />;
      case 'sent': return <Send className="h-4 w-4" />;
      case 'draft': return <Edit className="h-4 w-4" />;
      case 'overdue': return <AlertCircle className="h-4 w-4" />;
      default: return <FileText className="h-4 w-4" />;
    }
  };

  const filteredInvoices = existingInvoices.filter(invoice => {
    if (activeTab !== 'all' && invoice.status !== activeTab) return false;
    if (searchTerm && !invoice.customerName.toLowerCase().includes(searchTerm.toLowerCase()) &&
        !invoice.number.toLowerCase().includes(searchTerm.toLowerCase())) return false;
    return true;
  });

  const calculateBookingTotal = (booking: any) => {
    const servicesTotal = booking.services.reduce((sum: number, service: any) => sum + (service.price * service.quantity), 0);
    const partsTotal = booking.parts.reduce((sum: number, part: any) => sum + (part.price * part.quantity), 0);
    const subtotal = servicesTotal + partsTotal;
    const gst = subtotal * 0.15; // 15% GST
    return {
      servicesTotal,
      partsTotal,
      subtotal,
      gst,
      total: subtotal + gst
    };
  };

  const handleCreateInvoice = (booking: any) => {
    setSelectedBooking(booking);
    setShowCreateInvoice(true);
  };

  const CreateInvoiceDialog = () => {
    if (!selectedBooking) return null;

    const [invoiceServices, setInvoiceServices] = useState(selectedBooking.services || []);
    const [invoiceParts, setInvoiceParts] = useState(selectedBooking.parts || []);
    const [labourCharge, setLabourCharge] = useState(0);
    const [diagnosticCharge, setDiagnosticCharge] = useState(0);
    const [otherCharges, setOtherCharges] = useState([]);

    // Service templates
    const serviceTemplates = [
      { name: 'Full Service', price: 180, category: 'service' },
      { name: 'Oil Change', price: 60, category: 'service' },
      { name: 'Brake Service', price: 120, category: 'brake' },
      { name: 'Suspension Check', price: 80, category: 'suspension' },
      { name: 'Diagnostic', price: 100, category: 'diagnostic' },
      { name: 'WOF Inspection', price: 65, category: 'other' },
      { name: 'Tire Rotation', price: 30, category: 'other' },
      { name: 'Transmission Service', price: 150, category: 'other' },
      { name: 'Cooling System Service', price: 90, category: 'other' },
      { name: 'Wheel Alignment', price: 85, category: 'other' }
    ];

    // Parts templates
    const partsTemplates = [
      { name: 'Engine Oil 5W-30', price: 45, category: 'full-service' },
      { name: 'Oil Filter', price: 25, category: 'full-service' },
      { name: 'Air Filter', price: 35, category: 'full-service' },
      { name: 'Fuel Filter', price: 40, category: 'full-service' },
      { name: 'Spark Plugs (Set of 4)', price: 60, category: 'full-service' },
      { name: 'Brake Pads Front', price: 80, category: 'brake' },
      { name: 'Brake Pads Rear', price: 70, category: 'brake' },
      { name: 'Brake Discs Front', price: 120, category: 'brake' },
      { name: 'Brake Fluid', price: 25, category: 'brake' },
      { name: 'Shock Absorber', price: 95, category: 'suspension' },
      { name: 'Strut Assembly', price: 180, category: 'suspension' },
      { name: 'Ball Joint', price: 55, category: 'suspension' }
    ];

    const addService = (template: any) => {
      setInvoiceServices([...invoiceServices, { ...template, quantity: 1, id: Date.now() }]);
    };

    const addPart = (template: any) => {
      setInvoiceParts([...invoiceParts, { ...template, quantity: 1, id: Date.now() }]);
    };

    const updateServiceQuantity = (id: number, quantity: number) => {
      setInvoiceServices(invoiceServices.map(s => s.id === id ? { ...s, quantity } : s));
    };

    const updateServicePrice = (id: number, price: number) => {
      setInvoiceServices(invoiceServices.map(s => s.id === id ? { ...s, price } : s));
    };

    const updatePartQuantity = (id: number, quantity: number) => {
      setInvoiceParts(invoiceParts.map(p => p.id === id ? { ...p, quantity } : p));
    };

    const updatePartPrice = (id: number, price: number) => {
      setInvoiceParts(invoiceParts.map(p => p.id === id ? { ...p, price } : p));
    };

    const removeService = (id: number) => {
      setInvoiceServices(invoiceServices.filter(s => s.id !== id));
    };

    const removePart = (id: number) => {
      setInvoiceParts(invoiceParts.filter(p => p.id !== id));
    };

    const addOtherCharge = () => {
      setOtherCharges([...otherCharges, { id: Date.now(), name: '', price: 0 }]);
    };

    const updateOtherCharge = (id: number, field: string, value: any) => {
      setOtherCharges(otherCharges.map(charge => 
        charge.id === id ? { ...charge, [field]: value } : charge
      ));
    };

    const removeOtherCharge = (id: number) => {
      setOtherCharges(otherCharges.filter(charge => charge.id !== id));
    };

    const calculateTotals = () => {
      const servicesTotal = invoiceServices.reduce((sum, service) => sum + (service.price * service.quantity), 0);
      const partsTotal = invoiceParts.reduce((sum, part) => sum + (part.price * part.quantity), 0);
      const otherTotal = otherCharges.reduce((sum, charge) => sum + charge.price, 0);
      const subtotal = servicesTotal + partsTotal + labourCharge + diagnosticCharge + otherTotal;
      const gst = subtotal * 0.15;
      return {
        servicesTotal,
        partsTotal,
        labourCharge,
        diagnosticCharge,
        otherTotal,
        subtotal,
        gst,
        total: subtotal + gst
      };
    };

    const totals = calculateTotals();

    return (
      <Dialog open={showCreateInvoice} onOpenChange={setShowCreateInvoice}>
        <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>Create Invoice - {selectedBooking.id}</DialogTitle>
            <DialogDescription>
              Customize services, parts and charges for {selectedBooking.customerName}
            </DialogDescription>
          </DialogHeader>
          
          <div className="space-y-6">
            {/* Customer & Booking Info */}
            <Card>
              <CardHeader className="pb-3">
                <CardTitle className="text-lg">Booking Details</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label className="text-xs font-medium text-muted-foreground">CUSTOMER</Label>
                    <p className="font-medium">{selectedBooking.customerName}</p>
                    <p className="text-sm text-muted-foreground">{selectedBooking.customerEmail}</p>
                    <p className="text-sm text-muted-foreground">{selectedBooking.customerPhone}</p>
                  </div>
                  <div>
                    <Label className="text-xs font-medium text-muted-foreground">VEHICLE</Label>
                    <p className="font-medium">{selectedBooking.carRego}</p>
                    <p className="text-sm text-muted-foreground">{selectedBooking.carDetails}</p>
                    <p className="text-sm text-muted-foreground">Service: {selectedBooking.serviceDate}</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Services Section */}
            <Card>
              <CardHeader className="pb-3">
                <CardTitle className="text-lg flex items-center justify-between">
                  Services
                  <div className="flex space-x-2">
                    <Select onValueChange={(value) => {
                      const template = serviceTemplates.find(t => t.name === value);
                      if (template) addService(template);
                    }}>
                      <SelectTrigger className="w-48">
                        <SelectValue placeholder="Add Service" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Full Service">Full Service - $180</SelectItem>
                        <SelectItem value="Oil Change">Oil Change - $60</SelectItem>
                        <SelectItem value="Brake Service">Brake Service - $120</SelectItem>
                        <SelectItem value="Suspension Check">Suspension Check - $80</SelectItem>
                        <SelectItem value="Diagnostic">Diagnostic - $100</SelectItem>
                        <SelectItem value="WOF Inspection">WOF Inspection - $65</SelectItem>
                        <SelectItem value="Tire Rotation">Tire Rotation - $30</SelectItem>
                        <SelectItem value="Transmission Service">Transmission Service - $150</SelectItem>
                        <SelectItem value="Cooling System Service">Cooling System Service - $90</SelectItem>
                        <SelectItem value="Wheel Alignment">Wheel Alignment - $85</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {invoiceServices.map((service, index) => (
                    <div key={service.id || index} className="flex items-center space-x-3 p-3 bg-gray-50 rounded-lg">
                      <div className="flex-1">
                        <Input 
                          value={service.name} 
                          onChange={(e) => {
                            const updated = invoiceServices.map(s => 
                              s.id === service.id ? { ...s, name: e.target.value } : s
                            );
                            setInvoiceServices(updated);
                          }}
                          placeholder="Service name"
                        />
                      </div>
                      <div className="w-20">
                        <Input 
                          type="number" 
                          value={service.quantity} 
                          onChange={(e) => updateServiceQuantity(service.id, parseInt(e.target.value))}
                          min="1"
                        />
                      </div>
                      <div className="w-24">
                        <Input 
                          type="number" 
                          value={service.price} 
                          onChange={(e) => updateServicePrice(service.id, parseFloat(e.target.value))}
                          step="0.01"
                        />
                      </div>
                      <div className="w-20 text-right font-medium">
                        ${(service.price * service.quantity).toFixed(2)}
                      </div>
                      <Button 
                        variant="ghost" 
                        size="sm"
                        onClick={() => removeService(service.id)}
                        className="text-red-600"
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Parts Section */}
            <Card>
              <CardHeader className="pb-3">
                <CardTitle className="text-lg flex items-center justify-between">
                  Parts
                  <div className="flex space-x-2">
                    <Select onValueChange={(value) => {
                      const template = partsTemplates.find(t => t.name === value);
                      if (template) addPart(template);
                    }}>
                      <SelectTrigger className="w-48">
                        <SelectValue placeholder="Add Part" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Engine Oil 5W-30">Engine Oil 5W-30 - $45</SelectItem>
                        <SelectItem value="Oil Filter">Oil Filter - $25</SelectItem>
                        <SelectItem value="Air Filter">Air Filter - $35</SelectItem>
                        <SelectItem value="Fuel Filter">Fuel Filter - $40</SelectItem>
                        <SelectItem value="Spark Plugs (Set of 4)">Spark Plugs (Set of 4) - $60</SelectItem>
                        <SelectItem value="Brake Pads Front">Brake Pads Front - $80</SelectItem>
                        <SelectItem value="Brake Pads Rear">Brake Pads Rear - $70</SelectItem>
                        <SelectItem value="Brake Discs Front">Brake Discs Front - $120</SelectItem>
                        <SelectItem value="Brake Fluid">Brake Fluid - $25</SelectItem>
                        <SelectItem value="Shock Absorber">Shock Absorber - $95</SelectItem>
                        <SelectItem value="Strut Assembly">Strut Assembly - $180</SelectItem>
                        <SelectItem value="Ball Joint">Ball Joint - $55</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {invoiceParts.map((part, index) => (
                    <div key={part.id || index} className="flex items-center space-x-3 p-3 bg-gray-50 rounded-lg">
                      <div className="flex-1">
                        <Input 
                          value={part.name} 
                          onChange={(e) => {
                            const updated = invoiceParts.map(p => 
                              p.id === part.id ? { ...p, name: e.target.value } : p
                            );
                            setInvoiceParts(updated);
                          }}
                          placeholder="Part name"
                        />
                      </div>
                      <div className="w-20">
                        <Input 
                          type="number" 
                          value={part.quantity} 
                          onChange={(e) => updatePartQuantity(part.id, parseInt(e.target.value))}
                          min="1"
                        />
                      </div>
                      <div className="w-24">
                        <Input 
                          type="number" 
                          value={part.price} 
                          onChange={(e) => updatePartPrice(part.id, parseFloat(e.target.value))}
                          step="0.01"
                        />
                      </div>
                      <div className="w-20 text-right font-medium">
                        ${(part.price * part.quantity).toFixed(2)}
                      </div>
                      <Button 
                        variant="ghost" 
                        size="sm"
                        onClick={() => removePart(part.id)}
                        className="text-red-600"
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Additional Charges */}
            <Card>
              <CardHeader className="pb-3">
                <CardTitle className="text-lg">Additional Charges</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label>Labour Charge</Label>
                    <Input 
                      type="number" 
                      value={labourCharge} 
                      onChange={(e) => setLabourCharge(parseFloat(e.target.value) || 0)}
                      step="0.01"
                      placeholder="0.00"
                    />
                  </div>
                  <div>
                    <Label>Diagnostic Charge</Label>
                    <Input 
                      type="number" 
                      value={diagnosticCharge} 
                      onChange={(e) => setDiagnosticCharge(parseFloat(e.target.value) || 0)}
                      step="0.01"
                      placeholder="0.00"
                    />
                  </div>
                </div>

                {/* Other Manual Charges */}
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <Label>Other Charges</Label>
                    <Button variant="outline" size="sm" onClick={addOtherCharge}>
                      <Plus className="h-4 w-4 mr-2" />
                      Add Charge
                    </Button>
                  </div>
                  <div className="space-y-2">
                    {otherCharges.map((charge) => (
                      <div key={charge.id} className="flex items-center space-x-3">
                        <Input 
                          value={charge.name} 
                          onChange={(e) => updateOtherCharge(charge.id, 'name', e.target.value)}
                          placeholder="Charge description"
                          className="flex-1"
                        />
                        <Input 
                          type="number" 
                          value={charge.price} 
                          onChange={(e) => updateOtherCharge(charge.id, 'price', parseFloat(e.target.value) || 0)}
                          step="0.01"
                          placeholder="0.00"
                          className="w-32"
                        />
                        <Button 
                          variant="ghost" 
                          size="sm"
                          onClick={() => removeOtherCharge(charge.id)}
                          className="text-red-600"
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Invoice Totals */}
            <Card>
              <CardHeader className="pb-3">
                <CardTitle className="text-lg">Invoice Summary</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span>Services Subtotal:</span>
                    <span>${totals.servicesTotal.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Parts Subtotal:</span>
                    <span>${totals.partsTotal.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Labour Charge:</span>
                    <span>${totals.labourCharge.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Diagnostic Charge:</span>
                    <span>${totals.diagnosticCharge.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Other Charges:</span>
                    <span>${totals.otherTotal.toFixed(2)}</span>
                  </div>
                  <Separator />
                  <div className="flex justify-between">
                    <span>Subtotal:</span>
                    <span>${totals.subtotal.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>GST (15%):</span>
                    <span>${totals.gst.toFixed(2)}</span>
                  </div>
                  <Separator />
                  <div className="flex justify-between font-semibold text-lg">
                    <span>Total:</span>
                    <span>${totals.total.toFixed(2)}</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Invoice Options */}
            <Card>
              <CardHeader className="pb-3">
                <CardTitle className="text-lg">Invoice Options</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="dueDate">Due Date</Label>
                    <Input id="dueDate" type="date" defaultValue="2024-03-15" />
                  </div>
                  <div>
                    <Label htmlFor="paymentTerms">Payment Terms</Label>
                    <Select defaultValue="30">
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="immediate">Due Immediately</SelectItem>
                        <SelectItem value="7">Net 7 Days</SelectItem>
                        <SelectItem value="14">Net 14 Days</SelectItem>
                        <SelectItem value="30">Net 30 Days</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                
                <div>
                  <Label htmlFor="notes">Invoice Notes</Label>
                  <Textarea 
                    id="notes" 
                    placeholder="Additional notes for the invoice..."
                    defaultValue={selectedBooking.notes}
                  />
                </div>
              </CardContent>
            </Card>

            {/* Action Buttons */}
            <div className="flex space-x-3">
              <Button onClick={() => setShowCreateInvoice(false)} variant="outline" className="flex-1">
                Cancel
              </Button>
              <Button 
                onClick={() => {
                  alert('Invoice created successfully!');
                  setShowCreateInvoice(false);
                }}
                className="flex-1"
              >
                <Receipt className="h-4 w-4 mr-2" />
                Create Invoice
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    );
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50">
      {/* Header */}
      <div className="glassmorphism sticky top-0 z-50 border-b border-white/20">
        <div className="flex items-center justify-between p-4">
          <div className="flex items-center space-x-4">
            <Button 
              variant="ghost" 
              size="lg" 
              onClick={onBack}
              className="hover:bg-white/20 transition-all duration-200"
            >
              <ArrowLeft className="h-6 w-6" />
            </Button>
            <div>
              <h1 className="font-semibold text-lg">Invoice Management</h1>
              <p className="text-sm text-muted-foreground">Create and manage customer invoices</p>
            </div>
          </div>
          <Button className="gradient-primary">
            <Plus className="h-4 w-4 mr-2" />
            New Invoice
          </Button>
        </div>
      </div>

      <div className="p-4 space-y-6">
        {/* Available Bookings to Invoice */}
        <Card className="shadow-medium border-0 animate-slide-up">
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <div className="w-8 h-8 gradient-success rounded-lg flex items-center justify-center">
                <CheckCircle className="h-4 w-4 text-white" />
              </div>
              <span>Ready to Invoice</span>
              <Badge variant="secondary">{completedBookings.length}</Badge>
            </CardTitle>
          </CardHeader>
          <CardContent>
            {completedBookings.length > 0 ? (
              <div className="space-y-3">
                {completedBookings.map((booking) => {
                  const totals = calculateBookingTotal(booking);
                  
                  return (
                    <div key={booking.id} className="p-4 bg-white border rounded-lg hover:shadow-soft transition-shadow">
                      <div className="flex items-center justify-between mb-3">
                        <div>
                          <h4 className="font-medium">{booking.customerName}</h4>
                          <p className="text-sm text-muted-foreground">
                            {booking.carRego} • {booking.serviceDate}
                          </p>
                        </div>
                        <div className="text-right">
                          <p className="font-semibold">${totals.total.toFixed(2)}</p>
                          <p className="text-xs text-muted-foreground">Total</p>
                        </div>
                      </div>
                      
                      <div className="text-sm text-muted-foreground mb-3">
                        Services: {booking.services.map(s => s.name).join(', ')}
                        {booking.parts.length > 0 && ` + ${booking.parts.length} parts`}
                      </div>
                      
                      <div className="flex space-x-2">
                        <Button 
                          size="sm" 
                          onClick={() => handleCreateInvoice(booking)}
                          className="gradient-primary"
                        >
                          <Receipt className="h-4 w-4 mr-1" />
                          Create Invoice
                        </Button>
                        <Button size="sm" variant="outline">
                          <Eye className="h-4 w-4 mr-1" />
                          View Details
                        </Button>
                      </div>
                    </div>
                  );
                })}
              </div>
            ) : (
              <div className="text-center py-8 text-muted-foreground">
                <Receipt className="h-12 w-12 mx-auto mb-2 opacity-50" />
                <p>No completed bookings ready for invoicing</p>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Existing Invoices */}
        <Card className="shadow-medium border-0 animate-slide-up" style={{ animationDelay: '0.1s' }}>
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle className="flex items-center space-x-2">
                <div className="w-8 h-8 gradient-primary rounded-lg flex items-center justify-center">
                  <FileText className="h-4 w-4 text-white" />
                </div>
                <span>All Invoices</span>
              </CardTitle>
              
              <div className="flex items-center space-x-2">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input
                    placeholder="Search invoices..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-9 w-48"
                  />
                </div>
                <Button variant="outline" size="sm">
                  <Filter className="h-4 w-4 mr-1" />
                  Filter
                </Button>
              </div>
            </div>
            
            {/* Status Tabs */}
            <div className="flex space-x-1 bg-muted rounded-lg p-1 mt-4">
              {[
                { key: 'all', label: 'All', count: existingInvoices.length },
                { key: 'paid', label: 'Paid', count: existingInvoices.filter(i => i.status === 'paid').length },
                { key: 'sent', label: 'Sent', count: existingInvoices.filter(i => i.status === 'sent').length },
                { key: 'overdue', label: 'Overdue', count: existingInvoices.filter(i => i.status === 'overdue').length }
              ].map((tab) => (
                <Button
                  key={tab.key}
                  variant={activeTab === tab.key ? 'secondary' : 'ghost'}
                  size="sm"
                  onClick={() => setActiveTab(tab.key as any)}
                  className="flex-1"
                >
                  {tab.label} ({tab.count})
                </Button>
              ))}
            </div>
          </CardHeader>
          
          <CardContent>
            <div className="space-y-3">
              {filteredInvoices.map((invoice) => (
                <div key={invoice.id} className="p-4 bg-white border rounded-lg hover:shadow-soft transition-shadow">
                  <div className="flex items-center justify-between mb-3">
                    <div>
                      <div className="flex items-center space-x-2 mb-1">
                        <h4 className="font-medium">{invoice.number}</h4>
                        <Badge className={getStatusColor(invoice.status)}>
                          {getStatusIcon(invoice.status)}
                          <span className="ml-1 capitalize">{invoice.status}</span>
                        </Badge>
                      </div>
                      <p className="text-sm text-muted-foreground">
                        {invoice.customerName} • {invoice.carRego}
                      </p>
                    </div>
                    <div className="text-right">
                      <p className="font-semibold">${invoice.amount.toFixed(2)}</p>
                      <p className="text-xs text-muted-foreground">
                        Due: {invoice.dueDate}
                      </p>
                    </div>
                  </div>
                  
                  <div className="flex space-x-2">
                    <Button size="sm" variant="outline">
                      <Eye className="h-4 w-4 mr-1" />
                      View
                    </Button>
                    <Button size="sm" variant="outline">
                      <Download className="h-4 w-4 mr-1" />
                      Download
                    </Button>
                    {invoice.status !== 'paid' && (
                      <Button size="sm" variant="outline">
                        <Send className="h-4 w-4 mr-1" />
                        Send
                      </Button>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      <CreateInvoiceDialog />
    </div>
  );
}