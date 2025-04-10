// components/SubjectDropdown.tsx
'use client';

import { useState, useEffect } from 'react';
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
  const [open, setOpen] = useState(false);
  const [subjects, setSubjects] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function loadSubjects() {
      setLoading(true);
      setError(null);
      try {
        const response = await searchSubjects();
        // Get the first successful result's subjects
        const subjectList = response.find(result => result.success)?.subject || [];
        setSubjects(subjectList.sort());
      } catch (err) {
        setError('Failed to load subjects');
        console.error(err);
      } finally {
        setLoading(false);
      }
    }

    loadSubjects();
    console.log(subjects)
  }, []);

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          aria-expanded={open}
          className="w-full justify-between bg-white"
          disabled={loading}
        >
          {loading ? 'Loading subjects...' : 
           value ? value : placeholder}
          <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-full p-0">
        <Command>
          <CommandInput placeholder="Search subject..." />
          <CommandEmpty>
            {error ? error : 'No subject found.'}
          </CommandEmpty>
          <CommandGroup className="max-h-64 overflow-y-auto">
            {subjects.map((subject) => (
              <CommandItem
                key={subject}
                onSelect={() => {
                  onChange(subject);
                  setOpen(false);
                }}
                value={subject}
              >
                <Check
                  className={cn(
                    "mr-2 h-4 w-4",
                    value === subject ? "opacity-100" : "opacity-0"
                  )}
                />
                {subject}
              </CommandItem>
            ))}
          </CommandGroup>
        </Command>
      </PopoverContent>
    </Popover>
  );
}