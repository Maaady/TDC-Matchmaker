import { Customer, Matchmaker } from '../types';

// Sample matchmaker data
export const mockMatchmakers: Matchmaker[] = [
  {
    id: 'mm1',
    username: 'sarah.matchmaker',
    name: 'Sarah Johnson',
    email: 'sarah@tdc.com',
    customers: []
  },
  {
    id: 'mm2',
    username: 'demo',
    name: 'Demo Matchmaker',
    email: 'demo@tdc.com',
    customers: []
  }
];

// Sample customer data
export const generateMockCustomers = (): Customer[] => {
  const firstNamesMale = ['Raj', 'Arjun', 'Vikram', 'Rohit', 'Amit', 'Karan', 'Nikhil', 'Ravi', 'Suresh', 'Deepak'];
  const firstNamesFemale = ['Priya', 'Anita', 'Kavya', 'Sneha', 'Pooja', 'Meera', 'Sasha', 'Ritika', 'Neha', 'Divya'];
  const lastNames = ['Sharma', 'Patel', 'Kumar', 'Singh', 'Gupta', 'Agarwal', 'Jain', 'Shah', 'Mehta', 'Verma'];
  const cities = ['Mumbai', 'Delhi', 'Bangalore', 'Hyderabad', 'Chennai', 'Pune', 'Kolkata', 'Ahmedabad'];
  const colleges = ['IIT Delhi', 'IIM Bangalore', 'Delhi University', 'Mumbai University', 'VIT', 'SRM', 'Manipal'];
  const degrees = ['B.Tech', 'MBA', 'B.Com', 'M.Tech', 'CA', 'B.Sc', 'M.Sc', 'BBA'];
  const companies = ['TCS', 'Infosys', 'Wipro', 'Google', 'Microsoft', 'Amazon', 'Flipkart', 'Accenture'];
  const designations = ['Software Engineer', 'Manager', 'Senior Developer', 'Consultant', 'Analyst', 'Team Lead'];
  const religions = ['Hindu', 'Christian', 'Muslim', 'Sikh', 'Jain'];
  const castes = ['General', 'OBC', 'SC', 'ST', 'Brahmin', 'Kshatriya', 'Vaishya'];
  const languages = [['Hindi', 'English'], ['English', 'Tamil'], ['Hindi', 'Marathi'], ['English', 'Telugu'], ['Hindi', 'Gujarati']];

  const customers: Customer[] = [];
  
  // Generate 50 customers (mix of male and female)
  for (let i = 0; i < 50; i++) {
    const isMale = i % 2 === 0;
    const gender = isMale ? 'male' : 'female';
    const firstName = isMale 
      ? firstNamesMale[Math.floor(Math.random() * firstNamesMale.length)]
      : firstNamesFemale[Math.floor(Math.random() * firstNamesFemale.length)];
    
    const age = 25 + Math.floor(Math.random() * 15);
    const birthYear = new Date().getFullYear() - age;
    
    customers.push({
      id: `cust_${i + 1}`,
      firstName,
      lastName: lastNames[Math.floor(Math.random() * lastNames.length)],
      gender,
      dateOfBirth: `${birthYear}-${String(Math.floor(Math.random() * 12) + 1).padStart(2, '0')}-${String(Math.floor(Math.random() * 28) + 1).padStart(2, '0')}`,
      age,
      country: 'India',
      city: cities[Math.floor(Math.random() * cities.length)],
      height: isMale ? 165 + Math.floor(Math.random() * 25) : 150 + Math.floor(Math.random() * 20),
      email: `${firstName.toLowerCase()}.${lastNames[Math.floor(Math.random() * lastNames.length)].toLowerCase()}@email.com`,
      phoneNumber: `+91-9${Math.floor(Math.random() * 900000000) + 100000000}`,
      undergraduateCollege: colleges[Math.floor(Math.random() * colleges.length)],
      degree: degrees[Math.floor(Math.random() * degrees.length)],
      income: isMale 
        ? 800000 + Math.floor(Math.random() * 1500000)  // Male: 8L - 23L
        : 600000 + Math.floor(Math.random() * 1200000), // Female: 6L - 18L
      currentCompany: companies[Math.floor(Math.random() * companies.length)],
      designation: designations[Math.floor(Math.random() * designations.length)],
      maritalStatus: Math.random() > 0.9 ? 'divorced' : 'single',
      languagesKnown: languages[Math.floor(Math.random() * languages.length)],
      siblings: Math.floor(Math.random() * 4),
      caste: castes[Math.floor(Math.random() * castes.length)],
      religion: religions[Math.floor(Math.random() * religions.length)],
      wantKids: Math.random() > 0.7 ? 'maybe' : Math.random() > 0.3 ? 'yes' : 'no',
      openToRelocate: Math.random() > 0.6 ? 'yes' : Math.random() > 0.3 ? 'maybe' : 'no',
      openToPets: Math.random() > 0.6 ? 'yes' : Math.random() > 0.3 ? 'maybe' : 'no',
      status: ['active', 'reviewing', 'matched', 'paused'][Math.floor(Math.random() * 4)] as any,
      matchmakerId: 'mm2',
      createdAt: new Date(Date.now() - Math.floor(Math.random() * 90) * 24 * 60 * 60 * 1000).toISOString(),
      lastActive: new Date(Date.now() - Math.floor(Math.random() * 7) * 24 * 60 * 60 * 1000).toISOString()
    });
  }

  return customers;
};

