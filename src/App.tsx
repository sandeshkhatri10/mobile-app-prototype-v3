import { useState } from 'react';
import { LoginPage } from './components/LoginPage';
import { Dashboard } from './components/Dashboard';
import { CustomerDashboard } from './components/CustomerDashboard';
import { ServicePage } from './components/ServicePage';
import { InvoicePage } from './components/InvoicePage';
import { SettingsPage } from './components/SettingsPage';
import { BookingsPage } from './components/BookingsPage';
import { MechanicDashboard } from './components/MechanicDashboard';

type AppState = 'login' | 'dashboard' | 'customer-dashboard' | 'mechanic-dashboard' | 'service' | 'invoices' | 'settings' | 'bookings';
type UserType = 'customer' | 'manager' | 'mechanic' | null;

export default function App() {
  const [currentPage, setCurrentPage] = useState<AppState>('login');
  const [userType, setUserType] = useState<UserType>(null);
  const [selectedService, setSelectedService] = useState<string>('');

  const handleLogin = (loginUserType: 'customer' | 'manager' | 'mechanic') => {
    setUserType(loginUserType);
    if (loginUserType === 'customer') {
      setCurrentPage('customer-dashboard');
    } else if (loginUserType === 'mechanic') {
      setCurrentPage('mechanic-dashboard');
    } else {
      setCurrentPage('dashboard');
    }
  };

  const handleLogout = () => {
    setCurrentPage('login');
    setUserType(null);
    setSelectedService('');
  };

  const handleServiceSelect = (service: string) => {
    setSelectedService(service);
    if (service === 'invoices') {
      setCurrentPage('invoices');
    } else if (service === 'upcoming-bookings' || service === 'bookings') {
      setCurrentPage('bookings');
    } else {
      setCurrentPage('service');
    }
  };

  const handleBackToDashboard = () => {
    if (userType === 'customer') {
      setCurrentPage('customer-dashboard');
    } else if (userType === 'mechanic') {
      setCurrentPage('mechanic-dashboard');
    } else {
      setCurrentPage('dashboard');
    }
    setSelectedService('');
  };

  const handleSettings = () => {
    setCurrentPage('settings');
  };

  return (
    <div className="min-h-screen w-full bg-background transition-all duration-300 ease-in-out">
      <div className="relative overflow-hidden">
        {/* Page Transitions */}
        <div className={`transition-all duration-300 ease-in-out ${
          currentPage === 'login' ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-full absolute top-0 left-0 w-full'
        }`}>
          <LoginPage onLogin={handleLogin} />
        </div>
        
        <div className={`transition-all duration-300 ease-in-out ${
          currentPage === 'dashboard' ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-full absolute top-0 left-0 w-full'
        }`}>
          <Dashboard 
            onServiceSelect={handleServiceSelect} 
            onLogout={handleLogout}
            onSettings={handleSettings}
          />
        </div>

        <div className={`transition-all duration-300 ease-in-out ${
          currentPage === 'customer-dashboard' ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-full absolute top-0 left-0 w-full'
        }`}>
          <CustomerDashboard 
            onLogout={handleLogout}
          />
        </div>

        <div className={`transition-all duration-300 ease-in-out ${
          currentPage === 'mechanic-dashboard' ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-full absolute top-0 left-0 w-full'
        }`}>
          <MechanicDashboard 
            onLogout={handleLogout}
          />
        </div>
        
        <div className={`transition-all duration-300 ease-in-out ${
          currentPage === 'service' ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-full absolute top-0 left-0 w-full'
        }`}>
          <ServicePage 
            service={selectedService} 
            onBack={handleBackToDashboard} 
          />
        </div>

        <div className={`transition-all duration-300 ease-in-out ${
          currentPage === 'invoices' ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-full absolute top-0 left-0 w-full'
        }`}>
          <InvoicePage 
            onBack={handleBackToDashboard} 
          />
        </div>

        <div className={`transition-all duration-300 ease-in-out ${
          currentPage === 'settings' ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-full absolute top-0 left-0 w-full'
        }`}>
          <SettingsPage 
            onBack={handleBackToDashboard} 
          />
        </div>

        <div className={`transition-all duration-300 ease-in-out ${
          currentPage === 'bookings' ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-full absolute top-0 left-0 w-full'
        }`}>
          <BookingsPage 
            onBack={handleBackToDashboard} 
          />
        </div>
      </div>
    </div>
  );
}