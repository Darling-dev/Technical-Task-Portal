"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { submitAssignment } from "@/app/utils/requests";
import useCandidateLevels from "@/app/hooks/useCandidateLevels";
import AssignmentInput from "@/app/components/input/AssignmentInput";
import AssignmentSelect from "@/app/components/select/AssignmentSelect";
import AssignmentTextarea from "@/app/components/textarea/AssignmentTextarea";
import { AssignmentFormData } from "@/app/types";
import { validateForm } from "@/app/utils/validation";

const AssignmentForm: React.FC = () => {
  const { levels, error: levelsError } = useCandidateLevels();
  const [formData, setFormData] = useState<AssignmentFormData>({
    name: "",
    email: "",
    assignment_description: "",
    github_repo_url: "",
    candidate_level: "",
  });
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const router = useRouter();

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >,
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const validation = validateForm(formData);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validation) {
      setError("Please fill in all required fields correctly.");
      return;
    }

    setIsLoading(true);
    setError(null);

    try {
      await submitAssignment(formData);
      router.push("/thank-you");
    } catch (err) {
      setError(
        err instanceof Error ? err.message : "Submission error occurred",
      );
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="text-charcoal mx-auto w-full max-w-md rounded-xl border bg-white shadow">
      <div className="p-6 pb-4">
        <h2 className="text-2xl font-semibold tracking-tight">Assignment</h2>
        <div className="text-gray-muted text-pretty text-sm">
          Fill in the details below to submit it successfully.
        </div>
      </div>

      <form className="space-y-4 p-6 pt-0" onSubmit={handleSubmit}>
        <AssignmentInput
          id="name"
          name="name"
          type="text"
          label="Name"
          placeholder="Jake"
          value={formData.name}
          onChange={handleChange}
        />
        <AssignmentInput
          id="email"
          name="email"
          type="email"
          label="Email"
          placeholder="user@example.com"
          value={formData.email}
          onChange={handleChange}
        />
        <AssignmentTextarea
          id="assignment_description"
          name="assignment_description"
          label="Description"
          placeholder="Your description must contain at least 10 characters"
          value={formData.assignment_description}
          onChange={handleChange}
        />
        <AssignmentInput
          id="github_repo_url"
          name="github_repo_url"
          type="url"
          label="GitHub Repository URL"
          placeholder="https://github.com/"
          value={formData.github_repo_url}
          onChange={handleChange}
        />
        <AssignmentSelect
          id="candidate_level"
          name="candidate_level"
          label="Candidate Level"
          value={formData.candidate_level}
          options={levels}
          onChange={handleChange}
        />
        <div className="flex justify-end">
          <button
            className="bg-charcoal hover:bg-charcoal/90 flex w-full items-center justify-center gap-2 rounded-lg border border-solid border-black/[.08] px-5 py-2 text-base font-medium text-white transition-colors hover:border-transparent"
            type="submit"
            disabled={isLoading}
          >
            {isLoading ? "Applying..." : "Apply"}
          </button>
        </div>
        {levelsError && <p className="text-red-600">{levelsError}</p>}

        {error && <p className="text-red-600">{error}</p>}
      </form>
    </div>
  );
};

export default AssignmentForm;
