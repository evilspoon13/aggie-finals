'use client';

import { useCallback } from 'react';
import { DataDropdown } from './DataDropdown';
import { searchSubjects } from '@/app/api/api';

interface SubjectDropdownProps {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
}

export function SubjectDropdown({ 
  value, 
  onChange, 
  placeholder = 'Select subject...' 
}: SubjectDropdownProps) {
  const fetchSubjects = useCallback(async () => {
    const response = await searchSubjects();
    // Get the first successful result's subjects
    const subjectList = response.find(result => result.success)?.subject || [];
    return subjectList.sort();
  }, []);

  return (
    <DataDropdown
      value={value}
      onChange={onChange}
      placeholder={placeholder}
      label="Subject"
      fetchOptions={fetchSubjects}
    />
  );
}