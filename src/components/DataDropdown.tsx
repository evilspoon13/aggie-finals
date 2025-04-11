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

interface DataDropdownProps {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  label?: string;
  fetchOptions: () => Promise<string[]>;
}

export function DataDropdown({ 
  value, 
  onChange, 
  placeholder = 'Select option...',
  label,
  fetchOptions
}: DataDropdownProps) {
  const [open, setOpen] = useState(false);
  const [options, setOptions] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function loadOptions() {
      setLoading(true);
      setError(null);
      try {
        const optionsList = await fetchOptions();
        setOptions(optionsList);
      } catch (err) {
        setError(`Failed to load ${label || 'options'}`);
        console.error(err);
      } finally {
        setLoading(false);
      }
    }

    loadOptions();
  }, [fetchOptions, label]);

  return (
    <div className="space-y-2">
      {label && <label className="block text-sm font-medium text-gray-700">{label}</label>}
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          <Button
            variant="outline"
            role="combobox"
            aria-expanded={open}
            className="w-full justify-between bg-white"
            disabled={loading}
          >
            {loading ? `Loading ${label || 'options'}...` : 
             value ? value : placeholder}
            <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-full p-0">
          <Command>
            <CommandInput placeholder={`Search ${label || 'options'}...`} />
            <CommandEmpty>
              {error ? error : `No ${label || 'option'} found.`}
            </CommandEmpty>
            <CommandGroup className="max-h-64 overflow-y-auto">
              {options.map((option) => (
                <CommandItem
                  key={option}
                  onSelect={() => {
                    onChange(option);
                    setOpen(false);
                  }}
                  value={option}
                >
                  <Check
                    className={cn(
                      "mr-2 h-4 w-4",
                      value === option ? "opacity-100" : "opacity-0"
                    )}
                  />
                  {option}
                </CommandItem>
              ))}
            </CommandGroup>
          </Command>
        </PopoverContent>
      </Popover>
    </div>
  );
}