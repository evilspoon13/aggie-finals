'use client';

import { useCallback } from 'react';
import { DataDropdown } from './DataDropdown';
import axios from 'axios';

interface CourseNumberDropdownProps {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  subject: string;
}

export function CourseNumberDropdown({ 
  value, 
  onChange, 
  placeholder = 'Select course number...', 
  subject
}: CourseNumberDropdownProps) {
  const fetchCourseNumbers = useCallback(async () => {
    if (!subject) {
      return [];
    }

    const response = await axios.post('/api/course-numbers', {
      department: subject
    });

    if (response.data.success) {
      return response.data.courseNumbers;
    } else {
      throw new Error(response.data.error || 'Failed to load course numbers');
    }
  }, [subject]);

  const disabledFetch = useCallback(async () => {
    return [];
  }, []);

  return (
    <DataDropdown
      value={value}
      onChange={onChange}
      placeholder={!subject ? "Select subject first" : placeholder}
      label="Course Number"
      fetchOptions={!subject ? disabledFetch : fetchCourseNumbers}
      disabled={!subject}
    />
  );
}