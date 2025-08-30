import { MatchIntroduction, Customer, MatchScore } from '../types';

export class AIService {
  
  // Simulated AI service for generating personalized introductions
  static async generateIntroduction(customer: Customer, match: Customer, matchScore: MatchScore): Promise<MatchIntroduction> {
    // In a real implementation, this would call OpenAI API
    // For now, we'll create intelligent rule-based introductions
    
    const highlights = this.getMatchHighlights(customer, match, matchScore);
    const introduction = this.craftPersonalizedIntro(customer, match, highlights, matchScore);
    
    return {
      customerName: `${customer.firstName} ${customer.lastName}`,
      matchName: `${match.firstName} ${match.lastName}`,
      introduction,
      highlights
    };
  }

  private static getMatchHighlights(customer: Customer, match: Customer, matchScore: MatchScore): string[] {
    const highlights = [];
    
    // Age compatibility
    if (matchScore.factors.age >= 85) {
      highlights.push(`Perfect age compatibility (${Math.abs(customer.age - match.age)} year difference)`);
    }
    
    // Professional compatibility
    if (matchScore.factors.profession >= 75) {
      highlights.push(`Both are established professionals in their fields`);
    }
    
    // Location
    if (customer.city === match.city) {
      highlights.push(`Both based in ${customer.city}`);
    } else if (matchScore.factors.relocation >= 70) {
      highlights.push(`Open to relocation for the right match`);
    }
    
    // Education
    if (this.isTopTierEducation(customer.undergraduateCollege) && this.isTopTierEducation(match.undergraduateCollege)) {
      highlights.push(`Both from premier educational institutions`);
    }
    
    // Family values
    if (matchScore.factors.children >= 90) {
      highlights.push(`Aligned family planning goals`);
    }
    
    // Income compatibility
    if (customer.gender === 'male' && matchScore.factors.income >= 80) {
      highlights.push(`Complementary career aspirations`);
    }
    
    return highlights.slice(0, 4);
  }

  private static craftPersonalizedIntro(customer: Customer, match: Customer, highlights: string[], matchScore: MatchScore): string {
    const templates = [
      `We're excited to introduce ${match.firstName}, a ${match.age}-year-old ${match.designation} at ${match.currentCompany}. Based on ${customer.firstName}'s preferences and our compatibility analysis, we believe this could be a wonderful match.`,
      
      `Meet ${match.firstName} - a ${match.designation} from ${match.city} who shares many of ${customer.firstName}'s values and life goals. Our matching algorithm indicates strong compatibility across multiple dimensions.`,
      
      `${customer.firstName}, we'd love to introduce you to ${match.firstName}, a ${match.age}-year-old professional who we think could be an excellent match based on your shared interests and complementary qualities.`
    ];
    
    const template = templates[Math.floor(Math.random() * templates.length)];
    
    let introduction = template;
    
    if (highlights.length > 0) {
      introduction += `\n\nKey compatibility factors:\n${highlights.map(h => `• ${h}`).join('\n')}`;
    }
    
    // Add personalized closing based on match score
    if (matchScore.recommendation === 'high') {
      introduction += `\n\nWe're particularly excited about this introduction given the strong alignment in your core values and life goals.`;
    } else if (matchScore.recommendation === 'medium') {
      introduction += `\n\nWhile every match is unique, we see promising potential for a meaningful connection.`;
    }
    
    return introduction;
  }

  private static isTopTierEducation(college: string): boolean {
    const topTier = ['IIT', 'IIM', 'BITS', 'NIT', 'IIIT'];
    return topTier.some(tier => college.includes(tier));
  }

  // Enhanced match scoring with AI-like reasoning
  static enhanceMatchScore(baseScore: MatchScore, customer: Customer, match: Customer): MatchScore {
    let enhancedScore = baseScore.score;
    let enhancedExplanation = baseScore.explanation;
    
    // Apply AI-like enhancements
    const personalityFactors = this.analyzePersonalityCompatibility(customer, match);
    const lifestyleFactors = this.analyzeLifestyleCompatibility(customer, match);
    
    enhancedScore = Math.min(100, enhancedScore + personalityFactors + lifestyleFactors);
    
    if (personalityFactors > 5) {
      enhancedExplanation += ` Strong personality alignment detected.`;
    }
    
    if (lifestyleFactors > 5) {
      enhancedExplanation += ` Complementary lifestyle preferences.`;
    }
    
    return {
      ...baseScore,
      score: Math.round(enhancedScore),
      explanation: enhancedExplanation
    };
  }

  private static analyzePersonalityCompatibility(customer: Customer, match: Customer): number {
    let bonus = 0;
    
    // Education level compatibility
    if (customer.degree.includes('MBA') && match.degree.includes('B.Tech')) bonus += 3;
    if (customer.degree === match.degree) bonus += 2;
    
    // Language compatibility
    const commonLanguages = customer.languagesKnown.filter(lang => 
      match.languagesKnown.includes(lang)
    ).length;
    bonus += commonLanguages * 2;
    
    return Math.min(8, bonus);
  }

  private static analyzeLifestyleCompatibility(customer: Customer, match: Customer): number {
    let bonus = 0;
    
    // Pet compatibility
    if (customer.openToPets === match.openToPets) bonus += 2;
    
    // Sibling similarity (family structure)
    const siblingDiff = Math.abs(customer.siblings - match.siblings);
    if (siblingDiff <= 1) bonus += 2;
    
    // Company size compatibility (rough proxy for work culture)
    const customerCorpSize = this.getCompanySize(customer.currentCompany);
    const matchCorpSize = this.getCompanySize(match.currentCompany);
    if (customerCorpSize === matchCorpSize) bonus += 1;
    
    return Math.min(6, bonus);
  }

  private static getCompanySize(company: string): 'large' | 'medium' | 'small' {
    const largeCorp = ['Google', 'Microsoft', 'Amazon', 'TCS', 'Infosys', 'Wipro', 'Accenture'];
    if (largeCorp.includes(company)) return 'large';
    return 'medium';
  }
}