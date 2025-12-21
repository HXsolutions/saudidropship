
'use client';

import { useState, useMemo, useEffect } from 'react';
import ProductGrid from '@/components/product-grid';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Terminal } from 'lucide-react';
import type { Product } from '@/types';
import ProductSidebar from '@/components/product-sidebar';
import { useCollection, useFirestore, useMemoFirebase } from '@/firebase';
import { collection, query } from 'firebase/firestore';

const fixedCategories = [
  "All",
  "Beauty",
  "Electronics",
  "Gadgets",
  "Kitchen & Garden",
  "Household",
  "Fitness"
];

export default function ProductsPage() {
  const firestore = useFirestore();

  const productsQuery = useMemoFirebase(() => {
    if (!firestore) return null;
    return query(collection(firestore, 'products'));
  }, [firestore]);

  const { data: products, isLoading, error } = useCollection<Product>(productsQuery);

  const [availability, setAvailability] = useState<string[]>([]);
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 1000]);
  const [sortBy, setSortBy] = useState('alphabetical-az');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');

  useEffect(() => {
    if (products) {
      const maxPrice = Math.max(...products.map(p => p.price), 1000);
      setPriceRange([0, maxPrice]);
    }
  }, [products]);
  
  if (error) {
    return (
      <div className="container mx-auto px-4 py-8">
        <Alert variant="destructive">
          <Terminal className="h-4 w-4" />
          <AlertTitle>Error Loading Products</AlertTitle>
          <AlertDescription>
            {error.message}
          </AlertDescription>
        </Alert>
      </div>
    );
  }

  const maxPrice = useMemo(() => Math.max(...(products || []).map(p => p.price), 1000), [products]);

  return (
    <div className="bg-background">
      <section className="relative py-20 md:py-32 bg-background">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-blue-100/50 via-background to-background pointer-events-none"></div>
        <div className="container mx-auto px-4 text-center relative z-10">
          <h1 className="text-4xl md:text-6xl font-bold font-headline text-primary leading-tight">
            Our Products
          </h1>
          <p className="text-lg md:text-xl text-muted-foreground mt-4 max-w-3xl mx-auto">
            Browse our curated collection of high-quality products, ready to be sold in your store.
          </p>
        </div>
      </section>

      <section className="py-12 bg-white border-y border-slate-100">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-4 gap-8">
            <div className="lg:col-span-1">
              <ProductSidebar
                searchQuery={searchQuery}
                onSearchChange={setSearchQuery}
                availability={availability}
                onAvailabilityChange={setAvailability}
                priceRange={priceRange}
                onPriceChange={setPriceRange}
                maxPrice={maxPrice}
                sortBy={sortBy}
                onSortByChange={setSortBy}
              />
            </div>
            <div className="lg:col-span-3">
              <ProductGrid
                products={products || []}
                isLoading={isLoading}
                selectedCategory={selectedCategory}
                onSelectCategory={setSelectedCategory}
                categories={fixedCategories}
                searchQuery={searchQuery}
                availability={availability}
                priceRange={priceRange}
                sortBy={sortBy}
              />
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
