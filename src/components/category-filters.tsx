'use client';

import { Button } from './ui/button';

type CategoryFiltersProps = {
  categories: string[];
  selectedCategory: string;
  onSelectCategory: (category: string) => void;
};

export default function CategoryFilters({
  categories,
  selectedCategory,
  onSelectCategory,
}: CategoryFiltersProps) {
  return (
    <div className="flex flex-wrap justify-center gap-2 mb-8">
      {categories.map((category) => (
        <Button
          key={category}
          variant={selectedCategory === category ? 'default' : 'outline'}
          onClick={() => onSelectCategory(category)}
          className="capitalize rounded-full"
        >
          {category}
        </Button>
      ))}
    </div>
  );
}
