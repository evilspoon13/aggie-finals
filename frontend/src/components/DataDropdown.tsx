'use client';

import { useState, useEffect, useMemo } from 'react';
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
  disabled?: boolean;
}

export function DataDropdown({ 
  value, 
  onChange, 
  placeholder = 'Select option...',
  label,
  fetchOptions,
  disabled = false
}: DataDropdownProps) {
  const [open, setOpen] = useState(false);
  const [options, setOptions] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    async function loadOptions() {
      if (disabled) {
        setOptions([]);
        return;
      }

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
  }, [fetchOptions, label, disabled]);

  // Custom filtering logic that's more intuitive
  const filteredOptions = useMemo(() => {
    if (!searchTerm.trim()) return options;
    
    const searchLower = searchTerm.toLowerCase().trim();
    
    return options.filter(option => {
      const optionLower = option.toLowerCase();
      
      // Exact match first
      if (optionLower === searchLower) return true;
      
      // Starts with search term
      if (optionLower.startsWith(searchLower)) return true;
      
      // Contains search term
      if (optionLower.includes(searchLower)) return true;
      
      // For subjects like "CSCE" when searching "comp" or "computer"
      // Check if any word in the option starts with the search term
      const words = optionLower.split(/[\s\-_]+/);
      if (words.some(word => word.startsWith(searchLower))) return true;
      
      return false;
    }).sort((a, b) => {
      const aLower = a.toLowerCase();
      const bLower = b.toLowerCase();
      
      // Prioritize exact matches
      if (aLower === searchLower) return -1;
      if (bLower === searchLower) return 1;
      
      // Then prioritize starts with
      const aStarts = aLower.startsWith(searchLower);
      const bStarts = bLower.startsWith(searchLower);
      if (aStarts && !bStarts) return -1;
      if (bStarts && !aStarts) return 1;
      
      // Then alphabetical
      return a.localeCompare(b);
    });
  }, [options, searchTerm]);

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
            disabled={loading || disabled}
          >
            {loading ? `Loading ${label || 'options'}...` : 
             value ? value : placeholder}
            <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
          </Button>
        </PopoverTrigger>
        <PopoverContent 
          className="w-full p-0 max-w-[calc(100vw-20px)]" 
          side="bottom" 
          align="center" 
          sideOffset={4}
          avoidCollisions={false} 
          sticky="always"
        >
          <Command shouldFilter={false}>
            <CommandInput 
              placeholder={`Search ${label || 'options'}...`}
              value={searchTerm}
              onValueChange={setSearchTerm}
            />
            <CommandEmpty>
              {error ? error : `No ${label || 'option'} found.`}
            </CommandEmpty>
            <CommandGroup className="max-h-[20vh] overflow-y-auto">
              {filteredOptions.map((option) => (
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