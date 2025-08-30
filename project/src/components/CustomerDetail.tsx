import React, { useState, useEffect } from 'react';
import { ArrowLeft, Heart, Send, Star, MapPin, Briefcase, GraduationCap, Phone, Mail, Users, Baby, Home, PawPrint } from 'lucide-react';
import { Customer, MatchScore } from '../types';
import { generateDummyProfiles } from '../data/mockData';
import { MatchingAlgorithm } from '../utils/matchingAlgorithm';
import { AIService } from '../utils/aiService';
import MatchCard from './MatchCard';

interface CustomerDetailProps {
  customer: Customer;
  onBack: () => void;
}

export default function CustomerDetail({ customer, onBack }: CustomerDetailProps) {
  const [matches, setMatches] = useState<MatchScore[]>([]);
  const [dummyProfiles, setDummyProfiles] = useState<Customer[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const loadMatches = async () => {
      setIsLoading(true);
      
      // Generate dummy profiles for matching
      const profiles = generateDummyProfiles();
      setDummyProfiles(profiles);
      
      // Find best matches
      const bestMatches = MatchingAlgorithm.findBestMatches(customer, profiles, 8);
      
      // Enhance matches with AI
      const enhancedMatches = bestMatches.map(match => 
        AIService.enhanceMatchScore(match, customer, profiles.find(p => p.id === match.matchId)!)
      );
      
      setMatches(enhancedMatches);
      setIsLoading(false);
    };

    loadMatches();
  }, [customer]);

  const formatCurrency = (amount: number) => {
    return `₹${(amount / 100000).toFixed(1)}L`;
  };

  const formatHeight = (height: number) => {
    return `${Math.floor(height / 30.48)}' ${((height % 30.48) / 2.54).toFixed(0)}"`;
  };

  const getMatchedProfile = (matchId: string) => {
    return dummyProfiles.find(p => p.id === matchId);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center py-4">
            <button 
              onClick={onBack}
              className="flex items-center text-gray-600 hover:text-gray-800 mr-4"
            >
              <ArrowLeft className="w-5 h-5 mr-2" />
              Back to Dashboard
            </button>
            <div className="flex-1">
              <h1 className="text-2xl font-bold text-gray-900">
                {customer.firstName} {customer.lastName}
              </h1>
              <p className="text-gray-600">Customer Profile & Match Suggestions</p>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          
          {/* Customer Profile */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-lg shadow-sm p-6 sticky top-8">
              <div className="text-center mb-6">
                <div className="w-24 h-24 bg-gradient-to-r from-rose-400 to-pink-500 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-2xl font-bold text-white">
                    {customer.firstName.charAt(0)}{customer.lastName.charAt(0)}
                  </span>
                </div>
                <h2 className="text-xl font-bold text-gray-900">
                  {customer.firstName} {customer.lastName}
                </h2>
                <p className="text-gray-600">{customer.age} years old • {customer.gender}</p>
              </div>

              <div className="space-y-4">
                <div className="flex items-center text-gray-600">
                  <MapPin className="w-5 h-5 mr-3 text-rose-500" />
                  <div>
                    <p className="font-medium">{customer.city}</p>
                    <p className="text-sm">{customer.country}</p>
                  </div>
                </div>

                <div className="flex items-center text-gray-600">
                  <Briefcase className="w-5 h-5 mr-3 text-rose-500" />
                  <div>
                    <p className="font-medium">{customer.designation}</p>
                    <p className="text-sm">{customer.currentCompany}</p>
                    <p className="text-sm text-green-600">{formatCurrency(customer.income)}</p>
                  </div>
                </div>

                <div className="flex items-center text-gray-600">
                  <GraduationCap className="w-5 h-5 mr-3 text-rose-500" />
                  <div>
                    <p className="font-medium">{customer.degree}</p>
                    <p className="text-sm">{customer.undergraduateCollege}</p>
                  </div>
                </div>

                <div className="flex items-center text-gray-600">
                  <Phone className="w-5 h-5 mr-3 text-rose-500" />
                  <p>{customer.phoneNumber}</p>
                </div>

                <div className="flex items-center text-gray-600">
                  <Mail className="w-5 h-5 mr-3 text-rose-500" />
                  <p className="text-sm break-all">{customer.email}</p>
                </div>
              </div>

              <div className="mt-6 pt-6 border-t border-gray-100">
                <h3 className="font-semibold text-gray-900 mb-3">Personal Details</h3>
                <div className="space-y-3 text-sm">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Height:</span>
                    <span className="font-medium">{formatHeight(customer.height)} ({customer.height}cm)</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Religion:</span>
                    <span className="font-medium">{customer.religion}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Caste:</span>
                    <span className="font-medium">{customer.caste}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Marital Status:</span>
                    <span className="font-medium capitalize">{customer.maritalStatus}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Siblings:</span>
                    <span className="font-medium">{customer.siblings}</span>
                  </div>
                </div>
              </div>

              <div className="mt-6 pt-6 border-t border-gray-100">
                <h3 className="font-semibold text-gray-900 mb-3">Preferences</h3>
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center">
                      <Baby className="w-4 h-4 mr-2 text-gray-500" />
                      <span className="text-sm text-gray-600">Want Kids:</span>
                    </div>
                    <span className="text-sm font-medium capitalize">{customer.wantKids}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center">
                      <Home className="w-4 h-4 mr-2 text-gray-500" />
                      <span className="text-sm text-gray-600">Open to Relocate:</span>
                    </div>
                    <span className="text-sm font-medium capitalize">{customer.openToRelocate}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center">
                      <PawPrint className="w-4 h-4 mr-2 text-gray-500" />
                      <span className="text-sm text-gray-600">Open to Pets:</span>
                    </div>
                    <span className="text-sm font-medium capitalize">{customer.openToPets}</span>
                  </div>
                </div>
              </div>

              <div className="mt-6 pt-6 border-t border-gray-100">
                <h3 className="font-semibold text-gray-900 mb-3">Languages</h3>
                <div className="flex flex-wrap gap-2">
                  {customer.languagesKnown.map(language => (
                    <span key={language} className="px-2 py-1 bg-blue-100 text-blue-800 text-xs rounded">
                      {language}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Match Suggestions */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-lg shadow-sm p-6">
              <div className="flex items-center justify-between mb-6">
                <div>
                  <h2 className="text-xl font-bold text-gray-900">AI-Powered Match Suggestions</h2>
                  <p className="text-gray-600">Ranked by compatibility score</p>
                </div>
                <div className="flex items-center space-x-2">
                  <Heart className="w-5 h-5 text-rose-500" />
                  <span className="text-sm font-medium text-gray-700">{matches.length} matches found</span>
                </div>
              </div>

              {isLoading ? (
                <div className="text-center py-12">
                  <div className="animate-spin w-8 h-8 border-2 border-rose-500 border-t-transparent rounded-full mx-auto mb-4"></div>
                  <p className="text-gray-600">Finding perfect matches...</p>
                </div>
              ) : (
                <div className="space-y-6">
                  {matches.map(match => {
                    const matchedProfile = getMatchedProfile(match.matchId);
                    return matchedProfile ? (
                      <MatchCard
                        key={match.matchId}
                        customer={customer}
                        match={matchedProfile}
                        matchScore={match}
                      />
                    ) : null;
                  })}
                </div>
              )}

              {!isLoading && matches.length === 0 && (
                <div className="text-center py-12">
                  <Heart className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                  <h3 className="text-xl font-medium text-gray-900 mb-2">No matches found</h3>
                  <p className="text-gray-600">We're working on finding the perfect matches for this customer.</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}