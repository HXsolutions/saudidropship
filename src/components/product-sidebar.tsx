
'use client';

import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { Checkbox } from '@/components/ui/checkbox';
import { Label } from '@/components/ui/label';
import { Slider } from '@/components/ui/slider';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Input } from '@/components/ui/input';
import { Search } from 'lucide-react';

type ProductSidebarProps = {
  searchQuery: string;
  onSearchChange: (query: string) => void;
  availability: string[];
  onAvailabilityChange: (availability: string[]) => void;
  priceRange: [number, number];
  onPriceChange: (priceRange: [number, number]) => void;
  maxPrice: number;
  sortBy: string;
  onSortByChange: (sortBy: string) => void;
};

export default function ProductSidebar({
  searchQuery,
  onSearchChange,
  availability,
  onAvailabilityChange,
  priceRange,
  onPriceChange,
  maxPrice,
  sortBy,
  onSortByChange,
}: ProductSidebarProps) {
  
  const handleAvailabilityChange = (checked: boolean, value: string) => {
    if (checked) {
      onAvailabilityChange([...availability, value]);
    } else {
      onAvailabilityChange(availability.filter((v) => v !== value));
    }
  };

  return (
    <aside className="space-y-6">
       <div className="relative">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
        <Input
          type="search"
          placeholder="Search products..."
          className="pl-9"
          value={searchQuery}
          onChange={(e) => onSearchChange(e.target.value)}
        />
      </div>
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-lg font-semibold">Filters</h2>
        <Select value={sortBy} onValueChange={onSortByChange}>
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Sort by" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="alphabetical-az">Alphabetical, A-Z</SelectItem>
            <SelectItem value="alphabetical-za">Alphabetical, Z-A</SelectItem>
            <SelectItem value="price-asc">Price, low to high</SelectItem>
            <SelectItem value="price-desc">Price, high to low</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <Accordion type="multiple" defaultValue={['availability', 'price']} className="w-full">
        <AccordionItem value="availability">
          <AccordionTrigger className="font-semibold">Availability</AccordionTrigger>
          <AccordionContent className="space-y-3 pt-3">
            <div className="flex items-center space-x-2">
              <Checkbox
                id="in-stock"
                checked={availability.includes('In Stock')}
                onCheckedChange={(checked) => handleAvailabilityChange(!!checked, 'In Stock')}
              />
              <Label htmlFor="in-stock" className="flex-grow">In Stock</Label>
            </div>
            <div className="flex items-center space-x-2">
              <Checkbox
                id="out-of-stock"
                checked={availability.includes('Out of Stock')}
                onCheckedChange={(checked) => handleAvailabilityChange(!!checked, 'Out of Stock')}
              />
              <Label htmlFor="out-of-stock" className="flex-grow">Out of Stock</Label>
            </div>
          </AccordionContent>
        </AccordionItem>
        <AccordionItem value="price">
          <AccordionTrigger className="font-semibold">Price</AccordionTrigger>
          <AccordionContent className="pt-4">
            <Slider
              min={0}
              max={maxPrice}
              step={10}
              value={priceRange}
              onValueChange={(value) => onPriceChange(value as [number, number])}
            />
            <div className="flex justify-between text-sm text-muted-foreground mt-2">
              <span>SAR {priceRange[0]}</span>
              <span>SAR {priceRange[1]}</span>
            </div>
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    </aside>
  );
}
