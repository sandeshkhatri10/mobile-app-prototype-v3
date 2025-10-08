import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { Textarea } from './ui/textarea';
import { 
  ArrowLeft, 
  Phone,
  Mail,
  Image,
  Video,
  Send,
  MessageCircle,
  Car,
  User,
  Calendar,
  DollarSign
} from 'lucide-react';

interface QuotationViewProps {
  quotationId: string;
  onBack: () => void;
}

export function QuotationView({ quotationId, onBack }: QuotationViewProps) {
  const [replyMessage, setReplyMessage] = useState('');
  const [messages, setMessages] = useState([
    {
      id: 1,
      sender: 'customer',
      message: 'Hi, I need a quote for my car. The engine is making a strange noise when I start it.',
      timestamp: '2024-01-20 10:30 AM',
    },
    {
      id: 2,
      sender: 'business',
      message: 'Thanks for contacting us. Can you send a video of the noise? This will help us give you a more accurate quote.',
      timestamp: '2024-01-20 11:15 AM',
    },
    {
      id: 3,
      sender: 'customer',
      message: 'Sure, I\'ve uploaded a video. You can hear the noise clearly when I turn the key.',
      timestamp: '2024-01-20 11:45 AM',
    },
  ]);

  // Mock quotation data
  const quotation = {
    id: 'QT-001',
    customer: 'David Brown',
    phone: '+64 21 987 6543',
    email: 'david.brown@email.com',
    carRego: 'PQR678',
    carMake: 'Toyota Camry 2019',
    issue: 'Engine making strange noise, possible timing belt issue',
    amount: '$1,250',
    status: 'pending',
    createdDate: '2024-01-20',
    photos: ['engine_photo1.jpg', 'engine_photo2.jpg'],
    videos: ['engine_noise.mp4'],
  };

  const handleSendReply = () => {
    if (replyMessage.trim()) {
      const newMessage = {
        id: messages.length + 1,
        sender: 'business',
        message: replyMessage,
        timestamp: new Date().toLocaleString(),
      };
      setMessages([...messages, newMessage]);
      setReplyMessage('');
    }
  };

  const handlePhoneCall = () => {
    // In a real app, this would initiate a phone call
    window.open(`tel:${quotation.phone}`);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm border-b">
        <div className="flex items-center justify-between p-4">
          <div className="flex items-center">
            <Button variant="ghost" size="icon" onClick={onBack} className="mr-3">
              <ArrowLeft className="h-5 w-5" />
            </Button>
            <div>
              <h1 className="font-semibold">Quotation {quotation.id}</h1>
              <p className="text-sm text-muted-foreground">{quotation.customer}</p>
            </div>
          </div>
          <div className="flex space-x-2">
            <Button variant="outline" size="sm" onClick={handlePhoneCall}>
              <Phone className="h-4 w-4 mr-2" />
              Call
            </Button>
            <Button variant="outline" size="sm">
              <Mail className="h-4 w-4 mr-2" />
              Email
            </Button>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="p-4 space-y-6">
        {/* Quotation Details */}
        <Card>
          <CardHeader>
            <CardTitle>Quotation Details</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-3">
                <div className="flex items-center space-x-2">
                  <User className="h-4 w-4 text-muted-foreground" />
                  <div>
                    <p className="text-sm font-medium">{quotation.customer}</p>
                    <p className="text-xs text-muted-foreground">{quotation.phone}</p>
                    <p className="text-xs text-muted-foreground">{quotation.email}</p>
                  </div>
                </div>
                <div className="flex items-center space-x-2">
                  <Car className="h-4 w-4 text-muted-foreground" />
                  <div>
                    <p className="text-sm font-medium">{quotation.carRego}</p>
                    <p className="text-xs text-muted-foreground">{quotation.carMake}</p>
                  </div>
                </div>
              </div>
              <div className="space-y-3">
                <div className="flex items-center space-x-2">
                  <Calendar className="h-4 w-4 text-muted-foreground" />
                  <div>
                    <p className="text-sm font-medium">Created</p>
                    <p className="text-xs text-muted-foreground">{quotation.createdDate}</p>
                  </div>
                </div>
                <div className="flex items-center space-x-2">
                  <DollarSign className="h-4 w-4 text-muted-foreground" />
                  <div>
                    <p className="text-sm font-medium">{quotation.amount}</p>
                    <Badge variant={quotation.status === 'approved' ? 'default' : 'secondary'}>
                      {quotation.status}
                    </Badge>
                  </div>
                </div>
              </div>
            </div>
            
            <div>
              <h4 className="font-medium mb-2">Issue Description</h4>
              <p className="text-sm text-muted-foreground">{quotation.issue}</p>
            </div>

            {/* Media Files */}
            <div className="space-y-3">
              <h4 className="font-medium">Uploaded Media</h4>
              <div className="flex space-x-2">
                {quotation.photos.map((photo, index) => (
                  <Button key={index} variant="outline" size="sm">
                    <Image className="h-4 w-4 mr-1" />
                    Photo {index + 1}
                  </Button>
                ))}
                {quotation.videos.map((video, index) => (
                  <Button key={index} variant="outline" size="sm">
                    <Video className="h-4 w-4 mr-1" />
                    Video {index + 1}
                  </Button>
                ))}
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Conversation History */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <MessageCircle className="h-5 w-5" />
              <span>Conversation</span>
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="max-h-64 overflow-y-auto space-y-3">
              {messages.map((message) => (
                <div
                  key={message.id}
                  className={`flex ${message.sender === 'business' ? 'justify-end' : 'justify-start'}`}
                >
                  <div
                    className={`max-w-xs p-3 rounded-lg ${
                      message.sender === 'business'
                        ? 'bg-blue-600 text-white'
                        : 'bg-gray-100 text-gray-900'
                    }`}
                  >
                    <p className="text-sm">{message.message}</p>
                    <p className={`text-xs mt-1 ${
                      message.sender === 'business' ? 'text-blue-100' : 'text-gray-500'
                    }`}>
                      {message.timestamp}
                    </p>
                  </div>
                </div>
              ))}
            </div>
            
            {/* Reply Input */}
            <div className="space-y-3 border-t pt-4">
              <Textarea
                placeholder="Type your reply here..."
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
                <Button onClick={handleSendReply} disabled={!replyMessage.trim()}>
                  <Send className="h-4 w-4 mr-2" />
                  Send Reply
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Quick Actions */}
        <Card>
          <CardHeader>
            <CardTitle>Quick Actions</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <div className="grid grid-cols-2 gap-3">
              <Button variant="outline">
                Update Quote
              </Button>
              <Button variant="outline">
                Send Final Quote
              </Button>
              <Button variant="outline">
                Schedule Appointment
              </Button>
              <Button>
                Approve & Invoice
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}