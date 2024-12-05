"use server";

import AssignmentForm from "@/app/components/form/AssignmentForm";

export default async function Home() {
  return (
    <main className="flex flex-grow items-center justify-center px-4 sm:px-0">
      <AssignmentForm />
    </main>
  );
}
