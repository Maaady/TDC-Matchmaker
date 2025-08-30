import { Customer, MatchScore } from '../types';

export class MatchingAlgorithm {
  
  static calculateMatch(customer: Customer, potentialMatch: Customer): MatchScore {
    if (customer.gender === potentialMatch.gender) {
      return {
        customerId: customer.id,
        matchId: potentialMatch.id,
        score: 0,
        explanation: 'Same gender - not compatible',
        factors: { age: 0, income: 0, height: 0, children: 0, relocation: 0, profession: 0, values: 0 },
        recommendation: 'low'
      };
    }

    if (customer.gender === 'male') {
      return this.calculateMaleMatch(customer, potentialMatch);
    } else {
      return this.calculateFemaleMatch(customer, potentialMatch);
    }
  }

  private static calculateMaleMatch(male: Customer, female: Customer): MatchScore {
    const factors = {
      age: 0,
      income: 0,
      height: 0,
      children: 0,
      relocation: 0,
      profession: 0,
      values: 0
    };

    // Age factor - prefer younger females
    const ageDiff = male.age - female.age;
    if (ageDiff >= -2 && ageDiff <= 8) {
      factors.age = ageDiff >= 0 ? 90 + ageDiff * 2 : 80;
    } else if (ageDiff < -2) {
      factors.age = Math.max(40, 80 + ageDiff * 5);
    } else {
      factors.age = Math.max(30, 90 - (ageDiff - 8) * 8);
    }

    // Income factor - prefer lower earning females
    const incomeRatio = female.income / male.income;
    if (incomeRatio <= 0.8) {
      factors.income = 95 - (incomeRatio * 20);
    } else if (incomeRatio <= 1.0) {
      factors.income = 75;
    } else {
      factors.income = Math.max(30, 75 - (incomeRatio - 1) * 100);
    }

    // Height factor - prefer shorter females
    const heightDiff = male.height - female.height;
    if (heightDiff >= 5 && heightDiff <= 20) {
      factors.height = 95;
    } else if (heightDiff >= 0) {
      factors.height = 80;
    } else {
      factors.height = Math.max(20, 70 + heightDiff * 2);
    }

    // Children compatibility
    if (male.wantKids === female.wantKids) {
      factors.children = 100;
    } else if (male.wantKids === 'maybe' || female.wantKids === 'maybe') {
      factors.children = 75;
    } else {
      factors.children = 20;
    }

    // Relocation compatibility
    if (male.city === female.city) {
      factors.relocation = 100;
    } else if (male.openToRelocate === 'yes' || female.openToRelocate === 'yes') {
      factors.relocation = 85;
    } else if (male.openToRelocate === 'maybe' || female.openToRelocate === 'maybe') {
      factors.relocation = 60;
    } else {
      factors.relocation = 25;
    }

    // Profession compatibility (basic)
    const maleIncomeBand = this.getIncomeBand(male.income);
    const femaleIncomeBand = this.getIncomeBand(female.income);
    factors.profession = Math.max(50, 100 - Math.abs(maleIncomeBand - femaleIncomeBand) * 15);

    // Values compatibility (religion, caste)
    if (male.religion === female.religion) {
      factors.values = 90;
    } else if (male.religion === 'Hindu' && female.religion === 'Hindu') {
      factors.values = 80;
    } else {
      factors.values = 50;
    }

    // Calculate weighted score
    const totalScore = (
      factors.age * 0.20 +
      factors.income * 0.15 +
      factors.height * 0.15 +
      factors.children * 0.20 +
      factors.relocation * 0.15 +
      factors.profession * 0.10 +
      factors.values * 0.05
    );

    const explanation = this.generateMaleMatchExplanation(factors, male, female);
    const recommendation = totalScore >= 80 ? 'high' : totalScore >= 60 ? 'medium' : 'low';

    return {
      customerId: male.id,
      matchId: female.id,
      score: Math.round(totalScore),
      explanation,
      factors,
      recommendation
    };
  }

