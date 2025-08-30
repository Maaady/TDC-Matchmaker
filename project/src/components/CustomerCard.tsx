import React from 'react';
import { MapPin, Briefcase, Calendar, Phone, Mail } from 'lucide-react';
import { Customer } from '../types';

interface CustomerCardProps {
  customer: Customer;
  onClick: () => void;
}

export default function CustomerCard({ customer, onClick }: CustomerCardProps) {
  const formatCurrency = (amount: number) => {
    return `₹${(amount / 100000).toFixed(0)}L`;
  };

  const getStatusClass = (status: string) => {
    switch (status) {
      case 'active': return 'status-active';
      case 'reviewing': return 'status-reviewing';
      case 'matched': return 'status-matched';
      case 'paused': return 'status-paused';
      default: return 'status-active';
    }
  };

  const formatLastActive = (dateString: string) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffInDays = Math.floor((now.getTime() - date.getTime()) / (1000 * 60 * 60 * 24));
    
    if (diffInDays === 0) return 'Today';
    if (diffInDays === 1) return 'Yesterday';
    return `${diffInDays} days ago`;
  };

  return (
    <div 
      className="bg-white rounded-lg shadow-sm hover:shadow-md transition-all cursor-pointer border border-gray-200 hover:border-rose-200 p-6"
      onClick={onClick}
    >
      <div className="flex justify-between items-start mb-4">
        <div className="flex-1">
          <h3 className="text-lg font-semibold text-gray-900">
            {customer.firstName} {customer.lastName}
          </h3>
          <div className="flex items-center text-gray-600 mt-1">
            <Calendar className="w-4 h-4 mr-1" />
            <span className="text-sm">{customer.age} years old</span>
          </div>
        </div>
        
        <span className={`px-3 py-1 text-xs font-medium rounded-full border ${getStatusClass(customer.status)}`}>
          {customer.status.charAt(0).toUpperCase() + customer.status.slice(1)}
        </span>
      </div>

      <div className="space-y-2 mb-4">
        <div className="flex items-center text-gray-600">
          <MapPin className="w-4 h-4 mr-2 flex-shrink-0" />
          <span className="text-sm">{customer.city}</span>
        </div>
        
        <div className="flex items-center text-gray-600">
          <Briefcase className="w-4 h-4 mr-2 flex-shrink-0" />
          <span className="text-sm">{customer.designation} at {customer.currentCompany}</span>
        </div>
        
        <div className="flex items-center justify-between text-gray-600">
          <div className="flex items-center">
            <span className="text-sm font-medium">Income:</span>
            <span className="text-sm ml-1">{formatCurrency(customer.income)}</span>
          </div>
          <div className="text-sm">
            Height: {Math.floor(customer.height / 30.48)}'{((customer.height % 30.48) / 2.54).toFixed(0)}"
          </div>
        </div>
      </div>

      <div className="pt-4 border-t border-gray-100">
        <div className="flex items-center justify-between text-xs text-gray-500">
          <div className="flex items-center">
            <Mail className="w-3 h-3 mr-1" />
            <span>Last active: {formatLastActive(customer.lastActive)}</span>
          </div>
          <div className="flex items-center space-x-2">
            <span className="bg-gray-100 px-2 py-1 rounded text-xs">{customer.religion}</span>
            <span className="bg-gray-100 px-2 py-1 rounded text-xs">{customer.maritalStatus}</span>
          </div>
        </div>
      </div>
    </div>
  );
}