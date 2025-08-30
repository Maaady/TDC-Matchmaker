import React, { useState, useEffect } from 'react';
import { Customer, Matchmaker } from './types';
import { generateMockCustomers, mockMatchmakers } from './data/mockData';
import Login from './components/Login';
import Dashboard from './components/Dashboard';

function App() {
  const [currentUser, setCurrentUser] = useState<string | null>(null);
  const [customers, setCustomers] = useState<Customer[]>([]);
  const [matchmaker, setMatchmaker] = useState<Matchmaker | null>(null);

  useEffect(() => {
    // Generate mock data on app start
    const mockCustomers = generateMockCustomers();
    setCustomers(mockCustomers);
  }, []);

  const handleLogin = (username: string) => {
    const foundMatchmaker = mockMatchmakers.find(m => m.username === username);
    if (foundMatchmaker) {
      setCurrentUser(username);
      setMatchmaker(foundMatchmaker);
      
      // Assign customers to matchmaker
      foundMatchmaker.customers = customers.map(c => c.id);
    }
  };

  const handleLogout = () => {
    setCurrentUser(null);
    setMatchmaker(null);
  };

  if (!currentUser || !matchmaker) {
    return <Login onLogin={handleLogin} />;
  }

  return (
    <Dashboard 
      customers={customers}
      matchmakerName={matchmaker.name}
      onLogout={handleLogout}
    />
  );
}

export default App;