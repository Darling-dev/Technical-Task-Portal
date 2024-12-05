import { setCookie } from "@/app/utils/cookies";
import { AssignmentFormData } from "@/app/types";

export const submitAssignment = async (
  payload: AssignmentFormData,
): Promise<void> => {
  try {
    const response = await fetch(
      "https://tools.qa.public.ale.ai/api/tools/candidates/assignments",
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      },
    );

    if (!response.ok) {
      const errorData = await response.json();
      if (errorData && errorData.message) {
        throw new Error(
          `${errorData.message}: ${errorData.errors?.join(", ") || ""}`,
        );
      } else {
        throw new Error(
          "Failed to submit the assignment. Please try again later.",
        );
      }
    }

    setCookie(
      "assignmentData",
      JSON.stringify({
        name: payload.name,
        email: payload.email,
        candidate_level: payload.candidate_level,
      }),
      60 * 60 * 24,
    );
  } catch (error) {
    if (error instanceof Error) {
      throw new Error(error.message || "Submission error occurred");
    } else {
      throw new Error("An unknown error occurred");
    }
  }
};
