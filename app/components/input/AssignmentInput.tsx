"use client";

import React from "react";

interface InputProps {
  id: string;
  name: string;
  type: string;
  label: string;
  value: string;
  placeholder?: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  required?: boolean;
}

const AssignmentInput: React.FC<InputProps> = ({
  id,
  name,
  type,
  label,
  value,
  placeholder,
  onChange,
  required = false,
}) => {
  return (
    <div className="text-sm">
      <label htmlFor={id} className="font-semibold leading-none">
        {label}:
      </label>
      <input
        id={id}
        name={name}
        type={type}
        value={value}
        placeholder={placeholder}
        onChange={onChange}
        className="border-input placeholder:text-muted-foreground flex h-10 w-full appearance-none rounded-md border bg-background px-3 py-2 ring-offset-background focus:outline-none focus:ring-0"
        required={required}
      />
    </div>
  );
};

export default AssignmentInput;
