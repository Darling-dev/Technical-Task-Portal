import { AssignmentFormData } from "@/app/types";

export const validateForm = (formData: AssignmentFormData): boolean => {
  const {
    name,
    email,
    assignment_description,
    github_repo_url,
    candidate_level,
  } = formData;
  const isValidEmail = /\S+@\S+\.\S+/.test(email);
  const isValidUrl = /^https:\/\/github\.com(\/.*)?$/.test(github_repo_url);
  const isValidDescription = assignment_description.trim().length >= 10;

  return (
    name.trim() !== "" &&
    isValidEmail &&
    isValidDescription &&
    isValidUrl &&
    candidate_level.trim() !== ""
  );
};
