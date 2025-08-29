"use client";

import * as React from "react";

import { Button } from "@/app/ui/common/button";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/app/ui/common/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/app/ui/common/popover";

type ComboboxProps = { children: React.ReactNode };

type ListType = {
  value: string;
};

type Props = ComboboxProps & { items: ListType[] };

export function ComboboxPopover({ children, items }: Props) {
  const [open, setOpen] = React.useState(false);
  const [selected, setSelected] = React.useState<ListType | null>(null);

  return (
    <div className="flex items-center space-x-4">
      <p className="text-muted-foreground text-sm">{children}</p>
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          <Button variant="outline" className="w-auto justify-start">
            {selected ? <>{selected.value}</> : <>+ {children} 선택</>}
          </Button>
        </PopoverTrigger>
        <PopoverContent className="p-0" side="right" align="start">
          <Command>
            <CommandInput placeholder={`Change ${children}...`} />
            <CommandList>
              <CommandEmpty>No results found.</CommandEmpty>
              <CommandGroup>
                {items.map((i) => (
                  <CommandItem
                    key={i.value}
                    value={i.value}
                    onSelect={(value) => {
                      setSelected(
                        items.find((priority) => priority.value === value) ||
                          null,
                      );
                      setOpen(false);
                    }}
                  >
                    {i.value}
                  </CommandItem>
                ))}
              </CommandGroup>
            </CommandList>
          </Command>
        </PopoverContent>
      </Popover>
    </div>
  );
}
