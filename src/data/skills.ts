import { SkillCategory } from "../types/SkillCategory";

export const skillCategories: SkillCategory[] = [
  {
    category: "Cloud & Infrastructure",
    skills: [
      "AWS",
      "AWS CDK",
      "Lambda",
      "SQS/SNS",
      "RDS",
      "DynamoDB",
      "Cognito",
      "Elasticsearch",
      "GCP",
      "Serverless",
    ],
  },
  {
    category: "AI / Gen AI",
    skills: [
      "LLM Application Engineering",
      "AI Agents",
      "OpenAI Agents API",
      "RAG",
      "Structured Outputs",
      "Prompt Engineering",
      "Model Evaluation",
      "MCP Servers",
      "Claude Code",
    ],
  },
  {
    category: "Security",
    skills: ["IAM", "RBAC", "OAuth2", "Secrets Management"],
  },
  {
    category: "APIs & Integration",
    skills: ["REST APIs", "GraphQL", "Webhooks", "SQL"],
  },
  {
    category: "Languages",
    skills: ["TypeScript", "JavaScript", "Python", "C#"],
  },
  {
    category: "Frameworks & Tools",
    skills: ["Node.js", "React", "Playwright", "Git", "GitHub Actions", "Bitbucket Pipelines"],
  },
];
