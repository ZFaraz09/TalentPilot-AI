export interface ResumeRequest {
  resumeText: string;
}

export interface ResumeAnalysis {
  skills: string[];
  experience: string[];
  education: string[];
  summary: string;
}