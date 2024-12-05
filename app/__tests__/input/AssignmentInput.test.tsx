import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import AssignmentInput from "@/app/components/input/AssignmentInput";

describe("AssignmentInput Component", () => {
  const defaultProps = {
    id: "name-input",
    name: "name",
    type: "text",
    label: "Name",
    value: "John Doe",
    placeholder: "Enter your name",
    onChange: jest.fn(),
    required: true,
  };

  it("should render correctly with provided props", () => {
    render(<AssignmentInput {...defaultProps} />);

    const labelElement = screen.getByLabelText(/name/i);
    expect(labelElement).toBeInTheDocument();

    const inputElement = screen.getByPlaceholderText(/enter your name/i);
    expect(inputElement).toBeInTheDocument();

    expect(inputElement).toHaveValue("John Doe");

    expect(inputElement).toBeRequired();
  });

  it("should call onChange when user types in the input", () => {
    render(<AssignmentInput {...defaultProps} />);

    const inputElement = screen.getByLabelText(/name/i);

    fireEvent.change(inputElement, { target: { value: "Jane Doe" } });

    expect(defaultProps.onChange).toHaveBeenCalledTimes(1);
  });

  it("should handle empty value and not be marked as required", () => {
    const optionalProps = { ...defaultProps, value: "", required: false };
    render(<AssignmentInput {...optionalProps} />);

    const inputElement = screen.getByLabelText(/name/i);

    expect(inputElement).not.toBeRequired();
  });

  it("should update value correctly when prop changes", () => {
    const { rerender } = render(<AssignmentInput {...defaultProps} />);

    const inputElement = screen.getByLabelText(/name/i);
    expect(inputElement).toHaveValue("John Doe");

    rerender(<AssignmentInput {...defaultProps} value="Jane Smith" />);

    expect(inputElement).toHaveValue("Jane Smith");
  });
});
