
'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { PlusCircle } from 'lucide-react';
import { useCollection, useFirestore, useMemoFirebase } from '@/firebase';
import { collection, query } from 'firebase/firestore';
import ProductTable from '@/components/admin/product-table';
import { ProductDialog } from '@/components/admin/product-dialog';
import type { Product } from '@/types';
import { Skeleton } from '@/components/ui/skeleton';

export default function AdminProductsPage() {
  const [dialogOpen, setDialogOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);

  const firestore = useFirestore();
  const productsQuery = useMemoFirebase(() => {
    if (!firestore) return null;
    return query(collection(firestore, 'products'));
  }, [firestore]);

  const { data: products, isLoading } = useCollection<Product>(productsQuery);

  const handleAddNew = () => {
    setSelectedProduct(null);
    setDialogOpen(true);
  };

  return (
    <div className="p-4 sm:p-6">
      <header className="mb-6 flex items-center justify-between">
        <h1 className="text-2xl font-bold">Products</h1>
        <Button onClick={handleAddNew}>
          <PlusCircle className="mr-2 h-4 w-4" />
          Add Product
        </Button>
      </header>

      {isLoading ? (
        <div className="space-y-4">
            <Skeleton className="h-12 w-full" />
            <Skeleton className="h-12 w-full" />
            <Skeleton className="h-12 w-full" />
            <Skeleton className="h-12 w-full" />
        </div>
      ) : (
        <ProductTable
          products={products || []}
          setDialogOpen={setDialogOpen}
          setSelectedProduct={setSelectedProduct}
        />
      )}

      <ProductDialog
        isOpen={dialogOpen}
        onOpenChange={setDialogOpen}
        product={selectedProduct}
      />
    </div>
  );
}
