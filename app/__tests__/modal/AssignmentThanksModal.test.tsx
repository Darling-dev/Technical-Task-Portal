import React from "react";
import { render, screen } from "@testing-library/react";
import Thanks from "@/app/components/modal/AssignmentThanksModal";

jest.mock("@/app/utils/cookies", () => ({
  deleteCookie: jest.fn(),
}));

describe("Thanks Component", () => {
  it("should display the correct confirmation message when valid data is present", () => {
    const assignmentData = {
      name: "John Doe",
      email: "john.doe@example.com",
      candidate_level: "Junior",
    };

    render(<Thanks assignmentData={assignmentData} />);

    expect(
      screen.getByText(/Thank you for your submission!/i),
    ).toBeInTheDocument();
  });

  it("should display submitted user data correctly", () => {
    const assignmentData = {
      name: "John Doe",
      email: "john.doe@example.com",
      candidate_level: "Junior",
    };

    render(<Thanks assignmentData={assignmentData} />);

    expect(screen.getByText(/name:/i)).toBeInTheDocument();
    expect(screen.getByText(/john doe/i)).toBeInTheDocument();
    expect(screen.getByText(/email:/i)).toBeInTheDocument();
    expect(screen.getByText(/john.doe@example.com/i)).toBeInTheDocument();
    expect(screen.getByText(/candidate level:/i)).toBeInTheDocument();
    expect(screen.getByText(/junior/i)).toBeInTheDocument();
  });

  it("should display an error message if no assignment data is found", () => {
    render(<Thanks assignmentData={null} />);

    expect(
      screen.getByText(/it seems you have not submitted any assignment yet/i),
    ).toBeInTheDocument();
  });
});
