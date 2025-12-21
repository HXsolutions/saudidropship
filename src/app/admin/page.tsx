'use client';

import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Package } from 'lucide-react';
import { useCollection } from '@/firebase';
import { useMemoFirebase } from '@/firebase/provider';
import { collection, query } from 'firebase/firestore';
import { useFirestore } from '@/firebase';

export default function AdminDashboardPage() {
    const firestore = useFirestore();

    const productsQuery = useMemoFirebase(() => {
        if (!firestore) return null;
        return query(collection(firestore, 'products'));
    }, [firestore]);

    const { data: products, isLoading: productsLoading } = useCollection(productsQuery);
  
    return (
    <div className="p-4 sm:p-6">
      <header className="mb-6 flex items-center justify-between">
        <h1 className="text-2xl font-bold">Dashboard</h1>
      </header>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Products</CardTitle>
            <Package className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {productsLoading ? '...' : products?.length ?? 0}
            </div>
            <p className="text-xs text-muted-foreground">
              Number of products in the catalog
            </p>
          </CardContent>
        </Card>
      </div>

    </div>
  );
}
