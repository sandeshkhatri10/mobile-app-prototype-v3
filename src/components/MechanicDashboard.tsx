import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Avatar, AvatarFallback } from './ui/avatar';
import { Badge } from './ui/badge';
import { Progress } from './ui/progress';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Textarea } from './ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from './ui/dialog';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import { 
  LogOut,
  Clock,
  Play,
  Pause,
  Square,
  CheckCircle,
  AlertTriangle,
  Car,
  User,
  Calendar,
  MapPin,
  Camera,
  Video,
  Upload,
  MessageSquare,
  FileText,
  Timer,
  Wrench,
  Settings,
  History,
  Search,
  Filter,
  MoreVertical,
  Eye,
  Download,
  Smartphone,
  Bell,
  Activity,
  Award,
  TrendingUp,
  Zap,
  Shield
} from 'lucide-react';

interface MechanicDashboardProps {
  onLogout: () => void;
}

type JobStatus = 'assigned' | 'in-progress' | 'on-hold' | 'completed' | 'pending-review';
type JobPriority = 'low' | 'medium' | 'high' | 'urgent';

interface Job {
  id: string;
  customerName: string;
  customerPhone: string;
  vehicleRego: string;
  vehicleMake: string;
  vehicleModel: string;
  vehicleYear: number;
  serviceType: string;
  serviceName: string;
  scheduledDate: string;
  scheduledTime: string;
  estimatedDuration: number; // in minutes
  actualDuration?: number;
  status: JobStatus;
  priority: JobPriority;
  description: string;
  notes?: string;
  location: string;
  startTime?: string;
  endTime?: string;
  pausedTime?: number; // total paused time in minutes
  holdReason?: string;
  completionPhotos?: File[];
  completionVideos?: File[];
  completionNotes?: string;
  customerRating?: number;
}

