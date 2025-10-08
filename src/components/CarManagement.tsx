import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { Badge } from './ui/badge';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from './ui/dialog';
import { 
  ArrowLeft,
  Car,
  Plus,
  Edit3,
  Trash2,
  AlertTriangle,
  CheckCircle,
  Calendar
} from 'lucide-react';

interface Car {
  id: number;
  rego: string;
  make: string;
  model: string;
  year: number;
  wofExpiry: string;
  regoExpiry: string;
  lastService: string;
  color?: string;
  engine?: string;
}

interface CarManagementProps {
  onBack: () => void;
  cars: Car[];
  onCarsUpdate: (cars: Car[]) => void;
}

export function CarManagement({ onBack, cars, onCarsUpdate }: CarManagementProps) {
  const [editingCar, setEditingCar] = useState<Car | null>(null);
  const [isAddingCar, setIsAddingCar] = useState(false);
  const [newCar, setNewCar] = useState({
    rego: '',
    make: '',
    model: '',
    year: new Date().getFullYear(),
    wofExpiry: '',
    regoExpiry: '',
    color: '',
    engine: ''
  });

  const getExpiryStatus = (expiryDate: string) => {
    const today = new Date();
    const expiry = new Date(expiryDate);
    const daysUntilExpiry = Math.ceil((expiry.getTime() - today.getTime()) / (1000 * 3600 * 24));
    
    if (daysUntilExpiry < 0) return { status: 'expired', color: 'text-red-600', bg: 'bg-red-50', icon: AlertTriangle };
    if (daysUntilExpiry <= 30) return { status: 'warning', color: 'text-orange-600', bg: 'bg-orange-50', icon: AlertTriangle };
    return { status: 'good', color: 'text-green-600', bg: 'bg-green-50', icon: CheckCircle };
  };

  const handleAddCar = () => {
    if (newCar.rego && newCar.make && newCar.model) {
      const carToAdd = {
        id: Math.max(...cars.map(c => c.id), 0) + 1,
        ...newCar,
        lastService: new Date().toISOString().split('T')[0]
      };
      onCarsUpdate([...cars, carToAdd]);
      setNewCar({
        rego: '',
        make: '',
        model: '',
        year: new Date().getFullYear(),
        wofExpiry: '',
        regoExpiry: '',
        color: '',
        engine: ''
      });
      setIsAddingCar(false);
    }
  };

  const handleUpdateCar = () => {
    if (editingCar) {
      const updatedCars = cars.map(car => 
        car.id === editingCar.id ? editingCar : car
      );
      onCarsUpdate(updatedCars);
      setEditingCar(null);
    }
  };

  const handleDeleteCar = (carId: number) => {
    const updatedCars = cars.filter(car => car.id !== carId);
    onCarsUpdate(updatedCars);
  };

  const currentYear = new Date().getFullYear();
  const years = Array.from({ length: 30 }, (_, i) => currentYear - i);

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
              <h1 className="font-semibold">Manage Your Cars</h1>
              <p className="text-sm text-muted-foreground">Add, edit, or remove your vehicles</p>
            </div>
          </div>
          <Dialog open={isAddingCar} onOpenChange={setIsAddingCar}>
            <DialogTrigger asChild>
              <Button className="gradient-primary shadow-medium">
                <Plus className="h-4 w-4 mr-2" />
                Add Car
              </Button>
            </DialogTrigger>
            <DialogContent className="w-[95vw] max-w-md mx-auto">
              <DialogHeader>
                <DialogTitle>Add New Car</DialogTitle>
                <DialogDescription>
                  Enter your new car's details below.
                </DialogDescription>
              </DialogHeader>
              <div className="space-y-4 py-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="rego">Registration *</Label>
                    <Input
                      id="rego"
                      value={newCar.rego}
                      onChange={(e) => setNewCar({...newCar, rego: e.target.value.toUpperCase()})}
                      placeholder="ABC123"
                    />
                  </div>
                  <div>
                    <Label htmlFor="year">Year *</Label>
                    <Select onValueChange={(value) => setNewCar({...newCar, year: parseInt(value)})}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select year" />
                      </SelectTrigger>
                      <SelectContent>
                        {years.map(year => (
                          <SelectItem key={year} value={year.toString()}>{year}</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="make">Make *</Label>
                    <Input
                      id="make"
                      value={newCar.make}
                      onChange={(e) => setNewCar({...newCar, make: e.target.value})}
                      placeholder="Toyota"
                    />
                  </div>
                  <div>
                    <Label htmlFor="model">Model *</Label>
                    <Input
                      id="model"
                      value={newCar.model}
                      onChange={(e) => setNewCar({...newCar, model: e.target.value})}
                      placeholder="Camry"
                    />
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="wofExpiry">WOF Expiry</Label>
                    <Input
                      id="wofExpiry"
                      type="date"
                      value={newCar.wofExpiry}
                      onChange={(e) => setNewCar({...newCar, wofExpiry: e.target.value})}
                    />
                  </div>
                  <div>
                    <Label htmlFor="regoExpiry">Rego Expiry</Label>
                    <Input
                      id="regoExpiry"
                      type="date"
                      value={newCar.regoExpiry}
                      onChange={(e) => setNewCar({...newCar, regoExpiry: e.target.value})}
                    />
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="color">Color</Label>
                    <Input
                      id="color"
                      value={newCar.color}
                      onChange={(e) => setNewCar({...newCar, color: e.target.value})}
                      placeholder="White"
                    />
                  </div>
                  <div>
                    <Label htmlFor="engine">Engine Size</Label>
                    <Input
                      id="engine"
                      value={newCar.engine}
                      onChange={(e) => setNewCar({...newCar, engine: e.target.value})}
                      placeholder="2.4L"
                    />
                  </div>
                </div>
              </div>
              <div className="flex justify-end space-x-2">
                <Button variant="outline" onClick={() => setIsAddingCar(false)}>
                  Cancel
                </Button>
                <Button onClick={handleAddCar} disabled={!newCar.rego || !newCar.make || !newCar.model}>
                  Add Car
                </Button>
              </div>
            </DialogContent>
          </Dialog>
        </div>
      </div>

      <div className="p-4 space-y-4">
        {cars.map((car) => {
          const wofStatus = getExpiryStatus(car.wofExpiry);
          const regoStatus = getExpiryStatus(car.regoExpiry);
          const WofIcon = wofStatus.icon;
          const RegoIcon = regoStatus.icon;
          
          return (
            <Card key={car.id} className="shadow-medium border-0 hover-lift">
              <CardContent className="p-4">
                <div className="flex items-center justify-between mb-4">
                  <div>
                    <h3 className="font-semibold">{car.rego}</h3>
                    <p className="text-sm text-muted-foreground">
                      {car.year} {car.make} {car.model}
                      {car.color && ` • ${car.color}`}
                      {car.engine && ` • ${car.engine}`}
                    </p>
                  </div>
                  <div className="flex space-x-2">
                    <Dialog>
                      <DialogTrigger asChild>
                        <Button 
                          size="sm" 
                          variant="outline" 
                          onClick={() => setEditingCar(car)}
                        >
                          <Edit3 className="h-4 w-4" />
                        </Button>
                      </DialogTrigger>
                      <DialogContent className="w-[95vw] max-w-md mx-auto">
                        <DialogHeader>
                          <DialogTitle>Edit Car Details</DialogTitle>
                          <DialogDescription>
                            Update your car's information below.
                          </DialogDescription>
                        </DialogHeader>
                        {editingCar && (
                          <div className="space-y-4 py-4">
                            <div className="grid grid-cols-2 gap-4">
                              <div>
                                <Label htmlFor="edit-rego">Registration</Label>
                                <Input
                                  id="edit-rego"
                                  value={editingCar.rego}
                                  onChange={(e) => setEditingCar({...editingCar, rego: e.target.value.toUpperCase()})}
                                />
                              </div>
                              <div>
                                <Label htmlFor="edit-year">Year</Label>
                                <Select onValueChange={(value) => setEditingCar({...editingCar, year: parseInt(value)})}>
                                  <SelectTrigger>
                                    <SelectValue placeholder={editingCar.year.toString()} />
                                  </SelectTrigger>
                                  <SelectContent>
                                    {years.map(year => (
                                      <SelectItem key={year} value={year.toString()}>{year}</SelectItem>
                                    ))}
                                  </SelectContent>
                                </Select>
                              </div>
                            </div>
                            <div className="grid grid-cols-2 gap-4">
                              <div>
                                <Label htmlFor="edit-make">Make</Label>
                                <Input
                                  id="edit-make"
                                  value={editingCar.make}
                                  onChange={(e) => setEditingCar({...editingCar, make: e.target.value})}
                                />
                              </div>
                              <div>
                                <Label htmlFor="edit-model">Model</Label>
                                <Input
                                  id="edit-model"
                                  value={editingCar.model}
                                  onChange={(e) => setEditingCar({...editingCar, model: e.target.value})}
                                />
                              </div>
                            </div>
                            <div className="grid grid-cols-2 gap-4">
                              <div>
                                <Label htmlFor="edit-wofExpiry">WOF Expiry</Label>
                                <Input
                                  id="edit-wofExpiry"
                                  type="date"
                                  value={editingCar.wofExpiry}
                                  onChange={(e) => setEditingCar({...editingCar, wofExpiry: e.target.value})}
                                />
                              </div>
                              <div>
                                <Label htmlFor="edit-regoExpiry">Rego Expiry</Label>
                                <Input
                                  id="edit-regoExpiry"
                                  type="date"
                                  value={editingCar.regoExpiry}
                                  onChange={(e) => setEditingCar({...editingCar, regoExpiry: e.target.value})}
                                />
                              </div>
                            </div>
                            <div className="grid grid-cols-2 gap-4">
                              <div>
                                <Label htmlFor="edit-color">Color</Label>
                                <Input
                                  id="edit-color"
                                  value={editingCar.color || ''}
                                  onChange={(e) => setEditingCar({...editingCar, color: e.target.value})}
                                  placeholder="White"
                                />
                              </div>
                              <div>
                                <Label htmlFor="edit-engine">Engine Size</Label>
                                <Input
                                  id="edit-engine"
                                  value={editingCar.engine || ''}
                                  onChange={(e) => setEditingCar({...editingCar, engine: e.target.value})}
                                  placeholder="2.4L"
                                />
                              </div>
                            </div>
                          </div>
                        )}
                        <div className="flex justify-end space-x-2">
                          <Button variant="outline" onClick={() => setEditingCar(null)}>
                            Cancel
                          </Button>
                          <Button onClick={handleUpdateCar}>
                            Save Changes
                          </Button>
                        </div>
                      </DialogContent>
                    </Dialog>
                    <Button 
                      size="sm" 
                      variant="outline" 
                      onClick={() => handleDeleteCar(car.id)}
                      className="text-red-600 hover:text-red-700"
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className={`p-3 rounded-lg ${wofStatus.bg}`}>
                    <div className="flex items-center space-x-2">
                      <WofIcon className={`h-4 w-4 ${wofStatus.color}`} />
                      <span className="text-sm font-medium">WOF</span>
                    </div>
                    <p className={`text-sm ${wofStatus.color}`}>
                      {car.wofExpiry ? new Date(car.wofExpiry).toLocaleDateString() : 'Not set'}
                    </p>
                  </div>
                  
                  <div className={`p-3 rounded-lg ${regoStatus.bg}`}>
                    <div className="flex items-center space-x-2">
                      <RegoIcon className={`h-4 w-4 ${regoStatus.color}`} />
                      <span className="text-sm font-medium">Registration</span>
                    </div>
                    <p className={`text-sm ${regoStatus.color}`}>
                      {car.regoExpiry ? new Date(car.regoExpiry).toLocaleDateString() : 'Not set'}
                    </p>
                  </div>
                </div>

                <div className="mt-4 pt-3 border-t">
                  <div className="flex items-center space-x-2 text-sm text-muted-foreground">
                    <Calendar className="h-4 w-4" />
                    <span>Last service: {new Date(car.lastService).toLocaleDateString()}</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          );
        })}

        {cars.length === 0 && (
          <Card className="shadow-medium border-0">
            <CardContent className="p-8 text-center">
              <Car className="h-16 w-16 mx-auto mb-4 text-muted-foreground opacity-50" />
              <h3 className="font-medium mb-2">No cars registered</h3>
              <p className="text-sm text-muted-foreground mb-4">
                Add your first car to start tracking services and maintenance.
              </p>
              <Button onClick={() => setIsAddingCar(true)} className="gradient-primary">
                <Plus className="h-4 w-4 mr-2" />
                Add Your First Car
              </Button>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
}