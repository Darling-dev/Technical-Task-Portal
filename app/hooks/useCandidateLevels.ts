import { useState, useEffect } from "react";
import { CandidateLevel } from "@/app/types";

const useCandidateLevels = () => {
  const [levels, setLevels] = useState<CandidateLevel[]>([]);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadLevels = async () => {
      try {
        const response = await fetch(
          "https://tools.qa.public.ale.ai/api/tools/candidates/levels",
        );

        if (!response.ok) {
          throw new Error("Failed to fetch levels");
        }

        const data: { levels: CandidateLevel[] } = await response.json();

        setLevels(data.levels);
      } catch (err) {
        console.error("Error loading candidate levels:", err);
        setError(err instanceof Error ? err.message : "Unknown error");
      }
    };

    loadLevels();
  }, []);

  return { levels, error };
};

export default useCandidateLevels;
