
'use client';

import { useMemo } from 'react';
import type { Product } from '@/types';
import ProductCard from './product-card';
import CategoryFilters from './category-filters';
import { AnimatePresence, motion } from 'framer-motion';
import { Skeleton } from './ui/skeleton';

type ProductGridProps = {
  products: Product[];
  isLoading: boolean;
  selectedCategory: string;
  onSelectCategory: (category: string) => void;
  categories: string[];
  searchQuery: string;
  availability: string[];
  priceRange: [number, number];
  sortBy: string;
};

export default function ProductGrid({
  products,
  isLoading,
  selectedCategory,
  onSelectCategory,
  categories,
  searchQuery,
  availability,
  priceRange,
  sortBy,
}: ProductGridProps) {
  const filteredProducts = useMemo(() => {
    let filtered = products;

    // Filter by search query
    if (searchQuery) {
      filtered = filtered.filter((p) =>
        p.name.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    // Filter by category
    if (selectedCategory !== 'All') {
      filtered = filtered.filter((p) => p.category === selectedCategory);
    }

    // Filter by availability
    if (availability.length > 0) {
      filtered = filtered.filter((p) => availability.includes(p.stock));
    }

    // Filter by price range
    filtered = filtered.filter((p) => p.price >= priceRange[0] && p.price <= priceRange[1]);

    // Sort products
    switch (sortBy) {
      case 'price-asc':
        filtered.sort((a, b) => a.price - b.price);
        break;
      case 'price-desc':
        filtered.sort((a, b) => b.price - a.price);
        break;
      case 'alphabetical-az':
        filtered.sort((a, b) => a.name.localeCompare(b.name));
        break;
      case 'alphabetical-za':
        filtered.sort((a, b) => b.name.localeCompare(a.name));
        break;
      default:
        break;
    }

    return filtered;
  }, [products, selectedCategory, availability, priceRange, sortBy, searchQuery]);
  
  if (isLoading) {
    return (
      <div>
         <div className="flex flex-wrap justify-center gap-2 mb-8">
            {Array.from({ length: 4 }).map((_, i) => (
                <Skeleton key={i} className="h-10 w-24 rounded-full" />
            ))}
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {Array.from({ length: 9 }).map((_, index) => (
            <CardSkeleton key={index} />
          ))}
        </div>
      </div>
    );
  }

  if (!products || products.length === 0) {
    return (
      <div className="text-center py-10">
        <h2 className="text-2xl font-semibold text-foreground">No Products Found</h2>
        <p className="text-muted-foreground mt-2">Please check back later or add products in the Firebase console.</p>
      </div>
    );
  }

  return (
    <div>
      <CategoryFilters
        categories={categories}
        selectedCategory={selectedCategory}
        onSelectCategory={onSelectCategory}
      />
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        <AnimatePresence>
          {filteredProducts.map((product) => (
            <motion.div
              key={product.id}
              layout
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              transition={{ duration: 0.3 }}
            >
              <ProductCard product={product} />
            </motion.div>
          ))}
        </AnimatePresence>
      </div>
      {filteredProducts.length === 0 && (
        <AnimatePresence>
            <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="text-center py-16 col-span-full"
            >
                <p className="text-muted-foreground">No products found for the selected filters.</p>
            </motion.div>
        </AnimatePresence>
      )}
    </div>
  );
}

const CardSkeleton = () => (
    <div className="flex flex-col space-y-3">
      <Skeleton className="h-[250px] w-full rounded-lg" />
      <div className="space-y-2">
        <Skeleton className="h-4 w-3/4 mx-auto" />
      </div>
    </div>
  );
  

