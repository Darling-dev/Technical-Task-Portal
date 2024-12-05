"use server";

import ThanksModal from "@/app/components/modal/AssignmentThanksModal";
import { cookies } from "next/headers";
import { AssignmentData } from "@/app/types";

export default async function ThankYouPage() {
  const cookieStore = await cookies();
  const cookieData = cookieStore.get("assignmentData");

  let assignmentData: AssignmentData | null = null;

  if (cookieData) {
    try {
      assignmentData = JSON.parse(cookieData.value) as AssignmentData;
    } catch (error) {
      console.error("Failed to parse cookie data:", error);
    }
  }

  return (
    <main className="flex flex-grow items-center justify-center px-4 sm:px-0">
      <ThanksModal assignmentData={assignmentData} />
    </main>
  );
}
