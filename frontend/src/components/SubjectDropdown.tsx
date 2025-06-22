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
    const subjects = await searchSubjects();
    
    const subjectCodes = subjects.map(subject => subject.longName);

    return subjectCodes;
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