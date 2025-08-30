import React, { useState } from 'react';
import { Heart, Send, Star, MapPin, Briefcase, GraduationCap, Baby, Home, PawPrint, Mail, CheckCircle } from 'lucide-react';
import { Customer, MatchScore } from '../types';
import { AIService } from '../utils/aiService';

interface MatchCardProps {
  customer: Customer;
  match: Customer;
  matchScore: MatchScore;
}

export default function MatchCard({ customer, match, matchScore }: MatchCardProps) {
  const [showDetails, setShowDetails] = useState(false);
  const [isMatchSent, setIsMatchSent] = useState(false);
  const [isGeneratingIntro, setIsGeneratingIntro] = useState(false);

  const formatCurrency = (amount: number) => {
    return `₹${(amount / 100000).toFixed(1)}L`;
  };

  const formatHeight = (height: number) => {
    return `${Math.floor(height / 30.48)}' ${((height % 30.48) / 2.54).toFixed(0)}"`;
  };

  const getScoreColor = (score: number) => {
    if (score >= 80) return 'match-score-high';
    if (score >= 60) return 'match-score-medium';
    return 'match-score-low';
  };

  const getRecommendationBadge = (recommendation: string) => {
    switch (recommendation) {
      case 'high':
        return 'bg-green-100 text-green-800 border-green-200';
      case 'medium':
        return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 'low':
        return 'bg-red-100 text-red-800 border-red-200';
      default:
        return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const handleSendMatch = async () => {
    setIsGeneratingIntro(true);
    
    try {
      // Generate AI introduction
      const introduction = await AIService.generateIntroduction(customer, match, matchScore);
      
      // Simulate sending email
      setTimeout(() => {
        setIsMatchSent(true);
        setIsGeneratingIntro(false);
        
        // Show success toast/modal (for demo, we'll just update state)
        alert(`Match sent successfully!\n\nIntroduction: ${introduction.introduction}`);
      }, 2000);
      
    } catch (error) {
      setIsGeneratingIntro(false);
      alert('Failed to send match. Please try again.');
    }
  };

  return (
    <div className="border border-gray-200 rounded-lg hover:shadow-md transition-all">
      {/* Match Header */}
      <div className="p-6 border-b border-gray-100">
        <div className="flex items-start justify-between">
          <div className="flex-1">
            <div className="flex items-center space-x-3 mb-2">
              <div className="w-12 h-12 bg-gradient-to-r from-purple-400 to-blue-500 rounded-full flex items-center justify-center">
                <span className="text-lg font-bold text-white">
                  {match.firstName.charAt(0)}{match.lastName.charAt(0)}
                </span>
              </div>
              <div>
                <h3 className="text-lg font-semibold text-gray-900">
                  {match.firstName} {match.lastName}
                </h3>
                <p className="text-gray-600">{match.age} years old • {match.city}</p>
              </div>
            </div>
            
            <div className="flex items-center space-x-4 text-sm text-gray-600">
              <div className="flex items-center">
                <Briefcase className="w-4 h-4 mr-1" />
                <span>{match.designation} at {match.currentCompany}</span>
              </div>
              <div>
                <span className="font-medium">{formatCurrency(match.income)}</span>
              </div>
              <div>
                <span>{formatHeight(match.height)}</span>
              </div>
            </div>
          </div>

          <div className="text-right">
            <div className={`inline-flex items-center px-3 py-1 rounded-full text-white text-sm font-medium ${getScoreColor(matchScore.score)}`}>
              <Star className="w-4 h-4 mr-1" />
              {matchScore.score}%
            </div>
            <div className={`mt-2 px-3 py-1 text-xs font-medium rounded-full border ${getRecommendationBadge(matchScore.recommendation)}`}>
              {matchScore.recommendation.toUpperCase()} POTENTIAL
            </div>
          </div>
        </div>

        {/* AI Explanation */}
        <div className="mt-4 p-4 bg-blue-50 rounded-lg">
          <p className="text-sm text-blue-800">
            <strong>AI Analysis:</strong> {matchScore.explanation}
          </p>
        </div>
      </div>

      {/* Compatibility Factors */}
      <div className="p-6 border-b border-gray-100">
        <h4 className="font-medium text-gray-900 mb-3">Compatibility Breakdown</h4>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {Object.entries(matchScore.factors).map(([factor, score]) => (
            <div key={factor} className="text-center">
              <div className="text-lg font-semibold text-gray-900">{Math.round(score)}%</div>
              <div className="text-xs text-gray-600 capitalize">{factor}</div>
              <div className="w-full bg-gray-200 rounded-full h-1 mt-1">
                <div 
                  className={`h-1 rounded-full ${score >= 80 ? 'bg-green-500' : score >= 60 ? 'bg-yellow-500' : 'bg-red-500'}`}
                  style={{ width: `${score}%` }}
                ></div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Profile Details (Toggleable) */}
      {showDetails && (
        <div className="p-6 border-b border-gray-100 bg-gray-50">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-3">
              <div className="flex items-center">
                <GraduationCap className="w-4 h-4 mr-2 text-gray-500" />
                <span className="text-sm">{match.degree} from {match.undergraduateCollege}</span>
              </div>
              <div className="flex items-center">
                <span className="text-sm text-gray-600">Religion:</span>
                <span className="text-sm font-medium ml-2">{match.religion}</span>
              </div>
              <div className="flex items-center">
                <span className="text-sm text-gray-600">Marital Status:</span>
                <span className="text-sm font-medium ml-2 capitalize">{match.maritalStatus}</span>
              </div>
            </div>
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <Baby className="w-4 h-4 mr-2 text-gray-500" />
                  <span className="text-sm text-gray-600">Want Kids:</span>
                </div>
                <span className="text-sm font-medium capitalize">{match.wantKids}</span>
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <Home className="w-4 h-4 mr-2 text-gray-500" />
                  <span className="text-sm text-gray-600">Relocate:</span>
                </div>
                <span className="text-sm font-medium capitalize">{match.openToRelocate}</span>
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <PawPrint className="w-4 h-4 mr-2 text-gray-500" />
                  <span className="text-sm text-gray-600">Pets:</span>
                </div>
                <span className="text-sm font-medium capitalize">{match.openToPets}</span>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Actions */}
      <div className="p-6 flex items-center justify-between">
        <button
          onClick={() => setShowDetails(!showDetails)}
          className="text-rose-600 hover:text-rose-700 font-medium text-sm"
        >
          {showDetails ? 'Hide Details' : 'View Full Profile'}
        </button>

        <div className="flex items-center space-x-3">
          <button
            onClick={handleSendMatch}
            disabled={isMatchSent || isGeneratingIntro}
            className={`flex items-center space-x-2 px-4 py-2 rounded-lg font-medium text-sm transition-all ${
              isMatchSent 
                ? 'bg-green-100 text-green-700 border border-green-200 cursor-not-allowed'
                : isGeneratingIntro
                ? 'bg-gray-100 text-gray-500 cursor-not-allowed'
                : 'bg-rose-500 hover:bg-rose-600 text-white'
            }`}
          >
            {isMatchSent ? (
              <>
                <CheckCircle className="w-4 h-4" />
                <span>Match Sent</span>
              </>
            ) : isGeneratingIntro ? (
              <>
                <div className="w-4 h-4 border-2 border-gray-400 border-t-transparent rounded-full animate-spin" />
                <span>Generating Intro...</span>
              </>
            ) : (
              <>
                <Send className="w-4 h-4" />
                <span>Send Match</span>
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
}