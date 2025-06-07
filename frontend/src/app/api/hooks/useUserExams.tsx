import { useSession } from 'next-auth/react'
import { useState } from 'react'

export function useUserExams() {
  const { data: session } = useSession()
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const USER_API_URL = "/backend/users";

  const addExamToSchedule = async (examId: number) => {
    if (!session?.user?.googleId) {
      setError('User not authenticated')
      return false
    }

    setLoading(true)
    setError(null)

    try {
      const response = await fetch(
        `${USER_API_URL}${session.user.googleId}/exams/${examId}`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
        }
      )

      if (response.ok) {
        console.log('Exam added successfully!')
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

  const removeExamFromSchedule = async (examId: number) => {
    if (!session?.user?.googleId) {
      setError('User not authenticated')
      return false
    }

    setLoading(true)
    setError(null)

    try {
      const response = await fetch(
        `${USER_API_URL}${session.user.googleId}/exams/${examId}`,
        {
          method: 'DELETE',
        }
      )

      if (response.ok) {
        console.log('Exam removed successfully!')
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

  const getUserExams = async () => {
    if (!session?.user?.googleId) {
      setError('User not authenticated')
      return []
    }

    setLoading(true)
    setError(null)

    try {
      const response = await fetch(
        `${USER_API_URL}${session.user.googleId}/exams`
      )

      if (response.ok) {
        const exams = await response.json()
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
    error
  }
}