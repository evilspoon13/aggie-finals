import { useState } from 'react';
import { FinalExam } from '../types';

interface ExamRequest {
  termId: string;
  dayPattern: string;
  classStartTime: string; // Format: "HH:mm:ss"
  classEndTime: string;   // Format: "HH:mm:ss"
}

interface UseFindExamResult {
  findExam: (request: ExamRequest) => Promise<FinalExam | null>;
  exam: FinalExam | null;
  loading: boolean;
  error: string | null;
}

export const useFindExam = (): UseFindExamResult => {
  const [exam, setExam] = useState<FinalExam | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const findExam = async (request: ExamRequest): Promise<FinalExam | null> => {
    setLoading(true);
    setError(null);
    setExam(null);

    try {
      const response = await fetch('/backend/exams/search', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(request),
      });

      if (response.ok) {
        const examData: FinalExam = await response.json();
        setExam(examData);
        return examData;
      } else if (response.status === 404) {
        setError('No final exam found for this class schedule');
        return null;
      } else {
        setError('Failed to search for exam');
        return null;
      }
    } catch (err) {
      setError('Network error occurred');
      console.error('Error finding exam:', err);
      return null;
    } finally {
      setLoading(false);
    }
  };

  return {
    findExam,
    exam,
    loading,
    error,
  };
};

// helper function to convert time formats
export const convertTimeToBackendFormat = (time: string): string => {
  // convert "8:00 AM" to "08:00:00"
  const cleanTime = time.replace(/[^\d:apm\s]/gi, '').trim();
  const [timeStr, period] = cleanTime.split(/\s+/);
  let [hour, minute = '00'] = timeStr.split(':');
  
  let hourNum = parseInt(hour);
  
  if (period?.toLowerCase().includes('pm') && hourNum !== 12) {
    hourNum += 12;
  } else if (period?.toLowerCase().includes('am') && hourNum === 12) {
    hourNum = 0;
  }
  
  return `${hourNum.toString().padStart(2, '0')}:${minute.padStart(2, '0')}:00`;
};

export const createExamRequest = (
  termId: string,
  dayPattern: string, 
  startTime: string, 
  endTime: string
): ExamRequest => {
  return {
    termId,
    dayPattern,
    classStartTime: convertTimeToBackendFormat(startTime),
    classEndTime: convertTimeToBackendFormat(endTime),
  };
};