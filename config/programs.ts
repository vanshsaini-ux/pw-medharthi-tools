import { ProgramProfile } from '@/types';

/**
 * ⚠️ PLACEHOLDER DATA — READ BEFORE LAUNCH
 * -----------------------------------------------------------------------
 * The uploaded brief references "all 18 PW Medharthi degrees" and their
 * scoring vectors, fees, salary bands and UGC-DEB eligibility criteria,
 * but does not include the underlying values (those live in PW's internal
 * Keyword Architecture / Research Library, which wasn't part of the
 * uploaded files). To keep every tool fully functional out of the box,
 * this file contains realistic, clearly-labelled placeholder data for 18
 * programs spanning the 9 interest domains named in the brief.
 *
 * Before launch, replace the numeric fields below (fees, salary bands,
 * eligibility %, growth multipliers) with verified figures. The engines
 * in /tools do not need to change - they just read this array.
 */
const SOURCE_NOTE = 'Placeholder figure — verify against PW Medharthi Research Library before launch.';

export const PROGRAMS: ProgramProfile[] = [
  {
    id: 'p01', name: 'Online MBA', slug: 'online-mba', primaryDomain: 'business_management',
    interestWeights: { business_management: 1, finance_commerce: 0.4, people_hr: 0.3 },
    goalWeights: { promotion: 0.9, entrepreneurship: 0.8, higher_salary: 0.9, industry_switch: 0.6, skill_validation: 0.5 },
    experienceFit: { '0': 0.4, '1-3': 0.8, '3-6': 1, '6+': 0.9 },
    studyModeFit: { weekend: 0.6, daily_1hr: 0.9, flexible: 0.8 },
    feeInr: 350000, durationMonths: 24,
    jobRoles: ['General Manager', 'Business Analyst', 'Operations Manager', 'Product Manager'],
    avgStartingSalaryInr: 900000, fiveYearGrowthMultiplier: 2.4, baselineGrowthMultiplier: 1.4,
    minQualificationLevel: 'bachelor', minPercentage: 50, minExperienceYears: 0, bridgeCourseAvailable: false,
    sourceNote: SOURCE_NOTE
  },
  {
    id: 'p02', name: 'Online MBA in AI & Business Analytics', slug: 'mba-ai-business-analytics', primaryDomain: 'tech_ai',
    interestWeights: { tech_ai: 1, business_management: 0.6, finance_commerce: 0.3 },
    goalWeights: { industry_switch: 0.9, higher_salary: 0.9, promotion: 0.7, entrepreneurship: 0.5, skill_validation: 0.6 },
    experienceFit: { '0': 0.5, '1-3': 0.9, '3-6': 1, '6+': 0.7 },
    studyModeFit: { weekend: 0.5, daily_1hr: 0.9, flexible: 0.8 },
    feeInr: 380000, durationMonths: 24,
    jobRoles: ['Business Analyst', 'AI Product Manager', 'Data-driven Strategy Consultant'],
    avgStartingSalaryInr: 1000000, fiveYearGrowthMultiplier: 2.6, baselineGrowthMultiplier: 1.4,
    minQualificationLevel: 'bachelor', minPercentage: 50, minExperienceYears: 0, bridgeCourseAvailable: false,
    sourceNote: SOURCE_NOTE
  },
  {
    id: 'p03', name: 'IIT Patna — BBA with AI & ML Analytics', slug: 'iit-patna-bba-aiml', primaryDomain: 'tech_ai',
    interestWeights: { tech_ai: 1, business_management: 0.5 },
    goalWeights: { skill_validation: 0.9, higher_salary: 0.8, industry_switch: 0.7, promotion: 0.4, entrepreneurship: 0.4 },
    experienceFit: { '0': 0.9, '1-3': 0.7, '3-6': 0.4, '6+': 0.2 },
    studyModeFit: { weekend: 0.7, daily_1hr: 0.8, flexible: 0.7 },
    feeInr: 240000, durationMonths: 18,
    jobRoles: ['ML Analyst', 'Business Intelligence Analyst', 'Data Analyst'],
    avgStartingSalaryInr: 650000, fiveYearGrowthMultiplier: 2.3, baselineGrowthMultiplier: 1.3,
    minQualificationLevel: 'bachelor', minPercentage: 50, minExperienceYears: 0, bridgeCourseAvailable: true,
    sourceNote: SOURCE_NOTE
  },
  {
    id: 'p04', name: 'IIT Roorkee — BA in Generative AI', slug: 'iit-roorkee-ba-genai', primaryDomain: 'tech_ai',
    interestWeights: { tech_ai: 1, arts_communication: 0.2 },
    goalWeights: { industry_switch: 0.9, higher_salary: 0.9, skill_validation: 0.8, promotion: 0.5, entrepreneurship: 0.5 },
    experienceFit: { '0': 0.8, '1-3': 0.9, '3-6': 0.6, '6+': 0.3 },
    studyModeFit: { weekend: 0.6, daily_1hr: 0.9, flexible: 0.8 },
    feeInr: 260000, durationMonths: 18,
    jobRoles: ['Generative AI Engineer', 'AI Product Analyst', 'Prompt Engineer'],
    avgStartingSalaryInr: 800000, fiveYearGrowthMultiplier: 2.7, baselineGrowthMultiplier: 1.3,
    minQualificationLevel: 'bachelor', minPercentage: 50, minExperienceYears: 0, bridgeCourseAvailable: true,
    sourceNote: SOURCE_NOTE
  },
  {
    id: 'p05', name: 'PG Certificate in HR Management', slug: 'pg-cert-hr-management', primaryDomain: 'people_hr',
    interestWeights: { people_hr: 1, business_management: 0.3 },
    goalWeights: { promotion: 0.9, skill_validation: 0.7, higher_salary: 0.6, industry_switch: 0.5, entrepreneurship: 0.2 },
    experienceFit: { '0': 0.3, '1-3': 0.8, '3-6': 1, '6+': 0.8 },
    studyModeFit: { weekend: 0.9, daily_1hr: 0.6, flexible: 0.9 },
    feeInr: 90000, durationMonths: 6,
    jobRoles: ['HR Executive', 'Talent Acquisition Specialist', 'HR Business Partner'],
    avgStartingSalaryInr: 550000, fiveYearGrowthMultiplier: 1.9, baselineGrowthMultiplier: 1.4,
    minQualificationLevel: 'bachelor', minPercentage: 45, minExperienceYears: 0, bridgeCourseAvailable: false,
    sourceNote: SOURCE_NOTE
  },
  {
    id: 'p06', name: 'Executive PG Program in HR Analytics', slug: 'exec-pg-hr-analytics', primaryDomain: 'people_hr',
    interestWeights: { people_hr: 1, tech_ai: 0.3 },
    goalWeights: { promotion: 1, higher_salary: 0.8, industry_switch: 0.4, skill_validation: 0.6, entrepreneurship: 0.2 },
    experienceFit: { '0': 0.1, '1-3': 0.5, '3-6': 1, '6+': 1 },
    studyModeFit: { weekend: 0.8, daily_1hr: 0.6, flexible: 0.8 },
    feeInr: 210000, durationMonths: 12,
    jobRoles: ['HR Analytics Lead', 'People Analytics Manager', 'HRBP'],
    avgStartingSalaryInr: 950000, fiveYearGrowthMultiplier: 2.0, baselineGrowthMultiplier: 1.5,
    minQualificationLevel: 'bachelor', minPercentage: 50, minExperienceYears: 2, bridgeCourseAvailable: false,
    sourceNote: SOURCE_NOTE
  },
  {
    id: 'p07', name: 'PG Diploma in Corporate Law & Compliance', slug: 'pgd-corporate-law-compliance', primaryDomain: 'law_compliance',
    interestWeights: { law_compliance: 1, business_management: 0.3 },
    goalWeights: { promotion: 0.8, skill_validation: 0.8, higher_salary: 0.6, industry_switch: 0.5, entrepreneurship: 0.2 },
    experienceFit: { '0': 0.4, '1-3': 0.8, '3-6': 1, '6+': 0.7 },
    studyModeFit: { weekend: 0.8, daily_1hr: 0.6, flexible: 0.8 },
    feeInr: 150000, durationMonths: 9,
    jobRoles: ['Compliance Officer', 'Corporate Legal Associate', 'Contracts Manager'],
    avgStartingSalaryInr: 700000, fiveYearGrowthMultiplier: 1.9, baselineGrowthMultiplier: 1.4,
    minQualificationLevel: 'bachelor', minPercentage: 50, minExperienceYears: 0, bridgeCourseAvailable: false,
    sourceNote: SOURCE_NOTE
  },
  {
    id: 'p08', name: 'Certificate in Cyber Law & Data Privacy', slug: 'cert-cyber-law-data-privacy', primaryDomain: 'law_compliance',
    interestWeights: { law_compliance: 1, tech_ai: 0.3 },
    goalWeights: { skill_validation: 0.9, industry_switch: 0.6, higher_salary: 0.5, promotion: 0.6, entrepreneurship: 0.2 },
    experienceFit: { '0': 0.6, '1-3': 0.9, '3-6': 0.7, '6+': 0.4 },
    studyModeFit: { weekend: 0.9, daily_1hr: 0.5, flexible: 0.9 },
    feeInr: 60000, durationMonths: 4,
    jobRoles: ['Data Privacy Analyst', 'Compliance Associate'],
    avgStartingSalaryInr: 600000, fiveYearGrowthMultiplier: 1.8, baselineGrowthMultiplier: 1.4,
    minQualificationLevel: 'bachelor', minPercentage: 45, minExperienceYears: 0, bridgeCourseAvailable: false,
    sourceNote: SOURCE_NOTE
  },
  {
    id: 'p09', name: 'PG Program in Financial Management', slug: 'pg-financial-management', primaryDomain: 'finance_commerce',
    interestWeights: { finance_commerce: 1, business_management: 0.4 },
    goalWeights: { promotion: 0.8, higher_salary: 0.9, skill_validation: 0.6, industry_switch: 0.5, entrepreneurship: 0.4 },
    experienceFit: { '0': 0.4, '1-3': 0.8, '3-6': 1, '6+': 0.8 },
    studyModeFit: { weekend: 0.7, daily_1hr: 0.7, flexible: 0.8 },
    feeInr: 220000, durationMonths: 12,
    jobRoles: ['Financial Analyst', 'Finance Manager', 'FP&A Analyst'],
    avgStartingSalaryInr: 850000, fiveYearGrowthMultiplier: 2.1, baselineGrowthMultiplier: 1.4,
    minQualificationLevel: 'bachelor', minPercentage: 50, minExperienceYears: 0, bridgeCourseAvailable: false,
    sourceNote: SOURCE_NOTE
  },
  {
    id: 'p10', name: 'Certificate in Investment Banking & Capital Markets', slug: 'cert-investment-banking', primaryDomain: 'finance_commerce',
    interestWeights: { finance_commerce: 1 },
    goalWeights: { higher_salary: 1, industry_switch: 0.7, skill_validation: 0.7, promotion: 0.5, entrepreneurship: 0.2 },
    experienceFit: { '0': 0.6, '1-3': 1, '3-6': 0.7, '6+': 0.3 },
    studyModeFit: { weekend: 0.8, daily_1hr: 0.6, flexible: 0.8 },
    feeInr: 130000, durationMonths: 6,
    jobRoles: ['Investment Banking Analyst', 'Equity Research Analyst'],
    avgStartingSalaryInr: 900000, fiveYearGrowthMultiplier: 2.2, baselineGrowthMultiplier: 1.3,
    minQualificationLevel: 'bachelor', minPercentage: 55, minExperienceYears: 0, bridgeCourseAvailable: false,
    sourceNote: SOURCE_NOTE
  },
  {
    id: 'p11', name: 'MSc in Data Science', slug: 'msc-data-science', primaryDomain: 'science_research',
    interestWeights: { science_research: 1, tech_ai: 0.6 },
    goalWeights: { industry_switch: 0.8, higher_salary: 0.9, skill_validation: 0.8, promotion: 0.4, entrepreneurship: 0.3 },
    experienceFit: { '0': 0.7, '1-3': 0.9, '3-6': 0.6, '6+': 0.3 },
    studyModeFit: { weekend: 0.5, daily_1hr: 0.9, flexible: 0.7 },
    feeInr: 300000, durationMonths: 24,
    jobRoles: ['Data Scientist', 'ML Engineer', 'Research Analyst'],
    avgStartingSalaryInr: 950000, fiveYearGrowthMultiplier: 2.5, baselineGrowthMultiplier: 1.3,
    minQualificationLevel: 'bachelor', minPercentage: 55, minExperienceYears: 0, bridgeCourseAvailable: true,
    sourceNote: SOURCE_NOTE
  },
  {
    id: 'p12', name: 'PG Diploma in Applied Research Methods', slug: 'pgd-applied-research-methods', primaryDomain: 'science_research',
    interestWeights: { science_research: 1 },
    goalWeights: { skill_validation: 0.9, promotion: 0.6, higher_salary: 0.5, industry_switch: 0.5, entrepreneurship: 0.2 },
    experienceFit: { '0': 0.6, '1-3': 0.8, '3-6': 0.8, '6+': 0.5 },
    studyModeFit: { weekend: 0.7, daily_1hr: 0.6, flexible: 0.8 },
    feeInr: 140000, durationMonths: 9,
    jobRoles: ['Research Associate', 'Data Analyst'],
    avgStartingSalaryInr: 600000, fiveYearGrowthMultiplier: 1.8, baselineGrowthMultiplier: 1.3,
    minQualificationLevel: 'bachelor', minPercentage: 50, minExperienceYears: 0, bridgeCourseAvailable: false,
    sourceNote: SOURCE_NOTE
  },
  {
    id: 'p13', name: 'PG Certificate in Healthcare Management', slug: 'pg-cert-healthcare-management', primaryDomain: 'healthcare_pharma',
    interestWeights: { healthcare_pharma: 1, business_management: 0.3 },
    goalWeights: { promotion: 0.8, higher_salary: 0.6, skill_validation: 0.7, industry_switch: 0.6, entrepreneurship: 0.3 },
    experienceFit: { '0': 0.4, '1-3': 0.8, '3-6': 1, '6+': 0.8 },
    studyModeFit: { weekend: 0.8, daily_1hr: 0.6, flexible: 0.8 },
    feeInr: 110000, durationMonths: 6,
    jobRoles: ['Hospital Administrator', 'Healthcare Operations Manager'],
    avgStartingSalaryInr: 600000, fiveYearGrowthMultiplier: 1.9, baselineGrowthMultiplier: 1.4,
    minQualificationLevel: 'bachelor', minPercentage: 45, minExperienceYears: 0, bridgeCourseAvailable: false,
    sourceNote: SOURCE_NOTE
  },
  {
    id: 'p14', name: 'Certificate in Pharma Regulatory Affairs', slug: 'cert-pharma-regulatory-affairs', primaryDomain: 'healthcare_pharma',
    interestWeights: { healthcare_pharma: 1, law_compliance: 0.3 },
    goalWeights: { skill_validation: 0.9, industry_switch: 0.6, higher_salary: 0.5, promotion: 0.5, entrepreneurship: 0.2 },
    experienceFit: { '0': 0.6, '1-3': 0.9, '3-6': 0.6, '6+': 0.3 },
    studyModeFit: { weekend: 0.9, daily_1hr: 0.5, flexible: 0.9 },
    feeInr: 70000, durationMonths: 4,
    jobRoles: ['Regulatory Affairs Associate', 'QA/RA Executive'],
    avgStartingSalaryInr: 550000, fiveYearGrowthMultiplier: 1.7, baselineGrowthMultiplier: 1.3,
    minQualificationLevel: 'bachelor', minPercentage: 50, minExperienceYears: 0, bridgeCourseAvailable: false,
    sourceNote: SOURCE_NOTE
  },
  {
    id: 'p15', name: 'PG Diploma in Digital Marketing & Communication', slug: 'pgd-digital-marketing-communication', primaryDomain: 'arts_communication',
    interestWeights: { arts_communication: 1, business_management: 0.3 },
    goalWeights: { entrepreneurship: 0.7, higher_salary: 0.7, industry_switch: 0.7, skill_validation: 0.7, promotion: 0.5 },
    experienceFit: { '0': 0.7, '1-3': 0.9, '3-6': 0.6, '6+': 0.3 },
    studyModeFit: { weekend: 0.8, daily_1hr: 0.7, flexible: 0.9 },
    feeInr: 120000, durationMonths: 9,
    jobRoles: ['Digital Marketing Manager', 'Content Strategist', 'Brand Communications Executive'],
    avgStartingSalaryInr: 550000, fiveYearGrowthMultiplier: 2.0, baselineGrowthMultiplier: 1.4,
    minQualificationLevel: 'bachelor', minPercentage: 45, minExperienceYears: 0, bridgeCourseAvailable: false,
    sourceNote: SOURCE_NOTE
  },
  {
    id: 'p16', name: 'Certificate in Content Strategy & Media', slug: 'cert-content-strategy-media', primaryDomain: 'arts_communication',
    interestWeights: { arts_communication: 1 },
    goalWeights: { entrepreneurship: 0.8, skill_validation: 0.7, higher_salary: 0.5, industry_switch: 0.6, promotion: 0.4 },
    experienceFit: { '0': 0.8, '1-3': 0.8, '3-6': 0.4, '6+': 0.2 },
    studyModeFit: { weekend: 0.9, daily_1hr: 0.6, flexible: 0.9 },
    feeInr: 50000, durationMonths: 3,
    jobRoles: ['Content Strategist', 'Social Media Manager'],
    avgStartingSalaryInr: 450000, fiveYearGrowthMultiplier: 1.7, baselineGrowthMultiplier: 1.3,
    minQualificationLevel: 'class12', minPercentage: 45, minExperienceYears: 0, bridgeCourseAvailable: false,
    sourceNote: SOURCE_NOTE
  },
  {
    id: 'p17', name: 'PG Program in Social Impact & Public Policy', slug: 'pg-social-impact-public-policy', primaryDomain: 'social_impact',
    interestWeights: { social_impact: 1, law_compliance: 0.2 },
    goalWeights: { entrepreneurship: 0.5, industry_switch: 0.7, skill_validation: 0.7, promotion: 0.5, higher_salary: 0.4 },
    experienceFit: { '0': 0.6, '1-3': 0.9, '3-6': 0.7, '6+': 0.4 },
    studyModeFit: { weekend: 0.8, daily_1hr: 0.6, flexible: 0.8 },
    feeInr: 160000, durationMonths: 12,
    jobRoles: ['Policy Analyst', 'Program Manager - Social Sector'],
    avgStartingSalaryInr: 550000, fiveYearGrowthMultiplier: 1.8, baselineGrowthMultiplier: 1.3,
    minQualificationLevel: 'bachelor', minPercentage: 45, minExperienceYears: 0, bridgeCourseAvailable: false,
    sourceNote: SOURCE_NOTE
  },
  {
    id: 'p18', name: 'Certificate in NGO & CSR Management', slug: 'cert-ngo-csr-management', primaryDomain: 'social_impact',
    interestWeights: { social_impact: 1, people_hr: 0.2 },
    goalWeights: { entrepreneurship: 0.6, skill_validation: 0.8, industry_switch: 0.6, promotion: 0.5, higher_salary: 0.3 },
    experienceFit: { '0': 0.7, '1-3': 0.8, '3-6': 0.6, '6+': 0.4 },
    studyModeFit: { weekend: 0.9, daily_1hr: 0.5, flexible: 0.9 },
    feeInr: 55000, durationMonths: 3,
    jobRoles: ['CSR Coordinator', 'NGO Program Officer'],
    avgStartingSalaryInr: 400000, fiveYearGrowthMultiplier: 1.6, baselineGrowthMultiplier: 1.3,
    minQualificationLevel: 'class12', minPercentage: 40, minExperienceYears: 0, bridgeCourseAvailable: false,
    sourceNote: SOURCE_NOTE
  }
];

export function getProgramBySlug(slug: string): ProgramProfile | undefined {
  return PROGRAMS.find((p) => p.slug === slug);
}

export const QUALIFICATION_LEVEL_RANK: Record<string, number> = {
  class12: 1,
  diploma: 2,
  bachelor: 3,
  master: 4
};
