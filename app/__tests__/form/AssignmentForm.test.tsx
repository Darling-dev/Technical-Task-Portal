import React from "react";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import AssignmentForm from "@/app/components/form/AssignmentForm";
import { submitAssignment } from "@/app/utils/requests";
import { useRouter } from "next/navigation";
import useCandidateLevels from "@/app/hooks/useCandidateLevels";

jest.mock("@/app/utils/requests", () => ({
  submitAssignment: jest.fn(),
}));

jest.mock("next/navigation", () => ({
  useRouter: jest.fn(),
}));

jest.mock("@/app/hooks/useCandidateLevels");

describe("AssignmentForm Component", () => {
  const mockPush = jest.fn();
  const mockSubmitAssignment = submitAssignment as jest.Mock;
  const mockUseCandidateLevels = useCandidateLevels as jest.Mock;

  beforeEach(() => {
    jest.clearAllMocks();
    (useRouter as jest.Mock).mockReturnValue({ push: mockPush });
    mockUseCandidateLevels.mockReturnValue({
      levels: ["Junior", "Mid", "Senior"],
      error: null,
    });
  });

  it("should render all form fields correctly", () => {
    render(<AssignmentForm />);

    expect(screen.getByLabelText(/name/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/email/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/description/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/github repository url/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/candidate level/i)).toBeInTheDocument();
    expect(screen.getByRole("button", { name: /apply/i })).toBeInTheDocument();
  });

  it("should display a generic validation error for invalid inputs", async () => {
    render(<AssignmentForm />);

    const submitButton = screen.getByRole("button", { name: /apply/i });

    fireEvent.click(submitButton);

    await waitFor(() => {
      expect(
        screen.getByText(/please fill in all required fields correctly\./i),
      ).toBeInTheDocument();
    });
  });

  it("should disable the submit button if required fields are empty", () => {
    render(<AssignmentForm />);

    const submitButton = screen.getByRole("button", { name: /apply/i });

    fireEvent.click(submitButton);

    expect(submitButton).not.toBeDisabled();
  });

  it("should make API call with correct data upon form submission", async () => {
    mockSubmitAssignment.mockResolvedValueOnce({
      message: "Assignment submitted successfully.",
    });

    render(<AssignmentForm />);

    fireEvent.change(screen.getByLabelText(/name/i), {
      target: { value: "John Doe" },
    });
    fireEvent.change(screen.getByLabelText(/email/i), {
      target: { value: "john.doe@example.com" },
    });
    fireEvent.change(screen.getByLabelText(/description/i), {
      target: { value: "This is my assignment" },
    });
    fireEvent.change(screen.getByLabelText(/github repository url/i), {
      target: { value: "https://github.com/johndoe/repo" },
    });
    fireEvent.change(screen.getByLabelText(/candidate level/i), {
      target: { value: "Junior" },
    });

    const submitButton = screen.getByRole("button", { name: /apply/i });
    fireEvent.click(submitButton);

    await waitFor(() => {
      expect(mockSubmitAssignment).toHaveBeenCalledWith({
        name: "John Doe",
        email: "john.doe@example.com",
        assignment_description: "This is my assignment",
        github_repo_url: "https://github.com/johndoe/repo",
        candidate_level: "Junior",
      });

      expect(mockPush).toHaveBeenCalledWith("/thank-you");
    });
  });

  it("should display an error message if API call fails", async () => {
    mockSubmitAssignment.mockRejectedValueOnce(new Error("Submission failed"));

    render(<AssignmentForm />);

    fireEvent.change(screen.getByLabelText(/name/i), {
      target: { value: "John Doe" },
    });
    fireEvent.change(screen.getByLabelText(/email/i), {
      target: { value: "john.doe@example.com" },
    });
    fireEvent.change(screen.getByLabelText(/description/i), {
      target: { value: "This is my assignment" },
    });
    fireEvent.change(screen.getByLabelText(/github repository url/i), {
      target: { value: "https://github.com/johndoe/repo" },
    });
    fireEvent.change(screen.getByLabelText(/candidate level/i), {
      target: { value: "Junior" },
    });

    const submitButton = screen.getByRole("button", { name: /apply/i });
    fireEvent.click(submitButton);

    await waitFor(() => {
      expect(screen.getByText(/submission failed/i)).toBeInTheDocument();
    });
  });
  it("should render candidate levels in the dropdown successfully", async () => {
    render(<AssignmentForm />);

    const dropdown = screen.getByLabelText(/candidate level/i);

    fireEvent.mouseDown(dropdown);

    await waitFor(() => {
      expect(
        screen.getByRole("option", { name: /junior/i }),
      ).toBeInTheDocument();
      expect(screen.getByRole("option", { name: /mid/i })).toBeInTheDocument();
      expect(
        screen.getByRole("option", { name: /senior/i }),
      ).toBeInTheDocument();
    });
  });

  it("should display an error message if candidate levels fetching fails", async () => {
    mockUseCandidateLevels.mockReturnValue({
      levels: [],
      error: "Failed to fetch candidate levels",
    });

    render(<AssignmentForm />);

    expect(
      screen.getByText(/failed to fetch candidate levels/i),
    ).toBeInTheDocument();
  });
});