export function MechanicDashboard({ onLogout }: MechanicDashboardProps) {
  const [currentView, setCurrentView] = useState<'today' | 'assigned' | 'history'>('today');
  const [selectedJob, setSelectedJob] = useState<Job | null>(null);
  const [showJobDetails, setShowJobDetails] = useState(false);
  const [activeTimer, setActiveTimer] = useState<string | null>(null);
  const [timerSeconds, setTimerSeconds] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const [uploadedFiles, setUploadedFiles] = useState<File[]>([]);
  const [completionNotes, setCompletionNotes] = useState('');
  const [holdReason, setHoldReason] = useState('');

  // Mock mechanic data
  const mechanicData = {
    name: 'Mike Johnson',
    id: 'MECH001',
    shift: '8:00 AM - 5:00 PM',
    specialties: ['Engine Repair', 'Electrical', 'Brake Systems'],
    completedToday: 3,
    averageRating: 4.8,
    totalJobs: 127
  };

  // Enhanced mock jobs data
  const [jobs, setJobs] = useState<Job[]>([
    {
      id: '1',
      customerName: 'John Smith',
      customerPhone: '+64 21 123 4567',
      vehicleRego: 'ABC123',
      vehicleMake: 'Toyota',
      vehicleModel: 'Camry',
      vehicleYear: 2020,
      serviceType: 'WOF',
      serviceName: 'WOF Inspection',
      scheduledDate: new Date().toISOString().split('T')[0],
      scheduledTime: '09:00',
      estimatedDuration: 30,
      status: 'assigned',
      priority: 'medium',
      description: 'Standard WOF inspection, customer mentioned brake noise',
      location: 'Bay 1',
      notes: 'Customer is waiting - priority'
    },
    {
      id: '2',
      customerName: 'Sarah Wilson',
      customerPhone: '+64 21 234 5678',
      vehicleRego: 'XYZ789',
      vehicleMake: 'Honda',
      vehicleModel: 'Civic',
      vehicleYear: 2018,
      serviceType: 'Service',
      serviceName: 'Full Service',
      scheduledDate: new Date().toISOString().split('T')[0],
      scheduledTime: '10:30',
      estimatedDuration: 90,
      status: 'in-progress',
      priority: 'high',
      description: 'Full service including oil change, filters, and safety check',
      location: 'Bay 2',
      startTime: '10:35',
      actualDuration: 45
    },
    {
      id: '3',
      customerName: 'Michael Brown',
      customerPhone: '+64 21 345 6789',
      vehicleRego: 'DEF456',
      vehicleMake: 'Ford',
      vehicleModel: 'Ranger',
      vehicleYear: 2019,
      serviceType: 'Repair',
      serviceName: 'Brake Repair',
      scheduledDate: new Date().toISOString().split('T')[0],
      scheduledTime: '14:00',
      estimatedDuration: 120,
      status: 'on-hold',
      priority: 'urgent',
      description: 'Emergency brake repair - brake pads completely worn',
      location: 'Bay 3',
      startTime: '14:05',
      holdReason: 'Waiting for brake pad delivery',
      pausedTime: 30
    }
  ]);

  const [jobHistory] = useState<Job[]>([
    {
      id: '4',
      customerName: 'Emma Davis',
      customerPhone: '+64 21 456 7890',
      vehicleRego: 'GHI789',
      vehicleMake: 'Mazda',
      vehicleModel: 'CX-5',
      vehicleYear: 2021,
      serviceType: 'Diagnostic',
      serviceName: 'Engine Diagnostic',
      scheduledDate: '2024-02-20',
      scheduledTime: '09:00',
      estimatedDuration: 60,
      actualDuration: 45,
      status: 'completed',
      priority: 'medium',
      description: 'Check engine light diagnostic',
      location: 'Bay 1',
      startTime: '09:05',
      endTime: '09:50',
      completionNotes: 'Faulty oxygen sensor replaced. Engine running smoothly.',
      customerRating: 5
    }
  ]);

  // Timer effect
  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (activeTimer && !isPaused) {
      interval = setInterval(() => {
        setTimerSeconds(prev => prev + 1);
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [activeTimer, isPaused]);

  const formatTime = (seconds: number) => {
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    const secs = seconds % 60;
    return `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const getStatusColor = (status: JobStatus) => {
    switch (status) {
      case 'assigned': return 'bg-blue-100 text-blue-800 border-blue-200';
      case 'in-progress': return 'bg-green-100 text-green-800 border-green-200';
      case 'on-hold': return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 'completed': return 'bg-emerald-100 text-emerald-800 border-emerald-200';
      case 'pending-review': return 'bg-purple-100 text-purple-800 border-purple-200';
    }
  };

  const getPriorityColor = (priority: JobPriority) => {
    switch (priority) {
      case 'low': return 'bg-gray-500';
      case 'medium': return 'bg-blue-500';
      case 'high': return 'bg-orange-500';
      case 'urgent': return 'bg-red-500';
    }
  };

  const getServiceIcon = (type: string) => {
    switch (type.toLowerCase()) {
      case 'wof': return <Shield className="h-4 w-4" />;
      case 'service': return <Wrench className="h-4 w-4" />;
      case 'repair': return <AlertTriangle className="h-4 w-4" />;
      case 'diagnostic': return <Zap className="h-4 w-4" />;
      default: return <Settings className="h-4 w-4" />;
    }
  };

  const startJob = (jobId: string) => {
    setJobs(prev => prev.map(job => 
      job.id === jobId 
        ? { ...job, status: 'in-progress', startTime: new Date().toLocaleTimeString() }
        : job
    ));
    setActiveTimer(jobId);
    setTimerSeconds(0);
    setIsPaused(false);
  };

  const pauseJob = (jobId: string) => {
    setIsPaused(true);
    setJobs(prev => prev.map(job => 
      job.id === jobId 
        ? { ...job, status: 'on-hold', pausedTime: (job.pausedTime || 0) + Math.floor(timerSeconds / 60) }
        : job
    ));
  };

  const resumeJob = (jobId: string) => {
    setIsPaused(false);
    setJobs(prev => prev.map(job => 
      job.id === jobId 
        ? { ...job, status: 'in-progress' }
        : job
    ));
  };

  const completeJob = (jobId: string) => {
    setJobs(prev => prev.map(job => 
      job.id === jobId 
        ? { 
            ...job, 
            status: 'completed', 
            endTime: new Date().toLocaleTimeString(),
            actualDuration: Math.floor(timerSeconds / 60),
            completionNotes
          }
        : job
    ));
    setActiveTimer(null);
    setTimerSeconds(0);
    setCompletionNotes('');
    setUploadedFiles([]);
  };

  const handleFileUpload = (files: FileList | null) => {
    if (files) {
      const newFiles = Array.from(files);
      setUploadedFiles(prev => [...prev, ...newFiles]);
    }
  };

  const todayJobs = jobs.filter(job => job.scheduledDate === new Date().toISOString().split('T')[0]);
  const assignedJobs = jobs.filter(job => job.status === 'assigned');
  const inProgressJobs = jobs.filter(job => job.status === 'in-progress');
  const onHoldJobs = jobs.filter(job => job.status === 'on-hold');

  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-50 via-blue-50 to-cyan-50 animate-fade-in">
      {/* Header */}
      <div className="glassmorphism sticky top-0 z-50 border-b border-white/20">
        <div className="flex items-center justify-between p-4">
          <div className="flex items-center space-x-4">
            <div className="relative">
              <Avatar className="h-12 w-12 border-2 border-white/30 shadow-lg">
                <AvatarFallback className="bg-gradient-to-r from-emerald-600 to-blue-600 text-white font-semibold">
                  {mechanicData.name.split(' ').map(n => n[0]).join('')}
                </AvatarFallback>
              </Avatar>
              <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-green-500 rounded-full border-2 border-white animate-pulse"></div>
            </div>
            <div>
              <h1 className="font-bold text-lg">Welcome, {mechanicData.name}!</h1>
              <p className="text-sm text-muted-foreground">ID: {mechanicData.id} • Shift: {mechanicData.shift}</p>
            </div>
          </div>
          <div className="flex items-center space-x-2">
            <div className="relative">
              <Button 
                variant="ghost" 
                size="lg" 
                className="hover:bg-white/20 transition-all duration-200"
              >
                <Bell className="h-6 w-6" />
              </Button>
              <div className="absolute -top-1 -right-1 w-5 h-5 bg-red-500 rounded-full flex items-center justify-center animate-pulse">
                <span className="text-white text-xs">2</span>
              </div>
            </div>
            <Button 
              variant="ghost" 
              size="lg" 
              onClick={onLogout}
              className="hover:bg-white/20 transition-all duration-200"
            >
              <LogOut className="h-6 w-6" />
            </Button>
          </div>
        </div>
      </div>

      <div className="p-4 space-y-6">
        {/* Stats Overview */}
        <div className="grid grid-cols-3 gap-4 animate-slide-up">
          <Card className="shadow-medium border-0 bg-gradient-to-br from-emerald-50 to-emerald-100">
            <CardContent className="p-4 text-center">
              <div className="text-2xl font-bold text-emerald-600 mb-1">{todayJobs.length}</div>
              <div className="text-sm text-emerald-700">Today's Jobs</div>
            </CardContent>
          </Card>
          <Card className="shadow-medium border-0 bg-gradient-to-br from-blue-50 to-blue-100">
            <CardContent className="p-4 text-center">
              <div className="text-2xl font-bold text-blue-600 mb-1">{mechanicData.completedToday}</div>
              <div className="text-sm text-blue-700">Completed</div>
            </CardContent>
          </Card>
          <Card className="shadow-medium border-0 bg-gradient-to-br from-yellow-50 to-yellow-100">
            <CardContent className="p-4 text-center">
              <div className="text-2xl font-bold text-yellow-600 mb-1">{mechanicData.averageRating}</div>
              <div className="text-sm text-yellow-700">Rating</div>
            </CardContent>
          </Card>
        </div>

        {/* Active Timer */}
        {activeTimer && (
          <Card className="shadow-xl border-0 bg-gradient-to-r from-green-100 to-blue-100 animate-pulse-glow">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <div className="w-12 h-12 bg-gradient-to-r from-green-500 to-blue-500 rounded-full flex items-center justify-center">
                    <Timer className="h-6 w-6 text-white" />
                  </div>
                  <div>
                    <h3 className="font-bold">Active Job Timer</h3>
                    <p className="text-sm text-muted-foreground">
                      {jobs.find(j => j.id === activeTimer)?.serviceName}
                    </p>
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-2xl font-bold text-green-600">{formatTime(timerSeconds)}</div>
                  <div className="flex space-x-2 mt-2">
                    {isPaused ? (
                      <Button size="sm" onClick={() => resumeJob(activeTimer)} className="bg-green-500 hover:bg-green-600">
                        <Play className="h-4 w-4" />
                      </Button>
                    ) : (
                      <Button size="sm" onClick={() => pauseJob(activeTimer)} className="bg-yellow-500 hover:bg-yellow-600">
                        <Pause className="h-4 w-4" />
                      </Button>
                    )}
                    <Button size="sm" onClick={() => setShowJobDetails(true)} variant="outline">
                      <Square className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        )}

        {/* View Tabs */}
        <Tabs value={currentView} onValueChange={(value) => setCurrentView(value as any)}>
          <TabsList className="grid w-full grid-cols-3 bg-slate-100/80">
            <TabsTrigger value="today" className="data-[state=active]:bg-white">
              <Calendar className="h-4 w-4 mr-2" />
              Today
            </TabsTrigger>
            <TabsTrigger value="assigned" className="data-[state=active]:bg-white">
              <Clock className="h-4 w-4 mr-2" />
              Assigned
            </TabsTrigger>
            <TabsTrigger value="history" className="data-[state=active]:bg-white">
              <History className="h-4 w-4 mr-2" />
              History
            </TabsTrigger>
          </TabsList>

          {/* Today's Jobs */}
          <TabsContent value="today" className="space-y-4 mt-6">
            {todayJobs.length === 0 ? (
              <Card className="shadow-medium border-0">
                <CardContent className="p-8 text-center">
                  <Calendar className="h-16 w-16 mx-auto mb-4 text-muted-foreground opacity-50" />
                  <h3 className="text-lg font-medium mb-2">No jobs today</h3>
                  <p className="text-muted-foreground">Enjoy your day off or check for new assignments!</p>
                </CardContent>
              </Card>
            ) : (
              todayJobs.map((job) => (
                <Card key={job.id} className="shadow-medium border-0 hover-lift cursor-pointer">
                  <CardContent className="p-4">
                    <div className="flex items-start justify-between mb-3">
                      <div className="flex items-center space-x-3">
                        <div className="relative">
                          <div className="w-12 h-12 bg-gradient-to-r from-emerald-500 to-blue-500 rounded-full flex items-center justify-center shadow-medium">
                            {getServiceIcon(job.serviceType)}
                            <span className="text-white"></span>
                          </div>
                          <div className={`absolute -top-1 -right-1 w-4 h-4 ${getPriorityColor(job.priority)} rounded-full border-2 border-white`}></div>
                        </div>
                        <div>
                          <h3 className="font-semibold text-lg">{job.serviceName}</h3>
                          <p className="text-sm text-muted-foreground">{job.customerName} • {job.vehicleRego}</p>
                          <p className="text-xs text-muted-foreground">{job.vehicleMake} {job.vehicleModel} ({job.vehicleYear})</p>
                        </div>
                      </div>
                      <Badge className={`${getStatusColor(job.status)} flex items-center space-x-1`}>
                        <span className="capitalize">{job.status.replace('-', ' ')}</span>
                      </Badge>
                    </div>

                    <div className="grid grid-cols-2 gap-4 mb-4">
                      <div>
                        <p className="text-sm font-medium text-slate-700">Scheduled Time</p>
                        <p className="text-xs text-muted-foreground flex items-center mt-1">
                          <Clock className="h-3 w-3 mr-1" />
                          {job.scheduledTime} ({job.estimatedDuration}min)
                        </p>
                      </div>
                      <div className="text-right">
                        <p className="text-sm font-medium text-slate-700">Location</p>
                        <p className="text-xs text-muted-foreground flex items-center justify-end mt-1">
                          <MapPin className="h-3 w-3 mr-1" />
                          {job.location}
                        </p>
                      </div>
                    </div>

                    {job.description && (
                      <div className="mb-4 p-3 bg-slate-50 rounded-lg">
                        <p className="text-sm text-slate-600">{job.description}</p>
                      </div>
                    )}

                    <div className="flex justify-between items-center pt-3 border-t border-slate-100">
                      <div className="flex space-x-2">
                        {job.status === 'assigned' && (
                          <Button 
                            size="sm" 
                            onClick={() => startJob(job.id)}
                            className="bg-green-500 hover:bg-green-600"
                          >
                            <Play className="h-4 w-4 mr-2" />
                            Start Job
                          </Button>
                        )}
                        {job.status === 'in-progress' && job.id === activeTimer && (
                          <Button 
                            size="sm" 
                            onClick={() => {
                              setSelectedJob(job);
                              setShowJobDetails(true);
                            }}
                            className="bg-blue-500 hover:bg-blue-600"
                          >
                            <CheckCircle className="h-4 w-4 mr-2" />
                            Complete
                          </Button>
                        )}
                        {job.status === 'on-hold' && (
                          <Button 
                            size="sm" 
                            onClick={() => resumeJob(job.id)}
                            className="bg-yellow-500 hover:bg-yellow-600"
                          >
                            <Play className="h-4 w-4 mr-2" />
                            Resume
                          </Button>
                        )}
                      </div>
                      <div className="flex space-x-1">
                        <Button variant="ghost" size="sm">
                          <MessageSquare className="h-4 w-4" />
                        </Button>
                        <Button variant="ghost" size="sm">
                          <FileText className="h-4 w-4" />
                        </Button>
                        <Button 
                          variant="ghost" 
                          size="sm"
                          onClick={() => {
                            setSelectedJob(job);
                            setShowJobDetails(true);
                          }}
                        >
                          <Eye className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))
            )}
          </TabsContent>

          {/* Assigned Jobs */}
          <TabsContent value="assigned" className="space-y-4 mt-6">
            {assignedJobs.map((job) => (
              <Card key={job.id} className="shadow-medium border-0 hover-lift">
                <CardContent className="p-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                        {getServiceIcon(job.serviceType)}
                      </div>
                      <div>
                        <h3 className="font-medium">{job.serviceName}</h3>
                        <p className="text-sm text-muted-foreground">{job.customerName} • {job.vehicleRego}</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="text-sm font-medium">{job.scheduledDate}</p>
                      <p className="text-xs text-muted-foreground">{job.scheduledTime}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </TabsContent>

          {/* Job History */}
          <TabsContent value="history" className="space-y-4 mt-6">
            {jobHistory.map((job) => (
              <Card key={job.id} className="shadow-medium border-0">
                <CardContent className="p-4">
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center space-x-3">
                      <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center">
                        <CheckCircle className="h-5 w-5 text-green-600" />
                      </div>
                      <div>
                        <h3 className="font-medium">{job.serviceName}</h3>
                        <p className="text-sm text-muted-foreground">{job.customerName} • {job.vehicleRego}</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="text-sm font-medium">{job.scheduledDate}</p>
                      {job.customerRating && (
                        <div className="flex items-center space-x-1 mt-1">
                          {Array.from({ length: job.customerRating }, (_, i) => (
                            <span key={i} className="text-yellow-400">★</span>
                          ))}
                        </div>
                      )}
                    </div>
                  </div>
                  {job.completionNotes && (
                    <div className="p-2 bg-green-50 rounded-lg text-sm text-green-700">
                      {job.completionNotes}
                    </div>
                  )}
                </CardContent>
              </Card>
            ))}
          </TabsContent>
        </Tabs>
      </div>

      {/* Job Details/Completion Dialog */}
      <Dialog open={showJobDetails} onOpenChange={setShowJobDetails}>
        <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>
              {selectedJob?.status === 'in-progress' ? 'Complete Job' : 'Job Details'}
            </DialogTitle>
          </DialogHeader>
          {selectedJob && (
            <div className="space-y-6 py-4">
              {/* Job Info */}
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <h4 className="font-medium mb-2">Service</h4>
                  <p className="text-sm text-muted-foreground">{selectedJob.serviceName}</p>
                </div>
                <div>
                  <h4 className="font-medium mb-2">Customer</h4>
                  <p className="text-sm text-muted-foreground">{selectedJob.customerName}</p>
                </div>
                <div>
                  <h4 className="font-medium mb-2">Vehicle</h4>
                  <p className="text-sm text-muted-foreground">
                    {selectedJob.vehicleRego} - {selectedJob.vehicleMake} {selectedJob.vehicleModel}
                  </p>
                </div>
                <div>
                  <h4 className="font-medium mb-2">Time</h4>
                  <p className="text-sm text-muted-foreground">
                    {activeTimer ? formatTime(timerSeconds) : 'Not started'}
                  </p>
                </div>
              </div>

              {/* Completion Form for In-Progress Jobs */}
              {selectedJob.status === 'in-progress' && (
                <>
                  <div className="space-y-4">
                    <div>
                      <Label htmlFor="completion-notes">Completion Notes</Label>
                      <Textarea
                        id="completion-notes"
                        placeholder="Describe the work completed, any issues found, parts replaced, etc."
                        value={completionNotes}
                        onChange={(e) => setCompletionNotes(e.target.value)}
                        className="h-24"
                      />
                    </div>

                    {/* Photo/Video Upload */}
                    <div className="space-y-4">
                      <Label>Upload Photos & Videos</Label>
                      <div className="border-2 border-dashed border-gray-300 rounded-lg p-4 text-center">
                        <input
                          type="file"
                          multiple
                          accept="image/*,video/*"
                          onChange={(e) => handleFileUpload(e.target.files)}
                          className="hidden"
                          id="completion-files"
                        />
                        <label htmlFor="completion-files" className="cursor-pointer">
                          <Upload className="h-8 w-8 mx-auto mb-2 text-gray-400" />
                          <p className="text-sm text-gray-600">
                            Upload photos or videos of completed work
                          </p>
                        </label>
                      </div>

                      {uploadedFiles.length > 0 && (
                        <div className="grid grid-cols-2 gap-2">
                          {uploadedFiles.map((file, index) => (
                            <div key={index} className="flex items-center space-x-2 p-2 bg-gray-50 rounded">
                              {file.type.startsWith('image/') ? (
                                <Camera className="h-4 w-4 text-blue-500" />
                              ) : (
                                <Video className="h-4 w-4 text-purple-500" />
                              )}
                              <span className="text-sm truncate">{file.name}</span>
                            </div>
                          ))}
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
                    </div>
                  </div>

                  <div className="flex justify-end space-x-2 pt-4 border-t">
                    <Button variant="outline" onClick={() => setShowJobDetails(false)}>
                      Cancel
                    </Button>
                    <Button 
                      onClick={() => {
                        completeJob(selectedJob.id);
                        setShowJobDetails(false);
                      }}
                      className="bg-green-500 hover:bg-green-600"
                    >
                      Complete Job
                    </Button>
                  </div>
                </>
              )}
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}