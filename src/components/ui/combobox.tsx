
'use client';

import * as React from 'react';
import { Check, ChevronsUpDown } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from '@/components/ui/command';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
  PopoverPortal
} from '@/components/ui/popover';

interface ComboboxProps {
  options: { value: string; label: string }[];
  value?: string;
  onChange: (value: string) => void;
  placeholder?: string;
  disabled?: boolean;
}

export function Combobox({
  options,
  value,
  onChange,
  placeholder,
  disabled,
}: ComboboxProps) {
  const [open, setOpen] = React.useState(false);
  const [inputValue, setInputValue] = React.useState('');

  const selectedOption = options.find(
    (option) => option.value.toLowerCase() === value?.toLowerCase()
  );

  const handleSelect = (currentValue: string) => {
    onChange(currentValue === value ? '' : currentValue);
    setOpen(false);
  };

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          aria-expanded={open}
          className="w-full justify-between font-normal"
          disabled={disabled}
        >
          {selectedOption ? selectedOption.label : placeholder || 'Select...'}
          <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverPortal>
        <PopoverContent className="w-[var(--radix-popover-trigger-width)] p-0">
          <Command shouldFilter={false}>
            <CommandInput
              placeholder={placeholder || 'Search or create...'}
              value={inputValue}
              onValueChange={setInputValue}
            />
            <CommandList>
              <CommandEmpty>
                <div className="p-1">
                  <Button
                    className="w-full"
                    onClick={() => {
                      if (inputValue) {
                        handleSelect(inputValue);
                      }
                    }}
                  >
                    Create "{inputValue}"
                  </Button>
                </div>
              </CommandEmpty>
              <CommandGroup>
                {options
                  .filter((option) =>
                    option.label.toLowerCase().includes(inputValue.toLowerCase())
                  )
                  .map((option) => (
                    <CommandItem
                      key={option.value}
                      value={option.label}
                      onSelect={(currentValue) => {
                        const selected = options.find(
                          (opt) =>
                            opt.label.toLowerCase() === currentValue.toLowerCase()
                        );
                        if (selected) {
                          handleSelect(selected.value);
                          setInputValue('');
                        }
                      }}
                    >
                      <Check
                        className={cn(
                          'mr-2 h-4 w-4',
                          value?.toLowerCase() === option.value.toLowerCase()
                            ? 'opacity-100'
                            : 'opacity-0'
                        )}
                      />
                      {option.label}
                    </CommandItem>
                  ))}
              </CommandGroup>
            </CommandList>
          </Command>
        </PopoverContent>
      </PopoverPortal>
    </Popover>
  );
}
