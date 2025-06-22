"use client";

import { authenticatedFetch } from '@/lib/api';
import { useSession } from 'next-auth/react'
import { useState } from 'react'

export interface ExamWithClassName {
  examId: number;
  termId: string;
  dayPattern: string;
  date: string;
  examTime: string;
  classBeginTime: string;
  classEndTime: string;
  className: string;
}

export function useUserExams() {
  const { data: session, status: sessionStatus } = useSession();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const USER_API_URL = "/backend/users/";

  const addExamToSchedule = async (examId: number, className: string) => {
    if (!session?.user?.googleId) {
      setError('User not authenticated')
      return false
    }

    setLoading(true)
    setError(null)

    try {
      const response = await authenticatedFetch(
        USER_API_URL,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ 
            googleId: session.user.googleId,
            examId, 
            className 
          }),
        }
      )

      if (response.ok) {
        return true
      } else {
        const errorText = await response.text()
        setError(`Failed to add exam: ${errorText}`)
        return false
      }
    } catch (err) {
      setError('Network error occurred')
      console.error('Error adding exam:', err)
      return false
    } finally {
      setLoading(false)
    }
  }

  const removeExamFromSchedule = async (examId: number, className: string) => {
    if (!session?.user?.googleId) {
      setError('User not authenticated')
      return false;
    }

    setLoading(true)
    setError(null)

    try {
      const response = await authenticatedFetch(
        USER_API_URL,
        {
          method: 'DELETE',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ 
            googleId: session.user.googleId,
            examId, 
            className 
          }),
        }
      )

      if (response.ok) {
      
        return true
      } else {
        const errorText = await response.text()
        setError(`Failed to remove exam: ${errorText}`)
        return false
      }
    } catch (err) {
      setError('Network error occurred')
      console.error('Error removing exam:', err)
      return false
    } finally {
      setLoading(false)
    }
  }

  const getUserExams = async (): Promise<ExamWithClassName[]> => {
    
    if (!session?.user?.googleId) {
      setError('User not authenticated')
      return []
    }

    setLoading(true)
    setError(null)

    try {
      const response = await authenticatedFetch(
        `${USER_API_URL}/exams`
      )

      if (response.ok) {
        const exams: ExamWithClassName[] = await response.json()
        return exams
      } else {
        setError('Failed to fetch user exams')
        return []
      }
    } catch (err) {
      setError('Network error occurred')
      console.error('Error fetching exams:', err)
      return []
    } finally {
      setLoading(false)
    }
  }

  return {
    addExamToSchedule,
    removeExamFromSchedule,
    getUserExams,
    loading,
    error,
    sessionStatus
  }
}