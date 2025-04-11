'use client';

import { useState, useEffect, useCallback } from 'react';
import { Check, ChevronsUpDown } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
} from "@/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
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
  const [open, setOpen] = useState(false);
  const [courseNumbers, setCourseNumbers] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchCourseNumbers = useCallback(async () => {
    if (!subject) {
      setCourseNumbers([]);
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const response = await axios.post('/api/course-numbers', {
        department: subject
      });

      if (response.data.success) {
        setCourseNumbers(response.data.courseNumbers);
      } else {
        setError(response.data.error || 'Failed to load course numbers');
      }
    } catch (err) {
      setError('Failed to load course numbers');
      console.error(err);
    } finally {
      setLoading(false);
    }
  }, [subject]);

  useEffect(() => {
    fetchCourseNumbers();
  }, [fetchCourseNumbers]);

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          aria-expanded={open}
          className="w-full justify-between bg-white"
          disabled={loading || !subject}
        >
          {!subject ? 'Select subject first' : 
           loading ? 'Loading course numbers...' : 
           value ? value : placeholder}
          <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-full p-0">
        <Command>
          <CommandInput placeholder="Search course number..." />
          <CommandEmpty>
            {error ? error : 'No course numbers found.'}
          </CommandEmpty>
          <CommandGroup className="max-h-[20vh] overflow-y-auto">
            {courseNumbers.map((number) => (
              <CommandItem
                key={number}
                onSelect={() => {
                  onChange(number);
                  setOpen(false);
                }}
                value={number}
              >
                <Check
                  className={cn(
                    "mr-2 h-4 w-4",
                    value === number ? "opacity-100" : "opacity-0"
                  )}
                />
                {number}
              </CommandItem>
            ))}
          </CommandGroup>
        </Command>
      </PopoverContent>
    </Popover>
  );
}