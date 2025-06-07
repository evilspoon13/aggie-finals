import { useEffect, useState } from "react";
import { FinalExam } from "../types";

export const useAllExams = (termId: string) => {
  const [exams, setExams] = useState<FinalExam[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchAllExams = async () => {
      try {
        const response = await fetch(`/backend/final-exams/all?termId=${termId}`);
        if (response.ok) {
          const examData: FinalExam[] = await response.json();
          setExams(examData);
        } else {
          setError('Failed to fetch exam data');
        }
      } catch (err) {
        setError('Network error occurred');
        console.error('Error fetching exams:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchAllExams();
  }, [termId]);

  return { exams, loading, error };
};