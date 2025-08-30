export interface Customer {
  id: string;
  firstName: string;
  lastName: string;
  gender: 'male' | 'female';
  dateOfBirth: string;
  age: number;
  country: string;
  city: string;
  height: number; // in cm
  email: string;
  phoneNumber: string;
  undergraduateCollege: string;
  degree: string;
  income: number; // annual in USD
  currentCompany: string;
  designation: string;
  maritalStatus: 'single' | 'divorced' | 'widowed';
  languagesKnown: string[];
  siblings: number;
  caste: string;
  religion: string;
  wantKids: 'yes' | 'no' | 'maybe';
  openToRelocate: 'yes' | 'no' | 'maybe';
  openToPets: 'yes' | 'no' | 'maybe';
  status: 'active' | 'reviewing' | 'matched' | 'paused';
  matchmakerId: string;
  profilePicture?: string;
  createdAt: string;
  lastActive: string;
}

export interface MatchScore {
  customerId: string;
  matchId: string;
  score: number;
  explanation: string;
  factors: {
    age: number;
    income: number;
    height: number;
    children: number;
    relocation: number;
    profession: number;
    values: number;
  };
  recommendation: 'high' | 'medium' | 'low';
}

export interface Matchmaker {
  id: string;
  username: string;
  name: string;
  email: string;
  customers: string[];
}

export interface MatchIntroduction {
  customerName: string;
  matchName: string;
  introduction: string;
  highlights: string[];
}