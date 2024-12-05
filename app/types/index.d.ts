export enum CandidateLevel {
  Junior = "Junior",
  Middle = "Middle",
  Senior = "Senior",
  Principal = "Principal",
}

export interface AssignmentData {
  name: string;
  email: string;
  candidate_level: string;
}

export interface AssignmentFormData {
  name: string;
  email: string;
  assignment_description: string;
  github_repo_url: string;
  candidate_level: string;
}
