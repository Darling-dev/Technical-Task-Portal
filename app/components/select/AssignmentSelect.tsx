"use client";

import React from "react";

interface SelectProps {
  id: string;
  name: string;
  label: string;
  value: string;
  options: string[];
  onChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
  required?: boolean;
}

const AssignmentSelect: React.FC<SelectProps> = ({
  id,
  name,
  label,
  value,
  options,
  onChange,
  required = false,
}) => {
  return (
    <div className="text-sm">
      <label htmlFor={id} className="font-semibold leading-none">
        {label}:
      </label>
      <select
        id={id}
        name={name}
        value={value}
        onChange={onChange}
        className="placeholder:text-muted-foreground flex h-10 w-full rounded-md border border-gray-300 bg-white px-3 py-2 ring-offset-background focus:outline-none focus:ring-0"
        required={required}
      >
        <option value="" disabled className="text-muted-foreground">
          Select a level
        </option>
        {options.map((option) => (
          <option key={option} value={option}>
            {option}
          </option>
        ))}
      </select>
    </div>
  );
};

export default AssignmentSelect;
