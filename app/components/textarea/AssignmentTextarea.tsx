"use client";

import React from "react";

interface TextareaProps {
  id: string;
  name: string;
  label: string;
  value: string;
  placeholder?: string;
  onChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
  required?: boolean;
}

const AssignmentTextarea: React.FC<TextareaProps> = ({
  id,
  name,
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
      <textarea
        id={id}
        name={name}
        value={value}
        placeholder={placeholder}
        onChange={onChange}
        className="border-input placeholder:text-muted-foreground flex max-h-[320px] min-h-[40px] w-full rounded-md border bg-background px-3 py-2 ring-offset-background focus:outline-none focus:ring-0"
        required={required}
      />
    </div>
  );
};

export default AssignmentTextarea;