// Generate 100+ dummy profiles for matching
export const generateDummyProfiles = (): Customer[] => {
  const firstNamesMale = ['Akash', 'Raman', 'Siddharth', 'Aditya', 'Varun', 'Neeraj', 'Shubham', 'Ankit', 'Rahul', 'Abhishek'];
  const firstNamesFemale = ['Shreya', 'Ankita', 'Swati', 'Nidhi', 'Simran', 'Pallavi', 'Ruchika', 'Aditi', 'Shweta', 'Manisha'];
  const lastNames = ['Agrawal', 'Bansal', 'Chopra', 'Dutta', 'Goel', 'Kapoor', 'Malhotra', 'Nair', 'Reddy', 'Sinha'];
  const cities = ['Gurgaon', 'Noida', 'Chandigarh', 'Jaipur', 'Lucknow', 'Indore', 'Bhopal', 'Nagpur'];
  
  const profiles: Customer[] = [];
  
  for (let i = 0; i < 120; i++) {
    const isMale = Math.random() > 0.5;
    const gender = isMale ? 'male' : 'female';
    const firstName = isMale 
      ? firstNamesMale[Math.floor(Math.random() * firstNamesMale.length)]
      : firstNamesFemale[Math.floor(Math.random() * firstNamesFemale.length)];
    
    const age = 23 + Math.floor(Math.random() * 17);
    const birthYear = new Date().getFullYear() - age;
    
    profiles.push({
      id: `dummy_${i + 1}`,
      firstName,
      lastName: lastNames[Math.floor(Math.random() * lastNames.length)],
      gender,
      dateOfBirth: `${birthYear}-${String(Math.floor(Math.random() * 12) + 1).padStart(2, '0')}-${String(Math.floor(Math.random() * 28) + 1).padStart(2, '0')}`,
      age,
      country: 'India',
      city: cities[Math.floor(Math.random() * cities.length)],
      height: isMale ? 165 + Math.floor(Math.random() * 25) : 150 + Math.floor(Math.random() * 20),
      email: `${firstName.toLowerCase()}${i}@email.com`,
      phoneNumber: `+91-8${Math.floor(Math.random() * 900000000) + 100000000}`,
      undergraduateCollege: ['BITS Pilani', 'NIT Trichy', 'IIIT Hyderabad', 'DTU', 'NSIT'][Math.floor(Math.random() * 5)],
      degree: ['B.Tech', 'MBA', 'B.Com', 'M.Tech', 'CA'][Math.floor(Math.random() * 5)],
      income: isMale 
        ? 700000 + Math.floor(Math.random() * 1800000)
        : 500000 + Math.floor(Math.random() * 1500000),
      currentCompany: ['HCL', 'Cognizant', 'IBM', 'Oracle', 'Adobe', 'Salesforce'][Math.floor(Math.random() * 6)],
      designation: ['Developer', 'Analyst', 'Manager', 'Lead', 'Consultant'][Math.floor(Math.random() * 5)],
      maritalStatus: 'single',
      languagesKnown: [['Hindi', 'English'], ['English', 'Punjabi'], ['Hindi', 'Bengali']][Math.floor(Math.random() * 3)],
      siblings: Math.floor(Math.random() * 3),
      caste: ['General', 'OBC', 'Brahmin', 'Kshatriya'][Math.floor(Math.random() * 4)],
      religion: ['Hindu', 'Sikh', 'Christian'][Math.floor(Math.random() * 3)],
      wantKids: ['yes', 'no', 'maybe'][Math.floor(Math.random() * 3)] as any,
      openToRelocate: ['yes', 'no', 'maybe'][Math.floor(Math.random() * 3)] as any,
      openToPets: ['yes', 'no', 'maybe'][Math.floor(Math.random() * 3)] as any,
      status: 'active',
      matchmakerId: '',
      createdAt: new Date().toISOString(),
      lastActive: new Date().toISOString()
    });
  }

  return profiles;
};