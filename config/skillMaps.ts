import { RoleSkillMap } from '@/types';

/**
 * ⚠️ PLACEHOLDER DATA — same caveat as /config/programs.ts.
 * The brief specifies that skill maps should be "sourced from the same
 * job-role lists already built per course, cross-checked against WEF
 * Future of Jobs 2025's top-skills list". That underlying list wasn't in
 * the uploaded files, so this is a realistic starting skill map per role.
 * Replace/extend `requiredSkills` per role before launch.
 */
export const ROLE_SKILL_MAPS: RoleSkillMap[] = [
  {
    role: 'Data Scientist',
    industry: 'Technology',
    requiredSkills: [
      { skill: 'Python', weight: 5, courseModule: 'Python for Data Science', programSlug: 'msc-data-science' },
      { skill: 'SQL', weight: 4, courseModule: 'Database & SQL Fundamentals', programSlug: 'msc-data-science' },
      { skill: 'Machine Learning', weight: 5, courseModule: 'Applied Machine Learning', programSlug: 'msc-data-science' },
      { skill: 'Statistics', weight: 4, courseModule: 'Statistical Foundations', programSlug: 'msc-data-science' },
      { skill: 'Data Visualization', weight: 3, courseModule: 'Data Storytelling & Viz', programSlug: 'msc-data-science' },
      { skill: 'MLOps', weight: 3, courseModule: 'ML Deployment & MLOps', programSlug: 'msc-data-science' },
      { skill: 'Deep Learning', weight: 3, courseModule: 'Neural Networks & Deep Learning', programSlug: 'msc-data-science' }
    ]
  },
  {
    role: 'Generative AI Engineer',
    industry: 'Technology',
    requiredSkills: [
      { skill: 'Python', weight: 5, courseModule: 'Python for AI Applications', programSlug: 'iit-roorkee-ba-genai' },
      { skill: 'Prompt Engineering', weight: 5, courseModule: 'Applied Prompt Engineering', programSlug: 'iit-roorkee-ba-genai' },
      { skill: 'LLM Fine-tuning', weight: 4, courseModule: 'Fine-tuning & RAG Systems', programSlug: 'iit-roorkee-ba-genai' },
      { skill: 'Vector Databases', weight: 3, courseModule: 'Retrieval-Augmented Generation', programSlug: 'iit-roorkee-ba-genai' },
      { skill: 'API Integration', weight: 3, courseModule: 'Building AI Products', programSlug: 'iit-roorkee-ba-genai' },
      { skill: 'MLOps', weight: 3, courseModule: 'ML Deployment & MLOps', programSlug: 'iit-roorkee-ba-genai' }
    ]
  },
  {
    role: 'Business Analyst',
    industry: 'Business & Management',
    requiredSkills: [
      { skill: 'Excel', weight: 4, courseModule: 'Advanced Excel for Analytics', programSlug: 'online-mba' },
      { skill: 'SQL', weight: 4, courseModule: 'Data Fundamentals for Managers', programSlug: 'mba-ai-business-analytics' },
      { skill: 'Data Visualization', weight: 3, courseModule: 'Business Intelligence Tools', programSlug: 'mba-ai-business-analytics' },
      { skill: 'Stakeholder Management', weight: 4, courseModule: 'Managerial Communication', programSlug: 'online-mba' },
      { skill: 'Financial Modeling', weight: 3, courseModule: 'Business Finance Essentials', programSlug: 'online-mba' },
      { skill: 'Process Improvement', weight: 3, courseModule: 'Operations & Strategy', programSlug: 'online-mba' }
    ]
  },
  {
    role: 'Digital Marketing Manager',
    industry: 'Marketing & Communication',
    requiredSkills: [
      { skill: 'SEO', weight: 4, courseModule: 'Search Engine Optimisation', programSlug: 'pgd-digital-marketing-communication' },
      { skill: 'Performance Marketing', weight: 5, courseModule: 'Meta & Google Ads Mastery', programSlug: 'pgd-digital-marketing-communication' },
      { skill: 'Content Strategy', weight: 3, courseModule: 'Content & Brand Strategy', programSlug: 'pgd-digital-marketing-communication' },
      { skill: 'Marketing Analytics', weight: 4, courseModule: 'Marketing Analytics & Attribution', programSlug: 'pgd-digital-marketing-communication' },
      { skill: 'CRM Tools', weight: 3, courseModule: 'MarTech & CRM Systems', programSlug: 'pgd-digital-marketing-communication' }
    ]
  },
  {
    role: 'Financial Analyst',
    industry: 'Finance',
    requiredSkills: [
      { skill: 'Financial Modeling', weight: 5, courseModule: 'Advanced Financial Modeling', programSlug: 'pg-financial-management' },
      { skill: 'Excel', weight: 4, courseModule: 'Excel for Finance', programSlug: 'pg-financial-management' },
      { skill: 'Valuation', weight: 4, courseModule: 'Corporate Valuation', programSlug: 'pg-financial-management' },
      { skill: 'Financial Statement Analysis', weight: 4, courseModule: 'Financial Reporting & Analysis', programSlug: 'pg-financial-management' },
      { skill: 'Risk Management', weight: 3, courseModule: 'Corporate Risk & Treasury', programSlug: 'pg-financial-management' }
    ]
  },
  {
    role: 'HR Analytics Lead',
    industry: 'Human Resources',
    requiredSkills: [
      { skill: 'People Analytics', weight: 5, courseModule: 'People Analytics Foundations', programSlug: 'exec-pg-hr-analytics' },
      { skill: 'Excel', weight: 3, courseModule: 'HR Data & Excel', programSlug: 'exec-pg-hr-analytics' },
      { skill: 'HRIS Tools', weight: 3, courseModule: 'HR Systems & Automation', programSlug: 'exec-pg-hr-analytics' },
      { skill: 'Talent Strategy', weight: 4, courseModule: 'Strategic Talent Management', programSlug: 'exec-pg-hr-analytics' },
      { skill: 'Data Visualization', weight: 3, courseModule: 'HR Dashboards & Storytelling', programSlug: 'exec-pg-hr-analytics' }
    ]
  },
  {
    role: 'Compliance Officer',
    industry: 'Legal & Compliance',
    requiredSkills: [
      { skill: 'Regulatory Frameworks', weight: 5, courseModule: 'Corporate Regulatory Frameworks', programSlug: 'pgd-corporate-law-compliance' },
      { skill: 'Contract Drafting', weight: 3, courseModule: 'Contract Law & Drafting', programSlug: 'pgd-corporate-law-compliance' },
      { skill: 'Risk Assessment', weight: 4, courseModule: 'Compliance Risk Management', programSlug: 'pgd-corporate-law-compliance' },
      { skill: 'Data Privacy Law', weight: 3, courseModule: 'Data Privacy & Cyber Law', programSlug: 'cert-cyber-law-data-privacy' },
      { skill: 'Audit Reporting', weight: 3, courseModule: 'Compliance Audits & Reporting', programSlug: 'pgd-corporate-law-compliance' }
    ]
  }
];

export function getSkillMapForRole(role: string): RoleSkillMap | undefined {
  return ROLE_SKILL_MAPS.find((r) => r.role.toLowerCase() === role.toLowerCase());
}

export const ALL_ROLES = ROLE_SKILL_MAPS.map((r) => r.role);