  private static calculateFemaleMatch(female: Customer, male: Customer): MatchScore {
    const factors = {
      age: 0,
      income: 0,
      height: 0,
      children: 0,
      relocation: 0,
      profession: 0,
      values: 0
    };

    // Age factor - prefer slightly older or same age males
    const ageDiff = male.age - female.age;
    if (ageDiff >= -1 && ageDiff <= 7) {
      factors.age = ageDiff >= 0 ? 90 + Math.min(ageDiff * 2, 10) : 85;
    } else {
      factors.age = Math.max(30, 85 - Math.abs(ageDiff - 3) * 8);
    }

    // Income factor - prefer higher earning males
    const incomeRatio = male.income / female.income;
    if (incomeRatio >= 1.2) {
      factors.income = Math.min(100, 70 + (incomeRatio - 1) * 30);
    } else if (incomeRatio >= 1.0) {
      factors.income = 85;
    } else {
      factors.income = Math.max(40, 85 - (1 - incomeRatio) * 80);
    }

    // Height compatibility
    const heightDiff = male.height - female.height;
    if (heightDiff >= 5 && heightDiff <= 20) {
      factors.height = 95;
    } else if (heightDiff >= 0) {
      factors.height = 80;
    } else {
      factors.height = Math.max(30, 70 + heightDiff * 3);
    }

    // Children compatibility
    if (female.wantKids === male.wantKids) {
      factors.children = 100;
    } else if (female.wantKids === 'maybe' || male.wantKids === 'maybe') {
      factors.children = 75;
    } else {
      factors.children = 25;
    }

    // Relocation compatibility
    if (female.city === male.city) {
      factors.relocation = 100;
    } else if (female.openToRelocate === 'yes') {
      factors.relocation = 85;
    } else if (male.openToRelocate === 'yes') {
      factors.relocation = 80;
    } else if (female.openToRelocate === 'maybe' || male.openToRelocate === 'maybe') {
      factors.relocation = 60;
    } else {
      factors.relocation = 30;
    }

    // Profession compatibility - focus on career balance
    const femaleCareerLevel = this.getCareerLevel(female);
    const maleCareerLevel = this.getCareerLevel(male);
    const careerBalance = Math.abs(femaleCareerLevel - maleCareerLevel);
    factors.profession = Math.max(60, 100 - careerBalance * 12);

    // Values compatibility
    if (female.religion === male.religion) {
      factors.values = 90;
    } else {
      factors.values = 55;
    }

    // Calculate weighted score for female perspective
    const totalScore = (
      factors.age * 0.18 +
      factors.income * 0.18 +
      factors.height * 0.12 +
      factors.children * 0.22 +
      factors.relocation * 0.15 +
      factors.profession * 0.10 +
      factors.values * 0.05
    );

    const explanation = this.generateFemaleMatchExplanation(factors, female, male);
    const recommendation = totalScore >= 80 ? 'high' : totalScore >= 65 ? 'medium' : 'low';

    return {
      customerId: female.id,
      matchId: male.id,
      score: Math.round(totalScore),
      explanation,
      factors,
      recommendation
    };
  }

  private static getIncomeBand(income: number): number {
    if (income < 500000) return 1;
    if (income < 1000000) return 2;
    if (income < 1500000) return 3;
    if (income < 2000000) return 4;
    return 5;
  }

  private static getCareerLevel(customer: Customer): number {
    const designation = customer.designation.toLowerCase();
    if (designation.includes('lead') || designation.includes('manager') || designation.includes('senior')) return 3;
    if (designation.includes('developer') || designation.includes('analyst')) return 2;
    return 1;
  }

  private static generateMaleMatchExplanation(factors: any, male: Customer, female: Customer): string {
    const strengths = [];
    const concerns = [];

    if (factors.age >= 80) strengths.push('Ideal age gap');
    else if (factors.age < 60) concerns.push('Age difference may be challenging');

    if (factors.income >= 80) strengths.push('Compatible income levels');
    else if (factors.income < 60) concerns.push('Significant income disparity');

    if (factors.height >= 85) strengths.push('Good height compatibility');
    
    if (factors.children >= 90) strengths.push('Aligned on having children');
    else if (factors.children < 50) concerns.push('Different views on children');

    if (factors.relocation >= 80) strengths.push('Location compatibility');

    return strengths.length > concerns.length 
      ? `Strong match potential: ${strengths.join(', ')}`
      : `Mixed compatibility: ${concerns.join(', ')} but ${strengths.join(', ')}`;
  }

  private static generateFemaleMatchExplanation(factors: any, female: Customer, male: Customer): string {
    const strengths = [];
    const concerns = [];

    if (factors.age >= 80) strengths.push('Good age compatibility');
    if (factors.income >= 80) strengths.push('Financial stability');
    if (factors.height >= 85) strengths.push('Height compatibility');
    if (factors.children >= 90) strengths.push('Shared family goals');
    if (factors.relocation >= 80) strengths.push('Location flexibility');
    if (factors.profession >= 70) strengths.push('Career balance');

    if (factors.income < 60) concerns.push('Income concerns');
    if (factors.children < 50) concerns.push('Different family plans');

    return strengths.length >= 3 
      ? `Excellent match: ${strengths.slice(0, 3).join(', ')}`
      : `Moderate compatibility with ${strengths.length > 0 ? strengths.join(', ') : 'some challenges'}`;
  }

  static findBestMatches(customer: Customer, potentialMatches: Customer[], limit: number = 10): MatchScore[] {
    const scores = potentialMatches
      .filter(match => match.gender !== customer.gender)
      .map(match => this.calculateMatch(customer, match))
      .sort((a, b) => b.score - a.score);

    return scores.slice(0, limit);
  }
}